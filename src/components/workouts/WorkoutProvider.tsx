import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '../../types';
import { loadFromStorage, saveToStorage } from '../../utils/storage';
import { updateAllBaselines, adjustSingleBaseline } from '../baselines/BaselineUtils';
import { useBaselines } from '../baselines/BaselineProvider';

const WORKOUT_STORAGE_KEY = 'workoutCompletion';

interface WorkoutContextType {
    workouts: Workout[];
    currentWorkoutIndex: number;
    setCurrentWorkoutIndex: (index: number) => void; // Add this line
    completeCurrentWorkout: () => Promise<void>;
    failSet: (exerciseName: string) => Promise<void>;
  }
  

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const { baselines, setBaselines } = useBaselines(); // Access baselines

  useEffect(() => {
    const loadWorkouts = async () => {
      const storedWorkouts = await loadFromStorage<Workout[]>(WORKOUT_STORAGE_KEY);
      setWorkouts(storedWorkouts || []);
    };
    loadWorkouts();
  }, []);

  const saveWorkouts = async (updatedWorkouts: Workout[]) => {
    await saveToStorage(WORKOUT_STORAGE_KEY, updatedWorkouts);
    setWorkouts(updatedWorkouts);
  };

  const completeCurrentWorkout = async () => {
    const updatedWorkouts = workouts.map((workout, index) =>
      index === currentWorkoutIndex ? { ...workout, completed: true } : workout
    );

    await saveWorkouts(updatedWorkouts);

    if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
    } else {
      const updatedBaselines = updateAllBaselines(baselines); // Pass baselines
      setBaselines(updatedBaselines);
      setCurrentWorkoutIndex(0);
    }
  };

  const failSet = async (exerciseName: string) => {
    const updatedBaselines = adjustSingleBaseline(baselines, exerciseName); // Pass baselines and exerciseName
    setBaselines(updatedBaselines);
    await completeCurrentWorkout();
  };

  const updateWorkoutIndex = (index: number) => {
    setCurrentWorkoutIndex(index);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        currentWorkoutIndex,
        setCurrentWorkoutIndex: updateWorkoutIndex, // Provide the function here
        completeCurrentWorkout,
        failSet,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout } from '../../types';
import { loadFromStorage, saveToStorage } from '../../utils/storage';
import { updateAllBaselines, adjustSingleBaseline } from '../baselines/BaselineUtils';
import { useBaselines } from '../baselines/BaselineProvider';
import { workouts as defaultWorkouts } from './workoutsData';

const WORKOUT_STORAGE_KEY = 'workoutCompletion';

interface WorkoutContextType {
    workouts: Workout[];
    currentWorkoutIndex: number;
    setCurrentWorkoutIndex: (index: number) => void; 
    saveWorkouts: (updateWorksouts: Workout[]) => Promise<void>;
    completeCurrentWorkout: () => Promise<void>;
    failSet: (exerciseName: string) => Promise<void>;
  }
  

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const { baselines, setBaselines } = useBaselines();


  // Load Workouts
  useEffect(() => {
    const loadWorkouts = async () => {
      const storedWorkouts = await loadFromStorage<Workout[]>(WORKOUT_STORAGE_KEY);
      if(storedWorkouts) {
        setWorkouts(storedWorkouts);
      } else {
        setWorkouts(defaultWorkouts);
      }
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
      const updatedBaselines = updateAllBaselines(baselines); 
      setBaselines(updatedBaselines);
      setCurrentWorkoutIndex(0);
    }
  };

  const failSet = async (exerciseName: string) => {
    const updatedBaselines = adjustSingleBaseline(baselines, exerciseName); 
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
        setCurrentWorkoutIndex: updateWorkoutIndex,
        saveWorkouts,
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

import React, { createContext, useContext, useState } from 'react';
import { workouts as defaultWorkouts, Workout } from '../../data/workouts';

interface WorkoutContextType {
  workouts: Workout[];
  currentWorkoutIndex: number;
  setCurrentWorkoutIndex: (index: number) => void;
  completeCurrentWorkout: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

  const completeCurrentWorkout = () => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout, index) =>
        index === currentWorkoutIndex ? { ...workout, completed: true } : workout
      )
    );
    if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        currentWorkoutIndex,
        setCurrentWorkoutIndex,
        completeCurrentWorkout,
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

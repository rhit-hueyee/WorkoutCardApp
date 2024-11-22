import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { workouts as defaultWorkouts, Workout } from '../../data/workouts';
import { useBaselines } from '../BaselineContext';

interface WorkoutContextType {
    workouts: Workout[];
    currentWorkoutIndex: number;
    setCurrentWorkoutIndex: (index: number) => void;
    completeCurrentWorkout: () => Promise<void>;
    failSet: (exerciseSource: string) => Promise<void>;
  }
  
  const WORKOUT_STORAGE_KEY = 'workoutCompletion';
  
  const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);
  
  export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [workouts, setWorkouts] = useState<Workout[]>(defaultWorkouts);
    const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
    const { baselines, setBaselines, resetWorkoutsAndUpdateBaselines } = useBaselines();
  
    useEffect(() => {
      const loadWorkouts = async () => {
        const storedWorkouts = await AsyncStorage.getItem(WORKOUT_STORAGE_KEY);
        if (storedWorkouts) {
          setWorkouts(JSON.parse(storedWorkouts));
        }
      };
      loadWorkouts();
    }, []);
  
    const saveWorkouts = async (updatedWorkouts: Workout[]) => {
      await AsyncStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(updatedWorkouts));
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
        // Last workout completed, update baselines and reset workouts
        await resetWorkoutsAndUpdateBaselines();
        setCurrentWorkoutIndex(0);
      }
    };
  
    const failSet = async (exerciseSource: string) => {
      // Decrease the baseline for the exercise by 10
      const updatedBaselines = {
        ...baselines,
        [exerciseSource]: (baselines[exerciseSource] || 0) - 10,
      };
      await setBaselines(updatedBaselines);
  
      // Mark the workout as completed
      await completeCurrentWorkout();
    };
  
    return (
      <WorkoutContext.Provider
        value={{
          workouts,
          currentWorkoutIndex,
          setCurrentWorkoutIndex,
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
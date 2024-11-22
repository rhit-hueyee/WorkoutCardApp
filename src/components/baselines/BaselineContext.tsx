import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Baseline, defaultBaselines } from '../../types';

interface BaselineContextType {
    baselines: Baseline;
    setBaselines: (newBaselines: Baseline) => void;
    resetWorkoutsAndUpdateBaselines: () => Promise<void>;
  }
  
  const BASELINE_STORAGE_KEY = 'baselineConstants';
  const WORKOUT_STORAGE_KEY = 'workoutCompletion';
  
  const BaselineContext = createContext<BaselineContextType | undefined>(undefined);
  
  export const BaselineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [baselines, setBaselines] = useState<Baseline>(defaultBaselines);
  
    useEffect(() => {
      const loadBaselines = async () => {
        const storedBaselines = await AsyncStorage.getItem(BASELINE_STORAGE_KEY);
        if (storedBaselines) {
          setBaselines(JSON.parse(storedBaselines));
        }
      };
      loadBaselines();
    }, []);
  
    const saveBaselines = async (newBaselines: Baseline) => {
      await AsyncStorage.setItem(BASELINE_STORAGE_KEY, JSON.stringify(newBaselines));
      setBaselines(newBaselines);
    };
  
    const resetWorkoutsAndUpdateBaselines = async () => {
      // Update baselines
      const updatedBaselines: Baseline = Object.fromEntries(
          Object.entries(baselines).map(([key, value]) => {
              const newValue = Math.round((value / 0.95) / 5) * 5;
              return [key, newValue];
          })
      ) as unknown as Baseline;
  
      await saveBaselines(updatedBaselines);
  
      // Reset all workouts as not completed
      const storedWorkouts = await AsyncStorage.getItem(WORKOUT_STORAGE_KEY);
      if (storedWorkouts) {
        const workouts = JSON.parse(storedWorkouts).map((workout: any) => ({
          ...workout,
          completed: false,
        }));
        await AsyncStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workouts));
      }
    };
  
    return (
      <BaselineContext.Provider
        value={{
          baselines,
          setBaselines: saveBaselines,
          resetWorkoutsAndUpdateBaselines,
        }}
      >
        {children}
      </BaselineContext.Provider>
    );
  };
  
  export const useBaselines = (): BaselineContextType => {
    const context = useContext(BaselineContext);
    if (!context) {
      throw new Error('useBaselines must be used within a BaselineProvider');
    }
    return context;
  };
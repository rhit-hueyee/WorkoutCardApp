import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../../utils/storage'; // Update the path to your utils
import { Baseline, defaultBaselines } from '../../types';

const BASELINE_STORAGE_KEY = 'baselineConstants';

interface BaselineContextType {
  baselines: Baseline;
  setBaselines: (newBaselines: Baseline) => void;
  resetWorkoutsAndUpdateBaselines: () => Promise<void>;
}

const BaselineContext = createContext<BaselineContextType | undefined>(undefined);

export const BaselineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [baselines, setBaselines] = useState<Baseline>(defaultBaselines);

  useEffect(() => {
    const loadBaselines = async () => {
      const storedBaselines = await loadFromStorage<Baseline>(BASELINE_STORAGE_KEY);
      if (storedBaselines) {
        setBaselines(storedBaselines);
      } else {
        setBaselines(defaultBaselines)
      }
    };
    loadBaselines();
  }, []);

  const saveBaselines = async (newBaselines: Baseline) => {
    await saveToStorage(BASELINE_STORAGE_KEY, newBaselines);
    setBaselines(newBaselines);
  };

  const resetWorkoutsAndUpdateBaselines = async () => {
    const updatedBaselines: Baseline = Object.fromEntries(
      Object.entries(baselines).map(([key, value]) => {
        const newValue = Math.round((value / 0.95) / 5) * 5;
        return [key, newValue];
      })
    ) as Baseline;

    saveBaselines(updatedBaselines);
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

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Baseline } from '../../types';
import { loadFromStorage, saveToStorage } from '../../utils/storage';
import { updateAllBaselines, adjustSingleBaseline } from './BaselineUtils';

const BASELINE_STORAGE_KEY = 'baselineConstants';

interface BaselineContextType {
  baselines: Baseline;
  setBaseline: (key: string, value: number) => void;
  updateBaselines: () => void;
  adjustBaseline: (key: string) => void;
}

const BaselineContext = createContext<BaselineContextType | undefined>(undefined);

export const BaselineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [baselines, setBaselines] = useState<Baseline>({});

  useEffect(() => {
    const loadBaselines = async () => {
      const storedBaselines = await loadFromStorage<Baseline>(BASELINE_STORAGE_KEY);
      setBaselines(storedBaselines || {});
    };
    loadBaselines();
  }, []);

  const saveBaselines = async (updatedBaselines: Baseline) => {
    await saveToStorage(BASELINE_STORAGE_KEY, updatedBaselines);
    setBaselines(updatedBaselines);
  };

  const setBaseline = (key: string, value: number) => {
    saveBaselines({ ...baselines, [key]: value });
  };

  const updateBaselines = () => {
    const updatedBaselines = updateAllBaselines(baselines);
    saveBaselines(updatedBaselines);
  };

  const adjustBaseline = (key: string) => {
    const updatedBaselines = adjustSingleBaseline(baselines, key);
    saveBaselines(updatedBaselines);
  };

  return (
    <BaselineContext.Provider value={{ baselines, setBaseline, updateBaselines, adjustBaseline }}>
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

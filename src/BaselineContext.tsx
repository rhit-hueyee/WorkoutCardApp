import React, { createContext, useContext, useState } from 'react';
import { Baseline, defaultBaselines } from './Baselines';

interface BaselineContextType {
  baselines: Baseline;
  setBaselines: (newBaselines: Baseline) => void;
}

const BaselineContext = createContext<BaselineContextType | undefined>(undefined);

export const BaselineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [baselines, setBaselines] = useState<Baseline>(defaultBaselines);

  return (
    <BaselineContext.Provider value={{ baselines, setBaselines }}>
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

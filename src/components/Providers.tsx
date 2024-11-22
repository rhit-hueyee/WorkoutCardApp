import React from 'react';
import { BaselineProvider } from './baselines/BaselineProvider';
import { WorkoutProvider } from './workouts/WorkoutProvider';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BaselineProvider>
      <WorkoutProvider>
        {children}
      </WorkoutProvider>
    </BaselineProvider>
  );
};

export default Providers;

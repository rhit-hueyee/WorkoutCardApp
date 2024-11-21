import { WorkoutData, Exercise, Block } from '../src/types';

export interface Workout {
    id: string;
    name: string;
    completed: boolean;
    blocks: Block[];
  }
  
  export const workouts: Workout[] = [
    {
      id: "Week1Day1",
      name: "Week 1, Day 1",
      completed: false,
      blocks: [
        // Include blocks as previously defined
      ],
    },
    {
      id: "Week1Day2",
      name: "Week 1, Day 2",
      completed: false,
      blocks: [
        // Include blocks for this workout
      ],
    },
    {
      id: "Week1Day3",
      name: "Week 1, Day 3",
      completed: false,
      blocks: [
        // Include blocks for this workout
      ],
    },
  ];
  
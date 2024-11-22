import { WorkoutData, Exercise, Block } from '../../types';

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
        {
            "blockName": "Warmup",
            "type": "simple-reps",
            "exercises": [
              {
                "name": "Jump Rope",
                "duration": "3 minutes"
              },
              {
                "name": "High Knee Grab",
                "duration": "x5 each"
              },
              {
                "name": "Dynamic Stretching",
                "duration": "5 minutes"
              }
            ]
          },
          {
            "blockName": "Main Lift",
            "type": "set-based",
            "exercises": [
              {
                "name": "Back Squat",
                "sets": [
                  { "percent": "50%", "source": "sqt", "reps": "10", "loadPercent": "100%" },
                  { "percent": "60%", "source": "sqt", "reps": "8", "loadPercent": "100%" },
                  { "percent": "70%", "source": "sqt", "reps": "6", "loadPercent": "100%" },
                  { "percent": "75%", "source": "sqt", "reps": "6", "loadPercent": "100%" },
                  { "percent": "80%", "source": "sqt", "reps": "6", "loadPercent": "100%" },
                  { "percent": "80%", "source": "sqt", "reps": "6", "loadPercent": "100%" }
                ]
              }
            ]
          },
          {
            "blockName": "Accessory Work",
            "type": "set-based",
            "exercises": [
              {
                "name": "Two Arm DB Row",
                "sets": [
                  { "percent": "60%", "source": "clean", "reps": "10", "loadPercent": "30%" },
                  { "percent": "70%", "source": "clean", "reps": "10", "loadPercent": "30%" },
                  { "percent": "75%", "source": "clean", "reps": "10", "loadPercent": "30%" },
                  { "percent": "80%", "source": "clean", "reps": "10", "loadPercent": "30%" }
                ]
              }
            ]
          },
          {
            "blockName": "Cooldown",
            "type": "simple-reps",
            "exercises": [
              {
                "name": "Biceps Curls",
                "sets": [
                  { "reps": "10" },
                  { "reps": "10" },
                  { "reps": "10" },
                  { "reps": "10" }
                ]
              }
            ]
          }
      ],
    }
  ];
  
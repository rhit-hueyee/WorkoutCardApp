import { Workout } from '../../types';
  
  export const workouts: Workout[] = [
    {
      id: "Week1Day1",
      name: "Week 1, Day 1",
      completed: false,
      blocks: [
        {
            "blockName": "Warmup",
            "type": "simple",
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
                "name": "Alt. Front Lunge Reverse Lunge",
                "duration": "x5 each leg"
              },
              {
                "name": "Mobility Mountain Climbers",
                "duration": "x5 each"
              },
              {
                "name": "Med Ball Push Ups",
                "duration": "x10 each side"
              },
              {
                "name": "Band Circles",
                "duration": "x10 each side"
              },
              {
                "name": "Med Ball Wood Choppers",
                "duration": "x10"
              },
              {
                "name": "Med Ball Squats",
                "duration": "x10"
              }
            ]
          },
          {
            "blockName": "Power",
            "type": "set-based",
            "exercises": [
              {
                "name": "Bar Hang Snatch",
                "sets": [
                  {"percent": "55", "source": "clean", "reps": "5", "loadPercent": "60"},
                  {"percent": "65", "source": "clean", "reps": "4", "loadPercent": "60"},
                  {"percent": "70", "source": "clean", "reps": "3", "loadPercent": "60"},
                  {"percent": "75", "source": "clean", "reps": "3", "loadPercent": "60"},
                  {"percent": "75", "source": "clean", "reps": "3", "loadPercent": "60"},
                ]
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
                  { "percent": "50", "source": "sqt", "reps": "10", "loadPercent": "100" },
                  { "percent": "60", "source": "sqt", "reps": "8", "loadPercent": "100" },
                  { "percent": "70", "source": "sqt", "reps": "6", "loadPercent": "100" },
                  { "percent": "75", "source": "sqt", "reps": "6", "loadPercent": "100" },
                  { "percent": "80", "source": "sqt", "reps": "6", "loadPercent": "100" },
                  { "percent": "80", "source": "sqt", "reps": "6", "loadPercent": "100" }
                ]
              },
              {
                "name": "One Arm DB Row",
                "sets": [
                  { "percent": "60", "source": "clean", "reps": "10", "loadPercent": "30" },
                  { "percent": "70", "source": "clean", "reps": "10", "loadPercent": "30" },
                  { "percent": "75", "source": "clean", "reps": "10", "loadPercent": "30" },
                  { "percent": "80", "source": "clean", "reps": "10", "loadPercent": "30" }
                ]
              }
            ]
          },
          {
            "blockName": "Accessory Work",
            "type": "set-based",
            "exercises": [
              {
                "name": "Bar Overhead Press",
                "sets": [
                  { "percent": "60", "source": "pjk", "reps": "10", "loadPercent": "60" },
                  { "percent": "70", "source": "pjk", "reps": "10", "loadPercent": "60" },
                  { "percent": "75", "source": "pjk", "reps": "10", "loadPercent": "60" },
                  { "percent": "75", "source": "pjk", "reps": "10", "loadPercent": "60" },
                  { "percent": "75", "source": "pjk", "reps": "10", "loadPercent": "60" }
                ]
              },
              {
                "name": "Hamstring Curl",
                "sets": [
                  { "percent": "60", "source": "dead", "reps": "15", "loadPercent": "20" },
                  { "percent": "65", "source": "dead", "reps": "15", "loadPercent": "20" },
                  { "percent": "65", "source": "dead", "reps": "15", "loadPercent": "20" },
                  { "percent": "65", "source": "dead", "reps": "15", "loadPercent": "20" }
                ]
              }
            ]
          },
          {
            "blockName": "Biceps",
            "type": "set-based",
            "exercises": [
              {
                "name": "Biceps Curls",
                "sets": [
                  { "weight": "30", "reps": "10 each" },
                  { "weight": "30", "reps": "10 each" },
                  { "weight": "30", "reps": "10 each" },
                  { "weight": "30", "reps": "10 each" }
                ]
              }
            ]
          },
          {
            "blockName": "Abs",
            "type": "set-based",
            "exercises": [
              {
                "name": "Hanging Leg Raise",
                "sets": [
                  { "reps": "10" },
                  { "reps": "10" },
                  { "reps": "10" },
                  { "reps": "10" }
                ]
              },
              {
                "name": "Cable Crunches",
                "sets": [
                  { "weight": "145", "reps": "10" },
                  { "weight": "145", "reps": "10" },
                  { "weight": "145", "reps": "10" },
                  { "weight": "145", "reps": "10" }
                ]
              }
            ]
          }
      ],
    },
    {
      id: "Week2Day2",
      name: "Week 1, Day 2",
      completed: false,
      blocks: [
        {
            "blockName": "Warmup",
            "type": "simple",
            "exercises": [
              {
                "name": "Jumping Jacks",
                "duration": "x20"
              },
              {
                "name": "Seal Jacks",
                "duration": "x20"
              },
              {
                "name": "Split Jumps",
                "duration": "x5 each leg"
              },
              {
                "name": "Mobility Mountain Climbers",
                "duration": "x5 each"
              },
              {
                "name": "Push Ups",
                "duration": "x10"
              },
              {
                "name": "Band Circles",
                "duration": "x10 each side"
              }
            ]
          },
          {
            "blockName": "Power",
            "type": "set-based",
            "exercises": [
              {
                "name": "Hang Clean",
                "sets": [
                  {"percent": "55", "source": "clean", "reps": "4", "loadPercent": "100"},
                  {"percent": "65", "source": "clean", "reps": "4", "loadPercent": "100"},
                  {"percent": "70", "source": "clean", "reps": "4", "loadPercent": "100"},
                  {"percent": "75", "source": "clean", "reps": "4", "loadPercent": "100"},
                  {"percent": "80", "source": "clean", "reps": "4", "loadPercent": "100"},
                ]
              }
            ]
          },
          {
            "blockName": "Main Lift",
            "type": "set-based",
            "exercises": [
              {
                "name": "Bench Press",
                "sets": [
                  { "percent": "50", "source": "bench", "reps": "10", "loadPercent": "100" },
                  { "percent": "60", "source": "bench", "reps": "8", "loadPercent": "100" },
                  { "percent": "70", "source": "bench", "reps": "7", "loadPercent": "100" },
                  { "percent": "75", "source": "bench", "reps": "6", "loadPercent": "100" },
                  { "percent": "80", "source": "bench", "reps": "6", "loadPercent": "100" },
                  { "percent": "80", "source": "bench", "reps": "6", "loadPercent": "100" }
                ]
              },
              {
                "name": "Bar Clean Grip RDL + Shrug",
                "sets": [
                  { "percent": "60", "source": "dead", "reps": "8+8", "loadPercent": "30" },
                  { "percent": "70", "source": "dead", "reps": "8+8", "loadPercent": "30" },
                  { "percent": "75", "source": "dead", "reps": "8+8", "loadPercent": "30" },
                  { "percent": "80", "source": "dead", "reps": "8+8", "loadPercent": "30" }
                ]
              }
            ]
          },
          {
            "blockName": "Accessory Work",
            "type": "set-based",
            "exercises": [
              {
                "name": "Bar Split Squat",
                "sets": [
                  { "percent": "60", "source": "sqt", "reps": "6 each", "loadPercent": "55" },
                  { "percent": "70", "source": "sqt", "reps": "6 each", "loadPercent": "55" },
                  { "percent": "75", "source": "sqt", "reps": "6 each", "loadPercent": "55" },
                  { "percent": "75", "source": "sqt", "reps": "6 each", "loadPercent": "55" },
                  { "percent": "75", "source": "sqt", "reps": "6 each", "loadPercent": "55" }
                ]
              },
              {
                "name": "Dead Hang Pull Ups",
                "sets": [
                  { "reps": "5-max"},
                  { "reps": "5-max" },
                  { "reps": "5-max" },
                  { "reps": "5-max" }
                ]
              }
            ]
          }
      ],
    }
  ];
  
// data/workouts.ts

// Define the maxes for each exercise
export const maxes = {
    squat: 320, // Max weight for squat in lbs
    benchPress: 200, // Max weight for bench press in lbs
    deadlift: 350, // Max weight for deadlift in lbs
  };
  
  // Function to generate a workout based on a percentage of max
  export const generateWorkout = (name: string, percentages: { [key: string]: number }) => ({
    name,
    exercises: [
      {
        id: 1,
        name: "Squats",
        sets: 3,
        reps: 10,
        weight: `${Math.round(maxes.squat * percentages.squat)} lbs`,
        rest: "1 min",
      },
      {
        id: 2,
        name: "Bench Press",
        sets: 3,
        reps: 8,
        weight: `${Math.round(maxes.benchPress * percentages.benchPress)} lbs`,
        rest: "1.5 min",
      },
      {
        id: 3,
        name: "Deadlift",
        sets: 3,
        reps: 6,
        weight: `${Math.round(maxes.deadlift * percentages.deadlift)} lbs`,
        rest: "2 min",
      },
    ],
  });
  
  // Define the workout series
  export const workouts = [
    generateWorkout("Workout A", { squat: 0.6, benchPress: 0.6, deadlift: 0.6 }), // 60% of max
    generateWorkout("Workout B", { squat: 0.7, benchPress: 0.7, deadlift: 0.7 }), // 70% of max
    generateWorkout("Workout C", { squat: 0.8, benchPress: 0.8, deadlift: 0.8 }), // 80% of max
  ];
  
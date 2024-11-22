export interface Set {
    percent?: string;
    source?: string;
    reps?: string;
    loadPercent?: string;
    failed?: boolean;
  }
  
  export interface Exercise {
    name: string;
    duration?: string;
    sets?: Set[];
  }
  
  export interface Block {
    blockName: string;
    type: "duration-based" | "set-based" | "simple-reps";
    exercises: Exercise[];
  }
  
  
  export interface WorkoutData {
    workoutName: string;
    blocks: Block[];
  }
  
  export interface Baseline {
    [key: string]: number;
  }
  
  export const defaultBaselines: Baseline = {
    clean: 250,
    sqt: 360,
    bench: 235,
    pjk: 175,
    dead: 350
  };

  export interface Workout {
    id: string;
    name: string;
    completed: boolean;
    blocks: Block[];
  }
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
  
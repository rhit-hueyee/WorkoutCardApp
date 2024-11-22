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
  
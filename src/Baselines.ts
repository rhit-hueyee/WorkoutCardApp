export interface Baseline {
    clean: number;
    sqt: number;
    bench: number;
    pjk: number;
    dead: number;
  }
  
  export const defaultBaselines: Baseline = {
    clean: 250,
    sqt: 360,
    bench: 235,
    pjk: 175,
    dead: 350
  };
  
export interface IAIPlan {
  userId: string;
  goal: string;
  frequency: number;
  intensity: "Easy" | "Moderate" | "Hard";
  plan: Array<{ day: string; workout: string }>;
}

export interface IGeneratePlanRequest {
  userId: string;
  goal: string;
  frequency: number;
  intensity: "Easy" | "Moderate" | "Hard";
  trainings: Array<{
    date: string;
    distance: number;
    time: string; // e.g., "MM:SS"
  }>;
}
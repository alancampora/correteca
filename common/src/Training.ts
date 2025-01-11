export type Lap = {
  distance: number; // in kilometers
  time: string; // in "MM:SS" format
  pace: string; // in "MM:SS" format
};

export type Training = {
  userId: string;
  title: string;
  totalDistance: number; // in kilometers
  laps: Lap[];
  date: Date;
  notes: string;
};

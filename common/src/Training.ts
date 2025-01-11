export type Lap = {
  distance: number; // in kilometers
  time: string; // in "MM:SS" format
  pace: string; // in "MM:SS" format
};

export type Training = {
  _id: string;
  userId: string;
  title: string;
  totalDistance: number; // in kilometers
  laps: Lap[];
  date: Date;
  notes: string;
};

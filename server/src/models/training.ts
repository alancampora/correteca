import mongoose, { Schema, Document } from 'mongoose';

interface ILap extends Document {
  distance: number;      // in kilometers
  time: string;         // in "MM:SS" format
  pace: string;         // in "MM:SS" format
}

interface ITraining extends Document {
  userId: string;
  title: string;
  totalDistance: number; // in kilometers
  laps: ILap[];
  date: Date;
  notes: string;
  location?: string; // New property
}

const LapSchema: Schema = new Schema({
  distance: { type: Number, required: true },
  time: { type: String, required: true },
  pace: { type: String, required: true }
});

const TrainingSchema: Schema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  totalDistance: { type: Number, required: true },
  laps: { type: [LapSchema], required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: false },
  location: { type: String, required: false } // New property
});

const Training = mongoose.model<ITraining>('Training', TrainingSchema);

export default Training;

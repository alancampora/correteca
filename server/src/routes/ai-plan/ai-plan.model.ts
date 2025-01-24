import mongoose, { Schema, Document, Types } from "mongoose";

// Define the schema for an AI-generated plan
const aiPlanSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: { type: String, required: true },
    frequency: { type: Number, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    timeRestriction: {
      type: String,
      required: true,
    },
    plan: {
      recommendation: { type: String },
      weeks: [
        {
          week: { type: Number, required: true },
          workouts: [{
            day: { type: String, required: true },
            notes: { type: String, required: true },
            workout: { type: String, required: true },
          }],
        },
      ],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

// Export the Mongoose model
const AIPlan = mongoose.model<IAIPlanDocument>("AIPlan", aiPlanSchema);

export default AIPlan;

export interface IAIPlanDocument extends Document {
  userId: Types.ObjectId; // Reference to the User model
  goal: string; // User's training goal
  frequency: number; // Training frequency (days per week)
  level: "beginner" | "intermediate" | "advanced"; // Running level
  timeRestriction: string; // Timeframe for the goal
  plan: {
    recommendation?: string; // Recommendation for the training plan
    weeks: {
      week: number; // Week number
      workouts: {
        day: string; // Day of the week
        workout: string; // Workout description
        notes: string; // Notes or guidance for the workout
      }[];
    }[];
  };
}

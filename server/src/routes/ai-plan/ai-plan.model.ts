import mongoose, { Schema, Document } from "mongoose";

// Define the schema for an AI-generated plan
const aiPlanSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: String, required: true },
    frequency: { type: Number, required: true },
    intensity: { type: String, enum: ["Easy", "Moderate", "Hard"], required: true },
    plan: [
      {
        day: { type: String, required: true },
        workout: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Mongoose model
const AIPlan = mongoose.model<IAIPlanDocument>("AIPlan", aiPlanSchema);
export default AIPlan;

// Define the Mongoose Document type for TypeScript
export interface IAIPlanDocument extends Document {
  userId: string;
  goal: string;
  frequency: number;
  intensity: "Easy" | "Moderate" | "Hard";
  plan: Array<{ day: string; workout: string }>;
}

import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string;
  username: string;
  googleId?: string;
  description?: string;
}

const UserSchema: Schema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  }, // Custom _id
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed password
  username: { type: String, required: true },
  description: { type: String, required: false },
  googleId: { type: String }, // Used for Google authentication
});

export const User = mongoose.model<IUser>("User", UserSchema);

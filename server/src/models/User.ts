import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@common/User";

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed password
  username: { type: String, required: true },
  googleId: { type: String }, // Used for Google authentication
});

export const User = mongoose.model<IUser>("User", UserSchema);

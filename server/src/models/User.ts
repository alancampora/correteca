import mongoose, { Schema, Document } from "mongoose";
import { User as IUser } from "@common/User";

interface UserDocument extends Document, IUser {}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;

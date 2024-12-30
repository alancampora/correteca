export interface IUser {
  email: string;
  password?: string; // Optional for Google users
  username: string;
  googleId?: string; // Optional for manual users
}

import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../middleware/auth";
import { User } from "../models/User";
const router = express.Router();

router.post("/register", async (req: any, res: any) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("about to create user");
    // Create new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    console.log("user created");
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

router.get("/me", authenticateToken, (req: any, res: any) => {
  const user = req.user as typeof User;
  return res.json({ user });
});

export default router;

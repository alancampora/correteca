import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// Manual Registration
router.post("/register", async (req: any, res: any) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

router.get("/me", authenticateToken, (req: any, res: any) => {
  const user = req.user; // `user` is attached by the `authenticateToken` middleware
  return res.json({ user });
});

export default router;

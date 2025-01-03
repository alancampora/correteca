import express, { Request, Response } from "express";
import { User } from "../models/User";
import { setDefaultAutoSelectFamily } from "net";
import { appendFile } from "fs";

const router = express.Router();

// Update user endpoint
router.put("/:id", async (req: Request, res: any) => {
  const { id } = req.params;
  const { username, password, description } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { username, password, description },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "There was an error" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

export default router;

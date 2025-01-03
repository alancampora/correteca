import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const authenticateToken = async (
  req: any,
  res: any,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token" });
    }

    // Attach user to the request object for later use
    (req as any).user = {
      username: user.username,
      email: user.email,
      id: user._id,
      description: user?.description,
    };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

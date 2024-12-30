import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const authenticateToken = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token = req.cookies.auth_token;

  if (!token) {
    res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "Invalid authentication token" });
    }

    // Attach user to the request object for later use
    (req as any).user = { username: user.username, email: user.email };
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

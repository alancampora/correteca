import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import businessObjectRoutes from "./routes/BusinessObject";
import authRoutes from "./routes/Auth";
import loginRoutes from "./routes/Login";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow cookies and credentials
  }),
);
app.use(cookieParser());

// Routes
app.use("/api/business-objects", businessObjectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth", loginRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/codeteca", {})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

  console.log(`Server running on port ${PORT}`);
});

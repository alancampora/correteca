import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import businessObjectRoutes from "./routes/BusinessObject";
import authRoutes from "./routes/Auth";
import loginRoutes from "./routes/Login";
import userRoutes from "./routes/User";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FE_URI, // Allow your frontend origin
    credentials: true, // Allow cookies and credentials
  }),
);

// Routes
app.use("/business-objects", businessObjectRoutes);
app.use("/auth", authRoutes);
app.use("/login", loginRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  const connectionString =
    process.env.ENV === "dev"
      ? process.env.DB_URI_DEV
      : process.env.DB_URI_PROD;

  mongoose
    .connect(connectionString, {})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

  console.log(`Server running on port ${PORT}`);
});

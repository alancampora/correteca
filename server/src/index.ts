import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import businessObjectRoutes from "./routes/BusinessObject";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(businessObjectRoutes);

// Routes
app.use("/api/business-objects", businessObjectRoutes);

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/codeteca", {})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

  console.log(`Server running on port ${PORT}`);
});

import mongoose from "mongoose";
import BusinessObject from "../models/BusinessObject";
import User from "../models/User";
import dotenv from "dotenv";
dotenv.config();

// Connect to MongoDB and Populate Data
const populateDB = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = `${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`;
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await BusinessObject.deleteMany({});
    console.log("Cleared existing data");

    // Create Sample Users
    const users = [
      {
        email: "user1@example.com",
        password: "password123",
        username: "UserOne",
      },
      {
        email: "user2@example.com",
        password: "password123",
        username: "UserTwo",
      },
    ];
    await User.insertMany(users);
    console.log("Sample users added");

    // Create Sample BusinessObjects
    const businessObjects = [
      { name: "Product A", subTitle: "High-quality template", price: 49.99 },
      { name: "Product B", subTitle: "Premium design", price: 59.99 },
      { name: "Product D", subTitle: "Budget-friendly", price: 19.99 },
      { name: "Product E", subTitle: "Budget-friendly", price: 19.99 },
      { name: "Product F", subTitle: "Budget-friendly", price: 19.99 },
    ];
    await BusinessObject.insertMany(businessObjects);
    console.log("Sample business objects added");

    // Close the connection
    await mongoose.connection.close();
    console.log("Database populated successfully and connection closed");
  } catch (error) {
    console.error("Error populating the database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

populateDB();

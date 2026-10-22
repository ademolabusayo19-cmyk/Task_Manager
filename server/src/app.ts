import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import "dotenv/config";
import taskRouter from "./routes/taskRoutes";

const app = express(); // Used to start up the Express server

const PORT = 6741;
// CORS: only the Client url address my this API
app.use(
  cors({ origin: process.env.CLIENT_URL || "http://http://localhost:5173" }),
);

// MIDDLEWARE
// Allows Express to receive and understand JSON data from Postman
app.use(express.json());

// Every endpoint starting with /api/tasks is handled by taskRouter
app.use("/api/tasks", taskRouter);

const startServer = async () => {
  try {
    // GET MONGODB CONNECTION STRING
    const mongoURI = process.env.MONGO_URI;

    // CHECK IF CONNECTION STRING EXISTS
    if (!mongoURI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    // CONNECT TO MONGODB
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");

    // START EXPRESS SERVER
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
// ademolabusayo19_db_user;
// BnrokNc8EnqcE1PA;
// mongodb+srv://ademolabusayo19_db_user:BnrokNc8EnqcE1PA@cluster0.5l6umot.mongodb.net/

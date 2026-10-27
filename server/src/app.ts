import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import "dotenv/config";
import taskRouter from "./routes/taskRoutes";

const app = express(); // used to start up the server in express

const PORT = process.env.PORT || 6741;

// CORS: only the Client url address may call this API
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);

// Converts every request to JSON (JavaScript format)
app.use(express.json());

// Every endpoint starting with /api/tasks is handled by taskRouter
app.use("/api/tasks", taskRouter);

const startServer = async () => {
  try {
    // GET MONGODB CONNECTION STRING
    const mongoURL = process.env.MONGO_URL;

    // CHECK IF CONNECTION STRING EXISTS
    if (!mongoURL) {
      throw new Error("MONGO_URL is missing");
    }

    // CONNECT TO MONGODB
    await mongoose.connect(mongoURL);

    console.log("Database connected successfully");

    // START EXPRESS SERVER
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

// task.ts -- WHAT A TASK LOOKS LIKE IN THE DATABASE

import { Schema, model } from "mongoose";

// FLOW:
// 1. Describe the task shape with a TypeScript interface
// 2. Describe the same shape with a Mongoose schema
// 3. Create the model for database operations

// AVAILABLE TASK TAGS
export const TASK_TAGS = ["Urgent", "Important"];

// STEP 1: TYPESCRIPT INTERFACE
export interface ITask {
  title: string;
  description: string;
  tag: string;
}

// STEP 2: MONGOOSE SCHEMA
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxLength: [100, "Title cannot be longer than 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    tag: {
      type: String,
      required: [true, "Tag is required"],
      enum: {
        values: TASK_TAGS,
        message: "Tag must be Urgent or Important",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// STEP 3: CREATE THE MODEL
const Task = model<ITask>("Task", taskSchema);

export default Task;

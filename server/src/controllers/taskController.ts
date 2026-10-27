// taskController.ts - THE LOGIC FOR EACH TASK ENDPOINT

import type { Request, Response } from "express";
import Task from "../models/task";

// ========================================
// CREATE TASK
// POST /api/tasks
// ========================================

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, tag } = req.body;

    // CHECK REQUIRED FIELDS
    if (!title || !description || !tag) {
      res.status(400).json({
        message: "All fields must be filled",
      });
      return;
    }

    // SAVE TASK TO MONGODB
    const task = await Task.create({
      title,
      description,
      tag,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      message: "Unable to create task",
    });
  }
};

// ========================================
// GET ALL TASKS
// GET /api/tasks/allTask
// ========================================

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // GET ALL TASKS FROM MONGODB
    const tasks = await Task.find();

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
      message: "Unable to fetch tasks",
    });
  }
};

// ========================================
// GET ONE TASK
// GET /api/tasks/:id
// ========================================

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);

    res.status(500).json({
      message: "Unable to fetch task",
    });
  }
};

// ========================================
// UPDATE TASK
// PATCH /api/tasks/:id
// ========================================

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, tag } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        tag,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Unable to update task",
    });
  }
};

// ========================================
// DELETE TASK
// DELETE /api/tasks/:id
// ========================================

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Unable to delete task",
    });
  }
};

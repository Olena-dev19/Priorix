import { Request, Response, NextFunction } from "express";
import { createTaskSchema, updateTaskSchema, querySchema } from "./task.schema";
import * as taskService from "./task.service";

export async function getTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const query = querySchema.parse(req.query);
    const tasks = await taskService.getAllTasks(query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = createTaskSchema.parse(req.body);
    const newTask = await taskService.createTask(validatedData);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = updateTaskSchema.parse(req.body);
    const updatedTask = await taskService.updateTask(String(req.params.id), validatedData);
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    await taskService.deleteTask(String(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

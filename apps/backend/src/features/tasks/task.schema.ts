import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters.").max(100, "Title cannot exceed 100 characters."),
  priority: z.number().int().min(1).max(10).default(5),
  dueDate: z.string().nullable().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  priority: z.number().int().min(1).max(10).optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().nullable().optional(),
});

export const querySchema = z.object({
  search: z.string().optional(),
  status: z.enum(["all", "done", "undone"]).default("all"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskQuery = z.infer<typeof querySchema>;

import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import type { CreateTaskInput, UpdateTaskInput, TaskQuery } from "./task.schema";

export async function getAllTasks(query: TaskQuery) {
  const { search, status, sortOrder } = query;

  const where: Prisma.TaskWhereInput = {};

  if (search) {
    where.title = {
      contains: search,
    };
  }

  if (status === "done") {
    where.completed = true;
  }

  if (status === "undone") {
    where.completed = false;
  }

  return prisma.task.findMany({
    where,

    orderBy: {
      priority: sortOrder,
    },
  });
}

export async function getTaskById(id: string) {
  return prisma.task.findUnique({ where: { id } });
}

export async function createTask(data: CreateTaskInput) {
  return prisma.task.create({ data });
}

export async function updateTask(id: string, data: UpdateTaskInput) {
  return prisma.task.update({ where: { id }, data });
}

export async function deleteTask(id: string) {
  return prisma.task.delete({ where: { id } });
}

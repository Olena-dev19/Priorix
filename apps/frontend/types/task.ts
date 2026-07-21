export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: number;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "all" | "done" | "undone";
export type SortOrder = "asc" | "desc";

export interface TaskFilters {
  search: string;
  status: TaskStatus;
  sortOrder: SortOrder;
}

export interface CreateTaskPayload {
  title: string;
  priority: number;
  dueDate?: string | null;
}

export interface UpdateTaskPayload {
  title?: string;
  priority?: number;
  completed?: boolean;
  dueDate?: string | null;
}

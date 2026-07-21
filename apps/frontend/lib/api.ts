import type { Task, TaskFilters, CreateTaskPayload, UpdateTaskPayload } from "@/types/task";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }

  if (res.status === 204) return undefined as T;

  return res.json();
}

function buildQuery(filters: Partial<TaskFilters>): string {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.status) params.set("status", filters.status);
  if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export const tasksApi = {
  getAll(filters: Partial<TaskFilters> = {}): Promise<Task[]> {
    return request<Task[]>(`/api/tasks${buildQuery(filters)}`);
  },

  create(payload: CreateTaskPayload): Promise<Task> {
    return request<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    return request<Task>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  delete(id: string): Promise<void> {
    return request<void>(`/api/tasks/${id}`, { method: "DELETE" });
  },
};

"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { tasksApi } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import type {
  Task,
  TaskFilters,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "@/types/task";

const DEFAULT_FILTERS: TaskFilters = {
  search: "",
  status: "all",
  sortOrder: "asc",
};

const SEARCH_DEBOUNCE_MS = 350;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(filters.search, SEARCH_DEBOUNCE_MS);

  async function fetchTasks(currentFilters: TaskFilters) {
    try {
      setLoading(true);
      setError(null);
      const data = await tasksApi.getAll(currentFilters);
      setTasks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load tasks";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }

  useEffect(() => {
    fetchTasks({
      search: debouncedSearch,
      status: filters.status,
      sortOrder: filters.sortOrder,
    });
  }, [debouncedSearch, filters.status, filters.sortOrder]);

  function updateFilters(partial: Partial<TaskFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  async function createTask(payload: CreateTaskPayload) {
    const task = await tasksApi.create(payload);
    setTasks((prev) => [...prev, task]);
    toast.success("Task created");
  }

  async function updateTask(id: string, payload: UpdateTaskPayload) {
    const updated = await tasksApi.update(id, payload);
    setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    toast.success("Task updated");
  }

  async function deleteTask(id: string) {
    try {
      await tasksApi.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      toast.error(message);
      throw err;
    }
  }

  async function toggleTask(id: string, completed: boolean) {
    await updateTask(id, { completed });
  }

  return {
    tasks,
    filters,
    loading,
    initialized,
    error,
    updateFilters,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
}

"use client";

import { useState, useEffect } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskToolbar } from "@/components/tasks/TaskToolbar";
import { TaskForm } from "@/components/tasks/TaskForm";
import { useTasks } from "@/hooks/useTasks";
import css from "./page.module.css";
import type { CreateTaskPayload } from "@/types/task";

const PAGE_SIZE = 5;

export default function TasksPage() {
  const { tasks, filters, loading, initialized, error, updateFilters, createTask, updateTask, deleteTask, toggleTask } =
    useTasks();
  const [addOpen, setAddOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.status, filters.sortOrder]);

  const doneCount = tasks.filter((task) => task.completed).length;
  const totalPages = Math.max(1, Math.ceil(tasks.length / PAGE_SIZE));
  const paginatedTasks = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasActiveFilters = filters.search !== "" || filters.status !== "all";

  async function handleCreate(payload: CreateTaskPayload) {
    await createTask(payload);
    setAddOpen(false);
  }

  return (
    <div className={css.page}>
      <header className={css.header}>
        <div className={css.headerInner}>
          <span className={css.logo}>
            Prio<span className={css.logoAccent}>rix</span>
          </span>
          <Button onClick={() => setAddOpen(true)} size="sm">
            <Plus size={15} />
            New task
          </Button>
        </div>
      </header>

      <main className={css.main}>
        {error && <div className={css.error}>{error}</div>}

        <div className={css.card}>
          <TaskToolbar filters={filters} onChange={updateFilters} />
        </div>

        <div className={css.card}>
          <div className={css.cardHeader}>
            <div className={css.cardTitleRow}>
              <h2 className={css.cardTitle}>Tasks</h2>
              {initialized && loading && (
                <Loader2 size={14} className={css.spinner} />
              )}
            </div>
            {initialized && (
              <span className={css.stats}>
                {doneCount}/{tasks.length} done
              </span>
            )}
          </div>
          <Separator style={{ marginBottom: "1rem" }} />
          <TaskList
            tasks={paginatedTasks}
            totalTasks={tasks.length}
            hasActiveFilters={hasActiveFilters}
            loading={!initialized && loading}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </main>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
          </DialogHeader>
          <TaskForm onSubmit={handleCreate} onCancel={() => setAddOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

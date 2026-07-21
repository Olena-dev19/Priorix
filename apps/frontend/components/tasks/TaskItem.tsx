"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PriorityBadge } from "./PriorityBadge";
import { TaskForm } from "./TaskForm";
import type { Task, CreateTaskPayload, UpdateTaskPayload } from "@/types/task";
import { cn } from "@/lib/utils";
import styles from "./TaskItem.module.css";

function localDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, payload: UpdateTaskPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const createdDate = new Date(task.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const isOverdue =
    !task.completed &&
    !!task.dueDate &&
    task.dueDate.slice(0, 10) < localDateString(new Date());

  async function handleEditSubmit(values: CreateTaskPayload) {
    await onUpdate(task.id, values);
    setEditOpen(false);
  }

  async function handleDeleteConfirm() {
    if (deleting) return;
    setDeleting(true);
    try {
      await onDelete(task.id);
      setDeleteOpen(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <li className={cn(styles.item, task.completed && styles.completed)}>
        <div className={styles.checkbox}>
          <Checkbox
            checked={task.completed}
            onCheckedChange={(checked) => onToggle(task.id, !!checked)}
            aria-label={`Mark "${task.title}" as ${task.completed ? "undone" : "done"}`}
          />
        </div>

        <div className={styles.body}>
          <p className={cn(styles.title, task.completed && styles.done)}>{task.title}</p>
          <div className={styles.meta}>
            <PriorityBadge priority={task.priority} />
            <span className={styles.date}>{createdDate}</span>
            {dueDate && (
              <span className={cn(styles.dueDate, isOverdue && styles.overdue)}>
                Due {dueDate}
              </span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditOpen(true)}
            aria-label="Edit task"
          >
            <Pencil size={15} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={styles.deleteBtn}
            onClick={() => setDeleteOpen(true)}
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </li>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
          </DialogHeader>
          <TaskForm
            initialValues={{ title: task.title, priority: task.priority, dueDate: task.dueDate }}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete task?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{task.title}&rdquo; will be permanently removed. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={styles.deleteConfirmBtn}
              onClick={handleDeleteConfirm}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

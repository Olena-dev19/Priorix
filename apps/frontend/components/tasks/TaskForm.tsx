"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import type { CreateTaskPayload } from "@/types/task";
import { PRIORITIES } from "@/constants/task";
import { getPriorityLabel } from "@/helpers/task";
import styles from "./TaskForm.module.css";

interface TaskFormProps {
  initialValues?: CreateTaskPayload;
  onSubmit: (values: CreateTaskPayload) => Promise<void>;
  onCancel: () => void;
}

function toDateInputValue(isoString: string | null | undefined): string {
  if (!isoString) return "";
  return isoString.slice(0, 10);
}

export function TaskForm({ initialValues, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [priority, setPriority] = useState(String(initialValues?.priority ?? 5));
  const [dueDate, setDueDate] = useState(toDateInputValue(initialValues?.dueDate));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = initialValues !== undefined;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError("Title is required.");
      return;
    }
    if (trimmed.length < 3) {
      setError("Title must contain at least 3 characters.");
      return;
    }
    if (trimmed.length > 100) {
      setError("Title cannot exceed 100 characters.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await onSubmit({
        title: trimmed,
        priority: Number(priority),
        dueDate: dueDate ? `${dueDate}T12:00:00.000Z` : null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save task");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <Label htmlFor="task-title">Title</Label>
        <Input
          id="task-title"
          placeholder={isEditing ? undefined : "What needs to be done?"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.field}>
        <Label htmlFor="task-priority">Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger id="task-priority">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map((p) => (
              <SelectItem key={p} value={String(p)}>
                {p} — {getPriorityLabel(p)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={styles.field}>
        <Label>Due date <span className={styles.optional}>(optional)</span></Label>
        <DatePicker value={dueDate} onChange={setDueDate} />
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading
            ? isEditing ? "Saving…" : "Adding…"
            : isEditing ? "Save changes" : "Add task"}
        </Button>
      </div>
    </form>
  );
}

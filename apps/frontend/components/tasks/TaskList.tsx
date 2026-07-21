import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./TaskItem";
import type { Task, UpdateTaskPayload } from "@/types/task";
import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  totalTasks: number;
  hasActiveFilters: boolean;
  loading: boolean;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onUpdate: (id: string, payload: UpdateTaskPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskList({
  tasks,
  totalTasks,
  hasActiveFilters,
  loading,
  page,
  totalPages,
  onPageChange,
  onToggle,
  onUpdate,
  onDelete,
}: TaskListProps) {
  if (loading) {
    return (
      <div className={styles.skeleton}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonItem} />
        ))}
      </div>
    );
  }

  if (totalTasks === 0) {
    return hasActiveFilters ? (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🔍</span>
        <p className={styles.emptyText}>No tasks match your search.</p>
        <p className={styles.emptyHint}>Try another search or clear filters.</p>
      </div>
    ) : (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📋</span>
        <p className={styles.emptyText}>You don&apos;t have any tasks yet.</p>
        <p className={styles.emptyHint}>Create your first task.</p>
      </div>
    );
  }

  return (
    <div>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </Button>

          <span className={styles.pageInfo}>
            {page} / {totalPages}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

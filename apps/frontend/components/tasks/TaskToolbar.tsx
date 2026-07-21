"use client";

import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskFilters, TaskStatus } from "@/types/task";
import styles from "./TaskToolbar.module.css";

interface TaskToolbarProps {
  filters: TaskFilters;
  onChange: (partial: Partial<TaskFilters>) => void;
}

export function TaskToolbar({ filters, onChange }: TaskToolbarProps) {
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    onChange({ search: e.target.value });
  }

  function handleStatusChange(value: string) {
    onChange({ status: value as TaskStatus });
  }

  function handleSortToggle() {
    const nextOrder = filters.sortOrder === "asc" ? "desc" : "asc";
    onChange({ sortOrder: nextOrder });
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrapper}>
        <Search size={15} className={styles.searchIcon} />
        <Input
          className={styles.searchInput}
          placeholder="Search tasks…"
          value={filters.search}
          onChange={handleSearch}
        />
      </div>

      <div className={styles.controls}>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className={styles.select}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tasks</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleSortToggle} className={styles.sortBtn}>
          <ArrowUpDown size={14} />
          Priority {filters.sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
    </div>
  );
}

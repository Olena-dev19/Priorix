"use client";

import { CalendarIcon, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDate(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  return parseLocalDate(dateString);
}

function formatDisplay(dateString: string): string {
  if (!dateString) return "";
  return parseLocalDate(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const selected = toDate(value);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function handleSelect(date: Date | undefined) {
    onChange(date ? toIso(date) : "");
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange("");
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(styles.trigger, !value && styles.placeholder)}
        >
          <CalendarIcon size={14} className={styles.icon} />
          <span>{value ? formatDisplay(value) : "Pick a date"}</span>
          {value && (
            <span className={styles.clear} onClick={handleClear} aria-label="Clear date">
              <X size={12} />
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className={styles.popover} align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={handleSelect}
          disabled={{ before: today }}
          captionLayout="label"
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

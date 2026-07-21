export function getPriorityLevel(priority: number): "low" | "medium" | "high" {
  if (priority <= 3) return "low";
  if (priority <= 6) return "medium";
  return "high";
}

export function getPriorityLabel(priority: number): string {
  if (priority <= 3) return "Low";
  if (priority <= 6) return "Medium";
  return "High";
}

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getPriorityLevel } from "@/helpers/task";
import styles from "./PriorityBadge.module.css";

interface PriorityBadgeProps {
  priority: number;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const level = getPriorityLevel(priority);
  return (
    <Badge variant="outline" className={cn(styles.badge, styles[level])}>
      P{priority}
    </Badge>
  );
}

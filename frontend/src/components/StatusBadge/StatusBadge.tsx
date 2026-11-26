import type { EventStatus } from '../../types/event';
import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  status: EventStatus;
}

const CONFIG: Record<EventStatus, { label: string; className: string }> = {
  planned:     { label: '予定',   className: styles.planned },
  in_progress: { label: '進行中', className: styles.inProgress },
  completed:   { label: '完了',   className: styles.completed },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = CONFIG[status];
  return <span className={`${styles.badge} ${className}`}>{label}</span>;
}

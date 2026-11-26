import type { EventResponse } from '../../types/event';
import styles from './EventChip.module.css';

interface EventChipProps {
  event: EventResponse;
}

const STATUS_CLASS: Record<string, string> = {
  planned:     styles.planned,
  in_progress: styles.inProgress,
  completed:   styles.completed,
};

export function EventChip({ event }: EventChipProps) {
  return (
    <div className={`${styles.chip} ${STATUS_CLASS[event.status]}`} title={event.title}>
      {event.title}
    </div>
  );
}

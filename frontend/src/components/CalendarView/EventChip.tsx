import type { EventResponse } from '../../types/event';
import styles from './EventChip.module.css';

interface EventChipProps {
  event: EventResponse;
  onEdit: (event: EventResponse) => void;
}

const STATUS_CLASS: Record<string, string> = {
  planned:     styles.planned,
  in_progress: styles.inProgress,
  completed:   styles.completed,
};

export function EventChip({ event, onEdit }: EventChipProps) {
  return (
    <div
      className={`${styles.chip} ${STATUS_CLASS[event.status]}`}
      title={event.title}
      onClick={e => { e.stopPropagation(); onEdit(event); }}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onEdit(event)}
    >
      {event.title}
    </div>
  );
}

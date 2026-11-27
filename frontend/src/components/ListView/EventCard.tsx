import type { EventResponse } from '../../types/event';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { CategoryBadge } from '../CategoryBadge/CategoryBadge';
import { formatDateRange, formatTime } from '../../utils/dateUtils';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: EventResponse;
  onEdit: (event: EventResponse) => void;
}

export function EventCard({ event, onEdit }: EventCardProps) {
  const dateRange = formatDateRange(event.startDate, event.endDate);
  const time = formatTime(event.startTime, event.endTime);

  return (
    <div className={styles.card} onClick={() => onEdit(event)} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onEdit(event)}>
      <div className={styles.cardHeader}>
        <span className={styles.title}>{event.title}</span>
        <div className={styles.badges}>
          <CategoryBadge category={event.category} />
          <StatusBadge status={event.status} />
        </div>
      </div>
      <div className={styles.dateTime}>{dateRange}　{time}</div>
      {event.description && (
        <div className={styles.description}>{event.description}</div>
      )}
    </div>
  );
}

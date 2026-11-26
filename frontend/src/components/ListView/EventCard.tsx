import type { EventResponse } from '../../types/event';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { formatDateRange, formatTime } from '../../utils/dateUtils';
import styles from './EventCard.module.css';

interface EventCardProps {
  event: EventResponse;
}

export function EventCard({ event }: EventCardProps) {
  const dateRange = formatDateRange(event.startDate, event.endDate);
  const time = formatTime(event.startTime, event.endTime);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.title}>{event.title}</span>
        <StatusBadge status={event.status} />
      </div>
      <div className={styles.dateTime}>{dateRange}　{time}</div>
      {event.description && (
        <div className={styles.description}>{event.description}</div>
      )}
    </div>
  );
}

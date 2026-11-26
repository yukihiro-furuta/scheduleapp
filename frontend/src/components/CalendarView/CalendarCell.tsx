import type { EventResponse } from '../../types/event';
import { EventChip } from './EventChip';
import styles from './CalendarCell.module.css';

const MAX_CHIPS = 3;

interface CalendarCellProps {
  dateStr: string | null;
  events: EventResponse[];
  isToday: boolean;
}

export function CalendarCell({ dateStr, events, isToday }: CalendarCellProps) {
  if (dateStr === null) {
    return <div className={`${styles.cell} ${styles.otherMonth}`} />;
  }

  const day = Number(dateStr.split('-')[2]);
  const visible = events.slice(0, MAX_CHIPS);
  const extra = events.length - MAX_CHIPS;

  return (
    <div className={`${styles.cell} ${isToday ? styles.today : ''}`}>
      <span className={styles.dateNumber}>{day}</span>
      {visible.map(ev => <EventChip key={ev.id} event={ev} />)}
      {extra > 0 && <span className={styles.moreLabel}>+{extra} more</span>}
    </div>
  );
}

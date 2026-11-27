import { useMemo } from 'react';
import type { EventResponse } from '../../types/event';
import { EventCard } from './EventCard';
import styles from './ListView.module.css';

interface ListViewProps {
  events: EventResponse[];
  onEdit: (event: EventResponse) => void;
}

export function ListView({ events, onEdit }: ListViewProps) {
  const sorted = useMemo(
    () => [...events].sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [events],
  );

  if (sorted.length === 0) {
    return <div className={styles.listView}><p className={styles.emptyMessage}>表示するイベントがありません</p></div>;
  }

  return (
    <div className={styles.listView}>
      {sorted.map(ev => <EventCard key={ev.id} event={ev} onEdit={onEdit} />)}
    </div>
  );
}

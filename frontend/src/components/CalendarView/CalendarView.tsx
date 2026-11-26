import { useMemo } from 'react';
import type { EventResponse } from '../../types/event';
import { buildCalendarGrid, isToday } from '../../utils/dateUtils';
import { CalendarCell } from './CalendarCell';
import styles from './CalendarView.module.css';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

interface CalendarViewProps {
  events: EventResponse[];
  currentMonth: string;
}

export function CalendarView({ events, currentMonth }: CalendarViewProps) {
  const grid = useMemo(() => buildCalendarGrid(currentMonth), [currentMonth]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventResponse[]>();
    for (const ev of events) {
      const existing = map.get(ev.startDate) ?? [];
      map.set(ev.startDate, [...existing, ev]);
    }
    return map;
  }, [events]);

  return (
    <div className={styles.calendarView}>
      <div className={styles.weekdayRow}>
        {WEEKDAYS.map(d => (
          <div key={d} className={styles.weekday}>{d}</div>
        ))}
      </div>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className={styles.gridRow}>
          {row.map((dateStr, colIdx) => (
            <CalendarCell
              key={colIdx}
              dateStr={dateStr}
              events={dateStr ? (eventsByDate.get(dateStr) ?? []) : []}
              isToday={dateStr ? isToday(dateStr) : false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

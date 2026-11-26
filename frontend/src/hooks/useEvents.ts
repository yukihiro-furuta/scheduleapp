import { useState, useEffect } from 'react';
import { fetchEvents } from '../api/events';
import { getCurrentMonth } from '../utils/dateUtils';
import type { EventResponse, FilterStatus } from '../types/event';

interface UseEventsReturn {
  events: EventResponse[];
  loading: boolean;
  error: string | null;
  currentMonth: string;
  activeFilter: FilterStatus;
  setCurrentMonth: (month: string) => void;
  setActiveFilter: (filter: FilterStatus) => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchEvents(currentMonth, activeFilter)
      .then(data => { if (!cancelled) setEvents(data); })
      .catch(err => { if (!cancelled) setError((err as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [currentMonth, activeFilter]);

  return { events, loading, error, currentMonth, activeFilter, setCurrentMonth, setActiveFilter };
}

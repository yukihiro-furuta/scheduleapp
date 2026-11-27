import { useState, useEffect, useCallback } from 'react';
import { fetchEvents } from '../api/events';
import { getCurrentMonth } from '../utils/dateUtils';
import type { EventResponse, FilterCategory, FilterStatus } from '../types/event';

interface UseEventsReturn {
  events: EventResponse[];
  loading: boolean;
  error: string | null;
  currentMonth: string;
  activeFilter: FilterStatus;
  activeCategoryFilter: FilterCategory;
  setCurrentMonth: (month: string) => void;
  setActiveFilter: (filter: FilterStatus) => void;
  setActiveCategoryFilter: (filter: FilterCategory) => void;
  refresh: () => void;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<EventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<string>(getCurrentMonth);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<FilterCategory>('all');
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchEvents(currentMonth, activeFilter, activeCategoryFilter)
      .then(data => { if (!cancelled) setEvents(data); })
      .catch(err => { if (!cancelled) setError((err as Error).message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [currentMonth, activeFilter, activeCategoryFilter, tick]);

  return {
    events, loading, error,
    currentMonth, activeFilter, activeCategoryFilter,
    setCurrentMonth, setActiveFilter, setActiveCategoryFilter, refresh,
  };
}

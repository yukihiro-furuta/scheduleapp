import type { EventResponse, FilterStatus } from '../types/event';

export async function fetchEvents(
  month: string,
  filter: FilterStatus,
): Promise<EventResponse[]> {
  const params = new URLSearchParams({ month });
  if (filter !== 'all') {
    params.set('status', filter);
  }
  const res = await fetch(`/api/events?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return res.json() as Promise<EventResponse[]>;
}

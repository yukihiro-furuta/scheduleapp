import type { EventResponse, EventStatus, FilterStatus } from '../types/event';

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

export interface CreateEventPayload {
  title: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  status: EventStatus;
}

export async function createEvent(payload: CreateEventPayload): Promise<EventResponse> {
  const res = await fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }
  return res.json() as Promise<EventResponse>;
}

export async function updateEvent(id: string, payload: CreateEventPayload): Promise<EventResponse> {
  const res = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} ${text}`);
  }
  return res.json() as Promise<EventResponse>;
}

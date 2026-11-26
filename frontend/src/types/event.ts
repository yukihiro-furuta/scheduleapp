// バックエンドの @JsonValue が name().toLowerCase() で出力する値に完全一致させる
// IN_PROGRESS → "in_progress"（アンダースコア、ハイフンではない）
export type EventStatus = 'planned' | 'in_progress' | 'completed';
export type FilterStatus = EventStatus | 'all';
export type ViewMode = 'calendar' | 'list';

export interface EventResponse {
  id: string;
  title: string;
  description: string | null;
  startDate: string;        // "YYYY-MM-DD"
  endDate: string | null;
  startTime: string | null; // "HH:mm:ss"（Jackson LocalTime は秒付き）
  endTime: string | null;
  status: EventStatus;
  createdAt: string;
  updatedAt: string;
}

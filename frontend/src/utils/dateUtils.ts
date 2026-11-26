const DAY_LABELS = ['日', '月', '火', '水', '木', '金', '土'] as const;

export function getCurrentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getPrevMonth(month: string): string {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(y, m - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function getNextMonth(month: string): string {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(y, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return dateStr === todayStr;
}

// 6×7 グリッドを返す。null = 隣月の埋め日
export function buildCalendarGrid(month: string): (string | null)[][] {
  const [y, m] = month.split('-').map(Number);
  const firstDay = new Date(y, m - 1, 1);
  const startDow = firstDay.getDay(); // 0=日
  const daysInMonth = new Date(y, m, 0).getDate();

  const cells: (string | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const rows: (string | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
  }
  return rows;
}

export function formatMonthLabel(month: string): string {
  const [y, m] = month.split('-').map(Number);
  return `${y}年${m}月`;
}

function parseDateParts(dateStr: string): { y: number; m: number; d: number; dow: number } {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dow = new Date(y, m - 1, d).getDay();
  return { y, m, d, dow };
}

function formatSingleDate(dateStr: string): string {
  const { m, d, dow } = parseDateParts(dateStr);
  return `${m}月${d}日（${DAY_LABELS[dow]}）`;
}

export function formatDateRange(startDate: string, endDate: string | null): string {
  if (!endDate || endDate === startDate) return formatSingleDate(startDate);
  return `${formatSingleDate(startDate)}〜 ${formatSingleDate(endDate)}`;
}

function trimSeconds(time: string): string {
  // "HH:mm:ss" → "HH:mm"
  return time.slice(0, 5);
}

export function formatTime(startTime: string | null, endTime: string | null): string {
  if (!startTime) return '終日';
  const start = trimSeconds(startTime);
  if (!endTime) return start;
  return `${start}〜${trimSeconds(endTime)}`;
}

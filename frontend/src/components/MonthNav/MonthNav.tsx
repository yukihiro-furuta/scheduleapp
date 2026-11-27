import { formatMonthLabel } from '../../utils/dateUtils';
import styles from './MonthNav.module.css';

interface MonthNavProps {
  currentMonth: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onCreateClick: () => void;
}

export function MonthNav({ currentMonth, onPrev, onNext, onToday, onCreateClick }: MonthNavProps) {
  return (
    <div className={styles.monthNav}>
      <div className={styles.navGroup}>
        <button className={styles.navButton} onClick={onPrev} aria-label="前月">‹</button>
        <span className={styles.monthLabel}>{formatMonthLabel(currentMonth)}</span>
        <button className={styles.navButton} onClick={onNext} aria-label="翌月">›</button>
      </div>
      <button className={styles.todayButton} onClick={onToday}>今日</button>
      <button className={styles.createButton} onClick={onCreateClick}>＋ 新規作成</button>
    </div>
  );
}

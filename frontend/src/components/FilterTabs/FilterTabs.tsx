import type { FilterStatus } from '../../types/event';
import styles from './FilterTabs.module.css';

interface FilterTabsProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const FILTERS: { value: FilterStatus; label: string }[] = [
  { value: 'all',         label: '全て' },
  { value: 'planned',     label: '予定' },
  { value: 'in_progress', label: '進行中' },
  { value: 'completed',   label: '完了' },
];

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className={styles.filterTabs}>
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`${styles.tab} ${activeFilter === value ? styles.tabActive : ''}`}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

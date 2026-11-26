import type { ViewMode } from '../../types/event';
import styles from './Header.module.css';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function Header({ activeView, onViewChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>スケジュール管理</h1>
      <div className={styles.viewTabs}>
        <button
          className={`${styles.viewTab} ${activeView === 'calendar' ? styles.viewTabActive : ''}`}
          onClick={() => onViewChange('calendar')}
        >
          カレンダー
        </button>
        <button
          className={`${styles.viewTab} ${activeView === 'list' ? styles.viewTabActive : ''}`}
          onClick={() => onViewChange('list')}
        >
          リスト
        </button>
      </div>
    </header>
  );
}

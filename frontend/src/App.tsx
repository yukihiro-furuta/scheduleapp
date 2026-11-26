import { useState } from 'react';
import { useEvents } from './hooks/useEvents';
import { getCurrentMonth, getPrevMonth, getNextMonth } from './utils/dateUtils';
import { Header } from './components/Header/Header';
import { FilterTabs } from './components/FilterTabs/FilterTabs';
import { MonthNav } from './components/MonthNav/MonthNav';
import { CalendarView } from './components/CalendarView/CalendarView';
import { ListView } from './components/ListView/ListView';
import type { ViewMode } from './types/event';
import styles from './App.module.css';

function getDefaultView(): ViewMode {
  return window.matchMedia('(min-width: 768px)').matches ? 'calendar' : 'list';
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>(getDefaultView);
  const {
    events, loading, error,
    currentMonth, activeFilter,
    setCurrentMonth, setActiveFilter,
  } = useEvents();

  return (
    <div className={styles.app}>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <main className={styles.main}>
        <MonthNav
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(getPrevMonth(currentMonth))}
          onNext={() => setCurrentMonth(getNextMonth(currentMonth))}
          onToday={() => setCurrentMonth(getCurrentMonth())}
        />
        {loading && <div className={styles.loading}>読み込み中...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && activeView === 'calendar' && (
          <CalendarView events={events} currentMonth={currentMonth} />
        )}
        {!loading && !error && activeView === 'list' && (
          <ListView events={events} />
        )}
      </main>
    </div>
  );
}

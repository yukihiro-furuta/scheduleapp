import { useState } from 'react';
import { useEvents } from './hooks/useEvents';
import { getCurrentMonth, getPrevMonth, getNextMonth } from './utils/dateUtils';
import { Header } from './components/Header/Header';
import { FilterTabs } from './components/FilterTabs/FilterTabs';
import { CategoryFilterTabs } from './components/CategoryFilterTabs/CategoryFilterTabs';
import { MonthNav } from './components/MonthNav/MonthNav';
import { CalendarView } from './components/CalendarView/CalendarView';
import { ListView } from './components/ListView/ListView';
import { CreateModal } from './components/CreateModal/CreateModal';
import { EditModal } from './components/EditModal/EditModal';
import type { EventResponse, ViewMode } from './types/event';
import styles from './App.module.css';

function getDefaultView(): ViewMode {
  return window.matchMedia('(min-width: 768px)').matches ? 'calendar' : 'list';
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>(getDefaultView);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventResponse | null>(null);
  const {
    events, loading, error,
    currentMonth, activeFilter, activeCategoryFilter,
    setCurrentMonth, setActiveFilter, setActiveCategoryFilter, refresh,
  } = useEvents();

  return (
    <div className={styles.app}>
      <Header activeView={activeView} onViewChange={setActiveView} />
      <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <CategoryFilterTabs activeCategory={activeCategoryFilter} onCategoryChange={setActiveCategoryFilter} />
      <main className={styles.main}>
        <MonthNav
          currentMonth={currentMonth}
          onPrev={() => setCurrentMonth(getPrevMonth(currentMonth))}
          onNext={() => setCurrentMonth(getNextMonth(currentMonth))}
          onToday={() => setCurrentMonth(getCurrentMonth())}
          onCreateClick={() => setShowCreateModal(true)}
        />
        {loading && <div className={styles.loading}>読み込み中...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && activeView === 'calendar' && (
          <CalendarView events={events} currentMonth={currentMonth} onEdit={setEditingEvent} />
        )}
        {!loading && !error && activeView === 'list' && (
          <ListView events={events} onEdit={setEditingEvent} />
        )}
      </main>
      {showCreateModal && (
        <CreateModal
          onClose={() => setShowCreateModal(false)}
          onCreated={refresh}
        />
      )}
      {editingEvent && (
        <EditModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onUpdated={refresh}
        />
      )}
    </div>
  );
}

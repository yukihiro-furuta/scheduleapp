import type { FilterCategory } from '../../types/event';
import styles from './CategoryFilterTabs.module.css';

interface Props {
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
}

const CATEGORIES: { value: FilterCategory; label: string; dotClass?: string; activeClass: string }[] = [
  { value: 'all',     label: 'すべて',     dotClass: undefined,          activeClass: styles.tabActiveAll     },
  { value: 'work',    label: '仕事',       dotClass: styles.dotWork,     activeClass: styles.tabActiveWork    },
  { value: 'private', label: 'プライベート', dotClass: styles.dotPrivate,  activeClass: styles.tabActivePrivate },
  { value: 'other',   label: 'その他',      dotClass: styles.dotOther,    activeClass: styles.tabActiveOther   },
];

export function CategoryFilterTabs({ activeCategory, onCategoryChange }: Props) {
  return (
    <div className={styles.categoryFilterTabs}>
      {CATEGORIES.map(({ value, label, dotClass, activeClass }) => (
        <button
          key={value}
          className={`${styles.tab} ${activeCategory === value ? `${styles.tabActive} ${activeClass}` : ''}`}
          onClick={() => onCategoryChange(value)}
        >
          {dotClass && <span className={`${styles.dot} ${dotClass}`} />}
          {label}
        </button>
      ))}
    </div>
  );
}

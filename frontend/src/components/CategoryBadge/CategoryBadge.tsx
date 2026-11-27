import type { EventCategory } from '../../types/event';
import styles from './CategoryBadge.module.css';

const LABEL: Record<EventCategory, string> = {
  work:    '仕事',
  private: 'プライベート',
  other:   'その他',
};

const CLASS: Record<EventCategory, string> = {
  work:    styles.work,
  private: styles.private,
  other:   styles.other,
};

interface Props {
  category: EventCategory;
}

export function CategoryBadge({ category }: Props) {
  return (
    <span className={`${styles.badge} ${CLASS[category]}`}>
      <span className={styles.dot} />
      {LABEL[category]}
    </span>
  );
}

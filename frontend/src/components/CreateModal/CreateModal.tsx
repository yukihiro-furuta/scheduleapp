import { useState } from 'react';
import type { FormEvent } from 'react';
import { createEvent } from '../../api/events';
import type { EventCategory, EventStatus } from '../../types/event';
import styles from './CreateModal.module.css';

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export function CreateModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [status, setStatus] = useState<EventStatus>('planned');
  const [category, setCategory] = useState<EventCategory>('other');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createEvent({
        title,
        description: description || null,
        startDate,
        endDate: endDate || null,
        startTime: startTime || null,
        endTime: endTime || null,
        status,
        category,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : '登録に失敗しました');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>新規スケジュール登録</span>
          <button className={styles.closeBtn} onClick={onClose} type="button">×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.field}>
              <label className={styles.label}>
                タイトル<span className={styles.required}>*</span>
              </label>
              <input
                className={styles.input}
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                maxLength={100}
                placeholder="スケジュールのタイトル"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>説明</label>
              <textarea
                className={styles.textarea}
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={500}
                placeholder="詳細（任意）"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>
                  開始日<span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.input}
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>終了日</label>
                <input
                  className={styles.input}
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  min={startDate}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>開始時刻</label>
                <input
                  className={styles.input}
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>終了時刻</label>
                <input
                  className={styles.input}
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>
                  カテゴリ<span className={styles.required}>*</span>
                </label>
                <select
                  className={styles.select}
                  value={category}
                  onChange={e => setCategory(e.target.value as EventCategory)}
                >
                  <option value="work">仕事</option>
                  <option value="private">プライベート</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>
                  ステータス<span className={styles.required}>*</span>
                </label>
                <select
                  className={styles.select}
                  value={status}
                  onChange={e => setStatus(e.target.value as EventStatus)}
                >
                  <option value="planned">予定</option>
                  <option value="in_progress">進行中</option>
                  <option value="completed">完了</option>
                </select>
              </div>
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}
          </div>

          <div className={styles.footer}>
            <button className={styles.cancelBtn} type="button" onClick={onClose}>
              キャンセル
            </button>
            <button className={styles.submitBtn} type="submit" disabled={submitting}>
              {submitting ? '登録中...' : '登録'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

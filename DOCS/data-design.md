# データ設計書

| 項目 | 内容 |
|---|---|
| 作成日 | 2026-11-24 |
| バージョン | 1.0 |
| 関連ドキュメント | [要件定義書](requirements.md) / [API設計書](api-design.md) |

---

## 1. データモデル概要

| フェーズ | データストア | 備考 |
|---|---|---|
| Phase 1 | ブラウザの localStorage | キー: `scheduleapp_events`、値: JSON配列 |
| Phase 2 | PostgreSQL 16（Docker コンテナ） | Flyway でマイグレーション管理 |

---

## 2. ER図

Phase 2 では単一テーブル構成。将来的な拡張（ユーザー・タグ等）はスコープ外。

```
┌──────────────────────────────────────────┐
│                  events                  │
├──────────────────────────────────────────┤
│ PK  id           UUID                    │
│     title        VARCHAR(100)  NOT NULL  │
│     description  VARCHAR(500)            │
│     start_date   DATE          NOT NULL  │
│     end_date     DATE                    │
│     start_time   TIME                    │
│     end_time     TIME                    │
│     status       VARCHAR(12)   NOT NULL  │
│     created_at   TIMESTAMPTZ   NOT NULL  │
│     updated_at   TIMESTAMPTZ   NOT NULL  │
└──────────────────────────────────────────┘
```

> 現フェーズでは events テーブルのみ。リレーション（外部キー）なし。

---

## 3. Phase 1：localStorageスキーマ

### 3.1 保存キー

```
scheduleapp_events
```

### 3.2 データ型定義（JSON配列）

```json
[
  {
    "id":        "lxd3k4abc",
    "title":     "週次ミーティング",
    "desc":      "議事録をまとめる",
    "startDate": "2026-11-25",
    "endDate":   "2026-11-25",
    "startTime": "10:00",
    "endTime":   "11:00",
    "status":    "planned"
  }
]
```

### 3.3 フィールド定義

| フィールド名 | 型 | 必須 | 説明 |
|---|---|---|---|
| id | string | ✓ | ランダム生成の一意ID（例: `crypto.randomUUID()` または独自生成） |
| title | string | ✓ | タイトル（最大100文字） |
| desc | string | — | 説明。未入力時は空文字 `""` |
| startDate | string | ✓ | 開始日（`YYYY-MM-DD`） |
| endDate | string | — | 終了日（`YYYY-MM-DD`）。単日イベントは空文字 `""` |
| startTime | string | — | 開始時刻（`HH:MM`）。終日の場合は空文字 `""` |
| endTime | string | — | 終了時刻（`HH:MM`）。終日の場合は空文字 `""` |
| status | string | ✓ | `"planned"` / `"in_progress"` / `"completed"` |

---

## 4. Phase 2：PostgreSQL テーブル定義

### 4.1 events テーブル

| カラム名 | 型 | 制約 | 説明 |
|---|---|---|---|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | イベントID |
| title | VARCHAR(100) | NOT NULL | タイトル |
| description | VARCHAR(500) | — | 説明（NULL 許容） |
| start_date | DATE | NOT NULL | 開始日 |
| end_date | DATE | — | 終了日（NULL = 単日イベント） |
| start_time | TIME | — | 開始時刻（NULL = 終日イベント） |
| end_time | TIME | — | 終了時刻（NULL 許容） |
| status | VARCHAR(12) | NOT NULL, CHECK (status IN ('planned','in_progress','completed')) | ステータス |
| created_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | 作成日時 |
| updated_at | TIMESTAMPTZ | NOT NULL, DEFAULT now() | 更新日時 |

### 4.2 DDL（Flyway マイグレーションファイル例）

```sql
-- V1__create_events_table.sql
CREATE TABLE events (
    id          UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    start_date  DATE         NOT NULL,
    end_date    DATE,
    start_time  TIME,
    end_time    TIME,
    status      VARCHAR(12)  NOT NULL
                CHECK (status IN ('planned', 'in_progress', 'completed')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT now()
);
```

### 4.3 インデックス

| インデックス名 | 対象カラム | 目的 |
|---|---|---|
| idx_events_start_date | start_date | 月別フィルタリングの高速化 |
| idx_events_status | status | ステータス絞り込みの高速化 |

```sql
CREATE INDEX idx_events_start_date ON events (start_date);
CREATE INDEX idx_events_status     ON events (status);
```

---

## 5. バリデーションルール

| ルール | 内容 |
|---|---|
| start_date ≤ end_date | 終了日が開始日より前であってはならない |
| start_time が NULL のとき end_time も NULL | 開始時刻なしで終了時刻のみ登録することはできない |
| start_time ≤ end_time | 終了時刻が開始時刻より前であってはならない |

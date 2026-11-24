# API設計書（Phase 2）

| 項目 | 内容 |
|---|---|
| 作成日 | 2026-11-24 |
| バージョン | 1.0 |
| 関連ドキュメント | [要件定義書](requirements.md) / [データ設計書](data-design.md) |

> Phase 1（バニラJS / localStorage）ではAPIは存在しない。本書は Phase 2（Spring Boot + PostgreSQL）の仕様を記載する。

---

## 1. 共通仕様

| 項目 | 内容 |
|---|---|
| ベースURL | `http://localhost:8080` |
| Content-Type | `application/json` |
| 文字コード | UTF-8 |
| 認証 | なし（ローカル環境のみ） |
| CORS | `http://localhost:5173`（Vite開発サーバー）のみ許可 |

---

## 2. エンドポイント一覧

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/api/events` | イベント一覧取得 |
| GET | `/api/events/{id}` | イベント単件取得 |
| POST | `/api/events` | イベント作成 |
| PUT | `/api/events/{id}` | イベント更新（全項目） |
| DELETE | `/api/events/{id}` | イベント削除 |

---

## 3. イベントオブジェクト（共通レスポンス形式）

```json
{
  "id":          "550e8400-e29b-41d4-a716-446655440000",
  "title":       "週次ミーティング",
  "description": "議事録をまとめる",
  "startDate":   "2026-11-25",
  "endDate":     "2026-11-25",
  "startTime":   "10:00",
  "endTime":     "11:00",
  "status":      "planned",
  "createdAt":   "2026-11-24T09:00:00Z",
  "updatedAt":   "2026-11-24T09:00:00Z"
}
```

| フィールド | 型 | Null許容 | 説明 |
|---|---|---|---|
| id | string (UUID) | — | イベントID |
| title | string | — | タイトル |
| description | string \| null | ✓ | 説明 |
| startDate | string (YYYY-MM-DD) | — | 開始日 |
| endDate | string \| null | ✓ | 終了日（null = 単日） |
| startTime | string \| null | ✓ | 開始時刻（null = 終日） |
| endTime | string \| null | ✓ | 終了時刻 |
| status | string | — | `planned` / `in_progress` / `completed` |
| createdAt | string (ISO8601) | — | 作成日時 |
| updatedAt | string (ISO8601) | — | 更新日時 |

---

## 4. GET /api/events

### 説明
イベントの一覧を取得する。クエリパラメーターによるフィルタリングが可能。

### クエリパラメーター

| パラメーター | 型 | 必須 | 説明 | 例 |
|---|---|---|---|---|
| status | string | — | ステータスで絞り込み | `?status=planned` |
| month | string | — | 指定月に該当するイベントを返す（YYYY-MM形式） | `?month=2026-11` |

### レスポンス

**200 OK**
```json
[
  { ...イベントオブジェクト... },
  { ...イベントオブジェクト... }
]
```

---

## 5. GET /api/events/{id}

### 説明
指定IDのイベントを1件取得する。

### パスパラメーター

| パラメーター | 型 | 説明 |
|---|---|---|
| id | UUID | 取得するイベントのID |

### レスポンス

**200 OK**
```json
{ ...イベントオブジェクト... }
```

**404 Not Found**
```json
{ "error": "Event not found" }
```

---

## 6. POST /api/events

### 説明
新規イベントを作成する。

### リクエストボディ

```json
{
  "title":       "週次ミーティング",
  "description": "議事録をまとめる",
  "startDate":   "2026-11-25",
  "endDate":     "2026-11-25",
  "startTime":   "10:00",
  "endTime":     "11:00",
  "status":      "planned"
}
```

| フィールド | 必須 | バリデーション |
|---|---|---|
| title | ✓ | 最大100文字 |
| description | — | 最大500文字 |
| startDate | ✓ | 有効な日付（YYYY-MM-DD） |
| endDate | — | startDate以降 |
| startTime | — | 有効な時刻（HH:MM） |
| endTime | — | startTime以降（startTimeが指定された場合） |
| status | ✓ | `planned` / `in_progress` / `completed` |

### レスポンス

**201 Created**
```json
{ ...作成されたイベントオブジェクト... }
```

**400 Bad Request**
```json
{
  "error": "Validation failed",
  "details": {
    "title": "タイトルは必須です",
    "startDate": "開始日は必須です"
  }
}
```

---

## 7. PUT /api/events/{id}

### 説明
指定IDのイベントを全項目で上書き更新する。

### パスパラメーター

| パラメーター | 型 | 説明 |
|---|---|---|
| id | UUID | 更新するイベントのID |

### リクエストボディ

POST と同じ形式。全フィールドを送信すること（部分更新は不可）。

### レスポンス

**200 OK**
```json
{ ...更新されたイベントオブジェクト... }
```

**404 Not Found** / **400 Bad Request** — POST と同様の形式

---

## 8. DELETE /api/events/{id}

### 説明
指定IDのイベントを削除する。

### パスパラメーター

| パラメーター | 型 | 説明 |
|---|---|---|
| id | UUID | 削除するイベントのID |

### レスポンス

**204 No Content** — ボディなし

**404 Not Found**
```json
{ "error": "Event not found" }
```

---

## 9. エラーレスポンス共通形式

| HTTPステータス | 状況 |
|---|---|
| 400 Bad Request | バリデーションエラー |
| 404 Not Found | 指定IDのイベントが存在しない |
| 500 Internal Server Error | サーバー内部エラー |

```json
{
  "error": "エラーの概要",
  "details": { "フィールド名": "詳細メッセージ" }
}
```

# scheduleapp

個人利用向けのスケジュール管理アプリ。  
カレンダービューとリストビューでイベントを視覚的に管理し、ステータス（予定 / 進行中 / 完了）で進捗を追跡できる。

---

## 技術スタック

| レイヤー | 技術 | バージョン |
|---|---|---|
| フロントエンド | React + TypeScript | 19.3.1 / 7.0.2 |
| ビルドツール | Vite | 8.3.8 |
| バックエンド | Spring Boot (Java) | 3.4.0 / Java 21 |
| データベース | PostgreSQL | 16.15 |
| マイグレーション | Flyway | 10.x |
| コンテナ | Docker Compose | — |

詳細は [DOCS/tech-stack.md](DOCS/tech-stack.md) を参照。

---

## クイックスタート

### 前提条件

- Docker Desktop
- Node.js（npm 付属）
- JDK 21

### 1. リポジトリをクローン

```bash
git clone https://github.com/yukihiro-furuta/scheduleapp.git
cd scheduleapp
```

### 2. データベースを起動

```bash
docker compose up -d
```

PostgreSQL が `localhost:5433` で起動する。

### 3. バックエンドを起動

```bash
cd backend
./mvnw spring-boot:run
```

`http://localhost:8080` で起動。Flyway が自動的にスキーマとテストデータを適用する。

### 4. フロントエンドを起動

```bash
cd frontend
npm install
npm run dev
```

`http://localhost:5173` でアプリにアクセスできる。

> **ポートが競合している場合**  
> ポート番号は変更せず、占有プロセスを停止してから起動すること。  
> 詳細は [CLAUDE.md](CLAUDE.md) の「ポート競合時の必須手順」を参照。

---

## API

バックエンドが提供する REST API の概要：

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/api/events` | イベント一覧取得 |
| GET | `/api/events/{id}` | イベント単件取得 |
| POST | `/api/events` | イベント作成 |
| PUT | `/api/events/{id}` | イベント更新 |
| DELETE | `/api/events/{id}` | イベント削除 |

詳細は [DOCS/api-design.md](DOCS/api-design.md) を参照。

---

## ディレクトリ構成

```
scheduleapp/
├── backend/                  # Spring Boot バックエンド
│   └── src/
│       └── main/
│           ├── java/         # エンティティ / リポジトリ / コントローラー
│           └── resources/
│               └── db/migration/   # Flyway マイグレーション SQL
├── frontend/                 # React + TypeScript フロントエンド
│   └── src/
│       ├── api/              # バックエンド API クライアント
│       ├── components/       # UI コンポーネント
│       ├── hooks/            # カスタムフック
│       ├── types/            # 型定義
│       └── utils/            # ユーティリティ
├── DOCS/                     # 設計ドキュメント
├── CLAUDE.md                 # Claude Code 開発ルール
└── docker-compose.yml        # DB コンテナ定義
```

---

## ドキュメント

| ドキュメント | 内容 |
|---|---|
| [要件定義書](DOCS/requirements.md) | プロジェクト概要・スケジュール・成功基準 |
| [機能要件定義書](DOCS/functional-spec.md) | ユーザーストーリー・CRUD仕様・受け入れ条件 |
| [画面設計書](DOCS/screen-design.md) | 画面一覧・画面遷移・ワイヤーフレーム |
| [データ設計書](DOCS/data-design.md) | ER図・テーブル定義・バリデーション |
| [API設計書](DOCS/api-design.md) | REST API エンドポイント・リクエスト/レスポンス仕様 |
| [技術スタック](DOCS/tech-stack.md) | 採用技術・バージョン・選定理由 |
| [非機能要件](DOCS/non-functional.md) | テスト方針・リスク管理・用語集 |

---

## 開発フロー

1. GitHub Issue を作成する
2. `feature/issue-{番号}-{説明}` ブランチを切る
3. 実装・コミット（Conventional Commits 形式）
4. PR を作成し `main` にマージする（`main` への直接 push 禁止）

詳細は [CLAUDE.md](CLAUDE.md) を参照。

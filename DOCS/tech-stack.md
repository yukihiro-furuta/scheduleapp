# 技術スタック

| 項目 | 内容 |
|---|---|
| 作成日 | 2026-11-24 |
| バージョン | 1.0 |
| 関連ドキュメント | [要件定義書](requirements.md) |

---

## 1. Phase 1（バニラJS プロトタイプ）

| 種別 | 技術 | バージョン | 選定理由 |
|---|---|---|---|
| マークアップ | HTML5 | — | 標準仕様。外部依存ゼロ |
| スタイル | CSS3 | — | モバイルファーストで記述。外部フレームワーク不使用 |
| スクリプト | JavaScript | ES2022, Strict mode | 外部ライブラリ不使用でDOMを直接操作。Phase 2 への移行前の動作確認用 |
| データ保存 | localStorage | — | サーバー不要で即起動できる。ブラウザ標準API |
| フォント | Noto Sans JP | — | 日本語表示に最適化されたGoogleフォント |

### 1.1 開発・実行環境

- 追加ツール不要（ブラウザで `index.html` を直接開いて動作）
- 対応ブラウザ: Chrome / Safari / Edge 最新版

---

## 2. Phase 2（フルスタック実装）

### 2.1 フロントエンド

| 種別 | 技術 | バージョン | 選定理由 |
|---|---|---|---|
| フレームワーク | React | 19.x | コンポーネント単位での状態管理に適しており、カレンダーUIのような複雑なUIを構築しやすい |
| 型システム | TypeScript | 7.x | 型安全性によるバグの早期発見。IDE補完による開発効率向上 |
| ビルドツール | Vite | 8.x | 高速なHMR（ホットリロード）と軽量なバンドル |
| スタイル | CSS Modules | — | コンポーネントスコープのスタイルで命名衝突を防止。外部UIライブラリ不使用 |

### 2.2 バックエンド

| 種別 | 技術 | バージョン | 選定理由 |
|---|---|---|---|
| フレームワーク | Spring Boot | 3.4.x | Javaの標準的なWebフレームワーク。REST APIの構築が容易 |
| 言語 | Java | 21（LTS） | Spring Bootの主要言語。長期サポート版を採用 |
| ORM | Spring Data JPA / Hibernate | — | SQLを直接書かずにDB操作が可能。エンティティとテーブルのマッピングを自動化 |
| DB | PostgreSQL | 16 | オープンソースで高信頼性。UUID型・TIMESTAMPTZ型などの豊富な型をネイティブサポート |
| マイグレーション | Flyway | — | SQLファイルによるスキーマバージョン管理。チーム開発・環境間差異を防止 |
| コンテナ | Docker Compose | — | `docker compose up` 一コマンドでDB含む全環境を起動できる |

### 2.3 開発・実行環境

| 項目 | 内容 |
|---|---|
| 必要ツール | Docker Desktop / Node.js / JDK 21 |
| フロントエンド起動 | `npm run dev`（Vite 開発サーバー、ポート 5173） |
| バックエンド起動 | `./mvnw spring-boot:run` または `docker compose up` |
| DB接続先 | `localhost:5432` / DB名: `scheduleapp` |

---

## 3. 対応ブラウザ・OS

| 種別 | 対象 |
|---|---|
| OS（PC） | Windows 11 / macOS |
| ブラウザ（PC） | Google Chrome 最新版 / Microsoft Edge 最新版 / Safari 最新版 |
| ブラウザ（スマホ） | iOS Safari / Android Chrome |

---

## 4. スコープ外の技術

以下は本プロジェクトでは使用しない。

| 技術 | 理由 |
|---|---|
| 外部UIライブラリ（MUI, Tailwind等） | スタイルの学習・制御のため手書きCSSを採用 |
| 外部ドラッグ&ドロップライブラリ | HTML5 DnD APIで要件を満たすため |
| Redux / Zustand等状態管理ライブラリ | 単一ユーザーの小規模アプリのためReact標準のstateで十分 |
| GraphQL | RESTで要件を満たすため |

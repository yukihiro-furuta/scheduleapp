# CLAUDE.md — Claude Code 開発ルール

このファイルは Claude Code が必ず守るルールを定義する。

---

## 必須ワークフロー

### ステップ 1: 作業前に GitHub Issue を作成する

**あらゆる変更（機能追加・バグ修正・ドキュメント更新・リファクタリング）を
始める前に、必ず GitHub Issue を作成しなければならない。**

```bash
gh issue create --title "feat: ○○を実装する" --body "..."
```

Issue 番号を記録する（以降のステップで使用）。

---

### ステップ 2: Issue に紐づくブランチを作成する

| プレフィックス | 用途 | 例 |
|--------------|------|----|
| `feature/` | 機能追加 | `feature/issue-12-add-event-api` |
| `fix/` | バグ修正 | `fix/issue-7-fix-date-validation` |
| `docs/` | ドキュメント | `docs/issue-3-update-readme` |
| `chore/` | 依存関係・設定変更 | `chore/issue-15-update-pom` |
| `refactor/` | リファクタリング | `refactor/issue-9-extract-service` |
| `test/` | テスト追加・修正 | `test/issue-11-add-unit-tests` |

命名規則: `{プレフィックス}/issue-{Issue番号}-{英語ケバブケース}`

```bash
git checkout -b feature/issue-{番号}-{説明}
```

---

### ステップ 3: main への直接 push は絶対に行わない

```bash
# NG
git push origin main

# OK
git push origin feature/issue-12-add-event-api
```

---

### ステップ 4: 作業完了後は PR を作成してマージする

```bash
gh pr create --title "feat: ○○を実装する" --body "Closes #12"
```

- PR 本文に `Closes #{Issue番号}` を含めて Issue を自動クローズさせる
- マージ後はブランチを削除する

---

## コミットメッセージ規則（Conventional Commits）

```
feat: 機能追加
fix: バグ修正
docs: ドキュメントの変更
chore: ビルド・設定・依存関係の変更
refactor: リファクタリング
test: テストの追加・修正
```

---

## プロジェクト情報

### ディレクトリ構造
- バックエンド: `backend/`（Spring Boot 3.4.x, Java 21）
- フロントエンド: `frontend/`（将来追加予定）
- ドキュメント: `DOCS/`

### 開発環境起動
```bash
# DB 起動
docker compose up -d

# バックエンド起動（ポート 8080）
cd backend && ./mvnw spring-boot:run
```

DB は `localhost:5433` で公開（コンテナ内部は 5432）。

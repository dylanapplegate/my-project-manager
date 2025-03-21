# my-project-manager

A local-first, intelligent CLI-based task manager built with TypeScript, Prisma, Docker, and AI suggestions powered by LM Studio.

This is the **first implementation** of a larger vision: a productivity platform that tracks tasks, suggests next actions, and helps build intentional workflows. The current version provides a test-driven, CLI interface for managing your tasks and intelligently generating the next best task to focus on.

---

## Features

- 📌 **Add, list, and complete tasks** using intuitive CLI commands
- 🤖 **AI-powered task suggestions** using local models via LM Studio
- 🧠 **Context-aware prioritization** (completed/pending tasks passed to AI)
- 💾 **PostgreSQL with Prisma ORM** (containerized with Docker Compose)
- 🧪 **Full Jest test suite** with high code coverage
- 🛠️ **Modern TypeScript dev setup** (ESLint, Prettier, TSX, etc.)

---

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Node.js ≥ 18 (for local CLI dev)
- LM Studio (running locally)
- If you want to run the CLI directly with `my-task-manager`, install tsx globally:
  ```bash
  npm install -g tsx
  ```

### Run with Docker

```bash
git clone https://github.com/dylanapplegate/my-project-manager.git
cd my-project-manager
docker-compose up -d
```

---

## CLI Usage

```bash
my-task-manager add "Write blog post" -d 2025-03-22
```

Available commands:

- `add <title> [-d YYYY-MM-DD]` — Add a task, optionally with a due date
- `list [--completed]` — List pending (default) or completed tasks
- `complete <id>` — Mark a task as completed
- `suggest` — Get an AI-generated suggestion based on task history

> ℹ️ If you see an error like `env: tsx: No such file or directory`, make sure you've installed `tsx` globally with `npm install -g tsx`.

---

## Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Apply Migrations

```bash
npx prisma migrate dev
```

### Launch Prisma Studio

```bash
npx prisma studio
```

---

## Project Structure

```
src/
├── cli.ts             # CLI entry point
├── commands/          # Core CLI commands (add, list, complete, suggest)
├── lmstudio/          # AI suggestion logic
├── tests/             # Jest test suites
prisma/
├── schema.prisma      # DB schema
├── migrations/        # SQL migration files
docker-compose.yaml    # DB and app containers
```

---

## Roadmap

## For more detail on the project roadmap, see [`ROADMAP.md`](./ROADMAP.md).

## Long-Term Vision

This project will evolve into a goal-aware personal productivity assistant, especially tailored to job search activities like:

- 🧠 Daily LeetCode practice with pacing and difficulty suggestions
- ✍️ Blog post planning, tracking, and publishing workflows
- 🌐 LinkedIn post scheduling and content planning
- 💻 GitHub open-source contribution tracking and prioritization
- 📊 Weekly progress summaries and reflective journaling prompts

For more detail on the project roadmap, see [`ROADMAP.md`](./ROADMAP.md).

---

## Changelog

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

- Add support for task categories, goals, and projects (in progress)

## [1.0.0] - 2025-03-21

### Added

- Initial CLI with `add`, `list`, `complete`, and `suggest` commands
- PostgreSQL integration using Prisma ORM
- Prisma schema with `Task` and `TaskLog` models
- LM Studio integration for AI-powered task suggestions
- Docker and Docker Compose setup
- Full Jest test suite with 98%+ coverage
- README and ROADMAP files with long-term vision
- ESLint, Prettier, and TypeScript tooling setup

### Notes

- This release is the foundation for a larger personal productivity system with AI-assisted suggestions and job-search-focused workflows.

---

## License

ISC

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

### Run with Docker

```bash
git clone https://github.com/dylanapplegate/my-project-manager.git
cd my-project-manager
docker-compose up -d
```

---

## CLI Usage

```bash
npm run start
```

Available commands:

- `add <title> [-d YYYY-MM-DD]` — Add a task, optionally with a due date
- `list [--completed]` — List pending (default) or completed tasks
- `complete <id>` — Mark a task as completed
- `suggest` — Get an AI-generated suggestion based on task history

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

- [x] Core task management via CLI
- [x] AI suggestions based on context
- [x] Dockerized PostgreSQL database
- [x] Full test coverage for CLI commands
- [ ] Extend AI reasoning using task categories
- [ ] Add task logging (via `TaskLog` model)
- [ ] Support local scheduling/reminders
- [ ] Build web UI to complement CLI
- [ ] Offline-first sync and mobile client

---

## Long-Term Vision

This project will evolve into a goal-aware personal productivity assistant, especially tailored to job search activities like:

- 🧠 Daily LeetCode practice with pacing and difficulty suggestions
- ✍️ Blog post planning, tracking, and publishing workflows
- 🌐 LinkedIn post scheduling and content planning
- 💻 GitHub open-source contribution tracking and prioritization
- 📊 Weekly progress summaries and reflective journaling prompts

For more detail on the project roadmap, see [`ROADMAP.md`](./ROADMAP.md).

---

## License

ISC

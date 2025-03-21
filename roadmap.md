# Project Roadmap — my-project-manager

## Phase 1: CLI MVP ✅

- [x] Add, list, and complete tasks from the command line
- [x] PostgreSQL + Prisma integration
- [x] Docker Compose setup for local development
- [x] AI-powered suggestions using LM Studio
- [x] Full Jest test coverage and CLI command testing

---

## Phase 2: Goal-Aware Productivity Assistant 🚧

### Task Categorization & Goals

- [ ] Add `category`, `goal`, and `project` fields to tasks
- [ ] Allow CLI filtering by category or goal
- [ ] Update LM Studio prompt context to include task metadata

### Job-Hunting Modules

- [ ] **LeetCode Tracker**

  - Add `leetcode` task type
  - Track problems by difficulty & frequency
  - Suggest next problem based on goal and backlog

- [ ] **Blog Workflow**

  - Add `blog` task type
  - Track drafts, outlines, edits, and publish status
  - Suggest blog topics based on completed technical tasks

- [ ] **LinkedIn Content Planner**

  - Add `linkedin` task type
  - Schedule and track planned posts
  - Suggest posts tied to recent accomplishments

- [ ] **GitHub Open Source Contributions**
  - Add `opensource` task type
  - Track linked PRs/issues
  - Suggest issues from favorited repos or contributions in progress

### Reflection & Weekly Insights

- [ ] CLI command to trigger weekly review
- [ ] Auto-generate summaries of completed work
- [ ] Prompt for reflection questions and log answers

---

## Phase 3: UI + Sync 🔮

### Web & Mobile Interfaces

- [ ] Build lightweight React dashboard
- [ ] Show tasks by goal/project with filters
- [ ] Add mobile-first layout with PWA or Expo (later)

### Sync & Notifications

- [ ] Local-first sync model for tasks
- [ ] Schedule notifications/reminders for due tasks

---

## Phase 4: AI Agent Capabilities 🧠

- [ ] Let AI summarize weekly performance
- [ ] Let AI recommend goal pacing (e.g., 3 LeetCode problems/week)
- [ ] Generate roadmap suggestions dynamically

---

## Stretch Goals ✨

- [ ] GitHub integration (via API)
- [ ] LeetCode API scraper or browser extension
- [ ] VS Code integration (task overlay)
- [ ] Markdown export of weekly plans & journals

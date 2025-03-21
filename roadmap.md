# Project Roadmap — my-project-manager

`my-project-manager` is a local-first, CLI-native productivity assistant that uses AI to help developers and job seekers work with more intention.

This roadmap reflects the staged development of a system that started with a CLI-based task tracker and is evolving into an intelligent personal assistant. The goal is to support workflows like LeetCode, blogging, GitHub contributions, and personal rituals — all offline-capable and tailored to individual goals.

> ❗ Note: Although originally planned with Deno, the project now uses Node.js 23 and TSX for improved ecosystem compatibility.

> 🔍 We plan to integrate a **vector database** (likely Weaviate) to support task memory, context, and suggestion history as the system evolves into an AI agent.

---

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

### Contextual Memory & Retrieval

- [ ] Track completed and skipped tasks with logs
- [ ] Store task summaries and reflections as vector embeddings
- [ ] Integrate vector database (e.g., Weaviate or ChromaDB) for fast retrieval
- [ ] Use task memory to tailor future suggestions and avoid repetition

### Smart Prioritization Engine

- [ ] Score pending tasks based on deadlines, dependencies, and frequency
- [ ] Learn from past completions and category balance
- [ ] Use AI to recommend a single, high-impact task
- [ ] Adapt to user pacing (e.g., LeetCode fatigue or blog focus weeks)

### Weekly Agent Summary

- [ ] Summarize user’s past week in natural language
- [ ] Offer guidance or pacing for upcoming week based on behavior

### Assistant Reasoning & Support

- [ ] CLI command: "What’s blocking me right now?" — uses past attempts, due dates, and task logs
- [ ] Suggest weekly task pacing and dynamic re-prioritization
- [ ] Detect stuck tasks and suggest alternatives or reframing

---

## Phase 5: Learning Integration 📚

- [ ] Create tasks directly from bookmarks, GitHub issues, blog posts, or Hacker News links
- [ ] Use Markdown-to-task parsing from scraped or fetched content
- [ ] Auto-link completed tasks to a Zettelkasten-style note or journal entry
- [ ] Sync notes or insights to Obsidian or external markdown repositories

---

## Stretch Goals ✨

- [ ] GitHub integration (via API)
- [ ] LeetCode API scraper or browser extension
- [ ] VS Code integration (task overlay)
- [ ] Markdown export of weekly plans & journals
- [ ] Interactive CLI enhancements (e.g., `fzf` filters, color-coded urgency)
- [ ] GitHub Action or CI sync with PRs and task completions
- [ ] Export logs and weekly reflections to Notion or Markdown
- [ ] Optional journaling agent for end-of-week summaries and affirmations

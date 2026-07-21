# Priorix — Task Manager

Priorix is a full-stack task management application built as a Junior Full-Stack Developer test assignment.

The project demonstrates a complete full-stack application with a focus on clean architecture, reusable components, and a polished user experience. Every task has a priority from 1 to 10, making it easy to organize work, filter results, and focus on what matters most.

## Overview

The application is structured as a monorepo with two separate applications:

- **Backend** — a REST API built with Express 5 and Prisma, backed by SQLite. Responsible for request validation, business logic, and data persistence.
- **Frontend** — a Next.js 15 application with a landing page (`/`) and a task manager (`/tasks`).

Custom components are styled with CSS Modules, while shadcn/ui provides accessible UI primitives such as buttons, dialogs, inputs, selects, and other reusable interface elements.

---

## Tech Stack

### Frontend (`apps/frontend`)

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui (Radix UI)
- sonner (toast notifications)

### Backend (`apps/backend`)

- Express 5
- TypeScript
- Prisma ORM
- SQLite
- Zod

---

## Architecture

The project follows a feature-oriented structure.

**Frontend responsibilities**
- UI rendering
- State management
- API communication
- User interactions

**Backend responsibilities**
- Request validation
- Business logic
- Database access
- Error handling

The frontend communicates with the backend exclusively through a REST API.

---

## Features

- Create, edit and delete tasks
- Confirmation dialog before deletion
- Mark tasks as done / undone
- Search by title with 350 ms debounce
- Filter by status (All / Done / Undone)
- Sort by priority (ascending / descending)
- Priority levels (1–10) with color-coded badges
- Due dates with validation (past dates disabled)
- Overdue task highlighting
- Pagination (5 tasks per page)
- Smart empty states
- Toast notifications
- Skeleton loading for the initial request
- Form validation

---

## Design Decisions

Some implementation decisions made during development:

- CSS Modules for maintainable component styling
- Feature-based folder organization
- Reusable UI built on shadcn/ui
- Prisma migrations for database versioning
- Debounced search to reduce unnecessary API requests
- Toast notifications for asynchronous operations
- Confirmation dialog before destructive actions
- Separation between API layer, hooks, UI components, helpers, constants, and types

---

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Configure environment variables

`apps/backend/.env`:
```
DATABASE_URL="file:./dev.db"
PORT=3001
```

`apps/frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run database migrations

```
cd apps/backend
npm run db:migrate
```

### 4. Start the project

From the repository root:

```
npm run dev
```

Or run each application separately:

```
cd apps/backend
npm run dev
```

```
cd apps/frontend
npm run dev
```

---

## Project Structure

```
Priorix/
├── apps/
│   ├── backend/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── src/
│   │       ├── features/tasks/
│   │       ├── lib/
│   │       ├── middleware/
│   │       └── index.ts
│   │
│   └── frontend/
│       ├── app/
│       │   ├── page.tsx
│       │   └── tasks/
│       ├── components/
│       │   ├── tasks/
│       │   └── ui/
│       ├── constants/
│       ├── helpers/
│       ├── hooks/
│       ├── lib/
│       └── types/
│
└── package.json
```

---

## API Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/tasks` | Returns tasks with filtering, searching and sorting |
| `POST` | `/api/tasks` | Creates a new task |
| `PATCH` | `/api/tasks/:id` | Updates an existing task |
| `DELETE` | `/api/tasks/:id` | Removes a task |

---

## AI Workflow

AI tools (primarily Claude Code) were used throughout the project as development assistants to speed up implementation, generate boilerplate, and explore alternative solutions.

The application architecture, project structure, feature set, and technical decisions were defined by me. Every AI-generated change was reviewed, tested, and adjusted before being accepted.

Examples of decisions made during development include:

- using CSS Modules for all custom components instead of inline utility classes;
- simplifying generated TypeScript solutions into explicit and maintainable interfaces;
- fixing issues discovered during testing, including date handling and UX improvements;
- refining loading states, empty states, search behaviour, confirmation dialogs, and notifications.

AI accelerated implementation, while all architectural decisions, code review, debugging, testing, and final implementation choices remained my responsibility.

---

## Scripts

### Root

```
npm run dev
npm run build
```

### Backend

```
npm run dev
npm run db:migrate
npm run db:push
npm run db:studio
```

### Frontend

```
npm run dev
npm run build
npm run lint
```

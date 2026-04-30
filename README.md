# 📝 Mini Task Tracker — Organize Your Day

A modern task management app built with **React + TypeScript + Tailwind CSS**, designed as a take-home challenge implementation with clean architecture, persistence, and strong UX focus.

---

## 🚀 Overview

Mini Task Tracker helps users organize daily tasks by category, track completion progress, and persist data across sessions.  
It demonstrates practical React patterns including hooks, state management, component decomposition, and testing.

---

## ✨ Features

### 📌 Task Management
- Create tasks with title and category
- Edit existing tasks
- Delete tasks
- Mark tasks as completed

### 🗂️ Categorization & Filtering
- Filter tasks by:
  - All
  - Work
  - Personal
  - Study
- Live category counters

### 💾 Persistence
- Automatic saving using `localStorage`
- Tasks remain after page refresh

### 📊 Progress Tracking
- Real-time progress bar based on completed tasks

### 🎨 User Experience
- Toast notifications for user actions
- Responsive dark UI
- Clean and minimal design
- Input validation feedback

---

## 🧱 Tech Stack

- React (Vite)
- TypeScript
- Tailwind CSS
- React Toastify
- Custom Hooks
- Vitest + React Testing Library

---

## 📁 Project Structure
src/
├── components/
│ ├── task/
│ │ ├── TaskInput.tsx
│ │ ├── TaskList.tsx
│ │ ├── Filter.tsx
│ │
│ ├── UI/
│ │ └── ProgressBar.tsx
│
├── hooks/
│ └── useLocalStorage.ts
│
├── types/
│ └── Task.ts
│
├── Test/
│ └── App.test.tsx
│
├── App.tsx
├── main.tsx
└── index.css


---

## 🧠 Key Design Decisions

### 1. Component Modularity
Each feature is isolated into reusable components:
- `TaskInput` → creation & editing logic
- `TaskList` → rendering & actions
- `ProgressBar` → derived UI state

### 2. Custom Hook for Persistence
`useLocalStorage` abstracts persistence logic for reuse and cleaner components.

### 3. Derived State Optimization
Filtering and progress are computed using `useMemo` for efficiency and clarity.

---

## 🧪 Testing Strategy

This project uses **Vitest** with **React Testing Library** to ensure core user interactions work correctly from a real user perspective.

The focus of testing is not implementation details, but **user behavior** (what a user sees and does in the UI).

### 🎯 What is tested and why

The tests simulate real user workflows:

- ✔ **Adding a task**
  - Ensures user input updates the UI correctly

- ✔ **Editing a task**
  - Verifies that existing tasks can be modified

- ✔ **Deleting a task**
  - Confirms tasks are removed from the UI

- ✔ **Filtering tasks**
  - Ensures only relevant category tasks are displayed

- ✔ **Toggling completion**
  - Validates checkbox updates task state correctly

- ✔ **LocalStorage persistence**
  - Ensures tasks remain after page refresh (data persistence layer works correctly)

---

### 🧠 Testing Philosophy

The tests are written to follow **user-centric testing principles**:

- Focus on **what the user sees**, not internal state
- Avoid testing implementation details
- Validate complete user flows instead of isolated logic

This makes the test suite more reliable and closer to real-world usage.

---

### ▶️ Run Tests

```bash id="testsection2"
npm run test
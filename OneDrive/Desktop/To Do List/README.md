# 📝 Simple To-Do List App

A full-stack To-Do List application built with **Java Spring Boot** (backend) + **React** (frontend) and **SQLite3** as the database.

---

## 🗂️ Project Structure

```
To Do List/
├── backend/    ← Spring Boot REST API (Java 17 + SQLite)
└── frontend/   ← React UI (Vite)
```

---

## 🚀 Running the App

### Step 1 — Start the Backend

Open a terminal in the `backend/` folder:

```powershell
# Windows (Maven Wrapper — no Maven install needed)
.\mvnw.cmd spring-boot:run
```

> The server starts at **http://localhost:8080**
> A `todo.db` SQLite file is auto-created on first run.

### Step 2 — Start the Frontend

Open a **second** terminal in the `frontend/` folder:

```powershell
npm install   # only needed once
npm run dev
```

> The app opens at **http://localhost:5173**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| ➕ Add todos | Type a title and press Add |
| ✅ Complete todos | Click the checkbox to toggle done/undone |
| ✏️ Edit todos | Double-click the title or click the pencil icon |
| 🗑️ Delete todos | Click the trash icon on any item |
| 🔍 Filter | Switch between **All**, **Active**, and **Completed** |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA |
| Database | SQLite3 (via `sqlite-jdbc` + Hibernate SQLite dialect) |
| Frontend | React 18, Vite |
| Styling | Vanilla CSS (dark glassmorphism theme) |

---

## 📡 API Endpoints

| Method | URL | Body | Description |
|--------|-----|------|-------------|
| `GET` | `/api/todos` | — | Get all todos |
| `POST` | `/api/todos` | `{ "title": "..." }` | Create a todo |
| `PUT` | `/api/todos/{id}` | `{ "completed": true }` or `{ "title": "..." }` | Update todo |
| `DELETE` | `/api/todos/{id}` | — | Delete a todo |

---

## ⚠️ Requirements

- **Java 17+** — [Download JDK](https://adoptium.net/)
- **Node.js 18+** — [Download Node](https://nodejs.org/)
- No Maven install needed (Maven Wrapper included)
- No MySQL needed — SQLite file is created automatically

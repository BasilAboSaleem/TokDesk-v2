# TokDesk v2

**Version:** v2 (Professional, Modular, Full-Stack)

**Description:**
TokDesk v2 is a professional backend system for company management, internal communication, and project collaboration. It provides a modular architecture with role-based access control, real-time messaging, notifications, and support for departments, projects, and employees.

**Key Features:**

* User roles: Super Admin, Company Admin, Head of Department, Project Manager, Employee, Guest.
* Company & department management.
* Project and employee management.
* Real-time conversations (1:1, group, project-based).
* Role-based permissions and access control.
* Multi-language support (i18n).
* Dockerized development environment with Redis, MongoDB, and Nginx.
* Queue & background job support (BullMQ/Redis).

**Folder Structure:**

```
app/
config/
public/
views/
workers/
queues/
logs/
tests/
```

**Setup:**

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Configure `.env` file.
4. Run the project: `npm run dev` (or with Docker if preferred).

**Note:**
This is a professional modular backend ready for production and future scalability.

# FlowSync — Team Task Manager

A full-stack team productivity app with role-based access control (Admin/Member), 
built for the Ethara.ai engineering assessment.

🌐 **Live Demo:** https://flowsync-team-task-manager-production.up.railway.app

📁 **GitHub:** https://github.com/PrOffesOR20004/flowsync-team-task-manager

---

## Features

- Authentication — Signup and Login with JWT
- Role-Based Access Control — Admin and Member roles
- Project Management — Create and manage projects
- Task Management — Create tasks with priority, status, start date, and deadline
- Overdue Tracking — Tasks past deadline are automatically flagged
- Team Management — View members, Admin can assign and remove
- Dashboard Analytics — Real-time counts of projects, completed, pending, overdue tasks
- REST APIs — Full backend with Next.js API routes
- Responsive UI — Works on all screen sizes

---

## Demo Credentials

| Role   | Email                  | Password  |
|--------|------------------------|-----------|
| Admin  | admin@flowsync.com     | admin123  |
| Member | member@flowsync.com    | member123 |

---

## Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | Next.js 15, TypeScript, Tailwind CSS |
| Backend    | Next.js API Routes      |
| Database   | PostgreSQL (Neon)       |
| ORM        | Prisma                  |
| Auth       | JWT + bcryptjs          |
| Deployment | Railway                 |

---

## Role Permissions

**Admin**
- Create and manage projects
- Create and assign tasks
- Add and remove team members
- View full dashboard analytics

**Member**
- View assigned projects and tasks
- Track task progress
- Cannot create projects or manage team

---

## API Routes

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/auth/signup      | Register new user  |
| POST   | /api/auth/login       | Login user         |
| GET    | /api/projects         | Fetch all projects |
| POST   | /api/projects         | Create project     |
| GET    | /api/tasks            | Fetch all tasks    |
| POST   | /api/tasks            | Create task        |
| GET    | /api/users            | Fetch team members |

---

## Local Setup

```bash
git clone https://github.com/PrOffesOR20004/flowsync-team-task-manager
cd flowsync-team-task-manager
npm install
```

Create `.env` file:
```
DATABASE_URL="your_neon_postgresql_url"
JWT_SECRET="your_secret_key"
```

```bash
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000

---

## Deployment

Deployed on **Railway** with **Neon PostgreSQL** as the production database.
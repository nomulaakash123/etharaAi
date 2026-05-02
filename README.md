# Task Manager Application

A full-stack task management system designed to help users and teams organize, track, and manage tasks efficiently with role-based access control.

---

## Overview

This application provides a centralized platform for task creation, assignment, tracking, and management. It supports two user roles: Admin and Member, each with specific permissions.

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB with Mongoose

### Authentication
- JWT-based authentication

---

## Authentication Flow

### Signup
- Only Members can register
- Admin accounts are pre-created in the database
- New users are assigned the Member role automatically

### Login
- Users login with email and password
- After login, redirected to Dashboard
- Session stored in localStorage

### Logout
- Clears session
- Redirects to Login page

---

## Application Flow

User opens application → Login page  
After login → Dashboard  
Based on role:
- Admin → Full access
- Member → Limited access

---

## User Roles

### Admin
- Create tasks
- Assign tasks
- Delete tasks
- Manage projects
- View all users
- Full dashboard access

### Member
- View assigned tasks
- Update task status
- View dashboard stats
- No task creation or deletion access

---

## Pages

### Login Page
- Entry point of the application
- Redirects user based on role

### Signup Page
- Only for Members
- Registers new users
- Redirects to login after signup

### Dashboard
- Displays task statistics:
  - Total tasks
  - Pending
  - In progress
  - Completed
  - Overdue

### Tasks Page
- View all tasks
- Task details include:
  - Title
  - Description
  - Assigned user
  - Project
  - Due date
  - Status

Features:
- Update task status
- Create task (Admin only)
- Delete task (Admin only)
- Overdue highlighting

### Projects Page
- Manage project categories
- Organize tasks under projects

### Team Page
- View all users
- Admin manages team members

---

## Routing Structure

| Route | Page | Access |
|------|------|--------|
| `/` | Login | Public |
| `/signup` | Signup | Public |
| `/dashboard` | Dashboard | Protected |
| `/tasks` | Tasks | Protected |
| `/projects` | Projects | Protected |
| `/team` | Team | Protected |

---

## Environment Variables

### Frontend (.env)

Create a `.env`
VITE_API_URL=http://localhost:5000

### Backend (.env)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


---

## Setup Instructions

### Backend

cd backend
npm install
npm run dev


### Frontend

In the root file only :- because we do not have the separate folder for the frontend 
npm install
npm run dev


---

## Deployment Notes

- Replace localhost URLs with deployed backend URL
- Set environment variables in production
- Do not upload `.env` files to GitHub

---

## Key Highlights

- Role-based authentication system
- Task lifecycle management
- Project-based organization
- Responsive UI
- Scalable architecture

---

## Future Improvements

- Notifications system
- Drag and drop task board
- Email reminders
- File attachments
- Advanced filtering and search# etharaAi

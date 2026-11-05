# 🏪 StoreRate — Store Rating Management System

A full-stack web application for managing stores, users, and customer ratings. The platform provides dedicated dashboards for administrators, normal users, and store owners, with secure authentication and a centralized rating management workflow.

**Project implementation, customization, and deployment maintained by Sumit Panchal.**

---

## 🚀 Live Production Links

### 🌐 Live Web Application (Frontend)

👉 https://lifeofthecoders.github.io/Roxiler-Assessment/

### ⚡ Production Backend (REST API)

👉 https://roxiler-store-rating-backend.vercel.app

**Backend Health Check:**

👉 https://roxiler-store-rating-backend.vercel.app/api/health

### 💻 Source Code

👉 https://github.com/lifeofthecoders/Roxiler-Assessment

---

## 📌 Project Overview

StoreRate is a role-based Store Rating Management System that allows users to discover registered stores, submit ratings, and manage store information through dedicated dashboards.

The application provides three primary roles:

- **System Administrator:** Manage users, stores, and platform information.
- **Normal User:** Browse stores, search listings, and submit or update ratings.
- **Store Owner:** Monitor store ratings and review customer submissions.

The application uses a centralized authentication system and a PostgreSQL relational database.

---

## ✨ Key Features

### 1. System Administrator

- Dashboard with total users, stores, and ratings.
- Create and manage users with assigned roles.
- Search and filter users by name, email, address, and role.
- View individual user details.
- Register stores and assign store owners.
- Search, sort, and paginate store listings.
- View average store ratings and rating counts.

### 2. Normal User

- User registration and secure login.
- Browse registered stores.
- Search stores by name and address.
- Sort stores alphabetically and by rating.
- Submit ratings from 1 to 5 stars.
- Update previously submitted ratings.
- View overall store ratings and personal submitted ratings.

### 3. Store Owner

- Dedicated store owner dashboard.
- View average store rating.
- View total customer ratings.
- Access customer rating details.
- Sort and paginate rating records.

### 4. Authentication and Security

- Role-based access control.
- JWT-based authentication.
- Access and refresh token handling.
- Password hashing using bcryptjs.
- Protected API routes.
- Password change functionality.
- Frontend and backend input validation.

### 5. User Interface

- Responsive application interface.
- Interactive rating components.
- Framer Motion animations.
- Glassmorphism-inspired styling.
- Interactive SVG mascot elements.
- Cursor particle effects with reduced-motion considerations.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React 19, Vite |
| Routing | React Router |
| State Management | Redux Toolkit |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Database Driver | pg |
| Authentication | JWT, bcryptjs |
| Validation | Zod |
| UI and Animation | CSS Modules, Framer Motion |
| Notifications | React Hot Toast |
| Icons | React Icons |
| Testing | Jest, Supertest |
| CI/CD | GitHub Actions |
| Frontend Hosting | GitHub Pages |
| Backend Hosting | Vercel |
| Database Hosting | Neon |

---

## 🧩 Application Architecture

The application follows a client-server architecture, with the React frontend communicating with the Express REST API and PostgreSQL database.

### Project Structure

```text
Roxiler-Assessment/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   ├── schema.sql
│   │   ├── migrate.js
│   │   └── seed.js
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── index.js
│   └── package.json
│
├── .github/
│   └── workflows/
│
├── .env.example
├── render.yaml
└── README.md
```

---

## 🗄️ Database Structure

The application uses PostgreSQL with three primary tables.

### Users

- id
- name
- email
- password
- address
- role
- created_at

### Stores

- id
- name
- email
- address
- owner_id
- created_at

### Ratings

- id
- user_id
- store_id
- rating
- created_at
- updated_at

**User Roles:**

- admin
- user
- store_owner

Each user can submit one rating per store and subsequently update that rating.

---

## 📋 Form Validation Rules

| Field | Validation |
|---|---|
| Name | 20–60 characters |
| Address | Maximum 400 characters |
| Password | 8–16 characters, uppercase letter and special character required |
| Email | Valid email format |
| Rating | Integer between 1 and 5 |

Validation is implemented across the frontend and backend.

---

## 💻 Local Development

### Prerequisites

- Node.js 18 or later
- npm
- PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/lifeofthecoders/Roxiler-Assessment.git

cd Roxiler-Assessment
```

### 2. Configure the Backend

```bash
cd server

npm install
```

Configure your local environment variables using the project's environment example. Never commit your actual `.env` file or database credentials.

### 3. Initialize the Database

```bash
npm run migrate
npm run seed
```

Run these database initialization commands only against a fresh development database because the migration and seed scripts can replace existing data.

### 4. Start the Backend

```bash
npm run dev
```

Backend development URL:

```text
http://localhost:5000
```

### 5. Start the Frontend

Open a separate terminal:

```bash
cd client

npm install

npm run dev
```

Frontend development URL:

```text
http://localhost:5173
```

---

## 🔑 Demo Accounts

The application includes seeded demonstration accounts for testing its role-based functionality.

| Role | Email | Password |
|---|---|---|
| Administrator | admin@storerating.com | Admin@123 |
| Store Owner | owner@store1.com | Owner@123 |
| Normal User | user@example.com | User@1234 |

These are sample credentials for the seeded demonstration database.

---

## 📡 API Endpoints Reference

### Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Register a user |
| POST | `/api/auth/login` | Authenticate a user |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/logout` | Log out |

### System Administrator

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/admin/dashboard` | Dashboard metrics |
| GET | `/api/admin/users` | Retrieve users |
| POST | `/api/admin/users` | Create users |
| GET | `/api/admin/users/:id` | View user details |
| GET | `/api/admin/stores` | Retrieve stores |
| POST | `/api/admin/stores` | Register a store |

### Normal User

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/user/stores` | Browse stores |
| PUT | `/api/user/stores/:storeId/rating` | Submit or update a rating |

### Store Owner

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/store-owner/dashboard` | Store performance overview |
| GET | `/api/store-owner/ratings` | View customer ratings |

### System Health

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend service health |

---

## 🧪 Testing

Backend automated tests use Jest and Supertest.

To execute the test suite:

```bash
cd server

npm test
```

---

## ☁️ Deployment Architecture

The application is deployed using the following services:

| Component | Deployment Platform |
|---|---|
| Frontend | GitHub Pages |
| Backend REST API | Vercel |
| PostgreSQL Database | Neon |
| Source Code | GitHub |
| Continuous Deployment | GitHub Actions |

### Frontend Deployment

The React application is built using Vite and deployed to GitHub Pages through GitHub Actions.

### Backend Deployment

The Express.js application is deployed on Vercel with production environment variables.

### Database Deployment

The PostgreSQL database is hosted on Neon and accessed through the backend using a secure database connection.

**Production Health Check:**

https://roxiler-store-rating-backend.vercel.app/api/health

---

## 💼 Professional Focus

I'm interested in opportunities where I can contribute to building products that are:

**Reliable • Usable • Consistent • Stable • Scalable • User-Friendly**

I bring a QA mindset that focuses not only on whether a feature works, but also on **how the complete product behaves in the hands of a real user**.

My approach combines structured testing with real-world user behavior, helping identify defects, usability issues, edge cases, and potential risks before they reach the end user.

---

## 👨‍💻 About the Developer

**Sumit Panchal**

Quality Analyst | Manual QA | Software Testing | Quality Mindset

I focus on software quality, functional testing, test case design, defect reporting, and delivering reliable user experiences.

**Professional Experience:** 5+ Years in Manual QA and Software Testing.

---

## 📄 License

This repository contains a project implementation maintained and customized by Sumit Panchal.

Project-specific code, custom modifications, documentation, and other original materials should be used in accordance with their applicable ownership and licensing terms.

Third-party libraries, dependencies, fonts, assets, and other externally licensed materials remain subject to their respective licenses and usage terms.

Unauthorized copying, redistribution, modification, or commercial use of materials for which permission is required is not permitted.

---

## 📫 Connect With Me

If you'd like to connect, collaborate, or discuss QA, software testing, and technology, feel free to reach out.

**Sumit Panchal**

**Quality Analyst | Manual QA | Software Testing**

🌐 **Portfolio:**

https://lifeofthecoders.github.io/Sumit-Panchal-QA-Portfolio/

💻 **GitHub:**

https://github.com/lifeofthecoders

🔗 **LinkedIn:**

https://www.linkedin.com/in/sumit-panchal-b790a8236/

📧 **Email:**

sumitpanchal5225@gmail.com

---

---

## ⭐ Support

<p align="center">
If you find this project useful, feel free to explore the application and give the repository a star ⭐.
</p>

<p align="center">
Your support and feedback are always appreciated.
</p>

<p align="center">
<strong>QUALITY IS MY CRAFT.<br>
RELIABILITY IS MY GOAL.</strong>
</p>

<p align="center">
<strong>HAPPY TESTING 😀</strong>
</p>

---


*Maintained and deployed by Sumit Panchal.*
# ShopNest – Full-Stack E-commerce Platform

ShopNest is a full-stack e-commerce web application built using the MERN stack. It provides a seamless shopping experience with user authentication, product browsing, cart management, and role-based access for administrators.

## Live Demo

- Frontend: https://shopnest-frontend-wet4.onrender.com
- Backend : https://shopnest-backend-5x0a.onrender.com

## Features

- User registration and login with JWT authentication
- Secure password hashing using bcryptjs
- Product listing and browsing
- Shopping cart management using Redux Toolkit
- User and Admin role-based access control
- Admin product management
- RESTful API integration
- Protected routes and authorization
- Responsive user interface

## Tech Stack

Frontend: React.js, Redux Toolkit, HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT, bcryptjs

Deployment: Render

## Project Structure

- `frontend/` – React application and user interface
- `backend/` – Express REST API, authentication, routes, and database models

## Installation and Setup

### 1. Clone the repository
```
git clone https://github.com/Reenadewangan/e-commerce-full-stack.git
cd e-commerce-full-stack
```

### 2. Backend Setup
```
cd backend
npm install
npm start
```

### 3. Frontend Setup
```
cd frontend
npm install
npm start
```

Configure the required environment variables in your `.env` files before starting the application.

## Environment Variables

Configure the following variables in the backend `.env` file (use the names defined in your project):

- `MONGODB_URI`
- `JWT_SECRET`

Never commit actual credentials or secret keys to GitHub.

## Author

Reena Dewangan

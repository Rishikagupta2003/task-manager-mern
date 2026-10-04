# Task Manager MERN Application

A beautifully designed Task Manager application built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- Premium Glassmorphism UI
- Add, edit, and delete tasks
- Mark tasks as completed or pending
- Filter tasks by status (All, Pending, Completed)
- Component-based architecture for clean code reuse
- Proper routing using `react-router-dom`

## Prerequisites
- Node.js installed
- MongoDB installed and running locally on port `27017`

## Setup Instructions

### 1. Start MongoDB
Ensure your local MongoDB instance is running. If you are using MongoDB Atlas or another port, create a `.env` file in the `backend` directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 2. Start the Backend Server
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install  # (Dependencies are already installed)
node server.js
```
The server will run on `http://localhost:5000`.

### 3. Start the Frontend Application
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install  # (Dependencies are already installed)
npm run dev
```
Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

## Code Structure
- **Frontend (`/frontend/src`)**: 
  - `App.jsx`: Main routing setup.
  - `pages/TaskManager.jsx`: Main logic for fetching, filtering, and updating tasks.
  - `components/`: Modular reusable components (`TaskForm`, `TaskItem`, `FilterBar`).
  - `index.css`: Custom vanilla CSS with premium styling and animations.
- **Backend (`/backend`)**: 
  - `server.js`: Express application and DB connection.
  - `routes/taskRoutes.js`: RESTful API routes for tasks.
  - `models/Task.js`: Mongoose schema.

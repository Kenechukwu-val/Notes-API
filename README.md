# Notes API

A secure, user-authenticated REST API for managing personal notes.

## 🚀 Features
- Register and login with JWT
- Create, view, update, and delete notes
- Only the authenticated user can access their notes
- MongoDB + Node.js + Express
- Error handling, request logging, and clean structure

## 📡 Live API URL
[https://notes-api-xyz.onrender.com](https://notes-api-wxrv.onrender.com)

## 📚 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login and get JWT |
| GET | `/api/notes` | Get user’s notes |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- Render (deployment)

## 🧑 Author
[Kenechukwu Valentine](https://www.linkedin.com/in/kenechukwu-nwafor-361533163/)


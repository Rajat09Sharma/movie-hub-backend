# 🎬 MovieHub  

MovieHub is a movie recommendation platform where users can recommend movies, view recommendations, comment, and vote on their favorite movies. Built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.  

## ✨ Features
- User authentication (signup, login, logout, refresh token)  
- Role-based access control (user & admin)  
- Movie recommendation system  
- Comment system with CRUD operations  
- Voting system for movies  
- Secure authentication using JWT and cookies  

---

## 📂 Project Structure
backend/
├── models/
├── routes/
├── controllers/
├── middlewares/
├── config/
└── server.js

yaml
Copy code

---

## ⚡ API Routes  

### 🔑 Auth Routes (`/auth`)  
| Method | Endpoint       | Description |
|--------|----------------|-------------|
| POST   | /login         | Login user and issue tokens |
| POST   | /signup        | Register a new user |
| GET    | /refresh       | Refresh access token using refresh token |
| POST   | /logout        | Logout user and clear refresh token |

---

### 💬 Comment Routes (`/comment`)  
| Method | Endpoint      | Middleware                  | Description |
|--------|---------------|-----------------------------|-------------|
| GET    | /:movieId     | authMiddleware              | Fetch all comments for a movie |
| POST   | /:movieId     | authMiddleware, userRoleMiddleware | Add comment to a movie |
| PATCH  | /:id          | authMiddleware, userRoleMiddleware | Edit a comment |
| DELETE | /:id          | authMiddleware              | Delete a comment |

---

### 🎥 Movie Routes (`/movie`)  
| Method | Endpoint   | Middleware                  | Description |
|--------|------------|-----------------------------|-------------|
| GET    | /          | authMiddleware              | Fetch all movies |
| GET    | /:id       | authMiddleware              | Fetch a movie by ID |
| POST   | /          | authMiddleware, userRoleMiddleware | Create a new movie |
| DELETE | /:id       | authMiddleware, adminRoleMiddleware | Delete a movie (admin only) |

---

### 👍 Vote Routes (`/vote`)  
| Method | Endpoint   | Middleware                  | Description |
|--------|------------|-----------------------------|-------------|
| POST   | /:movieId  | authMiddleware, userRoleMiddleware | Vote on a movie (upvote/downvote) |

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Auth:** JWT, Bcrypt, Cookies  
- **Frontend:** React + Vite  

---

## 🚀 Getting Started

1. Clone the repo  
   ```bash
   git clone https://github.com/your-username/moviehub-backend.git
   cd moviehub-backend
Install dependencies
````
bash
Copy code
npm install
Setup .env
````
env
Copy code
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_ACCESSTOKEN_KEY=your_access_secret
JWT_RERESHTOKEN_KEY=your_refresh_secret
Start the server
```
bash
Copy code
npm run dev
````

## 🌐 Frontend
Live frontend is deployed here:https://movie-hub-task.netlify.app/

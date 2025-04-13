# 🧑‍💼 Job Recruitment Platform (Backend)

A RESTful API for a job recruitment platform, supporting two main user roles: **Recruiters** and **Candidates**. Built using **Node.js**, **Express.js**, **MongoDB**, and **Cloudinary** for file handling.

## 🚀 Features

- 🔐 JWT-based authentication and authorization
- 👥 Role-based access control (Recruiter / Candidate)
- 📄 CRUD APIs for jobs, applications, and user profiles
- ☁️ Cloudinary integration for avatar and resume uploads
- 🔍 Search and filter APIs for job listings and candidate profiles
- ⚙️ RESTful API design with proper error handling and validation

## 📁 Project Structure

```
📦jobify-api
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── .env
├── app.js
└── server.js
```

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **File Uploads**: Cloudinary
- **Validation**: express-validator

## ⚙️ Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/pthngws/jobify-api.git
cd jobify-api
npm install
```

### 2. Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run the server

```bash
npm run dev
```

## 📌 API Endpoints Overview

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and get token
- `GET /api/jobs` – View all job listings
- `POST /api/jobs` – Create a new job (Recruiter only)
- `GET /api/applications` – View applications (Recruiter only)
- `POST /api/applications` – Apply for a job (Candidate only)
- `PUT /api/users/profile` – Update profile (including avatar/resume)

> For full documentation, refer to `/docs` folder (coming soon).

## 📅 Project Status

🚧 **Currently in development** – actively building and testing features.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

# 🧩 FastAPI + React Todo App

A full-stack **CRUD Todo application** built using **FastAPI (Python)** for the backend and **React (Formik + Yup)** for the frontend.  
This app includes **JWT authentication**, **MongoDB integration**, and **modern frontend validation**.

---

## 🚀 Features

### 🔧 Backend (FastAPI)
- User Signup & Login (JWT Authentication)
- Password hashing using **Passlib**
- Todo CRUD operations (Create, Read, Update, Delete)
- MongoDB as database
- Clean, modular structure with:
  - `routes/` → API endpoints  
  - `services/` → business logic  
  - `models/` → Pydantic models  
  - `utils/` → JWT & password utilities  

### 💻 Frontend (React + Formik)
- Login and Signup forms with validation using **Formik & Yup**
- Add new Todo
- View Todo list
- Edit and Delete Todos
- Toast notifications for feedback
- Clean UI with responsive design


##Demo

<video src="https://raw.githubusercontent.com/usama-ansarii/FastApi-todo-app/blob/main/Screencast%20from%2029-10-2025%2012%3A24%3A14.webm"
       controls
       width="600">
</video>

🎥 [Click here if the video doesn’t load](https://raw.githubusercontent.com/usama-ansarii/FastApi-todo-app/blob/main/Screencast%20from%2029-10-2025%2012%3A24%3A14.webm)



## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Create virtual environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Linux/Mac
venv\Scripts\activate     # For Windows



2️⃣ Install dependencies
pip install -r requirements.txt

3️⃣ Run the server
uvicorn main:app --reload

4️⃣ Backend runs at:
http://127.0.0.1:8000

💻 Frontend Setup (React)
1️⃣ Install dependencies
cd frontend
npm install

2️⃣ Run React app
npm start

3️⃣ Frontend runs at:
http://localhost:3000


##Demo

<video src="https://raw.githubusercontent.com/docodeawais/ATM_Simulator/main/ATM_Simulator.webm"
       controls
       width="600">
</video>

🎥 [Click here if the video doesn’t load](https://raw.githubusercontent.com/docodeawais/ATM_Simulator/main/ATM_Simulator.webm)


🔐 Environment Variables

Create a .env file in the backend/ folder:

SECRET_KEY=your_jwt_secret_key
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/


For frontend (optional):

REACT_APP_API_BASE_PATH=http://127.0.0.1:8000

🧠 Tech Stack

Backend: FastAPI, Motor (MongoDB Driver), Passlib, PyJWT
Frontend: React, Formik, Yup, Axios, React Router, Toastify
Database: MongoDB (Atlas or Local)

🧪 API Endpoints Summary
Method	Endpoint	Description
POST	/auth/signup	Register new user
POST	/auth/login	Login user
GET	/todos	Get all todos
GET	/todos/{id}	Get single todo
POST	/todos	Add new todo
PUT	/todos/{id}	Update todo
DELETE	/todos/{id}	Delete todo


# Sweet Shop Management System

A simple full-stack application for managing sweets inventory, built with the MERN stack (MongoDB, Express, React, Node.js) using **Test-Driven Development (TDD)**.

---

## 📌 Features

### ✅ Core Functionalities
- **Add Sweets:** Add new sweets with name, category, price, and quantity.
- **View Sweets:** View all available sweets in a table with filtering options.
- **Delete Sweets:** Remove sweets from the inventory.
- **Purchase Sweets:** Decrease stock when a sweet is purchased.
- **Restock Sweets:** Increase stock quantity.
- **Search & Filter:** Filter sweets by name, category, and price range.

### ⚙️ Tech Stack
- **Frontend:** React, Bootstrap Icons
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Testing (Backend):** Jest, Supertest
- **Version Control:** Git + GitHub

---
## 🚀 How to Run the Project

Make sure you have **Node.js** (v18 or later), **npm**, and **MongoDB** installed on your system.

### 🔧 Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install backend dependencies
npm install

# Start the backend server
npm start
```

> The backend will run on: `http://localhost:5000`

### 🎨 Frontend Setup

```bash
# Open a new terminal and navigate to the frontend folder
cd frontend

# Install frontend dependencies
npm install

# Start the React development server
npm start
```

> The frontend will run on: `http://localhost:3000`

### 📁 Project Structure

```
project-root/
├── backend/         # Express.js backend server
├── frontend/        # React.js frontend application
└── README.md
```

Now your full-stack **Sweet Shop Management System** should be up and running locally. 🍬🍭

## 🚀 Getting Started

### 1️⃣ Clone the Repository
git clone https://github.com/Hem-Gajjar/sweet_shop_project.git
cd sweet_shop_project
### 2️⃣ Set Up Backend

cd backend
npm install

Create a .env file in backend directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string

Start Project
npm start

### 3️⃣ Set Up Frontend

cd ../frontend
npm install
npm start
App runs at: http://localhost:3000

### 🧪 Testing (Backend Only)

cd backend
npm test
Uses Jest and Supertest to validate API behavior such as:

GET /api/sweets

POST /api/sweets

DELETE /api/sweets/:id

PUT /api/sweets/purchase/:id

PUT /api/sweets/restock/:id

### 📁 Folder Structure

<img width="269" height="378" alt="image" src="https://github.com/user-attachments/assets/7242d193-dd11-4acc-af60-b9a2ef5dddbe" />

### 📜 API Endpoints

Base URL: http://localhost:5000/api/sweets
Method	Endpoint	Description

GET	/	Get all sweets

POST	/	Add a new sweet

DELETE	/:id	Delete a sweet

PUT	/purchase/:id	Purchase (reduce stock)

PUT	/restock/:id	Restock (increase stock)

## 📌 Screenshots

<img width="1888" height="929" alt="image" src="https://github.com/user-attachments/assets/e9157bc1-a023-4483-9ca7-07753d7194e7" />

<img width="1766" height="723" alt="image" src="https://github.com/user-attachments/assets/ac654289-7052-4b30-a82e-b050af538468" />



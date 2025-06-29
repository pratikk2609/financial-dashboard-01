# 📊 Financial Dashboard (Full-Stack App)

A full-stack financial dashboard built with React, Node.js, Express, MongoDB, and Material UI. Features include login, transaction tracking, data visualization, CSV export, and Postman API testing.

---

## 🚀 Tech Stack

- Frontend: React + TypeScript + Material UI  
- Backend: Node.js + Express + TypeScript  
- Database: MongoDB  
- Auth: JWT Token  
- API Testing: Postman  

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

git clone https://github.com/pratikk2609/financial-dashboard-01.git

cd financial-dashboard-01

### 2. Setup Backend

cd financial-dashboard-backend

npm install


Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret


Then run:

npx ts-node src/index.ts

### 3. Setup Frontend

cd financial-dashboard-frontend

npm install

npm start

## 🔐 Login Credentials

Email:    test@admin.com  

Password: MySecureTest@456

## 📦 Features

✅ Secure Login with JWT

✅ View Transactions

✅ Filter by Category, Status, User

✅ Visualize Revenue vs Expense with Bar Chart

✅ Export CSV with proper headers

✅ Responsive layout using Material UI

## 📬 API Usage (Postman Collection)

Postman collection Link : https://.postman.co/workspace/My-Workspace~7682f14b-4163-4e73-8aa9-884dfebd45a8/collection/26924288-f148e8fc-c6c2-45eb-89f3-8bc9e6ef14d5?action=share&creator=26924288

Login API

POST /api/auth/login

Body:

{
  "email": "test@admin.com",
  "password": "MySecureTest@456"
}

Transactions API

GET /api/transactions

Headers:

Authorization: Bearer <your_token_here>

# 🛍 Product Inventory Management App

A full-stack CRUD web application to manage a product inventory system using the MERN (MongoDB, Express, React, Node.js) stack.

## 🚀 Live Demo

Frontend: [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app)  
Backend API: [https://your-backend-url.vercel.app/api/products](https://your-backend-url.vercel.app/api/products)

## 🎯 Objective

To create a responsive and interactive application where users can:
- Add new products
- Edit existing product details
- Delete products
- View a list of products

## 🧩 Tech Stack

- **Frontend**: React (Hooks, Functional Components, SCSS Modules)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Deployment**: Vercel (Frontend + Backend)

## 🗂️ Folder Structure

```

product-inventory-app/
│
├── backend/                        # Express backend
│   ├── src/
│   │   ├── controller/             # Mongoose controller logic
│   │   ├── models/                 # Mongoose schemas/models
│   │   └── routes/                 # API endpoints
│   ├── app.ts                      # Express setup and configuration
│   ├── tsconfig.json               # TypeScript config
│   └── package.json
│
├── frontend/                       # React frontend
│   ├── public/                     # Static files
│   ├── src/
│   │   ├── api/                    # Axios API services
│   │   ├── assets/                 # Images and icons
│   │   ├── components/             # Reusable components (like Modal, Table, etc.)
│   │   ├── context/                # Global context for products
│   │   ├── model/                  # TS model definitions for Product, API types
│   │   ├── pages/                  # Page-level components (List, Add, Edit)
│   │   ├── utils/                  # Utility functions or constants
│   │   ├── App.tsx                 # Main App with routing
│   │   └── index.tsx              # Root render entry
│   ├── .env.development
│   ├── .env.production
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                   # Project-level config if monorepo


````

## 🔧 Features & Requirements

### Frontend

- Built with **React functional components** using **Hooks** (`useState`, `useEffect`).
- Pages:
  - **Product List**: Table view with edit/delete buttons.
  - **Add Product**: Form with validation.
  - **Edit Product**: Pre-filled form for updates.
- **Form Validation**:
  - All fields are required.
  - Name must be at least 3 characters.
  - Price must be > 0.
  - Stock must be ≥ 0.
  - Clear inline error messages shown.

### Backend

- Built with **Node.js + Express**
- RESTful API routes:
  - `GET /api/products`
  - `POST /api/products`
  - `PUT /api/products/:id`
  - `POST /api/products/:id`
- **Mongoose Schema**:
  - `name` (string, min length 3)
  - `price` (number, > 0)
  - `category` (string)
  - `stock` (number, ≥ 0)
  - `createdAt` (auto-generated)

## ✅ Validations

- **Backend**: Enforced using Mongoose schema
- **Frontend**: Client-side checks prevent submission with invalid data

## 🛠 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/helloChiku/product-inventory-app.git
cd product-inventory-app
````



#### Create `.env` file in `/backend` with:

```env
I USE INSIDE THE PROJECT
```



## 📦 Available Scripts

| Script                | Description                                            |
|-----------------------|--------------------------------------------------------|
| `npm run install-all` | Installs all dependencies for backend & frontend       |
| `npm run start`       | Starts both client & server together using `concurrently` |
| `npm run server`      | Starts the backend server only                         |
| `npm run client`      | Starts the frontend app only                           |


## 📌 Author

Developed by [Jyoti prakash panigrahi](https://www.linkedin.com/in/your-profile)



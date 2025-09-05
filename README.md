# Ecommerce-MEAN

A simple Ecommerce app to showcase MEAN stack skills.

---

## Features

- **Auth**: Register, login (with JWT authentication).  
- **Users**: Profile management, admin user control.  
- **Products**: CRUD operations (admin only for create/update/delete).  
- **Categories**: Manage categories for products.  
- **Cart**: Customers can add, update, remove items.  
- **Orders**: Place orders, track status (admin can update).  

---
## Project Structure
## Project Structure

ecommerce-backend/
│── index.js                # Entry point: starts the server, connects DB, loads routes
│
├── models/                 # Mongoose schemas (data layer)
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Cart.js
│   └── Order.js
│
├── controllers/            # Business logic (request handling)
│   ├── authController.js
│   ├── userController.js
│   ├── productController.js
│   ├── categoryController.js
│   ├── cartController.js
│   └── orderController.js
│
├── routes/                 # API endpoints (maps to controllers)
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── cartRoutes.js
│   └── orderRoutes.js
│
└── middleware/             # Custom middlewares
    └── auth.js             # JWT authentication & role-based access

---

## API Routes

### Auth
- `POST /api/auth/register` → Register new user  
- `POST /api/auth/login` → Login  

### Users
- `GET /api/users/me` → Get my profile  
- `PUT /api/users/me` → Update my profile  
- `GET /api/users` (admin) → Get all users  
- `DELETE /api/users/:id` (admin) → Delete user  

### Products
- `GET /api/products` → List products  
- `GET /api/products/:id` → Get product details  
- `POST /api/products` (admin) → Create product  
- `PUT /api/products/:id` (admin) → Update product  
- `DELETE /api/products/:id` (admin) → Delete product  

### Categories
- `GET /api/categories` → List categories  
- `POST /api/categories` (admin) → Create category  
- `PUT /api/categories/:id` (admin) → Update category  
- `DELETE /api/categories/:id` (admin) → Delete category  

### Cart (customer only)
- `GET /api/cart` → Get my cart  
- `POST /api/cart` → Add item  
- `PUT /api/cart/:productId` → Update item  
- `DELETE /api/cart/:productId` → Remove item  
- `DELETE /api/cart/clear` → Clear cart  

### Orders
- `POST /api/orders` (customer) → Place order  
- `GET /api/orders` (customer/admin) → Get orders  
- `GET /api/orders/:id` (customer) → Get order details  
- `PUT /api/orders/:id` (admin) → Update order status  

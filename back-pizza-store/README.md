# Restaurant Management API

This project is an API for managing a restaurant's users, meals, orders, and order items. It allows administrators to manage meals and users, and customers to place and manage orders.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Running Migrations](#running-migrations)
- [Environment Variables](#environment-variables)

## Features
- **User Management**: Create, read, update, and delete users. Differentiate between admin and customer roles.
- **Meal Management**: Admins can create, read, update, and delete meals.
- **Order Management**: Users can place orders, view their orders, and manage order items.
- **Order Items Management**: Manage the relationship between orders and meals.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/restaurant-management-api.git
    cd restaurant-management-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure you have PostgreSQL installed and running.
    - Create a `.env` file in the root directory and set your database credentials (refer to [Environment Variables](#environment-variables) section).

4. Run migrations:
    ```sh
    npx knex migrate:latest
    ```

## Usage
1. Start the server:
    ```sh
    node server.js
    ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints
### Users
- `POST /users`: Create a new user.
- `GET /users`: Get all users.
- `GET /users/:id`: Get a specific user by ID.
- `PUT /users/:id`: Update a specific user by ID.
- `DELETE /users/:id`: Delete a specific user by ID.

### Meals
- `POST /meals`: Create a new meal.
- `GET /meals`: Get all meals.
- `GET /meals/:id`: Get a specific meal by ID.
- `PUT /meals/:id`: Update a specific meal by ID.
- `DELETE /meals/:id`: Delete a specific meal by ID.

### Orders
- `POST /orders`: Create a new order.
- `GET /orders`: Get all orders.
- `GET /orders/:id`: Get a specific order by ID.
- `PUT /orders/:id`: Update a specific order by ID.
- `DELETE /orders/:id`: Delete a specific order by ID.

### Order Items
- `POST /order_items`: Create a new order item.
- `GET /order_items`: Get all order items.
- `GET /order_items/:id`: Get a specific order item by ID.
- `PUT /order_items/:id`: Update a specific order item by ID.
- `DELETE /order_items/:id`: Delete a specific order item by ID.

## Project Structure
```
project-root/
├── knexfile.js
├── migrations/
├── routes/
│   ├── users.js
│   ├── meals.js
│   ├── orders.js
│   └── order_items.js
├── server.js
└── package.json

🚧 working in progress... 🚧
```

## Database Schema
### Users Table
- **Columns**: `id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`
- **Purpose**: Stores user information, including roles (`admin` or `customer`).

### Meals Table
- **Columns**: `meal_id`, `name`, `description`, `price`, `category`, `created_by`
- **Purpose**: Stores meal information and references the admin who created the meal.

### Orders Table
- **Columns**: `order_id`, `user_id`, `order_date`, `total_price`
- **Purpose**: Stores order information and references the user who placed the order.

### Order Items Table
- **Columns**: `order_item_id`, `order_id`, `meal_id`, `quantity`
- **Purpose**: Relates orders with meals and stores the quantity of each meal in an order.

## Running Migrations
Run the following command to execute the database migrations:
```sh
npx knex migrate:latest
```

## Environment Variables
Create a `.env` file in the root directory and set the following environment variables:
```
DB_CLIENT=pg
DB_CONNECTION=postgres://username:password@localhost:5432/your_database
PORT=3000
```
Replace `username`, `password`, `localhost`, `5432`, and `your_database` with your actual database credentials.

---

This README provides a high-level overview of the project, detailed steps for setup, and a guide to the API endpoints. Adjust the repository link, database details, and other specific information as needed.
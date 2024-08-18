
# Pizza Store API

This project is an API for managing a pizza ordering system. It allows administrators to manage meals and users, and customers to place and manage orders.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hook.png" alt="Hook" width="25" height="25" /> Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Running Migrations](#running-migrations)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> Features
- **User Management**: Create, read, update, and delete users. Differentiate between admin and customer roles.
- **Meal Management**: Admins can create, read, update, and delete meals.
- **Order Management**: Users can place orders, view their orders, and manage order items.
- **Order Items Management**: Manage the relationship between orders and meals.

## 🛠 Installation
### Config Environment Variables
- Rename file `.env.exemple` to `.env`

- Let's run this command below to create a container
    ```sh
    docker-compose up -d
    ```
- Check if is running:
    ```sh
    docker-compose ps
    ```    
- You should see this if everything goes well

 <img src="../assets-readme/Screenshot_2024-08-17-22-07-43_1920x1080.png" alt="Puzzle Piece" width="auto" />


- The API will be available at `http://localhost:3333`.

## 📡 API Endpoints
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

### Cart
- `POST /cart`: Add item to cart.
- `GET /cart`: Get all items in the cart.
- `PUT /cart/:id`: Update a specific cart item.
- `DELETE /cart/:id`: Remove a specific cart item.


## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png" alt="Magnifying Glass Tilted Left" width="25" height="25" /> Project Structure

<details>
<summary> 
 Click to expand <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Ladder.png" alt="Ladder" width="20" height="20" />
</summary>

```
project-root/
├── bin/
│   └── sh/
│       └── start.sh
├── src/
│   ├─── configs/
│   │   ├── auth.js
│   │   └── upload.js
│   ├─── controllers/
│   │   ├── MealsController.js
│   │   ├── UsersController.js
│   │   ├── OrdersController.js
│   │   ├── OrderItemsController.js
│   │   └── CartController.js
│   ├─── database/
│   │   ├─── knex/
│   │   │   ├─── migrations/
│   │   │   │   ├── createCartItems.js
│   │   │   │   ├── createMeals.js
│   │   │   │   ├── createOrderItems.js
│   │   │   │   ├── createOrders.js
│   │   │   │   └── createUsers.js
│   │   │   └── index.js
│   └── database.db
│   ├─── docs/
│   │   ├─── schemas/
│   │   │   ├── cart.js
│   │   │   ├── index.js
│   │   │   ├── meals.js
│   │   │   ├── order_items.js
│   │   │   ├── orders.js
│   │   │   ├── sessions.js
│   │   │   └── user.js
│   ├─── middlewares/
│   │   ├── cartRoutesvalidate.js
│   │   ├── ensureAuthenticated.js
│   │   └── verifyAuthorization.js
│   ├─── providers/
│   │   └── DiskStorage.js
│   ├─── routes/
│   │   ├── cart.routes.js
│   │   ├── index.js
│   │   ├── meals.routes.js
│   │   ├── orderItems.routes.js
│   │   ├── orderMeals.routes.js
│   │   ├── sessions.routes.js
│   │   └── users.routes.js
│   ├─── utils/
│   │   └── AppError.js
│   ├── server.js
│   └── swagger.js
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── insomnia_routes.json
├── knexfile.js
├── package-lock.json
├── package.json
├── README.md
├── swagger-output.json
└── swagger.json
```
</details>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/X-Ray.png" alt="X-Ray" width="25" height="25" /> Database Schema
### Users Table
- **Columns**: `id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`
- **Purpose**: Stores user information, including roles (`admin` or `customer`).

### Meals Table
- **Columns**: `meal_id`, `name`, `description`, `price`, `category`, `created_by`
- **Purpose**: Stores meal information and references the admin who created the meal.

### Cart Items Table
- **Columns**: `order_item_id`, `order_id`, `meal_id`, `quantity`
- **Purpose**: Relates orders with meals and stores the quantity of each meal in an order.

<!-- use in the future -->
<!-- ### Orders Table
- **Columns**: `order_id`, `user_id`, `order_date`, `total_price`
- **Purpose**: Stores order information and references the user who placed the order. -->

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Test%20Tube.png" alt="Test Tube" width="25" height="25" /> API Documentation
API documentation is automatically generated using Swagger. After starting the server, access the documentation at:

```
http://localhost:3333/api-docs
```

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Top%20Hat.png" alt="Top Hat" width="25" height="25" /> Importing into Postman

To streamline API testing, I have prepared a Postman import file. Here's how to import the routes:

- Download the import file [here](https://github.com/Frankdias92/final-challenge-explorer/blob/main/back-pizza-store/insomnia_routes.json).
- In Postman, go to File > Import.
- Choose the downloaded file and import it.
- Your Postman workspace will now contain the routes.

## Examples
- Installation
    - video here
- Create a user
    - video here
- Make a user to admin
    - video here
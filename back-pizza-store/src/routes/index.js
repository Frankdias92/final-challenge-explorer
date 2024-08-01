const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const mealsRoutes = require("./meals.routes");
const orderItemsRoutes = require("./orderItems.routes");
const orderMealsRoutes = require("./orderMeals.routes");
const cartRoutes = require("./cart.routes");


const routes = Router();
// routes.use('/api-docs', swaggerUi.serve);



routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/meals", mealsRoutes);
routes.use("/orders", orderMealsRoutes);
routes.use("/checkout", orderMealsRoutes);
routes.use("/order_items", orderItemsRoutes);
routes.use('/cart', cartRoutes)


module.exports = routes;
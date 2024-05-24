const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const mealsRoutes = require("./meals.routes");
const orderItemsRoutes = require("./orderItems.routes");
const orderMealsRoutes = require("./orderMeals.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/meals", mealsRoutes);
routes.use("/ordersrequest", orderItemsRoutes);
routes.use("/orders", orderMealsRoutes);


module.exports = routes;
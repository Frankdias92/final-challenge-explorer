const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const mealsRoutes = require("./meals.routes");
const orderItemsRoutes = require("./orderItems.routes");
const orderMealsRoutes = require("./orderMeals.routes");
const cartRoutes = require("./cart.routes");

const routes = Router();

routes.use("/users", /* #swagger.tags = ['Users'] */ usersRouter);
routes.use("/sessions", /* #swagger.tags = ['sessions'] */  sessionsRouter);
routes.use("/meals", /* #swagger.tags = ['Meals'] */ mealsRoutes);
routes.use("/orders",  /* #swagger.tags = ['Orders'] */  orderMealsRoutes);
// routes.use("/checkout", /* #swagger.ignore */ orderMealsRoutes);
routes.use("/order_items", /* #swagger.tags = ['Order Items'] */  orderItemsRoutes);
routes.use('/cart', /* #swagger.tags = ['Cart'] */  cartRoutes)


module.exports = routes;
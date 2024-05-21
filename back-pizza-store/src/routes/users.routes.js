const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UserValidatedController = require("../controllers/UserValidatedController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router();

const usersController = new UsersController();
const userValidatedController = new UserValidatedController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validated", ensureAuthenticated, userValidatedController.index);

module.exports = usersRoutes;
const { Router } = require("express");
const SalesController = require("../controllers/SalesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyAuthorization = require("../middlewares/verifyAuthorization");

const salesRoutes = Router();

const salesController = new SalesController();

salesRoutes.use(ensureAuthenticated);
salesRoutes.use(verifyAuthorization(['admin', 'sale']))

salesRoutes.get("/", salesController.index);

module.exports = salesRoutes;
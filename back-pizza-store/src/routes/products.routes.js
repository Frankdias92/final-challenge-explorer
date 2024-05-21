const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const verifyAuthorization = require('../middlewares/verifyAuthorization');


const productsRoutes = Router();

const productsController = new ProductsController();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.post("/", verifyAuthorization('admin'), productsController.create);

module.exports = productsRoutes;
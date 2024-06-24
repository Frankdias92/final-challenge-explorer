const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')
const CartController = require('../controllers/cartControllers');

const cartRoutes = Router();
const cartController = new CartController();

cartRoutes.use(ensureAuthenticated)
cartRoutes.use(verifyAuthorization('customer'))

cartRoutes.post('/', cartController.create);
cartRoutes.get('/:user_id', cartController.show);
cartRoutes.put('/:cart_item_id', cartController.update);
cartRoutes.delete('/:cart_item_id', cartController.delete);

module.exports = cartRoutes
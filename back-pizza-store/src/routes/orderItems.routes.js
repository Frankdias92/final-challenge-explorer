const { Router } = require("express")
const OrderItemsController = require("../controllers/OrderItemsController")
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
// const verifyAuthorization = require('../middlewares/verifyAuthorization')


const orderItemsRoutes = Router()
const orderItemsController = new OrderItemsController

orderItemsRoutes.use(ensureAuthenticated)
// orderItemsRoutes.use(verifyAuthorization("admin", "customer"))

orderItemsRoutes.post('/', orderItemsController.create)
orderItemsRoutes.get('/', orderItemsController.index)
orderItemsRoutes.get('/:id', orderItemsController.show)
orderItemsRoutes.put('/:id', orderItemsController.update)
orderItemsRoutes.delete('/:id', orderItemsController.delete)

module.exports = orderItemsRoutes
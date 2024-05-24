const { Router } = require("express")
const OrderItemsController = require("../controllers/OrderItemsController")

const orderItemsRoutes = Router()
const orderItemsController = new OrderItemsController

orderItemsRoutes.post('/', orderItemsController.create)
orderItemsRoutes.get('/', orderItemsController.index)
orderItemsRoutes.get('/:id', orderItemsController.show)
orderItemsRoutes.put('/:id', orderItemsController.update)
orderItemsRoutes.delete('/:id', orderItemsController.delete)

module.exports = orderItemsRoutes
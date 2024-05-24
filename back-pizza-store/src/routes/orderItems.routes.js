const { Router } = require("express")
const OrderItemsController = require("../controllers/OrderItemsController")

const orderItemsRoutes = Router()
const orderItemsController = new OrderItemsController

orderItemsRoutes.get('/', orderItemsController.index)
orderItemsRoutes.post('/', orderItemsController.create)

module.exports = orderItemsRoutes
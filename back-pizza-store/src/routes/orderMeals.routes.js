const { Router } = require('express')
const OrderMealsController = require('../controllers/OrdersMealsController')


const orderMealsRoutes = Router()
const orderMealsController = new OrderMealsController()


orderMealsRoutes.post('/', orderMealsController.create)
orderMealsRoutes.get('/', orderMealsController.index)
orderMealsRoutes.get('/:id', orderMealsController.index)

module.exports = orderMealsRoutes
const { Router } = require('express')
const OrderMealsController = require('../controllers/OrdersMealsController')


const orderMealsRoutes = Router()
const orderMealsController = new OrderMealsController()


orderMealsRoutes.post('/', orderMealsController.create)

module.exports = orderMealsRoutes
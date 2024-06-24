const { Router } = require('express')
const OrderMealsController = require('../controllers/OrdersMealsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')

const orderMealsRoutes = Router()
const orderMealsController = new OrderMealsController()

orderMealsRoutes.use(ensureAuthenticated)

orderMealsRoutes.post('/', verifyAuthorization('customer'), orderMealsController.create)
orderMealsRoutes.get('/', orderMealsController.index)
orderMealsRoutes.get('/:id', orderMealsController.show)

orderMealsRoutes.post('/checkout', verifyAuthorization('customer'), orderMealsController.checkout)

module.exports = orderMealsRoutes
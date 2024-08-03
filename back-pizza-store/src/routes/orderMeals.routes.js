const { Router } = require('express')
const OrderMealsController = require('../controllers/OrdersMealsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')

const orderMealsRoutes = Router()
const orderMealsController = new OrderMealsController()

orderMealsRoutes.use(ensureAuthenticated)

orderMealsRoutes.post('/', 
    /* #swagger.description = 'Endpoint to create a new order'
        #swagger.parameters['orders'] = {
            in: 'body',
            description: 'Orders meals information',
            required: true,
            schema: { $ref: '#/definitions/Orders' }
        }
    */
    verifyAuthorization('customer'), orderMealsController.create
)
orderMealsRoutes.get('/', orderMealsController.index)
orderMealsRoutes.get('/:id', orderMealsController.show)

orderMealsRoutes.post('/checkout', 
    /* #swagger.description = 'Endpoint to checkout order user'
        #swagger.parameters['checkout] = {
            in: 'body',
            required: true,
            description: 'Checkout order',
            schema: {
                $user_id: 1
            }
        }
    */
    verifyAuthorization('customer'), orderMealsController.checkout
)

module.exports = orderMealsRoutes
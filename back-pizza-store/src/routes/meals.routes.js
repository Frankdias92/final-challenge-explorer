const { Router } = require('express')
const MealsController = require("../controllers/MealsController")
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')
const uploadConfig = require('../configs/upload')
const multer = require('multer')

const mealsRoutes = Router()
const mealsIndex = Router()
const upload = multer(uploadConfig.MULTER)


const mealsController = new MealsController()

mealsRoutes.get('/index', mealsController.index)

mealsRoutes.use(ensureAuthenticated)

mealsRoutes.get('/:id', mealsController.item)
mealsRoutes.post('/',
    /* #swagger.tags = ['Meals']
       #swagger.description = 'Endpoint to create a new meal'
       #swagger.consumes = ['multipart/form-data']
       #swagger.parameters['productImg'] = {
            in: 'formData',
            name: 'productImg',
            type: 'file',
            required: true,
            description: 'Image file for the meal'
       }
       #swagger.parameters['name'] = {
            in: 'formData',
            name: 'name',
            type: 'string',
            required: true,
            description: 'Name of the meal'
       }
       #swagger.parameters['ingredients'] = {
            in: 'formData',
            name: 'ingredients',
            type: 'string',
            required: true,
            description: 'Ingredients of the meal'
       }
       #swagger.parameters['description'] = {
            in: 'formData',
            name: 'description',
            type: 'string',
            required: true,
            description: 'Description of the meal'
       }
       #swagger.parameters['price'] = {
            in: 'formData',
            name: 'price',
            type: 'number',
            required: true,
            description: 'Price of the meal'
       }
       #swagger.parameters['category'] = {
            in: 'formData',
            name: 'category',
            type: 'array',
            items: { type: 'string' },
            required: true,
            description: 'Category of the meal'
       }
       #swagger.parameters['created_by'] = {
            in: 'formData',
            name: 'created_by',
            type: 'number',
            required: true,
            description: 'ID of the user who created the meal'
       }
    */
    verifyAuthorization('admin'), upload.single('productImg') , mealsController.create
)
mealsRoutes.put('/:id', verifyAuthorization('admin'), upload.single('productImg'), mealsController.update)
mealsRoutes.delete('/:id', verifyAuthorization('admin'), mealsController.delete)

module.exports = mealsRoutes
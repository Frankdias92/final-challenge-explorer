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
mealsRoutes.post('/', verifyAuthorization('admin'), upload.single('productImg') , mealsController.create)
mealsRoutes.put('/:id', verifyAuthorization('admin'), upload.single('productImg'), mealsController.update)
mealsRoutes.delete('/:id', verifyAuthorization('admin'), mealsController.delete)

module.exports = mealsRoutes
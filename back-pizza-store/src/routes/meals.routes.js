const { Router } = require('express')
const MealsController = require("../controllers/MealsController")
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const verifyAuthorization = require('../middlewares/verifyAuthorization')
const uploadConfig = require('../configs/upload')
const multer = require('multer')

const mealsRoutes = Router()
const upload = multer(uploadConfig.MULTER)


const mealsController = new MealsController()

mealsRoutes.use(ensureAuthenticated)
mealsRoutes.use(verifyAuthorization('admin', 'customer'))

mealsRoutes.get('/', mealsController.index)
mealsRoutes.get('/:id', mealsController.item)
mealsRoutes.post('/', upload.single('productImg') , mealsController.create)
mealsRoutes.put('/:id', upload.single('productImg'), mealsController.update)
mealsRoutes.delete('/:id', mealsController.delete)

module.exports = mealsRoutes
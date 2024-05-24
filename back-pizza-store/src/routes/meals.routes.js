const { Router } = require('express')
const MealsController = require("../controllers/MealsController")

const mealsRoutes = Router()

const mealsController = new MealsController()

mealsRoutes.get('/', mealsController.index)
mealsRoutes.get('/:id', mealsController.item)
mealsRoutes.post('/', mealsController.create)
mealsRoutes.put('/:id', mealsController.update)
mealsRoutes.delete('/:id', mealsController.delete)

module.exports = mealsRoutes
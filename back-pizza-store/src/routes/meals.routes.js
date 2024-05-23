const { Router } = require('express')
const MealsController = require("../controllers/MealsController")

const mealsRoutes = Router()

const mealsController = new MealsController()

mealsRoutes.get('/', mealsController.index)
mealsRoutes.post('/', mealsController.create)

module.exports = mealsRoutes
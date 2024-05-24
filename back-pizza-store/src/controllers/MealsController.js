const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");


class MealsController {
    async create(req, res) {
        const { name, description, price, category, created_by } = req.body
        
        const [ meal_id ] = await knex("meals")
        .insert({ name, description, price, category, created_by })
        .returning("meal_id")

        res.status(201).json({ meal_id })
    }

    async index(req, res) {
        const meals = await knex("meals").select("*")
        res.status(200).json(meals)
    }

    async item(req, res) {
        const meal = await knex("meals").where({ meal_id: req.params.id })

        if (meal) {
            res.status(200).json(meal)
        } else {
            res.status(404).json({ error: "Meal not found" })
        }
    }

    async update(req, res) {
        const { name, description, price, category, created_by } = req.body

        const meal = await knex("meals").where({ meal_id: req.params.id })
        .update({
            name,
            description, price,
            category,
            created_by
        })

        res.status(200).json({ message: "Meal update" })
    }

    async delete(req, res) {
        const meal = await knex("meals").where({ meal_id: req.params.id })
        .delete()

        if (meal) {
            res.status(200).json({ message: "Meal deleted" })
        } else {
            res.status(404).json({ error: "Meal not found" })
        }
    }

}

module.exports = MealsController
const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");


class MealsController {
    async create(req, res) {
        const { name, description, price, category, created_by } = req.body
        const [ meal_id ] = await knex("meals").insert({ name, description, price, category, created_by }).returning("meal_id")

        res.status(201).json({ meal_id })
    }

    async index(req, res) {
        const meals = await knex("meals").select("*")
        res.status(200).json(meals)
    }


}

module.exports = MealsController
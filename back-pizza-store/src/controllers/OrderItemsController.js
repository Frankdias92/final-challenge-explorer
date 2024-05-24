const knex = require('../database/knex')

class OrderItemsController {
    async create(req, res) {
        const { order_id, meal_id, quantity } = req.body

        const [order_item_id] = await knex("order_items")
        .insert({
            order_id,
            meal_id,
            quantity
        })
        .returning("order_item_id")

        res.status(201).json({ order_item_id})
    }

    async index(req, res) {
        const orderItems = await knex("order_items").select("*")
        res.status(200).json({orderItems})
    }
}

module.exports = OrderItemsController
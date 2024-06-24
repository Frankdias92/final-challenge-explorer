const knex = require('../database/knex')


class OrderMealsController {
    async create(req, res) {
        const { user_id, total_price } = req.body
        
        const [order_id] = await knex("orders")
        .insert({ user_id, total_price})
        .returning("order_id")
        
        res.status(201).json({ order_id })
    }

    async index(req, res) {
        const orders = await knex('orders').select('*')
        res.status(200).json( orders )
    }

    async show(req, res) {
        const order = await knex('orders').where({ order_id: req.params.id }).first()

        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404).json({ error: "Order not found" })
        }
    }
}

module.exports = OrderMealsController
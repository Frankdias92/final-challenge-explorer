const knex = require('../database/knex')


class OrderMealsController {
    async create(req, res) {
        const { user_id, total_price } = req.body
        
        const [order_id] = await knex("orders")
        .insert({ user_id, total_price})
        .returning("order_id")
        
        res.status(201).json({ order_id })
    }
}

module.exports = OrderMealsController
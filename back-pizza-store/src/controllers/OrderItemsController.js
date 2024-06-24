const knex = require('../database/knex')

class OrderItemsController {
    async create(req, res) {
        try {
            const { order_id, meal_id, quantity } = req.body

            console.log('received data:', { order_id, meal_id, quantity })

            const [order_item_id] = await knex("order_items")
            .insert({
                order_id,
                meal_id,
                quantity
            })
            .returning("order_item_id")

            console.log('test inserted order item id:', order_item_id)

            res.status(201).json({ order_item_id})
        } catch (error) {
            console.error("error inserting order item: ", error)
            res.status(500).json({ status: 'error', message: 'Internal server error', error})
        }
    }

    async index(req, res) {
        try {
            const orderItems = await knex("order_items").select('*')
            
            if (orderItems) {
                res.status(200).json(orderItems)
            } else {
                res.status(404).json({ error: "order item not found"})
            }

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        
        
    }

    async show(req, res) {
        const orderItems = await knex("order_items")
        .where({ order_item_id: req.params.id }).first()

        if (orderItems) {
            res.status(200).json(orderItems)
        } else {
            res.status(404).json({ error: "Order item not found" })
        }
    }

    async update(req, res) {
        const { order_id, meal_id, quantity } = req.body
        const meal = await knex("order_items").where({ order_item_id: req.params.id })
        .update({
            order_id,
            meal_id,
            quantity
        })

        if (meal) {
            res.status(200).json({ message: "Order item updated" })
        } else {
            res.status(404).json({ error: "Order item not found" })
        }
    }

    async delete(req, res) {
        const meal = await knex("order_items").where({ order_item_id: req.params.id })
        .delete()

        if (meal) {
            res.status(200).json({ message: "Order item deleted" })
        } else {
            res.status(404).json({ error: "Order item not found" })
        }
    }
}

module.exports = OrderItemsController
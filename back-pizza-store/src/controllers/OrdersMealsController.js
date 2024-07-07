const knex = require('../database/knex');

class OrderMealsController {
    async create(req, res) {
        const { user_id, total_price } = req.body;

        try {
            const [order_id] = await knex('orders')
                .insert({ user_id, total_price })
                .returning('order_id');

            res.status(201).json({ order_id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async index(req, res) {
        try {
            const orders = await knex('orders').select('*');
            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async show(req, res) {
        const { id } = req.params;

        try {
            const order = await knex('orders')
                .where({ order_id: id })
                .first();

            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ error: 'Order not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async checkout(req, res) {
        const { user_id } = req.body;
        const transaction = await knex.transaction();

        try {
            const cartItems = await transaction('cart_items')
                .where({ user_id })
                .join('meals', 'cart_items.meal_id', 'meals.meal_id')
                .select('cart_items.*', 'meals.price');

            if (!cartItems.length) {
                await transaction.rollback();
                return res.status(400).json({ error: 'Carrinho está vazio' });
            }

            const total_price = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

            const [order] = await transaction('orders')
                .insert({ user_id, total_price })
                .returning('order_id');

            const orderItems = cartItems.map(item => ({
                order_id: order.order_id,  // Ensure correct order_id
                meal_id: item.meal_id,
                quantity: item.quantity
            }));

            await transaction('order_items').insert(orderItems);

            await transaction('cart_items').where({ user_id }).delete();

            await transaction.commit();
            res.status(201).json({ order_id: order.order_id });
        } catch (error) {
            await transaction.rollback();
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OrderMealsController;

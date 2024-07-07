const knex = require('../database/knex');

class CartController {
    async create(req, res) {
        const { user_id, meal_id, quantity } = req.body;

        try {
            const [cart_item_id] = await knex('cart_items')
                .insert({ user_id, meal_id, quantity })
                .returning('cart_item_id');

            res.status(201).json({ cart_item_id });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async show(req, res) {
        const { user_id } = req.params;

        try {
            const cartItems = await knex('cart_items')
                .where({ user_id })
                .join('meals', 'cart_items.meal_id', 'meals.meal_id')
                .select('cart_items.*', 'meals.name', 'meals.description', 'meals.price', 'meals.category');

            res.status(200).json(cartItems);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        const { cart_item_id } = req.params;
        const { quantity } = req.body;

        try {
            const count = await knex('cart_items')
                .where({ cart_item_id })
                .update({ quantity });

            if (count) {
                res.status(200).json({ message: 'Cart item updated' });
            } else {
                res.status(404).json({ error: 'Cart item not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async delete(req, res) {
        const { cart_item_id } = req.params;

        try {
            const count = await knex('cart_items')
                .where({ cart_item_id })
                .delete();

            if (count) {
                res.status(200).json({ message: 'Cart item deleted' });
            } else {
                res.status(404).json({ error: 'Cart item not found' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = CartController;

const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const { diskStorage } = require('multer')
const DiskStorage = require('../providers/DiskStorage')


class MealsController {
    async create(req, res) {
        try {
            const { name, ingredients, description, category, created_by } = req.body;
            const price = Number(req.body.price)

            if (!req.file) {
                return res.status(400).json({ error: 'Dishe image is required' });
            }

            let parsedIngredients = [];
            let parsedCategory = [];

            try {
                if (typeof ingredients === 'string') {
                    parsedIngredients = JSON.parse(ingredients);
                }
                if (typeof category === 'string') {
                    parsedCategory = JSON.parse(category);
                }

                if (!Array.isArray(parsedIngredients)) {
                    throw new Error("Ingredients is not a valid array after parsing");
                }
                if (!Array.isArray(parsedCategory)) {
                    throw new Error("Category is not a valid array after parsing");
                }

            } catch (parseError) {
                console.log("Parsing error:", parseError);
                return res.status(400).json({ error: 'Invalid ingredients or category format' });
            }

            const productImg = req.file.filename;
            const diskStorage = new DiskStorage();
            const filename = await diskStorage.saveFile(productImg);

            console.log('Before inserting into the database');

            const result = await knex("meals")
                .returning("meal_id")
                .insert({
                    name,
                    ingredients: JSON.stringify(parsedIngredients),
                    description,
                    price,
                    category: JSON.stringify(parsedCategory),
                    created_by,
                    productImg: filename
                });

            const meal_id = result[0];
            console.log('After inserting into the database, meal_id:', meal_id);

            return res.json({ message: 'Dishe created successfully', meal_id });

        } catch (error) {
            console.log("Error creating dishe:", error);
            return res.status(500).json({ error: `internal server error: ${error.message}` });
        }
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
        const { name, description, ingredients, price, category } = req.body;
        let filename

        if (req.file && req.file.filename) {
            const productImg = req.file.filename;
            const diskStorage = new DiskStorage();
            filename = await diskStorage.saveFile(productImg);
        }

        try {
            // parse category if they are received as a JSON string
            let parsedCategory = category
            if ( typeof category === 'string' ) {
                parsedCategory = JSON.parse(category)
            }

            let parsedIngredients = ingredients
            if (typeof ingredients === 'string') {
                parsedIngredients = JSON.parse(ingredients)
            }
            
            // verify if the meal exists
            const mealArray = await knex("meals").where({ meal_id: req.params.id })
            const meal = mealArray[0]
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found'})
            }

            // If already have a img, remove the older
            if (filename && meal.productImg) {
                const diskStorage = new DiskStorage()
                await diskStorage.deleteFile(meal.productImg)
            }

            await knex("meals").where({ meal_id: req.params.id })
            .update({
                name,
                description,
                ingredients: JSON.stringify(parsedIngredients),
                price,
                category: JSON.stringify(parsedCategory),
                productImg: filename || meal.productImg // use the new img or already in use
            })
            
            res.status(200).json({ message: 'Meal updated succesfully' })
        } catch (error) {
            console.error("error updating meal: ", error)
            res.status(500).json({ error: 'Internal server error' })
        }
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
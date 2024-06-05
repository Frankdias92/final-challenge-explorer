const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const { diskStorage } = require('multer')
const DiskStorage = require('../providers/DiskStorage')


class MealsController {
    async create(req, res) {
        try {
            const { name, ingredients, description, price, category, created_by } = req.body;

            if (!req.file) {
                return res.status(400).json({ error: 'Dishe image is required' });
            }
            const productImg = req.file.filename;
            const diskStorage = new DiskStorage();
            const filename = await diskStorage.saveFile(productImg);

            const [meal_id] = await knex("meals").insert({
                name,
                description,
                price,
                category,
                ingredients,
                productImg: filename,
                created_by
            });

            return res.json({ message: 'Dishe created successfully' });

        } catch (error) {
            console.log("error creating dishe: ", error);
            return res.status(500).json({ error: 'internal server error' });
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
        // const { category } = req.body
        console.log('request body:', req.body)
        console.log('request file:', req.file)
        
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
            
            // verify for dishe is already set
            const meal = await knex("meals").where({ meal_id: req.params.id })
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found'})
            }

            // If already have a img, remove the older
            if (filename && meal.productImg) {
                await diskStorage.deleteFile(meal.productImg)
            }

            await knex("meals").where({ meal_id: req.params.id })
            .update({
                name,
                description,
                ingredients,
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
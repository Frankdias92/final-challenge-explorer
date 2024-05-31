exports.up = knex => knex.schema.createTable("meals", table => {
    table.increments("meal_id")
    table.text("name").notNullable()
    table.text("description").notNullable()
    table.decimal("price", 10, 2).notNullable()
    table.text("category").notNullable()
    table.text("ingredients").notNullable()
    table.text("productImg").notNullable()
    table.integer("created_by").unsigned().references("id").inTable("users")
})

exports.down = knex => knex.schema.dropTable("meals")
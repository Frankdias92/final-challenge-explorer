exports.up = knex => knex.schema.createTable("order_items", table => {
    table.increments("order_item_id")
    table.integer("quantity").notNullable()

    table.integer("order_id").unsigned().references("order_id").inTable("orders").notNullable()
    table.integer("meal_id").unsigned().references("meal_id").inTable("meals").notNullable()
})

exports.down = knex => knex.schema.dropTable("order_items")
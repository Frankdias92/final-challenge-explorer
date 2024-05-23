const { default: knex } = require("knex")

exports.up = knex => knex.schema.createTable("orders", table => {
    table.increments("order_id")
    table.timestamp("order_date").defaultTo(knex.fn.now())
    table.decimal("price", 10, 2).notNullable()

    table.integer("user_id").unsigned().references("id").inTable("users").notNullable()
})

exports.down = kenx => knex.schema.dropTable("orders")
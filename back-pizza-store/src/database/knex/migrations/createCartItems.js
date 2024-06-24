exports.up = knex => knex.schema.createTable("cart_items", table => {
    table.increments("cart_item_id");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("meal_id").unsigned().references("meal_id").inTable("meals");
    table.integer("quantity").notNullable().defaultTo(1);
});

exports.down = knex => knex.schema.dropTable("cart_items");
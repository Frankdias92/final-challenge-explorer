const userSchema = require('./user')
const sessionSchema = require('./sessions')
const mealsSchema = require('./meals')
const orderMealSchema = require('./orders')
const order_itemsSchema = require('./order_items')
const cartSchema = require('./cart')


module.exports = {
  User: userSchema,
  Sessions: sessionSchema,
  Meals: mealsSchema,
  Orders: orderMealSchema,
  Order_Items: order_itemsSchema,
  Cart: cartSchema
}
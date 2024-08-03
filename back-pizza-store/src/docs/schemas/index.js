const userSchema = require('./user')
const sessionSchema = require('./sessions')
const mealsSchema = require('./meals')
const orderMealSchema = require('./orders')


module.exports = {
  User: userSchema,
  Sessions: sessionSchema,
  Meals: mealsSchema,
  Orders: orderMealSchema
}
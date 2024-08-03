const userSchema = require('./user')
const sessionSchema = require('./sessions')
const mealsSchema = require('./meals')

module.exports = {
  User: userSchema,
  Sessions: sessionSchema,
  Meals: mealsSchema
}
const knex = require("../database/knex");
const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    
    const { name, email, password } = request.body;

    const checkUserExists = await knex("users").where({ email });

    if (checkUserExists.length > 0) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

     await knex("users").insert({ name, email, password: hashedPassword });

    return response.status(201).json();
  }
  async updateUserAsAdmin(request, response) {
    const { id } = request.params
    const { role } = request.body

    try {
      const checkUserExists = await knex('users')
          .where({ id })
          .update({ role })

        if (checkUserExists) {
          return response.status(201).json({ message: 'User updated as admin' })
        } else {
          response.status(404).json({ error: 'User not found' })
        }
    } catch (err) {
      response.status(500).json({ error: err.message })
    }
    
  }
}

module.exports = UsersController;
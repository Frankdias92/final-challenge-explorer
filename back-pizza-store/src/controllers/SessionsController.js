const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create a new user session',
      schema: {
        $email: 'Frank@email.com',
        $password: '12345678@'
      }
    } */
    const { email, password } = request.body;

    try {
      const user = await knex("users").where({ email }).first();
      
        if (!user) {
          throw new AppError("E-mail e/ou senha incorreta.", 401);
        }
    
        const passwordMatched = await compare(password, user.password);
    
        if (!passwordMatched) {
          throw new AppError("E-mail e/ou senha incorreta.", 401);
        }
    
        const { secret, expiresIn } = authConfig.jwt;
    
        const token = sign({ role: user.role }, secret, {
          subject: String(user.id),
          expiresIn
        });
    
        response.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 30 * 60 * 1000,
        })
    
        delete user.password
        response.status(201).json({ user });
        
      } catch (error) {
        return response.status(500).json({ error: error.message})
      } 
    }
}

module.exports = SessionsController;
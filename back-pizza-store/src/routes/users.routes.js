const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UserValidatedController = require("../controllers/UserValidatedController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

const usersController = new UsersController();
const userValidatedController = new UserValidatedController();

usersRoutes.post("/", 
    /* #swagger.tags = ['Users']
        #swagger.description = 'Endpoint to create a new user.'
        #swagger.parameters['users'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: { $ref: '#/definitions/User' }
        } 
    */  
    usersController.create
);
usersRoutes.get("/validated", ensureAuthenticated, userValidatedController.index);
usersRoutes.put("/:id", ensureAuthenticated, usersController.updateUserAsAdmin);


module.exports = usersRoutes;
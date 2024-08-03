const { Router } = require('express');

const SessionsController = require('../controllers/SessionsController');
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", 
    /* #swagger.tags = ['sessions']
        #swagger.description = Endpoint to create a new session.
        #swagger.parameters['sessions'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: { $ref: '#/definitions/Sessions' }
        }
    */
    sessionsController.create
);

module.exports = sessionsRoutes;
const swaggerAutogen = require('swagger-autogen')();

const schemas = require('./docs/schemas')

const doc = {
  info: {
    title: 'Explorer Food Documentation for Node/Express',
    description: 'Documentation API Node/Express with Swagger - Food Explorer',
    version: '1.0.1'
  },
  host: 'localhost:3333',
  consumes: ['application/json', 'multipart/form-data'],
  produces: ['application/json'],
  definitions: {
    User: schemas.User,
    Sessions: schemas.Sessions,
    Meals: schemas.Meals
  }
};

const outputFile = 'swagger-output.json';
const routes = ['src/routes/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
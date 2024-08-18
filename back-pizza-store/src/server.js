require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const { Client } = require('pg')
const routes = require("./routes");
const uploadConfig = require('./configs/upload')
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger-output.json")

const app = express();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // disable to run local
  // ssl: {
  //   rejectUnauthorized: false
  // }
})

client.connect()
  .then(() => console.log('Connect to database'))
  .catch(err => console.error('Connection error', err.stack))

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: [`${process.env.APP_CORS_ORIGIN}`],
  credentials: true
}));

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);


app.use((err, request, response, next) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
  
    console.error(err);
  
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
});

const PORT = process.env.APP_PORT;
app.listen(PORT, () => 
  console.log(`Server is running on Port ${PORT}
${process.env.POSTGRES_DB} FOOD EXPLORER
by: /in/Franklin-md`)
);
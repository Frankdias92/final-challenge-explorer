require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const uploadConfig = require('./configs/upload')
const AppError = require("./utils/AppError");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../swagger-output.json")

const app = express();


app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: [`${process.env.DB_HOST}:${process.env.APP_CORS_PORT}`, "http://127.0.0.1:3000"],
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

const PORT = process.env.DB_PORT;
app.listen(PORT, () => 
  console.log(`Server is running on Port ${PORT}
${process.env.DB_DATABASE} FOOD EXPLORER
by: /in/Franklin-md`)
);
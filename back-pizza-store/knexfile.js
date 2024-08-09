require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false
      }
    },
    log: {
      warn(message) {
        console.warn(message);
      },
      error(message) {
        console.error(message);
      },
      deprecate(message) {
        console.warn(message);
      },
      debug(message) {
        console.debug(message);
      }
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate: (conn, cb) => conn.query("SET timezone = 'UTC' ; ", cb )
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
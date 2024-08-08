require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
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
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
};
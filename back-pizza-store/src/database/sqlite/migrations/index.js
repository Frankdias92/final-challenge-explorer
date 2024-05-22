const sqliteConnection = require('../../sqlite')
const createRestaurant = require('./createRestaurant')

async function migrationsRun() {
    const schemas = [
        createRestaurant
    ].join('')

    sqliteConnection()
        .then(db => db.exec(schemas))
        .catch(error => console.error(error))
}

module.exports = migrationsRun
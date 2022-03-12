// connect to DB
const { Sequelize } = require('sequelize')
const path = require('path')
// require('dotenv').config({ path: path.join(__dirname, '../', './.env') })
const CONFIG_DATABASE = require('../config/index')
const database = new Sequelize(
  CONFIG_DATABASE.POSTGRES_DATABASE,
  CONFIG_DATABASE.POSTGRES_USERNAME,
  CONFIG_DATABASE.POSTGRES_PASSWORD,
  {
    host: CONFIG_DATABASE.POSTGRES_HOST,
    dialect: 'postgres',
    quoteIdentifiers: false, // remove " from table name
    port: CONFIG_DATABASE.POSTGRES_PORT,
    logging: false,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    },
    ssl: true
  }
)
module.exports = database

// connect to DB
const { Sequelize } = require('sequelize')
const path = require('path')
// require('dotenv').config({ path: path.join(__dirname, '../', './.env') })
const CONFIG_DATABASE = require('../config/index')
const database = new Sequelize(
  process.env.POSTGRES_DATABASE || CONFIG_DATABASE.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME || CONFIG_DATABASE.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD || CONFIG_DATABASE.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || CONFIG_DATABASE.POSTGRES_HOST,
    dialect: 'postgres',
    quoteIdentifiers: false, // remove " from table name
    port: process.env.POSTGRES_PORT || CONFIG_DATABASE.POSTGRES_PORT,
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

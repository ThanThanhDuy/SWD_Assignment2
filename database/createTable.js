const database = require('./index')
const Job = require('../model/job')

// create table
const createTable = () => {
  try {
    database
      .sync()
      .then(() => {
        consola.info({
          message: 'Table created',
          badge: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    consola.error({
      message: "can't create table",
      badge: true
    })
  }
}

module.exports = {
  createTable
}

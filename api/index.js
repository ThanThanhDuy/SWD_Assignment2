const express = require('express')
const routes = require('../api/routes/routes')
const table = require('../database/createTable')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(cors({ origin: true, credentials: true }))

// create table
table.createTable()

// Routes
app.use(routes)

//catch errors
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

//error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.message = err.message
  return res.json({
    status: error.status,
    message: error.message
  })
})

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}

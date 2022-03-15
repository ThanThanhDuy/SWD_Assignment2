const express = require('express')
const jobRoutes = require('./job/index')
const routes = express()

routes.use(jobRoutes)

module.exports = routes

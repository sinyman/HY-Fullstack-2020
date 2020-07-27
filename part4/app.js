const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/blog')


app.use(cors())
app.use(express.json())
app.use(bodyparser.json())
app.use('/api/blogs', notesRouter)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app

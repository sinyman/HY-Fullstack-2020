const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/blog')

mongoose.connect(config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
mongoose.set('useFindAndModify', false)


app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)

module.exports = app

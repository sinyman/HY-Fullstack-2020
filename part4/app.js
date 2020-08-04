const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')

mongoose.connect(config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
mongoose.set('useFindAndModify', false)


app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(middleware.errorHandler)
app.use(middleware.requestLogger)

module.exports = app

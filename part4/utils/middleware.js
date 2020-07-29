const _ = require('lodash')
const mongoose = require('mongoose')
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info(
    `${request.method}
     ${request.path}
     ${ _.isEmpty(request.body)? '': JSON.stringify(request.body)}
  `)

  next()
}

const errorHandler = (error, request, response, next) => {

  if (error instanceof SyntaxError && error.status === 400) {
    return response.status(400).json({ status: 400, message: "Bad request" })
  }

  if (error instanceof mongoose.Error.ValidationError) {
    return response.status(400).json({ status: 400, message: `${error}` })
  }

  logger.error(error.message)

  next(error)
}

module.exports = { requestLogger, errorHandler  }

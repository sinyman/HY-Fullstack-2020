const _ = require('lodash')
const { Error } = require('mongoose')
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info(`${request.method} ${response.statusCode} ${request.path} -- ${JSON.stringify(request.body)}`)

  next()
}

const errorHandler = (error, request, response, next) => {

  if (error instanceof SyntaxError && error.status === 400) {
    return response.status(400).json({ status: 400, message: "Bad request" })
  }

  if (error instanceof Error.ValidationError) {
    return response.status(400).json({ status: 400, message: `${error}` })
  }

  logger.error(error.message)

  next(error)
}

module.exports = { requestLogger, errorHandler  }

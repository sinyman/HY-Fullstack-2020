const _ = require('lodash')
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

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    logger.error(error.message)
    return response.status(400).json({ status: 400, message: "Bad request: Check that your JSON is correct" })
  }

  next(error)
}

module.exports = { requestLogger, errorHandler  }

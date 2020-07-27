const logger = require('./logger');

const requestLogger = (request, response, next) => {
  let body = JSON.stringify(request.body)
  logger.info(request.method,request.path,`${ body.substr(1,body.length-2) ? body : "" }`)
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  next(error)
}

module.exports = { requestLogger, errorHandler }

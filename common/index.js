const logger = require('./lib/logger/logger');
const httpLogger = require('./lib/middlewares/httplogger');
const errorHandler = require('./lib/middlewares/error.handlers');

module.exports = {
  logger,
  httpLogger,
  errorHandler
}
let logger = require('../logger/logger')('error');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  logger.error('UNCAUGHT EXCEPTION! Shutting down...');
  if(next) {
    next(err);
  } else {
    process.exit(1);
  }
};

module.exports.errorHandler = errorHandler;
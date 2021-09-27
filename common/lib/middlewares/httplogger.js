const morgan = require('morgan');
const logger = require('../logger/logger')('EXPRESS');

logger.stream = {
  write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

module.exports.httpLogger = morgan(
  ':method :url :status :response-time ms - :res[content-length]',
  { stream: logger.stream }
);
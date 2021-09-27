const mongoose = require('mongoose');
let { logger } = require('../common/index');

logger = logger('DBCONNECT');

const connect = (dbURI) => {
  mongoose.connection.on('connected', (err) => {
    logger.log('info', 'mongoose is connected');
  });
  mongoose.connect(dbURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
};

module.exports.dbconnect = connect;

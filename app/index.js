const fs = require('fs');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const join = require('path').join;
const models = join(__dirname, './model');
let { httpLogger, logger, errorHandler } = require('../common/index');
logger = logger('error');

process.on('uncaughtException', errorHandler.errorHandler)
  .on('unhandledRejection', errorHandler.errorHandler)
  .on('warning', errorHandler.errorHandler);

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

//routes
const go = require('./routes/go');

app.use(httpLogger.httpLogger);
app.use(express.json());
app.use('/go', go);
app.use(errorHandler.errorHandler);

module.exports = app;
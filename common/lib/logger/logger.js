'use strict';
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');
const logDir = './log';

const dailyRotateFileTransport = filename => new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-${filename}.log`,
  maxSize: "1g",
  maxDays: "1d",
  zippedArchive: true,
  datePattern: 'YYYY-MM-DD'
});

const logger = function (filename = 'combine') {
  return createLogger({
    // change level if in dev environment versus production
    level: 'debug',
    maxsize: '500m',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      // for the log file
      format.printf(info => `[${filename}]: ${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
      new transports.Console({
        level: 'info',
        format: format.combine(
          format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          format.printf(info => `[${filename}]: ${info.timestamp} ${info.level}: ${info.message}`)
        )
      }),

      dailyRotateFileTransport(filename)
    ]
  });
}

module.exports = logger
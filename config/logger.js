const moment = require('moment');
const fs = require( 'fs' );
const winston = require('winston');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  // return `${dt} [${label}] ${level}: ${message}`;
  return `[${level}] ${moment(timestamp).format('YYYY-MM-DD HH:mm:ss')} : ${message}`;
});
const optionConsole = {
  colorize: true,
  json: false,
  handleExceptions: true,
  format: combine(
    // label({ label: 'error' }),
    timestamp(),
    myFormat
  ),
};

const optionFile = {
  name: 'logfile-log',
  level: process.env.LOG_LEVEL,
  dirname: 'logs',
  filename: 'logfile-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  zippedArchive: true,
  prepend: true,
  colorize: true,
  json:false,
  prettyPrint: true,
  format: combine(
    // label({ label: 'error' }),
    timestamp(),
    myFormat
  ),
};

let logger;
const init = () => {
  const logDir = 'logs'; // directory path you want to set
  if ( !fs.existsSync( logDir ) ) {
      // Create the directory if it does not exist
      fs.mkdirSync(logDir);
  }
  logger = winston.createLogger({
    transports: [
        new winston.transports.Console(optionConsole),
        new winston.transports.DailyRotateFile(optionFile),
    ],
    exitOnError: false
  });
}

// module.exports = logger;
module.exports = {
  init : () => init(),
  get : () => logger,
};
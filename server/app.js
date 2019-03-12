var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cors = require('cors');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');
var expressWinston = require('express-winston');
var winston = require('winston');
require('dotenv').config()
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${__dirname}/../logs/log-api.log`
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
});
global.logger = logger;

global.APP_PATH = process.cwd().replace('server', '');

var usersRouter = require('./routes/users');
var routes = require('./routes/routes');

var app = express();

// view engine setup
//app.use(express.static(path.join(__dirname, './../frontEnd/dist')));
//app.get(/.*/, function(req, res) {
  //  res.sendFile(__dirname + "/dist/index.html");
//});

//app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(APP_PATH + 'client/dist'));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${__dirname}/../logs/log-api.log`
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.use('/api/users', usersRouter);
app.use(routes);

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${__dirname}/../logs/log-api.log`
    })
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/** cities-info REST APIs route **/
/** V1 **/
var citiesInfoRouter = require('./routes/cities-info');

var app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//V1
app.use('/',citiesInfoRouter);

// error handler
app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  process.env.NODE_ENV === 'development' ? console.log("Error Stack: ", err.stack) : true;

  var errMessage = err.message.toString() || 'Service error. Please check your request params.';
  var errStatus = err.status || 500;
  res.status(errStatus).json({errStatus,errMessage});
  
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var boatRouter = require('./routes/boat');
var bicycleRoute = require('./routes/bicycle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/boat', boatRouter);
app.use('/bicycles', bicycleRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err.stack : {};
  console.log('req,app',req.app.get('env'))
  console.log('error',err)
  // console.log('req,app',req.app)
  // render the error page
  res.status(err.status || 500);

  res.send({
    type:'error',
    status:err.status,
    message:err.message,
    stack:res.locals.error
  })
  // res.render('error'); //aqui genera un text html y no un json entonces
});

module.exports = app;
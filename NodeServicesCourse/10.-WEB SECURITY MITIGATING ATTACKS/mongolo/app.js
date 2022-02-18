var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const remoteA = req.socket.remoteAddress;
  console.log('aver',remoteA)
  console.log('aver',req.socket.address())
  if(req.socket.remoteAddress === '::1'){
    console.log('mamaste')
    next(createError(403))
    // res.
    return
  }
  // console.log('x',req.is('application/json'))
  // console.log(req.accepts('application/json'))
  // console.log(req.headers['content-type'])
  next(createError(404));
});

const algo = `
<html>
  <h1> no te pases de v3rgg4a loco</h1>
</html>

`
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err.status === 403){
    // res.status = 403;
    res.status(403).end(algo)
    return
  } 
  // render the error page
  res.status(err.status || 500);
  res.send({
    statusCode: res.status
  })
});

module.exports = app;

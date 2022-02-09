var createError = require('http-errors');
var express = require('express');
const app = express()


const htmlInit = `
  <head>
    <style>
      h1{color:blue}
    </style>
  </head>
  <body>
    <h1>que pedo piche chango  </h1>
    <a href ='/x' > que pedo </a>
  </body>
`
const htmlX = `
  <head>
    <style>
      h1{color:blue}
    </style>
  </head>
  <body>
    <h2> si si si rico </h2>
  </body>
`

app.get('/',(req,res)=>{
  // console.log('si')
  // res.send('soy el')
  res.type('text/html')
  res.send(htmlInit)
})
app.get('/x',(req,res)=>{
  // console.log('si')
  // res.send('soy el x')
  res.type('text/html')
  res.send(htmlX)
})


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
  res.send({

  })
});


app.listen(3001,()=>console.log('3000 sisii'))
// module.exports = app;

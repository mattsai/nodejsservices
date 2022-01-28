const express  = require('express');
const createError = require('http-errors')
const app = express();
const routerIndex =  require('./routes/index')
const routerHello = require('./routes/hello')

app.use('/',routerIndex)
app.use('/hello',routerHello)



app.use((req,res,next)=>{
    const method = req.method;
    if(method!='GET'){
        next(createError(405))
        return
    }
    next(createError(404))
})

app.use((err,req,res,next)=>{
    res.status(err.status|| 500);
    res.send(err.message)
})


module.exports = app;
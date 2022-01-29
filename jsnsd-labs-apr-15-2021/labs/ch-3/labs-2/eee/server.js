const app  = require('express')();
const createError = require('http-errors')
app.get('/',(req,res)=>{
    res.send('xD')
})

app.use('/',(req,res,next)=>{
    if(req.method !== 'GET'){
        next(createError(405))
        return
    }
    next(createError(404))
})


app.use(function (err,req,res,next){
    // const errCode = err.code || 404;
    res.status(err.status).send(err.message);

})

app.listen(3000, (req,res)=>{
    console.log('xx')
})
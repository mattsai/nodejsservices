const app = require('express')();
const myRoute  = require('./routes/route')
const  HttpError =  require('http-errors')
// const data =  require('./data')

app.use('/',myRoute)
app.use('/',(req,res,next)=>{
    // if(req.u!=='GET'){
    next(HttpError(404))
    // return
    // }
})
app.use('/',(error,req,res,next)=>{
    // console.log('final 241')
    res.status(error.status || 500)
    res.send(error.message || 'Unknow');
    
})


app.listen(3000,()=>{
    console.log('Port listening 3000')
})
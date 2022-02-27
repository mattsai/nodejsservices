const app =  require('express')();

const data = require('./data')
const {callbackify} =  require('util')
const myData = callbackify(data);
app.get('/',(req,res,next)=>{
    myData((err,result)=>{
        if(err) next(err)
        res.status(200).send(result)
    });
})


app.use('/',(req,res)=>{
    res.status(404).send({message:'Nout found'})
})


app.listen(3000,()=>console.log('listening'))



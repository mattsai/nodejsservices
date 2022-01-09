const app = require('express')();
const createError =  require('http-errors');


app.get('/',((req,res)=>{
    res.send('xd')
}))

app.post('/',((req,res)=>{
    // res.status = 405;
    let error = createError(405);
    console.log('mammaaaste')
    res.status(error.statusCode || 500)
    res.send(error.message)
}))

app.listen(3000,()=>{
    console.log('listen to port 3000')
})
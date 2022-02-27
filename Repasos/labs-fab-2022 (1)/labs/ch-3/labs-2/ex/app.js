const app = require('express')();
app.get('/',(req,res)=>{
    res.status(200).send('Yahoo');
})

app.post('/',(req,res)=>{
    res.status(405).send('Not allowed')
})


app.listen(3000,()=>{
    console.log('ready')
})
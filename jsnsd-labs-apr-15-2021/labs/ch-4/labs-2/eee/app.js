const app  = require('express')();
const data =  require('./stream')
const {finished} =  require('stream')
app.get('/data', async (req,res)=>{
    const dataStream  =  data();
    dataStream.pipe(res,{end:false});
    finished(dataStream,err=>{
        if(err){
            throw Error('Valio pwerka')
        }
        res.end()
    })
})

app.listen(3000,()=>{
    console.log('aja ya está');
})
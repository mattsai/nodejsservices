const Router =  require('express').Router();
const hnls =  require('hn-latest-stream')
const {finished} = require('stream')

Router.get('/',async (req,res)=>{
    const {type='html'} =  req.query;
    res.type(type)
    const stream =  await hnls(10,type) 
    stream.pipe(res)

    finished(stream,err=>{
        if(err) throw Error('Valio barriga señor verga')
        res.end()
    })

})
module.exports = Router;
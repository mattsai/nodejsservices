const Router =  require('express').Router();
const hnls =  require('hn-latest-stream')
const {finished} = require('stream')

Router.get('/',(req,res,next)=>{
// Router.get('/',async (req,res,next)=>{
    const {type='html'} =  req.query;
    // res.type(type)
    if(type==='html') res.type('text/html')
    if(type==='json') res.type('application/json')
    const stream =  hnls(10,type) 
    // const stream =  await hnls(10,type) 
    stream.pipe(res)

    finished(stream,err=>{
        if(err){
            next(err)
            return
        }
        res.end()
        // if(err) throw Error('Valio barriga señor verga')
        // res.end()
    })

})
module.exports = Router;
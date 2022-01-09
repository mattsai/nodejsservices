const {Router} = require('express');
const myRouter = Router();
const data = require('../data')
// const {} = require('ch')
myRouter.get('/',async (req,res)=>{
    // res.contentType('text/html')
    const dataRandom  = await data()
    console.log('data oneiga',dataRandom)
    res.send(dataRandom)
})

module.exports = myRouter;
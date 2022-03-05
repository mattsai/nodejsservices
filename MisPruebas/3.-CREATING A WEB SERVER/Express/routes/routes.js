const {Router}  =  require('express')
const myRouter = Router();
const myController = require('../controller/controller')


myRouter.get('/',(req,res)=>{
    res.end('Yo soy otro tú');
})

module.exports = myController;
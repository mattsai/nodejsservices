const {bicycle:{read}} =  require('./mode');
const Router = require('express').Router();

Router.get('/:id',(req,res,next)=>{
    const {id} = req.params;
    read(id,(err,result)=>{
        if(err){
            if(err.message==='not found') next();
            else next(err)
            return
        }
        res.send(result)
    })  
    
})

module.exports = Router;


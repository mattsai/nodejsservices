var express = require('express');
var {promisify} = require('util');
var router = express.Router();
const {boat:{create,del,update,read,uid}} = require('../model')
const delP =  promisify(del);

/* GET users listing. */

router.get('/:id',function(req,res,next){
  const {id} = req.params;
  read(id,(err,objR)=>{
    if(err){
      if(err.code === 'E_NOT_FOUND') next()
      else next(err)
      return
    }
    res.send(objR)
  })
})

router.delete('/:id', function(req, res, next) {
  const {id} = req.params;
  del(id,err=>{
    if(err){
      console.log('errr->',err.code)
      if(err.code === 'E_NOT_FOUND' )next()
      else next(err)  
      return
    }
    res.status(204).send()
  })
});

module.exports = router;

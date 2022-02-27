var express = require('express');
var router = express.Router();
const {boat} =  require('../model')

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  boat.read(id,(err,result)=>{
    if(err){
      if(err.code === 'E_NOT_FOUND'){
        err.status =404;
        next(err);
        return
      }
      next(err)
      return
    }
    res.send(result)
    return
  })
});

router.post('/', function(req, res, next) {
  if(req.is('application/json')){
    const id = boat.uid();
    const {data}= req.body;
    console.log('si');
    boat.create(id,data,(err,result)=>{
      if(err){
        if(err.code === 'E_RESOURCE_EXISTS'){
          err.status =409;
          next(err);
          return
        }
        next(err)
        return
      }
      res.send({id:result})
      return
    })
  }
});

module.exports = router;

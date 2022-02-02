var express = require('express');

var router = express.Router();
const {boat:{create,read,uid}} = require('../model')
/* GET home page. */
router.get('/:id', function(req, res, next) {
  console.log('GET',req.is('application/json'));
    const {id} = req.params;
    read(id,(err,obj)=>{
      if(err){
        next(err)
      }
      else res.send(obj)
    })
});

router.post('/', (req, res, next) => {
  console.log('POST',req.is('application/json'));
    if(req.is('application/json')){
      const id = uid();
      const {data} =  req.body;
      create(id,data,(err,id)=>{
        if(err){
          // if(err.message === 'unknown'){
          //   res.status(500);
          //   next(err)
          //   return
          // }
          next(err)
          return
        }else{

          res.status(201).send({id})
        }
      })
    }else{
      return
    }
});



module.exports = router;

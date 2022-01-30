var express = require('express');
var router = express.Router();
const {boat:{ uid, create, read, update, del }} = require('../model');


/* GET boat listing. */
router.get('/:id', function(req, res, next) {
  const {id} =  req.params;
  read(id,(err,result)=>{
    if(err){
      if(err.message==='not found') next();
      else next(err)
      return
    }
    res.send(result);
    
    // next(Error('Mamaste'))
    // return
  })
});

module.exports = router;

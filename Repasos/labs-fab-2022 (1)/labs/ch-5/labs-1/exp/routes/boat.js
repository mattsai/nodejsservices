var express = require('express');
var router = express.Router();
const {boat} = require('../model')
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  boat.read(id,(err,object)=>{

    if(err){
      if(err.code === 'E_NOT_FOUND'){
        err.status = 404;
        next(err)
        return
      }
      next(err)
      return
    }
    res.send(object)
  })

});

module.exports = router;

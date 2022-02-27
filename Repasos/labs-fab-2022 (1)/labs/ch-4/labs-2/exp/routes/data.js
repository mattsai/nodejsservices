var express = require('express');
var router = express.Router();
const datS = require('../stream')
const {finished} = require('stream')
/* GET users listing. */
router.get('/', function(req, res, next) {
  const myStream = datS();
  res.type('application/json');
  myStream.pipe(res)
  finished(myStream,err=>{
    if(err){
      next(err)
    }
  })
});

module.exports = router;

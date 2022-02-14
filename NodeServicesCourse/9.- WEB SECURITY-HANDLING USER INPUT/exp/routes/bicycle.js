var express = require('express');
const { read } = require('fs');
var router = express.Router();

const {bicycle} = require('../../model')
const {promisify} =  require('util');
const readP  = promisify(bicycle.read)
/* GET users listing. */
router.get('/:id', async function(req, res, next) {
// router.get('/:id', function(req, res, next) {
  const {id} = req.params;
  try {
    const result = await readP(id)
    res.send(result)
  } catch (error) {
    if(error.message === 'not found') next()
      else next(error)
      return
  }
  // bicycle.read(id,(err,result)=>{
  //   if(err){
  //     if(err.message === 'not found') next()
  //     else next(err)
  //     return
  //   }
  //   res.send({algo:'xd'});
  // })
});

module.exports = router;

var express = require('express');
const { read } = require('fs');
var router = express.Router();

const {bicycle} = require('../../model')
const {promisify} =  require('util');
const readP  = promisify(bicycle.read)

function hasOwnProperty(p,o){
  return Object.hasOwnProperty.call(o,p);
}
function hasProperty(p,o){
  return p in o
}
function badRequest(){
  var error =  new Error('Bad request');
  error.status = 400;
  error.statusCode = 400;
  return error
}

function isValidID(n){
  n = Number(n);
  var MAX_SAFE = Math.pow(2,53)-1;
  return isFinite(n) && Math.floor(n) === n && Math.abs(n) <= MAX_SAFE;
}

function validateParams(params){
  var valid = params !== null && typeof params === 'object';
  valid = valid && hasProperty('id',params)
  valid = valid && isValidID(params.id)
  return valid
}

function validateData(params){
  var valid = params !== null && typeof params === 'object';
  valid = valid && hasProperty('brand',params) && hasProperty('color',params)
  valid = valid && typeof params.brand === 'string' && typeof params.color === 'string'
  return valid && {
    brand:params.brand,
    color:params.color
  }

}
function validateBody(params){
  var valid = params !== null && typeof params === 'object';
  valid = valid && hasOwnProperty('data',params)
  valid = valid && params.data !== null && typeof params.data === 'object';
  data = valid && validateData(params.data);
  return valid && data && {data}  
}


/* GET users listing. */
// router.get('/:id', async function(req, res, next) {
router.get('/:id', function(req, res, next) {
  if(validateParams(req.params)){
    const {id} = req.params;
    // try {
    //   const result = await readP(id)
    //   res.send(result)
    // } catch (error) {
    //   if(error.message === 'not found') next()
    //     else next(error)
    //     return
    // }
    bicycle.read(id,(err,result)=>{
      if(err){
        if(err.message === 'not found') next()
        else next(err)
        return
      }
      // result = {brand:'brand',colors:'colors'}
      var sanitizedResult = validateData(result);
      if(sanitizedResult){
        res.send(sanitizedResult)
      }else{
        next(new Error('Server error'))
      }
      // res.send({algo:'xd'});
    })
  }else{
    next(badRequest())
  }
  
});

router.post('/',(req,res,next)=>{
  // const {id} = req.params;
  if(body = validateBody(req.body)){
    const {data} = body;
    const id = bicycle.uid();
    bicycle.create(id,data,(err,idCreated)=>{
      if(err){
        if(err.message === 'already exists') {
          err.status = 400;
          next(err)
        }
        else next(err)
        return
      }
      if(isValidID(idCreated)){

        res.status(201).send({id:idCreated})
      }else{
        next(new Error('Server Error'));
      }
    })
  }else{
    next(badRequest())
  }
  
})

router.put('/:id',(req,res,next)=>{
  if(validateParams(req.params) && validateBody(req.body)){
    const {id} = req.params;
    const {data} = req.body;
    if(isValidID(id)){
      console.log('id',id)
      console.log('data',data)
      bicycle.update(id,data,(err)=>{
        if(err){
          if(err.message === 'not found') next()
          else next(err)
          return
        }
        res.status = 204;
        res.statusCode = 204;
        console.log('r',res.status)
        res.send({})
      })
    }else{
      next(Error('Server error'))
    }
  }else{
    next(badRequest())
  }

})
router.put('/:id/update',(req,res,next)=>{
  if(validateBody(req.body) && validateParams(req.params)){
    const {id} = req.params;
    const {data} = req.body;
    if(isValidID(id)){
      bicycle.update(id,data,(err)=>{
        if(err){
          if(err.message === 'not found') {
            bicycle.create(id,data,(err,idResponse)=>{
              if(err){
                if(err.message === 'already exists'){
                  res.status = 400;
                  next(err)
                }else next(err)
                return
              }
              if(isValidID(idResponse)){
                // res.statusCode = 201;
                res.status(201).send({id:idResponse})
              }else{
                next(Error('Server error'))
              }
            })
          }
          else next(err)
          return
        }
        // res.status = 204;
        res.statusCode = 204;
        res.send()
      })
    }
  }else{
    next(badRequest())
  }
  

})

router.delete('/:id',(req,res,next)=>{
  if(validateParams(req.params)){
    const {id} =  req.params;
    if(isValidID(id)){
      bicycle.del(id,err=>{
        if(err){
          if(err.message === 'not found') next()
          else next(err)
          return
        }
        res.status(204).send()
      })
    }else{
      next(Error('Server error'))
    }
  }else{
    next(badRequest())
  }
  
})

module.exports = router;

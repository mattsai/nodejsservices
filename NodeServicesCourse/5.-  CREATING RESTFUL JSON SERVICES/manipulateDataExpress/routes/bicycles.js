var express = require('express');
var router = express.Router();
const {bicycle} = require('./model')
const {bicycle:{read,create,del,uid,update}} = require('./model')
// const 
const {promisify} = require('util')
const readP = promisify(bicycle.read); //que segun esta mal o no es recomendado que csumadre
const createP = promisify(bicycle.create);
const updateP = promisify(bicycle.update);
const delP = promisify(bicycle.del);
const uidP = bicycle.uid
const createError  =require('http-errors');
const { errorMonitor } = require('events');



const notFound  =createError(404)
const conflict =createError(409)
//disque segun esta mal usar el async await con express que no mame
/* GET users listing. */
router.get('/:id',function(req, res, next) {
// router.get('/:id',async  function(req, res, next) {
  const {id} = req.params;
  console.log('id',id);
  read(id,(err,result)=>{
    if(err){
      if(err.message==='not found') next()
      else next(er)
    }
    res.send(result)
  })

  // try {
  //   const bicycle = await read(id);
  //   // console.log('ibb',bicycle)
  //   res.send(bicycle)
  //   // return bicycle;//chale no funciona xc
  //   // next(createError(500))
  // } catch (error) {
  //   console.log('error mess',error.message)
  //   if(error.message ==='not found') next();
  //   else next(error)
  // }
});

router.post('/p/',async (req,res,next)=>{
  const {data} =  req.body;
  // const id = uid();
  const id =1;
  // const id  =1;
  try {
    const aa = await createP(id,data)
    res.status(201)
    res.send({message:'Created with id '+id,obj:aa})
  } catch (error) {
    if(error.message==='already exists') next(conflict)
    else next(error)
  }
})

router.post('/', function(req, res, next) {
  // var id = uid();
  var id = 1;
  create(id, req.body.data, (err,id) => {
    if (err) next(err)
    else res.status(201).send({ id });
  });
});

router.post('/:id/update',async (req,res,next)=>{
  const {id} = req.params;
  const {data} = req.body;
  update(id,data,(err,obj)=>{
    if(err) next()
    else res.status(204).send()
  })
  // try {
    
  //     await update(id,data)
  //     res.status(204)
  //     res.end()
  // } catch (error) {
  //   if(error.message==='not found') next()
  //   else next(error)
  // }
})

router.put('/:id',async (req,res,next)=>{
  const {id} = req.params;
  const {data} = req.body;
  create(id,data,(err,result)=>{
    if(err){
      if(err.message==='already exists'){
        update(id,data,err=>{
          if(err) next(err);
          else res.status(204).send();
        })
      }
    }else{
      res.status(201).send({message:`Created with id ${id}`})
    }
  })

  // try {
  //   await create(id,data);
  //   res.status(201).send({message:'Created'})
  // } catch (error) {
  //   if(error.message==='already exists'){
  //     console.log('updated');
  //     await update(id,data)
  //     res.status(204).send()
  //   }else{
  //     next(error)
  //   }

  // }
})

router.delete('/:id',async (req,res,next)=>{
  const {id} = req.params;
  del(id,err=>{
    if(err){
      console.log('err',err.message)
      if(err.message==='not found') next()
    }else res.status(204).send()
  })
  // try {
  //   await del(id)
  //   res.status(204).send()
  // } catch (error) {
  //   if(error.message==='not found') next()
  //   else next(error)
  // }
})
module.exports = router;

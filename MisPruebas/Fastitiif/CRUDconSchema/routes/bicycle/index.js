'use strict'

const {bicycle} = require('../../model')
const {promisify} = require('util');

const uid = bicycle.uid;
const create = promisify(bicycle.create);
const del = promisify(bicycle.del);
const read = promisify(bicycle.read);
const update = promisify(bicycle.update);




module.exports = async function (fastify, opts) {

  const dataSchema = {
    type:'object',
    additionalProperties:false,
    required:['brand','color'],
    properties:{
      brand:{type:'string'},
      color:{type:'string'}
    }
  }

  const bodySchema = {
    type:'object',
    additionalProperties:false,
    required:["data"],
    properties:{
      data:dataSchema
    }
  }

  const idSchema = {
    type:'number'
  }
  const paramsSchema = {
    id:idSchema
  }
  fastify.get('/:id', {
    schema:{
      params:paramsSchema,
      response:{
        200:dataSchema
      }
    }
  }
  ,async function (request, reply) {
    const {id}=  request.params;
    try {
      const response = await read(id)
      reply.send(response);
      // reply.send({queso:'quesito'})

    } catch (error) {
      if(error.message==='not found')reply.notFound()
      else return error
      return
    }
  })

  fastify.post('/',{
    schema:{
      body:bodySchema,
      response:{
        201:{
          id:{type:'number'}
        }
      }
    }
  }, async function (request, reply) {
    const id = uid()
    // const id = 1;
    const {data}  = request.body;
    console.log('post',data)
    try {
      const response = await create(id,data)
      reply.status(201);
      reply.send({id:response});
    } catch (error) {
      if(error.message==='already exists')reply.badRequest('Already Exists')
      else return error
      return
    }
  })

  //if not exists create
  fastify.put('/:id/update',{
    schema:{
      body:bodySchema,
      params:paramsSchema
    }
  }, async function (request, reply) {
    
    const {id} = request.params;
    const {data}  = request.body;
    try {
      await update(id,data)
      reply.status(204);
      return 
    } catch (error) {
      if(error.message==='not found'){
        var idr = await create(id,data)
        reply.status(201);
        reply.send({id:idr});
        return
      }
      else return error
      return
      // if(error.message==='already exists')reply.badRequest('Already Exists')
      // else return error
      // return
    }
  })


  //update
  fastify.put('/:id',{
    schema:{
      body:bodySchema,
      params:paramsSchema
    }
  }, async function (request, reply) {
    const {id}=  request.params;
    const {data}  = request.body;
    try {
      const response = await update(id,data)
      reply.status(204);
      return 
    } catch (error) {
      if(error.message==='not found')reply.notFound()
      else return error
      return
    }
  })

  //delete
  fastify.delete('/:id',{
    schema:{
      params:paramsSchema,
    }
  }, async function (request, reply) {
    const {id}=  request.params;
    try {
      await del(id)
      reply.status(204);
      return 
    } catch (error) {
      if(error.message==='not found')reply.notFound()
      else return error
      return
    }
  })



  





  
}

'use strict'
const {boat} = require('../model2.cjs');
const {promisify} = require('util');
const read = promisify(boat.read)
const update = promisify(boat.update)
const create= promisify(boat.create)
const del= promisify(boat.del)

module.exports = async function (fastify, opts) {
  const idSchema = {
    type:'integer'
  }

  const paramsSchema = {
    type:'object',
    additionalProperties:false,
    required:['id'],
    properties:{
      id:idSchema
    }
  }
  const dataSchema = {
    type:'object',
    required:['brand','color'],
    additionalProperties:false,
    properties:{
      brand:{type:'string'},
      color:{type:'string'}
    }
  }

  const bodySchema = {
    type:'object',
    additionalProperties:false,
    required:['data'],
    properties:{
      data: dataSchema
    }
  }

  fastify.get('/:id', 
    {
      schema:{
        params:paramsSchema,
        response:{
          200:dataSchema
        }
      }
    }
  ,async function (request, reply) {
    const {id} = request.params;
    console.log('id',id);
    try {
      const result = await read(id);
      return reply.send(result);
    } catch (error) {
      if(error.code){
        if(error.code === 'E_NOT_FOUND'){
          return reply.notFound();
        }
      }else{
        throw error
      }
    }
  })

  //POOOOST
  fastify.post('/', 
    {
      schema:{
        body:bodySchema,
        response:{
          201:{id:idSchema}
        }
      }
    }
  ,async function (request, reply) {
    const {data} = request.body;
    const id = boat.uid();
    console.log('id',data,id);
    try {
      await create(id,data);
      return reply.status(201).send({id});
    } catch (error) {
      if(error.code){
        if(error.code === 'E_RESOURCE_EXISTS'){
          return reply.badRequest();
        }
      }else{
        throw error
      }
    }
  })


  //UPDATE
  fastify.put('/:id', 
    {
      schema:{
        params:paramsSchema,
        body:bodySchema
      }
    }
  ,async function (request, reply) {
    const {id} = request.params;
    const {data} = request.body;
    console.log('id',id,'data',data);
    try {
      await update(id,data);
      return reply.status(204).send({});
    } catch (error) {
      if(error.code){
        if(error.code === 'E_NOT_FOUND'){
          return reply.notFound();
        }
      }else{
        throw error
      }
    }
  })



  //DELETE
  fastify.delete('/:id', 
    {
      schema:{
        params:paramsSchema
      }
    }
  ,async function (request, reply) {
    const {id} = request.params;
    console.log('id',id);
    try {
      await del(id);
      return reply.status(204).send({});
    } catch (error) {
      if(error.code){
        if(error.code === 'E_NOT_FOUND'){
          return reply.notFound();
        }
      }else{
        throw error
      }
    }
  })


}

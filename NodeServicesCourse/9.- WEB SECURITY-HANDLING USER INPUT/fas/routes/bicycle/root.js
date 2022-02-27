'use strict'

const {bicycle} = require('../../model')
const {promisify} =  require('util')
const uid = bicycle.uid
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const del = promisify(bicycle.del)
const update =promisify(bicycle.update)

module.exports = async function (fastify, opts) {

  const dataSchema ={
    type:'object',
    additionalProperties:false,
    // required:['color','brand'],
    required:['color','brand','descomentaesto'],
    properties:{
      brand:{type:'string'},
      color:{type:'string'},
      // caquencia:{type:'string'}
    }
  }
  const idSchema = {type:'number'}
  const paramsSchema = {
    id:idSchema
  }
  const bodySchema = {
    type:'object',
    required:['data'],
    additionalProperties:false,
    properties:{
      data:dataSchema
    }
  }
  
  fastify.get('/test/:queso',async function (request,reply){
    // console.log(request.para)
    console.log('qry',request.query)
    reply.send(request.params)
  })

  //GET
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
    const {id} =  request.params;
    console.log( request.params)
    try {
      const response = await read(id);
      console.log('r',response)
      // return {ka: 'boom',brand:'j0t0',color:'jaja',caquencia:'popo'} //para probar el 200 ok response 
      reply.send(response);
    } catch (error) {
      if(error.message==='not found') reply.notFound()
      else return error
      return
    }
  })

  // //POST - CREATE NEW ONE
  fastify.post('/',
  {schema:{
    body:bodySchema,
    response:{
      201:paramsSchema
    }
  }}
  ,async function (request, reply) {
    // const {id} =  request.params;
    const id  = uid()
    const {data} =  request.body;
    try {
      const responseId = await create(id,data);
      console.log('r',responseId)
      reply.status(201);
      return reply.send({id:responseId});
    } catch (error) {
      if(error.message==='already exists') reply.conflict()
      else return error
      return
    }
  })

  // //UPDATE  y si no lo encuentra lo crea
  fastify.put('/:id',
  {schema:{
    params:paramsSchema,
    body:bodySchema
  }}
  ,async function (request, reply) {
    const {id} =  request.params;
    // const id  = uid()
    const {data} =  request.body;
    try {
      await update(id,data);
      reply.status(204);
      // return reply.send({responseId});
      // reply.send(response);
    } catch (error) {
      if(error.message==='not found') {
        const responseId = await create(id,data);
        reply.status(201);
        return reply.send({responseId});
      }
      else return error
    }
  })

  //DELETE
  fastify.delete('/:id', {
    schema:{
      params:paramsSchema
  }}
  ,async function (request, reply) {
    const {id} =  request.params;
    // console.log('id',id)
    try {
      await del(id);
      reply.status(204)
      // reply.send(response);
    } catch (error) {
      if(error.message==='not found') reply.notFound()
      else return error
      return
    }
  })

  fastify.post('/:id/update', {
    schema: {
      body: bodySchema,
      params: paramsSchema
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { data } = request.body
    try {
      await update(id, data)
      reply.code(204)
    } catch (err) {
      if (err.message === 'not found') {
        const responseId = await create(id,data);
        // console.log('r',responseId)
        reply.status(201);
        return reply.send({id:responseId});
      }
      return err
    }
  })

}

'use strict'
const {bicycle}  = require('../../model')
const {promisify}  = require('util')
const create  = promisify(bicycle.create);
const del  =promisify( bicycle.del);
const read  = promisify(bicycle.read);
const update  = promisify(bicycle.update);
const uid  = bicycle.uid;


module.exports = async function (fastify, opts) {

  const dataSchema = {
    type:'object',
    additionalProperties:false,
    required:['brand','color'],
    properties:{
      brand:{type:'string'},
      color:{type:'string'},
    }
  }

  const bodySchema = {
    type:'object',
    additionalProperties:false,
    required:['data'],
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



  fastify.get('/:id',{
    schema:{
      params:paramsSchema,
      response:{
        200:dataSchema
      }
    }
  },   async function (request, reply) {
    try {
      const {id} =  request.params;
      const response = await read(id);

      // reply.send(response);
    } catch (error) {
      if(error.message === 'not found') reply.notFound();
      else return error
      return
    }
  })

  fastify.post('/', {
    schema:{
      body:bodySchema,
      response:{
        201:{
          type:'object',
          additionalProperties:false,
          required:['id'],
          properties:{
            id:idSchema
          }
        }
      }
    }
  }, async function (request, reply) {
    const id = uid();
    const {data} = request.body;
    // console.log(request.isJ)
    try {
      const idResponse = await create(id,data);
      reply.status(201)
      reply.send('aaa')
      return
      // return reply.send({id:idResponse})
      // reply.send({id:idResponse});
    } catch (error) {
      if(error.message === 'already exists') reply.badRequest();
      else return error
      return
    }
  })


  fastify.put('/:id',{
      schema:{
        params:paramsSchema,
        body:bodySchema
      }
    },  async function (request, reply) {
    const {id} = request.params;
    const {data} = request.body;
    try {
      await update(id,data);
      reply.status(204);
      return
    } catch (error) {
      if(error.message === 'not found') reply.notFound();
      else return error
      return
    }
  })

  fastify.put('/:id/update',{
    schema:{
      params:paramsSchema,
      body:bodySchema,
    }
  },  async function (request, reply) {
    const {id} = request.params;
    const {data} = request.body;
    try {
      await update(id,data);
      reply.status(204);
      return
    } catch (error) {
      if(error.message === 'not found') {
        const idResponse = await create(id,data);
        reply.send({id:idResponse});
      }
      else return error
      return
    }
  })

  fastify.delete('/:id',{
    schema:{
      params:paramsSchema
    }
  },  async function (request, reply) {
    const {id} = request.params;
    try {
      await del(id);
      reply.status(204);
      return
    } catch (error) {
      if(error.message === 'not found') reply.notFound();
      else return error
      return
    }
  })

}

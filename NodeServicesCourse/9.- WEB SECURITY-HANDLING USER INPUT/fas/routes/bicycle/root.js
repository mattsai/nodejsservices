'use strict'

const {bicycle} = require('../../model')
const {promisify} =  require('util')
const uid = bicycle.uid
const read = promisify(bicycle.read)
const create = promisify(bicycle.create)
const del = promisify(bicycle.del)
const update =promisify(bicycle.update)

module.exports = async function (fastify, opts) {


  const  bodySchema = {
    type:'object',
    required:['data'],
    additionalProperties:false,
    properties:{
      data:{
        additionalProperties:false,
        required:['color','brand'], //,'testo'
        properties:{
          color: { type: 'string' },
          brand: { type: 'string' }
          // ,testo: { type: 'string' }
        }
      }
    }
  }

  const paramsSchema = {
      // required:['caca'],
      id:{
        type:'number'
      },
      queso:{
        type:'number'
      }
  }

  const qsSchema = {
    type: 'object',
    additionalProperties:false,
    required:['queso'],
    properties: {
      queso: { type: 'string' },
      chocolate: { type: 'string' }
    }
  }

  const schema = {
    body:bodySchema
  }

  fastify.get('/test/:queso',
  {
    schema:{
      params:paramsSchema,
      querystring:qsSchema
  }}
  ,async function (request,reply){
    // console.log(request.para)
    console.log('qry',request.query)
    reply.send(request.params)
  })

  //GET
  fastify.get('/:id',{schema:{params:paramsSchema}},async function (request, reply) {
    const {id} =  request.params;
    console.log( request.params)
    try {
      const response = await read(id);
      reply.send(response);
    } catch (error) {
      if(error.message==='not found') reply.notFound()
      else return error
      return
    }
  })

  // //POST - CREATE NEW ONE
  
  
  

  fastify.post('/', {schema},async function (request, reply) {
    // const {id} =  request.params;
    const id  = uid()
    const {data} =  request.body;
    console.log('d',data)
    try {
      const responseId = await create(id,data);
      reply.status(201);
      return reply.send({responseId});
    } catch (error) {
      if(error.message==='already exists') reply.conflict()
      else return error
      return
    }
  })

  // //UPDATE  y si no lo encuentra lo crea
  fastify.put('/:id', {schema},async function (request, reply) {
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
  fastify.delete('/:id', async function (request, reply) {
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

}

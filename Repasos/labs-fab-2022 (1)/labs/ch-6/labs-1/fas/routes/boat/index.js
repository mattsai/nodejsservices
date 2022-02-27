'use strict'
const {promisify} = require('util')
const {boat} = require('../../model')
const read = promisify(boat.read)
const create = promisify(boat.create)

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} =  request.params;
    try {
      const result = await read(id);
      reply.send(result);
      return
    } catch (error) {
      if(error.code ==='E_NOT_FOUND'){
        reply.notFound();
        return
      }
      return error
    }
  })

  fastify.post('/', async function (request, reply) {
    if(request.is('application/json')){
      var id = boat.uid();
      
      const {data} = request.body;
      try {
        var idR = await create(id,data)
        return reply.send({id:idR})
      } catch (error) {
        if(error.code === 'E_RESOURCE_EXISTS'){
          return reply.badRequest();
        }
        throw error;
      }
    }
  })
}

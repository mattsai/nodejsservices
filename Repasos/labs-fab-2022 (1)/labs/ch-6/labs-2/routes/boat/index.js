'use strict'
const {boat} = require('../../model')
const {promisify} = require('util');
const del  =promisify(boat.del);
const read =promisify(boat.read);

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params;
    try {
      const result  =  await read(id);
      return reply.send(result);
    } catch (error) {
      if(error.code === 'E_NOT_FOUND'){
        return reply.notFound();
      }
      return error
    }
    
  })
  fastify.delete('/:id', async function (request, reply) {
    const {id} = request.params;
    try {
      await del(id);
      reply.status(204)
      return reply.send();
    } catch (error) {
      if(error.code === 'E_NOT_FOUND'){
        return reply.notFound();
      }
      return error
    }
    
  })
}

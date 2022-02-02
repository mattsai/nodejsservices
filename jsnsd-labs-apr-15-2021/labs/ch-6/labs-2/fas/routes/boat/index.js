'use strict'
const {boat} = require('../../model')
const {promisify} = require('util')
const read = promisify(boat.read);
const del = promisify(boat.del);

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params;
    try {
      const obj  =await read(id)
      reply.send(obj);
    } catch (error) {
      if(error.code === 'E_NOT_FOUND') reply.notFound();
      else reply.send(error);
    }
  })

  fastify.delete('/:id', async function (request, reply) {
    const {id} = request.params;
    try {
      await del(id)
      reply.status(204).send()
    } catch (error) {
      if(error.code === 'E_NOT_FOUND') reply.notFound();
      else reply.send(error);
    }
  })
}

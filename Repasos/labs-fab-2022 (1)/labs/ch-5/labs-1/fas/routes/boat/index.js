'use strict'

const { promisify } = require("util");
const {boat} = require('../../model')
const read = promisify(boat.read)
module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params;
    
    try {
      const response = await read(id);
      reply.send(response)
    } catch (error) {
      if(error.code ==='E_NOT_FOUND'){
        reply.notFound();
        return
      }
      return error
    }

  })
}

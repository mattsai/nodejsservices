'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.post('/',async function(request,reply){
    return reply.code(405).send(Error('Sacate a la verga'))
  })
}

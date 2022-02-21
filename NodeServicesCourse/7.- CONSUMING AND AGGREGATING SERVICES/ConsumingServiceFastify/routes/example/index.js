'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.type('text/html').status(203).send('caquiiisiio')
  })
}

'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // return 'this is an example'
    return reply.view('me.hbs')
  })
}

'use strict'
const dataStream  = require('../../stream')
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const stream  = dataStream();
    console.log('a')
    reply.send(stream)
    // return { root: true }
  })
}

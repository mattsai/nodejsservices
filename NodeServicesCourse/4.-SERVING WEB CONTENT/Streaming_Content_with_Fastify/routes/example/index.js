'use strict'
const hnls = require('hn-latest-stream')

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const {type='html'} =  request.query;
    // return 'this is an example'
    console.log(type)
    reply.type(type)
    // reply.type('application/json')
    return reply.send(hnls(10,type))
  })
}

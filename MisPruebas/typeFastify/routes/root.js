'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/',(request,reply)=>{
    // res.type = 
  })
  fastify.get('/', async function (request, reply) {
    if (request.is('application/json')) {
    } 

    return { root: true }
  })
}

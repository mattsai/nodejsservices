'use strict'

const fp = require('fastify-plugin')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest',async function(request,reply){
    console.log('uua',request.ip)
    if(request.ip === '127.0.0.1'){
        // const error = Error('Forbidden'){}
        reply.forbidden();
    }
  })
})

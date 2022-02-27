'use strict'

const fp = require('fastify-plugin')


module.exports = fp(async function (fastify, opts) {
    fastify.addHook('onRequest', function (request, reply, done) {
    //   if(request.ip === ''){
    console.log('request',request.ip)
    if(request.ip === '::1' || request.ip == '127.0.0.1'){
    return reply.forbidden()
    }
    done()
})
})


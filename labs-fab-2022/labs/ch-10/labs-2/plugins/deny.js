'use strict'

const fp = require('fastify-plugin')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.addHook('onRequest',(request,reply)=>{
    var ip = request.ip;
    ip ='111.34.55.211';
      if(ip === '111.34.55.211'){
          throw fastify.httpErrors.forbidden()
        // reply.forbidden();
        //   return
      }
  })
})

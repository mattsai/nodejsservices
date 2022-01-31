'use strict'
const {boat:{read}} =  require('../../model')

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} =  request.params;
    // const {notFound} =  fastify.httpErrors;
    read(id,(err,result)=>{
      if(err){
        console.log('erl error mensaje',err.message)
        if(err.message === 'not found')reply.notFound()
        else reply.send(err)
        return
        // return
      }
      reply.send(result)
      // return
    })
    await reply
  })
}

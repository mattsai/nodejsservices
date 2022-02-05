'use strict'
const {boat:{read}} =  require('../../model')

module.exports = async function (fastify, opts) {
  fastify.get('/:id', function (request, reply) {
    const {id} =  request.params;
    read(id,(err,result)=>{
      if(err){
        if(err.message === 'not fount') return Error('not found') 
        else reply.send(err)
        return
      }
      reply.send(result)
    })

  })
}

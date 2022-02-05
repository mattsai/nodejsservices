'use strict'
const {boat:{read}} =  require('../../model')

module.exports = async function (fastify, opts) {
  fastify.get('/:id', function (request, reply) {
    const {id} =  request.params;
    read(id,(err,result)=>{
      if(err){
        console.log('mensaje',err.message)
        if(err.message === 'not found'){
          console.log('SI'); 
          // return Error('not found')
          reply.send(Error('not found')) 
        } 
        else return err
        return
      }
      reply.send(result)
    })

  })
}

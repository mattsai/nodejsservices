'use strict'
const {boat:{create,del,update,read,uid}} = require('../../model')
const {promisify} = require('util');
const createP =  promisify(create)
const delP =  promisify(del)
const updateP =  promisify(update)
const readP =  promisify(read)


module.exports = async function (fastify, opts) {
  const {notFound,conflict,internalServerError} = fastify.httpErrors;
  fastify.get('/:id', async function (request, reply) {
      const {id} = request.params;
      try {
        return await (readP(id))
      } catch (error) {
        // return 
        if(error.code==='E_NOT_FOUND') return notFound()
        else return error
      }
  })


  fastify.post('/',async (req,reply)=>{
    const id  = uid();
    // const id  = 1;
    const {data}  = req.body;
    console.log('POST',req.headers['content-type'])
    if(req.is('application/json')){
      try {
        const idd=  await createP(id,data)
        reply.status(201)
        reply.send({id}) 
      } catch (error) {
        if(error.code==='E_RESOURCE_EXISTS') return conflict()
        else {
          return error
        }
        // return
      }
    }else{
      return notFound()
    }
  })
}

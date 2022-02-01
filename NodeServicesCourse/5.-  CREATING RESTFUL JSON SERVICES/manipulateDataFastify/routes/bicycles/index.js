'use strict'
const {bicycle} =  require('../../model')
const {promisify} = require('util')
const create = promisify(bicycle.create)
const del = promisify(bicycle.del)
const read = promisify(bicycle.read)
const update = promisify(bicycle.update)
const uid = bicycle.uid
module.exports = async function (fastify, opts) {
  const {notFound,conflict} = fastify.httpErrors;
  // const {conflict} = fastify.httpErrors;

  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params;
    try {
      // throw Error('Unknow')
      return await read(id)
    } catch (error) {
      if(error.message==='not found'){
        return notFound();
      }
      return error
    }
  })



  fastify.post('/',async function(request,reply){
    const {data} = request.body;
    const id =  uid();
    // const id = 2
    try {
      console.log('creado1',id)
      reply.code(201)
      const idC = await create(id,data)

      return {message: `Created with id : ${idC}`, }
    } catch (error) {
      if(error.message==='already exists') {
        console.log('conflict')
        return  conflict()
      }
      return error
    }
  })

  fastify.post('/:id/update',async (request,reply)=>{
    const {id}= request.params;
    const {data} = request.body;
    const {notFound} = fastify.httpErrors;
    try {
      await update(id,data);
      reply.code(204); //envia un no content y normal, entonces no le envias nada que pendejdas
    } catch (error) {
      if(error.message==='not found') return notFound()
      return error
    }
  })

  fastify.put('/:id',async (request,reply)=>{
    const {id} =  request.params;
    const {data} = request.body;
    try {
        const idCreated = await create(id,data);
        return {message:`created with id ${idCreated}`}
    } catch (error) {
  
      if(error.message === 'already exists'){
        await update(id,data)
        reply.code(204);
      }else if(error.message === 'not found'){
        return notFound()
      }else{
        return error;
      }
    }
  })

  fastify.delete('/:id',async (request,reply)=>{
    const {id} = request.params;
    try {
      await del(id);
      reply.code(204);  
    } catch (error) {
      if(error.message==='not found') return notFound();
      else return error
    }
  })
}

'use strict'

const got = require('got');

const {BOAT_SERVICE_PORT = 4000,BRAND_SERVICE_PORT=5000} =  process.env;
const host = (port)=>{
  return `http://localhost:${port}`
}
const boatService  = host(BOAT_SERVICE_PORT);
const brandService = host(BRAND_SERVICE_PORT);

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {httpErrors} = fastify;
    const {id} = request.params;
    // console.log('id',id);
    // console.log('boatService',boatService);
    // console.log('brandService',brandService);
    try {
      const boatR = await got(boatService+'/'+id).json()
      // console.log('boatR',boatR)
      const brandR = await got(brandService+'/'+boatR.brand).json()
      // console.log('brandR',brandR)
      // throw Error('unkknow')
      // return 'mamaieie'
      return {  
        "id": boatR.id,
        "color": boatR.color,
        "brand": brandR.name}
    } catch (error) {
      console.log('error',error.response)
      if(!error.response) return error
      var statusCode = error.response.statusCode; 
      // console.log('statusCode',statusCode)
      if(statusCode===404){
        // console.log('404')
        return reply.notFound();
      } 
      if(statusCode===400){
        // console.log('400')
        return reply.badRequest();
      } 
      // console.log('extra')
      return error
    }
    // return { root: true }
  })
}

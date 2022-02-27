'use strict'
const {
  BOAT_SERVICE_PORT=4000,
  BRAND_SERVICE_PORT=5000
  } = process.env

const got = require('got');

const boatService = `http://localhost:${BOAT_SERVICE_PORT}/`
const brandService = `http://localhost:${BRAND_SERVICE_PORT}/`
module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} = request.params;
    // const [boat,brand] = await Promise.all([got(boatService+id).json(),got(brandService+id).json()])
    try {
      const opts = {timeout:1250,retry:1}
      const boatResult  = await got(boatService+id,opts).json()
      const brandResult = await got(brandService+boatResult.brand,opts).json()

      reply.send({
        id:boatResult.id,
        color:boatResult.color,
        name:brandResult.name
      })
    } catch (error) {
      if(!error.response){
        return error
      }
      const statusCode = error.response.statusCode;
      if(statusCode===400){
        return reply.badRequest();
      }
      if(statusCode===404){
        return reply.notFound();
      }

      if(statusCode===405){
        return reply.methodNotAllowed();
      }

      return error
    }


  })
}

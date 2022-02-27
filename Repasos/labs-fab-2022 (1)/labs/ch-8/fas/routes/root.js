'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const {url} =  request.query;

    try {
      console.log('url',url)
      new URL(url)
    } catch (error) {
      console.log('a',error.message)
      throw error
    }

    return reply.from(url)
  })
}

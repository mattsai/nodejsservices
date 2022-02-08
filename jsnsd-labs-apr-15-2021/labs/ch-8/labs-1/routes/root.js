'use strict'

/*
The service must be a transparent reverse HTTP proxy server such that a request to http://localhost:{PORT}/?url={URL}​ will respond with:1.the status code of ​{URL}2.the headers provided at ​{URL}3.the contents of the body at ​{URL}
*/
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // return { root: true }
    const {url} =  request.query;
    console.log('url',url)
    // if(!url) return reply.badRequest()
    try {
      new URL(url)
    } catch (error) {
      // console.log(error.message)
      return reply.badRequest()
    }
    return reply.from(url)
    // return reply.send('aaa')
  })
}

'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const dev =  process.env.NODE_ENV !== 'production';;
const fastifyStatic = dev && require('fastify-static')
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  if (dev) {
    fastify.register(fastifyStatic,{
      root: path.join(__dirname, 'public')
    })
  }
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.setNotFoundHandler((req,reply)=>{
    const isNotGet = req.method !== 'GET';
    if(isNotGet){
      reply.code(405).send(Error('Route is not GET'))
    }
    reply.code(404).send(Error('Route not found'))   
  })
}

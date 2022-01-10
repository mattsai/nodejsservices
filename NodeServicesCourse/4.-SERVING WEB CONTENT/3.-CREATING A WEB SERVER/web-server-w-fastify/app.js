'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const dev = process.env.NODE_ENV  !== 'production';
// console.log('dev',dev,process.env.NODE_ENV)
const fastifyStatic  = dev && require('fastify-static');


module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  if(dev){
    fastify.register(fastifyStatic,{
      root:path.join(__dirname,'public')
    })
  }
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

  fastify.setNotFoundHandler((req,res)=>{
    if(req.method !== 'GET'){
      // res.status(405) //lo vi por ahi se puede mejorar con un reply.code(405).send(Error('Method not allowed')))
      return 'Method not allowed\n'
    }
    
    res.status(404)
    return 'Not Found'
  })
}

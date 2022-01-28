'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
// const isOnDevEnvironment = process.env.NODE_ENV !== 'production';
// const fastifyStatic  = isOnDevEnvironment && require('fastify-static');

const POV = require('point-of-view')
const handlebars = require('handlebars')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  // if(isOnDevEnvironment){

  fastify.register(POV,{
    engine:{handlebars},
    root:path.join(__dirname,'views'),
    layout:'layout.hbs',
  })
  //   fastify.register(fastifyStatic,{
  //     root: path.join(__dirname, 'public')
  //   })
  // }


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

  fastify.setNotFoundHandler((request,reply)=>{
    const method  = request.method;

    if(method!=='GET'){
      reply.code(405).send(Error('No hagas mamadas que no son get thank you'))
    }
    reply.code(404).send(Error('Aprendale a escribir, grax'))

  })
}

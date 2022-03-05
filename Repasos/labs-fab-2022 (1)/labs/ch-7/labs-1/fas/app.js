'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  fastify.addHook('onRequest',(req,reply,done)=>{
    console.log('on request',req.ip)
    if(req.ip === '127.0.0.1'){
      console.log('akauak')
      reply.unauthorized() //aqui muere la petición 
      // console.log('asdadsa')
      // return
    }
    console.log('16 16 ')
    done()
  })
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
}

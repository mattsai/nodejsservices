'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fasStatic =  require('fastify-static');

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.addHook('onRequest',(req,reply)=>{
    console.log('req',req.url);
    
      try {
        var route = req.url;
        if(route==='/') route = 'index';
        return reply.sendFile(route+'.html');
      } catch (error) {
        throw error
      }
    
  })
  // Do not touch the following lines
  fastify.register(fasStatic, {
    root: path.join(__dirname, 'public')
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
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'routes'),
  //   options: Object.assign({}, opts)
  // })
}

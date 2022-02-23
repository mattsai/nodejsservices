'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const httpProxy =  require('fastify-http-proxy')
const sensible = require('fastify-sensible');
/*
For instance, imagine a nascent authentication approach which isn't
 yet supported in larger projects. We can use the preHandler 
 option supported by fastify-http-proxy to implement custom authentication logic.

Let's install fastify-sensible:
*/
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  // fastify.register(sensible)
  fastify.register(httpProxy,{
    upstream:'https://news.ycombinator.com/',
    async preHandler(req,reply){
      // if(req.query.token!=='abc'){
      //   throw fastify.httpErrors.unauthorized()
      // }
    }
  })
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
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'routes'),
  //   options: Object.assign({}, opts)
  // })
}

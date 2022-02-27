'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const httpProxy =  require('fastify-http-proxy')
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(httpProxy,{
    upstream:'https://jsonplaceholder.typicode.com/'
  }
  )
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

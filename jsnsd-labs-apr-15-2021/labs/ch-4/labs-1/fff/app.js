'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const POV = require('point-of-view')
const handlebars = require('handlebars')
module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  fastify.register(POV,
    {
      root : path.join(__dirname, 'views'),
      engine:{handlebars},
      layout:'layout.hbs'
    }
  )
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

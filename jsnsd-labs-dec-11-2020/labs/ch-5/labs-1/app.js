'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fastify = require('fastify')({logger:true})



async function start(){
  await fastify.listen(3005)
}
start()

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  // console.log('111')
  // console.log(process.env.QUESO)
  // console.log(process.env)
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
}

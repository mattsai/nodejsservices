'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

const POV =  require('point-of-view');
const handlebars = require('handlebars');


module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines
  fastify.register(POV,{
    engine:{handlebars},
    root: path.join(__dirname,'views'),
    layout:'layout.hbs'
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

  fastify.setNotFoundHandler((req,reply)=>{
    const inconmingMethod = req.method;
    if (inconmingMethod!=='GET') {
      return reply.code(405).send(Error('No hagas post pvta'));
    }
    reply.code(404).send(Error('Not foundndndnnd'))
  })
}

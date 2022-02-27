'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
// console.log('dev',dev,process.env.NODE_ENV)

const POV = require('point-of-view');
const handlebars = require('handlebars');

//nos desharemos de esto ya que usaremos point-of-view junto con handlebars de las manos parecen novios 
// const dev = process.env.NODE_ENV  !== 'production';
// const fastifyStatic  = dev && require('fastify-static');


module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(POV,{
    engine:{handlebars},
    root:path.join(__dirname,'views'),
    layout: 'layout.hbs'
  })

  // if(dev){ nos deshacemos de esto ya que usaremos point-of-view junto con handlebars
  //   fastify.register(fastifyStatic,{
  //     root:path.join(__dirname,'public'),
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

  fastify.setNotFoundHandler((req,res)=>{
    if(req.method !== 'GET'){
      //status también puede menajrse en fasify 
      // res.status(405) //lo vi por ahi se puede mejorar con un reply.code(405).send(Error('Method not allowed')))
      return 'Method not allowed\n'
    }
    
    res.status(404)// desde el futuro por el fsatify-sensible
    //puedes responder con return res.notFound(), esto manda el statusCode a 404
    //con el respectiov mensajde  not found, o igual pudes darle
    //fastify.httpErrors.createError(valor,'mensaje')
    return 'Not Found'
  })
}

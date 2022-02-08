'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const replyFrom = require('fastify-reply-from')
module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(replyFrom,{
    // base:'http://localhost:5000'
    base:'http://localhost:5001' //cree un fastify desde 0 solo importando fastify.get('/') y fasitfy.listen
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
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}

/*// crear un archivo nuevo de fesfity es sencillo, 
//npm init, npm i fastify,  y ya;
//require('fastify')({logger:true}) y ya 
//bsaicamente es el get y el listen y ya chiflo asu mauser
const fastify = require('fastify')({
    logger:true
});


fastify.get('/',(req,reply)=>{
    // console.log('query',req.query)
    reply.send('poposeado')
})
fastify.get('/queso',(req,reply)=>{
    const {url='undefined',path='undefined'} =  req.query;
    console.log('path',path)
    console.log('url',url)
    reply.send('poposeado')
})

fastify.listen(5001,()=>{
    console.log('fastify escuchando en el 5001')
})
*/
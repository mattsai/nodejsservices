'use strict'

module.exports = async function (fastify, opts) {

  fastify.get('/',
  // { 
  //   schema:{
  //     querystring:{
  //       type:'object',
  //       required:['name'],
  //       properties:{ 
  //         'name':{type:'string'}
  //       }
  //     }
  //   }
  // },
   async function (request, reply) {
    const {name}= request.query;
    console.log(name)
    if(!name){
      reply.badRequest();
      return
    }
    console.log('9');
    return reply.send(name.toString().toUpperCase());

  })
}

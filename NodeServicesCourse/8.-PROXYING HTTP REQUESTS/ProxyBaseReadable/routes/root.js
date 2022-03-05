'use strict'


const {Readable} = require('stream')

async function * upper (data){
  for await (const chunk of data) {
    yield chunk.toUpperCase();
  }
}
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const {url,path='algo'} =  request.query;
    console.log('url',url)
    const {httpErrors} = fastify;
    try {
      const aa = new URL(url)  //comentando porque en root le acivamos el base entonces ahora recibiremos un path o:
      //esto ahora es un path
      // console.log('aa',aa)
    } catch (error) {
      return httpErrors.badRequest();
    }
    //Ahora vamos hacer que las transforme en
    //uppercase todas estas uii
    // return reply.from(url,{
    //   onResponse: (request, reply, res) => {
    //     console.log(typeof res)
    //     // console.log(res)

    return reply.from(url,{
      onResponse: (request, reply, res) => {
        // reply.removeHeader('content-length');
        res.setEncoding('utf8');
        res.on('data',data=>{
          console.log('data',data)
          reply.send(data.toUpperCase());
        })
      }
    })

    //     //seria lo mismo, esta es mi solucion pedorra porque
    //     //re es un readable entonces pues como reply.send
    //     //permite mandar streams pus ya estuvoperro dsgraciado perrito
    //     //gua guau andale ladrale 
    //     res.setEncoding('utf8')
    //     res.on('data',data=>{
    //       reply.send(data.toUpperCase())
    //     })


    //     //lo de la practica, sera lo mismo que
    //     // const toUpper = upper(res)
    //     // console.log('toUpper',toUpper)
    //     // const myReadable = Readable.from(toUpper)
    //     // reply.send(myReadable);
    //   }
    // })
    // return reply.send('aaa')


    //aqui se activo el base y entoncs esta bien prque ahora
    //mi mono se encarga solo de redireccionar
    // return reply.from(path);
  })

  fastify.post('/', async function (request, reply) {
    // const {url} =  request.query;
    const au =  request.body;

    console.log('url',au)
    // console.log('url',au)
    return { root: true }
  })
}

'use strict';

module.exports = async function (fastify,opts){
    fastify.get('/',async (req,reply)=>{
        console.log('here')
        return reply.sendFile('hello.html')
    })
}
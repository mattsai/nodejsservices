'use strict';

module.exports = async function (fastify,opts){
    fastify.get('/',async (req,reply)=>{
        // const {greeting = 'Hello'} =  req.query;
        // return reply.view('hello.hbs',{greeting})
        // console.log('here') borramos esto porque ahora estamos sriviendo vistas dinamicas :D
        console.log('aaa')
        return reply.sendFile('hello.html')
    })
}
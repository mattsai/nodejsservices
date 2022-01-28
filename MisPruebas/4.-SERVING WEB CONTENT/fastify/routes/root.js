module.exports = async function (fastify, opts) {
    fastify.get('/', async (req,reply)=>{
        return reply.view('index.hbs')
    })
}

// 'use strict'

// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     // return { root: true }
//     reply.type('text/html');
//     return reply.sendFile('index.html')
//   })
// }

'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
  fastify.post('/', async function (request, reply) {
    reply.status(405)
    return reply
    .code(405)
    .send(Error('no le sabes no le muevas xfi'))
    // .send('Mamast papy')
  })
}
// module.exports = async function (fastify, opts) {
//   fastify.post('/', async function (request, reply) {
//     reply.status(405);
//     return 'No papi no'
//   })
// }

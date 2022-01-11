'use strict'

const root = `
<html>
  <head>
    <style>
      body {background:#ccc; margin:2rem}
      h1 {color:blue;font-family:sanf-serif}
      
    </style>
  </head>
  <body>
    <a href='/hello'>Yo mama hello <a/>
  </body>
</html>

`

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.type('text/html').code(200)
    // return { root: true }
    return root
  })
}

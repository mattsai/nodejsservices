'use strict'

const hello  = `
<html>
  <head>
    <style>
      body {margin:1.25rem; background:#ccc}
      h1 {color:yellow; fon-size:2rem; font-family:sant-serif}
    </style>
  </head>
  <body>
    <h1> Soy un robot hello</h1>
  </body>
<html>
`

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.type('text/html')
    return hello
  })
}

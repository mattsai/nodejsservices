const fas = require('fastify')
module.exports = async (fastify,opts) =>  {
    fastify.get('/',async (req,reply)=>{
        return reply.sendFile('hello.html')
    })
}
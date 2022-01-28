module.exports = async function(fastify,opts){
    fastify.get('/',async (req,reply)=>{
        reply.type('text/html')
        reply.code(200).sendFile('index.html')
    })
}
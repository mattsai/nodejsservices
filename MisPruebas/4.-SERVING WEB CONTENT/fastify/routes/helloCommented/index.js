module.exports = async function(fastify,opts){
    fastify.get('/',async (req,reply)=>{
        // reply.type('text/html');
        reply.sendFile('hello.html')
    })
}
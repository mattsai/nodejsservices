module.exports = async function(fastify,opts){
    fastify.get('/',(request,reply)=>{
        // reply.view()
        reply.send('Hola soy foo:D')
    })
}
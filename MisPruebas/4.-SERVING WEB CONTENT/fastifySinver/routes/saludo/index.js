module.exports = async function(fastify,opts){
    fastify.get('/',(request,reply)=>{
        const {saludo='Default'} = request.query;
        reply.view('saludo.hbs',{saludo})
        // reply.send('Hola soy foo:D')
    })
}
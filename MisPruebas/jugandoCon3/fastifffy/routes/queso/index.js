module.exports = async function(fastify,opts){
    fastify.get('/',async (request,reply)=>{
        const {quesito = 'No mames no hay nada'} = request.query; 
        console.log('a')
        // reply.sendFile('queso.html',{quesito:'no mames que asco'})
        return reply.view('queso.hbs',{quesito})
    })
}
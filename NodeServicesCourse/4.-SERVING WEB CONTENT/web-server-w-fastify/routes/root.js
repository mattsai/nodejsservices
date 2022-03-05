module.exports = async function(fastify,opts){
    fastify.get('/', async (req,reply)=>{
        // return reply.view('index.hbs')
        return reply.senfDIle('index.html')
    })
}
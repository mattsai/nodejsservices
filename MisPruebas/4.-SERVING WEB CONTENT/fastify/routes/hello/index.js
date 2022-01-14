module.exports = async function(fastify,opts){
    fastify.get('/',async (req,reply)=>{
        const {saludo = 'default'} =  req.query;
        return reply.view('hello.hbs',{saludo})
    })
}
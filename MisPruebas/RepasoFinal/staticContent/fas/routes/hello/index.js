
module.exports = async (fastify,opts) =>  {
    fastify.get('/',async (req,reply)=>{
        const {greet = 'ag'} =  req.query;
        return reply.view('hello.hbs',{greeting:greet})
    })
}
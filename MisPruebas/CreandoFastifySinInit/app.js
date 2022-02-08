const fastify = require('fastify')({
    logger:true
});


fastify.get('/',(req,reply)=>{
    // console.log('query',req.query)
    reply.send('poposeado')
})
fastify.get('/queso',(req,reply)=>{
    const {url='undefined',path='undefined'} =  req.query;
    console.log('path',path)
    console.log('url',url)
    reply.send('poposeado')
})

fastify.listen(5001,()=>{
    console.log('fastify escuchando en el 5001')
})
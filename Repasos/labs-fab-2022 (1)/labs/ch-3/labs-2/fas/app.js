const fastify = require('fastify')({logger:true})
fastify.get('/',(req,res)=>{
    res.status(200).send('fff')
})
fastify.post('/',(req,res)=>{
    res.status(405).send('pp')
})


fastify.listen(3000,()=>{
    console.log('listening on 3000')
})
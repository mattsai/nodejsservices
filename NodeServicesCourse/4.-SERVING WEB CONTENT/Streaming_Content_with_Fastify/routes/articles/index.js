const hnLS = require('hn-latest-stream')

module.exports = async function (fastify,opts) {
    fastify.get('/', async (req,reply)=>{
        const {type='json',amount=5} =  req.query;
        if(type==='json') reply.type('application/json')
        if(type==='html') reply.type('text/html')
        reply.send(hnLS(amount,type))
    })
    
}
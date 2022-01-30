// const {bicycle:{read}} =  require('../../model')
// module.exports = async function(fastify,options){
//     fastify.get('/:id',async (req,reply)=>{
//         const {id} = req.params;
//         read(id,(err,result)=>{
//             if(err){
//                 if(err.message === 'not found') reply.notFound();
//                 else reply.send(err)
//                 return
//             } 
//             reply.send(result)
//         })
//         await reply
//     })
// }



const {bicycle} =  require('../../model')
const {promisify} = require('util')
const read = promisify(bicycle.read);

module.exports = async function(fastify,options){
    fastify.get('/:id',async (req,res)=>{
        const {notFound} =  fastify.httpErrors;
        try {
            const {id} =  req.params;
            const data = await read(id);
            return data;
        } catch (error) {
            if(error.message==='not found') throw  notFound();
            // o un return notFound();
            else throw error;
            // o un return error;
        }
    })
}
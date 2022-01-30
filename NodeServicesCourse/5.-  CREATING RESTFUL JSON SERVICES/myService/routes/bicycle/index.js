const {bicycle} =  require('../../model')

//usando callback.api
// si se usa puro callbak no iria el async del 5 porque sino entregaria una romesa que se resuelve instantenamente
//entonces si va el async es necesario esperar la espuesata
//por eso e await reply de la 22 :D 
// module.exports =  async function(fastify,opts){
//     // /:algo
//     fastify.get('/:id',async (request,reply)=>{   
//         const {id=0} =request.params;
//         console.log('request params',request.params)

//         bicycle.read(id,(err,result)=>{
//             if(err){
//                 console.log('hay error,',err.message)
//                 if(err.message === 'not found') reply.notFound()
//                 else reply.send(err)
//             }else{
//                 reply.send(result)
//             }
//         });
//         await reply
//     })

//ahora vamos a promisificar las cosas
const {promisify} = require('util');
const read = promisify(bicycle.read);


module.exports =  async function(fastify,opts){
    // /:algo
    fastify.get('/:id',async (request,reply)=>{   
        const {id=0} =request.params;
        const {notFound} =  fastify.httpErrors;
        console.log('request proisificad params',request.params)
        try {
            // reply.type('text/htmlx') //anuque le ponga un objeto fastify es re vergas y dice no papi estas mandnado u n objeto
            //te lo cambiare a objeto para correigr uts pendejadas va? va
            // reply.header('Content-Type','text/html')
            const data = await read(id)
            console.log('data',data,data.brand)
            return data
        } catch (error) {
            if(error.message === 'not found'){
                // throw notFound(); //es lo mismo en thow notFound que un return notFound
                return notFound()
            }
            // throw error
            return error
        }
    })
}
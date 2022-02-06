'use strict'

const got = require('got')
const { BICYCLE_PORT = 4000 } = process.env;
const { BRAND_PORT =5000 } = process.env

const bicycleService = `http://localhost:${BICYCLE_PORT}`;
const brandService = `http://localhost:${BRAND_PORT}`;


module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} =  request.params;

    //Promise.all([ promesas ])
    const [bicycle,brand] =await  Promise.all([
      got(bicycleService+'/'+id).json(),got(brandService+'/'+id)
    ])



    //e fue a la vrga porque
    //In our specific case we could perform both requests concurrently by altering the routes/root.js file to the following:
    //aqui espera una  y luego va  aotra enroncesocuapreoms el Promise.all()para que se haga concurrent NOOO SEAS MMAOOON
    // const bicycle =  await got(`${bicycleService}/${id}`).json()
    // const brand = await got(brandService+'/'+id).json
    
    return {
      id:bicycle.id,
      color:bicycle.color,
      brand:brand.name
    }

    //cancelamos esto porque ahora estmaos combinando servicios wii
    // console.log('bicycle',bicycle)
    // return bicycle
  })
}

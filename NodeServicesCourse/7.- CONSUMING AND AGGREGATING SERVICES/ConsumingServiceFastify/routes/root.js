'use strict'

const got = require('got')
const {BICYCLE_SERVICE=4000} = process.env;
const {BRAND_SERVICE=5000} =  process.env;
const bicycleService  = `http://localhost:${BICYCLE_SERVICE}`;
const brandService  = `http://localhost:${BRAND_SERVICE}`;

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async function (request, reply) {
    const {id} =  request.params;
    const {httpErrors} = fastify;
    //se agregara ahora un try catch para progagar el error id=2
    try { 
      //Promise all ( [ ,])
      const [bicycle,brand] = await Promise.all([
        got(bicycleService+'/'+id).json(),
        got(brandService+'/'+id).json()
      ])
      // const [ bicycle, brand ] = await Promise.all([
      //   got(`${bicycleSrv}/${id}`).json(),
      //   got(`${brandSrv}/${id}`).json()
      // ])
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
    } catch (error) {
      if(!error.response) return   error
      console.log('errrr',error.response.statusCode)
      const statusCode  =error.response.statusCode;
      if(statusCode  === 404) return    httpErrors.notFound();
      if(statusCode  === 400) return httpErrors.badRequest();
      return   error
      // if(error.)
    }
    
    //cancelamos esto porque ahora estmaos combinando servicios wii
    // console.log('bicycle',bicycle)
    // return bicycle
  })
}
const {Router} = require('express')
const myRouter =Router();
const bicycleService = 'http://localhost:4000'
const brandService = 'http://localhost:5000'
const got =  require('got')
const {callbackify} = require('util')
const myGot = callbackify(got)
myRouter.get('/:id',(req,res,next)=>{
    const {id}=  req.params;
    console.log('id',id)
    myGot(bicycleService+'/'+id,(err,result)=>{
        const {body} =  result;
        console.log('err',err)
        
        console.log('result',body)
    })

    got(bicycleService+'/'+id)
    .then(({body:queso}) => {
        var queso = JSON.parse(queso);
        // const {body} = result;
        console.log('aaaaa',queso)
        console.log('aaaaa',typeof queso)
        got(brandService+'/'+id)
        .then(({body:brandQueso})=>{
            var brandQueso = JSON.parse(brandQueso);
            console.log('brand ',brandQueso)
            console.log('queso',queso)
            // res.send('Pitoo')
            response = {id:queso.id}
            console.log('qyesi',queso)
            console.log('qyesi', typeof queso)
            console.log('qyesi',queso)
            console.log('qyesi',queso.color)
            res.send({
                id:queso.id ,
                color:queso.color,
                name:brandQueso.name
                
            })
            // return
        })
    }).catch((err) => {
        console.log('an error',err)
    });
    // res.send('papuunoo')
    // res.type('text/html').status(203).send('hola cara de cola')
    // return
})

module.exports =    ;

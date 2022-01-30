module.exports = {
    bicycle: bicycleModel()
}

function bicycleModel(){
    const db = {
        1:{brand:'Chaparral', color:'green'},
        2:{brand:'No se', color:'red'}
    }

    function read(id,cb){
        if(!db.hasOwnProperty(id)){
            const error = Error('not found')
            return cb(error)
        }
        setImmediate(()=>cb(null,db[id]))
        // setImmediate(()=>cb(Error('Test para ver que pasa')))
    }
    //cuando llame a bicycle se tiene que pasar directo ya la funcion
    //bicycle(id,(err,result)=>{})
    //en cambio con {read}, es un objeto con llave read
    //para que se llame bicycle.read(id,(err,result)=>{})
    // return read
    return {read}
}
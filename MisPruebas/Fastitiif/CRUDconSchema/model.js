module.exports=  {
    bicycle:bicycleModel()
}
function bicycleModel(){
    const db ={
        1:{brand:'Chaparral', color:'red'},
        2:{brand:'Chucha',color:'green'},
        3:{brand:'bucanero',color:'elcoor'}
    }

    function uid(){
        const key = Object.keys(db).sort((a,b)=>a-b).map(Number).filter(n=>!isNaN(n)).pop()+1 + '';
        // console.log('key',key)
        // setImmediate(()=>key)
        return key
    }
    
    function read(id,cb){
        if(!db.hasOwnProperty(id)){
            const error = Error('not found');
            setImmediate(()=>cb(error));
            return
        }
        setImmediate(()=>cb(null,db[id]));
    }

    function create(id,data,cb){
        if(db.hasOwnProperty(id)){
            const error = Error('already exists');
            setImmediate(()=>cb(error))
            return
        }
        db[id] = data;
        console.log('id',id)
        setImmediate(()=>cb(null,id))
    }

    function del(id,cb){

        if(!db.hasOwnProperty(id)){
            const error = Error('not found')
            setImmediate(()=>cb(error))
            return
        }
        delete db[id]
        setImmediate(()=>cb())
    }

    function update(id,data,cb){
        console.log('id',id)
        console.log('db',db)

        if(!db.hasOwnProperty(id)){
            console.log('52 error')
            const error = Error('not found')
            setImmediate(()=>cb(error))
            return
        }
        db[id] =data;
        console.log('58 id')
        setImmediate(()=>cb())
        return
    }



    return {
        uid,
        read,
        create,
        del,
        update
    }
}
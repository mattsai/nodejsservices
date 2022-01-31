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
        // if(!)
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
        setImmediate(()=>cb(id))
    }

    function del(id,cb){
        if(!db.hasOwnPropert(id)){
            const error = Error('not found')
            setImmediate(()=>cb(error))
            return
        }
        delete db[id]
        setImmediate(()=>cb())
    }

    function update(id,data,cb){
        if(!db.hasOwnPropert(id)){
            const error = Error('not found')
            setImmediate(()=>cb(error))
            return
        }
        db[id] =data;
        setImmediate(()=>cb())
    }



    return {
        uid,
        read,
        create,
        del,
        update
    }
}
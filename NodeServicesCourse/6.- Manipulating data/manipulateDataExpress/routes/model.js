module.exports = {
    bicycle: bicycleModel()
}

function bicycleModel(){

    const db = {
        1:{brand:'ceviche',color:'azurile'},
        2:{brand:'mondongo',color:'mondongo'}
    }
    const notFound  = Error('not found');
    const alreadyExists = Error('already exists');
    
    function doesnExists(id,cb){
        if(!db.hasOwnProperty(id)){
            setImmediate(()=>cb(notFound))
            return true
        } 
    }

    function exists(id,cb){
        if(db.hasOwnProperty(id)){
            setImmediate(()=>cb(alreadyExists))
            return true
        } 
    }
    function read(id,cb){
        if(doesnExists(id,cb)) return
        setImmediate(()=>cb(null,db[id]))
    }

    // function create(id,data,cb){
    //     exists(id,cb)
    //     db[id] = data;
    //     setImmediate(()=>cb(null,id))
    // }
        
    

    function create (id, data, cb) {
        if(exists(id,cb)) return
        db[id] = data
        setImmediate(() => cb(null, id))
    }

    function update(id,data,cb){
        if(doesnExists(id,cb)) return
        db[id] = data;
        setImmediate(()=>cb())
    }

    function del(id,cb){
        if(doesnExists(id,cb)) return
        delete db[id]
        setImmediate(()=>cb())
    }

    function uid(){
        return Object.keys(db).sort((a,b)=>a-b).map(Number).pop()+ 1 +'';
    }
    


    return {
        read,
        create,
        update,
        del,
        uid
    }
}
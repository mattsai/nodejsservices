module.exports = {
    bicycle:bicycle()
}

function bicycle(){

    const db = {
        1:{name:'simon',brand:'la chucha'},
        2:{name:'simon2',brand:'la chucha2'},
        3:{name:'simon3',brand:'la chucha3'}
    }

    function read(id,cb){
        if(!db.hasOwnProperty(id)){
            const err  = Error('not found')
            // return cb(Error('not found'));
            // return 
            setImmediate(() => cb(err))
            return
        }
        setImmediate(()=>cb(null,db[id]))
        // setImmediate(()=>cb()) //test
    }

    return {read}
}


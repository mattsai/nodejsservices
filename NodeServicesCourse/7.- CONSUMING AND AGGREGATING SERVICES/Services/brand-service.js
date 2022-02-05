const http  = require('http');
const url  = require('url');
const port = process.env.PORT || 3000;
const brands = ['Gazelle', 'Batavus', 'Azor', 'Cortina', 'Giant','Sparta']
const MISSING = 3
const server= http.createServer((req,res)=>{
    const {pathname} =  url.parse(req.url);
    console.log('path brand ',pathname)

    var id = pathname.match(/^\/(\d+)$/)
    console.log('id',id)
    if(!id){
        res.statusCode = 400;
        return void res.end();
    }
    id = Number(id[1])
    if(id===MISSING){
        res.statusCode = 404;
        return void res.end();
    }
    res.setHeader('content-type','application/json')
    res.end(JSON.stringify({
        id:id,
        name:brands[id%brands.length]
    }))
})
server.listen(port,()=> console.log('Server listening on port: '+port))
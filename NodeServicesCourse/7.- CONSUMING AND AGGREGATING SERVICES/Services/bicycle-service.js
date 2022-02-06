'use strict'

const http = require('http');
const port = process.env.PORT || 4000;
// console.log(process.env)
const url = require('url')
const colors = ['Yellow', 'Red', 'Orange', 'Green', 'Blue', 'Indigo']
const MISSING = 2


const server = http.createServer((req,res)=>{
    const {pathname}  = url.parse(req.url);
    console.log('path bicycle',pathname)
    let id  = pathname.match(/^\/(\d+)$/)
    console.log('id',id)

    if(!id){
        res.statusCode = 400;
        return void res.end();
    }
    id = Number(id[1])
    if (id===MISSING){
        res.statusCode = 404;
        return void res.end()
    }
    res.setHeader('content-type','application/json');
    const data  =JSON.stringify(
        {id:id,color:colors[id%colors.length]}
    )
    console.log('data',data)
    res.end(data)
})
server.listen(port,()=>{console.log('Server listening on port'+port)})
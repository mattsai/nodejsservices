const http = require('http');
const { Readable } = require('stream');
const url  = require('url')
http.createServer(async (req,res)=>{
    res.setHeader('content-type','text/plain');
    // const a =  Readable.from(res)
    
    console.log('jaiba',req.url)
    console.log('jaibaurl',req.url)
    console.log('jaibaquery',req.query)
    res.end('biba papalopaudulus')
}).listen(5000,()=>console.log('Running on 5000'))
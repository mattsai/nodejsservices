
const http = require('http');

const myServer = http.createServer((req,res)=>{
    console.log(req.url)
    if(req.url === '/'   ){
        // res.write('holaa')
        // res.setHeader('')

        // res.setHeader('Accept', 'application')
        // res.write('hola') //en vez de este puede ser el end y se le envia la info o:
        res.end('hoalalla')
    }else{
        res.statusCode =404;
        res.write('Nel')
        res.end()
    }

    console.log('running')
})

myServer.listen(3000,()=>{
    console.log('Escuchando en puerto 3000')
})
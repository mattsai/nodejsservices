const http  = require('http')

const port = process.env.PORT || 3000;
const url = require('url')
const hello = `
<htlm>
    <head>
        <style>
            body {background:#eee; margin:1.25rem};
            h1 {color:blue; font-family:Helvetica,sans-serif;}
        </style>
    </head>
    <body>
        <h1 > Hola mundo xd</h1>
    </body>
</htlm>
`


const root = `
<htlm>
    <head>
        <style>
            body {background:#eee; margin:1.25rem};
            h1 {color:blue; font-family:Helvetica,sans-serif;}
        </style>
    </head>
    <body>
        <a href='/hello'> root</a>
    </body>
</htlm>
`
const querystring = require('querystring');
http.createServer((req,res)=>{
    res.setHeader('Content-Type','text/html')
    const {path,pathname} = url.parse(req.url); //deprecated
    const route2 = req.url;
    // let nuevaUrl  = new URL(`http://localhost:3000${req.url}`)
    let nuevaUrl  = url.parse(req.url).query
    console.log('route 2',route2)
    console.log('req url',req.url)
    console.log('nuevaUrl',querystring.parse(nuevaUrl))
    // console.log('route 2',req.)
    // console.log(`x1x2x3 ${path} ${pathname} r2 ${route2}`);

    const method = req.method;
    console.log('method',method)
    if(method != 'GET'){
        res.statusCode = 405;
        res.end(http.STATUS_CODES[res.statusCode]+'\r\n')
        return
    }
    if(route2 === '/'){
        // res.setHeader('Content-Type','text/html')
        res.end(root)
        return
    }
    if(route2 === '/hello'){
        res.end(hello);
        return
    }

    res.statusCode = 404;
    res.end('Error')


}).listen(3000,()=>{
    console.log(`Listening on port ${port}`)
})
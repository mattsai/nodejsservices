'use strict';
const {Router} =  require('express')
const myRouter = Router();
const hello = `
    <html>
        <head>
            <style>
                body {margin:1.25rem; background #444}
                h1 {color:blue;font-family:sans-serif}
            </style>
        </head>

        <body>
            <h1> yea yea yea </h1>
        </body>
    </html>
`

myRouter.get('/',(req,res)=>{
    //la ruta que le llega es / , qué pedo entonces solo manejara 1 ruta? mmMMM
    res.send(hello)
})


module.exports  = myRouter;
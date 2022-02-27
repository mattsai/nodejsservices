const app = require('express')();
const createError = require('http-errors')
app.use((req,res,next)=>{
    const ip  = res.socket.remoteAddress;//or req.ip :D
    if(ip ==='111.34.55.211'){
        next(createError(403))
        return
    }
    next()
})

app.get('/',(req,res)=>{
    console.log('hey guys watchu do')
    res.send('youllbegoodbro')
})

app.use((req,res,next)=>{
    console.log(req.socket.remoteAddress)
    res.send('blauu')
})

app.listen(3000,()=>console.log('sassy bad guy'))
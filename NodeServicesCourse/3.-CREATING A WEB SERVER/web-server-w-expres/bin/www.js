#!/usr/bin/env node
const app = require('../app');
const http  = require('http')
const PORT = process.env.PORT || 3000;

//importing router module
// app.use((req,res,next)=>{

// })
// app.use('/hello',router)
const server = http.createServer(app)
server.listen(PORT)
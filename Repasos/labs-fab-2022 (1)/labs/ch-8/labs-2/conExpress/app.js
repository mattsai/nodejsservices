var proxy = require('express-http-proxy');
var app = require('express')();

app.get('/', proxy('www.google.com'));




app.listen(3000,()=>{
    console.log('ready 2 go')
})
const http = require('http')
const post = {method:'post',headers:{'content-type':'application/json'}}
const update = {method:'update',headers:{'content-type':'application/json'}}
const del = {method:'delete',headers:{'content-type':'application/json'}}
const dataPost = JSON.stringify({
    data:{model:'Modelo',color:'color'}
})

const host = 'http://localhost:3000'
const r = (res) =>{
    res.setEncoding('utf8');
    console.log(res.statusCode,res.headers['content-type']);
    res.on('data',console.log);
}

http.request(host+'/1',r).end()
// http.request(host+'/2',r).end()
// http.request(host+'/3',r).end()
// http.request(host+'/4',r).end()
// console.log('2222')
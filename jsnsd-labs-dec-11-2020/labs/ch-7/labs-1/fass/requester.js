const http = require('http');

//boat : 4000 id,brand,color
//boat.brand ->  brand :5000/boat.brand
//brand: 5000 , id,name
const headers= {headers:{'content-type':'application/json'}}
const opost = {method:'post',headers}
const dpost = {data:{model:'Modelo'}}
const r = res =>{
    res.setEncoding('utf8')
    console.log(res.statusCode,res.headers['content-type']);
    res.on('data',console.log);
}

const host = 'http://localhost:3000'
http.request(host+'/1',r).end()

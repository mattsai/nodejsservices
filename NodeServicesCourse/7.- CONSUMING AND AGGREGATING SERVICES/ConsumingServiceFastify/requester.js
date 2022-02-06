const http = require('http');
const host = 'http://localhost:3000'
const headers = {headers:{'content-type':'application/json'}}
const optionsPost = {method:'post',headers}
const dataPost = {data:{model:'Test post'}}

const response = res =>{
    console.log('------')
    res.setEncoding('utf8')
    console.log(res.statusCode,res.headers['content-type'])
    console.log('data:')
    res.on('data',console.log)
}

http.request(host+'/1',response).end()
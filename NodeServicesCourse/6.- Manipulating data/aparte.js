
const http = require('http');
const route = 'http://127.0.0.1:3000/bicycles'
const data =  JSON.stringify({data:{model:'tujefe'}})
const response = (res)=>{
  console.log('---------')
  res.setEncoding('utf8')
  console.log('headers;',res.headers ,'statuscode: ',res.statusCode)
  res.on('data',console.log)
} 

const options = {method:'post',headers:{'content-type':'application/json'}}
http.request(route+'/xxx', response).end()
http.request(route+'/2',response).end()
// http.request(route,options,response).end(data)
// ).end()
// console.log(aa)
// http.request(route+'/x',res=>res.pipe(process.stdout)).end()
// http.request(route+'/999',res=>res.pipe(process.stdout)).end()
// http.request(route+'/xxx',res=>res.pipe(process.stdout)).end()
// console.log('\n')

// get
// node -e ""

// post
// node -e "http.request('http://localhost:3000/bicycles',{method:'post',headers:{'content-type':'application/json'}},res=>{console.log(res.statusCode,res.headers); res.pipe(process.stdout)}).end(JSON.stringify({data:{model:'joto'}}))"



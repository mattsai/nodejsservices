const http =  require('http');
const port = 3000 
const host = 'http://localhost:'+port+'/bicycle'
const r= (response)=>{
    response.setEncoding('utf8');
    console.log('Headers: ',response.headers['content-type'], 'status: ',response.statusCode);
    response.on('data',console.log)
}


http.request(host+'/1',r).end()

// http.request(host+'/test/3?queso=requerido',r).end() //correcto
// http.request(host+'/test/3x?queso=requerido',r).end() //{"statusCode":400,"error":"Bad Request","message":"params.queso should be number"}


// http.request(host+'/test/?a=papitas&queso=badon',r).end()



//post
const bodyPost = JSON.stringify({data:{color:'axD',brand:'tumama',churrasco:'churrasquillo'}})
const bodyUpdate= JSON.stringify({data:{color:'modelU',brand:'brandU',churrasco:'churrasquillo'}})
const headersPost = {method:'post',headers:{'content-type':'application/json'}}
// http.request(host,headersPost,r).end(bodyPost)
// http.request(host,headersPost,r).end(bodyUpdate)
// setTimeout(() => {
//     http.request(host+'/4',r).end()
//     http.request(host+'/5',r).end()
// }, 1000);


//update
const headersUpdate= {method:'put',headers:{'content-type':'application/json'}}

// http.request(host+'/xd',headersUpdate,r).end(bodyUpdate)
// setTimeout(() => {
//     http.request(host+'/xd',r).end()
// }, 1000);


const headersDelete = {method:'delete',headers:{'content-type':'application/json'}}
// http.request(host+'/1',headersDelete,r).end()
// setTimeout(() => {
//     // http.request(host+'/xxx',headersDelete,r).end()
//     http.request(host+'/1',r).end()
// }, 1000);


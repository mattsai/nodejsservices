const fastify = require('fastify')({
    logger:true
});

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`
fastify.get('/',(req,reply)=>{
    // console.log('query',req.query)
    // reply.send('poposeado')
    reply.type('text/html')
    reply.send(root)
})
fastify.get('/queso',(req,reply)=>{
    const {url='undefined',path='undefined'} =  req.query;
    console.log('path',path)
    console.log('url',url)
    reply.send('poposeado')
})

fastify.listen(5001,()=>{
    console.log('fastify escuchando en el 5001')
})
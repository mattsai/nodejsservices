const app = require('express')();
const myRouter = require('./routes/routes')
// app.get('/',(req,res)=>{
//     res.end('bbybye')
// })
// app.}

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

// app.use('/',myRouter.salute)
app.get('/',(req,res,next)=>{
    res.send(root)
})

app.listen(3000, () =>console.log('lstening on port 3000'))
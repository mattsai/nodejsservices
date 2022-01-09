const app = require('express')();
const myRouter = require('./routes/routes')
// app.get('/',(req,res)=>{
//     res.end('bbybye')
// })
// app.}
app.use('/',myRouter.salute)

app.listen(3000, () =>console.log('lstening on port 3000'))
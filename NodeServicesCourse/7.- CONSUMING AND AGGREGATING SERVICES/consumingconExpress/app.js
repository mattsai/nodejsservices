const app = require('express')();
const PORT = process.env.PORT || 3001;
const indexRoute  = require('./routes/index')


app.use('/',indexRoute)


app.listen(PORT,()=>{
    console.log('Ready to go ')
})
const express  = require('express');
const app  = express();
const path  = require('path')
const index = `
<html>
    <head>
        <style>
            h1{
                color:red;
            }
        </style>
        
    </head>
    <body>
        <h1>Que pedo loco</h1>
    </body>
</html>
`

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// if (process.env.NODE_ENV !== 'production') {
//     app.use(express.static(path.join(__dirname, 'public')));
// }

//estatico
// app.get('/',(req,res)=>{
//     res.sendFile('index.html')
// })

//vista
app.get('/',(req,res)=>{
    res.render('index.hbs')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log('simon'));
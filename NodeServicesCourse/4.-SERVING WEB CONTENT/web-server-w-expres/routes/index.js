const {Router} = require('express');
const router = Router();
const root= `
    <html>
        <head>
            <style>
                body {background:#333; margin 1.25rem}
                a {color :white;font-size:2rem;font-family:Sans-Serif} 
            </style>
        </head>
        <body>
            <a href='/hello'>Send to hello</a>
        </body>
    </html>
`;

router.get('/',(req,res)=>{
    res.send(root);
})

module.exports  = router;
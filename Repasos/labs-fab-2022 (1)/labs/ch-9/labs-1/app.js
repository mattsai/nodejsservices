'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env

const sanitize = function(un){
  var result = undefined;
  console.log('un',un)
  if(!un) return ''
  if(Array.isArray(un)){
    result = un.map(word => {
      return word.toString().toUpperCase()
    })
    return result;
  }
  return un.toString().toUpperCase();

}

router.get('/', (req, res) => {
  setTimeout(() => {
    const {un} =  req.query;
    res.type('text/html')
    return res.send(sanitize(un) )
    // res.send()
  }, 1000)
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})
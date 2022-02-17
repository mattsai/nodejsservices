'use strict'
const express = require('express')
const app = express()
const router = express.Router()
const { PORT = 3000 } = process.env



function validatingQueryString(unValue){
  if(Array.isArray(unValue)){
    return unValue.map(v => v.toUpperCase())
  }else{
    console.log('un',unValue,Number.isSafeInteger(unValue))
    if(Number.isSafeInteger(Number(unValue))){
      return unValue
    }else{
      return (unValue || '').toUpperCase() 
    }
  }

}

router.get('/', (req, res) => {
  // console.log('entró',)
  setTimeout(() => {
    res.send(validatingQueryString(req.query.un))
    // res.send((req.query.un || '').toUpperCase())
  }, 1000)
})

app.use('/',router)

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})
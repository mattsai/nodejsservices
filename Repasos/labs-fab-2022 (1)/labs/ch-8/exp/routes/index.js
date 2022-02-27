var express = require('express');
var router = express.Router();
const http =  require('http')
const https =  require('https')
const createError  =require('http-errors')

/* GET home page. */
router.get('/', function(req, res, next) {
  const {url} = req.query;
  console.log('url',url)
  try {
    new URL(url)
    http.request(url,response=>{
      var statusCode = response.statusCode;
      console.log('status',statusCode)
      if(statusCode!= 200){
        if(statusCode===404) {
          next(createError(404))
          return
        }
        if(statusCode===400) {
          next(createError(400))
          return
        }
      }
      response.pipe(res)
    }).end()
    // https.request(url,response=>{
    //   console.log('a')
    //   response.pipe(res)
    // }).end()

    return
  } catch (error) {
    console.log('ax',error.message)
    console.log('ax',error.response.statusCode)
    next(error)
  }
}); 

module.exports = router;

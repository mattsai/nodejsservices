var express = require('express');
var router = express.Router();
const createError = require('http-errors')
const http = require('http');
// const { promisify } = require('util');
// const requestA = promisify(http.get)
// require('reque')

/* GET home page. */
router.get('/', async function(req, res, next) {

  const {url} = req.query;
  console.log('url',url)
  // console.log('req',req.ip)
  // console.log('req',req.socket.remoteAddress)
  try {
    new URL(url)  
    // console.log('aa')
    http.request(url,response=>{
      // console.log('responseee',response)
      response.pipe(res)
    }).end()
  } catch (error) {
    next(createError(400))
  }
  
  // res.reply('aaa')
  // res.render('index', { title: 'Express' });

});

module.exports = router;

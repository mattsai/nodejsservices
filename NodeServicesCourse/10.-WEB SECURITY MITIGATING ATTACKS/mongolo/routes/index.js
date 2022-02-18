var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('a',req.is('application/json'))
  console.log('a',req.headers['content-type'])
  res.send('quesitoconpapas')
  // res.render('index', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  console.log('a',req.is('json'))
  console.log('a',req.is('application/json'))
  
  // => 'json'
  
  // => 'application/json'
  if(req.is('json')){
    console.log('1',req.is('json'))

  }
  if(req.is('application/json')){
  console.log('2',req.is('application/json'))

  }
  if(req.is('application/*')){
  console.log('3',req.is('application/*'))

  }
  

  console.log('sisi o no1111',req.is('application/json'))

  // console.log('a',req.is('json'))
  console.log('a',req.headers['content-type'])
  res.send('quesitoconpapas')
  // res.render('index', { title: 'Express' });
});

module.exports = router;

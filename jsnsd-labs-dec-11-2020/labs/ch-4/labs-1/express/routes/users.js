var express = require('express');
var router = express.Router();

/* GET boat listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  // res.render('index.hbs')
  res.render('index.hbs');
});

module.exports = router;

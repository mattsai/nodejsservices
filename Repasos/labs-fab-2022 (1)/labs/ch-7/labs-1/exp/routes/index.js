var express = require('express');
var router = express.Router();
const got = require('got')
const {callbackify} = require('util')
const myGot = callbackify(got)
const createError = require('http-errors')
const {
    BOAT_SERVICE_PORT = 4000,
    BRAND_SERVICE_PORT = 5000
} = process.env;

const boatHost = `http://localhost:${BOAT_SERVICE_PORT}/`
const brandHost = `http://localhost:${BRAND_SERVICE_PORT}/`
/* GET home page. */

router.get('/:id', function (req, res, next) {
    const {id} = req.params;
    got(boatHost + id,{timeout:1250,
      retry: 0}).then(({body}) => {
        body = JSON.parse(body)
        return body
    }).then(bodyB => {
        got(brandHost + bodyB.brand).then(({body}) => {
            body = JSON.parse(body)
            res.send({id: bodyB.id, color: bodyB.color, brand: body.name})
            return
        })
    }).catch(error => {
        if(!error.response){
          next(error)
          return
        }
        var statusCode = error.response.statusCode;
        if(statusCode === 404){
          error.status = 404
          next(error)
          return
        }
        if(statusCode === 400){
          error.status = 400
          next(error)
          return
        }
        next(error)
        return
        
    })


    // res.send('aa')
    // return
});

module.exports = router;

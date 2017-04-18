var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();   

// ROUTES FOR OUR API
// route middleware to verify a token 
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;	
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(401).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

module.exports = router;




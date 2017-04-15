var express = require('express');

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api
router.get('/', function(req, res) {
    res.send( {message: 'THE REST API'}  );
});

module.exports = router;
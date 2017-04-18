var express = require('express');
var User     = require('../app/models/user');
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/users
router.route('/doctor')

	
	 // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find( {user_type: "Doctor"}, {password: false} ,function(err, doctors) {
            if (err)
                res.send(err);

			
			
            res.json(doctors);
        });
    });

module.exports = router;
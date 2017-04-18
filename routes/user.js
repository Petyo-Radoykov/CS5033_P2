var express = require('express');
var User     = require('../app/models/user');
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/users
router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/users/)
    .post(function(req, res) {
        
		// create a new instance of the User model
        var user = new User();   

		// set the users attributes (sent from the request)	
        user.name = req.body.name;  
        user.password = req.body.password;  
        user.user_type = req.body.user_type;  

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    })
	
	 // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
	
	
router.route('/users/:name/:passwors/:type')
	// create a user (accessed at POST http://localhost:8080/api/users/:name/:password/:user_type)
    .post(function(req, res) {
        
		// create a new instance of the User model
        var user = new User();   

		// set the users attributes (sent from the request)	
        user.name = req.params.name;  
        user.password = req.params.password;  
        user.user_type = req.params.user_type;  

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    });	


module.exports = router;
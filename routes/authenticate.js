var express = require('express');
var User     = require('../app/models/user');



// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/authenticate')

    .post(function(req, res) {
        // find the user
		  User.findOne({
			name: req.body.name
		  }, function(err, user) {

			if (err) throw err;

			if (!user) {
			  res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {

			  // check if password matches
			  if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			  } else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, config.secret, {
				  //expiresInMinutes: 1440 // expires in 24 hours
				});

				
				// return the information including token as JSON
				res.json({
				  success: true,
				  message: 'Enjoy your token!',
				  user_type: user.user_type,
				  user_id: user._id,
				  token: token
				});
			  }   

			}

		  });   
    })
	
module.exports = router;	
	
	
	
	
	
	
	
	
	

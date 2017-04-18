var express = require('express');
var D_Avl     = require('../app/models/doctor_availability');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             

// viewed at http://localhost:8080/api/availibility
router.route('/availibility')

	// get all the availibility (accessed at GET http://localhost:8080/api/availibility)
    .get(function(req, res) {
        D_Avl.find(function(err, availibility) {
            if (err)
                res.send(err);

            res.json(availibility);
        });
    });
	


module.exports = router;

          

// 09:00 -> 1492333200
// 10:00 -> 1492336800
// 11:00 -> 1492340400
// 12:00 -> 1492344000
// 13:00 -> 1492347600
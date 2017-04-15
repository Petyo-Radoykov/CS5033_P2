var express = require('express');
var Booking     = require('../app/models/booking');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/booking/:patient_id/:date
router.route('/booking/:patient_id/:date')

    // GET the booking for user with that id for the specified date (accessed at GET http://localhost:8080/api/booking/:patient_id/:date)
    .get(function(req, res) {
        Booking.find( {patient_id: req.params.patient_id, date: req.params.date}, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
        });
    });
	
	
router.route('/booking/:patient_id/:start_date/:end_date')	
	// GET the booking for user with that id for the specified date (accessed at GET http://localhost:8080/api/booking/:patient_id/:start_date/:end_date)
    .get(function(req, res) {
        Booking.find(  {
							patient_id: req.params.patient_id,
							date: { 
								$gt: req.params.start_date, 
								$lt: req.params.end_date 
								}
						}, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
        });
    })
	
module.exports = router;
var express = require('express');
var Booking     = require('../app/models/booking');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/booking
router.route('/booking')

    // CREATE a booking (accessed at POST http://localhost:8080/api/booking)
    .post(function(req, res) {
        
		// create a new instance of the Booking model
        var booking = new Booking();   

		// set the users attributes (sent from the request)	
        booking.patient_id = req.body.patient_id;  
        booking.doctor_id = req.body.doctor_id;  
        booking.date = req.body.date; 
        booking.comment = req.body.comment; 
		

        // save the booking and check for errors
        booking.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Booking created!' });
        });
        
    })
	
	// GET all the bookings (accessed at GET http://localhost:8080/api/booking)
    .get(function(req, res) {
        Booking.find(function(err, bookings) {
            if (err)
                res.send(err);

            res.json(bookings);
        });
    })
	
	// DELETE all bookings (accessed at DELETE http://localhost:8080/api/booking)
    .delete(function(req, res) {
        Booking.remove({}, function(err, booking) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;
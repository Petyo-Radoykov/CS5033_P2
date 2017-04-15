var express = require('express');
var Booking     = require('../app/models/booking');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/booking/:booking_id
router.route('/booking/:booking_id')

    // GET the booking with that id (accessed at GET http://localhost:8080/api/booking/:booking_id)
    .get(function(req, res) {
        Booking.findById(req.params.booking_id, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
        });
    })
	
	// UPDATE the booking with this id (accessed at PUT http://localhost:8080/api/booking/:booking_id)
    .put(function(req, res) {

        // use our booking model to find the booking we want
        Booking.findById(req.params.booking_id, function(err, booking) {

            if (err)
                res.send(err);

			// update the users info (sent from the request)
            booking.patient_id = req.body.patient_id;  
			booking.doctor_id = req.body.doctor_id;  
			booking.date = req.body.date; 
			booking.comment = req.body.comment;  

            // save the booking
            booking.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Booking updated!' });
            });

        });
    })
	
	// DELETE the booking with this id (accessed at DELETE http://localhost:8080/api/booking/:booking_id)
    .delete(function(req, res) {
        Booking.remove({
            _id: req.params.booking_id
        }, function(err, booking) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;
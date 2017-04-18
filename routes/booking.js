var express = require('express');
var Booking     = require('../app/models/booking');
var D_Availability     = require('../app/models/doctor_availability');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/booking
router.route('/booking')

    // CREATE a booking (accessed at POST http://localhost:8080/api/booking)
    .post(function(req, res) {
		
		if(req.decoded._doc.user_type != "Patient") {

			return res.status(403).send({ 
				success: false, 
				message: 'The user is a ' + req.decoded._doc.user_type + ". Needs to be a Patient."
			});	
		
		}
        
		// create a new instance of the Booking model
        var booking = new Booking();  

		// create a new instance of the D_Availability model
        var availibility = new D_Availability();  	

		// set the booking attributes (sent from the request)
		//console.log(req.decoded._doc._id)
		
        booking.patient_id = req.decoded._doc._id;  
        booking.doctor_id = req.body.doctor_id;  
        booking.date = req.body.date; 
        booking.comment = req.body.comment; 

        // save the booking and check for errors
        booking.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Booking created!' });
        });
		
		
		var date = new Date(booking.date*1000);
		// Hours part from the timestamp
		var hours = date.getHours();
		
		//console.log(date)
		//console.log(hours)
		
		
		var currentDate = new Date(booking.date*1000);
		currentDate.setHours(00)
		
		var nextDay = new Date(currentDate);
		nextDay.setDate(nextDay.getDate() + 1);
		
		var unixCurrentDay = currentDate.getTime() / 1000
		var unixNextDay = nextDay.getTime() / 1000
		
		console.log(unixCurrentDay)
		console.log(unixNextDay)
		
		
		
		/*if( hours >= 9 &&  hours < 10) {
			availibility.slot_9_10 = true; 
		} else if (hours >= 10 &&  hours < 11) {
			availibility.slot_10_11 = true;
		} else if (hours >= 11 &&  hours < 12) {
			availibility.slot_11_12 = true;
		} else if (hours >= 12 &&  hours < 13) {
			availibility.slot_12_1 = true;
		} else if (hours >= 13 &&  hours < 14) {
			availibility.slot_1_2 = true;
		} else if (hours >= 14 &&  hours < 15) {
			availibility.slot_2_3 = true;
		} else if (hours >= 15 &&  hours < 16) {
			availibility.slot_3_4 = true;
		} else if (hours >= 16 &&  hours < 17) {
			availibility.slot_4_5 = true;
		}*/
		
		/*var id = D_Availability.find(  {
							doctor_id: booking.doctor_id,
							date: { 
								$gt: unixCurrentDay, 
								$lt: unixNextDay 
								  }
		});
		
		console.log(id.schema.obj.doctor_id)*/
		
		/*
			doctor_id: String,
			slots_taken: Array,
			date: Number
		*/
		/*var id;
		
		D_Availability.find( {
							doctor_id: booking.doctor_id,
							date: { 
								$gt: unixCurrentDay, 
								$lt: unixNextDay 
		}}, 
						function(err, p) {
							  //console.log(p[0]._id)
							  id = p[0]._id;
							});
							
		console.log(id)		*/			
		
		
		
		availibility.slot_taken = hours;
		
		// set the availibility attributes (sent from the request)	
        availibility.booking_id = booking._id; 
		availibility.doctor_id = booking.doctor_id; 		
        availibility.date = booking.date; 
		
		
		// save the availibility and check for errors
        availibility.save(function(err) {
            if (err)
                res.send(err);
        });
        
    })
	
	// GET all the bookings (accessed at GET http://localhost:8080/api/booking)
    /*.get(function(req, res) {
        Booking.find(function(err, bookings) {
            if (err)
                res.send(err);

            res.json(bookings);
        });
    })*/
	
	
	// GET booking in time range (accessed at GET http://localhost:8080/api/booking)
    .get(function(req, res) {	
        Booking.find(  {
							patient_id: req.decoded._doc._id,
							date: { 
								$gt: req.headers['start_date'], 
								$lt: req.headers['end_date'] 
								}
						}, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
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






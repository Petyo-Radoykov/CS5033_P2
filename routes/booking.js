var express = require('express');
var Booking     = require('../app/models/booking');
var User     = require('../app/models/user');
var D_Availability     = require('../app/models/doctor_availability');

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
 	

		// set the booking attributes (sent from the request)
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
		
		console.log(date)
		console.log(hours)
		
		
		var currentDate = new Date(booking.date*1000);
		currentDate.setHours(00)
		
		var nextDay = new Date(currentDate);
		nextDay.setDate(nextDay.getDate() + 1);
		
		var unixCurrentDay = currentDate.getTime() / 1000
		var unixNextDay = nextDay.getTime() / 1000
        
    })
	
	
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
	
	
router.route('/booking/availability')

    .get(function(req, res) {	
        Booking.find(  {
							date: { 
								$gt: req.headers['start_date'], 
								$lt: req.headers['end_date'] 
								}
						},  
						{
							patient_id: false,
							_id: false,
							__v: false,
							comment: false,
							date: false,
						}, 
						function(err, booked_doctor_ids) {
							if (err)
								res.send(err);
							///////////////////////////////////////////////
							var b_doctor_ids = []
							
							for (var i = 0; i < booked_doctor_ids.length; i++) {
								b_doctor_ids[i] = booked_doctor_ids[i].doctor_id;
							}
							
							User.find(	{
										_id:{$nin:b_doctor_ids},
										user_type : "Doctor"
										},   
										{
											user_type: false,
											password: false,
											__v: false,
										},
										function(err, users) {
											if (err)
											res.send(err);
										
											res.json(users);
										
										});
							
							///////////////////////////////////////////////						
							
        });
    })

router.route('/booking/all')
	// GET booking in time range (accessed at GET http://localhost:8080/api/booking)
    .get(function(req, res) {	
        Booking.find({}, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
        });
    })	


	
	
module.exports = router;









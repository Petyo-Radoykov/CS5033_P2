var express = require('express');
var Record     = require('../app/models/record');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/record
router.route('/record')

    // create a record (accessed at POST http://localhost:8080/api/record/)
    .post(function(req, res) {
		
		
		
		if(req.decoded._doc.user_type != "Doctor") {

			return res.status(403).send({ 
				success: false, 
				message: 'The user is a ' + req.decoded._doc.user_type + ". Needs to be a Doctor."
			});	
		
		}
        
		// create a new instance of the Record model
        var record = new Record();   

		// set the users attributes (sent from the request)	
		// check header or url parameters or post parameters for token
        //record.doctor_id = req.body.doctor_id || req.query.doctor_id || req.headers['doctor_id'];
       
	    record.doctor_id = req.decoded._doc._id;

		
        record.patient_id = req.body.patient_id || req.query.patient_id || req.headers['patient_id'];
        record.record_date  = req.body.record_date || req.query.record_date || req.headers['record_date']; 
        record.record_content = req.body.record_content || req.query.record_content || req.headers['record_content'];  
        record.doctors_content = req.body.doctors_content || req.query.doctors_content || req.headers['doctors_content'];  
         

        // save the record and check for errors
        record.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Record created!' });
        });
        
    })
	
	 // GET the record for user id and date (accessed at GET http://localhost:8080/api/record)
    .get(function(req, res) {
		
		var patient_id = req.body.patient_id || req.query.patient_id || req.headers['patient_id'];
		
        Record.find({
						"patient_id": patient_id, 
						record_date: { 
								$gt: req.headers['start_date'], 
								$lt: req.headers['end_date'] 
								}
					}, function(err, record) {
            if (err)
                 res.send(err);
			 	
			_id = record[0]._id
			doctors_content = record[0].doctors_content
			record_content = record[0].record_content
			record_date = record[0].record_date
			patient_id = record[0].patient_id
			doctor_id = record[0].doctor_id
	

			if (req.decoded._doc.user_type == "Nurse") {
				nurseRecord = "{_id: " + _id + ", record_content: '"+ record_content + "', record_date: " + record_date + " , patient_id: '" + patient_id + "' , doctor_id: " + doctor_id + "}"
				res.json(nurseRecord);	
			}	else if (req.decoded._doc.user_type == "Doctor") {
				res.json(record);
			}

        });
    })
	
	// UPDATE the record with this id (accessed at PUT http://localhost:8080/api/records)
    .put(function(req, res) {
		
		var _id = req.body._id || req.query._id || req.headers['_id'];

        // use our record model to find the record we want
        Record.findById(_id, function(err, record) {
		
            if (err)
                res.send(err);

			// update the record's info (sent from the request)
			if(req.body.record_date != undefined) {
				record.record_date = req.body.record_date;
				//console.log(record.record_date)
			}
			
			if(req.body.doctors_content != undefined) {
				record.doctors_content = req.body.doctors_content;
				//console.log(record.doctors_content)	
			}
			
			if(req.body.record_content != undefined) {
				record.record_content = req.body.record_content;
				//console.log(record.record_content)	
			}
              

            // save the record
            record.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Record updated!' });
            });

        });
    })
	
	// DELETE the record with this id (accessed at DELETE http://localhost:8080/api/record)
    .delete(function(req, res) {
		
		var _id = req.body._id || req.query._id || req.headers['_id'] || req.params._id;
		//console.log(_id)
		
        Record.remove({
            _id: _id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;


/*
    doctor_id: String, 
    patient_id: String, 
    date: Number,
	record_content: String	

[
  {
    "_id": "58f34944ab9b762088432fc4",
    "user_type": "Patient",
    "password": "pass",
    "name": "Petyo",
    "__v": 0
  },
  {
    "_id": "58f34949ab9b762088432fc5",
    "user_type": "Nurse",
    "password": "pass",
    "name": "Natasha",
    "__v": 0
  },
  {
    "_id": "58f3494dab9b762088432fc6",
    "user_type": "Doctor",
    "password": "pass",
    "name": "Chris",
    "__v": 0
  }
]*/
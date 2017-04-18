var express = require('express');
var Test     = require('../app/models/test');
//var config = require('../config'); // get our config file
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// ROUTES FOR OUR API
// get an instance of the express Router
var router = express.Router();             


// viewed at http://localhost:8080/api/test
router.route('/test')

    // create a record (accessed at POST http://localhost:8080/api/test/)
    .post(function(req, res) {
        
		// create a new instance of the Record model
        var test = new Test();   
	
		// check header or url parameters or post parameters for token
        test.doctor_id = req.body.doctor_id || req.query.doctor_id || req.headers['doctor_id'];
        test.patient_id = req.body.patient_id || req.query.patient_id || req.headers['patient_id'];
        test.date = req.body.date || req.query.date || req.headers['date'];
        test.comments = req.body.comments || req.query.comments || req.headers['comments'];
        test.test_result = req.body.test_result || req.query.test_result || req.headers['test_result'] || "";
 
         

        // save the test and check for errors
        test.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Test ordered!' });
        });
        
    })
	
	// DELETE the test with this id (accessed at DELETE http://localhost:8080/api/test)
    .delete(function(req, res) {
		
		var _id = req.body._id || req.query._id || req.headers['_id'] || req.params._id;
		//console.log(_id)
		
        Test.remove({
            _id: _id
        }, function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    })
	
	 // get all the tests (accessed at GET http://localhost:8080/api/test)
    .get(function(req, res) {
		
		//console.log(req.decoded._doc.user_type)
		
        Test.find(function(err, tests) {
            if (err)
                res.send(err);

            res.json(tests);
        });
    });
	
	
	
// viewed at http://localhost:8080/api/test
router.route('/test/:test_id')	
	// GET the test with that id (accessed at GET http://localhost:8080/api/test)
    .get(function(req, res) {
		var _id = req.body._id || req.query._id || req.headers['_id'] || req.params._id;
		
        Test.findById(_id, function(err, testRecord) {
            if (err)
                res.send(err);
            res.json(testRecord);
        });
    })

module.exports = router;

/*
    doctor_id: String, 
    patient_id: String, 
    date: Number,
	comments: String,
	test_result: String
*/
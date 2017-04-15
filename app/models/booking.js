// This file is used for the BOOKIMG model.

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Booking', new Schema({ 
    patient_id: String, 
    doctor_id: String,
	date: Number,
	comment: String
}));
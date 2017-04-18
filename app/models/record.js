// This file is used for the patient's record model.

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Record', new Schema({ 
    doctor_id: String, 
    patient_id: String, 
    date: Number,
	record_content: String,
	doctors_content: String
}));
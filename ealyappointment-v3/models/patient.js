const mongoose = require('mongoose');



var patientSchema= new mongoose.Schema({
	
     patientName:String,
     mobileNumber:Number,
     doctorName:String,
     yourNumber:Number,
     timeAlloted:{type: Date, default: Date.now }


})

   module.exports = mongoose.model('Patient',patientSchema);



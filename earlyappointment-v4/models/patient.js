const mongoose = require('mongoose');



var patientSchema= new mongoose.Schema({
	
     patientName:String,
     mobileNumber:Number,
     doctorName:String, 
     yourNumber:Number,
     enteredDate:String,
     timeOfregistration:{type: Date, default: Date.now },
     visitingHospitalTime:String,
     done:Boolean,

})

   module.exports = mongoose.model('Patient',patientSchema);



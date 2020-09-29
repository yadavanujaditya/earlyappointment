const mongoose = require('mongoose');



var patientSchema= new mongoose.Schema({
	
     patientName:String,
     mobileNumber:Number,
     doctorName:String, 
     yourNumber:Number,
     enteredDate:String,     
     done:String,

})

   module.exports = mongoose.model('Patient',patientSchema);



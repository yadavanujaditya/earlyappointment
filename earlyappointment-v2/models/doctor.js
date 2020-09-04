const mongoose  =require('mongoose');





var doctorSchema= new mongoose.Schema({
    	  email:String,
    	  name:String,
    	  mobileNumber:Number,
          maxPatientLimit:Number,         
          perAppointmenTime:Number,
          breaks:[],
    	  appointment:[
                 { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Patient'
                }
    	  ]
 })



    module.exports= mongoose.model('Doctor',doctorSchema);


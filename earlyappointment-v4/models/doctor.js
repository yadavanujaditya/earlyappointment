const mongoose  =require('mongoose');


var doctorSchema= new mongoose.Schema({
       name:String, 
       email:String,
       mobileNumber:Number,
       maxPatientLimit:Number,
       perAppointmentTime:Number,
       startingAppointmentTime:String,
       onLeave:String,
       pauseAppointment:String,
       note:String,     
       appointmentArray:[
                 { 
                  appointmentDate:String,
                  appointments:[{  type: mongoose.Schema.Types.ObjectId,ref:'Patient'},],
                  breaks:Array,
                },
        ]
 })


  module.exports= mongoose.model('Doctor',doctorSchema);















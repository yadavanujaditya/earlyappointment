const mongoose  =require('mongoose');


var doctorSchema= new mongoose.Schema({
       name:String, 
       email:String,
       mobileNumber:Number,
       date:String,
       maxPatientLimit:Number,
       perAppointmentTime:Number,
       startingAppointmentTime:String,
       closingAppointmentTime:String,
       onLeave:String,
       pauseAppointment:String,
       note:String,     
       appointmentArray:[
                 { 
                  appointmentDate:String, 
                  appointments:[{  type: mongoose.Schema.Types.ObjectId,ref:'Patient'},],
                  breaks:String,
                  currentNumber:Number,
                },
        ]
 })


  module.exports= mongoose.model('Doctor',doctorSchema);















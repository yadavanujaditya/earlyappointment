const mongoose  =require('mongoose');


var doctorSchema= new mongoose.Schema({
       name:String, 
       email:String,
       mobileNumber:Number,
       maxPatientlimit:Number,
       perAppointmnetTime:Number,
       startingAppointmentTime:String,
       onLeave:Boolean,
       pauseApppointment:Boolean,     
       appointmentArray:[
                 { 
                  appointmentDate:String,
                  appointments:[{  type: mongoose.Schema.Types.ObjectId,ref:'Patient'},],
                  breaks:Array,
                },
        ]
 })


  module.exports= mongoose.model('Doctor',doctorSchema);















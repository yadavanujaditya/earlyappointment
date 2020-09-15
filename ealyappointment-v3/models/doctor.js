const mongoose  =require('mongoose');


var doctorSchema= new mongoose.Schema({
       name:String,
       email: {
                    id:{
                           type:mongoose.Schema.Types.ObjectId,
                           ref: "User"
                        },
                            username:String
                  },
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













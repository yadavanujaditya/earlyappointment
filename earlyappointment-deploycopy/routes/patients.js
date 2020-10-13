const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');

// PATIENTS DETAILS FORM
var mobNum=0;
router.get('/new',function(req,res){
	  Doctor.find({},function(err,found){
                if(err){
                   req.flash("error","Oops!!!....Something Went Wrong try again")
                   res.redirect("back")
               }else{ 
                       res.render('book/new',{found:found})
                 }
              })      
	       })


router.post('/booked',function(req,res){ 
 var repeatCheck =req.body.mobileNumber;
 var  enteredDate=req.body.enteredDate;
 var check=0;
 var newpush={
     appointments:[],
     breaks:"false",
     appointmentDate:req.body.enteredDate,
      currentNumber:0,
    }              
             
         Doctor.findOne({"name":req.body.doctorName}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                      req.flash("error","Oops!!!....Something Went Wrong try again")                   
                  return res.redirect("back")
               }else if(!found){
                     req.flash("error","Oops!!!....Something Went Wrong try again")                   
                  return res.redirect("back")
               }else{  
                for(var i=0;i<found.appointmentArray.length;i++){
                      if(found.appointmentArray[i].appointmentDate===enteredDate){
                        for(var f=0;f<found.appointmentArray[i].appointments.length;f++){
                                  var newData=found.appointmentArray[i].appointments[f]                                  
                                  if(newData.mobileNumber==repeatCheck){  
                                       req.flash("error","Appointment With Given No. Already Exist. You Can Track It Over Here") 
                                      return res.redirect("/track")
                                    }
                     }
                                 var num=found.appointmentArray[i].appointments.length+1;
                             check=1;
                        }
                }
               if(check==0){
                            found.appointmentArray.push(newpush)                            
                            var num=1 ;
                         }
                         
                var newData= {
                  patientName:req.body.patientName,
                  mobileNumber:req.body.mobileNumber,
                  doctorName:req.body.doctorName,
                  yourNumber:num,
                  enteredDate:req.body.enteredDate,
                  done:"false"
                }
    if(found.maxPatientLimit>=num){
         Patient.create(newData, function(err,callback){
                  if(found.onLeave=== "false" ){
                       for(var i=0;i<found.appointmentArray.length;i++){
                              if(found.appointmentArray[i].appointmentDate===enteredDate){
                                var start=found.startingAppointmentTime;
                                var close=found.closingAppointmentTime;
                                var note=found.note;
                                var per=found.perAppointmentTime;
                                var ad=found.appointmentArray[i].appointmentDate;
                                var count=found.appointmentArray[i].currentNumber;
                                       found.appointmentArray[i].appointments.push(callback)
                                       found.save(function(err,data){
                                                if(err){
                                                   req.flash("error","sorry!!!!...Try Again")
                                                   res.redirect("back")
                                                  }else{
                                                     res.render("track/track",{newData:newData,count:count,start:start,close:close,ad:ad,note:note,per:per,ed:enteredDate}) 
                                                }
                                           })                                           
                                     } 
                                  }    
                       }else{ 
                        req.flash("error","sorry!!!!.. "+found.name+" is  not available. For any quaries contact hospital")
                         return res.redirect("back")
                       }
                 })
                }else{ 
                  req.flash("error","sorry!!!!..No More Appointments For Today")
                  return res.redirect("back")
                 }
               }
            })                   
       })

// DELETE THE PATIENT
router.get('/delete/patient/:id',function(req,res){
   Patient.findByIdAndRemove(req.params.id,function(err){
      if(err){
        res.redirect('/admin')
      }else{
        res.redirect('/admin')
      }
    })
  })
  module.exports = router;

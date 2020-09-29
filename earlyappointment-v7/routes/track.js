const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');


// ========================================================================================================
// track  - will lead to taking info from the form and to search the details  
// ========================================================================================================
var count=0;
router.get('/track',function(req,res){     
       Doctor.find({},function(err,found){
          if(err){
              console.log("err")
                   res.redirect("back")
                 }else{ 
                   res.render('track/new',{found:found})  
                      }
      })
});

  
router.post('/track',function(req,res){
        var mobileNum=req.body.mobileNumber;        
        var  enteredDate=req.body.enteredDate;        
   Doctor.findOne({"name":req.body.doctorName}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
      if(err){
            console.log(err)
            return res.redirect("back")
         }else if(!found){   
                console.log("doctor not found")
                return res.redirect("back")
         }else{  
            for(var i=found.appointmentArray.length-1;i>=0;i--){
              if(found.appointmentArray[i].appointmentDate=enteredDate){     
                   for(var f=0;f<found.appointmentArray[i].appointments.length;f++){
                                     var newData=found.appointmentArray[i].appointments[f] 
                                     console.log(newData)
                                     var start=found.startingAppointmentTime;
                                     var close=found.closingAppointmentTime;
                                     var per=found.perAppointmentTime;
                                     var ad=found.appointmentArray[i].appointmentDate;
                                     var note=found.note;
                                     var count=found.appointmentArray[i].currentNumber;
                      if(newData.mobileNumber==mobileNum){  
                                    return res.render("track/track",{newData:newData,ad:ad,count:count,start:start,close:close,note:note,per:per}) 
                                        
                      }
                    }
                } 
                      else{
                         console.log("cannot find the patient with given details.please make a new appointment")
                            return res.redirect("back")
                          }
            } 
       } 
  })
})

router.post("/secretDate",function(req,res){

  var trim=req.user.username;
 console.log(trim.length)
 console.log(req.body)
 
 Doctor.find({"email":trim}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){

                if(err){
                    console.log(err)
                }else{
               
                  console.log(found)
                    res.render("secret",{foundOne:found,secretDate:req.body.secretDate})
            
                  
                }
        })    
})





 module.exports = router;
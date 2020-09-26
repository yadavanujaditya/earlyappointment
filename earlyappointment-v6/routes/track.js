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
                   res.send("Doctor not found")
               }else{ 
                       res.render('track/new',{found:found})  
                 }
              })
         });

  
router.post('/track',function(req,res){

        var mobileNum=req.body.mobileNumber;        
        var parsedDate=Date.parse(req.body.enteredDate);
        var storeTemporary=new Date(parsedDate);
        var  enteredDate=newDateString(storeTemporary);        
          console.log(enteredDate);
        

        Doctor.findOne({"name":req.body.doctorName}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                    console.log(err)
                    res.redirect("/track")
                }else{         
              for(var i=found.appointmentArray.length-1;i>=0;i--){
                  if(found.appointmentArray[i].appointmentDate=enteredDate){     
                      var ele= found.appointmentArray[i].appointments;                
                           var currentNumber=countingNumber(ele)
                           console.log(count)
                             for(var i=0;found.appointmentArray[i].appointments.length;i++){
                              var newData=found.appointmentArray[i].appointments[i]
                              console.log(found.appointmentArray[i].appointments[i])
                                if(newData.mobileNumber==mobileNum){   
                                  console.log(found.startingAppointmentTime)
                                      res.render("track/track",{newData:newData,count:count,start:found.startingAppointmentTime})
                                       count=0;
                                      break;
                                       }
                                   }
                                 }
                                 else{
                                   res.send("cannot find the patient with given details.please make a new appointment")
                                     }
                              } 
                          } 
                       })
                    })


      function countingNumber(ble){
          
         ble.forEach(function(x){
          console.log(x.done)
            if(x.done=="true"){             
                    count++;       
            }  
         })
         return count;
      }

 function newDateString(date){

      var a =date.getDate().toString()+"-";
      var b =(date.getMonth()+1).toString()+"-";
      var c=date.getFullYear().toString();
      return a+b+c;
  }
  

  module.exports = router;
const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');

//=============================================================================================
// PATIENTS DETAILS FORM
//=============================================================================================


router.get('/new',function(req,res){
	  Doctor.find({},function(err,found){
                if(err){
                   console.log("err")
                   res.send("Doctor not found")
               }else{ 
                       res.render('book/new',{found:found})
                      console.log(found)
                 }
              })      
	       })


router.post('/booked',function(req,res){ 


 
 var parsedDate=Date.parse(req.body.enteredDate);
 var storeTemporary=new Date(parsedDate)
 // console.log(storeTemporary)
 var  enteredDate=newDateString(storeTemporary);
   // console.log(enteredDate)
 // console.log(req.body.enteredDate)
 var visitingHospitalTime="12:30";
 var check=0;
 var newpush={
     appointments:[],
     breaks:[],
     appointmentDate:enteredDate,
    } 

           console.log(req.body)
        Doctor.findOne({"name":req.body.doctorName},function(err,found){
                if(err){
                   console.log("err")
                   res.send("Doctor not found")
               }else{              
             console.log(found)
                for(var i=0;i<found.appointmentArray.length;i++){
                  if(found.appointmentArray[i].appointmentDate===enteredDate){
                  var num=found.appointmentArray[i].appointments.length+1;
                  }
                }

      console.log(num)
                var newData= {
                  patientName:req.body.patientName,
                  mobileNumber:req.body.mobileNumber,
                  doctorName:req.body.doctorName,
                  yourNumber:num,
                  enteredDate:enteredDate,
                  visitingHospitalTime:"12:30",
                  done:"false"
                }
                    
              
         Patient.create(newData, function(err,callback){
console.log(newData)
                  if(found.onLeave=== "false" ){
                       for(var i=0;i<found.appointmentArray.length;i++){
                        // console.log("for each")
                              if(found.appointmentArray[i].appointmentDate===enteredDate && found.pauseAppointment== "false" ){
                                // console.log("matched")
                                console.log(found.appointmentArray[i].appointmentDate)
                                  found.appointmentArray[i].appointments.push(callback)
                                   found.save(function(err,data){
                                              if(err){
                                                  console.log(err)
                                             }else{
                                                  console.log(data)
                                               }
                                            })
                                          check= 1;
                                         } 
                                      }    
         console.log(check)
                               if(check==0){
                               
                                     // console.log(newpush)
                                     found.appointmentArray.push(newpush)
                                     found.save(function(err,data){
                                         if(err){
                                              console.log(err)
                                          }else{
                                            var addedIndex=found.appointmentArray.length-1;
                                            found.appointmentArray[addedIndex].appointments.push(callback)
                                            found.save(function(err,data){
                                                if(err){
                                                     console.log(err)
                                                }else{
                                                  console.log(data)
                                                  console.log("we made it ")
                                               }
                                            })
                                                check=0;
                                          }
                                        })
                                      }
                       }
                 })
               }
            })
     
                   
       })




 function newDateString(date){
      var a =date.getDate().toString()+"-";
      var b =(date.getMonth()+1).toString()+"-";
      var c=date.getFullYear().toString();
      return a+b+c;
}
  

  module.exports = router;

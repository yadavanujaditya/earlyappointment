const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');

//=============================================================================================
// PATIENTS DETAILS FORM
//=============================================================================================

 var count=0;
router.get('/new',function(req,res){
	  Doctor.find({},function(err,found){
                if(err){
                   console.log("err")
                   res.send("Doctor not found")
               }else{ 
                       res.render('book/new',{found:found})
                      // console.log(found)
                 }
              })      
	       })


router.post('/booked',function(req,res){ 


 
 var parsedDate=Date.parse(req.body.enteredDate);
 var storeTemporary=new Date(parsedDate)
 var  enteredDate=newDateString(storeTemporary);
 var visitingHospitalTime="12:30";
 var check=0;
 var newpush={
     appointments:[],
     breaks:[],
     appointmentDate:enteredDate,
    } 
             // console.log(req.body)
             // console.log(req.body)
        Doctor.findOne({"name":req.body.doctorName},function(err,found){
                if(err){
                   console.log(err)
                   console.log("Doctor not found wala error hai")
                   res.send("Doctor not found wala error hai")
               }else{              
             console.log(found)
                for(var i=0;i<found.appointmentArray.length;i++){
                      if(found.appointmentArray[i].appointmentDate===enteredDate){
                                 // console.log("found date")
                                 var num=found.appointmentArray[i].appointments.length+1;
                                 // console.log("this ihe 1st appointment number"+num)
                             check=1;
                        }
                }
               if(check==0){
                            found.appointmentArray.push(newpush)
                            console.log("thhis shoud not come with found date")             
                            var num=1 ;
                         }
          
                                    
                                
               // console.log("   ye aptient create hone se pehle")
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
                        console.log("for each")
                              if(found.appointmentArray[i].appointmentDate===enteredDate){
                                console.log("matched")
                                 var ele= found.appointmentArray[i].appointments;
                                  var currentNumber=countingNumber(ele)
                                if(found.pauseAppointment== "false"){
                                       found.appointmentArray[i].appointments.push(callback)
                                       found.save(function(err,data){
                                                if(err){
                                                   console.log(err)
                                                  }else{
                                                     res.render("track/track",{newData:newData,count:count}) 
                                                     count=0;
                                                }
                                           })
                                        }                                            
                                     } 
                                  }    
                                                   // console.log(check)
                       }
                 })
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

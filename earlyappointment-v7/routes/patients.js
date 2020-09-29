const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');

//=============================================================================================
// PATIENTS DETAILS FORM
//=============================================================================================
  
  // var repeatCheck=0;
  var mobNum=0;
 // var count=0;
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

 // console.log(req.body)
 // var parsedDate=Date.parse(req.body.enteredDate);
 // var storeTemporary=new Date(parsedDate)
 // var  enteredDate=newDateString(storeTemporary);
 // var visitingHospitalTime="12:30";
 var repeatCheck =req.body.mobileNumber;
 console.log(req.body.enteredDate)
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
                   console.log(err)
                  return res.redirect("back")
               }else if(!found){
                console.log("doctor not found or undefined")
                  return res.redirect("back")
               }else{  
                   console.log(found)
                for(var i=0;i<found.appointmentArray.length;i++){
                      if(found.appointmentArray[i].appointmentDate===enteredDate){
                        for(var f=0;f<found.appointmentArray[i].appointments.length;f++){
                                  var newData=found.appointmentArray[i].appointments[f] 
                                  console.log("ho raha hai")
                                  console.log(found.appointmentArray[i].appointments[f])
                                  console.log(repeatCheck)
                                  if(newData.mobileNumber==repeatCheck){  
                                       console.log("appointment with given no. already exist")
                                      return res.redirect("back")
                                    }
                     }
                                 var num=found.appointmentArray[i].appointments.length+1;
                             check=1;
                        }
                }
               if(check==0){
                            found.appointmentArray.push(newpush)
                            console.log("thhis shoud not come with found date")             
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
                   console.log(req.body.enteredDate) 
              
         Patient.create(newData, function(err,callback){
                  console.log(newData)
                  if(found.onLeave=== "false" ){
                       for(var i=0;i<found.appointmentArray.length;i++){
                        console.log("for each")
                              if(found.appointmentArray[i].appointmentDate===enteredDate){
                                 

                                var start=found.startingAppointmentTime;
                                var close=found.closingAppointmentTime;
                                var note=found.note;
                                var per=found.perAppointmentTime;
                                var ad=found.appointmentArray[i].appointmentDate;
                                console.log(start)
                                console.log(close)
                                var count=found.appointmentArray[i].currentNumber;
                                console.log(count)                                
                                       found.appointmentArray[i].appointments.push(callback)
                                       found.save(function(err,data){
                                                if(err){
                                                   console.log(err)
                                                  }else{
                                                     res.render("track/track",{newData:newData,count:count,start:start,close:close,ad:ad,note:note,per:per}) 
                                                     // count=0;
                                                }
                                           })                                           
                                     } 
                                  }    
                       }
                 })
               }
            })                   
       })


      // function countingNumber(ble){
          
      //    ble.forEach(function(x){
      //     console.log(x.done)
      //       if(x.done=="true"){             
      //               count++;       
      //       }  
      //    })
      //    return count;
      // }


      // function countingNumber(ble){
        
      //       ble.forEach(function(x){
      //            if(x.mobileNumber==repeatCheck){  
      //                mobNum++;    
      //                console.log(mobNum)   
      //              }  
      //           })
      //    return mobNum;
      // }

// console.log(countingNumber())

//  function newDateString(date){
//       var a =date.getDate().toString()+"-";
//       var b =(date.getMonth()+1).toString()+"-";
//       var c=date.getFullYear().toString();
//       return a+b+c;
// }

  module.exports = router;

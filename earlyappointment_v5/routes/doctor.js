const express               = require("express");
const router                = express.Router();
const Doctor                = require('../models/doctor');






//============================================================================
// CREATING A DOCTOR ROUTE WHICH WILL RENDER US TO THE FORM 
// ===========================================================================

router.get('/createdoctor',isLoggedIn,function(req,res){

        res.render('doctor/new')

});


router.post('/createdoctor',isLoggedIn,function(req,res){

    var  date= new Date;
    var startingDate=newDateString(date);
    console.log(startingDate);
 
console.log("hitting correct")
console.log(req.body.startingAppointmentTime)
    Doctor.create({
          email:req.body.email,
          name:req.body.name,
          mobileNumber:req.body.mobileNumber,
          maxPatientLimit:req.body.maxPatientLimit,         
          perAppointmentTime:req.body.perAppointmentTime,
          startingAppointmentTime:req.body.startingAppointmentTime,
          onLeave:req.body.onLeave,
          pauseAppointment:req.body.pauseAppointment,
          note:req.body.note,
          appointmentArray:[{  
               appointmentDate:startingDate,
                           }]   
      }, 
function(err,newDoctor){
    if(err){
        console.log(err);
    }else{
        res.redirect('/secret')        
        console.log(newDoctor)
        }
   })
})

router.get("/secret",isLoggedIn,function(req,res){
    res.render("secret")
})

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }
     res.redirect("/")
}




 function newDateString(date){
      var a =date.getDate().toString()+"-";
      var b =(date.getMonth()+1).toString()+"-";
      var c=date.getFullYear().toString();
      return a+b+c;
}


module.exports = router;

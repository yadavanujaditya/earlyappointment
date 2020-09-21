const express               = require("express");
const router                = express.Router();
const Patient               = require('../models/patient');
const Doctor                = require('../models/doctor');


// ========================================================================================================
// track  - will lead to taking info from the form and to search the details  
// ========================================================================================================

router.get('/track',function(req,res){
    res.render('track/new')
});


router.post('/track',function(req,res){

    var mobileNum=req.body.mobileNum;
    var email=req.body.doctorEmail;
    // console.log(email)

         Doctor.findOne({email:email}).populate("appointment").exec(function(err,foundUser){
                    if(err){
                        console.log(err)
                        
                    } else{
                          if(!foundUser){
                              res.send("Cannot find the given u patient with the selected doctor")
                          }else
                                 for(i=0;i<foundUser.appointment.length;i++){
                                         // console.log(foundUser.appointment[i])
                                        var onepatient=foundUser.appointment
                                       // console.log(onepatient[i].mobileNumber)
                                       // res.render('track/newbooked',{newData:onepatient})
                                      if(onepatient[i].mobileNumber==mobileNum){
                                      // console.log(onepatient[i])
                                     var x=onepatient[i]
                                       res.render('track/track',{newData:x})
                                        console.log(onepatient[i])
                                        break;     
                                     }
                                }

                          }

                })
        });

  module.exports = router;
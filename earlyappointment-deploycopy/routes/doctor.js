const express               = require("express");
const router                = express.Router();
const Doctor                = require('../models/doctor');
const Patient               = require('../models/patient');

router.get('/createdoctor',isLoggedIn,function(req,res){
        res.render('doctor/new')
});

router.post('/createdoctor',isAdminIn,function(req,res){
    Doctor.create({
          email:req.body.email,
          name:req.body.name,
          mobileNumber:req.body.mobileNumber,
          maxPatientLimit:req.body.maxPatientLimit,         
          perAppointmentTime:req.body.perAppointmentTime,
          startingAppointmentTime:req.body.startingAppointmentTime,
          closingAppointmentTime:req.body.closingAppointmentTime,
          onLeave:req.body.onLeave,
          note:req.body.note,
          appointmentArray:[{ appointmentDate:req.body.date,
                                appointments:[],
                                breaks:"false",
                                currentNumber:0,
                           }]   
      }, 
function(err,newDoctor){
    if(err){
      req.flash("error","Oops!!!....Something Went Wrong try again")                   
        res.redirect("back")
    }else{
        req.flash("success","Successfully Created Your Account "+req.body.name)                                  
        res.redirect('/secret')        
        }
   })
})


// UPDATE DOCTOR
router.post('/doctor/:id',isLoggedIn,function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,req.body.Doctor,function(err,updatedDoc){
    if(err){
       req.flash("error","Oops!!!....Something Went Wrong try again")                   
      res.redirect("/secret")
    }else{
      req.flash("success","Successfully Updated Doctor")
      res.redirect("/secret" )
      }
  });
});

// UPDATE CURRENT NUMBER AND DONE
router.post("/update/:id/:pid/:enteredDate",function(req,res){
   Doctor.findById(req.params.id).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                    req.flash("error","Oops!!!....Something Went Wrong try again")                   
                    res.redirect("back")
                }else if(!found){
                   req.flash("error","Oops!!!....Something Went Wrong try again")                   
                  res.redirect("back")
                }else{ 
                  found.appointmentArray.forEach(function(foundObj){  
                       if(foundObj.appointmentDate==req.params.enteredDate){ 
                            foundObj.currentNumber=foundObj.currentNumber+1;
                            found.save(function(err,data){
                                                if(!err){
                                                        Patient.findByIdAndUpdate(req.params.pid,{done:"true"},(function(err,found){
                                                           if(err){
                                                             res.redirect("back")
                                                           }else{
                                                            res.redirect("/secret")
                                                                }
                                                          }))
                                                  }else{
                                                      req.flash("error","Oops!!!....Something Went Wrong try again")                   
                                                      res.redirect("back")
                                                      }
                           })
                      }
                  })
              }
     })
  })

// UPDATE A DOCTOR DETAILS
router.post('/doctor/:id',isLoggedIn,function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,req.body.Doctor,function(err,updatedDoc){
    if(err){
      req.flash("success","Unable TO Update ")                   
      res.redirect("/secret")
    }else{
      req.flash("success","Updated ")                   
      res.redirect("/secret" )
      }
  });
});


// DELETE DOCTOR                                      
router.get('/delete/doctor/:id',function(req,res){
   Doctor.findByIdAndRemove(req.params.id,function(err){
      if(err){
        res.redirect('/admin')
      }else{
        res.redirect('/admin')
      }
   })
})

function isAdminIn(req,res,next){
     if(req.isAuthenticated()&& req.user.username=="yadavanujaditya@gmail.com"){
       return next();
     }
     req.flash("error","Sorry...Try Again Anuj ")                   
     res.redirect("/admin")
}

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){ 
       return next();
     }
     req.flash("error","Something Went Wrong...Please Try Again")                   
     res.redirect("/")
}




module.exports = router;

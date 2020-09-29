const express               = require("express");
const router                = express.Router();
const Doctor                = require('../models/doctor');
const Patient               = require('../models/patient');


//============================================================================
// CREATING A DOCTOR ROUTE WHICH WILL RENDER US TO THE FORM 
// ===========================================================================

router.get('/createdoctor',isLoggedIn,function(req,res){

        res.render('doctor/new')

});


router.post('/createdoctor',isAdminIn,function(req,res){

    // var  date= new Date;
    // var startingDate=newDateString(date);
    // console.log(startingDate);
    // console.log(req.body.closingAppointmentTime)
 
console.log("hitting correct")
console.log(req.body.startingAppointmentTime)
    Doctor.create({
          email:req.body.email,
          name:req.body.name,
          mobileNumber:req.body.mobileNumber,
          maxPatientLimit:req.body.maxPatientLimit,         
          perAppointmentTime:req.body.perAppointmentTime,
          startingAppointmentTime:req.body.startingAppointmentTime,
          closingAppointmentTime:req.body.closingAppointmentTime,
          onLeave:req.body.onLeave,
          pauseAppointment:req.body.pauseAppointment,
          note:req.body.note,
          appointmentArray:[{ appointmentDate:req.body.date,
                                appointments:[],
                                breaks:"false",
                                currentNumber:0,
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

router.get("/admin",isAdminIn,function(req,res){
 Doctor.find({}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                    console.log(err)
                }else{
                  console.log(found)
                   res.render("admin",{foundAll:found})
                }
        }) 
})

// ========================================================================
// EDIT ROUTE
// =========================================================================

router.post('/doctor/:id',isLoggedIn,function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,req.body.Doctor,function(err,updatedDoc){
    if(err){
      console.log("doctor update  karne mai error hai")
      res.redirect("/secret")
    }else{
      console.log(updatedDoc)
      res.redirect("/secret" )
      }
  });
});




router.post("/update/:id/:pid/:enteredDate",function(req,res){

 Doctor.findById(req.params.id).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
       console.log("get through")
                if(err){
                    console.log(err)
                }else if(!found){
                   console.log("doctor not found")
                  res.redirect("back")
                }else{ 
               
               console.log(found)
                  found.appointmentArray.forEach(function(foundObj){  
                       if(foundObj.appointmentDate==req.params.enteredDate){ 
                              console.log(foundObj.currentNumber) 
                            foundObj.currentNumber=foundObj.currentNumber+1;
                            found.save(function(err,data){
                                                if(!err){
                                                  console.log(data)
                                                        Patient.findByIdAndUpdate(req.params.pid,{done:"true"},(function(err,found){
                                                           if(err){
                                                             console.log("it isn a erroer   upodate mai dikkit ")
                                                           }else{
                                                            res.redirect("/secret")
                                                             console.log("appointment completed")    
                                                                }
                                                          }))

                                                  }else{
                                                      console.log(err)
                                                      }
                           })
                      }
                  })
              }
     })
  })

// router.post("/done/:id",isLoggedIn,function(req,res){
           
//  Patient.findByIdAndUpdate(req.params.id,{done:"true"},(function(err,found){
//    if(err){
//      console.log("it isn a erroer   upodate mai dikkit ")
//    }else{
//     res.redirect("/secret")
//      console.log("appointment completed")    
//    }
//  }))
// })





router.post('/doctor/:id',isLoggedIn,function(req,res){
    Doctor.findByIdAndUpdate(req.params.id,req.body.Doctor,function(err,updatedDoc){
    if(err){
      console.log("doctor update  karne mai error hai")
      res.redirect("/secret")
    }else{
      console.log(updatedDoc)
      res.redirect("/secret" )
      }
  });
});



function isAdminIn(req,res,next){
     if(req.isAuthenticated()&& req.user.username=="yadavanujaditya@gmail.com"){
       return next();
     }
     res.redirect("/admin")
}


function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){ 
       return next();
     }
     res.redirect("/")
}

//  function newDateString(date){
//       var a =date.getDate().toString()+"-";
//       var b =(date.getMonth()+1).toString()+"-";
//       var c=date.getFullYear().toString();
//       return a+b+c;
// }


module.exports = router;

const express               =require('express');
const app                   =express();
const mongoose              =require('mongoose');
const bodyParser            =require('body-parser');
const seedDB                =require('./seeds');


const passport              =require("passport");
const LocalStrategy         =require("passport-local");
const passportLocalMongoose =require("passport-local-mongoose");

const User                  = require("./models/user");
const Patient               = require('./models/patient')
const Doctor                = require('./models/doctor')



mongoose.connect('mongodb://localhost:27017/patients_details_v3', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
   

app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static("./public"));
app.set('view engine','ejs');


app.use(require("express-session")({
  secret:"Aditya is the pure love",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========================================================================================

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

// ===========================================================================================
// LANDOING PAGE
//============================================================================================

app.get('/',function(req,res){
	res.render('home')

});


//=============================================================================================
// PATIENTS DETAILS FORM
//=============================================================================================


app.get('/new',function(req,res){
  res.render('book/new')

});
app.post('/booked',function(req,res){ 


 var enteredDate=req.body.enteredDate;
 var visitingHospitalTime="12:30";
 var newpush={
     appointments:[],
     breaks:[],
     apppointmentDate:enteredDate,
    } 


        Doctor.findOne({"name":"SURESHMEHRA"},function(err,found){
                if(err){
                   console.log("err")
               }else{


                var newData= {
                  patientName:req.body.patientName,
                  mobileNumber:req.body.mobileNumber,
                  doctorName:req.body.doctorName,
                  yourNumber:found.appointmentArray.appointment.length+1,
                  enteredDate:req.body.enteredDate,
                  done:false
                }
                    console.log(newData)
                    console.log(newData.yourNumber)
         Patient.create(newData, function(err,callback){

                  if(onLeave===false){
                       for(var i=0;i<found.appointmentArray.length;i++){
                              if(found.appointmentArray[i].appointmentDate===enteredDate && pauseAppointment==false){
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




// ========================================================================================================
// track  - will lead to taking info from the form and to search the details  
// ========================================================================================================

app.get('/track',function(req,res){
    res.render('track/new')
});


app.post('/track',function(req,res){

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

//===========================================================================
//AUTH ROUTES
//===========================================================================

app.get("/register",function(req,res){
    res.render("register");
})

//============================================================================HANDELING SIGN UP

app.post("/register",function(req,res){

   req.body.username
   req.body.password
   var newUser=req.body.username
   User.register(new User({username:newUser}),req.body.password,function(err,user){
        if(err){
          console.log(err);
          return res.render('register')
        }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/secret");
      })
   })
});


//==============================================================================LOGIN ROUTES

app.get("/login", function(req, res){
   res.render("login"); 
});

//==============================================================================LOGIN POST ROUTE

app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});


app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/")
})

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }
     res.redirect("/")
}


app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret")
})
//============================================================================
// CREATING A DOCTOR ROUTE WHICH WILL RENDER US TO THE FORM 
// ===========================================================================

app.get('/createdoctor',isLoggedIn,function(req,res){

        res.render('doctor/new')

});


app.post('/createdoctor',isLoggedIn,function(req,res){
    var email =req.body.email;
    var name=req.body.name;
    var mobileNumber=req.body.mobileNumber;
    var maxPatientLimit=req.body.maxPatientLimit;
    var perAppointmenTime=req.body.perAppointmenTime;
    
console.log("hitting correct")
    Doctor.create({
          email:email,
          name:name,
          mobileNumber:mobileNumber,
          maxPatientLimit:maxPatientLimit,         
          perAppointmenTime:perAppointmenTime,
          breaks:[],
          appointment:[],
      }, 
function(err,newDoctor){
    if(err){
        console.log(err);
    }else{
        res.send("Sucessfully Created New Doctor")
        console.log("newly created doctor");
        console.log(newDoctor)
        }
})

})

function currentUser(){
  

}





app.listen(3000);
console.log("server has started");
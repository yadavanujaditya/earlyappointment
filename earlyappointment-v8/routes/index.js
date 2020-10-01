const express               = require("express");
const router                = express.Router();
const passport              = require("passport");
const User                  = require("../models/user");
const Doctor                = require('../models/doctor');

router.get('/',function(req,res){
  res.render('home')
});

router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
   var newUser=req.body.username
   User.register(new User({username:newUser}),req.body.password,function(err,user){
        if(err){
          req.flash("error",err.message);
          return res.render('register')
        }
    passport.authenticate("local")(req,res,function(){
     if(req.user.username=="yadavanujaditya@gmail.com" ){
           res.redirect("/admin");
     }else{
      req.flash("success","Successfully registered ")                                  
       res.redirect("/secret")
         }      
      })
   })
});

router.get("/login", function(req, res){
   res.render("login"); 
});

router.post("/login",passport.authenticate("local", {
           successRedirect: "/secret",
           failureRedirect: "/login" 
}) ,function(req, res){
});

router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Successfully Logged Out")
  res.redirect("/")
})


router.get("/secret",isLoggedIn,function(req,res){
 var trim=req.user.username;          
 Doctor.find({"email":trim}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                     req.flash("error","sorry!!!!...Something Went Wrong Try Again")
                     res.redirect("back")
                }else{
                    res.render("secret",{foundOne:found})
                }
        })
})

router.post("/secretDate",function(req,res){
  var trim=req.user.username;
       Doctor.find({"email":trim}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                    console.log(err)
                }else{
                  console.log(found)
                    res.render("secret",{foundOne:found,secretDate:req.body.secretDate})                  
                }
        })    
})


router.get("/admin",isAdminIn,function(req,res){
 Doctor.find({}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                     req.flash("error","Oops!!!....Something Went Wrong Anuj try again")                   
                    return res.redirect("back")
                }else{                     
                   res.render("admin",{foundDoctors:found})
                }
        }) 
})

router.post("/adminDate",isAdminIn,function(req,res){
  Doctor.find({}).populate({path:'appointmentArray',populate:{path:'appointments',model:'Patient'}}).exec(function(err,found){
                if(err){
                    console.log(err)
                }else{
                  console.log(found)
                    res.render("admin",{foundDoctors:found,secretDate:req.body.adminDate})                  
                }
        })
})


function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }
     req.flash("success","Please Login First!")
     res.redirect("/")
} 

function isAdminIn(req,res,next){
     if(req.isAuthenticated()&& req.user.username=="yadavanujaditya@gmail.com"){
       return next();
     }
     req.flash("error","Sorry...Cannot Log You In U Dont Have Permission ")                   
     res.redirect("back")
}
module.exports= router;
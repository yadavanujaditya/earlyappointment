const express               = require("express");
const router                = express.Router();
const passport              = require("passport");
const User                  = require("../models/user");




// ===========================================================================================
// LANDOING PAGE
//============================================================================================

router.get('/',function(req,res){
	res.render('home')

});



//===========================================================================
//AUTH ROUTES
//===========================================================================

router.get("/register",function(req,res){
    res.render("register");
})

//============================================================================HANDELING SIGN UP

router.post("/register",function(req,res){

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

router.get("/login", function(req, res){
   res.render("login"); 
});

//==============================================================================LOGIN POST ROUTE

router.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});


router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/")
})

function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
       return next();
     }
     res.redirect("/")
}


module.exports= router;
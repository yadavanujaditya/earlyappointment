const express               =require('express');
const app                   =express();
const mongoose              =require('mongoose');
const bodyParser            =require('body-parser');


const passport              =require("passport");
const LocalStrategy         =require("passport-local");
const passportLocalMongoose =require("passport-local-mongoose");

const User                  = require("./models/user");
const Patient               = require('./models/patient')
const Doctor                = require('./models/doctor')


const doctorRoutes         = require("./routes/doctor");
const patientsRoutes       = require("./routes/patients");
const indexRoutes          = require("./routes/index");
const trackRoutes          = require("./routes/track");


mongoose.connect('mongodb://localhost:27017/patients_details_v6', {
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


app.use(indexRoutes);
app.use( patientsRoutes);
app.use(doctorRoutes);
app.use(trackRoutes);


app.listen(3000);
console.log("server has started");
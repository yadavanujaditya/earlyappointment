const express       =require('express');
const app           =express();
const mongoose      =require('mongoose');
const bodyParser    =require('body-parser');


mongoose.connect('mongodb://localhost:27017/patients_details', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
   

app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static("./public"));
app.set('view engine','ejs');


// var data=[
// {patientName:'radhe mohan',age:'34',mobileNum:'6388871987'},
// {patientName:'adhe mohan',age:'43',mobileNum:'988871987'}

// ];


//SCHEMA SETUP

var appointmentSchema= new mongoose.Schema({
    patientName: String,
    mobileNum: String,
    yourNum: Number,

});

var Data= mongoose.model('Data',appointmentSchema);



// Data.create(
//  {
//  	patientName:"anuj yadav",
//  	mobileNum:"6388871965",
//     yourNum:"23"

//  },function(err,data){
//  	if(err){
//  		console.log(err);
//  	}else{
//  		console.log("newly created patient data");
//  		console.log(data);
//  	}
//  });


//about this route-  this leads to landing page- have two button - clicking on each button  will lead form- new and tracknew
// new- will lead to a form for taking details and saving it to in our data base
// tracknew - will lead to taking info from the form and to search the details  

app.get('/',function(req,res){
	res.render('home')

});


// new- will lead to a form for taking details and saving it to in our data base
app.get('/new',function(req,res){
    res.render('new')
});


// retrieve data from new.ejs
app.post('/booked',function(req,res){
	var doctorName=req.body.search
	var patientName=req.body.patientName
	// var age=req.body.Age
	var mobileNum=req.body.mobileNum
    var  newData={patientName:patientName,mobileNum:mobileNum};

    Data.create(newData,function(err,newlycreated){
        if(err){
            console.log(err)
        }else{
            res.render("booked",{newData:newlycreated})
            
            console.log(newlycreated)
        }
    });
})




// tracknew - will lead to taking info from the form and to search the details  
app.get('/track',function(req,res){
    res.render('tracknew')
});



// retrieve data from tracknew.ejs
app.post('/track',function(req,res){

    var mobileNum=req.body.mobileNum
        Data.find({mobileNum:mobileNum},function(err,allData){
        if(err){
            console.log(err);
        }else{
            console.log(allData)
            res.render('newbooked',{newData:allData})
        }

    })
    

});






app.listen(3000);
console.log("server has started");



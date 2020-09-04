const express       =require('express');
const app           =express();
const mongoose      =require('mongoose');
const bodyParser    =require('body-parser');
const seedDB        =require('./seeds')


mongoose.connect('mongodb://localhost:27017/patients_details_v1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    });
   

app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static("./public"));
app.set('view engine','ejs');

var Patient= require('./models/patient')
var Doctor= require('./models/doctor')


         // Doctor.findOne({email: "yadavanujaditya@gmail.com"}).populate("appointment").exec(function(err,foundallpatient){
         //            if(err){
         //                console.log(err)
         //            } else{
         //               for(i=0;i<foundallpatient.length;i++){
         //                 var onepatient=foundallpatient[i]
         //                 console.log(onepatient.timeAlloted.toString())
         //                if(onepatient.mobileNumber===6388871965){
         //                   console.log(onepatient)
         //                    break;     
         //                }
         //            }
         //        }
         //    })
                  



//  CREATING A DOCTOR


// Doctor.create({
//           email:"yadavanujaditya@gmail.com",
//           name:"Dr. Anuj Yadav",
//           mobileNumber:6388871965,
//           maxPatientLimit:150,         
//           perAppointmenTime:3,
//           breaks:45,
//           appointment:[]
//       }, 
// function(err,newDoctor){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("newly created doctor");
//         console.log(newDoctor)

// }
// })

// CREATING A DOCTOR ROUTE WHICH WILL RENDER US TO THE FORM 
app.get('/createdoctor',function(req,res){

        res.render('book/newdoctor')

});

// POST ROUTE FOR PARSING THE DATA
app.post('/createdoctor',function(req,res){
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


//about this route-  this leads to landing page- have two button - clicking on each button  will lead form- new and tracknew
// new- will lead to a form for taking details and saving it to in our data base
// tracknew - will lead to taking info from the form and to search the details  

app.get('/',function(req,res){
	res.render('book/home')

});



// new- will lead to a form for taking details and saving it to in our data base
app.get('/new',function(req,res){
    res.render('book/new')
});


// retrieve data from new.ejs
app.post('/booked',function(req,res){  

    var doctorName=req.body.search
    var patientName=req.body.patientName
    var mobileNumber=req.body.mobileNumber
    var maxPatientLimit=0;
   var yourNumber=0;
 console.log(doctorName)

    Doctor.findOne({name:doctorName},function(err,foundUser){
                 if(err){
                     console.log(err)
                 }else{
           
               var yourNumber=foundUser.appointment.length + 1;

        var  newData={patientName:patientName,mobileNumber:mobileNumber,doctorName:doctorName,yourNumber:yourNumber};




         Patient.create(newData,
           function(err,newlyCreated){
             Doctor.findOne({name:doctorName},function(err,foundUser){
                 if(err){
                     console.log(err)
                 }else{
                     foundUser.appointment.push(newlyCreated)
                     foundUser.save()
                    }});
                     res.render("book/booked",{newData:newlyCreated})
                      console.log(foundUser)
                 })
                    }
                })

                 




            })




// tracknew - will lead to taking info from the form and to search the details  
app.get('/track',function(req,res){
    res.render('track/tracknew')
});



// retrieve data from tracknew.ejs
app.post('/track',function(req,res){

    var mobileNum=req.body.mobileNum;
    var email=req.body.doctorEmail;
    // console.log(email)

         Doctor.findOne({email:email}).populate("appointment").exec(function(err,foundUser){
                    if(err){
                        console.log(err)
                    } else{
                          
                       for(i=0;i<foundUser.appointment.length;i++){
                          // console.log(foundUser.appointment[i])
                          var onepatient=foundUser.appointment
                            // console.log(onepatient[i].mobileNumber)
                            // res.render('track/newbooked',{newData:onepatient})
                        if(onepatient[i].mobileNumber==mobileNum){
                             // console.log(onepatient[i])
                             var x=onepatient[i]
                             res.render('track/newbooked',{newData:x})
                             console.log(onepatient[i])
                            break;     
                        }
                    }
                }
            })
        });

//         Doctor.findOne({email:email},function(err,allData){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(allData)
//             res.render('track/newbooked',{newData:allData})
//         }

//     })
// });


app.listen(3000);
console.log("server has started");



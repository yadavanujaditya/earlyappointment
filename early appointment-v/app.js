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


var dayCount =[1]








                  


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
//           email:"sharadchandra@gmail.com",
//           name:"Dr. Sharad Chandra",
//           mobileNumber:7678971364,
//           maxPatientLimit:200,         
//           perAppointmenTime:5,
//           breaks:45,
//           appointment:[]}, 
// function(err,newDoctor){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("newly created doctor");
//         console.log(newDoctor)

// }
// })







//about this route-  this leads to landing page- have two button - clicking on each button  will lead form- new and tracknew
// new- will lead to a form for taking details and saving it to in our data base
// tracknew - will lead to taking info from the form and to search the details  

app.get('/',function(req,res){
    seedDB()
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
    var maxPatientLimit=250;
    
    var yourNumber=dayCount.length;
    dayCount.push(maxPatientLimit)
    

    // console.log(yourNumber)

    var  newData={patientName:patientName,mobileNumber:mobileNumber,doctorName:doctorName,yourNumber:yourNumber};

    

    Patient.create(newData,
        function(err,newlyCreated){
            Doctor.findOne({email:"yadavanujaditya@gmail.com"},function(err,foundUser){
                 if(err){
                     console.log(err)
                 }else{
                     foundUser.appointment.push(newlyCreated)
                     foundUser.save()
                     res.render("book/booked",{newData:newlyCreated})
                     console.log(foundUser)
                 }
               
         })

         

    })

// last one
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

         Doctor.findOne({email:email}).populate("appointment").exec(function(err,foundallpatient){
                    if(err){
                        console.log(err)
                    } else{
                        var x =foundallpatient.appointment;
                        console.log(x[0])
                       for(i=0;i<x.length;i++){
                        // console.log(foundallpatient.appointment[i])

                          var onepatient=foundallpatient.appointment[i]
                         
                        if(onepatient.mobileNumber===6388871965){
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



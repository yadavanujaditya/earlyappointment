const mongoose = require('mongoose')
const Patient= require('./models/patient')
const Doctor= require('./models/doctor')



 function seedDB(){
 	

    // THIS IS FOR TRACKING
         
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
                  


 }

 


       
 module.exports = seedDB;




        //   Data.forEach(function(seeds){
	        //          Campground.create(seeds,function(err,campground){
	        //         		  if(err){
	        //         		       	console.log(err)
	        //         		  }else{
	        //         		       	console.log("added a campground")

	        //         		       	 // CREATE A COMMENT
         // Comment.create({  text:"this place is beautifull",  author:"anuj yadav" }, function(err,comment){

         //        if(err){
         //    		  console.log(err)
         //    	}else{
         //    		campground.comments.push(comment);
         //            campground.save();
         //            console.log("added a comment")
         //    	};
           
		       //  });

	        //         		       }
	             
	        //         	   });
	        //        });
              
         //     };
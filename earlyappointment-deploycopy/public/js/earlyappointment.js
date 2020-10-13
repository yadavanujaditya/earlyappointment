$(".updateForm").addClass("hide")
$(".pauseForm").addClass("hide")

$(".updateButton").on("click",function(){
	$(this).toggleClass("paused")
	$(".updateForm").toggleClass("show")
	$("table").toggleClass("hide")
	// $(".hidetable").toggleclass("hidetable")
})


$(".getButton").addClass("secretColor")
$(".doneButton").addClass("paused")


 // $("#getAppointment").on("change",function(){ 	 	
 //      var z=$("#mobileNumber").val().toString()
 //      console.log(z.length)
 //        console.log(z)
 //        if(z.length!==10){
 //        	$("#mobileNumber").attr("placeholder","Enter Correct Mobile Number")
 //        	// $("#mobileNumber").val()
 //       }
 // 	 })
      















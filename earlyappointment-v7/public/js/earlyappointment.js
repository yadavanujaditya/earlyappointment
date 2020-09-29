//  var k=new Date;
//  var parsedDate=Date.parse(k);
//  var storeTemporary=new Date(parsedDate)
//  var  enteredDate=newDateString(storeTemporary);
//  function newDateString(date){
//       var a =date.getDate().toString()+"-";
//       var b =(date.getMonth()+1).toString()+"-";
//       var c=date.getFullYear().toString();
//       return a+b+c;
// }


 
   // $(".bgcolor").css("color","pink");
   //      function blink_text(){
   //        $(".bgcolor").fadeOut(500);
   //        $(".bgcolor").fadeIn(500);
   //      }
   //      setInterval(blink_text, 1000);
        // setInterval(1000,function(){
        // 	$(".bgcolor").css("color","pink");
        // });

// $("#datepickerForm").datepicker('setDate',new Date());

// $("input").keypress(function(){
// 	if(event.which===13){
// 		var d=$(this).val()
// 		$(this).val(d)
// 		var parsedDate=Date.parse(d);
// 		var storeTemporary=new Date(parsedDate);
// 		var  enteredDate=newDateString(storeTemporary);	
// 	  console.log(enteredDate)
// 	}
// })


// ====================================================
// secret form java script
// =====================================================
$(".updateForm").addClass("hide")
$(".pauseForm").addClass("hide")
// $("#remove").addClass("hide")
// $("table").toggleclass("show")

$(".updateButton").on("click",function(){
	$(".updateForm").toggleClass("show")
	$("table").toggleClass("hide")
	// $(".hidetable").toggleclass("hidetable")
})


$(".pauseButton").on("click",function(){
	$(this).toggleClass("paused")
	// $(".pauseForm").toggleClass("show")

})


// $("ul").on("click","li",function(){
//        $(this).toggleClass("completed")
// })


$(".secretDate").click(function(){
	var secretDate=(this).val()
	console.log(secretDate)
})
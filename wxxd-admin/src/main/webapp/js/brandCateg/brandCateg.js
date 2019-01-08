function getInsertValueRange(){
	  var brandCode = $("#brandCode").val();
	  var categCode = $("#categCode").val();
	  var thresholdCode=$("#thresholdCode").val();
	  var interceptCode=$("#interceptCode").val();
	  var priorityCode=$("#priorityCode").val();
	  if(brandCode!=""&&categCode!=""&&thresholdCode!="-1"&&interceptCode!="-1"&&priorityCode!="-1"){
		  $.ajax({
		         type:"POST",
		         url: serverPath+"/brandcateg/getValueRange.action",
		         data: {"brandCode":brandCode,"categCode":categCode,"thresholdCode":thresholdCode,"interceptCode":interceptCode,"priorityCode":priorityCode},
		         success: function(msg){
		            $("#addRang").text("阀值取值范围:"+msg);
		         } 
		      });
	  }
}
var currentStep=0;
var max_line_num=$("#picListcon tr").size();

function remove_line(){  
  $("#content tr").each(
    function(){
	  var seq=parseInt($(this).children("td").html());
	  if(seq==currentStep) $(this).remove();
	  if(seq>currentStep) $(this).children("td").each(function(i){if(i==0)$(this).html(seq-1);});
	}
  );
  currentStep=0;
}
function up_exchange_line(){ 
  if(currentStep==0){
    alert('请选择一项!');
	return false;
  }
  if(currentStep<=1){
     alert('已经到顶!');
	 return false;
  }
  var upStep=currentStep-1;
  
  //取得两行的内容
  var upContent=$('#line'+upStep).html();
  var currentContent=$('#line'+currentStep).html();
  $('#line'+upStep).html(currentContent);
  //交换当前行与上一行内容
  $('#line'+currentStep).html(upContent);  
  //修改序号
  $('#line'+upStep).children("td").find("input[name='indexs']").val(upStep); 
  $('#line'+currentStep).children("td").find("input[name='indexs']").val(currentStep);
  $('#content tr').each(function(){$(this).children("td:first").css("background-color","#ffffff");});
  $('#line'+upStep).children("td:first").css("background-color","#ffff80"); 
  currentStep=upStep;
}
function down_exchange_line(){
 
 if(currentStep==0){
    alert('请选择一项!');
	return false;
 }
 if(currentStep>=max_line_num){
     alert('已经到底!');
	 return false;
  }
  var nextStep=parseInt(currentStep)+1;
  
  //取得两行的内容
  var nextContent=$('#line'+nextStep).html();
  var currentContent=$('#line'+currentStep).html();
  $('#line'+nextStep).html(currentContent);
  //交换当前行与上一行内容
  $('#line'+currentStep).html(nextContent);  
  //修改序号
  $('#line'+nextStep).children("td").find("input[name='indexs']").val(nextStep);
  $('#line'+currentStep).children("td").find("input[name='indexs']").val(currentStep);
  $('#content tr').each(function(){$(this).children("td:first").css("background-color","#ffffff");});
  $('#line'+nextStep).children("td:first").css("background-color","#ffff80"); 
  currentStep=nextStep;
}
function lineClick(line){
   $('#picListcon tr').each(function(){$(this).children("td:first").css("background-color","#ffffff");});
   var seq=$(line).children("td").find("input[name='indexs']").val();
   $(line).children("td:first").css("background-color","#ffff80");
   currentStep=seq;
}

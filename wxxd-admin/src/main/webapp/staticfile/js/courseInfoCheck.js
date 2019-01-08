//提交时检验所填内容
function submitCheck(){
	if($("#courseName").val().length == 0){
		$("#courseName").focus();
		$("#courseName").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程名');
		return false;
	}
	if($("#lecturerName").val().length == 0){
		$("#lecturerName").focus();
		$("#lecturerName").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写讲师名');
		return false;
	}
	if($("#source").val().lentth == 0){
		$("#source").focus();
		$("#source").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程来源');
		return false;
	}
	if($("#briefIntroduction").val().length == 0){
		$("#briefIntroduction").focus();
		$("#briefIntroduction").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程简介');
		return false;
	}else if($("#briefIntroduction").val().length > 300){
		$("#briefIntroduction").focus();
		$("#briefIntroduction").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;课程简介不能超过300字');
		return false;
	}
	if($("#courseflag").val() == "0"){
		if($("#courseType1").is(":checked") || $("#courseType2").is(":checked") || $("#courseType3").is(":checked")){
			$("#videoTab").find(".tip").html("");
		}else{
			$("#videoTab").focus();
			$("#videoTab").find(".tip").html('<em class="tipFalse4"></em>&nbsp;请选择课程类型');
			return false;
		}
	}
	$(".tip").html("");
	return true;
}

function checkInfo(){
	//课程名判断
	$("#courseName").blur(
		function(){
		if($("#courseName").val().length == 0){
			$("#courseName").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程名');
		}
		}
	);
	
	$("#courseName").focus(
		function(){
			$("#courseName").parent().find(".tip").html("");
		}
	);
	
	//讲师名判断
	$("#lecturerName").blur(
		function(){
		if($("#lecturerName").val().length == 0){
			$("#lecturerName").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写讲师名');
		}
	});
	
	$("#lecturerName").focus(
		function(){
			$("#lecturerName").parent().find(".tip").html("");
		}
	);
	
	//课程来源判断
	$("#source").blur(
		function(){
		if($("#source").val().length == 0){
			$("#source").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程来源');
		}	
	});
	
	$("#source").focus(
		function(){
			$("#source").parent().find(".tip").html("");
		}
	);
	
	//课程简介判断
	$("#briefIntroduction").blur(
		function(){
		if($("#briefIntroduction").val().length == 0){
			$("#briefIntroduction").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;请填写课程简介');	
		}else if($("#briefIntroduction").val().length > 300){
			$("#briefIntroduction").parent().find(".tip").html('<em class="tipFalse4"></em>&nbsp;课程简介不能超过300字');
		}
	});
	
	$("#briefIntroduction").focus(
		function(){
			$("#briefIntroduction").parent().find(".tip").html("");
		}
	);
}

//输入框字符数限定
function txtCount(txt,num,count){
	$(txt).keyup(function(){
		var l = $(this).val().length;
		if(l>=count){
			var str = $(this).val().substr(0,count);
			$(this).val(str);
			$(num).html(count);
		}else{
			$(num).html(l);		
		}
	});
}
$(function(){
	checkInfo();
	txtCount("#briefIntroduction","#num",300);
});
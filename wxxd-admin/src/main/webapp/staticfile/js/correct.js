$(document).ready(function(){
	if($("img[class=on]").attr("value") && $("img[class=on]").attr("value").trim() != ""){
		$("#correctStatus1").show();
	}
});
function viewPicCorrectValue(){
	$("#errorMessa1").html("");
	$("#imgId1").hide();
	$("#error-resason1").html("");
	$("#picSrc").attr("src","");
	$("#picSrc").attr("title","");
	$("#failthReason1").val("");
	$("#failthReason2").val("");
	var picProductCode = $("img[class=on]").attr("productcode");
	//var picProductCode = picSrc.substring(picSrc.indexOf("_")-9,picSrc.indexOf("_"));
	var picPosition = $("img[class=on]").attr("position");
	var resultCode = "pic_"+picProductCode+"_"+picPosition;
	$("#correctPicCode").val(resultCode);
	var failthReason = "";
	if($("#"+resultCode).val() != undefined){
		var correctBasicParamValueStr = $("#"+resultCode).val().split("|");
		if(correctBasicParamValueStr.length == 2 && correctBasicParamValueStr[0] != "11"){
			failthReason = correctBasicParamValueStr[1];
			$("#rejectReson2").show();
		}
	}
	$("#failthReason2").val(failthReason);
	$("#failthReason2").html(failthReason);
	var chooseValue = $("img[class=on]").attr("value");
	var chooseValueStr = chooseValue.split("|");
	if(chooseValueStr.length == 3){
		var correctPicPath = chooseValueStr[0];
		var correctReason = chooseValueStr[1].replace(/\n/g, '<br/>');
		$("#error-resason1").html(correctReason);
		$("#picSrc").attr("src",correctPicPath);
		$("#picSrc").attr("title",correctPicPath);
		ShowMiddle();
		myOpen.uCenter.popOpen('MUC_pop16', myOpen.uCenter.pop16);
	}
}

function ShowMiddle(){
    var winWidth = $(window).width();//获取屏幕宽度
    var winHeight = $(document.body).height();//获取屏幕高度
    $('#layer').width(winWidth);
    $('#layer').height(winHeight);
    $('#layer').css({
        "position":"absolute",
        "background":"#333",
        "filter":"alpha(opacity=30)",
        "opacity":0.3,
        "left":0,
        "top":0,
        "display":"block"
    });
 }

function popClose(){
	$('#layer').css("display","none");
	$("#rejectReson1").hide();
	$("#rejectReson2").hide();
	myOpen.uCenter.popClose();
}

//图片处理
function approvePic(status){
	var picSrc = $("#picSrc").attr("title"); 
	var correctParamCode = $("#correctPicCode").val();
	if(status == "1"){
		$("#"+correctParamCode).val("11"+"|"+picSrc);
		$('#layer').css("display","none");
		myOpen.uCenter.popClose();
	}else{
		var failthReason1 = $("#failthReason2").val();
		if(failthReason1.trim() == ""){
			$("#errorMessa1").html("驳回原因不能为空！");
			$("#imgId1").show();
		}else if(failthReason1.length > 100){
			$("#errorMessa1").html("驳回原因不能超过100个字！");
			$("#imgId1").show();
		}else{
			$("#"+correctParamCode).val("12|"+failthReason1);
			$('#layer').css("display","none");
			myOpen.uCenter.popClose();
		}
	}
}

function viewParamCorrectValue(obj){
	var correctBasicParamValue = $(obj).siblings("#correctBasicParamValue").val();
	var correctBasicParamCode = $(obj).siblings(".correctBasicParamCode").attr("id");
	var correctBasicParamValueStr = $(obj).siblings(".correctBasicParamCode").val().split("|");
	var correctReason = $(obj).siblings("#correctReason").val().replace(/\n/g, '<br/>');
	var failthReason = "";
	if(correctBasicParamValueStr.length == 2){
		failthReason = correctBasicParamValueStr[1].replace(/\n/g, '<br/>');
	}
	var picPath1 = $(obj).siblings("#picPath1").val();
	var picPath2 = $(obj).siblings("#picPath2").val();
	var picPath3 = $(obj).siblings("#picPath3").val();
	var paramName = $(obj).siblings(".correctBasicParamCode").attr("title");
	$("#contentDetailCorrectValueTd").css("width","90px");
	commonCorrect(correctBasicParamValue,correctReason,failthReason,picPath1,picPath2,picPath3,paramName,correctBasicParamCode);
}

//通过1、驳回2处理
function approve(status){
	var correctParamCode = $("#correctParamCode").val();
	if(status == "1"){
		if(correctParamCode.indexOf("CP_") == 0){
			var startValue = $("#"+correctParamCode).val();
			$("#"+correctParamCode).val("11|"+startValue);
		}else{
			$("#"+correctParamCode).val("11");
		}
		$('#layer').css("display","none");
		myOpen.uCenter.popClose();
	}else{
		var failthReason1 = $("#failthReason1").val();
		if(failthReason1.trim() == ""){
			$("#errorMessa").html("驳回原因不能为空！");
			$("#imgId").show();
		}else if(failthReason1.length > 100){
			$("#errorMessa").html("驳回原因不能超过100个字！");
			$("#imgId").show();
		}else{
			$("#"+correctParamCode).val("12|"+failthReason1);
			$('#layer').css("display","none");
			myOpen.uCenter.popClose();
		}
	}
}

function viewInsertPicCorrectValue(obj){
	$("#errorMessa1").html("");
	$("#imgId1").hide();
	$("#error-resason1").html("");
	$("#picSrc").attr("src","");
	$("#picSrc").attr("title","");
	$("#failthReason1").val("");
	$("#failthReason2").val("");
	var resultCode = $(obj).siblings("img").attr("code");
	$("#correctPicCode").val(resultCode);
	var failthReason = "";
	if($("#"+resultCode).val() != undefined){
		var correctBasicParamValueStr = $("#"+resultCode).val().split("|");
		if(correctBasicParamValueStr.length == 2 && correctBasicParamValueStr[0] != "11"){
			failthReason = correctBasicParamValueStr[1];
			$("#rejectReson2").show();
		}
	}
	$("#failthReason2").val(failthReason);
	$("#failthReason2").html(failthReason);
	var chooseValue = $(obj).siblings("img").attr("value");
	var chooseValueStr = chooseValue.split("|");
	if(chooseValueStr.length == 3){
		var correctPicPath = chooseValueStr[0];
		var correctReason = chooseValueStr[1];
		$("#error-resason1").html(correctReason);
		$("#picSrc").attr("src",correctPicPath);
		$("#picSrc").attr("title",correctPicPath);
		ShowMiddle();
		myOpen.uCenter.popOpen('MUC_pop16', myOpen.uCenter.pop16);
	}
}

function querySubmit(){
    var cform = $("#conditionForm");
    var url = "showThresholdconfig.action";
    cform.attr("action",url);
    cform.submit();
}


function openAddWin(c){
	$("#thresholdconfigEdit").hide();
	var grayLayer = $("#grayLayer");
	grayLayer.css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	grayLayer.find("iframe").css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	var obj = $("."+c);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
}

function addThresholdConfig(){
	var thresholdCode = $("#thresholdCode3").val();
	var thresholdDesc = $("#thresholdDesc3").val();
	var isOn = $("#isOn3").val();
	
	$("#addSpan").empty();
	if (validateEmpty($("#thresholdCode3"), $("#addSpan"), "阈值类型不能为空")) {
		return;
	}
	
	if (validateEmpty($("#thresholdDesc3"), $("#addSpan"), "阈值描述不能为空")) {
		return;
	}
	
	if (validateEmpty($("#isOn3"), $("#addSpan"), "是否开关不能为空")) {
		return;
	}
	if (validateLength($("#thresholdCode3"),18 ,$("#addSpan"), "阈值类型不能大于18位！")) {
		return;
	}
	
	if (validateLength($("#thresholdDesc3"),100 ,$("#addSpan"), "阈值描述不能大于100位！")) {
		return;
	}
	
	if (validateLength($("#isOn3"),4 ,$("#addSpan"), "是否开关不能大于4位！")) {
		return;
	}
	
	/**
	 * 校验阈值类型是否重复
	 */
	$.ajax({
		type:"POST",
		url:"queryThresholdConfig.action",
		data:{'thresholdCode':thresholdCode},
		success:function(flag){
			if(flag == '1'){
				$("#addSpan").empty();
				$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">阈值类型不能重复</i>');
				$("#thresholdCode3").focus();
			}else{
				/**
				 * 新增阈值管控开关
				 */
				$.ajax({
						type:"POST",
						url:"addThresholdConfig.action",
						data:{'thresholdCode':thresholdCode,'thresholdDesc':thresholdDesc,'isOn':isOn},
						success:function(flag){
							if(flag == '1'){
								$("#thresholdCode3").attr("disabled",true);
								$("#thresholdCode3")[0].onmouseout=function onclick(event) {};
								$("#thresholdDesc3").attr("disabled",true);
								$("#isOn3").attr("disabled",true);
								$("#asbtn")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								$("#aqbtn")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								$("#divaem")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								showMsg("success","保存成功！",function(){
									window.location.href="showThresholdconfig.action";
								});
							} else {
								$("#thresholdCode3").attr("disabled",true);
								$("#thresholdCode3")[0].onmouseout=function onclick(event) {};
								$("#thresholdDesc3").attr("disabled",true);
								$("#isOn3").attr("disabled",true);
								$("#asbtn")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								$("#aqbtn")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								$("#divaem")[0].onclick=function onclick(event) {
									$("#addSpan").empty();
									$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
								};
								showMsg('failure','保存失败！',function(){
									window.location.href="showThresholdconfig.action";
								});
							}
						}
				});
			}
		}
	});
	
}

function reloadWin() {
	location.reload();
}

function openEditWin(obj){
	var tr = $(obj).parent().parent().parent();
    var tds = tr.find("td");
    var id = tr.find("input[type=checkbox][name=thresholdCheckBox]").val();
    var isOn = tds[3].innerHTML;
    var thresholdCode = tds[4].innerHTML;
    var thresholdDesc = tds[5].innerHTML;
	$("#thresholdconfigAdd").hide();
	var grayLayer = $("#grayLayer");
	grayLayer.css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	grayLayer.find("iframe").css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	var thresholdconfigEditWin = $("#thresholdconfigEdit");
	$("#id2").val(id);
	$("#thresholdCode2").val(thresholdCode);
    $("#thresholdDesc2").val(thresholdDesc);
    $("#isOn2").val(isOn);
    $("#oldThresholdCode").val(thresholdCode);
    $("#oldThresholdDesc").val(thresholdDesc);
    $("#oldIsOn").val(isOn);
    thresholdconfigEditWin.show();
    thresholdconfigEditWin.css({top:($(window).height()-thresholdconfigEditWin.height())/2+$(window).scrollTop()+"px"});
}

function closeAddWin(c)
{
	var grayLayer = $("#grayLayer");
	grayLayer.hide();
	$("#thresholdCode3").val("");
	$("#thresholdDesc3").val("");
	document.getElementById("isOn3").value="Y";
	$("#addSpan").empty();
	$("#"+c).hide();
}

function closeEditWin(c)
{
	var grayLayer = $("#grayLayer");
	grayLayer.hide();
	$("#updateSpan").empty();
	$("#"+c).hide();
}

function updateThresholdConfig(){
    var id = $("#id2").val();
    var thresholdCode =$("#thresholdCode2").val();
	var thresholdDesc = $("#thresholdDesc2").val();
	var isOn = $("#isOn2").val();
	var oldThresholdCode =$("#oldThresholdCode").val();
	var oldThresholdDesc =$("#oldThresholdDesc").val();
	var oldIsOn = $("#oldIsOn").val();
	$("#updateSpan").empty();
	if (validateEmpty($("#thresholdCode2"), $("#updateSpan"), "阈值类型不能全为空")) {
		return;
	}
	
	if (validateEmpty($("#thresholdDesc2"), $("#updateSpan"), "阈值描述不能为空")) {
		return;
	}
	
	if (validateEmpty($("#isOn2"), $("#updateSpan"), "是否开关不能为空")) {
		return;
	}
	
	if (validateLength($("#thresholdCode2"),18 ,$("#updateSpan"), "阈值类型不能大于18位！")) {
		return;
	}
	
	if (validateLength($("#thresholdDesc2"),100 ,$("#updateSpan"), "阈值描述不能大于100位！")) {
		return;
	}
	
	if (validateLength($("#isOn2"),4 ,$("#updateSpan"), "是否开关不能大于4位！")) {
		return;
	}
	$.ajax({
			type:"POST",
			url:"updateThresholdConfig.action",
			data:{'id':id,'thresholdCode':thresholdCode,'thresholdDesc':thresholdDesc,'isOn':isOn
				,'oldThresholdCode':oldThresholdCode,'oldThresholdDesc':oldThresholdDesc,
				'oldIsOn':oldIsOn},
			success:function(flag){
				if(flag > 0){
					$("#thresholdDesc2").attr("disabled",true);
					$("#isOn2").attr("disabled",true);
					$("#msbtn")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					$("#closethresholdconfigEditBtn")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					$("#divmem")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					showMsg("success","修改成功！",function(){
						window.location.href="showThresholdconfig.action";
					});
				}else{
					$("#thresholdDesc2").attr("disabled",true);
					$("#isOn2").attr("disabled",true);
					$("#msbtn")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					$("#closethresholdconfigEditBtn")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					$("#divmem")[0].onclick=function onclick(event) {
						$("#updateSpan").empty();
						$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">已提交！请点击确定后再次操作。</i>');
					};
					showMsg('failure','修改失败！',function(){
						window.location.href="showThresholdconfig.action";
					});
				}
			}
	});
}

function delOne(obj){
	myOpen.showWin.confirm("Pop7","确认删除？",function (flag){
		if(flag){
			closeWin('Pop7');
			var tr = $(obj).parent().parent().parent();
		    var tds = tr.find("td");
		    var id = tr.find("input[type=checkbox][name=thresholdCheckBox]").val();
		    var isOn = tds[3].innerHTML;
		    var thresholdCode = tds[4].innerHTML;
		    var thresholdDesc = tds[5].innerHTML;
			/**
			 * 删除阈值管控开关
			 */
			$.ajax({
				type:"POST",
				url:"thresholdConfigDel.action",
				data:{'id':id,'thresholdCode':thresholdCode,'thresholdDesc':thresholdDesc,'isOn':isOn},
				success:function(flag){
					if(flag == '1'){
						showMsg('success','删除成功！',function(){
							window.location.href="showThresholdconfig.action";
						});
					} else {
						closeWin('Pop7');
						showMsg('failure','删除失败！',function(){
							window.location.href="showThresholdconfig.action";
						});
					}
				}
			});
		
		}
	}) ;

}

function delAll(){
	var selectedCheckBoxes = $("input[type=checkbox][name=thresholdCheckBox]:checked");
	
	if(selectedCheckBoxes.length<=0){
		showMsg('warn','请选择一条数据！')
		return;
	}
	myOpen.showWin.confirm("Pop7","确认删除？",function (flag){
		if(flag){
			closeWin('Pop7');
			var tr = $(selectedCheckBoxes[0]).parent().parent();
			var tds = tr.find("td");
		    var isOn = tds[3].innerHTML;
		    var thresholdCode = tds[4].innerHTML;
		    var thresholdDesc = tds[5].innerHTML;
			var id = selectedCheckBoxes[0].value+"," + thresholdCode+","+thresholdDesc+","+isOn;
			for (var i = 1; i < selectedCheckBoxes.length; i++) {
				var tr = $(selectedCheckBoxes[i]).parent().parent();
				var tds = tr.find("td");
			    var isOn = tds[3].innerHTML;
			    var thresholdCode = tds[4].innerHTML;
			    var thresholdDesc = tds[5].innerHTML;
				id = id + "#"+selectedCheckBoxes[i].value+"," + thresholdCode+","+thresholdDesc+","+isOn;
			}
			$.ajax({
				type:"POST",
				url:"thresholdConfigBatchDel.action",
				data:{"id":id},
				success:function(flag){
					if(flag == '1'){
						showMsg('success','删除成功！',function(){
							window.location.href="showThresholdconfig.action";
						});
					}else{
						closeWin('Pop7');
						showMsg('failure','删除失败！',function(){
							window.location.href="showThresholdconfig.action";
						});
					}
				}
			});
		
		}
	}) ;
	
}

function validateEmpty(item, display, errMessage) {
	var itemVal = item.val();
	
	if ((itemVal == null || itemVal == '')) {
		display.empty();
		display.append('<em class="tipFalse4"></em><i class="hongse">' + errMessage + '</i>');
		item.focus();
		return true;
	}
	
	return false;
}

function validateLength(item,len, display, errMessage) {
	var itemVal = item.val();
	if (itemVal.length > len ) {
		display.empty();
		display.append('<em class="tipFalse4"></em><i class="hongse">' + errMessage + '</i>');
		item.focus();
		return true;
	}
	return false;
}

function fileUpload(){
	$("#result").remove();
	var filePath=$("#file").val();
	var index=filePath.lastIndexOf(".");
	var str=filePath.substring(index+1,filePath.length).toLowerCase();
	if(str!='txt'&&str!='csv'&&str!='xls'&&str!='xlsx'){
		showMsg("warn","请上传txt,csv,xls,xlsx格式文件!") ;
		return;
	}
	$("#fileUploadForm").submit();
}  


function checkThresholdCode(){
	var thresholdCode = $("#thresholdCode3").val();
	$("#addSpan").empty();
	if (thresholdCode == null || thresholdCode == '') {
		return;
	}	
	/**
	 * 校验阈值类型是否重复
	 */
	$.ajax({
		type:"POST",
		url:"queryThresholdConfig.action",
		data:{'thresholdCode':thresholdCode},
		success:function(flag){
			if(flag == '1'){
				$("#addSpan").empty();
				$("#addSpan").append('<em class="tipFalse4"></em><i class="hongse">阈值类型不能重复</i>');
				$("#thresholdCode3").focus();
			}
		}
	});
}
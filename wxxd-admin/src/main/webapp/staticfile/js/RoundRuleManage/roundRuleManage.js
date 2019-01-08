function checkAllRule(obj){
	$("input[type=checkbox][name=Id]").attr("checked",obj.checked);
}
var checkfalg=0;
function check(){
	var rule = $("#rule").val();
    var categCode = $("#categCode").val();
    var brandCode = $("#brandCode").val();
    if (rule=="" && categCode=="" && brandCode==""){
	    alert("至少输入一个参数！");
         return;
    }
  checkfalg=1;     
}

function querySubmit(){
    check();
    if(checkfalg==0) {
        return;
    }
    var cform = $("#conditionForm");
    var url = "roundRuleManageQuery.action";
    cform.attr("action",url);
    cform.submit();
}

function querySubmitClearDB(){
	if (!confirm("确认要清除DB？")) {
        return;
    }
    $.ajax({
		type:"POST",
		url:"roundRuleManageClearDB.action",
			data:{},
			success:function(flag){
				if(flag > 0){
					alert('清除数据库成功!');
					querySubmit();
			}else{
					alert('清除数据库成功!');
					querySubmit();
			}
		}
	});
}

function querySubmitClearCache(){
	if (!confirm("确认要清除缓存？")) {
        return;
    }
    $.ajax({
		type:"POST",
		url:"roundRuleManageClearCache.action",
			data:{},
			success:function(flag){
				if(flag > 0){
					alert('清除缓存成功!');
					querySubmit();
			}else{
					alert('清除缓存成功!');
					querySubmit();
			}
		}
	});
}

function delUser(){
	var selectedCheckBoxes = $("input[type=checkbox][name=Id]:checked");
	if(selectedCheckBoxes.length<=0){
		alert("请选择一条记录！");
		return;
	}
	var id = selectedCheckBoxes[0].value;
	if (!confirm("确认要删除？")) {
            return;
    }
	for (var i = 1;i<selectedCheckBoxes.length;i++) {
		id = id + "#" +selectedCheckBoxes[i].value;
	}
	$.ajax({
		type:"POST",
		url:"roundRuleManageBatchDel.action",
			data:{"id":id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					querySubmit();
			}else{
					alert('删除失败!');
					querySubmit();
			}
		}
	});
}

function delOne(id){
	$.ajax({
			type:"POST",
			url:"roundRuleManageDel.action",
			data:{'id':id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					querySubmit();
				}
			}
	});
}


var reBool = false;
function valBrandCode(){
	var categCode = $("#categCode3").val();
	var brandCode = $("#brandCode3").val();
	if ((categCode == null || categCode == '') && (brandCode == null || brandCode == '')) {
	    $("#CodeSpan").empty();
		$("#CodeSpan").append('<em class="tipFalse4"></em><i class="hongse">商品类目和产品层次不能全为空</i>');
		return false;
	} else {
	    $("#CodeSpan").empty();
		$("#CodeSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"roundRuleManageCount.action",
		data:{'categCode':categCode,'brandCode':brandCode},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#CodeSpan").empty();
				$("#CodeSpan").append('<em class="tipOK4"></em>');
				reBool = true;
			} else {
			    $("#CodeSpan").empty();
				$("#CodeSpan").append('<em class="tipFalse4"></em><i class="hongse">层次已存在</i>');
				reBool = false;
			}
		}
	});
	return reBool;
}

function addUser(){
	var categCode = $("#categCode3").val();
	var brandCode = $("#brandCode3").val();
	var rule = $("#rule3").val();
	var description = $("#description3").val();
	if ((categCode == null || categCode == '') && (brandCode == null || brandCode == '')) {
	    $("#CodeSpan").empty();
		$("#CodeSpan").append('<em class="tipFalse4"></em><i class="hongse">商品类目和产品层次不能全为空</i>');
		return;
	} else {
	    $("#CodeSpan").empty();
		$("#CodeSpan").append('<em class="tipTxt"></em>');
	}
	if(!reBool){
		$("#CodeSpan").empty();
		$("#CodeSpan").append('<em class="tipFalse4"></em><i class="hongse">层次已存在：请修改</i>');
		return;
	}


	$.ajax({
			type:"POST",
			url:"roundRuleManageAdd.action",
			data:{'categCode':categCode,'brandCode':brandCode,'rule':rule,'description':description},
			success:function(flag){
				if(flag == '1'){
					alert('新增成功!');
					querySubmit();
				}
			}
	});
}

function openWin(c){
	var obj = $("."+c);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
};

function openEditWin(obj,id){
	var userEditWin = $("#userEdit");
	$("#closeUserEditBtn").click(function(){
			userEditWin.hide();
			$(obj).find("span").text("修改");
			$(obj).removeClass("tijiao");
			$(obj).addClass("goback");
		});
	$.ajax({
			type:"POST",
			url:"roundRuleManageUpdateForDate.action",
			data:{'id':id},
			success:function(flag){
                var zhi = eval("(" + flag + ")");
                $("#categCode2").val(zhi.categCode);
                $("#categCodeHidden").val(zhi.categCode);
                $("#brandCode2").val(zhi.brandCode);
                $("#brandCodeHidden").val(zhi.brandCode);
                $("#rule2").val(zhi.rule);
                $("#description2").val(zhi.description);
                $("#id2").val(zhi.id);
			}
	});

	userEditWin.show();
	userEditWin.css({top:($(window).height()-userEditWin.height())/2+$(window).scrollTop()+"px"});
}

function closeEditWin(c)
{
	$("#"+c).hide();
}

var reBool2 = false;
function valBrandCode2(){
	var categCode = $("#categCode2").val();
	var brandCode = $("#brandCode2").val();
	var categCodeHidden = $("#categCodeHidden").val();
	var brandCodeHidden = $("#brandCodeHidden").val();
	if ((categCode == null || categCode == '') && (brandCode == null || brandCode == '')) {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">商品类目和产品层次不能全为空</i>');
		return false;
	} else {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"roundRuleManageCount.action",
		data:{'categCode':categCode,'brandCode':brandCode},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#updateSpan").empty();
				$("#updateSpan").append('<em class="tipOK4"></em>');
				reBool2 = true;
			} else {
			    $("#updateSpan").empty();
			    if(categCodeHidden == categCode && brandCode == brandCodeHidden) {
			    	$("#updateSpan").append('<em class="tipOK4"></em>');
			    	reBool2 = true;
			    } else {
			    	$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">层次已存在</i>');
			    	reBool2 = false;
			    }
			}
		}
	});
	
	return reBool2;
}

function updateRule(){
    var id = $("#id2").val();
    var categCode =$("#categCode2").val();
	var brandCode = $("#brandCode2").val();
	var rule = $("#rule2").val();
	var description = $("#description2").val();
	
	$("#updateSpan").empty();
	if ((categCode == null || categCode == '') && (brandCode == null || brandCode == '')) {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">商品类目和产品层次不能全为空</i>');
		return;
	}
	
	if (rule == null || rule == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">规则不能为空</i>');
		return false;
	} 
	if(!reBool2){
		$("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">层次已存在：请修改</i>');
		return;
	}
	$.ajax({
			type:"POST",
			url:"roundRuleManageUpdate.action",
			data:{'id':id,'categCode':categCode,'brandCode':brandCode,'rule':rule,'description':description},
			success:function(flag){
				if(flag > 0){
					alert('修改成功!');
					querySubmit();
				}else{
					alert('修改失败!');
					querySubmit();
				}
			}
	});
}

function fileUpload(){
	var filePath=$("#file").val();
	var index=filePath.indexOf(".");
	var str=filePath.substring(index+1,filePath.length);
	if(str!='txt'&&str!='csv'&&str!='xls'&&str!='xlsx'){
		alert('请上传txt,csv,xls,xlsx文件!');
		return;
	}
	$("#fileUploadForm").submit();
}  
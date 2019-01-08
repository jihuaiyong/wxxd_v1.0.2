
function checkAll(obj){
	$("input[type=checkbox][name=Id]").attr("checked",obj.checked);
}

function delUser(){
	var selectedCheckBoxes = $("input[type=checkbox][name=Id]:checked");
	var id = selectedCheckBoxes[0].value;
	if(selectedCheckBoxes.length<=0){
		alert("请选择一条记录！");
		return;
	}
	if (!confirm("确认要删除？")) {
            return;
        }
	for (var i = 1;i<selectedCheckBoxes.length;i++) {
		id = id + "#" +selectedCheckBoxes[i].value;
	}
	$.ajax({
		type:"POST",
		url:"cacheTtlManageBatchDel.action",
			data:{"id":id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					doSearch();
			}else{
					alert('删除失败!');
					doSearch();
			}
		}
	});
}

var reBool = false;
function valDeployKey(){
	var deployKey = $("#deployKey").val();
	if (deployKey == null || deployKey == '') {
	    $("#deployKeySpan").empty();
		$("#deployKeySpan").append('<em class="tipFalse4"></em><i class="hongse">Key不能为空</i>');
		return false;
	} else {
	    $("#deployKeySpan").empty();
		$("#deployKeySpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"cacheTtlManageCount.action",
		data:{'deployKey':deployKey},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#deployKeySpan").empty();
				$("#deployKeySpan").append('<em class="tipOK4"></em>');
				reBool = true;
			} else {
			    $("#deployKeySpan").empty();
				$("#deployKeySpan").append('<em class="tipFalse4"></em><i class="hongse">Key已存在</i>');
				reBool = false;
			}
		}
	});
	return reBool;
}

function addUser(){
	if("" == $("deployKey").val()){
		$("#deployKeySpan").empty();
		$("#deployKeySpan").append('<em class="tipFalse4"></em><i class="hongse">Key不能为空</i>');
		return;
	}
	if(!reBool){
		$("#deployKeySpan").empty();
		$("#deployKeySpan").append('<em class="tipFalse4"></em><i class="hongse">Key已存在：请修改</i>');
		return;
	}
	var deployName = $("#deployName").val();
	var deployKey = $("#deployKey").val();
	var deployValue = $("#deployValue").val();
	var deployType = $("#deployType").val();

	$.ajax({
			type:"POST",
			url:"cacheTtlManageAdd.action",
			data:{'deployName':deployName,'deployKey':deployKey,'deployValue':deployValue,'deployType':deployType},
			success:function(flag){
				if(flag == '1'){
					alert('新增成功!');
					doSearch();
				}
			}
	});
}

function delOne(id){
	$.ajax({
			type:"POST",
			url:"cacheTtlManageDel.action",
			data:{'id':id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					doSearch();
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
			url:"cacheTtlManageUpdateForDate.action",
			data:{'id':id},
			success:function(flag){
                var zhi = eval("(" + flag + ")");
                $("#deployName2").val(zhi.deployName);
                $("#deployKeyHidden").val(zhi.deployKey);
                $("#deployKey2").val(zhi.deployKey);
                $("#deployValue2").val(zhi.deployValue);
                $("#deployType2").val(zhi.deployType);
                $("#deleteFlag2").val(zhi.deleteFlag);
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
function valDeployKey2(){
	var deployKey = $("#deployKey2").val();
	var deployKeyHidden = $("#deployKeyHidden").val();
	if (deployKey == null || deployKey == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">Key不能为空</i>');
		return false;
	} else {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"cacheTtlManageCount.action",
		data:{'deployKey':deployKey},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#updateSpan").empty();
				$("#updateSpan").append('<em class="tipOK4"></em>');
				reBool2 = true;
			} else {
				$("#updateSpan").empty();
				if(deployKeyHidden == deployKey) {
			    	$("#updateSpan").append('<em class="tipOK4"></em>');
			    	reBool2 = true;
			    } else {
			    	$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">key已存在：请修改</i>');
			    	reBool2 = false;
			    }
			}
		}
	});
	return reBool2;
}


function checkBeforeUpdate(){
	var deployKey = $("#deployKey2").val();
	var deployKeyHidden = $("#deployKeyHidden").val();
	$.ajax({
		type:"POST",
		url:"cacheTtlManageCount.action",
		data:{'deployKey':deployKey},
		async:false,
		success:function(flag){
			if (flag <=0) {
				reBool2 = true;
			} else {
				$("#updateSpan").empty();
				if(deployKeyHidden == deployKey) {
			    	reBool2 = true;
			    } else {
			    	reBool2 = false;
			    }
			}
		}
	});
	return reBool2;
}

function updateTtl(){
    var id = $("#id2").val();
    var deployName =$("#deployName2").val();
	var deployKey = $("#deployKey2").val();
	var deployValue = $("#deployValue2").val();
	var deployType = $("#deployType2").val();
	var deleteFlag = $("#deleteFlag2").val();
	
	$("#updateSpan").empty();
	if (deployKey == null || deployKey == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">Key不能为空</i>');
		return false;
	} 
	
	if (deployName == null || deployName == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">Name不能为空</i>');
		return false;
	} 
	
	if (deployValue == null || deployValue == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">Value不能为空</i>');
		return false;
	} 
	
	if (deployType == null || deployType == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">Type不能为空</i>');
		return false;
	}
	checkBeforeUpdate();
	if(!reBool2){
		$("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">key已存在：请修改</i>');
		return;
	}
	
	
	$.ajax({
			type:"POST",
			url:"cacheTtlManageUpdate.action",
			data:{'id':id,'deployName':deployName,'deployKey':deployKey,'deployValue':deployValue,'deployType':deployType,'deleteFlag':deleteFlag},
			success:function(flag){
				if(flag == '1'){
					alert('修改成功!');
					doSearch();
				}else{
					alert('主键冲突修改失败!');
					doSearch();
				}
			}
	});
}
 
function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};



function doRefresh(){
	var formPage = document.form1;
	if( formPage.page.value<1 ){
			formPage.page.value=1;
		}
	formPage.submit();
}

function doSearch(){
	var formPage = document.form1;
	formPage.page.value=1;
	formPage.submit();
}
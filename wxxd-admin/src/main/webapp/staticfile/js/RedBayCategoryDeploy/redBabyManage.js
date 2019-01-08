function addUser(){
	var shopCode = $("#shop_Code").val();
	if (shopCode == null || shopCode == '') {
		alert('门店编码不可为空','提示','warning');
		return;
	} 
	if(shopCode.length!=4){
		alert('门店编码只能为４位','提示','warning');
		return;
	}
	$.ajax({
			type:"POST",
			url:"redBabyManageAdd.action",
			data:{'shopCode':shopCode},
			success:function(flag){
				if(flag == 'sucess'){
					querySubmit();
				}else{
					alert(flag,'提示','error');
				}
			}
	});
}

function querySubmit(){
    var cform = $("#conditionForm");
    var url = "redBabyQuery.action";
    cform.attr("action",url);
    cform.submit();
}

function checkAllRule(obj){
	$("input[type=checkbox][name=shopCode_]").attr("checked",obj.checked);
}

function delUser(){
	var selectedCheckBoxes = $("input[type=checkbox][name=shopCode_]:checked");
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
		url:"redBabyManageBatchDel.action",
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

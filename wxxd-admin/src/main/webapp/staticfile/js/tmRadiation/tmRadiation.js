function addUser(){
	var tmPlantCode = $("#_tmPlantCode").val();
	var tmCityCode = $("#_tmCityCode").val();
	var esbuid = $("#_esbUid").val();
	if (tmPlantCode == null || tmPlantCode == '') {
		alert('天猫地点不可为空','提示','warning');
		return;
	} 
	if(tmPlantCode.length>12){
		alert('天猫地点长度大于12','提示','warning');
		return;
	}
	if (tmCityCode == null || tmCityCode == '') {
		alert('天猫城市不可为空','提示','warning');
		return;
	} 
	if(tmCityCode.length>255){
		alert('天猫城市长度大于255','提示','warning');
		return;
	}
	$.ajax({
			type:"POST",
			url:"add.action",
			data:{'tmPlantCode':tmPlantCode,'tmCityCode':tmCityCode,'esbuid':esbuid},
			success:function(flag){
				if(flag == 'success'){
					querySubmit();
				}else{
					alert(flag,'提示','error');
				}
			}
	});
}
function querySubmit(){
    var cform = $("#conditionForm");
    var url = "query.action";
    cform.attr("action",url);
    cform.submit();
}

function delUser(id){
	if (!confirm("确认要删除？")) {
         return;
    }
	$.ajax({
		type:"POST",
		url:"del.action",
			data:{"id":id},
			success:function(flag){
				if(flag == 'success'){
					alert('删除成功!');
					querySubmit();
			}else{
				alert('删除失败：'+flag);
				querySubmit();
			}
		}
	});
}



function queryHrInfo(){
	var selection = $("#select").val();
	var employeeId = $("#employeeId").val();
	if(employeeId == "" || employeeId == null){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '工号不能为空!'
        });
        return false;
	}else{
		$.ajax({
		    type:"POST",
		    url:"queryHrInfo.action",
		    data:{'selection':selection,
		        'employeeId':employeeId
		    },
		    success:function(rs){
		    	if(rs.status == 0){
		    		$("#result").val("无查询结果！");
		    	}else {
		    		$("#result").val(rs.baowen);
		    	}
		    }
		});
	}
}
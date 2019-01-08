
var flag = 0;

function changeSupplierCodeModel(){
	var code = $("#supplerCode").val();
    if (code.length < 10 && code.length != 0) {
        for (var i = code.length; i < 10; i++) {
            code = "0" + code;
        }
        $("#supplerCode").val(code);
    }
}

function changeCmmdtyModel(){
	var code = $("#cmmdtyCode").val();
    if (code.length < 18 && code.length != 0) {
        for (var i = code.length; i < 18; i++) {
            code = "0" + code;
        }
        $("#cmmdtyCode").val(code);
    }
}

function check(){
	flag = 0;
	var supplerCode = $("#supplerCode").val();
	var cmmdtyCode = $("#cmmdtyCode").val();
	var siteCode = $("#siteCode").val();
	var orderType = $("#orderType").val();
	var orderDate = $("#orderDate").val();
	
	if(supplerCode == ""){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '供应商编码不能为空!'
        });
        return false;
	}
	
	if(cmmdtyCode == ""){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '商品编码不能为空!'
        });
        return false;
	}
	if(siteCode == ""){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '地点不能为空!'
        });
        return false;
	}
	if(orderType == ""){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '订单类型不能为空!'
        });
        return false;
	}
	
	if(orderDate == ""){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '查询时间不能为空!'
        });
        return false;
	}
	
	flag = 1;
}

function queryOperationInfo(){
	
	check();
	var supplerCode = $("#supplerCode").val();
	var cmmdtyCode = $("#cmmdtyCode").val();
	var siteCode = $("#siteCode").val();
	var orderType = $("#orderType").val();
	var orderDate = $("#orderDate").val();
	
	if(flag == 1){
		$.ajax({
		    type:"POST",
		    url:"queryOperationInfo.action",
		    data:{
		    	'supplerCode':supplerCode,
		    	'cmmdtyCode':cmmdtyCode,
		    	'siteCode':siteCode,
		    	'orderType':orderType,
		    	'orderDate':orderDate
		    },
		    success:function(rs){
		    	if(rs.baowen == "null"){
		    		$("#result").val("无查询结果！");
		    	}else {
		    		$("#result").val(rs.baowen);
		    	}
		    }
		});
	}
}
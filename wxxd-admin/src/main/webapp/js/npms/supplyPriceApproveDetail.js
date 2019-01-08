var pageSize = 50;
var pageNumber = 0;
//总页数
var totalPage;
var plantCode
var approvalNum = $("#approvalNum").val();
$(document).ready(function(){ 
    queryBasicInfoAndHeard(approvalNum);
});

//查询基本信息和抬头信息
function queryBasicInfoAndHeard(approvalNum){
	$.ajax({
		type:'post',
		async:true,
		url:'SupplyPriceApprove/queryBasicInfoAndHeard.do',
		data:{'approvalNum':approvalNum},
		success:function(data){
			if(data != null && data != ""){
				$("#documentNum").val(data.documentNum);
				$("#createTime").val(data.createTime);
				$("#createUser").val(data.createUser);
				$("#brandLevel").val(data.brandLevel);
				$("#orderType").val(data.orderType);
				$("#suppliter").val(data.supplier);
				$("#startTime").val(data.startTime);
				$("#endTime").val(data.endTime);
				document.getElementById("remarks").title=data.remarks;
				$("#remarks").val(data.remarks);
				document.getElementById("suppliterRemarks").title=data.supplierRemarks;
				$("#suppliterRemarks").val(data.supplierRemarks);
				$("#busRemarks").val(data.busRemarks);
				$("#headLine").val(data.headLine);
				$("#userName").val(data.userName);
				$("#userSection").val(data.userSection);
				$("#apvNum").val(data.approvalNum);
				plantCode = data.plantCode;
				if(plantCode == '' || plantCode == null){
			    	getAuthByPage(pageNumber,pageSize,approvalNum);
			    } else {
			    	queryList(approvalNum);
			    }
			} else {
				layer.msg("未查到数据");
			}
		}
	});
	return plantCode;
}
//查询地点不为空时的列表数据
function queryList(approvalNum){
	$.ajax({
		type:'post',
		async:true,
		url:'SupplyPriceApprove/querySupplyPriceDataList.do',
		data:{'approvalNum':approvalNum},
		success:function(data){
			var tabHTML = "";
			if (data.length>0) {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var tempData = data[i];
                    tabHTML += '<tr>';
                    tabHTML += '<td>' + (i + 1) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyRemarks) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.price) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.curprice) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.ruleDiscount) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.lrregularDiscount) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.fixedRate) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.basePrice) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.priceDifference) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.distSell) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.protoNum) + '</td>';
                    tabHTML += '<td>' + nullToEmpty(tempData.meterUnit) + '</td>';
                    tabHTML += '</tr>';
                }
                $("#supList").html("");
                $("#supList").html(tabHTML);
                $("#pagd").hide();
            } else {
                tabHTML += '<tr> <td COLSPAN="16">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
                $("#supList").html("");
                $("#supList").html(tabHTML);
                $("#pagd").hide();
            }
		}
	});
}
//查询地点为空时的分页数据
function getAuthByPage(pageNumber,pageSize,approvalNum) {
	    var queryParams = {};
	    queryParams.page = pageNumber + 1;
	    queryParams.pageSize = pageSize;
	    queryParams.approvalNum = approvalNum;
        $.ajax({
            url: 'SupplyPriceApprove/querySupplyPriceDetailData.do',
            type: "post",
            data: queryParams,
            success: function (lineData) {
                // 返回数据存在
                var tabHTML = "";
                if (lineData && lineData.total) {
                    var len = lineData.rows.length;
                    for (var i = 0; i < len; i++) {
                        var tempData = lineData.rows[i];
                        tabHTML += '<tr>';
                        tabHTML += '<td>' + (i + 1) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyRemarks) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.price) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.curprice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.ruleDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.lrregularDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.fixedRate) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.basePrice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.priceDifference) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.distSell) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.protoNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.meterUnit) + '</td>';
                        tabHTML += '</tr>';
                    }
                    $("#supList").html("");
                    $("#supList").html(tabHTML);
                    $("#pagd").show();
                } else {
                    tabHTML += '<tr> <td COLSPAN="16">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
                    $("#supList").html("");
                    $("#supList").html(tabHTML);
                }
                // 先清空
                $("#authListPage").empty();
                // 记录总数
                $('#authTotalCount').html(lineData.total);
                // 页数信息
                $('#authTotalPage').html(Math.ceil(lineData.total / pageSize));
                totalPage = Math.ceil(lineData.total / pageSize);
                $("#authListPage").pagination(lineData.total, {
                    callback: getAuthByPageCallBack,
                    prev_text: ' 上一页',
                    next_text: '下一页 ',
                    items_per_page: pageSize,
                    num_display_entries: 5,
                    num_edge_entries: 3,
                    current_page: pageNumber
                });
            },
            error:function () {
                npmsAlert("系统异常!");
            }
        });
}
//回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index,pageSize,approvalNum);
};
/**
 * 页数跳转
 * @returns
 */
function jumpPageWithPageSize() {
    // 获取
    var page = $('#jumpPage').val();

    if (page == '' || page == null) {
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入跳转页数'
        });
        return undefined;
    } else if (isNaN(page) || ((page + '').indexOf('.') > -1)) {
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入有效页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    }  else if (page<=0) {
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入大于0的页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    }else {
        // 判断
        if (page > totalPage) {
            bootbox.alert({
                buttons : {
                    ok : {
                        label : '确定',
                        className : 'btn-sm btn-primary'
                    }
                },
                message : '输入的页数已经超出当前查询总页数！'
            });
            return undefined;
        }
        var pageNum = page - 1;
        getAuthByPage(pageNum,pageSize,approvalNum);
    }
};
function selbox(a){
	var s = a.id;
	var ctl = document.all[s];
	ctl.title= ctl.value ;
	}

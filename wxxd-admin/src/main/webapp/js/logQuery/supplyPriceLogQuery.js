$(document).ready(function () {
	//showNum();
});

var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;

function getAuthByPage(pageNumber) {
    var queryParams = {};
    queryParams.page = pageNumber + 1;
    queryParams.pageSize = pageSize;
    if (checkQueryParam(queryParams)) {
        $.ajax({
            url: 'logListQuery.action',
            type: "post",
            data: queryParams,
            success: function (lineData) {
                // 返回数据存在
                var tabHTML = "";
                if (lineData.suc && lineData.total > 0) {
                    var len = lineData.rows.length;
                    for (var i = 0; i < len; i++) {
                        var tempData = lineData.rows[i];
                        tabHTML += '<tr>';
                        tabHTML += '<input type="hidden" name="ID" id="' + tempData.id + '"  value="' + tempData.id + '"/>';
                        tabHTML += '<input type="hidden" name="approvalNum" id="' + tempData.approvalNum + '"  value="' + tempData.approvalNum + '"/>';
                        tabHTML += '<td><input type="checkbox" name="supplyPriceLog" id="' + tempData.id + '"  value="' + nullToEmpty(tempData.approvalStatus) + '" /></td>';
                        tabHTML += '<td>' + (i + 1) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.fileNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.brandLevel) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.supplier) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.meterUnit) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.orderType) + '</td>';
                        if (tempData.distSell == 0) {
                            tabHTML += '<td>经销</td>';
                        }else if (tempData.distSell == 2) {
                            tabHTML += '<td>代销</td>';
                        }else if (tempData.distSell == null) {
                            tabHTML += '<td></td>';
                        } else {
                            tabHTML += '<td>' + tempData.distSell + '</td>';
                        }
                        tabHTML += '<td>' + nullToEmpty(tempData.plantCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.startTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.endTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.price) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.currency) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.documentNum) + '</td>';
                        if (tempData.approvalStatus == 0) {
                        	tabHTML += '<td>审批中</td>';
						}else if (tempData.approvalStatus == 1) {
							tabHTML += '<td>通过</td>';
						}else if (tempData.approvalStatus == 2) {
							tabHTML += '<td>未通过</td>';
						} else {
							tabHTML += '<td></td>';		
						}
                        tabHTML += '<td>' + nullToEmpty(tempData.approvalTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.createUser) + '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.remarks) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.curprice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.ruleDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.lrregularDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.fixedRate) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.baseprice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.historyDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.historyPrice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.priceDifference) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.protoNum) + '</td>';
                        if (tempData.effectStatus == 0) {
                        	tabHTML += '<td>未执行</td>';
						}else if (tempData.effectStatus == 1) {
							tabHTML += '<td>成功</td>';
						}else if (tempData.effectStatus == 2) {
							tabHTML += '<td>失败</td>';
						} else {
							tabHTML += '<td></td>';		
						}
                        tabHTML += '<td>' + nullToEmpty(tempData.nextEffect) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.libraCompen) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.systemName) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.effectTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.createTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.updateTime) + '</td>';
                        tabHTML += '</tr>';
                    }
                    $("#authList").html("");
                    $("#authList").html(tabHTML);
                    $("#authListPage").show();
                } else {
                    tabHTML += '<tr> <td COLSPAN="37">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
                    $("#authList").html("");
                    $("#authList").html(tabHTML);
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
            }
        });
    }
}

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index,pageSize);
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
        getAuthByPage(pageNum,pageSize);
    }
};

//重新推送
function rePush(th) {
	var selectedCheckBoxes = $("input[type=checkbox][name=supplyPriceLog]:checked");
	var ids = '';
	if(selectedCheckBoxes.length<=0){
		npmsAlert('请选择需要推送的数据！');
		return;
	}
    
    bootbox
        .confirm({
            buttons: {
                confirm: {
                    label: '确认',
                    className: 'btn-sm btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-default'
                }
            },

            message: "您确定要推送吗？",
            callback: function (result) {
                if (result) {
                   var approvalNum = $("input[type=hidden][name=approvalNum]").val();
             	   for (var i = 0;i<selectedCheckBoxes.length;i++) {
             		   if (selectedCheckBoxes[i].value == 1) {
             			  ids = ids + "#" + selectedCheckBoxes[i].id;
             		   }
             	   }
             	  
             	   if (ids == "") {
             		  npmsAlert('至少选择一条审批通过的数据！');
             		  return;
             	   }
             	  ids = ids.substr(1,ids.length);
             	  
                    var params = {
                        'ids': ids,
                        'approvalNum': approvalNum
                    };
                    
                    if (th == 0) {
                    	rePushToSupplyPrice(params);
					} else if(th == 1) {
						rePushToR3(params);
					} else {
						rePushToPMS(params);
					}
                }
            }
        });
}

//重新推生效表
function rePushToSupplyPrice(params) {
    $.ajax({
        type: "POST",
        url: ctx + "/supplyPriceLogQuery/rePushToSupplyPrice.action",
        data: params,
        success: function (Data) {
        	if (Data == 1) {
        		getAuthByPage(pageNumber);
        		npmsAlert('推送成功！');
			}else {
				npmsAlert('推送失败！');
			}
        }
    });
}

//重新推送R3
function rePushToR3(params) {
    $.ajax({
        type: "POST",
        url: ctx + "/supplyPriceLogQuery/rePushToR3.action",
        data: params,
        success: function (Data) {
        	if (Data == 1) {
        		getAuthByPage(pageNumber);
        		npmsAlert('推送成功！');
			}else {
				npmsAlert('推送失败！');
			}
        }
    });
}

//重新推送PMS
function rePushToPMS(params) {
	$.ajax({
	    type: "POST",
	    url: ctx + "/supplyPriceLogQuery/rePushToPms.action",
	    data: params,
	    success: function (Data) {
	    	if (Data == 1) {
	    		getAuthByPage(pageNumber);
	    		npmsAlert('推送成功！');
			}else {
				npmsAlert('推送失败！');
			}
	    }
	});
}

function checkQueryParam(queryParams) {
	var numRegx = /^\d*$/;
	var approvalNum = $.trim($("#approvalNum").val());//流程ID
    if (approvalNum == "") {
    	npmsAlert('流程ID不能为空!');
        return false;
    }
    
	var fileNum = $.trim($("#fileNum").val());//价格文件号
    if (fileNum.length > 20) {
    	npmsAlert('价格文件号不能超过20位!');
        return false;
    }
    
    var cmmdtyCode = $.trim($("#cmmdtyCode").val());//商品编码
    if (cmmdtyCode.length > 0) {
    	if (!numRegx.test(cmmdtyCode)) {
            npmsAlert('商品编码只能是数字!');
            return false;
        }
        if (cmmdtyCode.length > 18) {
            npmsAlert('商品编码不能超过18位!');
            return false;
        }
    }
    //自动补齐商品编码
    $("#cmmdtyCode").val(appendCmmdtyCodeUtil(cmmdtyCode));

    var supplier = $.trim($("#supplier").val());//供应商帐户号
    if (supplier.length > 0) {
        if (!numRegx.test(supplier)) {
            npmsAlert('供应商只能是数字!');
            return false;
        }
        if (supplier.length > 10) {
            npmsAlert('供应商不能超过10位!');
            return false;
        }
    }
    //自动补齐供应商
    $("#supplier").val(appendSupplierCodeUtil(supplier));
    queryParams.cmmdtyCode = $.trim($("#cmmdtyCode").val());
    queryParams.supplier = $.trim($("#supplier").val());
    queryParams.purcOrg = $.trim($("#purcOrg").val());
    queryParams.fileNum = $.trim($("#fileNum").val());
    queryParams.approvalNum = $.trim($("#approvalNum").val());
    queryParams.protoNum = $.trim($("#protoNum").val());
    //queryParams.distSell = $("#distSell").val();
    //queryParams.effectStatus = $("#effectStatus").val();
    //queryParams.orderType = $("#orderType").val();
    //queryParams.approvalStatus = $("#approvalStatus").val();
    queryParams.plantCode = $.trim($("#plantCode").val());
    return true;
}

function checkAll(obj) {
	$("input[type=checkbox][name=supplyPriceLog]").prop("checked", obj.checked);
}


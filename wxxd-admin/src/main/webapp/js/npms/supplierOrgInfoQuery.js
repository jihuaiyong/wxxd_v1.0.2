/**
 * 页面加载后初始化数据调用的js
 */
$(function() {
		$('#wrap .item-search .zg-inpMany.code-goods').inpMany({
			placeholder : '请输入编码\n不同编码换行输入',
			tips:'必填(最多支持20条)'
		});  
	})
	
	    var pageSize = 10;
		var pageNumber = 0;
		//总页数
		var totalPage;
		var initData;
		var checkfalg=0;
function check(){
    checkfalg = 0;
	var supplier = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	if ( supplier=="" ){
		bootbox.alert({
			buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '供应商编码不能为空!'
			});	
 	     return;
    }
    checkfalg=1;
}

jQuery(function() {
	var tabHTML = "";
	tabHTML += '<tr> <td COLSPAN="19">请输入搜索条件进行查询</td></tr>';		
	$("#authList").html("");
	$("#authList").html(tabHTML);
  	// 先清空
	$("#authListPage").empty();
	// 记录总数
	$('#authTotalCount').html(0);
	// 页数信息
	$('#authTotalPage').html(Math.ceil(0 / pageSize));
	totalPage = Math.ceil(0 / pageSize);
	$("#authListPage").pagination(0, {
		callback : getAuthByPageCallBack,
		prev_text : ' 上一页',
		next_text : '下一页 ',
		items_per_page : pageSize,
		num_display_entries : 5,
		num_edge_entries : 3,
		current_page : pageNumber
	});
});

 function getAuthByPageCallBack(index, jq) {
	  getAuthByPage(index);
  };

function getAuthByPage(pageNumber) {
    check();
    if (checkfalg==0){
    	return;
    }
    
    if (changeSupplierModelWithSplit(",") == false) {
    	return;
    }
    
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
		url : ctx+'/supplierOrgInfo/showSupplierOrgInfoData.action',
		type : "post",
		data : eval(queryParams),
		success : function(lineData, status) {	
			// 返回数据存在
			var tabHTML = "";
			if (lineData && lineData.total) {
				var len = lineData.rows.length;
				for (var i = 0; i < len; i++) {
						var tempData = lineData.rows[i];
						tabHTML += '<tr>';
						tabHTML += '<td>' + (i + 1) + '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.supplier) + '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.currency) + '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.versionNo) + '</td>';
						tabHTML += '<td>' + formatTime(tempData.createTime)	+ '</td>';
						tabHTML += '<td>' + formatTime(tempData.updateTime)	+ '</td>';
						tabHTML += '<td>' + nullToEmpty(tempData.deleteFlag) + '</td>';
						tabHTML += '</tr>';
				}
				$("#authList").html("");
				$("#authList").html(tabHTML);
				$("#authListPage").show();
			} else {
				tabHTML += '<tr> <td COLSPAN="19">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
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
				callback : getAuthByPageCallBack,
				prev_text : ' 上一页',
				next_text : '下一页 ',
				items_per_page : pageSize,
				num_display_entries : 5,
				num_edge_entries : 3,
				current_page : pageNumber
			});
		}
	});
}

// 查询参数设置
function getQueryParams(pageNumber) {
	var cmmdtyCodes = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	var cmmdtyCodeArray = new Array();
	if(cmmdtyCodes){
		cmmdtyCodeArray = cmmdtyCodes.split(",");
	}
	var supplier ="";
	var cas = "";
	for (var i = 0; i < cmmdtyCodeArray.length; i++) {
		cas ="'"+ cmmdtyCodeArray[i].trim() +"'";
		if (cas.length != 0) {
			if(supplier != ""){
				supplier = supplier+","+cas;
			}else{
				supplier = cas;
			}
		}
	}
	
	var queryParams = {
		'supplier' : supplier,
		'pageSize' : pageSize,
		'page' : pageNumber + 1
	};
	return queryParams;
};

//供应商编码查询条件字符串分割补零并丢弃空元素
function changeSupplierModelWithSplit(SPLIT) {
	var supplier = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	var supplierArray = new Array();
	var regex = /^[0-9]*$/;
	//分割
	if(supplier){
		supplierArray = supplier.split(SPLIT);
	}
	var supplier = "";
	var arrayObj = new Array();
	
	for (var i = 0; i < supplierArray.length; i++) {
		//去空格
		supplierCode = supplierArray[i].trim();
		//校验不能大于10
		if ( supplierArray[i].length > 10 ){
			bootbox.alert({
				buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '供应商编码不能大于10位!&nbsp;&nbsp当前供应商编码:'+supplierArray[i]+'为'+ supplierArray[i].length +'位'
				});	
		 	     return false;
		    }
		//校验不能为非数字
		 if ( !regex.test(supplierArray[i]) ){
				bootbox.alert({
					buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '供应商编码:'+supplierArray[i]+'不能为非数字!'
					});	
			 	     return false;
			    }
		//补零
		if (supplierCode.length <= 10 && supplierCode.length != 0) {
			for (var j = supplierCode.length; j < 10; j++) {
				supplierCode = "0" + supplierCode;
			}
			arrayObj.push(supplierCode);
		}
	}
	
	//查询条件不能大于20
	if (arrayObj.length > 20) {
		$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').html("");
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '查询条目大于20! 当前为'+ arrayObj.length +'条'
		});
		return false;
	}
	$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val(arrayObj.toString());
}


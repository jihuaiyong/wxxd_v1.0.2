/**
 * 页面加载后初始化数据调用的js
 */
$(function() {
	$('#wrap .item-search .zg-inpMany.code-goods').inpMany({
		placeholder : '请输入编码\n不同编码换行输入',
		tips : '必填(最多支持20条)'
	});
})

var pageSize = 10;
var pageNumber = 0;
// 总页数
var totalPage;
var initData;
var checkfalg = 0;
function check() {
	checkfalg = 0;
	var cateGory = $(
			'#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
			.val();
	if (cateGory == "") {
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '商品类目不能为空!'
		});
		return;
	}
	checkfalg = 1;
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
	if (checkfalg == 0) {
		return;
	}

	if (changeCmmdtyModelWithSplit(",") == false) {
		return;
	}
	var queryParams = getQueryParams(pageNumber);
	$
			.ajax({
				url : ctx + '/categInfo/showCategInfoData.action',
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
							tabHTML += '<td>' + nullToEmpty(tempData.cateGory) + '</td>';
							tabHTML += '<td>' + nullToEmpty(tempData.cataLevel) + '</td>';
							tabHTML += '<td>' + nullToEmpty(tempData.cataCode) + '</td>';
							tabHTML += '<td>' + nullToEmpty(tempData.cataName) + '</td>';
							tabHTML += '<td>' + nullToEmpty(tempData.versionNo) + '</td>';
							tabHTML += '<td>' + formatTime(tempData.createTime)
									+ '</td>';
							tabHTML += '<td>' + formatTime(tempData.updateTime)
									+ '</td>';
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
					$('#authTotalPage').html(
							Math.ceil(lineData.total / pageSize));
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
	changeCmmdtyModelWithSplit(",");
	// var cateGory = $('#wrap .item-search .code-goods > .zg-inpMany >
	// .zg-form-control').val();

	var cmmdtyCodes = $(
			'#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
			.val();
	var cmmdtyCodeArray = new Array();
	if (cmmdtyCodes) {
		cmmdtyCodeArray = cmmdtyCodes.split(",");
	}
	var cateGory = "";
	var cas = "";
	for (var i = 0; i < cmmdtyCodeArray.length; i++) {
		cas = "'" + cmmdtyCodeArray[i].trim() + "'";
		if (cas.length != 0) {
			if (cateGory != "") {
				cateGory = cateGory + "," + cas;
			} else {
				cateGory = cas;
			}
		}
	}

	var queryParams = {
		'cateGory' : cateGory,
		'pageSize' : pageSize,
		'page' : pageNumber + 1
	};
	return queryParams;
};

// 编码查询条件字符串分割并丢弃空元素
function changeCmmdtyModelWithSplit(SPLIT) {
	var cmmdtyCodes = $(
			'#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
			.val();
	var cmmdtyCodeArray = new Array();
	var regex = /^[A-Za-z0-9]+$/;
	if (cmmdtyCodes) {
		cmmdtyCodeArray = cmmdtyCodes.split(SPLIT);
	}
	var cateGory = "";
	var arrayObj = new Array();
	for (var i = 0; i < cmmdtyCodeArray.length; i++) {
		cateGory = cmmdtyCodeArray[i].trim();

		if (cmmdtyCodeArray[i].length > 10) {
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '商品类目不能大于10位!&nbsp;&nbsp当前商品类目:' + cmmdtyCodeArray[i]
						+ '为' + cmmdtyCodeArray[i].length + '位'
			});
			return false;
		}
		if (cateGory.length != 0) {
			arrayObj.push(cateGory);
		}
		
		//校验不能为非特殊字符
		 if ( !regex.test(cmmdtyCodeArray[i]) ){
				bootbox.alert({
					buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '商品类目:'+cmmdtyCodeArray[i]+'包含特殊字符!'
					});	
			 	     return false;
			    }
	}
	
	 
	if (arrayObj.length > 20) {
		$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
				.html("");
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '商品组主数据查询最多支持20个'
		});
		return false;
	}
	$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').html(
			arrayObj.toString());
}

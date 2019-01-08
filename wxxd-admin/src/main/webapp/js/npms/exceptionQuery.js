jQuery(function() {	 
	var tabHTML = "";
	tabHTML += '<tr> <td COLSPAN="8">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
	$("#authList").html("");
	$("#authList").html(tabHTML);
  	// 先清空
	$("#listPage").empty();
	// 记录总数
	$('#totalCount').html(0);
	// 页数信息
	$('#totalPage').html(Math.ceil(0 / pageSize));
	totalPage = Math.ceil(0 / pageSize);
	$("#listPage").pagination(0, {
		callback : getAuthByPageCallBack,
		prev_text : ' 上一页',
		next_text : '下一页 ',
		items_per_page : pageSize,
		num_display_entries : 5,
		num_edge_entries : 3,
		current_page : pageNumber
	});
});
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;
function getAuthByPage(pageNumber) {
	var queryParams = getQueryParams(pageNumber);
	if(queryParams == null){
		return ;
	}
	$.ajax({
		url : ctx+"/exception/getExceptionList.action",
		type : "post",
		data : queryParams,
		success : function(lineData, status) {			
			// 返回数据存在
			var tabHTML = "";
			if (lineData && lineData.total) {
				var len = lineData.rows.length;
				for (var i = 0; i < len; i++) {
					var exceptionInfo = lineData.rows[i];
					tabHTML += '<tr>';
					
					tabHTML += '<td>'+exceptionInfo.messageId+'</td>';

					tabHTML += '<td>';
					if(exceptionInfo.exceptionType=='01'){
						tabHTML += '校验异常';
					}
					if(exceptionInfo.exceptionType=='02'){
						tabHTML += '存储更新缓存异常';
					}
					tabHTML += '</td>';

					
					tabHTML += '<td>';
					
					if(exceptionInfo.moduleType=='distributeArticleBDatePCMSNew'){
						tabHTML += '商品主数据PCMS';
					}
					if(exceptionInfo.moduleType=='distributeMaterialBasicInfo'){
						tabHTML += '商品主数据MDM';
					}
					if(exceptionInfo.moduleType=='distributeCmmdtyCategory'){
						tabHTML += '商品组主数据';
					}
					if(exceptionInfo.moduleType=='distributeProdHierarchyPCMS'){
						tabHTML += '产品层次主数据';
					}
					if(exceptionInfo.moduleType=='distributeXingDiDianMasterData'){
						tabHTML += '门店地点主数据';
					}
					if(exceptionInfo.moduleType=='distributeVendorBasicLevelMasterData'){
						tabHTML += '供应商基本层主数据';
					}
					if(exceptionInfo.moduleType=='distributeVendorPurchDateNew'){
						tabHTML += '供应商采购层主数据';
					}
					if(exceptionInfo.moduleType=='distributeCompanyCode'){
						tabHTML += '公司主数据';
					}
					if(exceptionInfo.moduleType=='distributeAdminCityMasterDataNew'){
						tabHTML += '行政城市主数据';
					}
					if(exceptionInfo.moduleType=='procurementRule'){
						tabHTML += '合同主数据';
					}

					tabHTML += '</td>';
					
					tabHTML += '<td>' + exceptionInfo.retryNum + '</td>';
					
					tabHTML += '<td>';
					
					if(exceptionInfo.isSend=='0'){
						tabHTML += '是';
					}
					if(exceptionInfo.isSend=='1'){
						tabHTML += '否';
					}
					
					tabHTML += '</td><td>' + formatTime(exceptionInfo.createTime) + '</td>';
					
					tabHTML += '<td>' + formatTime(exceptionInfo.updateTime) + '</td>';
					
					tabHTML += "<td><a class='uiBtn case6'  href='javascript:void(0);' onclick='viewMessage(\""+exceptionInfo.id+"\")'>查看原始报文</a>";
					tabHTML += "<a class='uiBtn case6'  href='javascript:void(0);' onclick='viewException(\""+exceptionInfo.id+"\")'>查看异常信息</a></td>";
				
					tabHTML += '</tr>';
				}
				$("#authList").html("");
				$("#authList").html(tabHTML);
				$("#listPage").show();
			} else {
				$("#authList").html("");
				tabHTML += '<tr> <td COLSPAN="14">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
				$("#authList").html(tabHTML);
			}
			// 先清空
			$("#listPage").empty();
			// 记录总数
			$('#totalCount').html(lineData.total);
			// 页数信息
			$('#totalPage').html(Math.ceil(lineData.total / pageSize));
			totalPage = Math.ceil(lineData.total / pageSize);
			$("#listPage").pagination(lineData.total, {
				callback : getAuthByPageCallBack,
				prev_text : ' 上一页',
				next_text : '下一页 ',
				items_per_page : pageSize,
				num_display_entries : 3,
				num_edge_entries : 3,
				current_page : pageNumber
			});
		}
	});
};

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index);
};

// 查询参数设置
function getQueryParams(pageNumber) {
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var moduleType = $("#moduleType").val();
	var exceptionType = $("#exceptionType").val();
	
	if (startTime==""&&endTime==""&&moduleType==""&&exceptionType==""){
		 bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '至少输入一项'
		    });
         return null;
   }
	
	var queryParams = {
		'startTime' :startTime,
		'endTime':endTime,
		'moduleType':moduleType,
		'exceptionType':exceptionType,
		'pageSize' : pageSize,
		'page' : pageNumber+1
	};
	return queryParams;
};

function viewMessage(messgeId){
	 var messageWin = $("#messageWin");
 	 $.ajax({
	      type:"post",
	      url:ctx + "/rawMsg/getOrignMsg.action",
	      data:{"id":messgeId},
	      success:function(data){
	    	  $("#rawMsgContent").val(data);
	    	  $("#titleinit").html("");
		      $("#titleinit").html("原始报文信息");
	    	  $("#viewDialog").show();
	      },
	      error:function(XMLHttpRequest,textStatus,errorThrown){
	         alert(errorThrown);
	      }
    });
}

function viewException(id){
	var exceptionWin = $("#exceptionWin");
	$.ajax({
	  type:"post",
	  url:ctx + "/exception/getExceptionInfo.action",
	  data:{"id":id},
	  success:function(data){
	       $("#rawMsgContent").val(data);
	       $("#titleinit").html("");
	       $("#titleinit").html("异常信息");
	       $("#viewDialog").show();
	  },
      error:function(XMLHttpRequest,textStatus,errorThrown){
         alert(errorThrown);
      }
	 });
}
function showContent(msg){
 	$("#rawMsgContent").val(msg);
	$("#viewDialog").show();
}

function closed(){
	$("#rawMsgContent").val("");
	$("#viewDialog").hide();
}

function copy(c){
	var msg = $("#"+c+"").val();
 	window.clipboardData.setData('text', msg);
}

// 异常执行
function execSubmit(){
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	var moduleType = $("#moduleType").val();
	var exceptionType = $("#exceptionType").val();
	if (moduleType ==""){
		npmsAlert('接口类型不能为空');
		return;
    }
	if (exceptionType ==""){
		npmsAlert('异常类型不能为空');
	    return;
    }

	var params = {"moduleType":moduleType,"exceptionType":exceptionType,"startTime":startTime,"endTime":endTime};
	$.ajax({
		  type:"post",
		  url:ctx + "/exception/exceptionExecSync.action",
		  data:params,
		  success:function(data){
			  $("#authList").html("");
			  $("#authList").append("<tr><td colspan='8' style='text-align:left;'><font color='#FF3399'>"+data+"</font></td></tr>")
		  }
	});
}
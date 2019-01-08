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
var checkfalg=0;
function check(){
			var sCreateTime = $("#sCreateTime").val();
        var eCreateTime = $("#eCreateTime").val();
        if (sCreateTime=="" || eCreateTime==""){
        	alert('时间范围必需输入！');
 	            return;
            }
          checkfalg=1;     
}
    function querySubmit(){
            check();
            if(checkfalg==0) {
                return;
            }
         
		    getAuthByPage(0);
    }
function getQueryParams(pageNumber) {
	var msgType = $("#msgType").val();
	var sCreateTime = $("#sCreateTime").val();
	var eCreateTime = $("#eCreateTime").val();
	var esbMsgId=$("#esbMsgId").val();

	var queryParams = {
		'msgType' : msgType,
		'sCreateTime' : sCreateTime,
		'eCreateTime' : eCreateTime,
		'esbMsgId':esbMsgId,
		'pageSize' : pageSize,
		'page' : pageNumber + 1
	};
	return queryParams;
};
// 总页数
var totalPage;
var pageSize = 10;
var pageNumber = 0;

// 总页数
var totalPage;
function getAuthByPage(pageNumber) {
	var queryParams = getQueryParams(pageNumber);
	if (queryParams.sCreateTime=="" || queryParams.eCreateTime==""){
    	npmsAlert('时间范围必需输入！');
         return;
    }
	$.ajax({
				url : ctx+'/rawMsg/getRawMsgSync.action',
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

							tabHTML += '<td>' + tempData.id + '</td>';

							tabHTML += '<td>' + tempData.mid + '</td>';
							tabHTML += '<td>' + formatTime(tempData.createTime)
									+ '</td>';
							tabHTML += '<td>' + formatTime(tempData.updateTime)
									+ '</td>';
							tabHTML += '<td>' + tempData.status
									+ '</td>';
							tabHTML += '<td>' + tempData.msgType
									+ '</td>';
							

						

							tabHTML += "<td><a class='edit11'  href='javascript:void(0);' onclick='viewContent(\""+ tempData.id + "\")'></a></td>";

							tabHTML += '</tr>';
						}
						$("#authList").html("");
						$("#authList").html(tabHTML);
						$("#listPage").show();
					} else {
						$("#authList").html("");
						tabHTML += '<tr> <td COLSPAN="7">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
						$("#authList").html(tabHTML);	
					}
					// 先清空
					$("#listPage").empty();
					// 记录总数
					$('#totalCount').html(lineData.total);
					// 页数信息
					$('#totalPage').html(
							Math.ceil(lineData.total / pageSize));
					totalPage = Math.ceil(lineData.total / pageSize);
					$("#listPage").pagination(lineData.total, {
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
};

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index);
};


function viewContent(pisId){
  	// 调用后台查询
  	$.ajax({
	      type:"post",
	      url:ctx+"/rawMsg/queryContent.action",
	      data:{"pisId":pisId},
	      dataType:"text",
	      success:function(result){
	           showContent(result);
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


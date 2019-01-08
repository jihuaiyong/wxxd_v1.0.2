<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NPMS</title>
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${request.contextPath}/libs/font-uxcool/font-uxcool.css">
<link rel="stylesheet" href="${request.contextPath}/css/portal.css">
<link rel="stylesheet" href="${request.contextPath}/css/index.css">
<link rel="stylesheet" href="${request.contextPath}/css/date/daterangepicker.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap-select/bootstrap-select.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrapvalidator/dist/css/bootstrapValidator.css">
<link rel="stylesheet" href="${request.contextPath}/css/common.css">
</head>
<body id="condition">
	<div id="wrap"  style="height:660px">
		<section class="config">
			<div class="row">
			<div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">&nbsp;<font style='color:red;'>*</font>商品编码：</span>
                        <input id="cmmdtyCode" name="cmmdtyCode" type="text" onblur="changeCmmdtyModel();"
                               class="form-control" style="width:180px;" value="${RequestParameters.cmmdtyCode!''}">
                    </div>
                </div>
	  			<div class="col-md-3">
					<div class="input-group" >
						<button href="javascript:;" style="float:left;margin-left:10px;" class="buttonsearch11" onclick="getAuthByPage(0);"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>	
					</div>
				</div>
			</div>
		</section>
  <section class="result">
	<div class="tableBox table-responsive">
            <table class="zg-table zg-table-striped">
                <thead>
				<tr class="text-nowrap">
					<th>序号</th>
			  	    <th>商品编码</th>
			  	    <th>产品层次</th>
			  	    <th>商品类目</th>
				    <th>品牌</th>
				    <th>品类</th>
				    <th>物料类型</th>
				    <th>物料类别</th>
				    <th>单位</th>
				    <th>生鲜属性</th>
				    <th>商品描述</th>
				    <th>版本号</th>
				    <th>创建时间</th>
				    <th>更新时间</th>
				    <th>删除标志</th>
				</tr>
			</thead>
			<tbody id="authList">
			</tbody>
		 </table>
	   </div>
	  <div class="info clearfix">
				<div class="page">
					<span>共<span id="authTotalCount">0</span>条，每页显示10条
					</span>
					<ul class="paginationH" id="authListPage">
						<li><a href="javascript:void(0);"  style="cursor:pointer;">上一页</a></li>
						<li class="active"><a href="javascript:;"></a></li>
						<li><a href="javascript:void(0);"  style="cursor:pointer;">下一页</a></li>
					</ul>
					<span>共<span id="authTotalPage">0</span>页，到第
					</span>
					<div class="inp-jump">
						<input type="text" class="formH-control">
					</div>
					页
					<a href="javascript:jumpPage();" class="btnH btnH-default">确定</a>
				</div> 
			</div>
		</section>  
	</div>
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
    <script	type="text/javascript">
        var pageSize = 10;
		var pageNumber = 0;
		//总页数
		var totalPage;
		var initData;
		var checkfalg=0;
function changeCmmdtyModel(){
    var cmmdtyCode = $("#cmmdtyCode").val().trim();
    if ( cmmdtyCode.length < 18 && cmmdtyCode.length != 0){
			for(var i = cmmdtyCode.length; i < 18; i++){
			    cmmdtyCode = "0" + cmmdtyCode;
			}
 	        $("#cmmdtyCode").val(cmmdtyCode);
        }
}
    var checkfalg=0;
    function check(){
    checkfalg = 0;
	var cmmdty = $("#cmmdtyCode").val();
	 cmmdtyCode = cmmdty.trim();
if ( cmmdtyCode=="" ){
	bootbox.alert({
		buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '商品编码不能为空!'
		});	
 	     return;
    }
   
	
if ( cmmdtyCode.length > 18 ){
	bootbox.alert({
		buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '商品编码不能大于18位!&nbsp;&nbsp;当前商品编码为'+ cmmdtyCode.length +'位'
		});	
 	     return;
    }
    //数字正则
     var regex = /^[0-9]*$/;
    if ( !regex.test(cmmdtyCode) ){
	bootbox.alert({
		buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '商品编码不能为非数字!'
		});	
 	     return;
    }
    checkfalg=1;
}

// 查询参数设置
function getQueryParams(pageNumber) {
    var cmmdtyCode = $("#cmmdtyCode").val().trim();
	var queryParams = {
		'cmmdtyCode' : cmmdtyCode,			
		'pageSize' : pageSize,
		'page' : pageNumber+1
	};
	return queryParams;
};

jQuery(function() {	 
	var tabHTML = "";
	tabHTML += '<tr> <td COLSPAN="15">请输入搜索条件进行查询</td></tr>';		
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
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
		url : ctx+'/cmmdtyInfo/cmmdtyInfoQueryData.action',
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
					tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.brandCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.categCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.tradeCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.busCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.mtart) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.attyp)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.unit)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.property)	+ '</td>';
					tabHTML += '<td width="120px">' + nullToEmpty(tempData.remarks)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.versionNo)	+ '</td>';
					tabHTML += '<td>' + formatTime(tempData.createTime)	+ '</td>';
					tabHTML += '<td>' + formatTime(tempData.updateTime)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.deleteFlag) + '</td>';
					tabHTML += '</tr>';
				}
				$("#authList").html("");
				$("#authList").html(tabHTML);
				$("#authListPage").show();
			} else {
				tabHTML += '<tr> <td COLSPAN="15">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
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
var ctx = '${request.contextPath}';
</script>
</body>
</html>
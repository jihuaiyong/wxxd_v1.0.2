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
<link rel="stylesheet" href="${request.contextPath}/css/zg.min.css">

<link rel="stylesheet" href="${request.contextPath}/layer/skin/layer.css"/>
</head>
<body id="condition">
	<div id="wrap"  style="height:660px">
        <section class="config">
		<div class="item item-search">
			<div class="zg-form">
				<div class="inpItem">
					<span class="input-group-addon12">&nbsp;<font style='color:red;'>*</font>地点编码：</span>
					<div class="inpBox zg-inpMany code-goods">
						<input id="plantCode" name="plantCode" type="text" class="zg-form-control" >
						<i class="icon-development-tool"></i>
					</div>
						<button href="javascript:;" style="float:right;margin-left:10px;" class="buttonsearch11" onclick="getAuthByPage(0);"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>	
				</div>
			</div>
		</div>
	</section>
  <section class="result">
	<div class="tableBox table-responsive">
		<table class="zg-table zg-table-striped text-nowrap">
			<thead>
				<tr>
					<th>序号</th>
			  	    <th>地点编码</th>
				    <th>地点名称</th>
				    <th>门店状态</th>
				    <th>门店状态描述</th>
				    <th>门店形态</th>
				    <th>门店业态</th>
				    <th>业态描述</th>
				    <th>城市编码</th>
				    <th>采购组织</th>
				    <th>销售组织</th>
				    <th>销售组织名称</th>
				    <th>所属店群</th>
				    <th>店群描述</th>
				    <th>超市大区</th>
				    <th>版本号</th>
				    <th>创建时间</th>
				    <th>更新时间</th>
				    <th>删除标志</th>
				</tr>
			</thead>
			<tbody id="authList">
			<tr><td COLSPAN="19">请输入搜索条件进行查询</td></tr>
			</tbody>
		 </table>
	   </div>
      <div class="info clearfix">
          <div class="page">
					<span>共<span id="authTotalCount">0</span>条，每页显示10条
					</span>
              <ul class="paginationH" id="authListPage">
                  <li><a href="javascript:void(0);" style="cursor:pointer;">上一页</a></li>
                  <li class="active"><a href="javascript:;"></a></li>
                  <li><a href="javascript:void(0);" style="cursor:pointer;">下一页</a></li>
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
   	   	<script src="${request.contextPath}/staticfile/js/zg/v1.1.3/js/zg-6.25.js"></script>
	<script src="${request.contextPath}/js/npms/modelLocation.js"></script>
	<script src="${request.contextPath}/staticfile/js/draggable.js"></script>
   	
    <script	type="text/javascript">
        var pageSize = 10;
		var pageNumber = 0;
		//总页数
		var totalPage;
		var initData;
		var checkfalg=0;

    var checkfalg=0;
function check(){
    checkfalg = 0;
	var plantCode = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	if ( plantCode=="" ){
		bootbox.alert({
			buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '地点编码不能为空!'
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
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
		url : ctx+'/locationInfo/locationInfoQueryData.action',
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
					tabHTML += '<td>' + nullToEmpty(tempData.plantCode) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.plantName) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.shopStatus) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.statusRemarks) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.shopType) + '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.shopThry)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.thryRemarks)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.cityCode)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.purcOrg)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.saleOrg)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.saleName)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.classBelong)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.classRemarks)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.dqCode)	+ '</td>';
					tabHTML += '<td>' + nullToEmpty(tempData.version)	+ '</td>';
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
var ctx = '${request.contextPath}';
</script>
</body>
</html>
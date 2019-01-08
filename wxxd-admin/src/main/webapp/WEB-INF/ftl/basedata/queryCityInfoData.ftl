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
<link rel="stylesheet" href="${request.contextPath}/css/common.css">
<link rel="stylesheet" href="${request.contextPath}/css/zg.min.css">
</head>
<body id="condition">
	<div id="wrap"  style="height:660px">
	<section class="config">
		<div class="item item-search">
			<div class="zg-form">
				<div class="inpItem">
					<span class="input-group-addon12">城市编码：</span>
					<div class="inpBox zg-inpMany code-city">
						<input id="cityCode" name="cityCode" type="text" class="zg-form-control" >
						<i class="icon-development-tool"></i>
					</div>
				</div>
				<div class="inpItem">
					<span class="input-group-addon12">城市描述：</span>
					<div class="inpBox zg-inpMany name-city">
						<input id="cityName" name="cityName" type="text" class="zg-form-control" >
					</div>
				</div>
				<button href="javascript:;" style="margin-left:10px;" class="buttonsearch11" onclick="queryCityInfoData();"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>	
			</div>
		</div>
	</section>
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>
			  	    <th>序号</th>
			  	    <th>城市编码</th>
				    <th>城市描述</th>
				    <th>所属大区</th>
				    <th>超市区域编码</th>
				    <th>超市区域描述</th>
				    <th>版本号</th>
				    <th>创建时间</th>
				    <th>修改时间</th>
				    <th>删除标志</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr>
	            	<td colspan="10">请输入搜索条件进行查询</td>
	            </tr>
			</tbody>
		 </table>
	   </div>
	  <div class="info clearfix">
				<div class="page">
					<span>共<span id="authTotalCount">0</span>条，每页显示<span id="pageSize">10</span>条
					</span>
					<ul class="paginationH" id="authListPage">
						<li><a href="javascript:;"  style="cursor:pointer;" onclick="buildTable('a');">上一页</a></li>
						<li class="active"><a href="javascript:;" id="pageNumber">1</a></li>
						<li><a href="javascript:;"  style="cursor:pointer;" onclick="buildTable('b');">下一页</a></li>
					</ul>
					<span>共<span id="authTotalPage">0</span>页，到第
					</span>
					<div class="inp-jump">
						<input type="text" class="formH-control" id="jumpPage">
					</div>
					页
					<a href="javascript:;" class="btnH btnH-default" onclick="buildTable('c');">确定</a>
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
   	<script src="${request.contextPath}/js/cityInfo/cityInfo.js"></script>
   	<script src="${request.contextPath}/js/cityInfo/pageCount.js"></script>
   	<script src="${request.contextPath}/staticfile/js/zg/v1.1.3/js/zg-6.25.js"></script>
   	<script src="${request.contextPath}/staticfile/js/draggable.js"></script>
    <script	type="text/javascript">
	var ctx = '${request.contextPath}';
	var authTotalCount;
	</script>
</body>
</html>
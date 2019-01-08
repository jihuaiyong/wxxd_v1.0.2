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


</head>
<body id="condition">
	<div id="wrap"  style="height:660px">
        <section class="config">
		<div class="item item-search">
			<div class="zg-form">
				<div class="inpItem">
					<span class="input-group-addon12">&nbsp;<font style='color:red;'>*</font>商品类目：</span>
					<div class="inpBox zg-inpMany code-goods">
						<input id="cateGory" name="cateGory" type="text" class="zg-form-control" >
						<i class="icon-development-tool"></i>
					</div>
						<button href="javascript:;" style="float:right;margin-left:10px;" class="buttonsearch11" onclick="getAuthByPage(0);"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>	
				</div>
			</div>
		</div>
	</section>
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>
					<th nowrap>序号</th>
                    <th nowrap>商品类目</th>
                    <th nowrap>目录层级</th>
                    <th nowrap>目录代码</th>
                    <th nowrap>目录名称</th>
                    <th nowrap>版本号</th>
                    <th nowrap>创建时间</th>
                    <th nowrap>更新时间</th>
                    <th nowrap>删除标志</th>
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
   	<script src="${request.contextPath}/staticfile/js/zg/v1.1.3/js/zg-6.25.js"></script>
	<script src="${request.contextPath}/js/npms/categInfoQuery.js"></script>
	<script src="${request.contextPath}/staticfile/js/draggable.js"></script>
   	
    <script	type="text/javascript">
  
var ctx = '${request.contextPath}';
</script>
</body>
</html>
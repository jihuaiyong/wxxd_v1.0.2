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
                        <span class="input-group-addon" id="basic-addon1">商品编码：</span>
                        <input id="cmmdtyCode" name="cmmdtyCode" type="text" onblur="changeCmmdtyCode();"
                               class="form-control" style="width:180px;" value="${RequestParameters.cmmdtyCode!''}">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">产品层次：</span>
                        <input id="brandCode" name="brandCode" type="text" class="form-control"
                               style="width:180px;" value="${RequestParameters.brandCode!''}">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">商品类目：</span>
                        <input id="categCode" name="categCode" type="text" class="form-control"
                               style="width:180px;" value="${RequestParameters.categCode!''}">
                    </div>
                </div>
              </div>
              <div class="row" style="margin-top:10px;">
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">供 应 商 ：</span>
                        <input id="supplier" name="supplier" type="text" class="form-control"
                               style="width:180px;" value="${RequestParameters.supplier!''}">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">采购组织：</span>
                        <input id="orgCode" name="orgCode" type="text" class="form-control"
                               style="width:180px;" value="${RequestParameters.orgCode!''}">
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">地点编码：</span>
                        <input id="plantCode" name="plantCode" type="text" class="form-control"
                               style="width:180px;" value="${RequestParameters.plantCode!''}">
                    </div>
                </div>
	  			<div class="col-md-3">
					<div class="input-group" >
						<button href="javascript:;" style="float:left" class="buttonsearch11" onclick="queryContInfoData();"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>	
					</div>
				</div>
			</div>
		</section>
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>
					<th>序号</th>
			  	    <th>商品编码</th>
			  	    <th>产品层次</th>
			  	    <th>商品类目</th>
				    <th>合同编号</th>
				    <th>OA公文号</th>
				    <th>操作范围</th>
				    <th>供应商</th>
				    <th>操作模式</th>
				    <th>采购组织</th>
				    <th>扣点值</th>
				    <th>扣点类型</th>
				    <th>订单类型</th>
				    <th>地点编码</th>
				    <th>开始时间</th>
				    <th>结束时间</th>
				    <th>创建时间</th>
				    <th>更新时间</th>
				</tr>
			</thead>
			<tbody id="tbody">
				<tr>
	            	<td colspan="18">请输入搜索条件进行查询</td>
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
   	<script src="${request.contextPath}/js/contInfo/contInfo.js"></script>
   	<script src="${request.contextPath}/js/cityInfo/pageCount.js"></script>
    <script	type="text/javascript">
	var ctx = '${request.contextPath}';
	var authTotalCount;
	</script>
</body>
</html>
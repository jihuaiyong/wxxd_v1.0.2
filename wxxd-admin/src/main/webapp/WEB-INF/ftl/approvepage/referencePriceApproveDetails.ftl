<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NPMS</title>
<#import "../workflow/common/macro.ftl" as demo />
<@demo.headResource />
<@demo.formResource />
<@demo.workflowResource />
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
<style type="text/css">
	.infoPage{
		width: 1200px;
		height: 100%;
		margin: 0 auto;
	}
	.approveTitle{
		background-color: #438eff;
		color: #ffffff;
		text-align: center;
		font-size: 17px;
		width: 100%;
		height: 30px;
		margin-top: 20px;
		padding-top:3px;
	}
	.baseInfo{
		width: 100%;
		margin-top: 20px;
		display: flex;
  		flex-direction: cow;
	}
	.baseInfoDetail{
		display: flex;
  		flex-direction: cow;
	}
	.baseTitle{
		font-size: 14px;
		width:80px;
		text-align: left;
		padding-top:5px;
	}
	.baseInput{
		height:30px;
		width:200px;
		text-align: left;
	}
	.baseInput_big{
		height: 30px;
		width:500px;
		text-align: left;
	}
	.fujian{
		float:left;
		color:blue;
		font-size: 15px;
	}
</style>
<body id="condition">
	<div id="wrap">	
		<div class="infoPage">
	<#assign forwardPath="read" />
		<#if forwardPath??>
			<#include "../workflow/process/btn_approve.ftl" />
		<#else>
			<#include "../workflow/process/hidden_approve.ftl" />
		</#if>
		<div class="approveTitle">香港参考价和二级限价审批申请</div>
		<div style="text-align: left;" class="approveTitle">基本信息</div>
		<div class="baseInfo">
			<div class="baseInfoDetail">
				<p class="baseTitle">标题 </p>
				<input class="baseInput_big" type="text" disabled="ture" value="xxx集团xxxx事业部xxx部门xxx发起的香港参考价和二级限价审批申请流程"/>					
			</div>
			<div class="baseInfoDetail" style="margin-left: 30px;">
				<p class="baseTitle">申请人工号</p>
				<input class="baseInput" type="text" disabled="ture" value="88385283"/>					
			</div>
			<div class="baseInfoDetail" style="margin-left: 30px; float:right">
				<p class="baseTitle">申请人姓名</p>
				<input class="baseInput" type="text" disabled="ture" value="纪淮永"/>					
			</div>
		</div>
		<div class="baseInfo">
			<div class="baseInfoDetail">
				<p class="baseTitle">申请公文号 </p>
				<input class="baseInput_big" type="text" disabled="ture" value="000222000233301130"/>					
			</div>
			<div class="baseInfoDetail" style="margin-left: 30px;">
				<p class="baseTitle">流程 ID</p>
				<input class="baseInput" type="text" disabled="ture" value="000033322030331122"/>					
			</div>
			<div class="baseInfoDetail" style="margin-left: 30px; float:right">
				<p class="baseTitle">申请时间</p>
				<input class="baseInput" type="text" disabled="ture" value="2018/12/17 14:24:00"/>					
			</div>
		</div>
		<div class="baseInfo">
			<div class="baseInfoDetail">
				<p class="baseTitle">申请人部门 </p>
				<input class="baseInput_big" type="text" disabled="ture" value="xxx部门xxx"/>					
			</div>
			<div class="baseInfoDetail" style="margin-left: 30px;">
				<p class="baseTitle">联系电话</p>
				<input class="baseInput" type="text" disabled="ture" value="12345678901"/>					
			</div>
		</div>
		<div style="text-align: left;" class="approveTitle">申请信息抬头</div>
			<div class="baseInfo">
				<div class="baseInfoDetail">
					<p class="baseTitle">事业部 </p>
					<input class="baseInput" type="text" disabled="ture" value="xxxx事业部"/>					
				</div>
				<div class="baseInfoDetail" style="margin-left: 180px;">
					<p class="baseTitle">城市</p>
					<input class="baseInput" type="text" disabled="ture" value="南京市"/>					
				</div>
				<div class="baseInfoDetail" style="margin-left: 180px; float:right">
					<p class="baseTitle">货币</p>
					<input class="baseInput" type="text" disabled="ture" value="默认HKD"/>					
				</div>
			</div>
			<div class="baseInfo">
				<div class="baseInfoDetail">
					<p class="baseTitle">渠道 </p>
					<input class="baseInput" type="text" disabled="ture" value="默认10"/>					
				</div>
				<div class="baseInfoDetail" style="margin-left: 180px;">
					<p class="baseTitle">开始时间</p>
					<input class="baseInput" type="text" disabled="ture" value="默认系统当前时间"/>					
				</div>
				<div class="baseInfoDetail" style="margin-left: 180px; float:right">
					<p class="baseTitle">截止时间</p>
					<input class="baseInput" type="text" disabled="ture" value="默认9999.12.31"/>					
				</div>
			</div>
		<div style="text-align: left;" class="approveTitle">申请信息明细</div>
		  <section class="result">
			<div class="tableBox">
				<table class="zg-table zg-table-striped">
					<thead>
						<tr>
							<th>序号</th>
					  	    <th>商品编码</th>
					  	    <th>商品描述</th>
					  	    <th>店群</th>
						    <th>店群描述</th>
						    <th>当前参考价</th>
						    <th>参考价</th>
						    <th>二级限价</th>
						    <th>备注</th>
						    <th>非标让价率</th>
						    <th>督导让价率</th>
						    <th>参考集团限价</th>
						    <th>参考有函</th>
						    <th>参考地点</th>
						    <th>参考库位</th>
						    <th>参考供应商</th>
						</tr>
					</thead>
					<tbody id="tbody">
						<tr>
			            	<td colspan="16">....假装有数据</td>
			            </tr>
					</tbody>
				 </table>
			   </div>
			<div class="info clearfix">
				<div class="page">
				<div class="fujian">
					<a href="javascript:;">【附件下载】 xxxxxxx.zpi</a>
				</div>
					<span>共<span id="authTotalCount">0</span>条，每页显示<span id="pageSize">50</span>条
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
	</div>     
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
   	<script src="${request.contextPath}/js/common/pageFenYe.js"></script>
   	<script type="text/javascript" src="${request.contextPath}/staticfile/js/draggable.js"></script>
    <script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script>
</script>
</body>
</html>
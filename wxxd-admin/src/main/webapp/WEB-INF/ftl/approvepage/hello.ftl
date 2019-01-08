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
		width:70px;
		text-align: left;
	}
	.baseInput{
		height:30px;
		width:300px;
		text-align: left;
	}
	.baseInput_big{
		height: 30px;
		width:600px;
		text-align: left;
	}
</style>
<body id="condition">
	<div id="wrap">	
	<#assign forwardPath="red" />
		<#if forwardPath??>
			<#include "../workflow/process/btn_approve.ftl" />
		</#if>
		<div class="approveTitle">香港参考价和二级限价审批申请</div>
		<div style="text-align: left;" class="approveTitle">基本信息</div>
		<div class="baseInfo">
			<div class="baseInfoDetail">
				<p class="baseTitle">标题 </p>
				<input class="baseInput_big" type="text" />					
			</div>
			<div class="baseInfoDetail" style="margin-left: 20px;">
				<p class="baseTitle">申请人工号</p>
				<input class="baseInput" type="text" />					
			</div>
			<div class="baseInfoDetail" style="margin-left: 20px;">
				<p class="baseTitle">申请人姓名</p>
				<input class="baseInput" type="text" />					
			</div>
		</div>
		<div style="text-align: left;" class="approveTitle">申请信息抬头</div>
		<div style="text-align: left;" class="approveTitle">申请信息明细</div>
	
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
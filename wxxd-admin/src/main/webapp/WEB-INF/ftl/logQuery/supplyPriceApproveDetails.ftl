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
    #myTab li{
    width:100%;
    float:left;
    height:40px;    
    list-style: none;
    margin: 0;
    padding: 0;
	}

	#myTab li img{
	    float:left;
	    height: 40px;    
	}
	
	#myTab li p{
	    color:white;
	    text-align: center;
	    position: relative;
	    display: block;
	    padding: 10px 15px; 
	    font-size: 14px;   
	}
	.blue{
	    background:#0f9af2;
	}
	.gray{
	    background: #dfdfdf;
	}
	.tabPaneUl{
	    width: 700px;
	    margin: 0 auto;
	    list-style: none;
	}
	
	.tabPaneUl li{
	    height: 40px;
	    line-height: 40px;
	}
	.tab-pane{
	    margin-top: 50px;
	}
	.uptitle{
		font-size: 14px;
	    font-weight: bold;
	    /* margin-bottom: 15px; */
	    background-color: #bef0fa;
	    padding: 5px
	    }
	 /*三个标题字体样式*/
	.uptitle1{
		font-size: 14px;
	    font-weight: bold;
	    color: blue;
	    /* margin-bottom: 15px; */
	    background-color: white;
	    padding: 5px
	    }    
	    .buttonaddN{
	    padding: 6px 18px;
	    margin-bottom: 30px;
	    font-size: 14px;
	    font-weight: 400;
	    -ms-touch-action: manipulation;
	    cursor: pointer;
	    border: 1px solid transparent;
	    border-radius: 2px;
	    color: #fff;
	    background-color: #2D86E1;
	    float: right;
	    margin-right: 10px;
	    }
	#step1Li{
		float: left;
	}
	input{
	background:#fff;
	}
	.infotitle{
		width:100px;
		margin-left: 10px;
	}
	.boederstyle{
		border:1px solid #8adde4;
		padding:5px;
		font-size:14px;
	}
	.inputstyle{
		border:1px soild #0000;
		width:350px;
	}
	.baseInfoDetail{
		margin-top: 10px;
		display: flex;
	  	flex-direction: cow;
	}
	.fujian{
		float:left;
		color:blue;
	}
</style>
<body id="condition">
<#assign forwardPath="red"/>
    <div id="wrap">	
    <div class="step1">
    <P style="text-align: center;font-size: 15px;background: beige">
	<span style="font-size:17px;margin-left:30px" id="editTitle">香港参考价和二级限价审批申请</span></P>
	<br/>
	<#include "../workflow/process/btn_approve.ftl" />
	<input type="hidden" id='varDivisionCodes' name='varDivisionCodes' value="11"/>
	<#if forwardPath == "read">
		<input type="hidden" name="biz_processId" value="11" />
		<#include "../workflow/process/hidden_approve.ftl" />
	<#else>
	</#if>
	<p class="uptitle1">【基本信息】</p>
	<input type="hidden" id="approvalNum" value="11">
	<div class="boederstyle">
		<div class="baseInfoDetail">
			<p class="infotitle">标题</p>
			<input id="headLine" class="inputstyle" style="width:810px" type="text" disabled="true">
		</div>
		<div class="baseInfoDetail">
			<span class="infotitle">申请公文号</span>
			<input id="documentNum" class="inputstyle" type="text" onkeyup="clearNoNum(this)" maxlength="5" disabled="true">
			
			<span class="infotitle">流程 ID</span>
			<input id="apvNum" class="inputstyle" type="text" onkeyup="clearNoNum(this)" maxlength="5" disabled="true">
		</div>
		<div class="baseInfoDetail">
			<span class="infotitle">申请人工号</span>
			<input id="createUser" class="inputstyle" type="text" disabled="true">
			<span class="infotitle">申请人姓名</span>
			<input id="userName" class="inputstyle" type="text" disabled="true">
		</div>
		<div class="baseInfoDetail">
			<span class="infotitle">申请人部门</span>
			<input id="userSection" class="inputstyle"  type="text" disabled="true">
			<span class="infotitle">申请时间</span>
			<input id="userSection" class="inputstyle"  type="text" disabled="true">
		</div>
	</div>
	<p class="uptitle1">【申请信息抬头】</p>
	<div class="boederstyle">
		<div class="baseInfoDetail">
			<span class="infotitle">事业部</span>
			<input id="brandLevel" class="inputstyle" type="text" disabled="true">
			<span class="infotitle">城市</span>
			<input id="busRemarks" class="inputstyle" type="text" disabled="true">
		</div>
		<div class="baseInfoDetail">
			<span class="infotitle">货币</span>
			<input id="brandLevel" class="inputstyle" type="text" disabled="true">
			<span class="infotitle">渠道</span>
			<input id="busRemarks" class="inputstyle" type="text" disabled="true">
		</div>
		<div class="baseInfoDetail">
			<span class="infotitle">开始时间</span>
			<input id="brandLevel" class="inputstyle" type="text" disabled="true">
			<span class="infotitle">截止时间</span>
			<input id="busRemarks" class="inputstyle" type="text" disabled="true">
		</div>
	</div>	
	<p class="uptitle1">【申请信息明细】</p>
	<div class="boederstyle" >
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
			            	<td colspan="16">暂无申请信息明细</td>
			            </tr>
					</tbody>
				 </table>
			   </div>
				<div class="info clearfix">
					<div class="page">
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
        
        <p class="uptitle1">【附件】</p>
		<div class="boederstyle" >
			<div class="baseInfoDetail">
				<div class="infotitle" style="width:80px">附件下载 : </div>
				<div class="fujian"><a href="javascript:;">xxxxxxx.zpi</a></div>
			</div>
		</div>
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<#include "/common/head_inc.ftl"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>苏宁商家运营服务平台-供应商修改用户名审批查看</title>
    <link rel="shortcut icon" href="http://www.suning.com/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/open.css"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/plugins/zTree-3.5.12/css/zTreeStyle/zTreeStyle.css"/>
</head>
<style type="text/css">
.success-big-table td {white-space:normal;word-break:break-all; word-wrap:break-word;}

</style>
<body>
<#--后台管理——修改用户名和组织机构代码 V20130325-->
	<!--页面头部-->
	<#include "/main/common/head.ftl"/>
	<!--面包屑 [[-->
	<div class="bread bread2">
		<span>您当前位置：</span>
		<a href="${request.contextPath}/main/bsp.action" title="" >首页</a>
		<em>&gt;</em><i>商户管理</i>
		<em>&gt;</em><i>商户入驻管理</i>
		<em>&gt;</em><i>自营商户用户名审批</i>
	</div>
	
	<!-- 主体内容 [[-->
	<div class="main main2">
		<div class="case-scroll case-scroll2">
			<div class="case">
				<div class="case-top-title">BSP后台修改用户名查看</div>
			</div>
			<div class="gonggong-table">
				<div class="wenjiuan-area">
					<form id="serarchForm" method="post" action="${ctxPath}/modifyUser/selectMoNameOrg.action">
						<input type="hidden" name="page" id="page" value="1"/>
						<div class="case-top-btn">
							<em class="tijiao on1 mlmr0" onclick="goSearch();"><span>查询</span></em>
						</div>
						<div class="l zuoleft p140" style="margin-right:30px;">
							登录账号： <input id="userName" name="userName" type="text" value="${RequestParameters.userName!''} "class="uitext w138"/>
						</div>
					</form>
				</div>
				
				<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
					<colgroup>
						<col width="80"></col>
						<col width="250"></col>
						<col width="200"></col>
						<col width="250"></col>
						<col width="180"></col>
						<col width="180"></col>
						<col width="140"></col>
						<col width="260"></col>
						<col width="150"></col>
					</colgroup>
					<tr>
						<th>序号</th>
						<th>原邮箱</th>
						<th>会员编码</th>
						<th>新邮箱</th>
						<th>操作人</th>
						<th>操作时间</th>
						<th>操作结果</th>
						<th>备注</th>
						<th>附件</th>
					 </tr>
					 <#assign x=0>
					<#if pageInfo.list??>
					<#list pageInfo.list as nameList>
						<#assign x=x+1>
						<tr>
							<td>${x}</td>
							<td>${nameList.oldVal!''}</td>
							<td>${nameList.custNum!''}</td>
							<td>${nameList.newVal!''}</td>
							<td>${nameList.operator!''}</td>
							<td>${nameList.createTime!''}</td>
							<td>${nameList.status!''}</td>
							<td>${nameList.remarks!''}</td>
							<td><a href="${nameList.scanCopy}">查看附件</a></td>
						</tr>
					</#list>
					</#if>
				</table>
				<div class="snPages mt10">
					<#import "../common/pager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        	<@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${ctxPath}/modifyUser/selectMoNameOrg.action"/>
  			        </#if>
				</div>
			</div>
		</div>
	</div>
	<!-- 主体内容 ]]-->
	<!--- 左侧菜单 [[-->
	<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
	<div class="nei-nav">
		<#include "/main/common/leftMenu.ftl"/>
	</div>
</body>
</html>
<script type="text/javascript" src="http://script.suning.cn/javascript/jquery.js"></script>
<script type="text/javascript" src="${ctxPath}/staticfile/js/open.js"></script>
<script type="text/javascript">
	function goSearch(){
		$("#serarchForm").submit();
	}
	
	function jumpPage(no,url) { 
	    var serarchForm = document.getElementById("serarchForm");
	    var pageCount = ${((pageInfo.totalRecords+pageInfo.pageSize -1)/pageInfo.pageSize)?int};
	    if(no>pageCount){
	    	no=pageCount;
	    }
		if(no<1){
			no=1;
		}
	    serarchForm.page.value=no;
	    serarchForm.action=url+"?cache=" + Math.random();;
	    serarchForm.submit();
	}	
	
</script>
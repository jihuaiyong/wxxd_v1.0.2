<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁商家运营服务平台"/>
    <meta name="description" content="苏宁商家运营服务平台"/>
    <title>苏宁商家运营服务平台</title>
    <link rel="shortcut icon" href="${domain.url}/sel/portal/images/favicon.ico" type="image/x-icon"/>
   	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/common.css"/>
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/open.css"/>
</head>
<body>
<!--页面头部-->
<#include "../common/head.ftl"/>
<#assign domain_url="${domain.url}">
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action">首页</a><em>&gt;</em><i>调查问卷管理</i><em>&gt;</em><i>在线建议查询</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll" style ="margin-left: 0;">
		<div class="case">
			<div class="case-top-title">在线建议查询</div>
		</div>
		<div class="gonggong-table">
			<form name="form1" id="form1" action="${request.contextPath}/userAdvice/selectAdviceInfo.action" method="post">
			<div class="wenjiuan-area">
				<div class="case-top-btn">
					<em class="tijiao on1 mlmr0" onclick="doSearch();"><span>查询</span></em>
				</div>
				<div class="l">
					所属模块：<select name="adviceType" id="adviceType" class="zhanshiweizhi2 uitext" style="height: 26px;margin-bottom: 3px;padding-bottom: 3px;color: black">
							<option value="">请选择服务</option>
				            <option value="1">合同管理</option>
				            <option value="2">商品管理</option>
				            <option value="3">物流管理</option>
				            <option value="4">财务管理</option>
				            <option value="5">客户服务</option>
				            <option value="6">系统设置</option>
					</select>
				</div>
				<dl class="start-data zuoleft pl40">
					<dt>日期：</dt>
					<dd class="pre">
						<input id="createtimeBegin" name="createtimeBegin" type="text" onFocus="WdatePicker({isShowClear:false,readOnly:true,isShowClear:true})" value="${RequestParameters.createtimeBegin!''}" class="uitext w138">
						<em onclick="WdatePicker({el:'createtimeBegin'})"></em>
					</dd>
				</dl>
				<dl class="start-data zuoleft">
					<dt class="plr4">至</dt>
					<dd class="pre">
						<input id="createtimeEnd" name="createtimeEnd" type="text" onFocus="WdatePicker({isShowClear:false,readOnly:true,isShowClear:true})" value="${RequestParameters.createtimeEnd!''}" class="uitext w138">
						<em onclick="WdatePicker({el:'createtimeEnd'})"></em>
					</dd>
				</dl>
			</div>
			</form>
			<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
			  <colgroup>
				<col width="180"></col>
				<col width="100"></col>
				<col width="80"></col>
				<col width=""></col>
				<col width=""></col>
				<col width=""></col>
				<col width=""></col>
				<col width="80"></col>
			  </colgroup>
			  <tr>
				<th>用户名</th>
				<th>填写时间</th>
				<th>功能模块</th>
				<th><div class="wenti" v="您对交易中心页面布局的建议？">问题1</div></th>
				<th><div class="wenti" v="您对交易中心操作体验上的建议？">问题2</div></th>
				<th><div class="wenti" v="您认为交易中心功能菜单实用性是否满足需求，是否需要增加？">问题3</div></th>
				<th>其他建议</th>
				<th>附件</th>
			  </tr>
			  <#if adviceInfo??>
						<#if adviceInfo.list??>
							<#list adviceInfo.list as summay>
							  <tr>
								<td>${summay.USERNAME!'无'}</td>
								<td>${summay.CREATETIME!'无'}</p></td>
								<td>${summay.ADVICETYPE!'无'}</td>
								<td>${summay.ADVICEONE!''}</td>
								<td>${summay.ADVICETWO!''}</td>
								<td>${summay.ADVICETHREE!''}</td>
								<td>${summay.OTHERADVICE!''}</td>
								<#if summay.ATTACHMENT ??>
										<#if summay.ATTACHMENT != "">
											<td><a href="${domain_url}/ihsdata/${summay.ATTACHMENT}">下载</a></td>
										<#else>
										 	<td>无</td>
										</#if>
									<#else>
										 <td>无</td>	
									</#if>
							  </tr>
						    </#list>
					   </#if>
			  </#if>			  
							  
			</table>
			
			<a class="goback mt10" href="javascript:doReport();"><span>导出</span></a>
			<div id="pager" style="float:right;margin-top: 10px;">
				<#if adviceInfo??>
		      		<#import "/common/pager.ftl" as q>
		  			<#if Request.adviceInfo.totalRecords??>
		  				<@q.pager page=adviceInfo.page pageSize=adviceInfo.pageSize totalRecords=adviceInfo.totalRecords toURL="${request.contextPath}/userAdvice/selectAdviceInfo.action"/>
		  			</#if>
		  		</#if>	
		    </div> 
		</div>
	</div>
</div>
<div class="wenti-tck" style="top: 291px; left: 550.8px; display: none;">
<div class="arrowtop"></div>
<div class="wenti-content"></div>
</div>
<form id="pageForm" name="pageForm">
	<input type="hidden" name="page" id="page" value="${(pageInfo.page)!'1'}"/>
</form>
<!-- 主体内容 ]]-->
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
<#include "../common/leftMenu.ftl"/>
</div>
<!--- 左侧菜单 ]]-->
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
<script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
</body>
<script type="text/javascript">
	$(document).ready(function() {
		$("#adviceType").val(${adviceType});
	});

	function doSearch(){
		if(!checkEndTime()){
			alert("结束时间必须大于开始时间");
			return;
		}
		$("#form1").submit();
	}
	
	function doReport(){
		$("#form1").attr("action","${request.contextPath}/userAdvice/doReport.action");
		$("#form1").submit();
		$("#form1").attr("action","${request.contextPath}/userAdvice/selectAdviceInfo.action");
	}
	function jumpPage(no,url) { 
		var formPage = document.pageForm;
		var pageCount = ${((adviceInfo.totalRecords+adviceInfo.pageSize -1)/adviceInfo.pageSize)?int};
		if (no>pageCount ){
		   no=pageCount;
		}
		if( no<1 ){
			no=1;
		}
		formPage.page.value=no;
		formPage.action=url+"?cache=" + Math.random();
		formPage.submit();
	}
	
	function cutstr(s){
		if(null!=s&&s.length>13){
			return s.substr(0,13)+"...";
		}
		return s;
	}
	
	function checkEndTime(){  
	    var startTime=$("#createtimeBegin").val();  
	    var start=new Date(startTime.replace("-", "/").replace("-", "/"));  
	    var endTime=$("#createtimeEnd").val();  
	    var end=new Date(endTime.replace("-", "/").replace("-", "/"));  
	    if(end<start){  
	        return false;  
	    }  
	    return true;  
	}
</script>
</html>
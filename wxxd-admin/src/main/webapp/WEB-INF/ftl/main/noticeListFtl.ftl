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
<#include "common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em><i>信息公告管理</i><em>&gt;</em><i>公告管理</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2">
		<div class="case">
			<div class="case-top-title">内部公告管理</div>
		</div>
		<div class="gonggong-table">
			<div class="wenjiuan-area">
				<form name="noticelistform" id="noticelistform" action="${request.contextPath}/main/queryNoticeList.action" method="post">
				<input type="hidden" name="page" id="page" value="1"/>
				<!--
				<div class="case-top-btn">
					<em class="tijiao on1 mlmr0"><span onclick="submitForm2QueryList();" >查询</span></em>
				</div>
				<div class="l">公告类型：
					<select id="noticeType" name="noticeType" onchange="setNoticeType1(this.value);" class="zhanshiweizhi zhanshiweizhi2">
						<#if params.noticeType ??>
							<option value="" >全部</option>
							<option value="1" <#if params.noticeType == '1'>selected</#if>>门户公告</option>
							<option value="2" <#if params.noticeType == '2'>selected</#if>>内部公告</option>
						<#else>
							<option value="" >全部</option>
							<option value="1" >门户公告</option>
							<option value="2" >内部公告</option>
						</#if>
					</select>
				</div>-->
				</form>
			</div>
			<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
			  <colgroup>
				<!--<col width="149"></col>-->
				<col width="226"></col>
				<col width="440"></col>
				<col width="160"></col>
			  </colgroup>
			  <tr>
				<!--<th>公告类型</th>
				<th>展示位置</th>-->
				<th>标题</th>
				<th>创建时间</th>
				<th>操作</th>
			  </tr>
			  <#if pageInfo.list ??>
				<#list pageInfo.list as notice>
					  <!--<tr>
						<td>
							<#if notice.noticeType ?? && notice.noticeType == '1'>
								门户公告
							<#elseif notice.noticeType == '2'>
								内部公告
							<#elseif notice.noticeType == '4'>
								交易中心重要通知
							</#if>
						</td>
						<td>
						<#if notice.noticeType ?? && notice.noticeType == '1'>
							<#if notice.showPlace ?? && notice.showPlace == '1'>
								门户首页
							<#elseif notice.showPlace == '2'>
								物流首页
							</#if>
						<#elseif notice.noticeType == '2'>
							内部首页
						<#elseif notice.noticeType == '4'>
							交易中心首页
						</#if>
						</td>-->
						<td>${notice.title!}</td>
						<td>${notice.createTime}</td>
						<td>
							<#setting number_format="#">
							<a href="javascript:;" onclick="submitForm2QuerySimple('${notice.noticeId}');">修改</a>
							<#setting number_format="#">
							<a onclick="setNoticeId(${notice.noticeId}); openWin('Pop2');"  href="javascript:;">删除</a>
							<#if notice.isTop == '0' >
								<#if notice.noticeType ?? && notice.noticeType == '1' && topNum4M lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								<#elseif notice.noticeType == '2'  && topNum4N lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								<#elseif notice.noticeType == '4'  && topNum4N lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								</#if>
							<#else>
								<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','0','${notice.noticeType}');">取消置顶</a>
							</#if>
						</td>
					  </tr>
				</#list>
			  </#if>
			</table>
			<a class="goback mt10" href="##" onclick="submitForm2InitInsert();"><span>新 增</span></a>
			<div class="snPages mt10">
				<#import "../common/pager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        <@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${request.contextPath}/main/queryNoticeList.action"/>
  			        </#if>
			</div>
		</div>
	</div>
</div>
<form name="querySimpleNoticeForm" id="querySimpleNoticeForm" action="${request.contextPath}/main/querySimpleNotice.action" method="post">
<#setting number_format="#">
<input type="hidden" name="noticeId" id="noticeId" value=""/>
<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
</form>
<form name="upTopNoticeForm" id="upTopNoticeForm" action="${request.contextPath}/main/updateNoticeIsTop.action" method="post">
<input type="hidden" name="isTop" id="isTop" value=""/>
<input type="hidden" name="noticeType2" id="noticeType2" value=""/>
<input type="hidden" name="noticeType4Top" id="noticeType4Top" value=""/>
<#setting number_format="#">
<input type="hidden" name="upNoticeId" id="upNoticeId" value=""/>
</form>

<form name="initInsertNoticeForm" id="initInsertNoticeForm" action="${request.contextPath}/main/goNewNoticeFtl.action" method="post">
<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
</form>

<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "common/leftMenu.ftl"/>
</div>
<!-- 主体内容 ]]-->
<!---遮罩层--->
<div id="grayLayer" style="display: none; width: 1423px; height: 764px;"><iframe scrolling="no" frameborder="0" id="grayLayerIframe" style="display: block; width: 1423px; height: 764px;"></iframe></div>
<div class="uiPop Pop1" style="display:none;">
    <h2>提示<em onclick="closeWin('Pop1')"></em></h2>
    <div class="uiPopcon">
        <em class="tipInfo3"></em><strong>亲，最多添加5个常用菜单奥~~</strong><br/><br/>
        <a onclick="closeWin('Pop1')" class="baocun-btn " href="javascript:;"><span>关 闭</span></a>
    </div>
</div>
<!--- 删除 [[-->
<div class="uiPop Pop2" style="top: 154.5px;width:548px;margin-left:-274px;display:none;">
    <h2>删除<em onclick="closeWin('Pop2')"></em></h2>
    <div class="uipop2-content">
      <div class="uipop2-content-top">
		<em class="tipInfo3"></em> &nbsp;确认删除此信息公告？
	  </div>
	  <dl>
	  <form name="noticeDeleteForm" id="noticeDeleteForm" onsubmit="return optInfoIsEmpty();" action="${request.contextPath}/main/deleteSimpleNotice.action" method="post"> 
		<input type="hidden" name="delNoticeId" id="delNoticeId" value=""/>
		<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
		<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
		<input type="hidden" name="optType" id="optType" value="9"/>
		<input type="hidden" name="noticeType1" id="noticeType1" value=""/>
		<input type="hidden" name="page" id="page" value="${pageInfo.page}"/>
		<input type="hidden" name="pageSize" id="pageSize" value="${pageInfo.pageSize}"/>
		<dt>简要描述：</dt>
		<dd>
			<div class="uipop2-content-textarea">
				<textarea id="optInfo" name="optInfo" class="uitextarea"></textarea>
			</div>
			<div class="zhushi-area">
				<div class="l">此为系统注释，请认真填写，方便系统监控</div>
				<div id="zxlcount" class="jishu-count r"><i>0</i> / 200</div>
			</div>
			<a href="javascript:;" class="colse-btn imsure" onclick="submitForm2Delete();"><span>删除</span></a>
			<a href="javascript:;" class="colse-btn" onclick="closeWin('Pop2')"><span>取 消</span></a>
		</dd>
		</form>
	  </dl>
    </div>
</div>
<!--- 删除 ]]-->
<!---问题框框 [[-->
<div class="wenti-tck">
	<div class="arrowtop"></div>
	<div class="wenti-content">您对交易中心页面布局建议？</div>
</div>
<!---问题框框 ]]-->
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
    <script type="text/javascript">
    
    	function setNoticeId(noticeId) {
    		$("#delNoticeId").val(noticeId);
    	}
    	
    	function setNoticeType1(noticeType) {
    			$("#noticeType1").val(noticeType);
    			$("#noticeType2").val(noticeType);
    	}
    	
    	function optInfoIsEmpty() {
	    	var optInfo = $("#optInfo").val();
	    	if (optInfo == null || optInfo == '') {
	    		alert("描述必须填写");
	    		return false;
	    	}
	    	return true;
	    }
	    
	    function submitForm2upTop(noticeId,istop,noticeType4Top) {
	    	$("#upNoticeId").val(noticeId);
	    	$("#isTop").val(istop);
	    	$("#noticeType4Top").val(noticeType4Top);
	    	document.upTopNoticeForm.submit();
	    }
	    
	    function submitForm2QuerySimple(noticeId) {
	    	$("#noticeId").val(noticeId);
	    	document.querySimpleNoticeForm.submit();
	    }
	    
	    function submitForm2InitInsert() {
	    	document.initInsertNoticeForm.submit();
	    }
	    
	    function submitForm2QueryList() {
	    	document.noticelistform.submit();
	    }
	    
	    function submitForm2Delete() {
	    	document.noticeDeleteForm.submit();
	    }
	    
	    function jumpPage(no,url) { 
	        var noticelistform = document.getElementById("noticelistform");
		    var pageCount = ${((pageInfo.totalRecords+pageInfo.pageSize -1)/pageInfo.pageSize)?int};
		    if(no>pageCount){
		    	no=pageCount;
		    }
	    	if(no<1){
	    		no=1;
	    	}
		    noticelistform.page.value=no;
		    noticelistform.action=url+"?cache=" + Math.random();;
		    noticelistform.submit();
	    }
	    <#if params.noticeType ??>
				setNoticeType1('${params.noticeType}');		
		</#if>
						
    </script>
</body>
</html>
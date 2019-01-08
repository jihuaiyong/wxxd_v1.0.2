<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁商家运营服务平台"/>
    <meta name="description" content="苏宁商家运营服务平台"/>
    <title>苏宁商家运营服务平台</title>
    <link rel="shortcut icon" href="${domain.url}/sel/portal/images/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="../staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="../staticfile/css/open.css"/>
    <script type="text/javascript">
    function submitForm2queryNotices4show(noticeId) {
    	$("#noticeId").val(noticeId);
	    document.queryNotices4showForm.submit();
    }
    
    function jumpPage(no,url) { 
		var formPage = document.pageForm;
		var pageCount = ${((pageInfo.totalRecords+pageInfo.pageSize -1)/pageInfo.pageSize)?int};
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
    
    </script>
</head>
<body>
<!--页面头部-->
<#include "common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a>
	<em>&gt;</em><i>通知公告</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2 case-scrollbg">
		<div class="pr26" style="padding-left: 42px;">
			${simpleNotice.contentHtml!}
		</div>
	</div>
	<div class="tongzhigonggao-area">
		<h3><span>公告通知</span><i></i></h3>
			<#if pageInfo.list ??>
				<#list pageInfo.list as notice>
					<#if notice.infoLink!="">
						<dl <#if notice.noticeId == simpleNotice.noticeId> class="on-click"</#if>><dt><a href="javascript:;" onclick="submitForm2queryNotices4show('${notice.noticeId}');" title="${notice.title!}" >${notice.title!}</a></dt><dd>${notice.createTime!}</dd></dl>
					<#else>
						<dl <#if notice.noticeId == simpleNotice.noticeId> class="on-click"</#if>><dt><a title="${notice.title!}">${notice.title!}</a></dt><dd>${notice.createTime!}</dd></dl>
					</#if>
				</#list>
			</#if>
		<div class="snPages mt10">
			<#import "../common/miniPager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        <@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${request.contextPath}/main/queryNotices4show.action"/>
  			        </#if>
		</div>
	</div>
</div>
<form id="pageForm" name="pageForm">
	<input type="hidden" name="page" id="page" value="${(pageInfo.page)!'1'}"/>
</form>
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "common/leftMenu.ftl"/>
</div>
<!-- 主体内容 ]]-->
<form name="queryNotices4showForm" id="queryNotices4showForm" action="${request.contextPath}/main/queryNotices4show.action" method="post">
<#setting number_format="#">
<input type="hidden" name="noticeId" id="noticeId" value=""/>
<input type="hidden" name="page" id="page" value="${(pageInfo.page)!'1'}"/>
</form>
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
		<em class="tipInfo3"></em> &nbsp;确认删除此成功案例？
	  </div>
	  <dl>
		<dt>简要描述：</dt>
		<dd>
			<div class="uipop2-content-textarea">
				<textarea id="zxlarea" class="uitextarea"></textarea>
			</div>
			<div class="zhushi-area">
				<div class="l">此为系统注释，请认真填写，方便系统监控</div>
				<div id="zxlcount" class="jishu-count r"><i>0</i> / 200</div>
			</div>
			<a href="javascript:;" class="colse-btn imsure"><span>删 除</span></a>
			<a href="javascript:;" class="colse-btn" onclick="closeWin('Pop2')"><span>取 消</span></a>
		</dd>
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
</body>
</html>
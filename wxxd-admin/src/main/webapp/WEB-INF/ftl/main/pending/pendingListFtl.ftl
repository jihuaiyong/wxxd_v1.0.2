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
</head>
<body>
<!--页面头部-->
<#include "../common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a>
	<em>&gt;</em><i>我的消息</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2 case-scrollbg">
		<div class="pr26 pr262">
			<img src="${request.contextPath}/staticfile/images/wx2.jpg" alt="欢迎来到苏宁商家运营服务平台" title="欢迎来到苏宁商家运营服务平台" width="630" height="340" class="temp-newimg"/>
			<#assign userInfoMap=Session.userInfoMapJson?eval />
			<h3>尊敬的${userInfoMap.userNickname!}：</h3>
			<p>恭喜您成为苏宁商家运营服务平台用户，系统为您分配的角色为“<b>${userInfoMap.userRoleName!}</b>”。由于此系统相关模块为管理、监控商户的功能，您在此系统上的相关操作会直接影响到SOP系统的正常运营和商户的用户体验，请按照规范流程谨慎操作！</p>
			<p>若在使用此系统时有相关问题或疑惑，请参考 <a href="${request.contextPath}/main/showHelp.action" title="帮助" target="_blank">帮助指南</a> 或咨询苏宁云台相关运维人员！</p>
			<p class="author">苏宁商家运营服务平台系统管理员</p>
			<p class="author">2013-06-24</p>
		</div>
	</div>
	<div class="tongzhigonggao-area">
		<h3><span>我的消息</span></h3>
		<dl class="on-click">
			<dt><a href="javascript:;" title="欢迎来到苏宁商家运营服务平台">▪ 欢迎来到苏宁商家运营服务平台</a></dt>
			<dd>2013-06-24</dd>
		</dl>
	</div>
</div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "../common/leftMenu.ftl"/>
</div>
<!-- 主体内容 ]]-->
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
</body>
<script type="text/javascript">
	$($(window).resize(function(){
		successScroll();
		indexBg();
	}));

	function successScroll(){
		var wh = $(window).height();
		var toph1 = $(".top").height();
		var toph2 = $(".logo-area").height();
		var toph3 = $(".bread").outerHeight();
		var toph4 = $(".case").outerHeight()+16;
		var allHeight = toph1 + toph2 + toph3 + toph4;
		var h = wh - allHeight;
		$(".case-scroll").height(wh-toph1-toph2-toph3);
		$(".index-main-scroll").height(wh-toph1-toph2-toph3-11);
		$(".main2").height(wh-toph1-toph2-toph3-11);
	}
</script>
</html>
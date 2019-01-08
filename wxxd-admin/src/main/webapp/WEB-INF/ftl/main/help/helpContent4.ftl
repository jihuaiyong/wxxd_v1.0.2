<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁商家运营服务平台"/>
    <meta name="description" content="苏宁云台内部管理系统"/>
    <title>苏宁云台内部管理系统</title>
   	<link rel="stylesheet" type="text/css" href="../staticfile/css/common.css"/>
	<link rel="stylesheet" type="text/css" href="../staticfile/css/open.css"/>
</head>
<body>
<!--页面头部-->
<#include "../common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em>
	<i>帮助指南</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2 case-scrollbg">
	<div class="pr26 pr262">
				<div class="q30"><span class="yh">Q:</span>我是一名产品负责人，我想在商家运营服务平台中增加新的功能，该如何操作？</div>
				<dl class="a">
					<dt>A:</dt>
					<dd>
						<div>关于新增功能的需求，请严格按照《商家运营服务平台功能新增的说明与规范》新增或咨询对应产品负责人。</div>
					</dd>
				</dl>
			</div>
		</div>
		<div class="tongzhigonggao-area">
			<h3><span>帮助</span><i class="qwen"></i></h3>
			<dl>
				<dt><span class="yh">Q:</span><a href="${request.contextPath}/main/showHelp.action?question=1" title="欢迎来到苏宁云台内部管理系统">什么是商家运营服务系统？</a></dt>
				<dd>2013-06-24</dd>
			</dl>
			<dl>
				<dt><span class="yh">Q:</span><a href="${request.contextPath}/main/showHelp.action?question=2" title="欢迎来到苏宁云台内部管理系统">如何成为商家运营服务系统的用户？</a></dt>
				<dd>2013-06-24</dd>
			</dl>
			<dl>
				<dt><span class="yh">Q:</span><a href="${request.contextPath}/main/showHelp.action?question=3" title="欢迎来到苏宁云台内部管理系统">可以随意使用商家运营服务系统中的功能吗？</a></dt>
				<dd>2013-06-24</dd>
			</dl>
			<dl class="on-click">
				<dt><span class="yh">Q:</span><a href="${request.contextPath}/main/showHelp.action?question=4" title="欢迎来到苏宁云台内部管理系统">我是一名产品负责人，我想在内部管理系统中增加新的功能，该如何操作？</a></dt>
				<dd>2013-06-24</dd>
			</dl>
			<dl>
				<dt><span class="yh">Q:</span><a href="${request.contextPath}/main/showHelp.action?question=5" title="欢迎来到苏宁云台内部管理系统">此系统有哪些使用要求？</a></dt>
				<dd>2013-06-24</dd>
			</dl>
		</div>
</div>
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
</body>
</html>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<#include "/common/head_inc.ftl"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>苏宁商家运营服务平台-消息配置</title>
    <link rel="shortcut icon" href="http://www.suning.com/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/open.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/main.css"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/plugins/zTree-3.5.12/css/zTreeStyle/zTreeStyle.css"/>
</head>
<body>
<#--后台管理——消息配置 -->
	<!--页面头部-->
	<#include "/main/common/head.ftl"/>
	<!--面包屑 [[-->
	<div class="bread bread2">
		<span>您当前位置：</span>
		<a href="${request.contextPath}/main/bsp.action" title="" >首页</a>
		<em>&gt;</em><i>权限管理</i>
		<em>&gt;</em><i>账号管理</i>
		<em>&gt;</em><i>账号邮箱重置</i>
	</div>
	
	<!-- 主体内容 [[-->
	<div class="main main2">
		<div class="case-scroll case-scroll2">
			<div class="case">
				<div class="case-top-title">账号邮箱重置</div>
			</div>
		 <div class="change-email">
                    <div class="eStep eStep3 clearfix">
                        <dl class="s-01">
                            <dt><p>身份验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-02"></div>
                        <dl class="s-03">
                            <dt><p>新邮箱验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-04"></div>
                        <dl class="s-05">
                            <dt><p class="on">完成</p></dt>
                            <dd><span></span></dd>
                        </dl>
                    </div>
                    
                   <div class="change-pwd change-pwd-success" style="width:450px;margin-left:200px;">
                        <div class="msg">
                            <i></i>恭喜您，您的邮箱修改成功
                        </div>
                        <div class="bd">
                        	<p>您在苏宁云台新账号名为：<em>${newAccountEmail!''}</em></p>
                        	<p>您的易付宝账户名为：<em>${eppUserName!''}</em></p>
                        </div>
                        <div class="case-top-btn" style="margin-top:40px;margin-left:80px;float:none">
							<em class="tijiao on1 mlmr0"><span><a style="color:white;" href="${request.contextPath}/main/bsp.action">返回首页</a></span></em>
						</div>
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

</script>
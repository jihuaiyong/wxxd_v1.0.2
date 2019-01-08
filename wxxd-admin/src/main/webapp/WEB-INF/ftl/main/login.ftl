<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html class="login">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="自营价格信息服务系统"/>
    <meta name="description" content="自营价格信息服务系统"/>
    <title>价格管控系统-登录入口</title>
    <link rel="shortcut icon" href="/sel/portal/images/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/login.css" />
</head>
<body>

<div class="c-login">
    <div class="login-wrap">
        <div class="login-txtbox">
        	<form id="loginFrom" name="loginFrom" method="post" action="${request.contextPath}/main/login.action">
	            <div class="input-wrap-div">
	                <input id="userName" name="userName" type="text" onblur="userNameBlur()"/>
	                <label>账号</label>
	            </div>
	            <div class="input-wrap-div">
	                <input id="password" name="password" type="password"/>
	                <label>密码</label>
	            </div>
	            <p class="error">&nbsp;<span id="loginError"></span></p>
	            <div class="login-btn">
	                <a href='javascript:void(0);' id="dengLuA" onclick="login1();">登录</a>
	            </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/js/jquery-1.8.3.js"></script>
<script type="text/javascript">
function login1() {
	var loginForm =  document.getElementById("loginFrom");
	var userName = $("#userName").val();
	var password = $("#password").val();
	if (userName == null || userName == '') {
		$("#loginError").html("*请输入登陆账号");
	}
	if (password == null || password == '') {
		$("#loginError").html("*请输入密码");
	}
	if (userName != null && userName !='' && password != null && password != '') {
		loginForm.submit();
	}
}

function userNameBlur() {
	$("#loginError").empty();
}

document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){
		$("#dengLuA").click();
	}
};
$("#loginError").empty();
<#if errorMsg ?? && errorMsg != ''>
	$("#loginError").html("${errorMsg}");
<#else>

</#if>
</script>
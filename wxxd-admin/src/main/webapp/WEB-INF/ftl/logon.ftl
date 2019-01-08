<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<#include "common/head_inc.ftl">
<title>苏宁价格信息服务系统</title>
<script type="text/javascript">
	<#-- 登录 -->
	function checkLogon(){
		var name = $("#username").val();
		var password = $("#password").val();
		if(name == "") {
			$("#loginTip").html("用户名不可为空");
			return;
		}
		if(password == "") {
			$("#loginTip").html("登录密码不可为空");
			return;
		}
		$("#logonForm").submit();
	}
	
	<#-- 从Cookie读取用户名 -->
	function foucsName(){
		var username = "";
		var undefined;
		var cookies = document.cookie;
		if(cookies==undefined || undefined==""){
			return;
		}
		var userIndex = cookies.indexOf("Login_UserName=");
		if(userIndex<0){
			document.logonForm.username.focus();
			return;
		}
		var loginStr = cookies.substr(userIndex);
		var semiIndex = loginStr.indexOf(";");
		var equalIndex = loginStr.indexOf("=");
		if(semiIndex<0){
			semiIndex = loginStr.length;
		}
		loginStr = loginStr.substr(0,semiIndex);
		username = loginStr.substr(equalIndex+1);
		$("#username").val(username)
		document.logonForm.username.focus();
	}
	
	
	$(function(){
		<#-- 回车键登录 -->
		document.onkeydown = function(e){ 
			var ev = document.all ? window.event : e; 
			if(ev.keyCode==13) {
				checkLogon();
			} 
		};
		
		<#-- 从Cookie读取用户名 -->
		foucsName();
	});
	
</script>
</head>

<body>
<div class="login_main">
<div class="login_dw">
	<div class="login_info">
    	<div class="login_right">
    		<form id="logonForm" name="logonForm" method="post" action="${ctxPath}/logon.action">
	        	<ul>
	        		<li>
	                	<label>用户名:</label>
	                    <label class="name"><input name="username" id="username" type="text" /></label>
	                    <a href="${scsLoginPath}/zsnpasswordresend.jsp" target="_blank">密码重发？</a>
	                </li>
	                <li>
	                	<label>密&nbsp;&nbsp;码:</label>
	                    <label class="name"><input name="password" type="password" id="password" /></label>
	                    <a href="${scsLoginPath}/zsnpasswordresetapply.jsp" target="_blank">忘记密码？</a>
	                </li>
	                <li class="auth">
	                	<label class="yz_text" id="loginTip"><#if msg??>${msg}</#if></label>
	                </li>
	             	<li class="botton">
	                	<label><input name="btnlogon" type="button" onclick="checkLogon()"/></label>
	                </li>
	            </ul>
            </form>
            <dl>
            	<dt class="help"><a href="javascript:void(0)" id="help_a" onclick="ObjOutshow('help',this)">您需要帮助吗？</a></dt>
                <dd class="email"><a href="mailto:aa@123.com" onclick="ObjOutshow('popup',this)">邮箱：sncwfw@cnsuning.com</a></dd>
                <dd class="iphone">服务热线：025-86303030</dd>
            </dl>   
        </div>
        <div class="login_footer">
    </div>
    </div>
    </div>
</div>

<div class="login_popup" l="1006" t="263.5" style="z-index: 100002; display: none;" id="popup">

	<div class="close_bg01">
	    	<a href="javascript:void(0)" onclick="ObjOuthide('popup');"></a>
	    </div>
	    <div class="popup_con">
	    	<p>您未安装邮件发送软件，请先安装相应的邮件发送软件后，再向苏宁客服发送邮件，谢谢您的配合！</p>
	    </div>
	    <div class="close_bg02">
	    	<a href="javascript:void(0)" onclick="ObjOuthide('popup');"></a>
	    </div>
	</div>

	<div class="login_help" t="263.5" l="1006"	style="z-index: 100002;margin-top:20px;display:none;width:780px;height:400px;" id="help">
		<div class="close_bg03">
			<a href="javascript:void(0)" onClick="ObjOuthide('help');"></a>
		</div>
		<div class="help_con">
			<dl>
				<dd>
					<a href="#" class="help_dt_icon" id="dd_icon"></a><a href="#">1、无法打开SUNING Supply Chain System网站（简称：SUNING SCS，以下同此）</a>
					<ul>
						<li>
							答：网站处于使用高峰导致拥堵，登录网站会显示中文/英文提示或无法成功登录（此类情况一般较少发生）。建议避开登录高峰期登录。
						</li>
					</ul>
				</dd>
				<dd>
					<a href="#" class="help_dt_icon"></a><a href="#">2、登录的时候提示用户名/密码不正确</a>
					<ul>
						<li>
							答：按以下方式进行排查：
						</li>
						<li>
							①未及时修改初始密码，用户在收到SCS平台的初始密码后需及时修改，以防被其他用户误用或盗用。（密码必须含有英文字母和阿拉伯数字)
						</li>
						<li>
							②请首先确认输入的用户名和密码是否正确，标准用户名为苏宁供应商编码加“01”（例如)供应商代码10000000的常规用户名1000000001），其次输入密码是否正确，特别是大小写是否正确。
						</li>
						<li>
							③由于目前部分供应商没有专人保管SCS用户密码，可能会出现A修改了密码但没有及时通知B进而导致B无法登录的情况。（建议供应商设专人保管密码，在密码修改时及时通知相关人员）
						</li>
						<li>
							解决方法：
						</li>
						<li>
						首先了解是否有其他使用人修改了密码。如果密码已经遗失，请您及时出具申请密码重置公函。方法：在SUNING SCS登录页中点击“忘记密码”打开《SUNING SCS密码重置申请表》，仔细阅读如实填写表单信息，在线提交密码重置申请，并及时寄送相关原件。
						</li>
					</ul>
				</dd>
				<dd>
					<a href="#" class="help_dt_icon"></a><a href="#">3、登录提示“会话已过期”或“session timeout”</a>
					<ul>
						<li>
							答：通常网站为了安全考虑，会设置访问时间的限制，如果进入界面一段时间没有任何操作，就会提示“会话已过期”，需要用户关闭此网页后重新打开尝试。如果您重新打开该页面时仍会出现同样的提示，那就要检查一下您的浏览器配置了。
						</li>
						<li>
							①首先请打开您的浏览器，在“工具”菜单里打开“Internet选项”，打开后，点击“隐私”，然后再点击“高级”，在“覆盖自动cookie处理”前打勾，并将“总是允许会话cookie”前也打勾并确定。
						</li>
						<li>
							②如果设置好后，还是有同样提示，您可以尝试清除电脑里的临时文件。方法：打开IE浏览器，在“工具”菜单里打开“Internet选项”，分别点击“删除文件”与“删除Cookies”。
						</li>
						<li>
							上述操作完成后，建议最好重启电脑再试。
						</li>
					</ul>
				</dd>
				<dd>
					<a href="#" class="help_dt_icon"></a><a href="#">4、使用SUNING SCS系统,对用户电脑一般要求</a>
					
					<ul><li>
							①要求安装IE6.0以上版本；
						</li>
						<li>
							②显示器分辨率要求1024 ×768像素；
						</li>
						<li>
							③要求网络带宽不低于128K。
						</li>
						<li>
							如果上述登陆问题仍然未解决，请联系苏宁财务服务热线联系，热线电话025-86303030，热线邮箱sncwfw@cnsuning.com
						</li>
						</ul>
				</dd>
			</dl>
		</div>
	</div>
	
</div>

</body>
</html>

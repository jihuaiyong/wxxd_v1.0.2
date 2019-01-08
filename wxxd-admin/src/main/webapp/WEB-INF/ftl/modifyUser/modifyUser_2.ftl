<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<#include "/common/head_inc.ftl"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
			<div class="eStep eStep2 clearfix">
                        <dl class="s-01">
                            <dt><p>身份验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-02"></div>
                        <dl class="s-03">
                            <dt><p class="on">新邮箱验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-04"></div>
                        <dl class="s-05">
                            <dt><p>完成</p></dt>
                            <dd><span></span></dd>
                        </dl>
                    </div>
					<form id="newAccountForm" method = "post">
                    <input type="hidden" name="oldAccountEmail" id="oldAccountEmail" value="${(oldAccountEmail!'')?html}"/>
                    
                    <table cellspacing="0" cellpadding="0" class="data-table" style="width:592px;">
                        <tr>
                            <td class="v-top" width="100">新邮箱地址：</td>
                            <td class="qulifi-lali">
                               <span class="sText sText-h26"><input type="text" class="qulifi-input" id="newAccount"  name="newAccount" value="请填写公司邮箱" maxlength="50" style="color:#999999"/></span>
                               <div id="newAccountTip"></div>
                            </td>
                        </tr>
                        
                        <tr>
							<td width="100" class="v-top"></td>
							 <td class="qulifi-lali">
							  	<div id="verifyNum" class="verify clearfix">
		            		 	<p id="getVerify"><a onclick="sendEmail();" href="#" class="link">免费获取验证码</a></p>
		            		 	<p id="getTimer"><span id="ssHtml" class="link">60秒后可重新发送</span></p>
		            		 	<span id="threeTime"></span>
	            		 		<div id="sendTip"></div>
                            	</div> 
                            </td>
						</tr>
                        <tr>
                            <td>验证码：</td>
                            <td class="qulifi-lali">
                               <span class="sText sText-h26"><input type="text" class="qulifi-input disabled" id="validateCode" name="validateCode" disabled="disabled" style="color:#999999" maxlength="8"/></span>
                               <div id="validateCodeTip"></div>
                            </td>
                        </tr>
                        <tr>
                        	<td class="v-top" width="100">&nbsp;</td>
                        	
                        	<td class="qulifi-lali">
	                        	<div class="case-top-btn" style="margin-top:20px;float:none">
									<em class="tijiao on1 mlmr0" onclick="modifyAccout2();"><span>下一步</span></em>
								</div>
                        	</a>
                       		<div id="commTip"></div>
                       		</td>
                        </tr>
                    </table>
                    </form>
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
<script type="text/javascript" src="${ctxPath}/staticfile/js/jquery-1.8.3.js"></script>

<script type="text/javascript" src="${ctxPath}/staticfile/js/open.js"></script>
<script type="text/javascript" src="${ctxPath}/staticfile/js/common.js"></script>
<script type="text/javascript">
 $(document).ready(function(){
		var msg = "${(message!'')?html}";
		if(msg.length>0){
			$("#commTip").html('<p class="sTip sTip-false l mt5"><em></em><span>'+msg+'</span></p');
		}
  		var obj = $("#newAccountForm");
		var newAccountTip = obj.find("#newAccountTip");
		var validateCodeTip = obj.find("#validateCodeTip");
		$("#newAccount").blur( function () { 
		checkUser();
		} );
		$("#validateCode").blur( function () { 
		var validateCode = $("#validateCode").val();
			if(validateCode.length == 0){
					validateCodeTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入验证码！</span></p>');
					return;
			}else if(validateCode.length != 8){
					validateCodeTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的验证码！</span></p>');
					return;
				}
		} );
		
		$("#newAccount").focus( function () { 
		if($("#newAccount").val()=="请填写公司邮箱"){
			$("#newAccount").attr("value","");
		}
		newAccountTip.html("");
		$("#threeTime").html("");
		$("#commTip").html("");
		} );
		
		$("#validateCode").focus( function () { 
		validateCodeTip.html("");
		$("#threeTime").html("");
		$("#commTip").html("");
		} );
});

	//校验用户名
	function checkUser(){
			var obj = $("#newAccountForm");
			var newAccountTip = obj.find("#newAccountTip");
			var newAccount = obj.find("#newAccount").val();
			if(newAccount.length == 0){
				$("#newAccount").attr("value","请填写公司邮箱");
				newAccountTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
				return;
			}else if(!isMail(newAccount)){
			   newAccountTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的邮箱格式！</span></p>'); 
				return;
			}
			var url = "${ctxPath}/modifyUser/checkNewUser.action";
			$.post(url,{userName:newAccount},function(msg){
				if(msg=="0"){
					//邮箱校验通过
					newAccountTip.html('<p class="sTip sTip-ok l mt5"><em></em><span>该邮箱作为新的登录账号</span></p>');
					$("#validateCode").removeClass("disabled");
					$("#validateCode").removeAttr("disabled ","disabled");
				}else if(msg=="1"){
					newAccountTip.html('<p class="sTip sTip-false l mt5"><em></em><span>邮箱已经存在，请更换邮箱！</span></p>');
				}else{
					newAccountTip.html('<p class="sTip sTip-false l mt5"><em></em><span>系统繁忙，请稍后再试！</span></p>');
				}
			});
		}
		//发送验证码
	function sendEmail(){
			var obj = $("#newAccountForm");
			var accountEmail = $("#newAccount").val();
			if(accountEmail == "请填写公司邮箱"){
				$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
				return;
			}else if(!isMail(accountEmail)){
			   $("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的邮箱格式！</span></p>'); 
				return;
			}
			var url = "${ctxPath}/modifyUser/checkNewUser.action";
			$.post(url,{userName:accountEmail},function(msg){
				if(msg=="0"){
					//邮箱校验通过
					//校验发送邮件状态及次数
						  var url = "${ctxPath}/modifyUser/toSendMailForNew.action";
			              $.post(url,{accountEmail:accountEmail},function(msg){
				              if(msg==4){
									$("#threeTime").html('<div class="warn-box"><em></em><p>您当日累计获取验证码已达到3次，请您24小时后重新获取验证码</p></div>');
									$("#sendTip").html("");
								}else if(msg==1 || msg==2){
									$("#getVerify").css('display','none');
									$("#getTimer").css('display','block');
									$("#sendTip").html('<p class="sTip sTip-ok l mt5"><em></em>已发送验证码到邮箱，请<a href="###" onclick="javascript:callWWW();">登录邮箱</a>查收！您还有'+msg+'次获取机会</p>');
									timer();
								}else if(msg==3){
									$("#getVerify").css('display','none');
									$("#getTimer").css('display','block');
									$("#sendTip").html('<p class="sTip sTip-ok l mt5"><em></em>已发送验证码到邮箱，请<a href="###" onclick="javascript:callWWW();">登录邮箱</a>查收！</p>');
									timer();
								}else if(msg==0){
									$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
								}else{
								$("#sendTip").html('<p class="sTip sTip-false l mt5"><em></em>系统繁忙，请稍后再试！</p>');
								}
						}); 
					
				}else if(msg=="1"){
					$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>邮箱已经存在，请更换邮箱！</span></p>');
				}else{
					$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>系统繁忙，请稍后再试！</span></p>');
				}
			});
		}
		
//60秒倒计时
	function timer(){
		var count=60;
		function _freshPass(shPass)
		{
			$("#ssHtml")[0].innerHTML = count+"秒后可重新发送";
			if(count <= 0 ){
				clearInterval(shPass);//结束进程
				$("#getTimer").css('display','none');
				$("#ssHtml")[0].innerHTML = 60+"秒后可重新发送";
				$("#getVerify").css('display','block');
			}
			count = count - 1
		}
		var shPass=setInterval(function (){_freshPass(shPass)},1000);
	}
		//登录邮箱
		function callWWW(){
			var userName = $("#newAccount").val();
			var www =""
			if(userName.indexOf('@hotmail')!=-1){
				www = "http://www.hotmail.com";
			}else if(userName.indexOf('@gmail')!=-1){
				www = "http://mail.google.com";
			}else if(userName.indexOf('@sina.com')!=-1||
					userName.indexOf('@qq.com')!=-1||
					userName.indexOf('@163.com')!=-1||
					userName.indexOf('@126.com')!=-1||
					userName.indexOf('@sohu.com')!=-1||
					userName.indexOf('@hotmail.com')!=-1||
					userName.indexOf('@139.com')!=-1||
					userName.indexOf('@foxmail.com')!=-1||
					userName.indexOf('@189.cn')!=-1){
				var start = userName.indexOf('@')+1;
				www = "http://mail."+userName.substr(start);
			}else{
				$("#sendTip").html('<p class="sTip sTip-warn l mt5"><em></em><span>请登录您的邮箱完成账号验证！</span></p>');
				return;
			}
			window.open(www);
		}
		
//下一步，设置用户名
	function modifyAccout2(){
		var obj = $("#newAccountForm");
		var accountEmail =$("#newAccount").val();
		var validateCode = $("#validateCode").val();
		if(accountEmail == "请填写公司邮箱"){
				$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
				return;
			}else if(!isMail(accountEmail)){
			   $("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的邮箱格式！</span></p>'); 
				return;
		}
		if(validateCode.length == 0){
				$("#validateCodeTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入验证码！</span></p>');
				return;
		}else if(validateCode.length != 8){
				$("#validateCodeTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的验证码！</span></p>');
				return;
			}
		var url = "${ctxPath}/modifyUser/toSendMailForNew.action";
			$.post(url,{userName:accountEmail},function(msg){
				if(msg=="0"){
					//邮箱校验通过
					//校验验证码正确性
					var url = "${ctxPath}/modifyUser/checkValidateCodes.action";
	 				$.post(url,{accountEmail:accountEmail,validateCode:validateCode},function(msg){
			 		//验证成功
			 		if(msg=="OK"){
							obj.attr("action","${ctxPath}/modifyUser/saveNewAccount.action");
							obj.submit();
						}else if(msg=="0"){
							$("#validateCodeTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入验证码！</span></p>');
						}else if(msg=="2"){
							$("#validateCodeTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的验证码！</span></p>');
						}else if(msg=="4" || msg=="5"){
							//验证码24小时失效或验证码输入5次
							$("#validateCodeTip").html('<p class="sTip sTip-false l mt5"><em></em><span>验证码已失效，请重新获取！</span></p>');
						}
					});
				}else if(msg=="1"){
					$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>邮箱已经存在，请更换邮箱！</span></p>');
				}else{
					$("#newAccountTip").html('<p class="sTip sTip-false l mt5"><em></em><span>系统繁忙，请稍后再试！</span></p>');
				}
			});
		
	}	
</script>
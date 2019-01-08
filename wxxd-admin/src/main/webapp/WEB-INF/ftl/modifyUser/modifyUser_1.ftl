<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<#include "/common/head_inc.ftl"/>
	<#--<#assign snf=JspTaglibs["http://it.cnsuning.com/snf"]>-->
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>苏宁商家运营服务平台-消息配置</title>
    <link rel="shortcut icon" href="http://www.suning.com/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/open.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/main.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/css/main.css"/>
	<link rel="stylesheet" type="text/css" href="${ctxPath}/staticfile/plugins/zTree-3.5.12/css/zTreeStyle/zTreeStyle.css"/>
   	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/plugins/uploadify-3.2/uploadify.css"/>
	
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
			<div class="eStep clearfix" style="margin-left:250px;width:700px;">
                        <dl class="s-01">
                            <dt><p class="on">身份验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-02"></div>
                        <dl class="s-03">
                            <dt><p>新邮箱验证</p></dt>
                            <dd><span></span></dd>
                        </dl>
                        <div class="s-04"></div>
                        <dl class="s-05">
                            <dt><p>完成</p></dt>
                            <dd><span></span></dd>
                        </dl>
                </div>
			<form id="modifyForm" name="modifyForm" method="post" action="">
			<div class="gonggong-table" style="margin-left:350px;">
				<div class="wenjiuan-area">
						<div class="l">
							 邮箱: <input class="uitext w138" style="margin-bottom:4px;margin-left:15px;width:180px;" type="text" name="email" id="email" maxlength="64" value="输入需要修改的账号邮箱"/>
						</div>
						 <div id="emailTip"></div>
				</div>										  
				<div  style="height:160px;" id="plBox" class="plBox">
					<p>
						备注:
					</p>
					<p style="margin-left:47px;margin-top:7px;">
					<textarea name="remarks" id="remarks" style="width:400px;height:90px;color:#999;" class="txtarea" maxlength="256" onpropertychange="checkLength(this,256);" oninput="checkLength(this,256);">请填写该商户运营对接人员的姓名及联系方式</textarea>
				   </p> 
				   <#--<span style="color:#999;margin-left:430px;"><i class="num">0</i>/<i class="count">256</i></span>-->
				  <div id="remarksTip" style="margin-left:51px;"></div>
				</div>
				<div style="margin-top:3px;">
				上传附件:<br/><span id="file_upload" ><font style="color:red">您的浏览器缺少flash插件</font></span>
		  		（附件报告中需详细说明商户名称、原邮箱、修改邮箱及修改原因，并加盖商户公章。）
		  		<br>（上传的文件类型为压缩包形式：*.ZIP,*.RAR 上传大小限制:<10MB）
		  		<div id="file_upload-queue" class="uploadify-queue"><span id="homeImgContent"></span></div>
		  		<input id="zipSrc" name="zipSrc" type="hidden" value="">
		  		 <div id="zipTip"></div>
				</div>	
				
				<div class="case-top-btn" style="margin-top:40px;margin-left:290px;float:none">
					<em class="tijiao on1 mlmr0" onclick="modifyAccoutNext();"><span>下一步</span></em>
					<span id="check" class="tipTxt"></span>
				</div>
			</div>
    </form>
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
<script type="text/javascript" src="${ctxPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${ctxPath}/staticfile/plugins/uploadify-3.2/jquery.uploadify.min.js"></script>
<script type="text/javascript" src="${ctxPath}/staticfile/js/open.js"></script>
<script type="text/javascript" src="${ctxPath}/staticfile/js/common.js"></script>
<script type="text/javascript">
function checkLength(obj,maxlength){
    if(obj.value.length > maxlength){
        obj.value = obj.value.substring(0,maxlength);
    }
}
 	/*输入框字符数限定
	function txtCount(txt,num,count){
		$(txt).keyup(function(){
		var l = $(this).val().length;
		if(l>=count){
		var str = $(this).val().substr(0,count);
		$(this).val(str);
		$(num).html(count);
		}else{
		$(num).html(l);
		}
		});
	}*/

	$(document).ready(function(){
	  /*txtCount(".plBox .txtarea",".num",256);//输入框字符数限定*/
	
    	$("#email").focus( function () { 
		if($("#email").val()=="输入需要修改的账号邮箱"){
			$("#email").attr("value","");
			return ;
		 }
        }); 
         $("#email").blur(function(){
			checkUser();
			return ;
		});
			
        $("#remarks").focus( function () { 
		if($("#remarks").val()=="请填写该商户运营对接人员的姓名及联系方式"){
			$("#remarks").attr("value","");
			return ;
		}
		});
		
		$("#remarks").blur(
			function(){
			if(!this.value){
				$("#remarks").attr("value","请填写该商户运营对接人员的姓名及联系方式");
				$("#remarksTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请填写该商户运营对接人员的姓名及联系方式！</span></p>');
				return ;
			}else{
				$("#remarksTip").html("");
			}
		});
	});

	//校验用户名
	function checkUser(){
			var emailTip = $("#emailTip");
			var email = $("#email").val();
			if(email.length == 0){
				$("#email").attr("value","输入需要修改的账号邮箱");
				emailTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
				return;
			}else if(!isMail(email)){
			   emailTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入正确的邮箱格式！</span></p>'); 
				return;
			}
			var url = "${ctxPath}/modifyUser/checkUser.action";
			$.post(url,{userName:email},function(msg){
				if(msg=="1"){
					//邮箱校验通过
					emailTip.html('<p class="sTip sTip-ok l mt5"><em></em></p>');
				}else if(msg=="0"){
					emailTip.html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
				}else{
					emailTip.html('<p class="sTip sTip-false l mt5"><em></em><span>邮箱不存在！</span></p>');
				}
			});
		}
	
	
$(document).ready(function() {
		$("#file_upload").uploadify({
			//'height'          : 20,
			//'width'           : 80,
			//'formData'        : {'someKey' : 'someValue', 'someOtherKey' : 1},
			'fileTypeDesc'    : 'RAR Files',
        	'fileTypeExts'    : '*.RAR;*.ZIP;',
        	'fileSizeLimit'   : '10MB',
			'swf'             : '${request.contextPath}/staticfile/plugins/uploadify-3.2/uploadify.swf',
			'uploader'        : '${request.contextPath}/modifyUser/uploadZIP.htm',
			'buttonText'      : '上传',
			'onUploadSuccess' : function(file, data, response) {
				 $('#file_upload').uploadify('settings','buttonText','重新上传');	
				 var src = eval(data);
				 var img = "<a href= '"+src+"' style='font-size:14px;font-weight:bold;margin-left:20px;'>查看压缩包</a>";
				 $("#homeImgContent").html(img);
				$("#zipSrc").attr("value",src);;
				$("#zipTip").html("");
			}
		});
	});	
	
//下一步，设置用户名
function modifyAccoutNext(){
	var email = $("#email").val();
	var remarks = $("#remarks").val();
	var zipSrc = $("#zipSrc").val();
	if(email == "输入需要修改的账号邮箱"){
		$("#emailTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请输入邮箱账号名！</span></p>');
		return;
	}
	if($("#remarks").val()=="请填写该商户运营对接人员的姓名及联系方式"){
		$("#remarksTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请填写该商户运营对接人员的姓名及联系方式！</span></p>');
		return;
	}else if(remarks.length > 256){
		$("#remarksTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请控制在256字符内</span></p>');
		return;
	}
	if(zipSrc.length==0){
		$("#zipTip").html('<p class="sTip sTip-false l mt5"><em></em><span>请上传附件！</span></p>');
		return;
	}
	$("#modifyForm").attr("action","${ctxPath}/modifyUser/modifyAccoutNext.action");
	$("#modifyForm").submit();
}	
</script>
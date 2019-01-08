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
<#include "common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em>
		<div class="xiala-select">菜单设置</div>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2">
		<table border="0" cellspacing="0" cellpadding="0" class="ditu-table001 ditu-table001-top">
		  <tr>
			<td>菜单设置</td>
		  </tr>
		</table>
		<table border="0" cellspacing="0" cellpadding="0" class="ditu-table002">
		  <tr>
			<td width="140"><span class="cycd">常用菜单</span><a href="javascript:;" class="shezhi">设置</a><a href="javascript:;" class="finish hide"  onclick="settingOver();">完成</a></td>
			<td class="cd-list-place">
			<#if favoritemenulist ??>
				<#list favoritemenulist as favoritemenu>
					<div class="meige-dyg">
						<span class="caidan-cell">
						<a title="${favoritemenu.menuName}"  href="##" onclick="aClickFun('${request.contextPath}/${favoritemenu.action!}','${favoritemenu.menuId!}','${favoritemenu.menuName!}');" ">${favoritemenu.menuName}</a>
						</span>
						<strong class="del" menuname="${favoritemenu.menuName}" menuid="${favoritemenu.menuId}" style="display: none;"></strong>
					</div>
				</#list>
			</#if>
			</td>
		  </tr>
		</table>
		<#if menuInfo ??>
		<#list menuInfo as menu>
		
		<table border="0" cellspacing="0" cellpadding="0" class="ditu-table001">
		  <tr>
			<td>${menu.MENUNAME!}</td>
		  </tr>
		</table>
			<#if menu.SECOND ??>
			<#list menu.SECOND as menu2 >
		<table border="0" cellspacing="0" cellpadding="0" class="ditu-table002">
		  <tr>
			<td width="140"><span class="cycd">${menu2.MENUNAME}</span></td>
				<#if menu2.THIRD ??>
				<td>
				<#list menu2.THIRD as menu3>
					<#if menu3.FLAG =='1'>
				<div class="meige-dyg"><span  class="caidan-cell"><a  href="##" onclick="aClickFun('${request.contextPath}/${menu3.action!}','${menu3.MENUID!}','${menu3.MENUNAME!}');" title="${menu3.MENUNAME!}" >${menu3.MENUNAME!}</a></span><strong menuId="${menu3.MENUID!}" menuName="${menu3.MENUNAME!}" class="jia"></strong></div>
					</#if>
					<#if menu3.FLAG !='1'>
					<div class="meige-dyg"><span class="caidan-cell" style="color:appworkspace;">${menu3.MENUNAME!}</span></div>
					</#if>
				</#list>
				</td>
				</#if>
		  </tr>
		</table>
				
			</#list>
			</#if>
		</#list>
		</#if>
	</div>
</div>
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "common/leftMenu.ftl"/>
</div>
<form id="form_settingOver" name="form_settingOver" action="${request.contextPath}/sitemap/settingOver.action" method="post">
</form>
<!-- 主体内容 ]]-->
<!---遮罩层--->
<div id="grayLayer" style="display: none; width: 1423px; height: 764px;"><iframe scrolling="no" frameborder="0" id="grayLayerIframe" style="display: block; width: 1423px; height: 764px;"></iframe></div>
<div class="uiPop Pop1" style="display:none;">
    <h2>提示<em onclick="closeWin('Pop1')"></em></h2>
    <div class="uiPopcon">
        <em class="tipInfo3"></em><strong>最多设置5个功能</strong><br/><br/>
        <a onclick="closeWin('Pop1')" class="baocun-btn " href="javascript:;"><span>关 闭</span></a>
    </div>
</div>
<div class="uiPop Pop2" style="display:none;">
    <h2>提示<em onclick="closeWin('Pop2')"></em></h2>
    <div class="uiPopcon">
        <em class="tipInfo3"></em><strong>不能重复添加同一功能</strong><br/><br/>
        <a onclick="closeWin('Pop2')" class="baocun-btn " href="javascript:;"><span>关 闭</span></a>
    </div>
</div>
	<form name="aTurnForm" id ="aTurnForm" action="" method="get" >
		<@snf.noRepeatSubmit formName="aTurnForm"/>
		<input type="hidden" name="optFuntionId" id="optFuntionId" value=""/>
		<input type="hidden" name="optFuntionName" id="optFuntionName" value=""/>
	</form>
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
<script type="text/javascript">

	function aClickFun(url,optFuntionId,optFuntionName) {
 		if (url != null && url != '') {
			$("#optFuntionId").val(optFuntionId);
			$("#optFuntionName").val(optFuntionName); 	
	 		document.aTurnForm.action = url;
	 		document.aTurnForm.submit();
 		}
 	}

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
		$(".case-scroll").height(wh-toph1-toph2-toph3-17);
		$(".index-main-scroll").height(wh-toph1-toph2-toph3-11);
		$(".main2").height(wh-toph1-toph2-toph3-11);
	}
	

	function settingOver() { 
		document.form_settingOver.submit();
	}

    function zhandianditujiajian() { 
    	$(".shezhi").click(function(){
			$(this).hide();
			$(".ditu-table002 strong.del").show();
			$(".ditu-table002 strong.jia").show();
			$(".finish").show();
		});
		$(".finish").click(function(){
			$(this).hide();
			$(".ditu-table002 strong.del").hide();
			$(".ditu-table002 strong.jia").hide();
			$(".shezhi").show();
		});
	    //加
		$(".meige-dyg strong.jia").click(function(){
			var temp = this;
			var menuId = this.getAttribute("menuId");
			var menuName = this.getAttribute("menuName");
			//问一问是否超过5条
			var flag = maxFive();
			if (flag) {
				$.ajax({
	        		type : "POST",
	        		url : "${request.contextPath}/sitemap/saveFavoriteMenu.action",
	        		data : {menuId : menuId, menuName : menuName},
	        		success : function(msg) {
	        			if (msg == -1) {
	        				openWin('Pop2');
	        			} else if (msg != -9) {
	        				var o = $(temp).parents(".meige-dyg").clone();
							o.find("strong").removeClass().addClass("del");
							o.appendTo($(".cd-list-place"));
	        			}
	        		}
	        	});
			}
			
		});
		
		//删除
		$(".del").live("click",function(){
			var temp = this;
			var menuId = this.getAttribute("menuId");
			//问一问是否超过5条
			var flag = true;//maxFive();
			if (flag) {
				$.ajax({
	        		type : "POST",
	        		url : "${request.contextPath}/sitemap/deleteFavoriteMenu.action",
	        		data : {menuId : menuId},
	        		success : function(msg) {
	        			$(temp).parents(".meige-dyg").remove();
	        		}
	        	});
			}
		});
		
		//最多5条
		function maxFive(){
			var i = null;
			i = $(".cd-list-place .meige-dyg").length;
			if(i > 4){
				openWin('Pop1');
				$(".meige-dyg strong.jia").hide();
				//$(".cd-list-place .meige-dyg:last").remove();
				return false;
			}else{
				$(".meige-dyg strong.jia").show();
				return true;
			}
		}
	}
      zhandianditujiajian();
    </script>
</body>
</html>
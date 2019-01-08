<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁商家运营服务平台"/>
    <meta name="description" content="苏宁商家运营服务平台"/>
    <title>苏宁商家运营服务平台</title>
    <link rel="shortcut icon" href="${domain.url}/sel/portal/images/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/plugins/uploadify-3.2/uploadify.css"/>
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/open.css"/>
</head>
<body>
<!--页面头部-->
<#include "common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span> 
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em>
		<a href="${request.contextPath}/mainportal/queryNoticeList.action" title="" >门户公告管理</a>
	<em>&gt;</em><i>新增门户信息公告</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<form name="insertNoticeform" id ="insertNoticeform" onsubmit="return titleIsEmpty();" action="${request.contextPath}/mainportal/main/saveNotice.action" method="post">
<div class="main main2">
	<div class="case-scroll">
		<div class="case">
			<div class="case-top-title">新增门户信息公告</div>
			<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId!}"/>
			<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName!}"/>
			<input type="hidden" name="optType" id="optType" value="1"/>
			<input type="hidden" name="showPlaceValue" id="showPlaceValue" value=""/>
			<input type="hidden" name="noticeTypeValue" id="noticeTypeValue" value=""/>
			<div class="case-top-btn">
				<em id="submit_Btnem" class="tijiao on1"><span id="submit_Btn" onclick="openWin('Pop2');">发布</span></em>
				<a href="javascript:history.back();" class="goback"><span>返回</span></a>
			</div>
		</div>
		<input type="hidden" id="thumbnail" name="thumbnail">
		<table border="0" cellspacing="0" cellpadding="0" class="new-gonggao-table" style="table-layout:fixed;width:auto;">
		  <tr>
			<td class="w108">标题：</td>
			<td  width="900">
				<input type="text" name="title" id="title" maxlength="50" onblur="titleIsEmpty();" class="uitext w172"/><span id="titleSpan" class="tipTxt"></span>
				<input type="checkbox" id="titleBoldFlag" name="titleBoldFlag" value="1">加粗 </input>
				<input type="checkbox" id="titleHotFlag" name="titleHotFlag" value="1">加HOT </input>
			</td>
		  </tr>
		  <tr>
			<td class="w108">展示位置：</td>
			<td>
				<select id="showPlace" name="showPlace" onchange="changeplace(this.value);" class="zhanshiweizhi" type="hidden">
					<option value="1">门户首页</option>
				</select>
			</td>
		  </tr>
		   <tr>
			<td class="w108">首页展示序号：</td>
			<td>
				<select id="seqNum" name="seqNum"  class="zhanshiweizhi" type="hidden">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
					<option value="6">6</option>
					<option value="9" selected>无</option>
				</select>
			</td>
		  </tr>
		   <tr>
			<td class="w108">摘要：</td>
			<td style="WIDTH: 600px;">
				<textarea style="WIDTH: 100%;" id="summary" name="summary" onblur="summaryIsEmpty();"></textarea><span id="summarySpan" class="tipTxt"></span>
			</div>
			</td>
		  </tr>
		  
		   <tr>
			<td class="w108">页面主体内容：</td>
			<td style="WIDTH: 600px;">
				<textarea style="WIDTH: 100%;" id="contentHtml" rows=15 cols=40 name="contentHtml"></textarea>
			</td>
		  </tr>
		  <!--
		  <tr>
			<td class="w108">公告类型：</td>
			<td>
				<div class="two-double">-->
					<input type="hidden" name="noticeType" id="noticeType1" value="1" onclick="changeNoticeType(1);" checked="checked"/><!--<label for="noticeType1">门户公告</label>
				</div>
			</td>
		  <tr id="placeTr">
			<td class="w108">内容简介：</td>
			<td>
				<textarea class="uitextarea jianyaomaoshu" onblur="synopsisIsEmpty();" maxlength="60" id="synopsis" name="synopsis" ></textarea><span id="synopsisSpan" class="tipTxt"></span>
			</td>
		  </tr>-->
		  <tr>
		  	<td class="w108">
		  		上传编辑图片:
		  	</td>
		  	<td>
		  		<span name="file_upload" id="file_upload" ><font style="color:red">您的浏览器缺少flash插件</font></span>
		  		(可以上传的文件类型：.gif; *.jpg; *.png,上传大小限制:<1MB)
		  		<div id="file_upload-queue" class="uploadify-queue"></div>
		  	</td>
		  </tr>
		  <!-- <tr>
		  	<td class="w108">
		  		上传公共图片:
		  	</td>
		  	<td>
		  		<span name="thumfile_upload" id="thumfile_upload" ><font style="color:red">您的浏览器缺少flash插件</font></span>
		  		(可以上传的文件类型：.gif; *.jpg; *.png,上传大小限制:<1MB)
		  		<div id="thumfile_upload-queue" class="uploadify-queue"></div>
		  	</td>
		  </tr>
		  <tr>
		  <td></td>
		  <td style="color:red;">备注：若此公告需要展示第一行，则摘要和公共图片必须维护</td>
		  </tr>-->
		</table>
	</div>
</div>
<!--- 新增[[-->
<div class="uiPop Pop2" style="top: 154.5px;width:548px;margin-left:-274px;display:none;">
    <h2>新增<em onclick="closeWin('Pop2')"></em></h2>
    <div class="uipop2-content">
      <div class="uipop2-content-top">
		<em class="tipInfo3"></em> &nbsp;确认新增公告？
	  </div>
	  <dl>
		<dt>简要描述：</dt>
		<dd>
			<div class="uipop2-content-textarea">
				<textarea id="optInfo" name="optInfo" maxlength="200" onblur="optinfoIsEmpty();" class="uitextarea"></textarea><span id="optInfoSpan" class="tipTxt"></span>
			</div>
			<div class="zhushi-area">
				<div class="l">此为系统注释，请认真填写，方便系统监控</div>
				<div id="zxlcount" class="jishu-count r"><i>0</i> / 200</div>
			</div>
			<a href="javascript:;" class="colse-btn imsure" onclick="submitForm2Insert();"><span>发布</span></a>
			<a href="javascript:;" class="colse-btn" onclick="closeWin('Pop2')"><span>取 消</span></a>
		</dd>
	  </dl>
    </div>
</div>
<!--- 新增]]-->
</form>

<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "common/leftMenu.ftl"/>
</div>
<!-- 主体内容 ]]-->
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/plugins/uploadify-3.2/jquery.uploadify.min.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/common.js"></script>
<SCRIPT type="text/javascript" src="${request.contextPath}/staticfile/plugins/tinymce-3.5.8/tiny_mce.js"></SCRIPT> 
<script type="text/javascript">
    var titleFalg = true;
    var summaryFlag = true;
	$(document).ready(function() { 
		filterSeqNum();
		inputTxtTip($('#optInfo'),$('#zxlcount'));
		$("#placeTr").hide();
      	tinyMCE.init({
			mode : "exact",
			elements : "contentHtml",
			theme : "advanced", 
			language : 'zh', 
	        plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template", 
	 		relative_urls:false,
	        // Theme options 
	        theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontselect,fontsizeselect", 
	        theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,|,forecolor,backcolor,preview", 
	        theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,ltr,rtl,|,fullscreen", 
	        theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,blockquote,pagebreak,|,insertfile,insertimage", 
	        theme_advanced_toolbar_location : "top", 
	        theme_advanced_toolbar_align : "left", 
	        theme_advanced_statusbar_location : "bottom", 
	        theme_advanced_resizing : true, 
	        
	        // Replace values for the template plugin 
	        template_replace_values : { 
	                username : "Some User", 
	                staffid : "991234" 
	        } 
		
		});
		
		$("#file_upload").uploadify({
			'height'          : 20,
			'width'           : 80,
			'fileTypeDesc'    : 'Image Files',
        	'fileTypeExts'    : '*.gif; *.jpg; *.png',
        	'fileSizeLimit'   : '1MB',
			'swf'             : '${request.contextPath}/staticfile/plugins/uploadify-3.2/uploadify.swf',
			'uploader'        : '${request.contextPath}/mainportal/uploadNoticeImg.htm;jsessionid=${jsessionid}',
			'buttonText'      : '上传',
			'onUploadSuccess' : function(file, data, response) {
				 var src = eval(data);
				 var img = "<img src= '"+src+"'></img>";
				 tinyMCE.execCommand('mceInsertContent',false,img);
			}
		});
		$("#thumfile_upload").uploadify({
			'height'          : 20,
			'width'           : 80,
			'fileTypeDesc'    : 'Image Files',
        	'fileTypeExts'    : '*.gif; *.jpg; *.png',
        	'fileSizeLimit'   : '1MB',
			'swf'             : '${request.contextPath}/staticfile/plugins/uploadify-3.2/uploadify.swf',
			'uploader'        : '${request.contextPath}/mainportal/uploadNoticeImg.htm;jsessionid=${jsessionid}',
			'buttonText'      : '上传',
			'onUploadSuccess' : function(file, data, response) {
				 var src = eval(data);
				 $("#thumbnail").val(src);
			}
		});
    }); 
    
    function titleIsEmpty() {
    	var title = $("#title").val();
    	title = $.trim(title);
    	$("#titleSpan").empty();
    	if (title == null || title == '') {
    		$("#titleSpan").append('<em class="tipFalse4"></em><i class="hongse">标题不能为空</i>');
    		titleFalg = false;
    		document.getElementById('submit_Btn').onclick=null;
    		document.getElementById('submit_Btnem').className="tijiao on4";
    		return false;
    	} else if(title.length > 40){
    		$("#titleSpan").append('<em class="tipFalse4"></em><i class="hongse">标题长度不能大于40字符</i>');
    		titleFalg = false;
    		document.getElementById('submit_Btn').onclick=null;
    		document.getElementById('submit_Btnem').className="tijiao on4";
    		return false;
    	}else {
    		$("#titleSpan").append('<em class="tipOK4"></em>');
    		titleFalg=true;
    		if(titleFalg&&summaryFlag){
    			document.getElementById('submit_Btn').onclick=function(){openWin('Pop2')};
    			document.getElementById('submit_Btnem').className="tijiao on1";
    		}
    		
    	}
    	return true;
    }
    
     //内容简介校验     
    function summaryIsEmpty(){
    	var summary = $("#summary").val();
    	summary = $.trim(summary);
    	$("#summarySpan").empty();
    	if (summary == null || summary == '') {
    		$("#summarySpan").append('<em class="tipFalse4"></em><i class="hongse">摘要不能为空</i>');
    		summaryFlag = false;
    		document.getElementById('submit_Btn').onclick=null;
    		document.getElementById('submit_Btnem').className="tijiao on4";
    		return false;
    	} else if(summary.length > 60){
    		$("#summarySpan").append('<em class="tipFalse4"></em><i class="hongse">摘要长度不能大于60字符</i>');
    		summaryFlag = false;
    		document.getElementById('submit_Btn').onclick=null;
    		document.getElementById('submit_Btnem').className="tijiao on4";
    		return false;
    	}else {
    		$("#summarySpan").append('<em class="tipOK4"></em>');
    		summaryFlag = true;
    		if(titleFalg&&summaryFlag){
    			document.getElementById('submit_Btn').onclick=function(){openWin('Pop2')};
    			document.getElementById('submit_Btnem').className="tijiao on1";
    		}
    	}
    	return true;
    }
    
	function synopsisIsEmpty() {
    	var showPlaceValue = $("#showPlaceValue").val();
    	if (showPlaceValue == '2') {
    		var synopsis = $("#synopsis").val();
	    	$("#synopsisSpan").empty();
	    	if (synopsis == null || synopsis == '') {
	    		$("#synopsisSpan").append('<em class="tipFalse4"></em><i class="hongse">内容简介不能为空</i>');
	    		synopsisFlag = false;
	    		document.getElementById('submit_Btn').onclick=null;
	    		document.getElementById('submit_Btnem').className="tijiao on4";
	    		return false;
	    	} else {
	    		$("#synopsisSpan").append('<em class="tipOK4"></em>');
	    		synopsisFlag=true;
	    		if(titleFalg&&synopsisFlag){
    				document.getElementById('submit_Btn').onclick=function(){openWin('Pop2')};
    				document.getElementById('submit_Btnem').className="tijiao on1";
    			}
	    	}
    	}
    	return true;
    }
    
	function optinfoIsEmpty() {
    	var optinfo = $("#optInfo").val();
    	$("#optInfoSpan").empty();
    	if (optinfo == null || optinfo == '') {
    		$("#optInfoSpan").append('<em class="tipFalse4"></em><i class="hongse">操作简述不能为空</i>');
    		return false;
    	}else {
    		$("#optInfoSpan").append('<em class="tipOK4"></em>');
    	}
    	return true;
    }
    
     //页面主题内容校验
   	function contentHtmlIsEmpty(){
   		var contentHtml = $("#contentHtml").val();
   		contentHtml = $.trim(contentHtml);
   		alert(contentHtml);
   		$("#contentHtmlSpan").empty();
   		if (contentHtml == null || contentHtml == '') {
    		$("#contentHtmlSpan").append('<em class="tipFalse4"></em><i class="hongse">页面主体内容不能为空</i>');
    		contentHtmlFlag = false;
    		document.getElementById('submit_Btn').onclick=null;
    		document.getElementById('submit_Btnem').className="tijiao on4";
    		return false;
    	}else{
    		contentHtmlFlag = true;
    		$("#contentHtmlSpan").append('<em class="tipOK4"></em>');
    		if(titleFalg&&summaryFlag&&contentHtmlFlag){
    			document.getElementById('submit_Btnem').className="tijiao on1";
    		}
    	}
    	return true;
   	}
    
    function changeNoticeType(type) {
    		$("#placeTr").hide();
    		$("#noticeTypeValue").val(type);
	    	var selectTemp = document.getElementById("showPlace");
	    	var newOption = new Option("门户首页","1");
	    	selectTemp.options.length = 0;
	    	if (type == 1) {
	    		selectTemp.options.add(newOption);
	    		//newOption = new Option("物流首页","2");
	    		//selectTemp.options.add(newOption);
	    	} else if (type == 2) {
	    		newOption = new Option("内部首页","1");
	    		selectTemp.options.add(newOption);
	    	} else if (type == 4) {
	    		newOption = new Option("交易中心首页","1");
	    		selectTemp.options.add(newOption);
	    	} 
    	}
    	
    function submitForm2Insert() {
	    	if (!titleIsEmpty()) {
	    		return false;
	    	}
	    	if (!summaryIsEmpty()) {
	    		return false;
	    	}
	    	if (!optinfoIsEmpty()) {
	    		return false;
	    	}
	    	document.insertNoticeform.submit();
	    }
	    
	function changeplace(splace) {
	    	var type = $("#noticeTypeValue").val();
	    	$("#showPlaceValue").val(splace);
	    	if (type == '1' && splace == '2') {
	    		$("#placeTr").show();
	    	} else {
	    		$("#placeTr").hide();
	    	}
	    }
	    
	//将已存在的seqNum去除
	function filterSeqNum(){
		<#if seqNumList??>
			<#list seqNumList as summary>
				$("#seqNum option[value='${summary.seqNum}']").remove();
			</#list>
		</#if>
	}
    </script>
</body>
</html>
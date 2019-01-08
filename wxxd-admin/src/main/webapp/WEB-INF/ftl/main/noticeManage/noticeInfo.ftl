<#--通知管理-通知列表-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁商家运营服务平台"/>
    <meta name="description" content="苏宁商家运营服务平台"/>
    <title>苏宁商家运营服务平台</title>
    <link rel="shortcut icon" href="${domain.url}/sel/portal/images/favicon.ico" type="image/x-icon"/>
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/common.css"/>
    <link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/open.css"/>
    <script type="text/javascript" src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" ></script>
</head>
<body>
<!--页面头部-->
<#include "../common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em><i>通知管理</i><em>&gt;</em><i>通知列表</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2">
		<div class="case">
			<div class="case-top-title">通知管理</div>
		</div>
		<div class="gonggong-table">
			<form name="noticelistform" id="noticelistform" action="${request.contextPath}/noticeManage/queryNoticeList.action" method="post">
				<div class="wenjiuan-area">
					<input type="hidden" name="page" id="page" value="1"/>
					<div class="l zuoleft pl20">
						通知标题: <input class="uitext w138" style=" margin-bottom: 4px;  type="text" name="noticeTitle" id="noticeTitle" value="${RequestParameters.noticeTitle!''}"/>
					</div>
					<div class="l zuoleft pl50">
						是否置顶 ：
					</div>
					<select id="isTop" name="isTop" class="zhanshiweizhi" style="height: 26px;margin-bottom: 3px;padding-bottom: 3px;color: black" autocomplete="off">
						<option value="" >全部</option>
						<option value="1" <#if RequestParameters.isTop?? && RequestParameters.isTop =='1'> selected="selected"</#if>>
							是
						</option>
						<option value="0" <#if RequestParameters.isTop?? && RequestParameters.isTop =='0'> selected="selected"</#if>>
							否
						</option>
					</select>
				
					<div class="l zuoleft pl40">
						通知类型：
					</div>
					<select id="noticeType" name="noticeType" class="zhanshiweizhi" style="height: 26px;margin-bottom: 3px;padding-bottom: 3px;color: black" autocomplete="off">
						<option value="" >全部</option>
						<option value="4" <#if RequestParameters.noticeType?? && RequestParameters.noticeType =='4'> selected="selected"</#if>>
							交易中心重要通知
						</option>
						<option value="5" <#if RequestParameters.noticeType?? && RequestParameters.noticeType =='5'> selected="selected"</#if>>
							外联通知
						</option>
					</select>
						<#--<select id="noticeType" name="noticeType" onchange="setNoticeType1(this.value);" class="zhanshiweizhi">
							<#if params.noticeType ??>
								<option value="" >全部</option>
								<option value="4" <#if params.noticeType == '4'>selected</#if>>交易中心重要通知</option>
								<option value="5" <#if params.noticeType == '5'>selected</#if>>外联通知</option>
							<#else>
								<option value="" >全部</option>
								<option value="4" >交易中心重要通知</option>
								<option value="5" >外联通知</option>
							</#if>
						</select>-->
					<dl class="start-data zuoleft pl40">
						<dt>通知发送日期: </dt>
						<dd class="pre">
							<input id="sendTime" type="text"  class="uitext w138" name="sendTime" onFocus="WdatePicker({isShowClear:true,readOnly:true})" value="${RequestParameters.sendTime!''}" class="uitext w138"/>
							<em onclick="WdatePicker({el:'effectiveDate_Search'})"></em>
						</dd>
					</dl>
				</div>
				<div class="wenjiuan-area">
					<div class="l">
						 发送人姓名： <input class="uitext w138" style=" margin-bottom: 4px;"  type="text" name="senderName" id="senderName" value="${RequestParameters.senderName!''}"/>
					</div>
					<div class="l zuoleft pl40">
						 发送人工号： <input class="uitext w138" style=" margin-bottom: 4px;"  type="text" name="senderId" id="senderId" value="${RequestParameters.senderId!''}"/>
					</div>
					<div class="case-top-btn l pl40">
						<em class="tijiao on1 mlmr0"><span onclick="submitForm2QueryList();" >查询</span></em>
					</div>
					<div class="case-top-btn l pl40">
						<a class="goback on1" href="##" onclick="submitForm2InitInsert();" style=""><span>新 增</span></a>
					</div>
				</div>	
			</form>
			<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
			  <colgroup>
				<col width="200"></col>
				<col width="180"></col>
				<col width="100"></col>
				<col width="155"></col>
				<col width="180"></col>
				<col width="160"></col>
			  </colgroup>
			  <tr>
				<th>标题</th>
				<th>公告类型</th>
				<th>是否置顶</th>
				<th>发送人</th>
				<th>创建时间</th>
				<th>操作</th>
			  </tr>
			  <#if pageInfo.list ??>
				<#list pageInfo.list as notice>
					  <tr>
					  	<td>${notice.title!}</td>
						<td>
							<#if (notice.noticeType) ?? && (notice.noticeType) == '4'>
								交易中心重要通知
							<#elseif (notice.noticeType)=='5'>
								外联通知
							</#if>
						</td>
						<#--<td>
							<#if notice.noticeType ?? && notice.noticeType == '1'>
								<#if notice.showPlace ?? && notice.showPlace == '1'>
									门户首页
								<#elseif notice.showPlace == '2'>
									物流首页
								</#if>
							<#elseif notice.noticeType == '2'>
								内部首页
							<#elseif notice.noticeType == '4'>
								交易中心首页
							<#elseif notice.noticeType == '5'>
								新的标签页中
							</#if>
						</td>-->
						<td>
							<#if (notice.isTop) ?? && (notice.isTop) == '1'>
								是
							<#elseif (notice.isTop) ?? && (notice.isTop)=='0'>
								否
							</#if>
						</td>
						<td>${notice.userName!}</td>
						<td>${notice.createTime!}</td>
						<td>
							<#--<#setting number_format="#">
							<a href="javascript:;" onclick="submitForm2QuerySimple('${notice.noticeId}');">查看</a>-->
							<#setting number_format="#">
							<a href="javascript:;" onclick="submitForm2QuerySimple('${notice.noticeId}');">修改</a>
							<#setting number_format="#">
							<a onclick="setNoticeId(${notice.noticeId}); openWin('Pop2');"  href="javascript:;">删除</a>
							<#if notice.isTop == '0' >
								<#--
								<#if notice.noticeType ?? && notice.noticeType == '1' && topNum4M lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								<#elseif notice.noticeType == '2'  && topNum4N lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								-->
								<#if notice.noticeType == '4'  && topNum lt 8 >
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								<#elseif notice.noticeType == '5'  && topNum lt 8>
									<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','1','${notice.noticeType}');">置顶</a>
								</#if>
							<#else>
								<a href="javascript:;" onclick="submitForm2upTop('${notice.noticeId}','0','${notice.noticeType}');">取消置顶</a>
							</#if>
						</td>
					</tr>
				</#list>
			  </#if>
			</table>
			
			<div class="snPages mt10">
				<#import "../../common/pager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        <@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${request.contextPath}/noticeManage/queryNoticeList.action"/>
  			        </#if>
			</div>
		</div>
	</div>
</div>
<form name="querySimpleNoticeForm" id="querySimpleNoticeForm" action="${request.contextPath}/noticeManage/querySimpleNotice.action" method="post">
<#setting number_format="#">
<input type="hidden" name="noticeId" id="noticeId" value=""/>
<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
</form>
<form name="upTopNoticeForm" id="upTopNoticeForm" action="${request.contextPath}/noticeManage/updateNoticeIsTop.action" method="post">
<#setting number_format="#">
<input type="hidden" name="isUpTop" id="isUpTop" value=""/>
<#--<input type="hidden" name="noticeType2" id="noticeType2" value=""/>-->
<input type="hidden" name="noticeType4Top" id="noticeType4Top" value=""/>

<input type="hidden" name="upNoticeId" id="upNoticeId" value=""/>
</form>

<form name="initInsertNoticeForm" id="initInsertNoticeForm" action="${request.contextPath}/noticeManage/addNotice.action" method="post">
<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
</form>

<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "../common/leftMenu.ftl"/>
</div>
<!-- 主体内容 ]]-->
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
		<em class="tipInfo3"></em> &nbsp;确认删除此信息公告？
	  </div>
	  <dl>
	  <form name="noticeDeleteForm" id="noticeDeleteForm" action="${request.contextPath}/noticeManage/deleteNotice.action" method="post"> 
		<input type="hidden" name="delNoticeId" id="delNoticeId" value=""/>
		<input type="hidden" name="optFuntionId" id="optFuntionId" value="${optFuntionId}"/>
		<input type="hidden" name="optFuntionName" id="optFuntionName" value="${optFuntionName}"/>
		<input type="hidden" name="optType" id="optType" value="9"/>
		<#--<input type="hidden" name="noticeType1" id="noticeType1" value=""/>-->
		<input type="hidden" name="page" id="page" value="${pageInfo.page}"/>
		<input type="hidden" name="pageSize" id="pageSize" value="${pageInfo.pageSize}"/>
		<dt>简要描述：</dt>
		<dd>
			<div class="uipop2-content-textarea">
				<textarea id="optInfo" name="optInfo" maxlength="200" class="uitextarea"></textarea><span id="optInfoSpan" class="tipTxt"></span>
			</div>
			<div class="zhushi-area">
				<div class="l">此为系统注释，请认真填写，方便系统监控</div>
				<div id="zxlcount" class="jishu-count r"><i>0</i> / 200</div>
			</div>
			<a href="javascript:;" class="colse-btn imsure" onclick="submitForm2Delete();"><span>删除</span></a>
			<a href="javascript:;" class="colse-btn" onclick="closeWin('Pop2')"><span>取 消</span></a>
		</dd>
		</form>
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
    <script type="text/javascript">
    
    	function setNoticeId(noticeId) {
    		$("#delNoticeId").val(noticeId);
    	}
    	
    	function setNoticeType1(noticeType) {
    			$("#noticeType1").val(noticeType);
    			$("#noticeType2").val(noticeType);
    	}
	    
	    function submitForm2upTop(noticeId,istop,noticeType4Top) {
	    	$("#upNoticeId").val(noticeId);
	    	$("#isUpTop").val(istop);
	    	$("#noticeType4Top").val(noticeType4Top);
	    	document.upTopNoticeForm.submit();
	    }
	    
	    function submitForm2QuerySimple(noticeId) {
	    	$("#noticeId").val(noticeId);
	    	document.querySimpleNoticeForm.submit();
	    }
	    
	    function submitForm2InitInsert() {
	    	document.initInsertNoticeForm.submit();
	    }
	    
	    function submitForm2QueryList() {
	    	document.noticelistform.submit();
	    }
	    
	    function submitForm2Delete() {
	    	var optinfo = $("#optInfo").val();
	    	$("#optInfoSpan").empty();
	    	if (optinfo == null || optinfo == '') {
	    		$("#optInfoSpan").append('<em class="tipFalse4"></em><i class="hongse">操作简述不能为空</i>');
	    		return false;
	    	}else {
	    		$("#optInfoSpan").append('<em class="tipOK4"></em>');
	    	}
		    document.noticeDeleteForm.submit();
	    }
	        
	    function jumpPage(no,url) { 
	        var noticelistform = document.getElementById("noticelistform");
		    var pageCount = ${((pageInfo.totalRecords+pageInfo.pageSize -1)/pageInfo.pageSize)?int};
		    if(no>pageCount){
		    	no=pageCount;
		    }
	    	if(no<1){
	    		no=1;
	    	}
		    noticelistform.page.value=no;
		    noticelistform.action=url+"?cache=" + Math.random();;
		    noticelistform.submit();
	    }
	    
						
    </script>
</body>
</html>
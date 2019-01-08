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
    <script src="${request.contextPath}/staticfile/js/jquery-1.8.3.js" type="text/javascript"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" ></script>
<#setting number_format="#">    
    <script type="text/javascript">
    
    	function changeMenuGrade(grade,parentPrivilegeCode) {
    		var url = "${request.contextPath}/main/queryPrivilegeList.action";
    		
    		if (grade == 1) {
    			$("#privilegeCode1").val(parentPrivilegeCode);
    			if (parentPrivilegeCode == null || parentPrivilegeCode == '') {
    				 $("#privilegeCode2").val("");
    			}
    		}
    		if (grade == 2) {
    			$("#privilegeCode2").val(parentPrivilegeCode);
    			if (parentPrivilegeCode == null || parentPrivilegeCode == '') {
    				 $("#privilegeCode").val("");
    			}
    		}
    		var params = {'grade':grade,'parentId':parentPrivilegeCode,'status':1};
    		if (parentPrivilegeCode == null || parentPrivilegeCode == '' || parentPrivilegeCode == '请选择'  ) {
    			var selectTemp = document.getElementById("select"+(grade+1));
	            var newOption = new Option("请选择","");
	            selectTemp.options.length = 0;
	            selectTemp.options.add(newOption,0);
    			return;
    		} else {
    			$.ajax({
	            	type:"POST",
	                async: true,
	                url: url,
	                data: params,
	                success: function(privilegeList){
	                	if(privilegeList!=null && privilegeList != ''){
	                		var selectTemp = document.getElementById("select"+(grade+1));
	                		var newOption = new Option("请选择","");
	                		var i = 0;
	                		selectTemp.options.length = 0;
	                		selectTemp.options.add(newOption,0);
	                		for (privilege in privilegeList) {
	                			newOption = new Option(privilegeList[i].menuName,privilegeList[i].menuId);
	                			selectTemp.options.add(newOption);
	                			i++;
	                		}
	                	}       
	           		}    	 
		    	});	
    		}

    	}
    	
    	function setPrivilegeCode(privilegecode) {
    		$("#privilegeCode").val(privilegecode);
    	}
    	
    	function valiPrivilegeCode() {
    		var privilegecode = $("#privilegeCode").val();
    		var privilegecode1 = $("#privilegeCode1").val();
    		var privilegecode2 = $("#privilegeCode2").val();
    		
    		if ((privilegecode != null && privilegecode != '') && (privilegecode1 != null && privilegecode1 != '') && (privilegecode2 != null && privilegecode2 != '')) {
    			return true;
    		} else if ((privilegecode == null || privilegecode == '') && (privilegecode1 == null || privilegecode1 == '') && (privilegecode2 == null || privilegecode2 == '')) {
    			return true;
    		} else {
    			alert("请选择所属功能模块");
    			return false;
    		}
    		return true;
    	}
    	
    	function submitForm2QueryList() {
    		if (valiPrivilegeCode()) {
	    		$("#type").val("3");
		    	document.optlistform.submit();
    		}
	    }
	    
	   	function jumpPage(no,url) { 
		    	var optlistform = document.getElementById("optlistform");
			    var pageCount = ${((pageInfo.totalRecords+pageInfo.pageSize -1)/pageInfo.pageSize)?int};
			    if(no>pageCount){
			    	no=pageCount;
			    }
		    	if(no<1){
		    		no=1;
		    	}
		    	optlistform.page.value=no;
			    optlistform.action=url+"?cache=" + Math.random();;
			    optlistform.submit();
	    }
	    
	    function doReport(){
	    	$("#endTime").val($("#endTimeCho").val());
	    	$("#startTime").val($("#startTimeCho").val());
			$("#optlistform").attr("action","${request.contextPath}/main/queryOperationLogList4Out.action");
			$("#optlistform").submit();
			$("#optlistform").attr("action","${request.contextPath}/main/queryOperationLogList.action");
			closeWin('Pop2');
		}
    </script>
    
</head>
<body>
<!--页面头部-->
<#include "common/head.ftl"/>
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action" title="" >首页</a><em>&gt;</em><i>操作记录</i><em>&gt;</em><i>内部操作记录</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll case-scroll2">
		<div class="case">
			<div class="case-top-title">内部操作记录</div>
		</div>
		<div class="gonggong-table">
			<div class="wenjiuan-area">
				<form name="optlistform" id ="optlistform" action="${request.contextPath}/main/queryOperationLogList.action" method="post" >
				<input type="hidden" name="page" id="page" value="1"/>
				<input type="hidden" name="privilegeCode" id="privilegeCode" value="${params.privilegeCode!}"/>
				<input type="hidden" name="privilegeCode2" id="privilegeCode2" value="${params.privilegeCode2!}"/>
				<input type="hidden" name="privilegeCode1" id="privilegeCode1" value="${params.privilegeCode1!}"/>
				<input type="hidden" name="type" id="type" value="2"/>
				<input type="hidden" name="endTime" id="endTime" value=""/>
				<input type="hidden" name="startTime" id="startTime" value=""/>
				<div class="case-top-btn">
					<em class="tijiao on1 mlmr0"><span onclick="submitForm2QueryList();">查询</span></em>
				</div>
					<#if userTypeFlag ?? && userTypeFlag == '1'>
						<input type="text" id="operatorStr" name="operatorStr" <#if params.operatorStr ??> value="${params.operatorStr}" </#if> rel="操作人/操作工号" value="操作人/操作工号" class="uitext w150">
					</#if>
				<div class="l">
					<select id="select1" name="select1" onchange="changeMenuGrade(1,this.value)" class="zhanshiweizhi zhanshiweizhi2 h22">
						<option value="">请选择</option>
						<#if (menuOneList) ??>
							<#list menuOneList as privilege>
								  <option value="${privilege.menuId}" <#if params.privilegeCode1 ?? && params.privilegeCode1 == privilege.menuId?c>selected</#if> >${privilege.menuName}</option>
							</#list>
						  </#if>
					</select>
					<select id="select2" name="select2" onchange="changeMenuGrade(2,this.value)" class="zhanshiweizhi zhanshiweizhi2 h22">
						<option value="">请选择</option>
						<#if (menuTwoList) ??>
							<#list menuTwoList as privilege1>
								  <option value="${privilege1.menuId}" <#if params.privilegeCode2 ?? && params.privilegeCode2 == privilege1.menuId?c>selected</#if>  >${privilege1.menuName}</option>
							</#list>
						  </#if>
					</select>
					<select id="select3" name="select3" onchange="setPrivilegeCode(this.value)" class="zhanshiweizhi zhanshiweizhi2 h22">
						<option value="">请选择</option>
						<#if (menuThreeList) ??>
							<#list menuThreeList as privilege2>
								  <option value="${privilege2.menuId}" <#if params.privilegeCode ?? && params.privilegeCode == privilege2.menuId?c>selected</#if>>${privilege2.menuName}</option>
							</#list>
						  </#if></select>
				</div>
				</form>
			</div>
			<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
			  <colgroup>
				<col width="145"></col>
				<col width="153"></col>
				<col width="178"></col>
				<col width="182"></col>
				<col width="411"></col>
			  </colgroup>
			  <tr>
				<th>功能模块</th>
				<th>操作人</th>
				<th>操作时间</th>
				<th>类型</th>
				<th>简要描述</th>
			  </tr>
			  <#if (pageInfo.list) ??>
				<#list pageInfo.list as operationLog>
					  <tr>
						<td>${operationLog.OPTFUNTIONNAME}</td>
						<td>${operationLog.OPERATORNAME}（${operationLog.OPERATORID!}）</td>
						<td>${operationLog.OPTTIME}</td>
						<td>
							<#if operationLog.OPTTYPE == 1>
								增加
							<#elseif operationLog.OPTTYPE == 2>
								修改
							<#elseif operationLog.OPTTYPE == 3>
								其他
							<#elseif operationLog.OPTTYPE == 9>
								删除
							<#else>
								未知
							</#if>
						</td>
						<td>${operationLog.OPTINFO}</td>
					  </tr>
				</#list>
			  </#if>
			</table>
			<a class="goback mt10" href="javascript:;" onclick="openWin('Pop2');"><span>导出</span></a>
			<div class="snPages mt10">
				<#import "../common/pager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        <@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${request.contextPath}/main/queryOperationLogList.action"/>
  			        </#if>
			</div>
		</div>
	</div>
</div>
<!--主体内容 ]]-->
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
		<!---主体左侧菜单 -->
		<#include "common/leftMenu.ftl"/>
</div>
<!---遮罩层--->
<div id="grayLayer" style="display: none; width: 1423px; height: 764px;"><iframe scrolling="no" frameborder="0" id="grayLayerIframe" style="display: block; width: 1423px; height: 764px;"></iframe></div>
<div class="uiPop Pop1" style="display:none;">
    <h2>提示<em onclick="closeWin('Pop1')"></em></h2>
    <div class="uiPopcon">
        <em class="tipInfo3"></em><strong>亲，最多添加5个常用菜单奥~~</strong><br/><br/>
        <a onclick="closeWin('Pop1')" class="baocun-btn " href="javascript:;"><span>关 闭</span></a>
    </div>
</div>
<!--- 导出 [[-->
<div class="uiPop Pop2" style="top: 154.5px;width:548px;margin-left:-274px;display:none;">
    <h2>导出<em onclick="closeWin('Pop2')"></em></h2>
    <div class="uipop2-content">
      <div class="uipop2-content-top">
		<em class="tipInfo3"></em> &nbsp;导出数据
	  </div>
	  <dl>
		<dt>查询时间：</dt>
		<dd>
			<div class="date1">
				<input id="startTimeCho" type="text" class="date uiText w120 Wdate" name="startTimeCho" onFocus="WdatePicker({isShowClear:true,readOnly:true})" value="" />-
				<input id="endTimeCho" type="text" class="date uiText w120 Wdate" name="endTimeCho" onFocus="WdatePicker({isShowClear:true,readOnly:true})" value="" />
			</div>
			<div class="zhushi-area">
				<div>最多只可导出三十天的数据，不选则以当前时间为结束时间。</div>
			</div>
			<div>
			<a href="javascript:;" class="colse-btn imsure" onclick="doReport();"><span >导 出</span></a>
			<a href="javascript:;" class="colse-btn" onclick="closeWin('Pop2')"><span>取 消</span></a>
			</div>
		</dd>
	  </dl>
    </div>
</div>
<!--- 导出 ]]-->
<!---问题框框 [[-->
<div class="wenti-tck">
	<div class="arrowtop"></div>
	<div class="wenti-content">您对交易中心页面布局建议？</div>
</div>
<!---问题框框 ]]-->
<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="http://script.suning.cn/javascript/jquery.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
</body>
</html>
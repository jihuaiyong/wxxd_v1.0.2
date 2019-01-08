<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content="苏宁云台内部管理系统"/>
    <meta name="description" content="苏宁云台内部管理系统"/>
    <title>苏宁云台内部管理系统</title>
   	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/common.css"/>
	<link rel="stylesheet" type="text/css" href="${request.contextPath}/staticfile/css/open.css"/>
</head>
<body>
<!--页面头部-->
<#include "../common/head.ftl"/>
<#assign domain_url="${domain.url}">
<!--面包屑 [[-->
<div class="bread bread2">
	<span>您当前位置：</span>
	<a href="${request.contextPath}/main/bsp.action">首页</a><em>&gt;</em>
	<i>敏感词</i><em>&gt;</em><i>敏感词管理</i>
</div>
<!--面包屑 ]]-->
<!-- 主体内容 [[-->
<div class="main main2">
	<div class="case-scroll" style ="margin-left: 0;">
		<div class="case">
			<div class="case-top-title">敏感词管理</div>
		</div>
		<div class="gonggong-table">
			<form name="form1" id="form1" action="${request.contextPath}/censorword/querySensitiveWords.action" method="post">
			<input type="hidden" name="page" id="page" value="${(pageInfo.page)!'1'}"/>
			<div class="wenjiuan-area">
				<div class="case-top-btn">
					<em class="tijiao on1 mlmr0" onclick="doSearch();"><span>查询</span></em>
				</div>
				<div class="l">
					敏感词：<input id="censorWord" name="censorWord" type="text" value="${RequestParameters.censorWord!''}" class="uitext w138">
				</div>
			</div>
			</form>
			<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
			  <colgroup>
			  	<col width="20"></col>
				<col width="800"></col>
				<col width="200"></col>
			  </colgroup>
			  <tr>
			  	<th><input type="checkbox" name="checkAll" onclick="checkAll(this);" /></th>
				<th>敏感词</th>
				<th>创建时间</th>
			  </tr>
			  <#if sensitiveWords??>
						<#if sensitiveWords.list??>
							<#list sensitiveWords.list as summay>
							  <tr>
							  	<td><input type="checkbox" name="CWID" value = "${summay.cwid?c}" autocomplete="off"/></td>
								<td>${summay.censorWord!''}</td>
								<td>${summay.createDate!''}</td>
						    </#list>
					   </#if>
			  </#if>			  
							  
			</table>
			<a class="goback mt10" href="javascript:doDelete();"><span>删除</span></a>
			<a class="goback mt10" href="javascript:openImportWin('import');"><span>导入</span></a>
			<a class="goback mt10" href="javascript:syncCensorWordCache();"><span>同步缓存</span></a>
			<div id="pager" style="float:right;margin-top: 10px;">
				<#if sensitiveWords??>
		      		<#import "/common/pager.ftl" as q>
		  			<#if Request.sensitiveWords.totalRecords??>
		  				<@q.pager page=sensitiveWords.page pageSize=10 totalRecords=sensitiveWords.totalRecords toURL="${request.contextPath}/censorword/querySensitiveWords.action"/>
		  			</#if>
		  		</#if>	
		    </div> 
		    <div style="margin-top:20px;color:#999999;float:left">(导入说明:新建Excel文件，将"Sheet1"表重命名为"敏感词"，在表格第一列编辑敏感词)</div>
		</div>
	</div>
</div>
<div class="wenti-tck" style="top: 291px; left: 550.8px; display: none;">
<div class="arrowtop"></div>
<div class="wenti-content"></div>
</div>
<!-- 主体内容 ]]-->
<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
<!--- 左侧菜单 [[-->
<div class="nei-nav">
<#include "../common/leftMenu.ftl"/>
</div>
<!--- 左侧菜单 ]]-->
<div id="import" class="uiPop" style="top: 154.5px;width:548px;margin-left:-274px;display:none;">
    <h2>导入<em onclick="closeImportWin('import')"></em></h2>
    <div class="uipop2-content">
      <div class="uipop2-content-top">
		<em class="tipInfo3"></em> &nbsp;敏感词导入
	  </div>
	  <dl>
		<dd>
			<div class="uipop2-content-textarea" align="center">
			<form id="fileUploadForm" encType="multipart/form-data" method="post" target="formTarget" action="${request.contextPath}/censorword/doCensorwordsImprot.action">
			<iframe id="formTarget" name="formTarget" style="display:none"></iframe>
				<table style="margin-left:120px;">
					<tr>
						<td style="padding-bottom:10px">
							导入文件： <input id="improtFile" name="improtFile"  type="file" class="uitext" style="color:#999;height: 22px;width:213px"/>
						</td>
					</tr>
					<tr>
						<td style="padding-bottom:10px">
							<div style="border: 1px solid #DDDDDD;width:300px;height:300px;float:left;overflow:scroll;overflow-x: hidden">
							<h3 align="left">输出</h3>
							<div align="left" id="loading"></div>
							</div>
						</td>
					</tr>
					<tr>
						<td style="text-align: center;">
							<a href="javascript:;" class="colse-btn imsure" onClick="doImprot();"><span>提交</span></a>
							<a href="javascript:;" class="colse-btn" onclick="closeImportWin('import')"><span>关闭</span></a>
						</td>
					</tr>
				</table>
			</form>
			</div>
		</dd>
	  </dl>
    </div>
</div>


<!-- 外联js需要放在页面底部，body结束标签前 -->
<script type="text/javascript" src="${request.contextPath}/staticfile/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/open.js"></script>
</body>
<script type="text/javascript">
function checkAll(obj){
	$("input[type=checkbox][name=CWID]").attr("checked",obj.checked);
}

function doSearch(){
	$("#form1").submit();
}

function jumpPage(no,url) { 
	var formPage = document.form1;
	var pageCount = ${((sensitiveWords.totalRecords+sensitiveWords.pageSize -1)/sensitiveWords.pageSize)?int};
	if (no>pageCount){
	   no=pageCount;
	}
	if( no<1 ){
		no=1;
	}
	formPage.page.value=no;
	formPage.action=url+"?cache=" + Math.random();
	formPage.submit();
}	
	
function doDelete(){
	var selectedCheckBoxes = $("input[type=checkbox][name=CWID]:checked");
	if(selectedCheckBoxes.length<=0){
		alert("请选择一条记录！");
		return;
	}
	if (!confirm("确认要删除？")) {
        return;
    }
    var CWIDS = "";
	for (var i = 0;i<selectedCheckBoxes.length;i++) {
		CWIDS = CWIDS + "~" + selectedCheckBoxes[i].value;
	}
	$.ajax({
		type:"POST",
		url:"${request.contextPath}/censorword/deleteCensorWords.action",
			data:{"cwids":CWIDS},
			success:function(flag){
				if(flag == '1'){
					alert('敏感词删除成功!');
					$("#form1").submit();
			}else{
					alert('敏感词删除失败!');
					$("#form1").submit();
			}
		}
	});
}

function openImportWin(c){
	var obj = $("#"+c);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+"px"});
}

function closeImportWin(c){
	var obj = $("#"+c);
	obj.hide();
}

function doImprot(){
	var fileName = $("#improtFile").val();
	if(fileName==""||fileName==null){
		alert("请选择文件！");
		return false;
	}
	$("#loading").html("<div id='ee'> 上传中...</div>");
	$("#formTarget").load(function(){
		 $("#ee").html($("#formTarget").contents().find("span").html());
	}); 
	$("#fileUploadForm").submit();
    return false;  
}

function syncCensorWordCache(){
	$.ajax({
		type:"POST",
		url:"${request.contextPath}/censorword/doSyncCensorWordCache.action",
			success:function(msg){
				alert(msg);
			}
	});
}
</script>
</html>
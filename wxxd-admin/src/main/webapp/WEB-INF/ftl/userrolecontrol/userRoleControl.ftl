<#--bsp后台控制角色维护功能-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<#include "/common/head_inc.ftl"/>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>苏宁商家运营服务平台</title>
    <link rel="shortcut icon" href="http://www.suning.com/favicon.ico" type="image/x-icon"/>
    <@sop.cssurl url=["staticfile/css/common","staticfile/css/open"]/>
</head>
<body>
	<!--页面头部-->
	<#include "/main/common/head.ftl"/>
	<!--面包屑 [[-->
	<div class="bread bread2">
		<span>您当前位置：</span>
		<a href="${request.contextPath}/main/bsp.action" title="" >首页</a>
		<em>&gt;</em><i>权限管理</i>
		<em>&gt;</em><i>用户管理</i>
		<em>&gt;</em><i>用户控制角色管理</i>
	</div>
	<!--面包屑 ]]-->
	<!-- 主体内容 [[-->
	<div class="main main2">
		<div class="case-scroll case-scroll2">
			<div class="case">
				<div class="case-top-title">用户违规角色控制</div>
			</div>
			<div class="gonggong-table">
				<div class="wenjiuan-area" style="height:100px;">
					<form id="serarchForm" method="post" action="${ctxPath}/userRoleControl/getControlRoleInfo.action">
						<input type="hidden" name="page" id="page" value="1"/>
						<div class="l">
							用户名：
							<textarea id="userNameArea" class="uitext w138"  style="margin-bottom: 4px; color: rgb(153, 153, 153);height:60px;width:300px">${RequestParameters.userName!''}</textarea>
							<input type="hidden" name="userName" id="userName" value="${RequestParameters.userName!''}"/>
						</div>
						
						<#--<input type="submit" value="查询"/>-->
						<div class="case-top-btn l pl20" style="margin-right: 10px;">
							<em class="tijiao on1 mlmr0"><span onclick="goSearch();">查询</span></em>
						</div>
						<div class="case-top-btn l pl20" style="margin-right: 10px;">
							<em class="tijiao on1 mlmr0"><span onclick="batchDel();">批量删除</span></em>
						</div>
						<#--<div class="case-top-btn l pl20" style="float:right">
							<em class="tijiao on1 mlmr0"><span onclick="batchDeal();">批量处理</span></em>
						</div>-->
					</form>
				</div>
				<form name="conUserRoleForm" method="post" action="${ctxPath}/userRoleControl/delConUserRole.action">
					<input type="hidden" id="ids" name="ids"/>
					<input type="hidden" name="userName" value="${RequestParameters.userName!''}"/>
					<table border="0" cellspacing="0" cellpadding="0" class="success-big-table">
						<colgroup>
							<col width="10%"></col>
							<col width="30%"></col>
							<col width="30%"></col>
							<col width="30%"></col>						
						</colgroup>
						<tr>
							<th></th>
							<th>权限代码</th>
							<th>权限名称</th>
							<th>状态描述</th>
						 </tr>
						 <#if (rolePageInfo.list)??>
						 	<#list rolePageInfo.list as detail>
						 		<tr>
						 			<td>
						 				<input type="checkbox" value="${detail.id!''}">
						 			</td>
						 			<td>
								 		${detail.roleCode!''}
						 			</td>
						 			<td>
								 		${detail.roleName!''}
						 			</td>		
						 			<td>
								 		${detail.roleDesc!''}
						 			</td>	
						 		</tr>
						 	</#list>
						 </#if>			
					</table>
				</form>
				<#if RequestParameters.userName?? &&RequestParameters.userName!=''>
					<a class="goback mt10" href="##" onclick="javascript:openWin('Pop2');"><span>增加</span></a>
				</#if>
				<#if (rolePageInfo.list)?? && rolePageInfo.list?size!=0>
					<a class="goback mt10" href="##" onclick="javascript:delConUserRole();"><span>删除</span></a>
				</#if>
				<#--				
				<div class="snPages mt10">
					<#import "../common/pager.ftl" as q>
  	                <#if (Request.pageInfo.totalRecords) ??>
  			        	<@q.pager page=pageInfo.page pageSize=pageInfo.pageSize totalRecords=pageInfo.totalRecords toURL="${ctxPath}/userRoleControl/selectAllUser.action"/>
  			        </#if>
				</div>
				-->
			</div>
		</div>
	</div>
	<!-- 主体内容 ]]-->
	<!--- 左侧菜单 [[-->
	<div id="left-arrow-boss" class="left-arrow-neiye2" style="border:0 none;"></div>
	<div class="nei-nav">
		<#include "/main/common/leftMenu.ftl"/>
	</div>
	<!--- 左侧菜单 ]]-->
	
	<div id="Pop2" class="uiPop" style="top: 154.5px;width:548px;margin-left:-274px;display:none;">
	    <h2>增加<em onclick="closeEditWin('Pop2')"></em></h2>
	    <div class="uipop2-content">
	    	<form name="roleInfoForm">
		    	<table>
		    		<tr>
		    			<td>角色名：</td>
		    			<td><input type="text" name="roleName"/></td>
		    			<td><input type="button" value="查询" onclick="selectRoleInfo();"/></td>
		    		</tr>
		    	</table>
	    	</form>
	    	<form name="addRoleInfoForm">
	    		<div id="roleInfo"></div>
	    	</form>
	    </div>
	</div>		
	
	<div id="Pop3" class="uiPop" style="top: 154.5px;width:1000px;margin-left:-500px;display:none;">
	    <h2>批量处理<em onclick="closeEditWin('Pop3')"></em></h2>
	    <div class="uipop2-content dateSelectTable ">
	    	
	    </div>
	</div>	
		
</body>
</html>
<@sop.jsurl url=["staticfile/js/open","staticfile/js/jquery-1.8.3"]/>
<script type="text/javascript">
	function openWin(c){
		var obj = $("#"+c);
		obj.show();
	}
	
	function closeEditWin(c)
	{
		$("#"+c).hide();
	}	
	
	/*批量处理 add bycaixiaoyao 20131010 start*/
	function batchDeal(){
		$.ajax({                                                                                                   
				type:"POST", 
				dataType:"html",                                                  
				url:"${request.contextPath}/userRoleControl/selectBatchInfo.action",
				data:{'roleName':'店铺控制'},                                    
				success:
				function(data){
						$(".dateSelectTable").html(data);   
					    openWin("Pop3")                                                  
			    }                                                              
		});
	}
	
	/*批量处理 add bycaixiaoyao 20131010 end*/
	
	function selectRoleInfo(){
		var roleName=$("form[name='roleInfoForm'] :input[name='roleName']").val();
		var url="${ctxPath}/userRoleControl/selectRoleInfo.action";
		var params={"roleName":roleName};
		$.post(url,params,function(roleInfoHtml){
			$("#roleInfo").html(roleInfoHtml);
		});
	}
	function addRoleInfo(){
		var url="${ctxPath}/userRoleControl/addRoleInfo.action"; 	
		var roleName=$("form[name='addRoleInfoForm'] :input[name='roleName']").val();
		var roleCode=$("form[name='addRoleInfoForm'] :input[name='roleCode']").val();
		var roleDesc=$("form[name='addRoleInfoForm'] :input[name='roleDesc']").val();
		var userName=$("#userName").val();
		var params={"roleName":roleName,"roleCode":roleCode,"roleDesc":roleDesc,"userName":userName};
		$.post(url,params,function(result){
			if('success'==result){
				alert('添加成功');
				window.location.href="${ctxPath}/userRoleControl/getControlRoleInfo.action?userName="+userName;
			}else{
				alert('添加失败');
			}
		});
	}
	function delConUserRole(){
		var ids= $("form[name='conUserRoleForm'] :checked");
		if(ids.size()==0){
			alert('请至少选中一项操作');
			return;
		}
		var idArray=new Array();
		ids.each(function(){
			idArray.push($(this).val());
		});
		$("#ids").val(idArray.toString());
		$("form[name='conUserRoleForm']").submit();
	}
	
	/*批量删除*/
	function batchDel(){
		$("#userName").val($("#userNameArea").val());
		var resultForm = document.getElementById("serarchForm");
		resultForm.action="${ctxPath}/userRoleControl/batchDelUserRolelink.action";
		resultForm.submit();
	}
	function goSearch(){
		$("#userName").val($("#userNameArea").val());
		var resultForm = document.getElementById("serarchForm");
		resultForm.action="${ctxPath}/userRoleControl/getControlRoleInfo.action";
		resultForm.submit();
	}
</script>
<div style="overflow: auto; width: 1000px;height:550px;" id="listTable">
<table style="margin-top:15px;margin-left:20px;border-collapse:collapse;"  border="0px" cellspacing="0px" >
	<#if data.list??>
	<tr>
		<#--<th style="background: none repeat scroll 0 0 #DEEAFB;height: 30px;padding: 0 14px;text-align: left;">xuhao</th>-->
		<th style="background: none repeat scroll 0 0 #DEEAFB;height: 30px;padding: 0 14px;text-align: left;width:500px;">用户名</th>
		<th style="background: none repeat scroll 0 0 #DEEAFB;height: 30px;padding: 0 14px;text-align: left;width:300px;">操作</th>
	</tr>
	<#list data.list as aa>
		<#if '1'== aa.STATE!'1'>
			<tr>
				<#--<td style="border-bottom: 1px solid #E3E3E3;height: 40px; padding: 0 14px;text-align: left;">${(aa[data.thMap.businessField])!''}</td>-->
				<td style="border-bottom: 1px solid #E3E3E3;height: 40px; padding: 0 14px;text-align: left;">${aa.userName}</td>
				<td style="border-bottom: 1px solid #E3E3E3;height: 40px; padding: 0 14px;text-align: left;"><a onclick="addStoreRoleInfo(this);" style="color:#3377CC">添加店铺控制角色</a><#--<input type="hidden" name="" value="${aa.USERCODE}"/>--></td>
			</tr>
		</#if>
	</#list>
	<#else>
	<tr>
		<td colspan="2">没有查询到数据</td>
	</tr>
	</#if>
</table>
<#if data.list??>
<#--分页form-->
<form id="selcetBatchInfoPage"  method="post" action="">
<div class="snPages mt10" style="margin-right:104px;">
	<#import "../common/pager.ftl" as q>
    <#if (Request.data.totalRecords) ??>
    <@q.pager page=data.page pageSize=data.pageSize totalRecords=data.totalRecords toURL="${request.contextPath}/userRoleControl/selectBatchInfo.action"/>
    </#if>
</div>
<div class="case-top-btn l pl20" style="padding-left:400px;" >
	<em class="tijiao on1 mlmr0"><span onclick="window.location.href='${request.contextPath}/userRoleControl/batchInsertInfo.action'">批量处理所有</span></em>
</div>
</#if>
</form>
</div>
<script type="text/javascript">
	function addStoreRoleInfo(obj){
		var url="${request.contextPath}/userRoleControl/addRoleInfo.action"; 	
		var userName=$(obj).parents("td").prev().text();
		var roleName='${roleMap.roleName}';
		var roleCode='${roleMap.roleCode}';
		var roleDesc='尊敬的商家，您好！您需要申请开店并维护相关信息。店铺申请审核通过后，方可进行店铺装修操作！';
		var params={"roleName":roleName,"roleCode":roleCode,"roleDesc":roleDesc,"userName":userName};
		$.post(url,params,function(result){
			if('success'==result){
				alert('添加成功');
				batchDeal();
			}else{
				alert('添加失败');
			}
		});
	}


	<#-- 分页查询 -->
	function jumpPage(no,url){
	    var queryUserForm = document.getElementById("selcetBatchInfoPage");
	    var pageCount = 0;
		pageCount = ${((data.totalRecords+data.pageSize -1)/data.pageSize)?int};
	    if(no>pageCount){
	    	no=pageCount;
	    }
		if(no<1){
			no=1;
		}
	    $.ajax({                                                                                                   
				type:"POST", 
				dataType:"html",                                                  
				url:url,
				data:{'page':no,'roleName':'店铺控制'},                                    
				success:
				function(data){
						$(".dateSelectTable").html("");
						$(".dateSelectTable").html(data);
			    }                                                              
		});
	}
</script>
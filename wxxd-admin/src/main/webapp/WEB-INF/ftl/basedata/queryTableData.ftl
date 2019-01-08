<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NPMS</title>
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${request.contextPath}/libs/font-uxcool/font-uxcool.css">
<link rel="stylesheet" href="${request.contextPath}/css/portal.css">
<link rel="stylesheet" href="${request.contextPath}/css/index.css">
<link rel="stylesheet" href="${request.contextPath}/css/date/daterangepicker.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap-select/bootstrap-select.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrapvalidator/dist/css/bootstrapValidator.css">
<link rel="stylesheet" href="${request.contextPath}/css/common.css">
<style type="text/css">

</style>
</head>
<body id="condition">
	<div id="wrap">
       <section class="config">
	       <form id="conditionForm" name="conditionForm"  action="${request.contextPath}/tableDataQuery/queryTableData.action" method="post">
	        <div class="input-group">
			  	<span class="input-group-addon" id="basic-addon1"><font style="color:red;">*</font>数据库：</span>
			  	<select id="dbSelect" name="dbSelect" class="form-control" style="width:180px;">
			  		 <option value="common#0"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='common#0'>
					            	selected="selected"
					            </#if>
					        >公共库</option>
				            <option value="price#0"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#0'>
					            	selected="selected"
					            </#if>
					        >价格1库</option>
				            <option value="price#1"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#1'>
					            	selected="selected"
					            </#if>
					        >价格2库</option>
				            <option value="price#2"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#2'>
					            	selected="selected"
					            </#if>
					        >价格3库</option>
				            <option value="price#3"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#3'>
					            	selected="selected"
					            </#if>
					        >价格4库</option>
				            <option value="price#4"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#4'>
					            	selected="selected"
					            </#if>
					        >价格5库</option>
					        <option value="price#5"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#5'>
					            	selected="selected"
					            </#if>
					        >价格6库</option>
				            <option value="price#6"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#6'>
					            	selected="selected"
					            </#if>
					        >价格7库</option>
				            <option value="price#7"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#7'>
					            	selected="selected"
					            </#if>
					        >价格8库</option>
				            <option value="price#8"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#8'>
					            	selected="selected"
					            </#if>
					        >价格9库</option>
				            <option value="price#9"  
				            	<#if RequestParameters.dbSelect??&&RequestParameters.dbSelect=='price#9'>
					            	selected="selected"
					            </#if>
					        >价格10库</option>
			  	  </select>
		    	  <button style="float:left;margin-left:10px;" class="buttonsearch11" onclick="querySubmit();"><span></span>&nbsp;&nbsp;执行</button>	
		    	</div>
			    <div class="l" style="width:100%;margin-top:8px;margin-bottom:8px"  >*sql执行语句<font color="red">(查询操作未做分页处理，请注意查询sql的数据量)</font>：
                </div>
                <textarea id="sql" name="sql" style="width: 100%; height: 170px; margin-top:5px;" >${RequestParameters.sql!''}</textarea> 
		    </form>	
		    		 
		    <form id="rform" name="rform" action="${request.contextPath}/tableDataQuery/queryTableData.action" method="post">
        
        	<#if errorReason??>
            <div class="l" style="width: 100%;"><font color="red"><span>错误日志：${errorReason!''}</span></font></div>
            </#if>
            
            <#if successReason??>
            <div class="l" style="width: 100%;"><span>${successReason!''}</span></div>
            </#if>
            <div id = "tablediv" style="margin-bottom:10px;height:auto;overflow:auto;width:100%">
                <table id = "tableInfodiv"   border="1" cellspacing="0" cellpadding="0" class="success-big-table success-big-table2">
                    <tr>
                    <#if fieldList??>
					<#list fieldList as map>  
					 <th style="text-align:center;padding:3px 3px;">${map['fieldDesc']}</th>
					</#list>
                	</#if>
                       
                    </tr>
                <#if pageInfo??&&pageInfo.list??&&(pageInfo.list?size>0)>
                    <#list pageInfo.list as info>
                        <tr>
                        <#if fieldList??>
							<#list fieldList as map>  
								 <td style="text-align:center;padding:3px 3px;">${info['${map["fieldName"]}']!''}</td>
							</#list>
                	</#if>
                        </tr>
                    </#list>
                </#if>
                </table>
            </div>
        </form>
        
	  </section>
	</div>
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
   	<script src="${request.contextPath}/staticfile/js/changeModel/changeModel.js"></script>
    <script	type="text/javascript">
      function querySubmit() {
            $("#conditionForm").submit();
        }
     </script>
</body>
</html>
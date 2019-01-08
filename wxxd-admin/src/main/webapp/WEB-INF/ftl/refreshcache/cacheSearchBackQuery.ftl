<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="keywords" content="" />
	<meta name="description" content="" />
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
</head>
<body id="condition">
	<section class="config">
	 	<p class="title">缓存操作</p>
	</section>
	<div id="wrap" style="height:760px;">
			<div class="row" style="width:1200px;">
				<form id="conditionForm" name="conditionForm"  action="${request.contextPath}/cachesearch/cacheSearch.action" method="post">
				<input type="hidden" id="isinit"   name="isinit" value="0" />
				<div class="col-md-2" style="width:210px;">
					<div class="input-group">
					  	<span class="input-group-addon" id="basic-addon1"><font color="red">*</font>type：</span>
					  	<select id="cacheType" name="cacheType"  class="form-control" style="width:120px;">
			                <option value="1" <#if ((RequestParameters.cacheType)!'')=='1'>selected="selected"</#if>>string</option>
			                <option value="3" <#if ((RequestParameters.cacheType)!'')=='3'>selected="selected"</#if>>hash</option>
			                <option value="2" <#if ((RequestParameters.cacheType)!'')=='2'>selected="selected"</#if>>set</option>
			                <option value="4" <#if ((RequestParameters.cacheType)!'')=='4'>selected="selected"</#if>>zset</option>
			            </select>
			         </div>
		         </div>
		         <div class="col-md-3" style="width:300px;">
			         <div class="input-group">
			            <span class="input-group-addon" id="basic-addon1"><font color="red">*</font>key：</span>
			            <input type="text" class="form-control" id="key"  name="key" value="${RequestParameters.key!''}" style="width:220px;"/>
			         </div>
			     </div>
		         <div class="col-md-3" style="width:200px;">
			         <div class="input-group">
			            <span class="input-group-addon" id="basic-addon1">field：</span>
			            <input type="text" class="form-control" id="field"  name="field" value="" style="width:120px;"/>
			         </div>
			     </div>
			     <div class="col-md-4" style="width:450px;">
					 <div class="input-group">
						<span class="input-group-addon" id="basic-addon1">value<font style='color:red;'>(插入set类型多个值用&nbsp;,&nbsp;分隔 )</font>:</span>
						<input type="text" class="form-control" id="value" name="value" value="${RequestParameters.value!''}" style="width:180px;"/>
					 </div>
				 </div>
				 </form>
			</div>
			
			<div style="width:100%;margin:10px 0;" class="input-group">	  	
		    	<button style="float:left;" class="buttondelete11" onclick="querySubmit()">查询缓存</button>
		    	<button style="float:left;margin-left:10px;" class="buttondelete11" onclick="insertSubmit()">插入缓存</button>
		    	<button style="float:left;margin-left:10px;" class="buttonsearch11" onclick="deleteSubmit()">删除缓存</button>				 
			</div>
			<div style="width:100%;margin:10px 0;" class="input-group">	 
						<div class="l">&nbsp;结果:</div>
						<#if Request.CacheInfo?exists>
		                    <div id = "resultMessage" class="l pl20">${Request.CacheInfo}</div>
	                    </#if>
	        </div>
			<div style="width:100%;" class="input-group">
				<div style="width:40%;margin:30px 10px;height:400px;float:left;">
					<table style="text-align:left;border:0px solid #d8dee3;" border="0" cellspacing="0" cellpadding="0">
					  <tr>
					  <th style='width:200px;height:30px;padding:0px 14px;text-align:left;background:#deeafb;word-break:break-all;'>value</th>
					  <th style='width:200px;height:30px;padding:0px 14px;text-align:left;background:#deeafb;word-break:break-all;'>field</th>
					  </tr>
                     <tr>
					 <td>
					 <table>
						  <#if result??>
							    <#list result as Result>
							    <tr>
								<td style="height:30px;width:250px;word-wrap:break-word;word-break:break-all;">${Result!''}</td>
							    </tr>
							    </#list>  
					      <#else>
					            <tr>
							    <td COLSPAN="1"></td>
							    </tr>
						  </#if>
					 </table>
                     </td>
                     <td>
                     <table>
						  <#if field??>
							    <#list field as Field>
							    <tr>
								<td style="height:30px;width:250px;word-wrap:break-word;word-break:break-all;">${Field!''}</td>
							    </tr>
		                        </#list>
					      <#else>
					            <tr>
							    <td COLSPAN="1"></td>
							    </tr>
							     
						  </#if>
					   </table>
					   </td>
                       </tr>
					</table>
				</div>
				<div style="width:55%;margin:30px 10px;height:400px;float:left;">
					<table style="text-align:left;border:1px solid #d8dee3;" border="1" cellspacing="0" cellpadding="0">
		    			
		    		</table>
				</div>
			</div>
	</div> 	     
		
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/common.js"></script>
	<script type="text/javascript">
		var ctx = '${request.contextPath}';
		var user = ${Session.userInfoMapJson};
        var userview = user.userName; 
		var checkfalg = 0;
    function check(){
        checkfalg = 0;
        $("#resultMessage").html('');
        if ($.trim($("#key").val()) == ""){
            npmsAlert('key不能为空');
            return;
        }
        checkfalg = 1;
	}
	function checkRight(){
        checkfalg = 0;
	    $("#resultMessage").html('');
        var value = prompt('输入暗号:', '暗号');
        if(value != "npms") {
            npmsAlert('暗号错误');
            return;
        }
        checkfalg = 1;
	}
    function querySubmit(){
        $("#resultMessage").html('');
        if ($.trim($("#key").val()) == ""){
            npmsAlert('key不能为空');
            return;
        }
        var cform = $("#conditionForm");
	    var url = "${request.contextPath}/cachesearch/cacheSearchService.action";
	    cform.attr("action",url);
	    cform.submit();
    }
    
    function insertSubmit(){
        confireType();
        if (checkfalg == 0) return;
        checkRight();
        if (checkfalg == 0) return;
        var cform = $("#conditionForm");
	    var url = "${request.contextPath}/cachesearch/cacheInseartService.action";
	    cform.attr("action",url);
	    cform.submit();
    }
    
    function deleteSubmit(){
        confireType();
        if (checkfalg == 0) return;
        checkRight();
        if (checkfalg == 0)  return;
        var cform = $("#conditionForm");
	    var url = "${request.contextPath}/cachesearch/cacheDeleteService.action";
	    cform.attr("action",url);
	    cform.submit();
    }

    function confireType(){
        checkfalg = 0;
        var key = $("#key").val();
        var type = $("#cacheType option:selected").text();
        var value = confirm('请确认key[' + key + ']的类型是' + type + '？');
        if(!value) {
            npmsAlert('操作已经取消!');
            return;
        }
        checkfalg = 1;
    }

    function queryDeleteAll(){
        var keys = $("#keys").val();
        if(keys == '' || keys == '*') {
            npmsAlert('输入值不能为空或*!');
            return;
        }
        checkRight();
        if (checkfalg == 0) return;
        alertMessage();
        if (checkfalg == 0) return;
        var cform = $("#conditionForm");
	    var url = "${request.contextPath}/cachesearch/cacheDeleteAllService.action";
	    cform.attr("action",url);
	    cform.submit();
    }

    function alertMessage(){
        checkfalg = 0;
        var value = prompt('危险操作!请确认数据量!:(Y继续  N返回)', 'N');
        if(value != "Y") {
            npmsAlert('操作已经取消!');
            return;
        }
        checkfalg=1;
    }
	</script>
</body>
</html>
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
	<link rel="stylesheet" href="${request.contextPath}/css/date/bootstrap-datetimepicker.min.css" /><!--datetimepicker日期时间插件样式-->
</head>
<body id="condition">
	<div id="wrap">
		<section class="config">
			<div class="row">
			  <div class="col-md-4">
			  	<div class="input-group">
				    <span class="input-group-addon">&nbsp;&nbsp;&nbsp;报文类型：</span>
				  	<select id="msgType" class="form-control" style="width:165px;" name="msgType">
					  	<option value="-1">ALL</option>
					    <option value="13" <#if RequestParameters.msgType??&&RequestParameters.msgType=='13'>selected="selected"</#if> >商品主数据PCMS</option>
                        <option value="06" <#if RequestParameters.msgType??&&RequestParameters.msgType=='06'>selected="selected"</#if> >商品主数据MDM</option>
                        <option value="08" <#if RequestParameters.msgType??&&RequestParameters.msgType=='08'>selected="selected"</#if> >商品组主数据</option>
                        <option value="09" <#if RequestParameters.msgType??&&RequestParameters.msgType=='09'>selected="selected"</#if> >产品层次主数据</option>
                        <option value="04" <#if RequestParameters.msgType??&&RequestParameters.msgType=='04'>selected="selected"</#if> >供应商基本层主数据</option>
                        <option value="05" <#if RequestParameters.msgType??&&RequestParameters.msgType=='05'>selected="selected"</#if> >供应商采购层主数据</option>
                        <option value="10" <#if RequestParameters.msgType??&&RequestParameters.msgType=='10'>selected="selected"</#if> >门店地点主数据</option>
                        <option value="01" <#if RequestParameters.msgType??&&RequestParameters.msgType=='01'>selected="selected"</#if> >采购组织主数据</option>
                        <option value="07" <#if RequestParameters.msgType??&&RequestParameters.msgType=='07'>selected="selected"</#if> >城市主数据</option>
                        <option value="12" <#if RequestParameters.msgType??&&RequestParameters.msgType=='12'>selected="selected"</#if> >合同主数据</option>
					</select>
				</div>
			  </div>
			  <div class="col-md-4">
                  <div class="input-group">
                      <span class="input-group-addon">开始时间：</span>
                      <input type="text"  style="width: 190px" class="form-control WdateBackPic"
                             onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="sCreateTime"
                             name="sCreateTime"/>
                  </div>
			  </div>
			  <div class="col-md-4">
                  <div class="input-group">
                      <span class="input-group-addon">结束时间：</span>
                      <input type="text"  style="width: 165px" class=" form-control WdateBackPic"
                             onClick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="eCreateTime"
                             name="eCreateTime"/>
                  </div>
			  </div>
			</div>
			<div class="row" style="margin-top:10px;">
			  <div class="col-md-12">
			  	<div class="input-group">
			  		<span class="input-group-addon" id="basic-addon1">原始报文ID：</span>
			  		<input type="text" id="esbMsgId" class="form-control" style="width:165px;" name="esbMsgId">
			  		<button style="margin-left:10px;" class="buttonsearch11" onclick="getAuthByPage(0);"><span><img src="../images/search1.png"></span>&nbsp;&nbsp;查询</button>
			  	</div>
			  </div>
			</div>
		</section>
  		<section class="result">
			<div class="tableBox">
				<table class="zg-table zg-table-striped">
					<thead>
						<tr>
							<th>id</th>
							<th>报文id</th>
							<th>创建时间</th>
							<th>更新时间</th>
							<th>状态</th>
							<th>类型</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody id="authList">
					</tbody>
				</table>
			</div> 
			<div class="info clearfix">
				<div class="page">
					<span>共<span id="totalCount">0</span>条，每页显示10条
					</span>
					<ul class="pagination" id="listPage">
						<li><a href="javascript:void(0);"  style="cursor:pointer;">上一页</a></li>
						<li class="active"><a href="javascript:;"></a></li>
						<li><a href="javascript:void(0);"  style="cursor:pointer;">下一页</a></li>
					</ul>
					<span>
						共<span id="totalPage">0</span>页，到第
					</span>
					<div class="inp-jump">
						<input type="text" class="formH-control">
					</div>
					页
					<a href="javascript:jumpPage();" class="btnH btnH-default">确定</a>
			   </div> 
			</div>

		    
		    
		</section>  
	</div> 	     
		
	<div class="modal fade in" style="z-index:9999;overflow:scroll;" id="viewDialog">
	  	<div class="modal-dialog">
	        <div class="modal-content">
	          	<div class="modal-header">
	            	<button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
	            	</button>
	            	<h4 class="modal-title" id="titleinit">原始报文信息</h4>
	          	</div>
	            <div class="modal-body" style="text-align:center;">
	                <textarea id="rawMsgContent" class="uitext w138"  style="margin-bottom: 4px; color: rgb(153, 153, 153);height:300px;width:500px"></textarea>
	            </div>
	            <div class="modal-footer">
		            <div class="text-right">
		              <button class="btn btn-primary" onclick="copy('rawMsgContent');"> 复 制</button>
		            </div>
	            </div>
	        </div>
	    </div>
	</div>

	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/js/npms/rawMsgQuery.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
    <script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
	<script type="text/javascript">
		var ctx = '${request.contextPath}';
		var user = ${Session.userInfoMapJson};
        var userview = user.userName; 
	</script>
</body>
</html>
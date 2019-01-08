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
	<div id="wrap" >
		<section class="config">
			<div class="row">
			  <div class="col-md-4">
			  	<div class="input-group">
			  	 	<span class="input-group-addon">开始时间：</span>
			  	 	<input type="text" class="form-control" style="width:190px;" onClick="WdatePicker({isShowClear:false,readOnly:true,dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="startTime"  name="startTime"/>
			  	 </div>
			  </div>
			  <div class="col-md-4">
			  		<div class="input-group">
			  		<span class="input-group-addon">结束时间：</span>
			  	 	<input type="text" class="form-control" style="width:190px;" onClick="WdatePicker({isShowClear:false,readOnly:true,dateFmt:'yyyy-MM-dd HH:mm:ss'})" id="endTime"   name="endTime"/>
			  	 	</div>
				</div>
			  <div class="col-md-4">
			  	<div class="input-group">
			  		<span class="input-group-addon">接口类型：</span>
				  	<select id="moduleType" name="moduleType" class="form-control" style="width:190px;">
					  	<option value="">--请选择--</option>
			            <option value="distributeArticleBDatePCMSNew">商品主数据PCMS</option>
                        <option value="distributeMaterialBasicInfo">商品主数据MDM</option>
                        <option value="distributeCmmdtyCategory">商品组主数据</option>
	                    <option value="distributeProdHierarchyPCMS">产品层次主数据</option>
                        <option value="distributeVendorBasicLevelMasterData">供应商基本层主数据</option>
                        <option value="distributeVendorPurchDateNew">供应商采购层主数据</option>
                        <option value="distributeXingDiDianMasterData">门店地点主数据</option>
                        <option value="distributeCompanyCode">采购组织主数据</option>
                        <option value="distributeAdminCityMasterDataNew">城市主数据</option>
                        <option value="procurementRule">合同主数据</option>
				  	</select>
				  </div>
			  </div>
			</div>
			<div class="row" style="margin-top:10px;">
				<div class="col-md-8">
					<div class="input-group">
						<span class="input-group-addon">异常类型：</span>
					  	<select name="exceptionType" id="exceptionType" class="form-control" style="width:190px;">
						  	<option value="">--请选择--</option>
				            <option value="01">校验异常</option>
				            <option value="02">存储更新缓存异常</option>
					  	</select>
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
							<th>消息编号</th>
							<th>异常类型</th>
							<th>接口类型</th>
							<th>发送次数</th>
							<th>是否需要发送</th>
							<th>创建时间</th>
							<th>修改时间</th>
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
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script type="text/javascript" src="${request.contextPath}/js/npms/exceptionQuery.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
   	<script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script type="text/javascript">
        var ctx = '${request.contextPath}';
        var user = ${Session.userInfoMapJson};
        var userview = user.userName;
    </script>
</body>
</html>
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
<link rel="stylesheet" href="${request.contextPath}/staticfile/js/zg/v1.1.3/css/zg.min.css">

</head>
<body id="condition">
	<div id="wrap"  style="height:660px">
		<section class="config">
			<div class="row">
				<div class="col-md-3">
					<div class="input-group">
			        	<span class="input-group-addon" id="basic-addon1"><font style='color:red;'>*</font>工号：</span>        
			        	<input id="employeeId" name="employeeId" type="text" class="form-control" style="width:180px">
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<button href="javascript:;" style="float:left;margin-left:10px;" class="buttonsearch11" onclick="queryBeiMingInfo()"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</span></button>	
				    </div>
				</div>
			</div>
		</section>
		<section class="result">
			<textarea id="result" name="result" readonly="readonly" style="width: 100%; height: 170px; margin-top:5px;margin-bottom: 20px;padding-bottom: 3px;"></textarea> 
		</section>  
	</div>
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
	<script src="${request.contextPath}/js/npms/rsfBeiMingQuery.js"></script>
	<script src="${request.contextPath}/staticfile/js/draggable.js"></script>
	<script src="${request.contextPath}/staticfile/js/zg/v1.1.3/js/zg.min.js"></script>
    <script	type="text/javascript">

var ctx = '${request.contextPath}';
</script>
</body>
</html>
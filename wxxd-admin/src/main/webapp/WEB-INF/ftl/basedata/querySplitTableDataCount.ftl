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
				  		<span class="input-group-addon" ><font style="color:red;">*</font>表名前缀：</span>
				  	<input id="tableName" name="tableName" class="form-control" style="border:1px soild #0000;width:150px;" type="text" > 
			    	</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
			        	<span class="input-group-addon" >分表数量：</span>
				  	<input id="tableNum" name="tableNum" class="form-control" style="border:1px soild #0000;width:120px;" type="text" > 
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
			        	<span class="input-group-addon" >条件：</span>
				  	<input id="condition1" name="condition" class="form-control" style="border:1px soild #0000;width:220px;" type="text" > 
					</div>
				</div>
				<div class="col-md-3">
					<div class="input-group">
						<button href="javascript:;" style="float:left;margin-left:10px;" class="buttonsearch11" onclick="querySubmit()"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</span></button>	
				    </div>
				</div>
			</div>
		</section>
		<section class="result">
			<textarea id="count" name="result" readonly="readonly" style="width: 100%; height: 170px; margin-top:5px;margin-bottom: 20px;padding-bottom: 3px;" disabled="true"></textarea> 
		</section>  
	</div>
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>
	<script src="${request.contextPath}/js/npms/hashCodeTransTableNum.js"></script>
	<script src="${request.contextPath}/staticfile/js/draggable.js"></script>
	<script src="${request.contextPath}/staticfile/js/zg/v1.1.3/js/zg.min.js"></script>
    <script	type="text/javascript">

var ctx = '${request.contextPath}';
function querySubmit() {
       	var tableName = $("#tableName").val();
		var tableNum = $("#tableNum").val();
		var condition = $("#condition1").val();
	if(tableName == "" || tableName == null){
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '表名不能为空!'
        });
        return false;
	}else if(tableNum>1000) {
		bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '分表数量最大为1000!'
        });
        return false;
       }else if($("#count").val()=="正在查询中..."){
       bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '正在查询中!'
        });
        return false;
	}else{
		$("#count").val("");
		$("#count").val("正在查询中...");
		$.ajax({
		    type:"POST",
		    url:"querySplitTableDataCount.action",
		    data:{'tableName':tableName,
		    	'tableNum':tableNum,
		        'condition':condition
		    },
		    success:function(rs){
		    	if(rs.returnCode == 1){
		    		$("#count").val("查询失败！请检查参数");
		    	}else if(rs.returnCode == 2) {
		    	$("#count").val("分表数量最大为1000");
		    	}else {
		    	var countnum = rs.count
		    		$("#count").val("共查到数据量：" +  countnum);
		    	}
		    }
		});
	}
        }
        $($(window).resize(function(){
		successScroll();
	}));

function successScroll(){
	var wh = $(window).width();
	$(".main2").width(wh-11);
	$("#tablediv").width(wh-62);
	$("#tableInfodiv").width(wh-62);
}

</script>
</body>
</html>
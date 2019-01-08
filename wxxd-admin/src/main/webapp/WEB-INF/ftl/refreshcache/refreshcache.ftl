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
	        <div class="content" style="float:left;margin:30px 0;">
	          	<div style="width:1300px;height:100%;text-align:center">
					<style scoped>
				        .button-success,
				        .button-error,
				        .button-warning,
				        .button-secondary {
				            color: white;
				            border-radius: 4px;
				            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
				        }
				
				        .button-success {
				            background: rgb(28, 184, 65); /* this is a green */
				        }
				
				        .button-error {
				            background: rgb(202, 60, 60); /* this is a maroon */
				        }
				
				        .button-warning {
				            background: rgb(223, 117, 20); /* this is an orange */
				        }
				
				        .button-secondary {
				            background: rgb(66, 184, 221); /* this is a light blue */
				        }
					</style>
					
					<br/>
					<div class="content" style="float:left;margin-left:20px;">
						<#if Request.RESULT?exists>
							${Request.RESULT}
						</#if>	
					</div>	
	           </div>
	        </div>
		
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/common.js"></script>
	<script type="text/javascript">
		function refreshCache(actionName){
			var value = prompt('输入暗号:', '暗号'); 
			window.location.href="${request.contextPath}/fresh/" + actionName + ".action?key=" + value; 
		}
	</script>
</body>
</html>
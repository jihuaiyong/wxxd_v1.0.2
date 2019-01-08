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
<link rel="stylesheet" href="${request.contextPath}/staticfile/plugins/zTree-3.5.12/css/zTreeStyle/zTreeStyle.css"/>
<link rel="stylesheet" href="${request.contextPath}/css/common.css">
<link rel="stylesheet" href="${request.contextPath}/layer/skin/layer.css"/>				
<!--[if lte IE 9]>
        <script src="../libs/html5shiv/dist/html5shiv.min.js"></script>
    <![endif]-->
</head>
<body id="condition">
	<div id="wrap">	
				 					 			
	    <button href="javascript:;"  class="buttonaddrolle" onclick="add()"><span><img src="../images/edit_add.png">&nbsp;&nbsp;新增</button>	
	
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>
					<th>序号</th>
					<th>角色编号</th>
					<th>角色名称</th>
					<th>状态</th>
					<th>创建日期</th>
					<th>角色描述</th>	
					<th>操作</th>	
				</tr>
			</thead>
			<tbody id="authList">
			</tbody>
		</table>
	 </div> 
	<div class="info clearfix">
		<div class="page">
			<span>共<span id="authTotalCount">0</span>条，每页显示10条
			</span>
			<ul class="paginationH" id="authListPage">
				<li><a href="javascript:void(0);"  style="cursor:pointer;">上一页</a></li>
				<li class="active"><a href="javascript:;"></a></li>
				<li><a href="javascript:void(0);"  style="cursor:pointer;">下一页</a></li>
			</ul>
			<span>共<span id="authTotalPage">0</span>页，到第
			</span>
			<div class="inp-jump">
				<input type="text" class="formH-control">
			</div>
			页
			<a href="javascript:jumpPage();" class="btnH btnH-default">确定</a>
		</div> 
	</div>
		<div class="modal fade in"  style="z-index:9999;overflow:scroll" id="addDialog">
		
		      <div class="modal-dialog">
		        <div class="modal-content">
		          
		          <div class="modal-header">
		            <button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
		            </button>
		            <h4 class="modal-title" id="titleinit">新增角色</h4>
		          </div>
		        <div class="modal-body">
		                 <input type="hidden" id="currentEditId" value="">
			        	<div style="margin: 20px 0;" class="zg-group">
				          	<label>角色名称：</label>
							<div style="display:inline-block;margin-left: 15px;" class="inpBox">
								<input  type="text" class="form-control" name="roleName"   ime-mode:disabled"  id="roleName" onchange="valRoleName()">
							</div>
							<font style='color:red;'><span id="roleNameSpan" class="tipTxt"></span></nobr></font>
						</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>角色描述：</label>	          				
	                          <div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <input  type="text" class="form-control" id="description" name="description"   ime-mode:disabled" >
	                            </div>                          
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>角色状态：</label>
	          				<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="roleStatus" id="roleStatus" class="form-control" style="width:360px;">
		                                <option value="1">有效</option>
                                    	<option value="0">无效</option>
	                                </select>	                 
                            </div>
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          			<label>角色对应菜单选择：</label>
				           	<td>
				           	<div class="ztree11" style="border: 1px solid #DDDDDD;width:450px;height:180px;float:center;overflow:scroll;margin:20px;margin-top:-2px;">
				                    <ul id="menuTree" class="ztree">
				            </div>
				            </td>
				         </div>  	          	      			
		         			
		            <div class="modal-footer">
		            <div class="text-right">
		              <button class="btn btn-primary" onclick="commit()" id="submit"> 确 定</button>
		              <button class="btn btn-primary reverse" id="close" onclick="closed()"> 取 消</button>
		            </div>
		            </div>
		         
		          </div>
		        </div>
		      </div>
		    </div>
		  	</section>  
	    </div> 	     
	
	
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/auth/auth-query.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.core-3.5.min.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.excheck-3.5.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/staticfile/js/draggable.js"></script> 
	<script type="text/javascript" src="${request.contextPath}/layer/layer.js"></script>
	
</body>
</html>


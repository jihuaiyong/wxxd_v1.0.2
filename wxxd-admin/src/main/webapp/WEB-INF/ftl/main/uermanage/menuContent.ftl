<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NPMS</title>
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.min.css">
<link href="${request.contextPath}/staticfile/css/main.css" rel="stylesheet" type="text/css" />
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
   <div class="main">   
	<!--<div id="left-div" style="border: 1px solid #DDDDDD;width:100%;margin-bottom:4px;background-color:#fff;">-->
	<div id="left-div" style="width:13%;float:left;overflow:scroll;overflow-y:hidden;background-color:#fff;margin-right:10px;">
		<ul id="menuTree" class="ztree"></ul>
	   <input type="hidden" id="currentPId" value="" autocomplete="off"/>
	   <input type="hidden" id="currentLevel" value="" autocomplete="off"/>
	   <input type="hidden" id="menuId" value="" autocomplete="off"/>
	</div>
	<div id="right-div" style="width:85%;float:left;overflow:scroll;overflow-x:hidden;overflow-y:hidden;background-color:#fff">
		  
		<section class="config">
			 <button href="javascript:;"  class="buttonaddmenu" onclick="add()"><span><img src="../images/edit_add.png">&nbsp;&nbsp;新增</button>
		</section>
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>		    						
						<th>菜单编号</th>
						<th>菜单名称</th>
						<th>菜单序号</th>
						<th>菜单类型</th>
						<th>菜单图标</th>
						<th>父节点</th>
						<th>状态</th>
						<th>创建日期</th>
						<th>功能链接</th>
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
		          
		          <div class="modal-header" style="color:blue;">
		            <button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
		            </button>
		            <h4 class="modal-title" id="titleinit">新增菜单</h4>
		          </div>
		        <div class="modal-body">
		                 <input type="hidden" id="currentEditId" value="">
			        	<div style="margin: 20px 0;" class="zg-group">
				          	<label>菜单名称：</label>
							<div style="display:inline-block;margin-left: 15px;" class="inpBox">
								<input  type="text" class="form-control" name="menuName"   ime-mode:disabled"  id="menuName" >
							</div>
							<font style='color:red;'><span id="menuNameSpan" class="tipTxt"></span></nobr></font>
						</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>菜单序号：</label>	      
	                            <div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <input  type="text" class="form-control" id="sequenceNo" name="sequenceNo"   ime-mode:disabled" >
	                            </div>
	                        <font style='color:red;'><span id="sequenceNoSpan" class="tipTxt"></span></nobr></font>                           
	          			   <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(序号必须为数字，数字越大则越靠后展示)
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>菜单状态：</label>
	          				
	                           	<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="menuStatus" id="menuStatus" class="form-control" style="width:360px;">
		                                <option value="1">有效</option>
                                    	<option value="0">无效</option>
	                                </select>
	                           
                            </div>
	          			</div>
	          			
	          			<div id="isPedit" style="margin: 20px 0;" class="zg-group">
	          				<label>父&nbsp;&nbsp;节&nbsp;&nbsp;点：</label>
	          				
	                           	<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="isParent" id="isParent" class="form-control" style="width:360px;">
		                                <option value="true">是</option>
								        <option value="false">否</option>
	                                </select>
	                                                 
                            </div>
                              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(如果是父节点则可在该新建节点下添加子节点)
	          			</div>
	          				
	          				<div id="isMedit" style="margin: 20px 0;" class="zg-group">
	          				<label>菜单图标：</label>      			
	                        	<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="menuCss" id="menuCss" class="form-control" style="width:360px;">
		                                <option value="">--点击选择菜单图标--</option>
		                                <option value="icon-department">icon-department</option>
								        <option value="icon-settings1">icon-settings1</option>
								        <option value="icon-statistics">icon-statistics</option>
								        <option value="icon-rom">icon-rom</option>
								        <option value="icon-deploy">icon-deploy</option>
								        <option value="icon-Stock">icon-Stock</option>
								        <option value="icon-pre-task">icon-pre-task</option>
								        <option value="icon-load-balancing">icon-load-balancing</option>
								        <option value="icon-wifi">icon-wifi</option>
								        <option value="icon-Elastic-calculation">icon-Elastic-calculation</option>
								        <option value="icon-public-ip">icon-public-ip</option>
								        <option value="icon-Template-layout">icon-Template-layout</option>
								        <option value="icon-cloudharddisk">icon-cloudharddisk</option>
								        <option value="icon-SoftEther">icon-SoftEther</option>
								        <option value="icon-fresh">icon-fresh</option>							        
	                                </select>
	                            </div>	                      
                          
                              <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(是父节点选择，不是父节点不需要选择)
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>功能类型：</label>
	          				
	                           	<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="functionType" id="functionType" class="form-control" style="width:360px;">
		                               <option value="M">菜单</option>
								       <option value="B">按钮</option>
	                                </select>
	                            </div>
                           
	          			</div>        	      			
		         		
		         	<div style="margin: 20px 0;" class="zg-group">
	          				<label>菜单链接：</label>
	          				
	                          	<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <input  type="text" class="form-control" id="action" name="action"   ime-mode:disabled" >
	                            </div>
                         
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
	</div>
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
	<script src="${request.contextPath}/js/auth/auth_menu.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.core-3.5.min.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.excheck-3.5.min.js"></script>  
    <script type="text/javascript" src="${request.contextPath}/staticfile/js/draggable.js"></script>
    <script type="text/javascript" src="${request.contextPath}/layer/layer.js"></script>
    <script type="text/javascript">
        $(document).ready(function(){
	           treeObj = $.fn.zTree.init($("#menuTree"), setting);	
	            draggable($(".modal-header")) ;           
            });
    </script>
</body>
</html>

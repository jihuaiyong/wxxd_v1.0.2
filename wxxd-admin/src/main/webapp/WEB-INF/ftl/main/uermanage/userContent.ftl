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
        <div class="row">
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon" id="basic-addon1">用户工号：</span>
                    <input style="width:180px;margin-right:10px;" type="text" id="userName_Search"  onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false" class="form-control">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <button href="javascript:;"  class="buttonsearch11" onclick="getAuthByPage(0)"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>
				</div>
            </div>

            <div class="col-md-6">
                <button href="javascript:;"  class="buttondelete11" onclick="deleteBatch()"><span><img src="../images/edit_remove.png">&nbsp;&nbsp;删除</button>

                <button href="javascript:;"  class="buttonadd11" onclick="add()"><span><img src="../images/edit_add.png">&nbsp;&nbsp;新增</button>

                <button href="javascript:;"  class="buttonadd11" onclick="batchAdd()"><span><img src="../images/edit_add.png">&nbsp;&nbsp;批量新增</button>
            </div>
        </div>
  <section class="result">
	<div class="tableBox">
		<table class="zg-table zg-table-striped">
			<thead>
				<tr>
					<th><input type="checkbox" name="checkAll" onclick="checkAll(this);" /></th>
					<th>用户账号</th>
					<th>用户姓名</th>
					<th>用户状态</th>
					<th>创建日期</th>
					<th>生效日期</th>	
					<th>失效日期</th>	
					<th>所在部门</th>	
					<th>用户来源</th>	
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
                  <li><a href="javascript:void(0);" style="cursor:pointer;">上一页</a></li>
                  <li class="active"><a href="javascript:;"></a></li>
                  <li><a href="javascript:void(0);" style="cursor:pointer;">下一页</a></li>
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
	
		<div class="modal fade in" style="z-index:9999;overflow:scroll;" id="addDialog">
		
		      <div class="modal-dialog">
		        <div class="modal-content">
		          
		          <div class="modal-header">
		            <button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
		            </button>
		            <h4 class="modal-title" id="titleinit">新增用户</h4>
		          </div>
		        <div class="modal-body">
		                 <input type="hidden" id="currentEditId" value="">
			        	<div style="margin: 20px 0;" class="zg-group">
				          	<label>用户工号：</label>
							<div style="display:inline-block;margin-left: 15px;" class="inpBox">
								<input  type="text" class="form-control" name="userName"   ime-mode:disabled"  id="userName" onchange="valUserName()">
							</div>
							<font style='color:red;'><span id="userNameSpan" class="tipTxt"></span></nobr></font>
						</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>用户姓名：</label>	          				
	                          <div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <input  type="text" class="form-control" id="userNickName" name="userNickName"   ime-mode:disabled" >
	                            </div>                          
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>所在部门：</label>	          				
	                          <div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <input  type="text" class="form-control" id="department" name="department"   ime-mode:disabled" >
	                            </div>                          
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          				<label>用户状态：</label>
	          				<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                <select name="userStatus" id="userStatus" class="form-control" style="width:360px;">
		                                <option value="1">有效</option>
                                    	<option value="0">无效</option>
	                                </select>	                 
                            </div>
	          			</div>
	          			
	          			<div style="margin: 20px 0;" class="zg-group">
	          			<label>用户对应角色选择：</label>
				           	<td>
				           	<div class="ztree11" style="border: 1px solid #DDDDDD;width:450px;height:120px;float:center;overflow:scroll;margin:20px;margin-top:-2px;">
				                    <ul id="roleTree" class="ztree">
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
		    
		
		<!--批量新增用户-->    
		<div class="modal fade in" style="z-index:999;overflow:scroll;" id="batchAddDialog">
		
		      <div class="modal-dialog">
		        <div class="modal-content">
		          
		          <div class="modal-header">
		            <button type="button" id="closeBatchDialogBtn2" class="close" onclick="batchClosed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
		            </button>
		            <h4 class="modal-title" id="titleinit">批量新增用户</h4>
		          </div>
			        <div class="modal-body">
	
		          			<div style="margin: 20px 0;" class="zg-group">
		          			<label>导入用户对应角色选择：</label>
					           	<td>
					           	<div class="ztree11" style="border: 1px solid #DDDDDD;width:450px;height:120px;float:center;overflow:scroll;margin:20px;margin-top:-2px;">
					                    <ul id="batchRoleTree" class="ztree">
					            </div>
					            </td>
					            
					            <td>
							         <!--导入模板-->
									 <form id="fileUploadForm" name="fileUploadForm" enctype="multipart/form-data" method="post">		   
							    	      <div class="case-top-btn l" style="margin-top:10px;">	        	         
												 <a href="javascript:;" class="file">
							                     <input style="height:28px;"  value="${RequestParameters.filePath!}" type="file" name="file" id="file" onchange="checkFileType()"/><span id="fupload">请点击这里上传文件</span>
							                     </a>	
							                     <font style='color:blue;'><span id="fupload"></span></font>					        
												 <a class="a-upload on1 mlmr0" href="##" onclick="javascript:fileUpload('','');"><span>批量导入</span></a>&nbsp;&nbsp;&nbsp;&nbsp;
							                </div> 
											<div class="case-top-btn l" style="margin-top:15px;">
												<i>
													<a href="##" onclick = javascript:downloadModel();>上传模板下载</a>
												</i>
											</div>    													  
									 </form>
					            </td>
					         </div> 

			          <div class="modal-footer">
			          
		            <div class="text-right">
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
	<script src="${request.contextPath}/js/auth/auth-user.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.core-3.5.min.js"></script>
    <script type="text/javascript" src="${request.contextPath}/staticfile/plugins/zTree-3.5.12/js/jquery.ztree.excheck-3.5.min.js"></script>
	<script type="text/javascript" src="${request.contextPath}/staticfile/js/draggable.js"></script>
	<script type="text/javascript" src="${request.contextPath}/layer/layer.js"></script>
	    <script type="text/javascript">
         var ctx = '${request.contextPath}';
    </script>
</body>
</html>


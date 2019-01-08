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
<link rel="stylesheet" href="${request.contextPath}/css/manyInput.css">
<link rel="stylesheet" href="${request.contextPath}/layer/skin/layer.css"/>	
</head>
<style type="text/css">
#myTab li{
    width:50%;
    float:left;
    height:40px;    
    list-style: none;
    margin: 0;
    padding: 0;
}

#myTab li img{
    float:left;
    height: 40px;    
}

#myTab li p{
    color:white;
    text-align: center;
    position: relative;
    display: block;
    padding: 10px 15px; 
    font-size: 14px;   
}

.blue{
    background:#0f9af2;
}
.gray{
    background: #dfdfdf;
}
.tabPaneUl{
    width: 700px;
    margin: 0 auto;
    list-style: none;
}

.tabPaneUl li{
    height: 40px;
    line-height: 40px;
}
.tab-pane{
    margin-top: 50px;
}
.uptitle{
	font-size: 14px;
    font-weight: bold;
    /* margin-bottom: 15px; */
    background-color: #bef0fa;
    padding: 5px
    }
.buttonaddN{
    padding: 6px 18px;
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 400;
    -ms-touch-action: manipulation;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 2px;
    color: #fff;
    background-color: #2D86E1;
    float: right;
    margin-right: 10px;
    }
.success-01{padding: 40px 0 60px 160px;border-top: 1px dashed #6697C6;border-bottom: 1px dashed #6697C6;}
.success-01 span{float: left;display: inline-block;padding:0  5px;font-size: 16px;}
.success-01 img{float: left;}
.success-01 .lion{margin-top: -40px}
#remarks::-webkit-input-placeholder{color: #666666;   }    /* 使用webkit内核的浏览器 */
#remarks:-moz-placeholder{color: #666666;   }                  /* Firefox版本4-18 */
#remarks::-moz-placeholder{color: #666666;   }                  /* Firefox版本19+ */
#remarks:-ms-input-placeholder{color: #666666;   }           /* IE浏览器 */
</style>
<body id="condition">
	 <div class="row" style="margin-top:10px;width:100%;">
            <ul id="myTab" role="tablist">
		         <li id="step1Li" class="active blue">                      
                      <p href="#step1"  role="tab" data-toggle="tab">
                          1.抬头信息
                      </p>                      
        			 </li>
                  <li id="step2Li"  class="gray">
                      <img id="step2Img" src="../images/gray_gray.png"/>
                      <p href="#step2"   role="tab" data-toggle="tab">
                          2.行项目信息
                      </p>
                  </li>                          
            </ul>
            <div id="myTabContent" class="tab-content">
                  <div id="step1" class="tab-pane fade active in">
                  </div>
                  <div id="step2" class="tab-pane fade">
                  </div>    		           
              </div>
        	</div>
    <div id="wrap">	
    <div class="step1">
    <P style="text-align: center;font-size: 15px;background: beige">
    <b>标题  </b><span style="font-size:17px;margin-left:30px" id="editTitle"><b>
        <#assign NCInfoMap=Session.NCInfoMap?eval />${NCInfoMap.organizationunitDesc!}${NCInfoMap.dutyDesc!}${NCInfoMap.name!}发起的供价创建流程</b></span></P>
    <br/>
	<p class="uptitle">供价抬头信息</p>
	<div style="border:1px solid #8adde4;padding:5px;font-size:14px;">
        <br>
            <b>价格文件号&nbsp;&nbsp;</b>
            <input id="priceFile" style="margin-left: 27px;border:1px soild #0000;width:250px" type="text" disabled="true">
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事&nbsp;&nbsp;&nbsp;业&nbsp;&nbsp;&nbsp;部&nbsp;</b><font style='color:red;'>*</font>
            <input id="busCode" name="busCode" style="width:250px;margin-left:21px;" type="text" onchange="clearNoNum(this);busCodeCheck()" maxlength="5" id="bus_code">
        <br>
        <br>
            <b>供&nbsp;&nbsp;&nbsp;应&nbsp;&nbsp;&nbsp;商&nbsp;&nbsp;</b><font style='color:red;'>*</font>
            <input id="supplier" name="supplier" style="margin-left:23px;border:1px soild #0000;width: 250px" type="text" onchange="supplierInfoCheck()">
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应商描述&nbsp;&nbsp;&nbsp;</b>
            <input id="supplierDesc" style="margin-left: 16px;border:1px soild #0000;width:250px" type="text" disabled="true">
        <br>
        <br>
            <b>采&nbsp;购&nbsp;组&nbsp;织&nbsp;&nbsp;</b><font style='color:red;'>*</font>
            <input id="purcOrg" name="purcOrg" style="margin-left:22px;border:1px soild #0000;width: 250px" type="text" onchange="purcOrgCheck()">
            <div style="margin-left:382px;margin-top: -24px;">
                <b>&nbsp;&nbsp;&nbsp;&nbsp;操&nbsp;作&nbsp;模&nbsp;式</b>
                <select id="distSell" autocomplete="off" style="width:250px;margin-left:28px;height:26px;">
                  <option selected value="0">0 经销</option>
                  <option value="2">2 代销</option>
                </select>
                <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订&nbsp;单&nbsp;类&nbsp;型&nbsp;</b>
                <input id="orderTypeDesc" style="margin-left:21px;border:1px soild #0000;width:150px" type="text" disabled="true" value="ZNB8 供方样机">
                <input id="orderType" type="hidden" value="ZNB8">
            </div>
        <br>
            <b>有效开始日</b><input id="startTime" name="startTime" type="text" style="width:250px;margin-left:39px;" disabled="true" value="${.now?date}">
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效截止日</b>
            <input id="endTime" name="endTime" type="text" style="width:250px;margin-left:28px;" disabled="true" value="9999-12-31">
            <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;货&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;币 </b>
            <input id="currency" style="margin-left: 25px;border:1px soild #0000;width:150px" type="text" disabled="true">
            <br/>
            <br>
            <b style="position: absolute;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注 </b>
            <textarea id="remarks" style="margin-left:108px;border:1px soild #0000;width:928px" rows="3" cols="120" maxlength="100" placeholder="最多输入100个文字"></textarea>
        <br>
	</div>
	<div class="showEdit"><button style="background-color:#44a0ff;display:block;margin:0 auto;width: 10%;border-radius: 5px;border:1px #555 solid;margin-top:15px;float:right;height:30px" onclick="editNext1()" type="submit">下一步  >></button></div>
	</div>
			
		
	<div class="step2" style="display:none">
	<div id="savetrdiv" style="margin-bottom:10px;font-size: 12px;">
 		<button type="button" class="buttonsubmit" onclick="save_para_table()"><span><img src="${request.contextPath}/images/ok.png">&nbsp;&nbsp;提交</button>
	 </div>
	  <p class="uptitle">供价行项目信息批量导入<font color='#ff0000' size='2'>（明细超过20条请使用批量导入）</font></p>
		<div style="border:1px solid #8adde4;padding:10px;">
		 <form id="fileUploadForm" name="fileUploadForm" enctype="multipart/form-data" action="${request.contextPath}/cPrice/fileUpload.action" method="post">
    	      <div class="case-top-btn l" style="margin-top:10px;">	        	         
					 <a href="javascript:;" class="file">
                     <input style="height:28px;"  value="${RequestParameters.filePath!}" type="file" name="file" id="file" onchange="checkFileType()"/><span id="fupload">请点击这里上传文件</span>
                     </a>	
                     <font style='color:blue;'><span id="fupload"></span></font>					        
					 <a class="a-upload on1 mlmr0" href="##" onclick="javascript:fileUpload();"><span>批量导入</span></a>&nbsp;&nbsp;&nbsp;&nbsp;
                </div> 
                <div class="wenjiuan-area">
                <i><a href="##" onclick = javascript:downloadModel();>上传模板下载</a>
                </i>
                </div>                      					   													  
		 </form>		
		 </div>	
	<br>		
<table class="zg-table zg-table-striped" id="para_table">
 <thead>
  <tr>
   <th style="text-align:center" width="50px">状态</th>
   <th style="text-align:center" width="50px">序号</th>
   <th style="text-align:center" width="120px">样机序列号<font color="red">（必填）</font></th>
   <th style="text-align:center" width="110px">本次维护供价<font color="red">（必填）</font></th>
   <th style="text-align:center" width="120px">商品编码</th>
   <th style="text-align:center" width="220px">商品描述</th>  
   <th style="text-align:center" width="50px">单位</th> 
   <th style="text-align:center" width="100">操作</th>
  </tr>
 </thead>
 <tbody id="authList">
 </tbody>
</table>
	<div id="addtrdiv" style="margin-top:10px; width: 15%; float: right;font-size: 12px;">
 	<button type="button" class="buttonaddN" onclick="addtr()"><span><img src="${request.contextPath}/images/edit_add.png">&nbsp;&nbsp;新增</button></div>
	<div class="showEdit"><button style="background-color:#44a0ff;display:block;margin:0 auto;width: 10%;border-radius: 5px;border:1px #555 solid;margin-top:15px;float:left;height:30px" onclick="editBack1()" type="submit"><< 上一步</button></div>
    <section class="result">
        <div class="tableBox" id="errorInfo" style="margin-top:20px;display:none">
            <table class="zg-table zg-table-striped">
                <thead>
                <tr>
                    <th width="10%">Excel对应行数</th>
                    <th width="90%">报错信息</th>
                </tr>
                </thead>
                <!--错误消息-->
                <tbody id="errorAuthList"></tbody>
            </table>
        </div>
    </section>
   <!--/*-----------弹出框信息模块---------*/-->			
		<div class="modal fade in" style="z-index:9999;overflow:scroll;" id="addDialog">
		
		      <div class="modal-dialog">
		        <div class="modal-content">
		          
		          <div class="modal-header">
		            <button type="button" id="closeBatchDialogBtn" class="close" onclick="closedAndReload()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
		            </button>
		            <h5 class="modal-title" id="titleinit">供价创建信息提示</h5>
		          </div>
		        <div class="modal-body">
		        	   <div class="success-01">
        				<img src="../RES/flow/images/right.png">
        				<span>C类样机供价创建成功！</span>
        				<img src="../RES/flow/images/lion.jpg" class="lion">
         		 	   </div>
			        	<div style="margin: 20px 0;margin-left: 113px;" class="zg-group">
				          	<label>价格文件号：</label>
							<div style="display:inline-block;margin-left: 15px;" class="inpBox">
								    <b style="font-size: 15px;" id="priceFileS"></b>
							</div>							
						</div>
							
						<div style="margin: 20px 0;margin-left: 116px;" class="zg-group">
	          				<label>流&nbsp;&nbsp;&nbsp;程&nbsp;&nbsp;&nbsp;号：</label>
	          				<div style="display:inline-block;margin-left: 15px;" class="inpBox">
	                                 <b style="font-size: 15px;" id="approvalNum"></b>
	                         </div>                          	
	          			</div>
														          			
	          			<div id="nextApprovers" style="margin: 20px 0;margin-left: 113px;" class="zg-group">
	          				   <label style="position: absolute;">下步审批人：</label>      				
	                          <div style="display:inline-block;margin-left:93px;" class="inpBox">
	                             <div class="tableBox">
						           <table class="zg-table zg-table-striped" id="idData">
							      <thead>
									<tr>
									    <th width="50%">审批人姓名</th>
									    <th width="50%">审批人工号</th>	
									</tr>
							      </thead>
							       <tbody id="authList1"></tbody>
						          </table>
				                </div>   
				                <div width="60%" align="right" id="barcon" name="barcon"></div>
	                            </div>
	          			</div>
	          				          		          				          	          			 	          	            			
		          <div class="modal-footer">
		            <div class="text-right">
		              <button class="btn btn-primary" onclick="closedAndReload()" id="submit"> 确 定</button>
		             <!-- <button class="btn btn-primary reverse" id="close" onclick="closed()"> 取 消</button>-->
		            </div>
		          </div>
		          
		          </div>
		        </div>
		      </div>
		    </div>
		<!--/*-----------弹出框信息模块---------*/-->		
    </div>
 </div>   
	<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/common/pagination.js"></script>
    <script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
   	<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
   	<script src="${request.contextPath}/js/common/common.js"></script>  
    <script type="text/javascript" src="${request.contextPath}/layer/layer.js"></script>
    <script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
    <script src="${request.contextPath}/js/npms/cPrice.js"></script>
    <script src="${request.contextPath}/js/common/pageFenYe.js"></script>
    <script type="text/javascript">
         var ctx = '${request.contextPath}';
         var user = ${Session.userInfoMapJson};
         var userview = user.userName;         
    </script>
</body>
</html>
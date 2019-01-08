/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {	       
	$('.nav-list li').eq(1).addClass('active open').siblings().removeClass('active');
	$('.nav-list li').eq(1).children('.submenu').children().eq(0).addClass('active').siblings().removeClass('active');
	//treeObj = $.fn.zTree.init($("#menuTree"), setting);
	if($("#currentPId").val()==""){
	     $("#currentPId").val("0"); 
	     $("#currentLevel").val("0");
	    }
	getAuthByPage(pageNumber);	
   });

var treeObj;
var setting = {
      view: {
      showIcon: showIconForTree
       },
    data: {
      key: {
	  name: "menuName"
      },
    simpleData: {
	  enable: true,
	  idKey: 	"id",
	  pIdKey: "parent",
	  rootPId: 000 
     }
    },
   callback: {
      onClick: zTreeOnClick
    },
  async: {
    enable: true,
    url: "getMenus.action",
    autoParam: ["id"]
   }
  };

function showIconForTree(treeId, treeNode) {
       return !treeNode.isParent;
       };
       
    
function zTreeOnClick(event, treeId, treeNode, clickFlag){
if(treeNode.isParent){
   var nodeId= treeNode.id;
   var nodeLevel=treeNode.level+1;
   $("#currentPId").val(nodeId);
   $("#currentLevel").val(nodeLevel);
   getMenuList(nodeId);
 }
};
// function getMenu(){
//	 var menuId = $("#menuId").val();
//	 getMenuList(menuId);
//	 
// }
function getMenuList(menuId){
	$("#menuId").val(menuId);
   var index = layer.load(1, {shade: [0.1, '#393D49']});
   //var queryParams = getQueryParams(pageNumber);
   $.ajax({
		url : 'showMenuManageData.action?id='+menuId,
		type : "post",
		//data : eval(queryParams),
		//contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(lineData, status) {		
			// 返回数据存在
			var tabHTML = "";
			if (lineData && lineData.total) {
				var len = lineData.rows.length;
				for (var i = 0; i < len; i++) {
					var tempData = lineData.rows[i];
					tabHTML += '<tr>';														
					tabHTML += '<td>' + tempData.menuId + '</td>';					
					tabHTML += '<td>' + tempData.menuName + '</td>';
					tabHTML += '<td>' + tempData.sequenceNo + '</td>';																	
					if(tempData.menuType=='M')
					{
						tabHTML += '<td>' +'菜单' + '</td>';
					}
					else{
						tabHTML += '<td>' + '按钮' + '</td>';
					}
					
					tabHTML += '<td>' + tempData.menuCss + '</td>';
					if(tempData.isParent=='true'){
						tabHTML += '<td>' + '是' + '</td>';
					}else{
						tabHTML += '<td>' + '否' + '</td>';
					}					
					if(tempData.status=='1'){
					tabHTML += '<td>' + '有效' + '</td>';
					}
					else{
						tabHTML += '<td>' + '无效' + '</td>';
					}
					tabHTML += '<td title="' + tempData.createDate
							+ '"><span class="f-txt ">' + formatTime(tempData.createDate)
							+ '</span></td>';
					
					tabHTML += '<td>' + tempData.action + '</td>';
					
					tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
			         + "<a class='delete11'  href='javascript:void(0);' onclick=\"deleteDetail('"+tempData.menuId+"')\"></a>"+'</td>';
					
				
					tabHTML += "</tr>";
				}
				$("#authList").html("");
				$("#authList").html(tabHTML);
				$("#authListPage").show();
			} else {
				  tabHTML += '<tr> <td COLSPAN="14">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
				  $("#authList").html("");
				  $("#authList").html(tabHTML);
			}
			layer.close(index);
			// 先清空
			$("#authListPage").empty();
			// 记录总数
			$('#authTotalCount').html(lineData.total);
			// 页数信息
			$('#authTotalPage').html(Math.ceil(lineData.total / pageSize));
			totalPage = Math.ceil(lineData.total / pageSize);
			$("#authListPage").pagination(lineData.total, {
				callback : getAuthByPageCallBackChild,
				prev_text : ' 上一页',
				next_text : '下一页 ',
				items_per_page : pageSize,
				num_display_entries : 5,
				num_edge_entries : 3,
				current_page : pageNumber
			});
		}
	});
    }

function getMenuListC(pageNumber){
	   var menuId = $("#menuId").val();
	   var index = layer.load(1, {shade: [0.1, '#393D49']});
	   var queryParams = getQueryParams(pageNumber);
	   $.ajax({
			url : 'showMenuManageData.action?id='+menuId,
			type : "post",
			data : eval(queryParams),
			//contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success : function(lineData, status) {		
				// 返回数据存在
				var tabHTML = "";
				if (lineData && lineData.total) {
					var len = lineData.rows.length;
					for (var i = 0; i < len; i++) {
						var tempData = lineData.rows[i];
						tabHTML += '<tr>';														
						tabHTML += '<td>' + tempData.menuId + '</td>';					
						tabHTML += '<td>' + tempData.menuName + '</td>';
						tabHTML += '<td>' + tempData.sequenceNo + '</td>';																	
						if(tempData.menuType=='M')
						{
							tabHTML += '<td>' +'菜单' + '</td>';
						}
						else{
							tabHTML += '<td>' + '按钮' + '</td>';
						}
						
						tabHTML += '<td>' + tempData.menuCss + '</td>';
						if(tempData.isParent=='true'){
							tabHTML += '<td>' + '是' + '</td>';
						}else{
							tabHTML += '<td>' + '否' + '</td>';
						}					
						if(tempData.status=='1'){
						tabHTML += '<td>' + '有效' + '</td>';
						}
						else{
							tabHTML += '<td>' + '无效' + '</td>';
						}
						tabHTML += '<td title="' + tempData.createDate
								+ '"><span class="f-txt ">' + formatTime(tempData.createDate)
								+ '</span></td>';
						
						tabHTML += '<td>' + tempData.action + '</td>';
						
						tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
				         + "<a class='delete11'  href='javascript:void(0);' onclick=\"deleteDetail('"+tempData.menuId+"')\"></a>"+'</td>';
						
					
						tabHTML += "</tr>";
					}
					$("#authList").html("");
					$("#authList").html(tabHTML);
					$("#authListPage").show();
				} else {
					  tabHTML += '<tr> <td COLSPAN="14">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
					  $("#authList").html("");
					  $("#authList").html(tabHTML);
				}
				layer.close(index);
				// 先清空
				$("#authListPage").empty();
				// 记录总数
				$('#authTotalCount').html(lineData.total);
				// 页数信息
				$('#authTotalPage').html(Math.ceil(lineData.total / pageSize));
				totalPage = Math.ceil(lineData.total / pageSize);
				$("#authListPage").pagination(lineData.total, {
					callback : getAuthByPageCallBackChild,
					prev_text : ' 上一页',
					next_text : '下一页 ',
					items_per_page : pageSize,
					num_display_entries : 5,
					num_edge_entries : 3,
					current_page : pageNumber
				});
			}
		});
	    }

var initData;
function initDiv(){	
	 $("#menuName").val("");
	 $("#menuCss").val("");
	 $("#sequenceNo").val("");
	 $("#action").val("");  
	 $("#menuNameSpan").empty();
	 $("#sequenceNoSpan").empty();
};

//var $locations = [];
//$(".modal-body").each(function() {
//  var $this = $(this),
  //offset = $this.offset();
  //$locations.push($this.siblings().eq($this.index()));
 // });
function add(){
	$("#titleinit").html("新增菜单");
	initDiv();
	initData=0;
// $(".modal-body").each(function(i, e) {
  //$te = $(this).clone(true);
  //$(this).remove(); // remove
  // do something
  //$locations[i].append($te); // restore
//});
	$("#isPedit").show();
	$("#isMedit").show();
	$("#addDialog").show();			
};    

function closed(){
	 $("#addDialog").hide();
};


//清空提示语
function restSpan(){
   $("#menuNameSpan").empty();	   	    		    
   $("#sequenceNoSpan").empty();  
};

function commit(){
	 restSpan();
	 var menuName = $("#menuName").val();
	 if(menuName=="" || menuName==null){
	   $("#menuNameSpan").append('<i class="hongse">菜单名称不能为空</i>');
	 	return false;
	 }	
	 var sequenceNo = $("#sequenceNo").val();
	 if(sequenceNo=="" || sequenceNo==null){
		$("#sequenceNoSpan").append('<i class="hongse">菜单序号不能为空</i>');
	 	return false;
	 }	
	 var menuStatus = $("#menuStatus").val();
	 var isParent = $("#isParent").val();
	 var menuCss = $("#menuCss").val();
	 if(isParent == "true"){
	 if(menuCss==null || menuCss==""){
		 menuCss="icon-rom";
	 }}
	 var functionType = $("#functionType").val();
	 var action = $("#action").val();
	 var currentPId = $("#currentPId").val();
	 var currentLevel = $("#currentLevel").val();
	 if(initData==0){				
	      $.ajax({
			type:"POST",
			url:"addMenu.action",
			async:false,
			data: {"menuName":menuName,"menuStatus":menuStatus,"isParent":isParent,"functionType":functionType,"sequenceNo":sequenceNo,"action":action,"currentPId":currentPId,"currentLevel":currentLevel,"menuCss":menuCss},
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success:function(flag){
				if(flag == '1'){
					$("#addDialog").hide();
					bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '新增成功!'
					});					
					 
				}
				
			},
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 npmsAlert('新增失败!');
                 $("#addDialog").hide();
              }
		});		
	     
	}
	else if(initData==1){		
		var currentEditId = $("#currentEditId").val();		
		$.ajax({
			type:"POST",
			url:"updateMenu.action",
			async:false,
			data: {"currentEditMenuId":currentEditId,"editMenuName":menuName,"editMenuStatus":menuStatus,"editFunctionType":functionType,"editSequenceNo":sequenceNo,"menuCss":menuCss,"editAction":action,"currentLevel":currentLevel},
			success:function(flag){
				if(flag == '1'){
					$("#addDialog").hide();
					bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '修改成功!'
					});										 
				}
			},
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 npmsAlert('修改失败!');
                 $("#addDialog").hide();
              }
	        });		
	     }
	    getAuthByPage(0);
	    //location.reload();
		var pId = $("#currentPId").val();
        getMenuList(pId);
        //if(pId=="0"){
   	    treeObj.reAsyncChildNodes(null, "refresh");
        // }else{
  	    // var nodes = treeObj.getSelectedNodes();
			//if (nodes.length>0) {
		//	    treeObj.reAsyncChildNodes(nodes[0], "refresh");
			//}
     // }
};

/**
 * 权限查询
 */
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;
function getAuthByPage(pageNumber) {
	var index = layer.load(1, {shade: [0.1, '#393D49']});
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
		url : 'showMenuManageData.action',
		type : "post",
		//contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : eval(queryParams),
		success : function(lineData, status) {		
			// 返回数据存在
			var tabHTML = "";
			if (lineData && lineData.total) {
				var len = lineData.rows.length;
				for (var i = 0; i < len; i++) {
					var tempData = lineData.rows[i];
					tabHTML += '<tr>';									
					tabHTML += '<td>' + tempData.menuId + '</td>';					
					tabHTML += '<td>' + tempData.menuName + '</td>';
					tabHTML += '<td>' + tempData.sequenceNo + '</td>';																	
					if(tempData.menuType=='M')
					{
						tabHTML += '<td>' +'菜单' + '</td>';
					}
					else{
						tabHTML += '<td>' + '按钮' + '</td>';
					}
					tabHTML += '<td>' + tempData.menuCss + '</td>';
					if(tempData.isParent=='true'){
						tabHTML += '<td>' + '是' + '</td>';
					}else{
						tabHTML += '<td>' + '否' + '</td>';
					}		
					if(tempData.status=='1'){
					tabHTML += '<td>' + '有效' + '</td>';
					}
					else{
						tabHTML += '<td>' + '无效' + '</td>';
					}
					tabHTML += '<td title="' + tempData.createDate
							+ '"><span class="f-txt ">' + formatTime(tempData.createDate)
							+ '</span></td>';
					
					tabHTML += '<td>' + tempData.action + '</td>';
					
					tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
			         + "<a class='delete11'  href='javascript:void(0);' onclick=\"deleteDetail('"+tempData.menuId+"')\"></a>"+'</td>';
					
				
					tabHTML += "</tr>";
				}
				$("#authList").html("");
				$("#authList").html(tabHTML);
				$("#authListPage").show();
			} else {
				tabHTML += '<tr> <td COLSPAN="14">没有符合的记录, 请尝试其他搜索条件!</td></tr>';		
				$("#authList").html("");
				$("#authList").html(tabHTML);
			}
			layer.close(index);
			// 先清空
			$("#authListPage").empty();
			// 记录总数
			$('#authTotalCount').html(lineData.total);
			// 页数信息
			$('#authTotalPage').html(Math.ceil(lineData.total / pageSize));
			totalPage = Math.ceil(lineData.total / pageSize);
			$("#authListPage").pagination(lineData.total, {
				callback : getAuthByPageCallBack,
				prev_text : ' 上一页',
				next_text : '下一页 ',
				items_per_page : pageSize,
				num_display_entries : 5,
				num_edge_entries : 3,
				current_page : pageNumber
			});
		}
	});
};

//格式化日期
function formatTime(value){
	var dt = parseToDate(value);  
	if(typeof(dt) == "undefined"){
		return "";
	}
	return formatDate(dt,"yyyy-MM-dd hh:mm:ss");  
};

function parseToDate(value) {  
    if (value == null || value == '' || typeof(value) == "undefined") {  
        return undefined;   
    }  
  
    var dt;  
    if (value instanceof Date) {  
        dt = value;  
    }  
    else {  
        if (!isNaN(value)) {  
            dt = new Date(value);  
        }  
        else if (value.indexOf('/Date') > -1) {  
            value = value.replace(/\/Date(−?\d+)\//, '$1');  
            dt = new Date();  
            dt.setTime(value);  
        } else if (value.indexOf('/') > -1) {  
            dt = new Date(Date.parse(value.replace(/-/g, '/')));  
        } else {  
            dt = new Date(value);  
        }  
    }  
    return dt;  
};

function formatDate(date,format){
    var paddNum = function(num){
      num += "";
      return num.replace(/^(\d)$/,"0$1");
    }
    //指定格式字符
    var cfg = {
       yyyy : date.getFullYear() //年 : 4位
      ,yy : date.getFullYear().toString().substring(2)//年 : 2位
      ,M  : date.getMonth() + 1  //月 : 如果1位的时候不补0
      ,MM : paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
      ,d  : date.getDate()   //日 : 如果1位的时候不补0
      ,dd : paddNum(date.getDate())//日 : 如果1位的时候补0
      ,hh : date.getHours()  //时
      ,mm : date.getMinutes() //分
      ,ss : date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
  } ;

/**
 * 页数跳转
 * @returns
 */
function jumpPage() {
	// 获取
	var page = $('.inp-jump .formH-control').val();
	
	if (page == '' || page == null) {
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '请输入跳转页数'
		});
		return undefined;
	} else if (isNaN(page) || ((page + '').indexOf('.') > -1)) {
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '请输入有效页数'
		});
		$(parent).scrollTop(0);
		return undefined;
	}  else if (page<=0) {
  		bootbox.alert({
  			buttons : {
  				ok : {
  					label : '确定',
  					className : 'btn-sm btn-primary'
  				}
  			},
  			message : '请输入大于0的页数'
  		});
  		$(parent).scrollTop(0);
  		return undefined;
  	}else {		
		// 判断
		if (page > totalPage) {
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '输入的页数已经超出当前查询总页数！'
			});
			return undefined;
		}
		var pageNum = page - 1;
		getAuthByPage(pageNum);
	}
};

// 回调
function getAuthByPageCallBack(index, jq) {
	getAuthByPage(index);
};

function getAuthByPageCallBackChild(index, jq) {
	 getMenuListC(index);
};

// 查询参数设置
function getQueryParams(pageNumber) {
	//var employeeId = $("#menuId").val();
	var queryParams = {		
		//'menuId' : employeeId,		
		'pageSize' : pageSize,
		'page' : pageNumber+1
	};
	return queryParams;
};

//修改
function editDetail(obj){
   $("#titleinit").html("修改菜单");
   initData=1;	
   $("#menuNameSpan").empty();
   $("#sequenceNoSpan").empty();
   var tr = $(obj).parent().parent();
   var tds = tr.find("td");
   var menuId = tds[0].innerHTML;
 
	    $("#currentEditId").val(menuId);
		
		$("#menuName").val(tds[1].innerHTML);

		$("#sequenceNo").val(tds[2].innerHTML);
		
		$("#menuCss").val(tds[4].innerHTML);

		if(tds[6].innerHTML=="有效"){
			$("#menuStatus").val('1');
		}else{
			$("#menuStatus").val('0');
		}	          	   
		$("#isPedit").hide();	    
		//$("#isMedit").hide();
		if(tds[5].innerHTML=="否"){
		$("#isMedit").hide();
		}
	    if(tds[3].innerHTML=="菜单"){
	    	 $("#functionType").val('M');
		}else{
			 $("#functionType").val('B');
		}
	   
	    $("#action").val(tds[8].innerHTML);
	  
	    $("#addDialog").show();	
};

//删除
function deleteDetail(menuId){	
	bootbox.confirm({
        buttons : {
			confirm : {
				label : '确认',
				className : 'btn-sm btn-primary'
			},
			cancel : {
				label : '取消',
				className : 'btn-default'
			}
		},

		message : "您确定要删除选择的数据？",
		callback : function(result) {
           if(result){
        		$.ajax({
        			url : 'deleteMenu.action',
        			type : "post",
        			async:false,
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			data: {"menuIds":menuId},
        			success : function(result) {      
        				if (result == 1) {
        					 npmsAlert('删除成功!');
       					     getAuthByPage(0);
        				  	 var pId = $("#currentPId").val();
        			         getMenuList(pId);	
        			         treeObj.reAsyncChildNodes(null, "refresh");
//        			         if(pId=="000"){
//       			             treeObj.reAsyncChildNodes(null, "refresh");
//        			          }else{
//        			       	  var nodes = treeObj.getSelectedNodes();
//        						 if (nodes.length>0) {
//        						    treeObj.reAsyncChildNodes(nodes[0], "refresh");
//        						 }
//        			          }
        			  	  // location.reload();
        			  	  //window.location.href="${request.contextPath}/opt/showoperation.action?ran="+Math.random();
        			} else  {
        				npmsAlert('删除失败!');
        			}          			 
        			}
        	     });
        	   
              } 
		  }
	});	
	    
}

npmsAlert = function (msg){
	 var html = '<div id="alertDialog" class="bootbox modal fade in" tabindex="-1" role="dialog" style="display: block;">'
				+'<div class="modal-dialog">'
				+'<div class="modal-content" style="top:110px">'
				+'<div class="modal-body">'
				+'<button type="button" class="bootbox-close-button close" onclick="closeAlert()" style="margin-top: -10px;">×</button>'
				+'<div class="bootbox-body">'+ msg +'</div>'
				+'</div>'
				+'<div class="modal-footer">'
				+'<button onclick="closeAlert()" data-bb-handler="ok" type="button" class="btn btn-sm btn-primary">确定</button>'
				+'</div>'
				+'</div>'
				+'</div>'
				+'</div>';
	 $("body").append(html);
}

function closeAlert(){
	$("#alertDialog").remove();
}
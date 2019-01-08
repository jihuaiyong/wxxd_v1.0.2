/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {
	       
	$('.nav-list li').eq(1).addClass('active open').siblings().removeClass('active');
	$('.nav-list li').eq(1).children('.submenu').children().eq(0).addClass('active').siblings().removeClass('active');
	getAuthByPage(pageNumber,10);
	draggable($(".modal-header")) ;
});

var initData;
function initDiv(){
	 $("#userName").val("");
	 $("#userStatus").val(1);
	 $("#userNickName").val("");
	 $("#department").val("");
	 $("#userNameSpan").empty();
};

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
          };

function add(){
	$("#titleinit").html("新增用户");
	initDiv();
	$("#userName").removeAttr("disabled");
//	var setting = {
//			check: {
//					enable: true
//			},
//			view: {
//				showIcon: showIconForTree
//			},
//			data: {
//				key: {
//					name: "roleName"
//				},
//				simpleData: {
//					enable: true,
//					idKey: 	"id",
//					pIdKey: "parent",
//					rootPId: 0 
//				}
//			},
//			async: {
//				enable: true,
//				url: "${request.contextPath}/AuthorityManage/getAllRoleNodes.action",
//				autoParam: ["id"]
//			}
//		};
//		$.fn.zTree.init($("#roleTree"), setting);
	var setting = {
			check: {
					enable: true
			},
			view: {
				showIcon: showIconForTree
			},
			data: {
				key: {
					name: "roleName"
				},
				simpleData: {
					enable: true,
					idKey: 	"id",
					pIdKey: "parent",
					rootPId: 0 
				}
			}
		};
		$.ajax({
			type:"POST",
			url: "getAllRoleNodes.action",
			async:false,
			success:function(data){
			var treeObj =  $.fn.zTree.init($("#roleTree"), setting,data);
			treeObj.expandAll(true);
			},
			  error: function(XMLHttpRequest, textStatus, errorThrown) {
                  alert(XMLHttpRequest.status);
                  alert(XMLHttpRequest.readyState);
                  alert(textStatus); 
               }
		});
	   initData=0;			
	 $("#addDialog").show();	
		
};   


function batchAdd(){
	$("#titleinit").html("批量新增用户");

	var setting = {
			check: {
					enable: true
			},
			view: {
				showIcon: showIconForTree
			},
			data: {
				key: {
					name: "roleName"
				},
				simpleData: {
					enable: true,
					idKey: 	"id",
					pIdKey: "parent",
					rootPId: 0 
				}
			}
		};
		$.ajax({
			type:"POST",
			url: "getAllRoleNodes.action",
			async:false,
			success:function(data){
			var treeObj =  $.fn.zTree.init($("#batchRoleTree"), setting,data);
			treeObj.expandAll(true);
			},
			  error: function(XMLHttpRequest, textStatus, errorThrown) {
                  alert(XMLHttpRequest.status);
                  alert(XMLHttpRequest.readyState);
                  alert(textStatus); 
               }
		});
		
	 $("#batchAddDialog").show();	
		
};    

function closed(){
	 $("#addDialog").hide();
};

function batchClosed(){
	 $("#batchAddDialog").hide();
};

function downloadModel() {
    window.open(ctx+'/modelFile/batchAddUser.xlsx','下载上传模板',"");
}

function checkFileType(){

    var filePath=$("#file").val();           
    var arr=filePath.split('\\');
    var fileName=arr[arr.length-1];       
    $("#fupload").html(fileName);  
    if(fileName==0){
    	$("#fupload").html("");
    	$("#fupload").html("请点击这里上传文件");
    	return;
    }
    var index=filePath.lastIndexOf(".");
    var str=filePath.substring(index+1,filePath.length).toLowerCase();
      if(str!='txt'&&str!='csv'&&str!='xls'&&str!='xlsx'){		  
    	  bootbox.alert({
  			buttons : {
  				ok : {
  					label : '确定',
  					className : 'btn-sm btn-primary'
  				}
  			},
  			message : '请上传txt,csv,xls,xlsx格式文件！'
  		});      									   
	          return;
        }
    }

//导入
function fileUpload(){	

	   var filePath=$("#file").val();                                            
	   var index=filePath.lastIndexOf(".");
	   var str=filePath.substring(index+1,filePath.length).toLowerCase();
	   if(str!='txt'&&str!='csv'&&str!='xls'&&str!='xlsx'){		     
		 npmsAlertU("请上传txt,csv,xls,xlsx格式文件！");  
	     return;
	     }
	
		var treeObj = $.fn.zTree.getZTreeObj("batchRoleTree");
		var changeNodes = treeObj.getChangeCheckedNodes();
		var addRloes='';
		
		for(var i in changeNodes){
			addRloes=addRloes+changeNodes[i].id+'~';
		}
		
		if(addRloes == ''){
			npmsAlertU("请选择用户角色");
			return;
		}

		//组装参数
		var file = document.fileUploadForm.file.files[0];
		var fm = new FormData();
		fm.append('addRloes', addRloes);
		fm.append('file', file);
		
		var index = layer.load(1, {shade: [0.1, '#393D49']});
		
		$.ajax({
			url : 'batchAddUser.action',
			type: 'POST',
			data: fm,
	        contentType: false, //禁止设置请求类型
	        processData: false, //禁止jquery对DAta数据的处理,默认会处理
	        //禁止的原因是,FormData已经帮我们做了处理
			success : function(lineData, status) {
				if(lineData && lineData.errMsg){
				// 返回数据存在
				var tabHTML = "";
				var len = lineData.errMsg.length;
				if (lineData.total >0 && len == 0) {
					npmsAlertU("批量新增用户成功");
					$("#batchAddDialog").hide();
					getAuthByPage(0,pageSize);
				} else if(lineData.total == 0 && len == 0){
					npmsAlertU("文件内容为空或者内容格式错误，请上传具有有效数据的文件！");
				}else {
					var tip = "<font color='#ff0000' size='3'>------报错信息------</br>";
					for (var i = 0; i < len; i++) {
						var tempData = lineData.errMsg[i];
						tip += tempData + '</br>';
					}
					npmsAlertU(tip);
				}			
				
			}//取消遮罩层
			layer.close(index);	
			}
		});
  }


function valUserName(){
	var reBool = false;
	var userName = $("#userName").val();
	$("#userNameSpan").empty();
	if (userName == null || userName == '') {
		$("#userNameSpan").append('<i class="hongse">用户名不能为空</i>');
		return false;
	} else {
		$("#userNameSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"valUserName.action",
		data:{'userName':userName},
		async:false,
		success:function(flag){
			if (flag <=0) {
				$("#userNameSpan").append('<em class="tipOK4"></em>');
				reBool = true;
			} else {
				$("#userNameSpan").append('<i class="hongse">用户名已存在！</i>');
				reBool = false;
			}
		}
	});
	return reBool;
}

function commit(){
	var userName = $("#userName").val();
	var userNickName = $("#userNickName").val();
	var userStatus = $("#userStatus").val();
	var department = $("#department").val();
	var treeObj = $.fn.zTree.getZTreeObj("roleTree");
	var changeNodes = treeObj.getChangeCheckedNodes();
	var addRloes='';
		
	if(initData==0){
	
	if (valUserName()) {
		for(var i in changeNodes){
			addRloes=addRloes+changeNodes[i].id+'~';
		}	
	      $.ajax({
	    	type:"POST",
			url:"addUser.action",
			data:{'userName':userName,'userNickName':userNickName,'userStatus':userStatus,'addRloes':addRloes,'department':department},
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
				getAuthByPage(0,pageSize);
			},
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '新增失败!'
					});			
                 $("#addDialog").hide();
              }
		});
		}		
	}
	else if(initData==1){
		var deleteRloes ='';
		var currentEditId = $("#currentEditId").val();
		var treeObj = $.fn.zTree.getZTreeObj("roleTree");
		var changeNodes = treeObj.getChangeCheckedNodes();
		for(var i in changeNodes){
			if(changeNodes[i].checked){
				addRloes=addRloes+changeNodes[i].id+'~';
			}else{
				deleteRloes=deleteRloes+changeNodes[i].id+'~';
			}
		}
		$.ajax({
			type:"POST",
			url:"updateUser.action",
			data:{'userName':userName,'userNickName':userNickName,'userStatus':userStatus,'deleteRloes':deleteRloes,'addRloes':addRloes,'userId':currentEditId,'department':department},
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
				getAuthByPage(0,pageSize);
			},
			 error: function(XMLHttpRequest, textStatus, errorThrown) {
				 bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '修改失败!'
					});			
                 $("#addDialog").hide();
              }
	});
		
	}
};


function checkAll(obj){
   // $("input[type=checkbox][name=userId]").attr("checked",obj.checked);
	$("input[type=checkbox][name=userId]").prop("checked",obj.checked);
}
/**
 * 权限查询
 */
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;
function getAuthByPage(pageNumber,pageSize) {
	$("input[type=checkbox][name=checkAll]").removeAttr("checked");
	var index = layer.load(1, {shade: [0.1, '#393D49']});
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
		url : 'showUserManageData.action',
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
					
					tabHTML += '<td>' + '<input type="checkbox" name="userId" id="'+tempData.userId+'"  value="'+tempData.userId+'" autocomplete="off"/>' + '</td>';
					
					tabHTML += '<td>' + tempData.userName + '</td>';
					
					tabHTML += '<td>' + tempData.userNickName + '</td>';
					
					if(tempData.status=='1'){
						tabHTML += '<td>' + '有效' + '</td>';
						}
						else{
							tabHTML += '<td>' + '无效' + '</td>';
						}	
					tabHTML += '<td>' + formatTime(tempData.createDate)	+ '</td>';	
					tabHTML += '<td>' + formatTime(tempData.effectiveDate) + '</td>';
					tabHTML += '<td>' + formatTime(tempData.expirationDate)	+ '</td>';
					tabHTML += '<td>' + tempData.department	+ '</td>';
					if(tempData.userSource=='1'){
						tabHTML += '<td>' + '系统创建' + '</td>';
					}else{
						tabHTML += '<td>' + '其他' + '</td>';
					}									
										
					tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
					         + "<a class='delete11'  href='javascript:void(0);' onclick=\"deleteDetail(this)\"></a>"+'</td>';
					
				
					tabHTML += '</tr>';
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
	//alert(dt);
	return formatDate(dt,"yyyy-MM-dd");  
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
    format || (format = "yyyy-MM-dd");
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
		getAuthByPage(pageNum,pageSize);
	}
};

// 回调
function getAuthByPageCallBack(index, jq) {
	getAuthByPage(index,pageSize);
};


// 查询参数设置
function getQueryParams(pageNumber) {
	// 工号
	var employeeId = $("#userName_Search").val();
		
	var queryParams = {
		'userName' : employeeId,			
		'pageSize' : pageSize,
		'page' : pageNumber+1
	};
	return queryParams;
};

//修改
function editDetail(obj){
    $("#titleinit").html("修改用户");
    initDiv();
    var tr = $(obj).parent().parent();
    var tds = tr.find("td");
	var userId = tr.find("input[type=checkbox][name=userId]").val();
	$("#currentEditId").val(userId);
//	var setting = {
//		check: {
//				enable: true
//		},
//		view: {
//			showIcon: showIconForTree
//		},
//		data: {
//			key: {
//				name: "roleName"
//			},
//			simpleData: {
//				enable: true,
//				idKey: 	"id",
//				pIdKey: "parent",
//				rootPId: "" 
//			}
//		},
//		async: {
//			enable: true,
//			url: "getRoleNodesByUserId.action?userId="+userId,
//			autoParam: ["id"]
//		}
//	};
//	$.fn.zTree.init($("#roleTree"), setting);
	var setting = {
			check: {
					enable: true
			},
			view: {
				showIcon: showIconForTree
			},
			data: {
				key: {
					name: "roleName"
				},
				simpleData: {
					enable: true,
					idKey: 	"id",
					pIdKey: "parent",
					rootPId: 0 
				}
			}
		};
		$.ajax({
			type:"POST",
			//data:{"userId":userId},
			url:"getRoleNodesByUserId.action?userId="+userId,
			async:false,
			success:function(data){
			var treeObj =  $.fn.zTree.init($("#roleTree"), setting,data);
			treeObj.expandAll(true);
			}
		});

	$("#userName").val(tds[1].innerHTML).attr("disabled", "disabled");;
	if(tds[3].innerHTML=="有效"){
	    $("#userStatus").val(1);
	}else{
	    $("#userStatus").val(0);
	}
	$("#userNickName").val(tds[2].innerHTML);
	$("#department").val(tds[7].innerHTML);
	
	initData=1;	
    $("#addDialog").show();	
};

//删除
function deleteDetail(obj){
	bootbox
	.confirm({
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
        	   var tr = $(obj).parent().parent();
        	   var tds = tr.find("td");
        	   var userIds = tr.find("input[type=checkbox][name=userId]").val();        	                		  
        	   $.ajax({
        			url : 'deleteUser.action',
        			type : "post",
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			data : {"userIds":userIds},
        			success : function(result) {      
        				if (result == '1') {
        				  npmsAlertU('删除成功!');
        			  	  getAuthByPage(0,pageSize);
        			} else  {
        				  npmsAlertU('删除失败!');
        			}       		  		
        			}
        	     });
        	   
              } 
		  }
	});	
}

//删除
function deleteBatch(){
	var selectedCheckBoxes = $("input[type=checkbox][name=userId]:checked");
	var userIds = "";
	if(selectedCheckBoxes.length<=0){
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '请选择要删除的数据!'
		});
		return;
	}
	bootbox
	.confirm({
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
        	    
        		for (var i = 0;i<selectedCheckBoxes.length;i++) {
    				userIds = userIds + "~" + selectedCheckBoxes[i].value;
    			}
        		$.ajax({
        			url : 'deleteUser.action',
        			type : "post",
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			data : {"userIds":userIds},
        			success : function(result) {      
        				if (result == '1') {
        				  npmsAlertU('删除成功!');
        			  	  getAuthByPage(0,pageSize);
        			  	  $("input[type=checkbox][name=checkAll]").removeAttr("checked");
        			} else  {
        				  npmsAlertU('删除失败!');
        			}       		  		
        			}
        	     });
        	   
              } 
		  }
	});	
}

npmsAlertU = function (msg){
	 var html = '<div id="alertDialog" class="bootbox modal fade in" tabindex="-1" role="dialog" style="z-index:9999;display: block;">'
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
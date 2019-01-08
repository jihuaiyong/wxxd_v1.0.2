/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {
	       
	$('.nav-list li').eq(1).addClass('active open').siblings().removeClass('active');
	$('.nav-list li').eq(1).children('.submenu').children().eq(0).addClass('active').siblings().removeClass('active');
	getAuthByPage(pageNumber);
	draggable($(".modal-header")) ;
	
});
var initData;
function initDiv(){
	 $("#roleName").val("");
	 $("#roleStatus").val(1);
	 $("#description").val("");
	 $("#roleNameSpan").empty();
};

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
          };

function add(){
	$("#titleinit").html("新增角色");
	initDiv();
	var setting = {
			check: {
					enable: true
			},
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
					rootPId: 0 
				}
			}
		};
		$.ajax({
			type:"POST",
			url: "getAuthMenuNodes.action",
			async:false,
			success:function(data){
			var treeObj =  $.fn.zTree.init($("#menuTree"), setting,data);
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

function closed(){
	 $("#addDialog").hide();
};

function commit(){
	
	var roleName = $("#roleName").val();
	var roleStatus = $("#roleStatus").val();
	var description = $("#description").val();
	var treeObj = $.fn.zTree.getZTreeObj("menuTree");
	var changeNodes = treeObj.getChangeCheckedNodes();
	var addMenus='';
	if(initData==0){
	var valRoleNameFlag = valRoleName();
	if (valRoleNameFlag) {
		for(var i in changeNodes){
			addMenus = addMenus + changeNodes[i].id + '~';
		}	
	      $.ajax({
			type:"POST",
			url:"addRole.action",
			data:{'roleName':roleName,'roleStatus':roleStatus,'description':description,'addMenus':addMenus},
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
				getAuthByPage(0);
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
		var deleteMenus ='';
		var currentEditId = $("#currentEditId").val();
		var treeObj = $.fn.zTree.getZTreeObj("menuTree");
		var changeNodes = treeObj.getChangeCheckedNodes();
		for(var i in changeNodes){
			if(changeNodes[i].checked){
				addMenus=addMenus+changeNodes[i].id+'~';
			}else{
				deleteMenus=deleteMenus+changeNodes[i].id+'~';
			}
		}
		$.ajax({
			type:"POST",
			url:"updateRole.action",
			data:{'deleteMenus':deleteMenus,'addMenus':addMenus,'roleId':currentEditId,'roleStatus':roleStatus,'roleName':roleName,'description':description},
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
				getAuthByPage(0);
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

function valRoleName(){
	var reBool = false;
	var roleName = $("#roleName").val();
	$("#roleNameSpan").empty();
	if (roleName == null || roleName == '') {
		$("#roleNameSpan").append('<em class="tipFalse4"></em><i class="hongse">角色名不能为空</i>');
		return false;
	} else {
		$("#roleNameSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"valRoleName.action",
		data:{'roleName':roleName},
		async:false,
		success:function(flag){
			if (flag == null || flag == '') {
				$("#roleNameSpan").append('<em class="tipOK4"></em>');
				reBool = true;
			} else {
				$("#roleNameSpan").append('<em class="tipFalse4"></em><i class="hongse">角色名已存在</i>');
				reBool = false;
			}
		}
	});
	return reBool;
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
		url : 'showRoleManageData.action',
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
					
					tabHTML += '<td>' + (i + 1) + '</td>';
					
					tabHTML += '<td>' + tempData.roleId + '</td>';
					
					tabHTML += '<td>' + tempData.roleName + '</td>';
					if(tempData.status=='1'){
						tabHTML += '<td>' + '有效' + '</td>';
						}
						else{
							tabHTML += '<td>' + '无效' + '</td>';
						}								
					//tabHTML += '<td>' + tempData.status + '</td>';
															
					tabHTML += '<td title="' + tempData.createDate
							+ '"><span class="f-txt ">' + formatTime(tempData.createDate)
							+ '</span></td>';
					
					tabHTML += '<td>' + tempData.description + '</td>';
					
					tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
					         + "<a class='delete11'  href='javascript:void(0);' onclick=\"deleteDetail('"+tempData.roleId+"')\"></a>"+'</td>';
					
				
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
	//alert(dt);
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
	} else if (page<=0) {
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
  	} else {		
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


// 查询参数设置
function getQueryParams(pageNumber) {
	// 工号
	var employeeId = $("#roleId").val();
		
	var queryParams = {
		'roleId' : employeeId,			
		'pageSize' : pageSize,
		'page' : pageNumber+1
	};
	return queryParams;
};

//修改
function editDetail(obj){
   $("#titleinit").html("修改角色");
   initDiv();
   var tr = $(obj).parent().parent();
   var tds = tr.find("td");
   var setting = {
			check: {
					enable: true
			},
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
					rootPId: 0 
				}
			}
		};
		$.ajax({
			type:"POST",
			data:{"roleId":tds[1].innerHTML},
			url: "getMenuNodesByRoleId.action",
			async:false,
			success:function(data){
			var treeObj =  $.fn.zTree.init($("#menuTree"), setting,data);
			treeObj.expandAll(true);
			}
		});
		$("#roleName").val(tds[2].innerHTML);

		$("#description").val(tds[5].innerHTML);
//        if(kk[3]==1){ 
//        	//$("#roleStatus").val(kk[3]);
//        	$("#roleStatus").find("option[text='1']").attr("selected",true);
//        	}
//        else
//        {
//        	//$("#roleStatus").val(kk[3]);
//        	$("#roleStatus").find("option[text='0']").attr("selected",true);
//        }
	   if(tds[3].innerHTML=="有效"){
		   $("#roleStatus").val('1');
	   }else{
		   $("#roleStatus").val('0');
	   }
         
		initData=1;	
		$("#currentEditId").val(tds[1].innerHTML);
	    $("#addDialog").show();	
};

//删除
function deleteDetail(roleId){
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
        		$.ajax({
        			url : 'deleteRole.action',
        			type : "post",
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			data : {"roleIds":roleId},
        			success : function(result) {      
        				if (result == '1') {
        				  npmsAlert('删除成功!');
        			  	  getAuthByPage(0);
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
//绑定用户初始化
function bindUser(){
	if (isSelect()) {
		initBindUser();
		$('#modal_bindUser').modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});		
	}else{
		$('#modal_bindUser').modal('toggle');	

	}
}

var pageNumber = 0;	
var pageSize = 10;
var rolePageNumber = 0;	
var rolePageSize= 100;	
function initBindUser(){
	//初始化单个添加模态框
	$('#modal_addUser').modal({
		backdrop: 'static',
		keyboard: false,
		show: false
	});	
	
	//初始化批量添加模态框
	$('#modal_batchUser').modal({
		backdrop: 'static',
		keyboard: false,
		show: false
	});	
	
	//分页查询已绑定用户
	getUserRoleListByPage(rolePageNumber);
	
	//批量添加初始化所有用户
	getUserListByPage(pageNumber);
	
}


//查询单个添加用户
function getEmployeeInfoByEmployeeId(){
	var employeeId = $("#userid-uuq").val();
	var params = {
		'employeeId' : employeeId
	};	
	$
	.ajax({
		url : 'getEmployeeInfoByEmployeeId.action',
		type : "post",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : eval(params),
		success : function(result, status) {
			if (null != result) {
				$('#userid-uuq').val(result.data.employeeId);
				$('#username-uuq').val(result.data.employeeName);
				$('#districtid-uuq').val(result.data.districtId);
				$('#districtname-uuq').val(result.data.districtName);
				$('#positionid-uuq').val(result.data.positionId);
				$('#positionname-uuq').val(result.data.positionName);
				$('#orgid-uuq').val(result.data.orgId);
				$('#orgname-uuq').val(result.data.orgName);
			} else {
				$('#userid-uuq').val('');
				$('#username-uuq').val('');
				$('#districtid-uuq').val('');
				$('#districtname-uuq').val('');
				$('#positionid-uuq').val('');
				$('#positionname-uuq').val('');
				$('#orgid-uuq').val('');
				$('#orgname-uuq').val('');
			}
		}
	});	
}
	

/**
 * 查询所有未绑定用户信息
 */	
function getUserListByPage(pageNumber){
	var roleId = $("input[name='radio_role']:checked").val();
	//工号
	var employeeId = $("#userid-all").val();	
	//姓名
	var employeeName = $("#username-all").val();
	//岗位
	var positionName = $("#positionname-all").val();	
	//组织
	var orgName = $("#orgname-all").val();
	
	var params = {
			'roleId':roleId,
			'employeeId' : employeeId,
			'employeeName' : employeeName,
			'positionName' : positionName,
			'orgName' : orgName,
			'pageNumber' :pageNumber,
			'pageSize' :rolePageSize
	};	
	
	
	$
			.ajax({
				url : 'getUnbindUserListByRoleByPage.action',
				type : "post",
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : eval(params),
				async:false,
				success : function(lineData, status) {
					// 返回数据存在
					var tabHTML = "";
					if (lineData && lineData.total) {
						var len = lineData.rows.length;
						for (var i = 0; i < len; i++) {
							var tempData = lineData.rows[i];
							tabHTML += '<tr>';
							// 选定按钮
							tabHTML += '<td><input type="checkbox" name="checkbox_user_all" value="'
									+ tempData.EMPLOYEEID + '"/></td>';
							// 工号
							tabHTML += '<td>' + tempData.EMPLOYEEID + '</td>';
							// 姓名
							tabHTML += '<td>' + tempData.EMPLOYEENAME + '</td>';
							// 大区
							tabHTML += '<td>' + tempData.DISTRICTNAME + '</td>';
							// 岗位
							tabHTML += '<td title="' + tempData.POSITIONNAME + '"><span class="f-txt ">' + tempData.POSITIONNAME + '</span></td>';
							// 组织
							tabHTML += '<td title="' + tempData.ORGNAME + '"><span class="f-txt ">' + tempData.ORGNAME + '</span></td>';
							// 品类
							tabHTML += '<td>' + tempData.BRANDNAME + '</td>';
							// 所属公司
							tabHTML += '<td title="' + tempData.ORGFINANCIALNAME + '"><span class="f-txt ">' + tempData.ORGFINANCIALNAME + '</span></td>';							
							tabHTML += "</tr>";
						}

						
						
						$("#userList-all").html("");
						$("#userList-all").html(tabHTML);
						$("#userListPage-all").show();
					} else {
						$("#userList-all").html("");
					}
					// 先清空
					$("#userListPage-all").empty();
					// 记录总数
					$('#userTotalCount-all').html(lineData.total);
					// 页数信息
					$('#userTotalPage-all').html(
							Math.ceil(lineData.total / rolePageSize));

					$("#userListPage-all").pagination(lineData.total, {
						callback : getUserListByPageCallBack,
						prev_text : ' 上一页',
						next_text : '下一页 ',
						items_per_page : rolePageSize,
						num_display_entries : 5,
						num_edge_entries : 3,
						current_page : pageNumber
					});
				}
			});	
	
}	


//页数跳转
function jumpPage_All() {
	// 获取
	var page = $('#page_batchUser').val();
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
	}
	else {
		// 总页数
		var totalPage = $('#userTotalCount-all').html();
		// 判断
		if (parseInt(page) > parseInt(totalPage)) {
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
		var pageNum = parseInt(page) - 1;
		getUserListByPage(pageNum);
	}
}

// 回调
function getUserListByPageCallBack(index, jq) {
	getUserListByPage(index);
}
	

//保存添加用户（单个）
function saveBindUser(){
	// 角色编码
	var roleId = $("input[name='radio_role']:checked").val();
	// 员工编号
	var employeeId = $('#userid-uuq').val();
	// 员工名称
	var employeeName = $('#username-uuq').val();
	// 大区编码
	var districtId = $('#districtid-uuq').val();
	// 大区名称
	var districtName = $('#districtname-uuq').val();
	// 岗位编号
	var positionId = $('#positionid-uuq').val();
	// 岗位名称
	var positionName = $('#positionname-uuq').val();
	// 组织编号
	var orgId = $('#orgid-uuq').val();
	// 组织名称
	var orgName = $('#orgname-uuq').val();
	// 登录用户
	var loginUser = $("#employeeId").val();  
	
	var params = {
		'roleId' : roleId,
		'employeeId' : employeeId,
		'employeeName' : employeeName,
		'districtId' : districtId,
		'districtName' : districtName,
		'positionId' : positionId,
		'positionName' : positionName,
		'orgId' : orgId,
		'orgName' : orgName,
		'loginUser' : loginUser
	};
	var jsonObj = eval(params);
	jQuery.ajax({
		type : 'post',
		url : "insertUserRole.action",
		data : jsonObj,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(result) {
			if (result == 'success') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定成功!'
				});
				$('#modal_addUser').modal('toggle');
				// 重新加载列表
				//getUserRoleList();
				getUserRoleListByPage(rolePageNumber);
			} else if (result == 'fail') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定失败!'
				});
			} else if (result == 'exists') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定失败，用户已经存在！'
				});
			}
		}
	});
}

//保存添加用户（批量）
function saveBindBatchuser(){
	// 角色编码
	var roleId = $("input[name='radio_role']:checked").val();
	// 员工编号
	var employeeIds = '';					
    $("input[name='checkbox_user_all']:checked").each(function(){
        var employeeId=$(this).val();
        employeeIds += '\''+employeeId + '\',';
    });
    employeeIds = employeeIds.substring(0,employeeIds.length - 1);		
	
	// 登录用户
	var loginUser = $("#employeeId").val();    
	var params = {
		'roleId' : roleId,
		'employeeIds' : employeeIds,
		'loginUser' : loginUser
	};
	var jsonObj = eval(params);
	
	jQuery.ajax({
		type : 'post',
		url : "insertRoleUserList.action",
		data : jsonObj,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		async:false,
		success : function(result) {
			if (result == 'success') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定成功!'
				});
				getUserRoleListByPage(rolePageNumber);
				getUserListByPage(pageNumber);
				$('#modal_batchUser').modal('toggle');
				// 重新加载列表
				//getUserRoleList();
				
			} else if (result == 'fail') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定失败!'
				});
			} else if (result == 'exists') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '绑定失败，用户已经存在！'
				});
			}
		}
	});		
	
}

//删除角色已绑定用户
function deleteUserRoleList(){
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
			message : "您确定要删除选择记录？",
			callback : function(result) {
				if (result) {
					var roleId = $("input[name='radio_role']:checked").val();					
					var employeeIds = '';					
		            $("input[name='checkbox_user']:checked").each(function(){
		                var employeeId=$(this).val();
		                employeeIds += employeeId + '|';
		            });
		            employeeIds = employeeIds.substring(0,employeeIds.length - 1);
					//校验是否勾选
					if(employeeIds == ''){
						bootbox
						.alert({
							buttons : {
								ok : {
									label : '确定',
									className : 'btn-sm btn-primary'
								}
							},
							message : '请选择删除选项!'
						});	
						return;
					}
		            
		            
		            
					if (roleId != null) {
						var queryParams = {
							'roleId' : roleId ,
							'employeeIds':employeeIds
						};
						jQuery
								.ajax({
									type : 'post',
									url : "deleteUserRole.action",
									data : eval(queryParams),
									contentType : "application/x-www-form-urlencoded; charset=utf-8",
									success : function(result) {
										if (result == 'success') {
											bootbox
													.alert({
														buttons : {
															ok : {
																label : '确定',
																className : 'btn-sm btn-primary'
															}
														},
														message : '删除成功!'
													});
											// 重新加载列表										
											//getUserRoleList();
											getUserRoleListByPage(rolePageNumber);
										} else if (result == 'fail') {
											bootbox
													.alert({
														buttons : {
															ok : {
																label : '确定',
																className : 'btn-sm btn-primary'
															}
														},
														message : '删除失败!'
													});
										}
									}
								});

					}
				}
			}
		});
}


//校验是否选中radio
function isSelect() {
	// 获取被选中的radio
	var checkedItems = $("input[name='radio_role']:checked");

	if (checkedItems.length == 0) {
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '请选择角色'
		});
		return false;
	}		
	return true;
}



/**
 * 全选/反选切换
 */
$("#checkbox_user_all").change(function() { 
	$("input[name='checkbox_user_all']").prop('checked',$(this).prop('checked'));
});

$("#checkbox_user").change(function() { 
	$("input[name='checkbox_user']").prop('checked',$(this).prop('checked'));
});


/**
 * 分页查询已绑定用户
 */
function getUserRoleListByPage(rolePageNumber){
	var roleId = $("input[name='radio_role']:checked").val();
	var employeeId = $("#userId").val();
	var params = {
		'roleId' : roleId,
		'employeeId' : employeeId,
		'pageNumber' :rolePageNumber,
		'pageSize' :rolePageSize
	};
	$
	 .ajax({
				url:'getUserRoleListByPage.action',
				//url : 'getUserRoleList.action',
				type : "post",
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : eval(params),
				success : function(result, status) {

					// 返回数据存在
					var tabHTML = "";
					if (result && result.total) {
						var len = result.rows.length;
						for (var i = 0; i < len; i++) {
							var tempData = result.rows[i];
						
							tabHTML += '<tr>';
							// 选定按钮
							tabHTML += '<td><input type="checkbox" name="checkbox_user" value="'
									+ tempData.EMPLOYEE_ID + '"/></td>';
							// 工号
							tabHTML += '<td>' + tempData.EMPLOYEE_ID + '</td>';
							// 姓名
							tabHTML += '<td>' + tempData.EMPLOYEE_NAME + '</td>';
							// 大区
							tabHTML += '<td>' + tempData.DISTRICT_NAME + '</td>';
							// 岗位
							tabHTML += '<td title="'+ tempData.POSITION_NAME+'"><span class="f-txt ">' + tempData.POSITION_NAME + '</span></td>';
							// 部门
							tabHTML += '<td title="'+tempData.ORG_NAME+'"><span class="f-txt ">' + tempData.ORG_NAME + '</span></td>';
							tabHTML += "</tr>";
						}
						$("#userList").html("");
						$("#userList").html(tabHTML);
					} else {
						$("#userList").html("");
					}
					// 先清空
					$("#bindUserListPage-all").empty();
					// 记录总数
					$('#bindUserTotalCount-all').html(result.total);
					// 页数信息
					$('#bindUserTotalPage-all').html(
							Math.ceil(result.total / rolePageSize));

					$("#bindUserListPage-all").pagination(result.total, {
						callback : getUserRoleListByPageCallBack,
						prev_text : ' 上一页',
						next_text : '下一页 ',
						items_per_page : rolePageSize,
						num_display_entries : 5,
						num_edge_entries : 3,
						current_page : rolePageNumber
					});
				}
			});
}
 function  getUserRoleListByPageCallBack(index, jq) {
	 getUserRoleListByPage(index);
 }
 
//用户绑定页数跳转
 function bindJumpPage_All() {
 	// 获取
 	var page = $('#bindPage_batchUser').val();
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
 	}
 	else {
 		// 总页数
 		var totalPage = $('#bindUserTotalCount-all').html();
 		// 判断
 		if (parseInt(page) > parseInt(totalPage)) {
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
 		var pageNum = parseInt(page) - 1;
 		getUserRoleListByPage(pageNum);
 	}
 }

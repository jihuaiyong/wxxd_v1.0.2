/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {
	getRoleByPage(pageNumber);
	//表单验证
	$('#add_form')
			.bootstrapValidator(
					{
						message : 'This value is not valid',				
						fields : {
							rolename_add : {
								message : '验证失败',
								validators : {
									notEmpty : {
										message : '名称不能为空'
									},
									stringLength : {									
										max : 25,
										message : '长度不能超过25'
									}
								}
							}
						}
					});
	
	$('#mod_form')
	.bootstrapValidator(
			{
				message : 'This value is not valid',
		
				fields : {
					rolename_mod : {
						message : '验证失败',
						validators : {
							notEmpty : {
								message : '名称不能为空'
							},
							stringLength : {									
								max : 25,
								message : '长度不能超过25'
							}
						}
					}
				}
			});	

});

/**
 * 查询角色
 */ 
var pageSize = 10;
var pageNumber = 0;
function getRoleByPage(pageNumber) {
	var queryParams = getQueryParams(pageNumber);
	// 角色编码
	var roleId = $("#roleId").val();	
	// 角色名称
	var roleName = $("#roleName").val();
	queryParams.roleId = roleId;
	queryParams.roleName = roleName;
	
	$
			.ajax({
				url : 'getRoleByPage.action',
				type : "post",
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data : eval(queryParams),
				success : function(lineData, status) {
					// 返回数据存在
					var tabHTML = "";
					if (lineData && lineData.total) {
						var len = lineData.rows.length;
						for (var i = 0; i < len; i++) {
							var tempData = lineData.rows[i];
							tabHTML += '<tr>';
							// 选定按钮
							tabHTML += '<td><input type="radio" name="radio_role" value="'
									+ tempData.ROLE_ID + '"/></td>';
							// 角色编码
							tabHTML += '<td>' + tempData.ROLE_ID + '</td>';
							// 角色名称
							tabHTML += '<td>' + tempData.ROLE_NAME + '</td>';
							// 创建时间
							tabHTML += '<td>' + parseTime(tempData.CREATE_TIME) + '</td>';
							// 创建人
							tabHTML += '<td>' + tempData.CREATOR + '</td>';
							tabHTML += "</tr>";
						}
						$("#roleList").html("");
						$("#roleList").html(tabHTML);
						$("#roleListPage").show();
					} else {
						$("#roleList").html("");
					}
					// 先清空
					$("#roleListPage").empty();
					// 记录总数
					$('#roleTotalCount').html(lineData.total);
					// 页数信息
					$('#roleTotalPage').html(
							Math.ceil(lineData.total / pageSize));

					$("#roleListPage").pagination(lineData.total, {
						callback : getRoleByPageCallBack,
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

// 页数跳转
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
	}
	else {
		// 总页数
		var totalPage = $('#roleTotalPage').html();
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
		getRoleByPage(pageNum);
	}
}

// 回调
function getRoleByPageCallBack(index, jq) {
	getRoleByPage(index);
}

/**
 * 跳转新增角色页面
 */
$('.title-p .btn-add').on('click', function() {
	$('#rolename_add').val('');
	$('.pop').show();
	$('.pop .confirm-editDj').show();
});

/**
 * 新增角色保存
 */ 
function addRoleConfirm() {
	$('#add_form').data('bootstrapValidator').validate();  
    if(!$('#add_form').data('bootstrapValidator').isValid()){  
        return ;  
    } 	
	
	var loginUser = $("#employeeId").val();
	// 角色名称
	var roleName = $("#rolename_add").val();
	var params = {
		'roleName' : roleName,
		'loginUser' : loginUser
	};
	var jsonObj = eval(params);
	jQuery.ajax({
		type : 'post',
		url : "insertRole.action",
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
					message : '新增角色成功!'
				});
				$('.pop').hide();
				$('.pop .confirm-editDj').hide();
				// 重新加载列表
				getRoleByPage(pageNumber);
			} else if (result == 'fail') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '插入失败!'
				});
			} else if (result == 'exists') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '插入失败，角色名称已经存在！'
				});
				;
			}
		}
	});
}

/**
 * 跳转角色修改
 */
$('.title-p .btn-revise').on('click', function() {
	if (isChecked()) {
		$('.pop').show();
		$('.pop .confirm-modifyDj').show();
	}
	
	//获得当前角色ID
	var roleId = $("input[name='radio_role']:checked").val();
	var params = {
			'roleId' : roleId,
	};
	var jsonObj = eval(params);	
	jQuery.ajax({
		type : 'post',
		url : "getRoleInfoByIdOrName.action",
		data : jsonObj,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(data) {
			if (null != data) {
				var rolename = data.ROLE_NAME;
				$('#rolename_mod').val(rolename);
			}
		}
	});
	
});


/**
 * 修改角色保存
 */ 
function modRoleConfirm() {
	//验证
	$('#mod_form').data('bootstrapValidator').validate();  
    if(!$('#mod_form').data('bootstrapValidator').isValid()){  
        return ;  
    } 	
	
	var loginUser = $("#employeeId").val();
	// 角色名称
	var roleName = $("#rolename_mod").val();
	// 角色ID
	var roleId = $("input[name='radio_role']:checked").val();	
	var params = {
		'roleId' : roleId,
		'roleName' : roleName,
		'loginUser' : loginUser
	};
	var jsonObj = eval(params);
	jQuery.ajax({
		type : 'post',
		url : "updateRole.action",
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
					message : '更新成功!'
				});
				$('.pop').hide();
				$('.pop .confirm-modifyDj').hide();
				// 重新加载列表
				getRoleByPage(pageNumber);
			} else if (result == 'fail') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '更新失败!'
				});
			} else if (result == 'exists') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '更新失败，角色名称已经存在！'
				});
				;
			}
		}
	});
}



/**
 * 角色删除
 */
function deleteRole() {
	if (isChecked()) {
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
							if (roleId != null) {
								// 系统管理员特殊处理
								if (roleId == '00001') {
									bootbox
											.alert({
												buttons : {
													ok : {
														label : '确定',
														className : 'btn-sm btn-primary'
													}
												},
												message : '系统管理员不允许删除！'
											});
									return;
								} else {
									var queryParams = {
										'roleId' : roleId
									};
									jQuery
											.ajax({
												type : 'post',
												url : "deleteRole.action",
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
														getRoleByPage(pageNumber);
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
													} else if (result == 'exists') {
														bootbox
																.alert({
																	buttons : {
																		ok : {
																			label : '确定',
																			className : 'btn-sm btn-primary'
																		}
																	},
																	message : '删除失败!角色:'
																			+ roleId
																			+ '已分配菜单或绑定用户，无法删除!'
																});
													}
												}
											});
								}
							}
						}
					}
				});

	}
}




//校验是否选中radio
function isChecked() {
	// 获取被选中的radio
	var checkedItems = $("input[name='radio_role']:checked");
	var roleId = $("input[name='radio_role']:checked").val();

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
//	
//	else {
//		// 系统管理员特殊处理
//		if (roleId == '00001') {
//			bootbox
//					.alert({
//						buttons : {
//							ok : {
//								label : '确定',
//								className : 'btn-sm btn-primary'
//							}
//						},
//						message : '系统管理员不允许操作！'
//					});
//			return false;
//		}			
//		return true;
//	}
	return true;
}

//弹出框关闭
$('.pop .btn-close, .pop .btn-cancel').on('click', function() {
	$('.pop').hide();
	$(this).parents('.confirm').hide();
});


// 查询参数设置
function getQueryParams(pageNumber) {
	var queryParams = {
		'pageSize' : pageSize,
		'pageNumber' : pageNumber
	};
	return queryParams;
}


/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {

	//权限列表
	qryAuthConfigByPage(0);
	initData();
	getBycds();
	
	$('#add_config')
	.bootstrapValidator(
			{
				message : 'This value is not valid',				
				fields : {
					username : {
						message : '验证失败',
						validators : {
							notEmpty : {
								message : '员工工号不能为空'
							},
							stringLength : {									
								max : 20,
								message : '长度不能超过20'
							}
						}
					}
					
				}
			});
	
	
});
/**
 * 查询汇总统计
 */
var pageNumber = 0;
var pageSize = 10;
var cds = [];
var typeList = [];
var typeListVal = [];

/**
 * 权限配置列表
 */
function qryAuthConfigByPage(pageNumber) {
	//提示
	//$('.buffer, .buffer .loading').show();	
	var queryParams = getQueryParams(pageNumber);
	$.ajax({
			url : 'qryAuthConfigByPage.action',
			type : "post",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : eval(queryParams),
			success : function(lineData, status) {
				//$('.buffer, .buffer .loading').hide();		
				// 返回数据存在
				var tabHTML = "";
				if (lineData && lineData.total) {
					var len = lineData.rows.length;
				    
					for (var i = 0; i < len; i++) {
						var tempData = lineData.rows[i];
				  
						tabHTML += '<tr>';
						// 工号
						tabHTML += '<td>' + tempData.usr_cd + '</td>';
						//姓名
						tabHTML += '<td>' + tempData.EMPLOYEENAME + '</td>';
						
						tabHTML += '<td>' + authTp(tempData.AUTH_TP) + '</td>';
						tabHTML += '<td>' + tp(tempData.TP)+ '</td>';
				
						tabHTML += '<td>' + tempData.CD_TEXT + '</td>';
						tabHTML += '<td>'+filterFlag(tempData)+'</td>';
						tabHTML += "</tr>";
					}
				
					$("#authconfigList").html("");
					$("#authconfigList").html(tabHTML);
					$("#authListPage").show();
				} else {
					$("#authconfigList").html("");
				}
				// 先清空
				$("#authListPage").empty();
				// 记录总数
				$('#authconfigTotalCount').html(lineData.total);
				// 页数信息
				$('#authconfigTotalPage').html(
						Math.ceil(lineData.total / pageSize));

				$("#authconfigListPage").pagination(lineData.total, {
					callback : qryAuthConfigByPageCallBack,
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

function  filterFlag(v){
	var str = "";
	if(v.flag=="1"){
		
		str = "hr权限，不可维护";
	}else{
		
		str = "<a	href=\"javascript:delConfig('"+v.usr_cd+"','"+v.TP+"','"+v.CD+"','"+v.AUTH_TP+"')\">删除</a>";
	}
	return str;
}
//翻译维度
function  authTp(v){
	var str = "";
	if(v=="01"){
		str = "区域维";
	}else if(v=="02"){
		str = "商品维";
	}else{
		str = v;
	}
	return str;
}
//翻译类型
function  tp(v){
	var str = "";
	if(v=="WD1029"){
		str = "品类";
	}else if(v=="WD1030"){
		str = "品牌";
	}else if(v=="WD1031"){
		str = "明细商品组";
	}else if(v=="WD1020"){
		str = "大区";
	}else if(v=="WD1021"){
		str = "公司(城市公司)";
	}else if(v=="WD1022"){
		str = "门店";
	}else{
		str = v;
	}
	return str;
}
/**
 * 回调
 */ 
function qryAuthConfigByPageCallBack(index, jq) {
	qryAuthConfigByPage(index);
}

/**
 * 查询参数设置
 */
function getQueryParams(pageNumber) {
	var queryParams = {};
	var  usr_cd = $("#usr_cd").val();
	queryParams.usr_cd = usr_cd;
	queryParams.pageNumber = pageNumber;
	queryParams.pageSize = pageSize;
	return queryParams;
}

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
	} else {
		// 总页数
		var totalPage = $('#exportTotalPage').html();
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
		qryAuthConfigByPage(pageNum);
	}
}
$("#submit").bind("click",function(){
	
   var Params = {};
   var user_id = $("#user_id").val();
   var auth_tp =$("#authAxis").val();
   var tp =$("#authProductType").val();
   var cd = $("#cds").val();
	$('#add_config').data('bootstrapValidator').validate();  
    if(!$('#add_config').data('bootstrapValidator').isValid()){  
        return ;  
    } 
   if(!cd){
	   alert("请勾选权限类型编码！");
	   return ;
   }
   Params.user_id = user_id;
   Params.auth_tp = auth_tp;
   Params.tp = tp;
   Params.cds = cd;

	$.ajax({
		url : 'insertAuthConfig.action',
		type : "post",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data : eval(Params),
		success : function(result) {
			 
		  		if (result == 'success') {
		  		
					bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : '新增成功!'
					});
					qryAuthConfigByPage(0);
				
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
					message : '插入失败，新增数据已经存在！'
				});
				;
			}
		  	   $("#cds").val("");
		  	   cds.splice(0,cds.length);
		  	   $("#addDialog").hide();
		}
	
		});

	
});
function initData(){
	
	$.ajax({
		url : 'initcdData.action',
		type : "post",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		data :{},
		success : function(lineData, status) {
			var jsonArry = {};
			jsonArry = lineData;
			//初始化下
			typeList = [];
			typeListVal = [];
			typeListVal.push("all");
			typeList.push("全部");
			$.each($.parseJSON(jsonArry),function(i,v){
				  typeListVal.push(i);
				  typeList.push(v);
				
			});
	
		},
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
			 alert("初始化异常！");
		   }
		});
	
}
function delConfig(user_id,tp,cd,auth_tp){
	var  Params = {};
	Params.user_id = user_id;
	Params.tp = tp;
	Params.cd = cd;
	Params.auth_tp = auth_tp;
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
           if(result){
        		$.ajax({
        			url : 'deleteAuthConfig.action',
        			type : "post",
        			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        			data : eval(Params),
        			success : function(result) {
        		  		if (result == 'success') {
        			  		
        					bootbox.alert({
        						buttons : {
        							ok : {
        								label : '确定',
        								className : 'btn-sm btn-primary'
        							}
        						},
        						message : '删除成功!'
        					});
        			  	    $("#addDialog").hide();
        					qryAuthConfigByPage(0);
        			} else if (result == 'fail') {
        				bootbox.alert({
        					buttons : {
        						ok : {
        							label : '确定',
        							className : 'btn-sm btn-primary'
        						}
        					},
        					message : '删除失败!'
        			    });
        			} else if (result == 'exists') {
        				bootbox.alert({
        					buttons : {
        						ok : {
        							label : '确定',
        							className : 'btn-sm btn-primary'
        						}
        					},
        					message : '网络异常删除失败!'
        			    });
        			}
        		  		
        		  		
        		  		
        			}
        	     });
        	   
              } 
		  }
	});

	
}
function  getBycds (){
	$(".pl").bind("click",function(){
        $(this).attr("value");
	});
	
}

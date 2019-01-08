/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function() {
	var $sidebar = $('.sidebar').on(
			'click',
			'a',
			function(e) {
				var $parentsLi, topIsActive;
				e.preventDefault();
				$parentsLi = $(this).parents('li', $sidebar);
				if ($parentsLi.last().hasClass('active')
						&& $(this).siblings('.nav').length > 0) {
					topIsActive = true;
				}
				$sidebar.find('.active').removeClass('active');
				if (!topIsActive) {
					$parentsLi.addBack().addClass('active');
				}
			});
	

	//初始化菜单
	loadSysAuthMenu();
	
	 //Bootstrap tab右键功能的实现
	  var nthTabs;
	  var cid;
	  nthTabs = $("#mainFrameTabs");		  
	  var menu = new BootstrapMenu('.nav-tabs', {
	  actionsGroups: [  //给右键菜单的选项加一个分组，分割线
		                    ['add'],
		                    ['edit'],
		                    ['dele']

		                ],
//      actions: [{
//        name: '关闭当前',
//        onClick: function() {
//        	nthTabs.NowbTabsClose(cid);
//              }
//            }, {
//        name: '关闭其他',
//        onClick: function() {
//            nthTabs.OtherbTabsClose();
//           }
//          }, {
//        name: '关闭所有',
//        onClick: function() {
//           nthTabs.AllbTabsClose();
//           }
//          }]
	  
	  actions: {
          add: {
              name: '关闭当前',
             // iconClass: 'fa-plus',
              onClick: function() {    //添加右击事件
            	 nthTabs.NowbTabsClose(cid);
              },             
          },
          edit: {
                name: '关闭其他',
                //iconClass: 'fa-edit',
                onClick: function() {   
                	 nthTabs.OtherbTabsClose();
                },
               
         },

         dele: {
             name: '关闭所有',
             //iconClass: 'fa-trash',
             onClick: function() {  
            	 nthTabs.AllbTabsClose();
             },        
         }
      }
     });	
		
});

/**
 * 动态导入左侧菜单
 */

function loadSysAuthMenu() {
	$.ajax({				
				url : ctx+'/AuthorityManage/getMenuByRoleId.action',
				type : 'post',
				data : {"username":username},
				//dataType : "json",
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				success : function(data, status) {
				
					if (data.length > 1) {						
						
						var menuHtml = '';
						var allIds = [];
						var obj = eval(data);
//						menuHtml += '<ul class="nav">';
//						menuHtml += '<li><a  onclick="ret()"><i class="'
//							+ 'icon-admin'
//							+ '"></i><span class="text-ellipsis">'
//							+ '首页'
//							+ '</span><i class="fu fu-right"></i></a>';
//						menuHtml += '</ul>';
						$.each(obj,function(j, value) {																		
																									
																if (obj[j].parent == 0) {
																	if(obj[j].menuCss==null){
																		obj[j].menuCss="";
																	}
																	menuHtml += '<ul class="nav">';
																	menuHtml += '<li><a><i class="'
																		+ obj[j].menuCss
																		+ '"></i><span class="text-ellipsis">'
																		+ obj[j].menuName
																		+ '</span><i class="fu fu-right"></i></a>';
																	var son = obj;
																		
																	$.each(son,function(k, value) {	
																		if(son[k].parent==obj[j].id){
																			if(son[k].menuCss==null){
																				son[k].menuCss="";
																			}
																			menuHtml += '<ul class="nav" id="menuSideBar">';
																			menuHtml += '<li><a title="'+son[k].menuName+'"  onclick="Open(\''
																			      +k+j+',' + son[k].menuName+','+ctx+'/'+son[k].action+ '\')"><span class="text-ellipsis">'
																				+ son[k].menuName
																				+ '</span></a></li>';
																			menuHtml += '</ul>';
																		}
																	});
																  																	
																	menuHtml += '</ul>';
																}
															});						
											$('.sidebar').append(menuHtml);
																																	
					} 
					else {
						bootbox.alert({
							buttons : {
								ok : {
									label : '确定',
									className : 'btn-sm btn-primary'
								}
							},
							message : '您目前没有本系统的权限，请联系管理员：'
						});
					}
				}
			});
}

/**
 * 左侧菜单点击查询
 * @param param
 */
function Open(texturl) {
	var mid=texturl.split(",")[0];
	var text=texturl.split(",")[1];
    var url=texturl.split(",")[2];
    $('#mainFrameTabs').bTabsAdd(mid,text,url);     
//	$('#iframeH').attr('src', ctx+'/'+url);
	//$('.header').hide();
	
}

/**
 * 返回首页方法
 * 
 */
//function ret(){	
//	
//	//window.location.href=ctx+"/AuthorityManage/showFristView.action";
//
//	location.reload();
//}
//在右边center区域打开菜单，新增tab
//function Open(texturl) {
//	$('.canvas-c').remove();
//	var text=texturl.split(",")[0];
//	var url=texturl.split(",")[1];
//    var content = '<iframe class="tabs-1" scrolling="auto" frameborder="0"  src="'+ctx+'/'+url+'" style="width: 87%;height: 95%;"></iframe>';
//
//    if ($("#tabs").tabs('exists', text)) {
//        $('#tabs').tabs('select', text);
//    } else {
//        $('#tabs').tabs('add', {
//            title : text,
//            closable : true,
//            content : content,
//            fit: true //tab铺满全屏
//        });       
//    }
//}


var treeFlag=1;

function switchTree(){
	if(treeFlag==1){
	$('.sidebar').html("");
	$('#treeFlag').css("width","4%");
	$('.iframeBox').css("width","116%");	
	$('.iframeBox').css("left","4%");
	//$('.tabs-1').css("width","105%");
	$('.portal-logo').css("margin-left","0px");
    $('.switchTree').css("margin-left", "2px");   
    $('#pmcpbiaodian').remove();
    $('#pmcpdesc').remove();	
	$.ajax({				
		url : ctx+'/AuthorityManage/getMenuByRoleId.action',
		type : 'post',
		data : {"username":username},
		//dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(data, status) {		
			if (data.length > 1) {										
				var menuHtml = '';
				var allIds = [];
				var obj = eval(data);
				$.each(obj,function(j, value) {																																									
														if (obj[j].parent == 0) {
															if(obj[j].menuCss==null){
																obj[j].menuCss="";
															}
															menuHtml += '<ul class="nav">';
															menuHtml += '<li><a><i class="'
																+ obj[j].menuCss
																+ '"></i><span class="text-ellipsis">'
																 '</span><i class="fu fu-right"></i></a>';
															var son = obj;
																
															$.each(son,function(k, value) {	
																if(son[k].parent==obj[j].id){
																	if(son[k].menuCss==null){
																		son[k].menuCss="";
																	}
																	menuHtml += '<ul class="nav">';
																	menuHtml += '<li></li>';
																	menuHtml += '</ul>';
																}
															});
														  																	
															menuHtml += '</ul>';
														}
													});						
									$('.sidebar').append(menuHtml);																															
			} 
		}
	});
	treeFlag=0;
	return;
	}
	if(treeFlag==0){
		$('.sidebar').html("");
		$('#treeFlag').css("width","13%");
		$('.iframeBox').css("width","105%");
		$('.iframeBox').css("left","13%");
		//$('.tabs-1').css("width","105%");
		$('.portal-logo').css("margin-left","10px");
		$('.switchTree').css("margin-left", "23px");
	    $('.portal-logo').append('<b id="pmcpbiaodian" style="font-size:15px">▪&nbsp;</b>');
	    $('.portal-logo').append('<small id="pmcpdesc">新一代价格管理系统</small>');
		$.ajax({				
			url : ctx+'/AuthorityManage/getMenuByRoleId.action',
			type : 'post',
			data : {"username":username},	
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			success : function(data, status) {
			
				if (data.length > 1) {						
					
					var menuHtml = '';
					var allIds = [];
					var obj = eval(data);
					$.each(obj,function(j, value) {																		
																								
															if (obj[j].parent == 0) {
																if(obj[j].menuCss==null){
																	obj[j].menuCss="";
																}
																menuHtml += '<ul class="nav">';
																menuHtml += '<li><a><i class="'
																	+ obj[j].menuCss
																	+ '"></i><span class="text-ellipsis">'
																	+ obj[j].menuName
																	+ '</span><i class="fu fu-right"></i></a>';
																var son = obj;
																	
																$.each(son,function(k, value) {	
																	if(son[k].parent==obj[j].id){
																		if(son[k].menuCss==null){
																			son[k].menuCss="";
																		}
																		menuHtml += '<ul class="nav" id="menuSideBar">';
																		menuHtml += '<li><a title="'+son[k].menuName+'"  onclick="Open(\''
																		      +k+j+',' + son[k].menuName+','+ctx+'/'+son[k].action+ '\')"><span class="text-ellipsis">'
																			+ son[k].menuName
																			+ '</span></a></li>';
																		menuHtml += '</ul>';
																	}
																});
															  																	
																menuHtml += '</ul>';
															}
														});						
										$('.sidebar').append(menuHtml);
																																
				} 
			}
		});
		treeFlag=1;
		return;
	}
}
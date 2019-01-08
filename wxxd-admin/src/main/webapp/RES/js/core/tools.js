/**
 * 各种工具中转站，统一调用，持续完善中
 * 
 * @author 12110775
 * @date 2015-08-17
 * @version 1.0
 */
;(function($) {
	$.tools = $.tools || {};
	$.tools = {
		// 表单校验
		validateForm : function(element) {
			return ValidateUtil.validate(element);
		},
		// 弹出层
		dialog : function(dictate, element, params) {
			commonUtil.clearValidateBorderColor(element);
			LayerUtil.dialog(dictate, element, params);
		},
		// 提示层
		msg : function(content){
			LayerUtil.msg(content);
		},
		// 提示窗口
		alert : function(msg, iconIndex, afterFunction) {
			LayerUtil.alert(msg, iconIndex, afterFunction);
		},
		// 确认窗口
		confirm : function(text,trueFunction,falseFunction) {
			LayerUtil.confirm(text, trueFunction, falseFunction);
		},
		// 初始化flexigrid
		initFlexigrid : function(element,params,pageQueryHandler) {
			
			var height = !commonUtil.isEmpty(params['height']) ? params['height'] : 300;
			var rp = !commonUtil.isEmpty(params['rp']) ? params['rp'] : 20;
			var rpOptions = !commonUtil.isEmpty(params['rpOptions']) ? params['rpOptions'] : [20,30,50,100];
			
			var parentElement = $(element).parent();
			if(parentElement.attr("class") != "srmpLoadingDiv"){
				$(element).wrapAll('<div class="srmpLoadingDiv"></div>');
			}
			
			var gridObj = $(element).flexigrid({
				height : height,
				dataType : 'json',
				usepager : true,
				striped: true, //是否显示斑纹效果，默认是奇偶交互的形式
				showTableToggleBtn: true, 
				showToggleBtn: false,
				rp: rp, 
				rpOptions: rpOptions, 
				autoload:false,
				selfPageQueryHandler : pageQueryHandler
			});
			
			return gridObj;
		},
		// 初始化web上传组件
		initWebUploader : function(params, uploadSuccessCallBack) {
			
			// 基本信息
			var context = params['context'];
			var resContext = params['resContext'];
			var element = params['pickElement'];
			var serverUrl = params['serverUrl'];
			
			// 上传弹出层信息
			var downloadTemplateLink = params['templateLink'];
			var showCancelBtn = commonUtil.isEmpty(params['showCancelBtn']) ? false: params['showCancelBtn'];
			
			var pageUrl = context + "/common/loadWebUploaderPrompt.htm";
			commonUtil.ajaxLoadPage(pageUrl, {async : false}, "webUploaderPanel", function(){
				
				$("#uploadFileBtn").unbind("click").bind("click",function(){
					var files = uploader.getFiles();
					if(files.length <= 0){
						$.tools.alert("请选择文件!", LayerUtil.ICON.WARNING);
					} else {
						uploader.upload();
					}
				});
				
				if(showCancelBtn){
					$("#closeUploadDialogBtn").unbind("click").bind("click",function(){
						$.tools.dialog("close","#uploadFileDialog");
					});
					$("#closeUploadDialogBtn").show();
				} else {
					$("#closeUploadDialogBtn").hide();
				}
			});
			
			if(!commonUtil.isEmpty(downloadTemplateLink)){
				$("#uploader").find(".btns").append(downloadTemplateLink);
			}
			
			if(commonUtil.isEmpty(params)){
				params = {};
			}

			// 加载webuploader
			var uploader = WebUploader.create({
			    // swf文件路径
			    swf: resContext + '/js/plug-ins/webuploader/Uploader.swf',
			    // 文件接收服务端。
			    server: serverUrl,
			    // 选择文件的按钮。可选。
			    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
			    pick: element,
			    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
			    resize: false,
			    accept: params['accept'],
			    fileNumLimit : params['fileNumLimit'],
			    fileSizeLimit : params['fileSizeLimit'],
			    fileSingleSizeLimit : params['fileSingleSizeLimit'],
			    formData : params['formData']
			});
			
			// 当有文件被添加进队列的时候 
			uploader.on( 'fileQueued', function( file ) {
				
				var itemHtml = '';
				itemHtml+= '<div id="' + file.id + '" class="item">';
				itemHtml+=    '<div class="info">' + file.name + '</div>';
				itemHtml+=     '<div class="state">等待上传...</div>';
				itemHtml+=     '<div class="delete del'+file.id+'"><a href="javascript:void(0);">删除</a></div>';
				itemHtml+=     '<div class="progress progress-striped active" style="width:100%;">';
				itemHtml+=        '<div class="progress-bar" role="progressbar" style="width: 0%"></div>';
				itemHtml+=     '</div>';
				itemHtml+=  '</div>';
				
			    $("#thelist").append(itemHtml);
			    
			    $(".del"+file.id).find("a").unbind("click").bind("click", function(){
			    	removeFile(file.id);
			    });
			});
			
			// 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
			    var $li = $( '#'+file.id );
			    $li.find('div.state').css("color","blue").text('上传中');
			    $li.find(".progress-bar").css( 'width', percentage * 100 + '%' );
			});
			
			// 上传成功事件回调
			uploader.on( 'uploadSuccess', function( file, response) {
			    $( '#'+file.id ).find('div.state').css("color","green").text('已上传');
			    $( '#'+file.id ).find('div.delete').remove();
			    file.setStatus("Y","Y");
			    
			    var allFiles = uploader.getFiles();
			    var flag = true;
			    $.each(allFiles,function(i, file){
			    	if(!commonUtil.isEmpty(file.statusText) && file.statusText != 'Y'){
			    		flag = false;
			    		return;
			    	}
			    });
			    
			    if(flag && uploadSuccessCallBack && (uploadSuccessCallBack instanceof Function)){
			    	uploadSuccessCallBack(response);//回调
		        };
			});
			
			// 上传失败事件回调
			uploader.on( 'uploadError', function( file ) {
			    $( '#'+file.id ).find('div.state').css("color","red").text('上传失败');
			});
			
			// 上传完成
			uploader.on( 'uploadComplete', function( file ) {
			    $( '#'+file.id ).find('.progress').fadeOut();
			});
			
			var removeFile = function(fileId){
				uploader.removeFile(fileId,true);
				$("#"+fileId).fadeOut();
			};
			
			$(element).find("div").eq(1).css("width",$(element).outerWidth());
			$(element).find("div").eq(1).css("height",$(element).outerHeight());
			
			return uploader;
		},
		// 取消所有文件
		cancelAllFile : function(uploader){
			var files = uploader.getFiles();
			$.each(files, function(i, file){
				uploader.cancelFile(file);
			});
		},
		//校验是否全部完成
		validateFileCompleted : function(uploader){
			var msg = "";
			if(uploader.isInProgress()){
				msg = "文件正在上传中";
			}
		},
		flexGridPost : function(url, param, successCallBack, errorCallBack){
			
			var jqueryObj = $(this);
			if($(this).parent().parent().parent().attr("class") == 'srmpLoadingDiv'){
				$(this).parent().parent().parent().showLoading();
			}
			
			$.ajax({
				type : 'post',// ajax提交方式
				url : url,// 提交的url
				data : param,// 参数
				dataType : 'json',// 数据返回的形式，默认为text即文本
				cache : false,
				success : function(jsonData) {
					
					// 添加SSO单点过期判断，过期则跳转至登录页
					try {
						var ssoJson = jsonData;
						if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
							$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
								location.reload();
							});
							return false;
						}
					} catch (e){
					}
					
					if(!jsonData.flag){
						layer.msg("系统异常:" + jsonData.message);
					} else if(successCallBack && (successCallBack  instanceof Function)){
			            successCallBack(jsonData.data);//回调
			        };

			        if(jqueryObj.parent().parent().parent().attr("class") == 'srmpLoadingDiv'){
			        	jqueryObj.parent().parent().parent().hideLoading();
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					
					if(errorCallBack && (errorCallBack  instanceof Function)){
			            errorCallBack(XMLHttpRequest, textStatus, errorThrown);//回调
			        } else {
			        	layer.msg('服务器内部错误，请联系管理员！');
			        };
			        
			        if(jqueryObj.parent().parent().parent().attr("class") == 'srmpLoadingDiv'){
			        	jqueryObj.parent().parent().parent().hideLoading();
					}
				}
			});
		},
		// 多级联动
		dropboxLinkage : function(config, mode, selectValues){
			dropboxLinkageUtil.dropboxLinkage(config, mode, selectValues);
		}
	};
	$.extend($.fn, $.tools);
})(jQuery);
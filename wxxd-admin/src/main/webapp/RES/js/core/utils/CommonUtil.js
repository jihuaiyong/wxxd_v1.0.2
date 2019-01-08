/**
 * SRMP Project JS tools
 * 
 * @time 2015-08-05
 * @author 12110775
 */
CommonUtil = function(){
	
	var thisObj = this;
	
	/**
	 * 验证是否为空
	 */
	this.isEmpty = function(validateParam) {
		
		var paramVal = jQuery.trim(validateParam);
		
		if(paramVal == null || paramVal == "undefined" || paramVal == "" || paramVal.length <= 0) {
			return true;
		}
		return false;
	};
	
	this.emptyToString = function(validateParam){
		return thisObj.isEmpty(validateParam) ? "" : validateParam;
	};
	
	/**
	 * 验证是否不为空
	 */
	this.isNotEmpty = function(validateParam){
		return !thisObj.isEmpty(validateParam);
	};
	
	/**
	 * 校验Email
	 */
	this.isEmail = function(email){
		
		if(thisObj.isEmpty(email)){
			return false;
		}
		
		var emailRegex = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
		if(!emailRegex.test(email)){
			return false;
		}
		
		return true;
	};
	
	//用户名
	this.isUserName = function(str){
		if(thisObj.isEmpty(str)){
			return false;
		}
		
		//字母数字下划线，下划线不能在首尾
		var codeRegex = /^(?!_)(?!.*_$)[a-zA-z0-9_]+$/;
		if(!codeRegex.test(str)){
			return false;
		}
		return true;
	};
	
	
	// 是否为逻辑编码，一般用于一些系统编码等字段校验
	this.isLogicCode = function(str){
		if(thisObj.isEmpty(str)){
			return false;
		}
		
		//字母数字下划线，下划线不能在首尾
		var codeRegex = /^[A-Za-z0-9_]*$/;
		if(!codeRegex.test(str)){
			return false;
		}
		return true;
	};
	
	//字段
	this.isField = function(str){
		
		if(thisObj.isEmpty(str)){
			return false;
		}
		//字母开头，可包含下划线数字
		var codeRegex = /^[a-zA-Z][a-zA-z0-9_]*$/;
		if(!codeRegex.test(str)){
			return false;
		}
		return true;
	};
	
	/**
	 * 校验数字
	 */
	this.isNumeric = function(str){
		var reg = new RegExp("^[0-9]*$");
		return reg.test(str);
    };
    
    
    /**
	 * 校验正整数
	 */
	this.isPositiveInteger = function(str){
		var reg = new RegExp("^[1-9]*$");
		return reg.test(str);
    };
    
    /**
	 * 校验数字
	 */
	this.isAmount = function(str){
		var reg = new RegExp("^[+-]?[0-9]*(\.[0-9]{1,2})?$");
		return reg.test(str);
    };
    
	
	//正整数
	this.isInteger = function(str){
		var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
		return reg.test(str);
	};
	
	this.isSpecialCharacter = function(str){
		var reg = /[~@#$%^&*]/gi;
		return reg.test(str);
	};
	
	/**
	 * 获取字符串长度，空则为0
	 */
	this.getLength = function(validateParam) {
		
		var len = 0;
		var paramVal = jQuery.trim(validateParam);
		
		if(!this.isEmpty(paramVal)){
			len = paramVal.length;
		}
		
		return len;
	};
	
	/**
	 * 获取String（trim和null过滤）
	 */
	this.getStringValue = function(input){
		return thisObj.isEmpty(input) ? "" : jQuery.trim(input);
	};
	
	/**
	 * 格式化Timestamp格式数据在JqGrid中显示为 yyyy-MM-dd HH:mm:ss
	 */
	this.getTimestampFormatter = function(jqGridCellValue,isAllFormat){
		
		var date = new Date(jqGridCellValue);
		
		var month = date.getMonth() + 1;
		if(Number(month) < 10){
			month = "0" + month;
		}
		var day = date.getDate();
		if(Number(day) < 10){
			day = "0" + day;
		}
		
		var year = date.getYear();
		if(year < 1000){
			year = 1900 + date.getYear();
		}
		
		var dateStr = year + "-" + month + "-" + day;
		
		if(isAllFormat){
			var hours = date.getHours();
			if(Number(hours) < 10){
				hours = "0" + hours;
			}
			var minutes = date.getMinutes();
			if(Number(minutes) < 10){
				minutes = "0" + minutes;
			}
			var seconds = date.getSeconds();
			if(Number(seconds) < 10){
				seconds = "0" + seconds;
			}
			dateStr += " " + hours + ":" + minutes + ":" + seconds;
		}
		return dateStr;
	};
	
	/**
	 * 获取文件后缀名
	 */
	this.getFileExt = function(fileName){
		var index=fileName.lastIndexOf(".");
		var len=fileName.length;
		var ext = fileName.substring(index + 1,len);
		return ext;
	};
	
	/**
	 * 时间校验不能大于后者
	 */
	 this.validateDateTimeToNow = function(str){
		 
		if(this.isEmpty(str)){
			return false;
		}
		 
	 	var date = new Date();
		//当前日期 '年-月-日'
		var month = date.getMonth()+1;
		var currentDate = date.getFullYear() + '-' + month + '-' + date.getDate();
		return this.compareTime(str,currentDate);
	 };
	 
	/*
	 * 比较时间大小
	 */
	this.compareTime = function(inputDate,currentDate){
		
		var inputArr = inputDate.split('-');
		var inputTime = new Date(inputArr[0],inputArr[1],inputArr[2]);
		var inputTimes = inputTime.getTime();
		
		var currentArr = currentDate.split('-');
		var currentTime = new Date(currentArr[0],currentArr[1],currentArr[2]);
		var currentTimes = currentTime.getTime();
		
		if(inputTimes <= currentTimes){
			return true;
		}else{
			return false;
		}
	};
	
	// 格式化日期为yyyy-MM-dd hh:mm:ss
	this.formatTimestampForSec = function(timestamp){
		return new Date(timestamp).format('yyyy-MM-dd hh:mm:ss');
	};
	
	// 格式化日期为yyyy-MM-dd
	this.formatTimestampForDay = function(timestamp){
		return new Date(timestamp).format('yyyy-MM-dd');;
	};
	
	// 格式化日期
	this.formatCurrentTimestamp = function(formatStr){
		return new Date().format(formatStr);
	};
	
	this.setValueStyle = function(value, color){
		return "<span style='color:"+color+"'>" + value + "</span>";
	};
	
	this.arrayJoin = function(arr, str){
		var returnStr = "";
		$.each(arr, function(index,entry){
			if(index == arr.length - 1){
				returnStr += entry;
			} else {
				returnStr += entry + str;
			}
		});
		return returnStr;
	};
	
	this.toFixed = function(number,fixed){
		var num = 0.00;
		if(!thisObj.isEmpty(number)){
			num = number.toFixed(fixed);
		}
		return num;
	};
	
	/**
	 * 全选/取消全选
	 */
	this.checkAll = function(checkAllId, childCheckName){
		if($("#" + checkAllId).is(":checked")){
			 $("[name='"+childCheckName+"']:checkbox").attr("checked", true);
		} else {
			$("[name='"+childCheckName+"']:checkbox").attr("checked", false);
		}
	};
	
	/**
	 * 全选/取消全选
	 */
	this.checkAllFlexigrid = function(checkAllId, childCheckName, flag){
		if (flag){
			checkAllId = flag + "_" + checkAllId;
			childCheckName = flag + "_" + childCheckName;
		}
		var allCheckValue = $("#" + checkAllId + "Value");
		if(allCheckValue.val() == "N"){
			allCheckValue.val("Y");
		} else {
			allCheckValue.val("N");
		}
		if(allCheckValue.val() == "Y"){
			var checkboxs = $("input[name='"+childCheckName+"']:checkbox");
			$.each(checkboxs, function(index, box){
				if($(this).attr("disabled") != "disabled"){
					$(this).attr("checked", true);
				}
			});
		} else {
			$("input[name='"+childCheckName+"']:checkbox").attr("checked", false);
		}
	};
	
	/**
	 * 设置FORM表单错误信息,需要放置<div class="tip falseTipForm"></div>在页面相应位置
	 */
	this.setFormErrorMessage = function(msg){
		$(".falseTipForm").show();
		$(".falseTipForm").html("<em></em><span>"+msg+"</span>");
		//setTimeout("commonUtil.clearFormErrorMessage()",3000);
	};
	
	this.clearFormErrorMessage = function(){
		$(".falseTipForm").hide();
		$(".falseTipForm").empty();
	};
	
	this.addTd = function(e){
		return '<td>'+ e +'</td>';
	};
	
	/**
	 * Ajax load页面
	 */
	this.ajaxLoadPage = function(url, param, showId, callBack){
		
		var async = true;
		if(!commonUtil.isEmpty(param) && !commonUtil.isEmpty(param['async'])){
			async = param['async'];
		}
		
		$("#"+showId).showLoading();
		$.ajax({
			type : 'post',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'text',// 数据返回的形式，默认为text即文本
			cache : false,
			async:async,
			success : function(msg) {
				
				// 添加SSO单点过期判断，过期则跳转至登录页
				try {
					var ssoJson = eval("(" + msg + ")");
					if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
						$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
							location.reload();
						});
						return false;
					}
				} catch (e){
				}
				
				$("#"+showId).html(msg);
				if(callBack && (callBack instanceof Function)){
		            callBack();//回调
		        };
		        $("#"+showId).hideLoading();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				$("#"+showId).html("<p style='color:red'>服务器内部错误，请联系管理员！</p>");
				$("#"+showId).hideLoading();
			}
		});
	};
	
	/**
	 * Ajax post 封装
	 */
	this.ajaxPost = function(url, param, successCallBack, errorCallBack){
		
		var async = true;
		if(!commonUtil.isEmpty(param) && !commonUtil.isEmpty(param['async'])){
			async = param['async'];
		}
		
		var layerIndex = thisObj.loading();
		$.ajax({
			type : 'post',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'json',// 数据返回的形式，默认为text即文本
			cache : false,
			async:async,
			success : function(msg) {
				
				// 添加SSO单点过期判断，过期则跳转至登录页
				try {
					var ssoJson = msg;
					if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
						$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
							location.reload();
						});
						return false;
					}
				} catch (e){
				}
				
				if(successCallBack && (successCallBack  instanceof Function)){
		            successCallBack(msg);//回调
		        };
		        layer.close(layerIndex);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorCallBack && (errorCallBack  instanceof Function)){
		            errorCallBack(XMLHttpRequest, textStatus, errorThrown);//回调
		        } else {
		        	layer.msg('服务器内部错误，请联系管理员！');
		        };
		        layer.close(layerIndex);
			}
		});
	};
	
	/**
	 * Ajax getJSONP 跨域请求封装
	 */
	this.ajaxGetJsonp = function(url, param, successCallBack, errorCallBack){
		var layerIndex = thisObj.loading();
		$.ajax({
			type : 'get',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'jsonp',// 数据返回的形式，默认为text即文本
			cache : false,
			success : function(msg) {
				
				// 添加SSO单点过期判断，过期则跳转至登录页
				try {
					var ssoJson = msg;
					if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
						$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
							location.reload();
						});
						return false;
					}
				} catch (e){
				}
				
				if(successCallBack && (successCallBack  instanceof Function)){
		            successCallBack(msg);//回调
		        };
		        layer.close(layerIndex);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorCallBack && (errorCallBack  instanceof Function)){
		            errorCallBack(XMLHttpRequest, textStatus, errorThrown);//回调
		        } else {
		        	layer.msg('服务器内部错误，请联系管理员！');
		        };
		        layer.close(layerIndex);
			}
		});
	};
	
	/**
	 * Ajax postJSON 封装
	 */
	this.ajaxPostJsonp = function(url, param, successCallBack, errorCallBack){
		var layerIndex = thisObj.loading();
		$.ajax({
			type : 'post',// ajax提交方式
			url : url,// 提交的url
			data : param,// 参数
			dataType : 'json',// 数据返回的形式
			contentType : 'application/json',
			cache : false,
			success : function(msg) {
				
				// 添加SSO单点过期判断，过期则跳转至登录页
				try {
					var ssoJson = msg;
					if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
						$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
							location.reload();
						});
						return false;
					}
				} catch (e){
				}
				
				if(successCallBack && (successCallBack  instanceof Function)){
		            successCallBack(msg);//回调
		        };
		        layer.close(layerIndex);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorCallBack && (errorCallBack  instanceof Function)){
		            errorCallBack(XMLHttpRequest, textStatus, errorThrown);//回调
		        } else {
		        	layer.msg('服务器内部错误，请联系管理员！');
		        };
		        layer.close(layerIndex);
			}
		});
	};
	
	/**
	 * Ajax Submit 封装,依赖 jquery form
	 */
	this.ajaxSubmit = function(formId, successCallBack, errorCallBack){
		var layerIndex = thisObj.loading();
		$("#" + formId).ajaxSubmit({
			dataType:"json",
			type:"post",
			success: function(data){
				
				// 添加SSO单点过期判断，过期则跳转至登录页
				try {
					var ssoJson = msg;
					if(!thisObj.isEmpty(ssoJson) && ssoJson.idsIntercepted && ssoJson.status == 'UNKNOWN'){
						$.tools.alert("会话失效，请重新登录！", LayerUtil.ICON.WARNING,function(){
							location.reload();
						});
						return false;
					}
				} catch (e){
				}
				
				if(successCallBack && (successCallBack  instanceof Function)){
		            successCallBack(data);
		        }
		        layer.close(layerIndex);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(errorCallBack && (errorCallBack  instanceof Function)){
		            errorCallBack(XMLHttpRequest, textStatus, errorThrown);
		        } else {
		        	layer.msg('服务器内部错误，请联系管理员！');
		        }
		        layer.close(layerIndex);
			}
		});
	};
	
	this.loading = function(){
		return layer.load(1, {shade: [0.1,'#fff']});
	};
	
	/**
	 * 随机数生成
	 */
	this.randomKey = function(n){
		var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	    var key = "";
	    for(var i = 0; i < n ; i ++) {
	        var id = Math.ceil(Math.random()*35);
	        key += chars[id];
	    }
	    return key;
	};
	
	
	//获取元素的纵坐标 
	this.getTop = function(e){ 
		var offset=e.offsetTop; 
		var offparent = e.offsetParent;
		if(offparent!=null) {
			offset+=thisObj.getTop(e.offsetParent);
		}
		return offset; 
	};
	
	//获取元素的横坐标 
	this.getLeft = function(e){ 
		var offset=e.offsetLeft; 
		if(e.offsetParent!=null) offset+=thisObj.getLeft(e.offsetParent); 
		return offset; 
	};
	
	
	// 获取菜单编码，并选中左侧菜单
	this.selectLeftMenu = function(context,navUrl,mType,headNavCode,successCallBack){
		var url = context + "/common/showMenu.htm";
		var param = {manageUrl : context+navUrl,mType:mType,headNavCode:headNavCode};
		
		thisObj.ajaxLoadPage(url, param, "menuPanel", function(){
			if(successCallBack && (successCallBack  instanceof Function)){
	            successCallBack();//回调
	        };
		});
	};
	
	this.openLoadingDialog = function(text) {
		
		if(thisObj.isEmpty(text)){
			text = "正在跳转中...";
		}
		$("body").append("<div id='srmpLoadingDiv' title='提示'>"+text+"</div>");
		
		$("#srmpLoadingDiv").dialog({
			autoOpen: false,
			width: 200,
			height: 80,
			modal: true
		});
		
		$("#srmpLoadingDiv").dialog("open");
		$(":button").attr("disabled", true);
	};
	
	this.closeLoadingDialog = function(){
		$("#srmpLoadingDiv").dialog("close");
		$("#srmpLoadingDiv").dialog("destroy");
		$("#srmpLoadingDiv").remove();
		$(":button").removeAttr("disabled");
	};
	
	this.clearValidateBorderColor = function(element){
		$(element).find("input[validateType]").css("border-color","");
		$(element).find("select[validateType]").css("border-color","");
		$(element).find("textarea[validateType]").css("border-color","");
	};
	
	
	/**
	 * HTML转义
	 */
	this.htmlEncode = function(str) {
		var s = "";
		if (thisObj.isEmpty(str)){
			return "";
		}
		s = str.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		s = s.replace(/\n/g, "<br>");
		return s;
	};

	/**
	 * HTML转以后解码
	 */
	this.htmlDecode = function(str) {
		var s = "";
		if (thisObj.isEmpty(str)){
			return "";
		}
		s = str.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		s = s.replace(/<br>/g, "\n");
		return s;
	};
	
	this.formClear = function(form_id){
		$(form_id)[0].reset();
		var checkboxs = $(form_id).find("input[type='checkbox']");
		var selects = $(form_id).find("select");
		$.each(checkboxs, function(i, n){
			$(n).removeAttr("checked");
		});
		$.each(selects, function(i, n){
			var option = $(n).find("option:selected");
			$(option).removeAttr("selected");
		});
	};
	
	/**
	 * 布尔类型值转换是否
	 */
	this.BooleanDecode = function(e) {
		if (e == 1 || e == 'Y'){
			return "是";
		}else{
			return "否";
		}
	};
	
	/**
	 * 布尔类型值转换radio选中
	 */
	this.BooleanDecodeRadio = function(e, trueElement, falseElement) {
		if (e == 1 || e == 'Y'){
			if (!thisObj.isEmpty(trueElement)){
				$(trueElement).attr("checked", "checked");
			}
		}else{
			if (!thisObj.isEmpty(falseElement)){
				$(falseElement).attr("checked", "checked");
			}
		}
	};
	
	/**
	 * 编码值转换select选中
	 */
	this.decodeSelect = function(e, element) {
		var options = $(element).find("option");
		$.each(options, function(i, n){
			var opt_value = $(n).val();
			var opt_text = $(n).text();
			if (opt_value == e){
				$(options).removeAttr("selected");
				$(n).attr("selected", "selected");
			}
		});
	};
	
	/**
	 * select选中value赋值(单个)
	 */
	this.selectPutValue = function(selectElement, inputElement) {
		var selectOption = $(selectElement).find("option :selected");
		$(inputElement).val($(selectOption).text());
	};
	
	/**
	 * select选中value赋值(全Form)
	 */
	this.formSelectPutValue = function(formElement) {
		var selects = $(formElement).find("select");
		$.each(selects, function(i ,n){
			$(n).unbind("change").bind("change", function(){
				var select_id = $(n).attr("id");
				var input = $("#" + select_id + "Name");
				var selectOption = $(n).find("option:selected");
				$(input).val($(selectOption).html());
			});
		});
	};
	
	/**
	 * totalDataCount 数据总条数
	 * pageSize 每页数据条数
	 * pageNumber 当前页码
	 * container 容器id
	 */
	this.pageable = function(totalDataCount, pageSize, pageNumber, container){
		$(container).html("");
		var containerId = $(container).attr("id");
		//计算总页数
		var totalPage = Math.ceil(totalDataCount / pageSize);
		var disabledCss = "class=\"prev\"";
		var ableCss = "class=\"next\"";
		var prevClass = ableCss;
		var nextClass = ableCss;
		var disabled = "disabled=\"disabled\"";
		var prevDisabled = "";
		var nextDisabled = "";
		if (pageNumber == 1){
			prevClass = disabledCss;
			prevDisabled = disabled;
		}
		if (pageNumber == totalPage){
			nextClass = disabledCss;
			nextDisabled = disabled;
		}
		
		$(container).append('<input type="hidden" id="' + containerId + '_page" value="' + pageNumber + '">');
		$(container).append('<input type="hidden" id="' + containerId + '_max_page" value="' + totalPage + '">');
		$(container).append('<div>每页 <select id="' + containerId + '_page_size">'
								+ '<option value="10">10</option>'
								+ '<option value="20">20</option>'
								+ '</select> 条</div>');
		var options = $("#" + containerId + "_page_size").find("option");
		$.each(options, function(i, n){
			if ($(n).val() == pageSize){
				$(n).attr("selected", "selected");
			}
		});
		$(container).append('<span ' + prevClass + ' id="' + containerId + '_prev"' + prevDisabled + '><b></b> 上一页 </span>');
		
		var pageStart;
		if (pageNumber == totalPage){
			pageStart = pageNumber - 2;
		}else{
			pageStart = pageNumber - 1;
		}
		if (pageStart < 1){
			pageStart = 1;
		}
		var pageEnd = pageStart + 2;
		if (pageEnd > totalPage){
			pageEnd = totalPage;
		}
		if (pageStart > 1){
			$(container).append('<span class="page-split">...</span>');
		}
		for (var i = pageStart; i <= pageEnd; i++){
			var isCurrent="";
			if (i == pageNumber){
				isCurrent = 'current ';
			}else{
				isCurrent="";
			}
			$(container).append('<a class="' + isCurrent + containerId + '_curr_btn_page" href="javascript:void(0);">' + i + '</a>');
		}
		if (pageEnd < totalPage){
			$(container).append('<span class="page-split">...</span>');
		}
		$(container).append('<span ' + nextClass + ' id="' + containerId + '_next"' + nextDisabled + '><b></b> 下一页 </span>');
		$(container).append('<div>向第<input type="text" id="' + containerId + '_skip_page" />页<input type="button" class="pagesubmit" id="'+ containerId +'_skip" value="跳转" /></div>');
	
		if (totalDataCount <= pageSize){
			$(container).hide();
		}else{
			$(container).show();
		}
		
	};
	
	/**
	 * 分页按钮绑定
	 */
	this.pageBtnBind = function(query, pageSize, container){
		if(!query && !(query  instanceof Function)){
			return false;
        };
		var containerId = $(container).attr("id");
		var currPage = parseInt($('#' + containerId + '_page').val());
		var totalPage = parseInt($('#' + containerId + '_max_page').val());
		//上一页按钮绑定
		$('#' + containerId + '_prev').unbind("click").bind("click", function(){
			var nextPage = currPage - 1;
			if (nextPage >= 1){
				query(nextPage, pageSize);
			}
		});
		//普通页码绑定
		var generalPageBtns = $('.' + containerId + '_curr_btn_page');
		$.each(generalPageBtns, function(i, n){
			$(n).unbind("click").bind("click", function(){
				var p = $(this).html();
				if (currPage != p){
					query(p, pageSize);
				}
			});
		});
		//下一页按钮绑定
		$('#' + containerId + '_next').unbind("click").bind("click", function(){
			var nextPage = currPage + 1;
			if (nextPage <= totalPage){
				query(nextPage, pageSize);
			}
		});
		//跳转按钮绑定
		$('#' + containerId + '_skip').unbind("click").bind("click", function(){
			var skipPage = $('#' + containerId + '_skip_page').val();
			if (thisObj.isEmpty(skipPage) || !thisObj.isNumeric(skipPage)){
				$.tools.msg("请输入有效页码");
				return false;
			}
			if (skipPage > totalPage){
				query(totalPage, pageSize);
			}else if (skipPage != currPage){
				query(skipPage, pageSize);
			}
		});
		//每页数据量绑定
		$('#' + containerId + '_page_size').unbind("change").bind("change", function(){
			var pageSizeOpt = $('#' + containerId + '_page_size').find("option:selected").val();
			query(1, pageSizeOpt);
		});
	};
	
	// ----------------------------权限控制模块JS-----------------------------
	/**
	 * 校验按钮权限是否通过，并且显示标签包含的值
	 */
	this.pageElementFilter20130827009 = function(_context,_funCode){
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					$("#iop_" + _funCode).show();
				} else {
					$("#iop_" + _funCode).remove();
				}
			}, error:function(data) {
				$("#iop_" + _funCode).remove();
			}
		});
	};
	
	/**
	 * 校验按钮权限是否通过
	 */
	this.isAuthValidatePass =  function(_context,_funCode){
		var flag = false;
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					flag = true;
				}
			}, error:function(data) {
			}
		});
		return flag;
	};
	
	/**
	 * 校验按钮权限是否通过，并且显示对应的INPUT值
	 */
	this.pageElementFilter2013575698768 = function(_context,_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut){
		$.ajax({
			url: _context + '/auth/pageElementFilter.htm',
			type:'POST',
			data:{funCode: _funCode},
			async:false,
			success:function(data){
				if(data != '' && data == 'true'){
					eleShow20136786896(_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut);
				}
			}, error:function(data) {
				alert('页面元素权限控制获取失败');
			}
		});
	};
	this.eleShow20136786896 = function(_id,_name,_funCode,_value,_type, _onClick, _onBlur, _onFocus, _onMouseOver, _onMouseOut){
		var _html = "<input type=\"" +_type + "\" id=\""+_id+"\" name=\""+_name+"\" value=\""+ _value
			+"\" onClick=\"" + _onClick+"\" onBlur=\"" + _onBlur+"\"  onFocus=\""+_onFocus+"\"  onMouseOver=\""+_onMouseOver+"\" onMouseOut=\""+_onMouseOut+"\" />";
		var eleHtml = $(_html);
		$('#' + _id+'_pageEleAuth_span').html(eleHtml);
	};
};

var commonUtil = new CommonUtil();

$(function(){
	$(".midstick").unbind("click").bind("click", function(){
		var box = $("#detail_tab");
		if(box.is(":hidden")){
	        $(this).removeClass("midon");
	        box.removeClass("hide");
	    }else{
	        $(this).addClass("midon");
	        box.addClass("hide");
	    }
	});
});

// 给数据添加判断元素是否存在于数组中的方法
Array.prototype.S = String.fromCharCode(2);  
Array.prototype.in_array = function(e) {  
    var r = new RegExp(this.S+e+this.S);  
    return (r.test(this.S+this.join(this.S)+this.S));  
}; 
Array.prototype.del=function(index){
   if(isNaN(index)||index>this.length){return false;}
   this.splice(index,1);
};

// date format extend
Date.prototype.format =function(format){
	var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(), //day
		"h+" : this.getHours(), //hour
		"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter
		"S" : this.getMilliseconds() //millisecond
	};
	if(/(y+)/.test(format)) format=format.replace(RegExp.$1, (this.getFullYear()+"").substr(4- RegExp.$1.length));
	for(var k in o)if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,
	RegExp.$1.length==1? o[k] :
	("00"+ o[k]).substr((""+ o[k]).length));
	return format;
};

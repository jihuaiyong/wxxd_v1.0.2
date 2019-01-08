
/**
 * 李禹：获取文件大小
 */ 
function getFileSize(target) { 
	//IE8 需要开启安全控件
	var isIE = /msie/i.test(navigator.userAgent) && !window.opera; 
 	var fileSize = 0;        
    if(isIE && !target.files){
    	try{
	      var filePath = target.value;    
	      var fileSystem = new ActiveXObject("Scripting.FileSystemObject");       
	      var file = fileSystem.GetFile (filePath);    
	      fileSize = file.Size; 
    	}catch(error){
    		var tip = "工具-Internet选项-安全选项卡：\n" +
    				"勾选自定义级别，再点击自定义级别按钮\n" +
    				"ActiveX 控件和插件\n对未标记为可安全执行脚本的ActiveX控件初始化并执行脚本\n勾选启用";
    		$.messager.alert('提示', '如果您正在使用IE浏览器,请开启ActiveX控件\n'+tip,'warning');
    		return -1;
    	}
    }else{   
    	fileSize = target.files[0].size;    
    } 
	return fileSize;
}  

/**
 * 李禹：文件名后缀是否匹配 
 */ 
function isSuffixMatxh(fileName,fileExt){
	var suffix = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();
	var fileExtArr = fileExt.split(";");
	var extResult = false;
	for(var i=0;i<fileExtArr.length;i++){
		if(suffix==fileExtArr[i]){
			extResult = true;
			break;
		}
	}
	if(!extResult){
		return false;
	}
	return true;
}

/**
 * 李禹：文件大小是否符合要求
 */ 
function isMaxSizeMatch(fileObj,maxSize){
	var fileSize = getFileSize(fileObj);
	if(fileSize==-1){
		return false;
	}
	if(fileSize>(maxSize*1024)){
		$.messager.alert('提示', '文件大小超过'+maxSize+'KB，请重新选择','warning');
		return false;
	}
	return true;
}

/**
 * 李禹：根据商品Code获取B2C图片地址
 */
function getProImgUrlFromCode(code,type){
	var imgServer = "";
	imgServer += ("000000000" + code.substring(0,5) + "/000000000" + code + "/000000000" + code + "_" + type);
	return imgServer;
}

/**
 * 李禹：校验商品编码：9为非负整数构成
 */
function isRightProCode(code){
	if(code==undefined || code==""){
		return false;
	}
	return /^[0-9]{9}$/.test(code);
}

/**
 * 李禹：检查字符长度是否符合要求
 * 		符合返回true，不符合返回false
 */
function isMatchLength(textObj,length){
	if(textObj.value=="" || textObj.value==undefined) return true;
	var tempLen = parseInt((length*2)/3);
	if(textObj.value.bitlen()>length){
		textObj.value = textObj.value.substring(0,parseInt(tempLen/2));
		return false;
	}
	return true;
}

/**
 * 李禹：通用的字符长度不合法提示
 */
function checkLength(textObj,length){
	if(!isMatchLength(textObj,length)){
		var tempLen = parseInt((length*2)/3);
		textObj.value = textObj.value.substring(0,parseInt(tempLen/2));
		$.messager.alert('提示','您输入的文本长度超过'+tempLen+'个字符，系统将自动截取','warning');
	}
}
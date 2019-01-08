javascript:window.history.forward(1);

var layerIndex = 0;
function goback_apply() {
	window.close();
}
function goback_approve() {
	window.close();
}
function goback_reader() {
	window.close();
}

function submit_apply() {
	
	var verify=dataVerify();
	if(verify==false)
	return false;
	
	//附件验证，异步，如需检查附件不能为空可在页面加上该方法，调用公用的fileExist方法
	var fileValidated = true;
	if(this.fileSizeValidate != undefined){
		fileValidated = fileSizeValidate();//公用fileExist方法里会有businessValidate异步处理
	}
	if(fileValidated){//返回true，表示无附件验证，businessValidate在此处调用
		var validated = 0;
		if(this.businessValidate!=undefined){
		   validated = businessValidate();
		}
		
		if(validated!=1){
		  openSubmitWindow();
		}
	}
}

function openSubmitWindow(){
   
	var f = document.forms[0];
	var title = "";
	for (var i=0; i < f.elements.length; i++){
		e = f.elements[i];
		if ((e.id != null && e.id != "" && e.id.indexOf("title") != -1)||(e.name != null && e.name != "" && e.name.indexOf("title") != -1)){
			title = e.value;
			break;
		}
	}
	document.getElementsByName("biz_businessTitle")[0].value = title;

	var openUrl="processCommonSubmit.do?" +
				"processId="+document.getElementsByName("biz_processId")[0].value +
				"&businessTemplateId="+document.getElementsByName("biz_businessTemplateId")[0].value +
				"&businessCode="+document.getElementsByName("biz_businessCode")[0].value + 
				"&tkiid="+document.getElementsByName("biz_tkiid")[0].value + 
				"&title="+title + 
				"&drafterId="+document.getElementsByName("biz_drafterId")[0].value +
				"&draftDept="+document.getElementsByName("biz_draftDept")[0].value +
				"&date="+new Date()+"&Rnd="+ Math.random();
	
	openUrl = url_addVar(openUrl);
	layerIndex = layer.open({
		  type: 2,
		  skin: 'layui-layer-rim',
		  title: '流程处理',
		  shadeClose: true,
		  shade: 0.8,
		  area: ['580px', '500px'],
		  content: openUrl
	});
}

function url_addVar(openurl){

	var $formHidden = $("form").eq(0).find("input[type='hidden']");
	if($formHidden){
		$.each($formHidden, function(){
			if (!commonUtil.isEmpty($(this).attr("name")) && $(this).attr("name").substr(0,3)=="var"){
				openurl+=("&"+$(this).attr("name")+"="+$(this).val());
			}
		});
	}
	
	return openurl;
}

function url_addVarAll(openUrl){

	var elen=document.forms[0].elements.length;
	
	for (var i=0;i<elen;i++){
		e=document.forms[0].elements[i];
		if (e.type=="hidden"){
			if (e.name.substr(0,3)=="var" || e.name.substr(0,4)=="biz_"){
				openUrl+=("&"+e.name+"="+e.value);
			}
		}
	}
	return openUrl;
}

//approve submit
function submit_approve() {

	/*var verify=dataVerify();
	if(verify==false)
	return false;*/
	
	var validated = 0;
	if(this.businessValidate!=undefined){
	   validated = businessValidate();
	}
	
	var openUrl="processCommonSubmit.do?tkiid="+document.getElementsByName("biz_tkiid")[0].value +
				"&processId="+document.getElementsByName("biz_processId")[0].value +
				"&businessTemplateId="+document.getElementsByName("biz_businessTemplateId")[0].value + 
				"&commentContent="+document.getElementsByName("biz_commentContent")[0].value +
 				"&drafterId="+document.getElementsByName("biz_drafterId")[0].value +
				"&draftDept="+document.getElementsByName("biz_draftDept")[0].value +
				"&date="+new Date()+"&Rnd="+ Math.random();
	openUrl = url_addVar(openUrl);

	//var width = window.screen.width * 0.6;
	//var height = window.screen.height * 0.6;
	layerIndex = layer.open({
	  type: 2,
	  title: '流程处理',
	  shadeClose: true,
	  shade: 0.8,
	  area: ['580px', '500px'],
	  content: openUrl
	});
}

//save the form
function save_form() {
	try{
	   var flag =  beforeSave();  //you can rewrite this method before save
	   if(!flag)
	   {
	   		return;
	   }
	}catch(err){
	}
    document.forms[0].biz_save.value="true";
    
	var f = document.forms[0];
	var title = "";
	for (var i=0; i < f.elements.length; i++){
		e = f.elements[i];
		if (e.id != null && e.id != "" && e.id.indexOf("title") != -1){
			title = e.value;
			break;
		}
	}
	document.getElementsByName("biz_businessTitle")[0].value = title;
    
    var elen=document.forms[0].elements.length;
    var paramStr = "";
	for (var i=0;i<elen;i++){
		e=document.forms[0].elements[i];
		if (e.type=="hidden"){
			if (e.name.substr(0,3)=="var"){
				paramStr+=e.name+"="+e.value+"/";
			}
			if (e.name.substr(0,4)=="biz_"){
				paramStr+=e.name+"="+e.value+"/";
			}
		}
	}
	paramStr=paramStr.substr(0, paramStr.length-1);
	document.getElementsByName("paramStr")[0].value=paramStr;
    document.forms[0].submit();
}


function trace_form() {
	var url = "processCommonTrace.do?processId=" + document.forms[0].biz_processId.value;
	window.open(url);
}

//advisable
function advise_form() {
	
	var width=(window.screen.width);
	var height=(window.screen.height);
	
	var title = document.getElementsByName("biz_businessTitle")[0].value;
	var tkiid = document.getElementsByName("biz_tkiid")[0].value;
	var url = "adviseDispatch.do?title=" + title + "&tkiid=" + tkiid;
    //编码一下，防止中文乱码，java后台要做相应转换
    url = encodeURI(encodeURI(url));
    window.open(url);
}

//取消申请
function cancelForm() {
	layer.confirm('您确定取消申请？', {
		  btn: ['确认','关闭'] //按钮
		}, function(){
			var openUrl="processTerminate.do?processId="+document.forms[0].biz_processId.value+"&processCode="+document.forms[0].biz_businessCode.value;
			openUrl = url_addVar(openUrl);
			window.location.href = openUrl;
		}, function(){});
}

function closeDialog(){
	layer.close(layerIndex);
}
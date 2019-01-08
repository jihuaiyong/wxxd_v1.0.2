var checkfalg=0;
function check(){
    checkfalg = 0;
    var cmmdtyCode = $("#cmmdtyCode").val();
    var feePrice = $("#feePrice").val();
    if (cmmdtyCode=="" && feePrice==""){
        alert("至少输入一个参数！");
        return;
    }
    checkfalg=1;     
}
//根据条件查询
function querySubmit(){
    check();
    if(checkfalg==0) {
        return;
    }
    var cform = $("#conditionForm");
    var url = "pptvPriceImport.action";
    cform.attr("action",url);
    cform.submit();
}
//查询所有
function queryAll(){
	var cform = $("#conditionForm");
    var url = "pptvAllPrice.action";
    cform.attr("action",url);
    cform.submit();
}
//刷新缓存
function refRedis(){
	var cform = $("#conditionForm");
    var url = "refPptvRedis.action";
    cform.attr("action",url);
    cform.submit();
}

function closeWin(c)
{
	$("#"+c).hide();
}

function openWin(c){
	var obj = $("#"+c);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
}

function changeCmmdtyModel(){
    var cmmdtyCode = $("#cmmdtyCode").val();
    if ( cmmdtyCode.length < 18 && cmmdtyCode.length != 0){
			for(var i = cmmdtyCode.length; i < 18; i++){
			    cmmdtyCode = "0" + cmmdtyCode;
			}
 	        $("#cmmdtyCode").val(cmmdtyCode);
        }
}


function fileUpload(){
	var filePath=$("#file").val();
	var index=filePath.indexOf(".");
	var str=filePath.substring(index+1,filePath.length);
	if(str!='txt'&&str!='csv'&&str!='xls'&&str!='xlsx'){
		alert('请上传txt,csv,xls,xlsx文件!');
		return;
	}
	$("#fileUploadForm").submit();
}  
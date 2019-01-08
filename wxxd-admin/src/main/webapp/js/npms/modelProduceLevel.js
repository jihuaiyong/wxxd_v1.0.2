/**
 * 页面加载后初始化数据调用的js
 */
$(function() {
		$('#wrap .item-search .zg-inpMany.code-goods').inpMany({
			placeholder : '请输入编码\n不同编码换行输入',
			tips:'必填(最多支持20条)'
		});  
	})

// 查询参数设置
function getQueryParams(pageNumber) {
	//changeCmmdtyModelWithSplit(",");
	//var brandCode = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	if (changeCmmdtyModelWithSplit(",") == false) {
	    return;
	}
	var cmmdtyCodes = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	var cmmdtyCodeArray = new Array();
	if(cmmdtyCodes){
		cmmdtyCodeArray = cmmdtyCodes.split(",");
	}
	var brandCode ="";
	var cas = "";
	for (var i = 0; i < cmmdtyCodeArray.length; i++) {
		cas ="'"+ cmmdtyCodeArray[i].trim() +"'";
		if (cas.length != 0) {
			if(brandCode != ""){
				brandCode = brandCode+","+cas;
			}else{
				brandCode = cas;
			}
		}
	}
	
	var queryParams = {
		'brandCode' : brandCode,
		'pageSize' : pageSize,
		'page' : pageNumber + 1
	};
	return queryParams;
};



// 商品编码查询条件字符串分割并丢弃空元素
function changeCmmdtyModelWithSplit(SPLIT) {
	var cmmdtyCodes = $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
	var cmmdtyCodeArray = new Array();
	if(cmmdtyCodes){
		cmmdtyCodeArray = cmmdtyCodes.split(SPLIT);
	}
	var brandCode = "";
	var arrayObj = new Array();
	for (var i = 0; i < cmmdtyCodeArray.length; i++) {
		brandCode =cmmdtyCodeArray[i].trim() ;
		if (brandCode.length != 0) {
			arrayObj.push(brandCode);
		}
	}
	if (arrayObj.length > 20) {
		$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val();
		bootbox.alert({
			buttons : {
				ok : {
					label : '确定',
					className : 'btn-sm btn-primary'
				}
			},
			message : '查询条目大于20! 当前为'+ arrayObj.length +'条'
		});
		return false;
	}
	$('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').html(arrayObj.toString());
}
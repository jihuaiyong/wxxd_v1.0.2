/*判断开始时间与结束时间的间隔是否大于多少天
 * endDate：开始时间
 * beginDate：结束时间
 * num：大于的天数
 *
 */
function DateDiff(endDate, beginDate, num) {
	if (beginDate == "" || endDate == "") {
		return true;
	}
	var aDate, oDate1, oDate2, iDays;
	//endDate.substring(0,3);
	//aDate = endDate.split("-");
	oDate1 = new Date(endDate.substring(0,4) + '/' + endDate.substring(5,7) + '/' + endDate.substring(8,10)); // 转换为月-日-年格式
	//aDate = beginDate.split("-");
	//oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
	oDate2 = new Date(beginDate.substring(0,4) + '/' + beginDate.substring(5,7) + '/' + beginDate.substring(8,10));
	iDays = parseInt( (oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
	if ( iDays<0 || iDays > num) {
		//alert('日期输入不合法');
		return false;
	} else {
		return true;
	}
}
function checkDate(beginDate, endDate) {
	if (DateDiff(endDate, beginDate, 31)) {
		return true;
	}
}
function DateDiffTo14(endDate, beginDate, num) {
	if (beginDate == "" || endDate == "") {
		return true;
	}
	var aDate, oDate1, oDate2, iDays;
	aDate = endDate.split("-");
	oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); // 转换为月-日-年格式
	aDate = beginDate.split("-");
	oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); // 转换为月-日-年格式
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒数转换为天数
	//alert("相差"+iDays);
	var check = oDate1  < oDate2;
	if( check ){
		alert('输入日期错误，结束日期不能小于开始日期');
		return false;
	}
	
	if (iDays > (num - 1)) {
		alert('查询最大日期间隔不得超过14天');
		return false;
	} 
	return true;
}
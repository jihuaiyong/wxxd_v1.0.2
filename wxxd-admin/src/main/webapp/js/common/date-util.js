/**
 * 获取当前日期和时间
 * @returns {String}
 */
function getCurrDate(){
	var mydate = new Date();
	return formatDate(mydate);
}

function formatDate(mydate){
	var year = mydate.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = mydate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	if(month < 10){
		month = "0" + month;
	}
	var day = mydate.getDate(); //获取当前日(1-31)
	if(day < 10){
		day = "0" + day;
	}
	var hour = mydate.getHours(); //获取当前小时数(0-23)
	if(hour < 10){
		hour = "0" + hour;
	}
	var minute = mydate.getMinutes(); //获取当前分钟数(0-59)
	if(minute < 10){
		minute = "0" + minute;
	}
	var second = mydate.getSeconds(); //获取当前秒数(0-59)
	if(second < 10){
		second = "0" + second;
	}
	var dateValue = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
	return dateValue;
}

//时间戳转化为date
function parseTime(timestamp) {
    var date = new Date(parseInt(timestamp));
    date = formatDate(date);
    return date;
}

//将一个字符串转化为时间
//str = 2017/4/3 12:00 AM
function parseTimeString(str){
	
	var strsplit = str.split(" ");
	var datesp = strsplit[0].split("/");
	var year = parseInt(datesp[0]);
	var mouth = parseInt(datesp[1])-1;
	var day = parseInt(datesp[2]);
	
	var timesp = strsplit[1].split(":");
	var hour= parseInt(timesp[0]);
	var minute= parseInt(timesp[1]);
	var M = strsplit[2];
	if("AM"==M){
		hour = (hour==12)?0:timesp[0];
	}
	if("PM"==M){
		hour = hour+12;
	}
	var datetime = new Date(year,mouth,day,hour,minute,0);
	
	return datetime;
}
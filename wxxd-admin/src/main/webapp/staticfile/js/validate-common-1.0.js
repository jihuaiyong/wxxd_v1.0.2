/** 
* @fileOverview 公共方法 
* @author 
* @version 0.1 
*/ 

/** 
* @description 字符串是否全为字母(a-z A-Z) <br> 例： if(new String("abc").isfullChar())
* @return 全为字母返回true 否则返回false
*/ 
String.prototype.isfullChar = function() {
	var reg = /^[A-Za-z]+$/;
	return reg.test(this);
}

/** 
* @description 字符串是否全由数字组成(0-9)<br> 例： if(new String("123").isNumber())
* @return 全为数字组成返回true 否则返回false
*/
String.prototype.isNumber = function() {
	var reg = /^[0-9]+$/;
	return reg.test(this);
}

/** 
*@description 字符串是否由数字或字母组成(0-9 a-z A-Z)<br> 例： if(new String("w123").isNumAndChar())
* @return 由数字或字母组成返回true 否则返回false
*/ 
String.prototype.isNumAndChar = function() {
	var reg = /^[A-Za-z0-9]+$/;
	return reg.test(this);
}
String.prototype.isNAndC = function() {
	var reg = /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i;
	return reg.test(this);
}


/** 
* @description  字符串是否全部中文 <br> 例： if(new String("你好").isfullCN())
* @return 全部中文返回true 否则返回false
*/ 
String.prototype.isfullCN = function() {
	var reg = /^[^u4e00-u9fa5]+$/;
	return reg.test(this);
}
/** 
* @description 字符串是否为数量格式 <br> 例： if(new String("0.1").isAmmount())
* @return 字符串为数量格式返回true 否则返回false
*/ 
String.prototype.isAmmount =function(){
	var reg = /^[0-9]*\.{0,}\d{0,6}$/;
	return reg.test(this);
}
/** 
* @description 字符串是否url格式 <br> 例： if(new String("http://www.cnsuning.com").isWeb())
* @return 字符串为url格式返回true 否则返回false
*/ 
String.prototype.isWeb =function(){
	return(new RegExp(/^((https|http|ftp|rtsp|mms)?:\/\/)|(www+\.)+([A-Za-z0-9]|[\-]|[\——])+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/).test(this));
}
/** 
* @description 字符串是否带有攻击字符 <br> 例： if(new String("&lt;script&gt;").isXXS()){alert("输入不能包含网页攻击字符");}
* @return 字符串带有攻击字符返回true 否则返回false
*/ 
String.prototype.isXXS =function(){
	var regStr = new RegExp("[<>\"'=]");
	return regStr.test(this);
}

/** 
* @description 字符串是否带有特殊字符 <br> 例： if(new String("%%￥￥##").strSpecial()){alert("输入不能包含特殊字符");}
* @return 字符串带有特殊字符返回true 否则返回false
*/ 
String.prototype.strSpecial =function(){
	var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]"); 
	return pattern.test(this); 
} 

/** 
* @description 字符串是否是合法email <br> 例： if(new String("123.123.123").isMail()){alert("输入邮箱不合法");}
* @return 合法返回true 否则返回false
*/ 
String.prototype.isMail =function(){
	return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this)); 
}

/** 
* @description 字符串是否是合法身份证号码 <br> 例： if(new String("111").isIdCardNo()){alert("输入身份证号不合法");}
* @return 合法返回true 否则返回false
*/ 
String.prototype.isIdCardNo =function(){
      num = num.toUpperCase();  
     //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
      if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this)))   
      { 
          return false; 
      } 
      return true;
}
/** 
* @description 检查输入字符串是否符合国内固话或者传真格式 <br>  格式例如：020-87110252  <br> 例： if(new String("111").isTel()){alert("请输入正确电话号码");}
* 
* @return 合法返回true 否则返回false
*/ 
String.prototype.isTel =function(){
	  var reg=/^(0\d{2,3})?(-)?(\d{7,8})(-(\d{3,}))?$/; 
	  if(!reg.test(this))
	   return   false;
	  return   true;
	} 

/** 
* @description 判断字符串是否为空<br> 例： if(new String(str).isNull())
* @return 为空返回true 否则返回false
*/ 
String.prototype.isNull =function(){
	if(this.length == 0){
		return true;
	}
	if(strTrim(this).length>0)
	{
		return false;
	}
	return true;
}

/** 
* @description 判断变量是否为undefined类型
* @param 变量
* @return undefined类型返回true 否则返回false
*/ 
function isUndefined(revalue){
	if(typeof(revalue) == "undefined"){
		return true;
	}
	return false;
}



/** 
* @description 去除字符串两端空格<br> 例： new String(" abc ").trim()
* @return 去除两端空格后的字符串
*/  
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}

/** 
* @description 去除字符串中所有空格<br> 例： new String(" ab c ").trimAll()
* @return 去除所有空格后的字符串
*/   
String.prototype.trimAll = function() {
	return this.replace(/\s+/g, "");
}

/** 
* @description 去除字符串左端空格<br> 例： new String(" abc").trimLeft()
* @return 去除左端空格后的字符串
*/  
String.prototype.trimLeft = function() {
	return this.replace(/^\s*/, '');
}

/** 
* @description 去除字符串右端空格<br> 例： new String("abc ").trimRight()
* @return 去除右端空格后的字符串
*/
String.prototype.trimRight = function() {
	return this.replace(/(\s*$)/g, "");
}

/** 
* @description  计算字符所占二进制位长度<br>DB2 varchar型,一个字符占 3 个二进制位;Oracle varchar型,一个字符占 2 个二进制位;
* <br> 例： new String("你好").bitlen();
* @return 返回二进制长度
*/ 
String.prototype.bitlen = function() {
	var len = 0;
	for ( var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
			len += 3; // 0~z:48~122
		else
			len++;
	}
	return len;
}


/** 
* @description 根据cookie的key获得cookie的value
* @param key
* @return value 
*/ 
function getCookie(key){
	var str = document.cookie;
	if(!str || str.indexOf(name+"=")<0){
		return;
	}
	var cookies = str.split(";");
	for(var i=0;i<cookies.length;i++){
		var cookie = cookies[i].trim();
		if(cookie.indexOf(name+"=")==0){
			var value = cookie.substring(name.length +1);
			return decodeURI(value);

		}
	}
}

/** 
* @description  返回浏览器类型:<br>IE<br>Firefox<br>Mozilla<br>Opera<br>Unknown
* @return 浏览器类型
*/
function checkBrowser(){
    var cb = "Unknown";
    if(window.ActiveXObject){
        cb = "IE";
    }else if(navigator.userAgent.toLowerCase().indexOf("firefox") != -1){
        cb = "Firefox";
    }else if((typeof document.implementation != "undefined") && (typeof document.implementation.createDocument != "undefined") && (typeof HTMLDocument != "undefined")){
        cb = "Mozilla";
    }else if(navigator.userAgent.toLowerCase().indexOf("opera") != -1){
        cb = "Opera";
    }
    return cb;
}



/** 
* @description 获得当前日期<br> 例：2013-04-05
* @return 当前日期
*/ 
function getNowTime() {
	// 取得当前时间
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var day = now.getDate();
	// var hour=now.getHours();
	// var minute=now.getMinutes();
	// var second=now.getSeconds();
	var nowdate = year + "-" + month + "-" + day;// +";//
													// "+hour+":"+minute+":"+second;
	return nowdate;
}
/** 
* @description 判断开始时间是否小于结束时间
* @param  开始时间
* @param  结束时间
* @return 开始时间小于结束时间返回true，否则返回false
*/ 
function dateCompare(startdate, enddate) {
	var arr = startdate.split("-");
	var starttime = new Date(arr[0], arr[1], arr[2]);
	var starttimes = starttime.getTime();

	var arrs = enddate.split("-");
	var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	var lktimes = lktime.getTime();

	if (starttimes > lktimes) {
		return false;
	} else {
		return true;
	}
}

/** 
* @description 判断开始时间是否小于结束时间
* @param  开始时间
* @param  结束时间
* @return 开始时间小于结束时间返回true，否则返回false
*/ 
function dateCompareequ(startdate, enddate) {
	var arr = startdate.split("-");
	var starttime = new Date(arr[0], arr[1], arr[2]);
	var starttimes = starttime.getTime();

	var arrs = enddate.split("-");
	var lktime = new Date(arrs[0], arrs[1], arrs[2]);
	var lktimes = lktime.getTime();

	if (starttimes >= lktimes) {
		return true;
	} else {
		return false;
	}
}
/** 
* @description 禁止时间选择框键盘输入
* @param 页面控件
*/ 
function noPermitInput(e){     
       var evt = window.event || e ;   
        if(isIE()){   
            evt.returnValue=false; //ie 禁止键盘输入   
        }else{   
            evt.preventDefault(); //fire fox 禁止键盘输入   
        }      
}  

/** 
* @description 限定输入框最大字符长度 <br>例：<br>&lt;textarea id="briefIntroduction" name="briefIntroduction" class="uiArea"&gt;&lt;/textarea&gt;
                           		<br>&lt;span id="num"&gt;0&lt;/span&gt;&lt;span&gt;/300&lt;/span&gt;
                           		<br>&lt;script&gt;txtCount("#briefIntroduction","#num",300);&lt;/script&gt;
* @param 输入框控件id
* @param span控件id
* @param 最大数
*/ 
function txtCount(txt,num,count){
	$(txt).keyup(function(){
		var l = $(this).val().length;
		if(l>=count){
			var str = $(this).val().substr(0,count);
			$(this).val(str);
			$(num).html(count);
		}else{
			$(num).html(l);		
		}
	});
}

/** 
* @description 对字符串进行html编码
* @param 待编码内容
* @return 编码后内容 
*/ 
function html_encode(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/&/g, "&amp;");
	s = s.replace(/</g, "&lt;");
	s = s.replace(/>/g, "&gt;");
	s = s.replace(/\'/g, "&#39;");
	s = s.replace(/\"/g, "&quot;");
	return s;
}
/** 
* @description  对字符串进行html十六进制编码
* @param 待编码内容
* @return 编码后内容 
*/ 
function charESC(str) {
	var s = "";
	if (str.length == 0)
		return "";
	s = str.replace(/=/g, "&#x3D;");
	s = s.replace(/</g, "&#x3C;");
	s = s.replace(/>/g, "&#x3E;");
	s = s.replace(/\'/g, "#x27;");
	s = s.replace(/\"/g, "#x22;");
	return s;
}

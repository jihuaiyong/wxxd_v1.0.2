//字符串是否全为字母
String.prototype.isfullChar = function() {
	var reg = /^[A-Za-z]+$/;
	return reg.test(this);
};

// 字符串是否由字母和数字组成
String.prototype.isNumAndChar = function() {
	var reg = /^[A-Za-z0-9]+$/;
	return reg.test(this);
};

// 字符串是否包含中文
String.prototype.isfullCN = function() {
	var reg = /^[u4e00-u9fa5]/;
	return reg.test(this);
};

// 去掉字符串两端空格
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
};

// 去除所有空格
String.prototype.trimAll = function() {
	return this.replace(/\s+/g, "");
};

// 去除左边空格
String.prototype.trimLeft = function() {
	return this.replace(/^\s*/, '');
};

// 去除右边空格
String.prototype.trimLeft = function() {
	return this.replace(/(\s*$)/g, "");
};

// 计算字符所占二进制位长度
// DB2 varchar型,一个字符占 3 个二进制位;Oracle varchar型,一个字符占 2 个二进制位;
String.prototype.bitlen = function() {
	var len = 0;
	for ( var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
			len += 3; // 0~z:48~122
		else
			len++;
	}
	return len;
};

function showLayerWindow(titleName, width, height, location) {

	var layer1 = parent.document.getElementById("layer1");
	var layer2 = parent.document.getElementById("layer2");
	var layer2Frame = parent.document.getElementById("topWindow");

	// 设置窗口标题
	parent.document.getElementById("layerTitleName").innerHTML = titleName;
	layer1.style.display = "block";
	layer1.style.width = parent.document.body.clientWidth + "px";
	layer1.style.height = parent.document.body.clientHeight + "px";

	// 设置窗口大小
	layer2.style.display = 'block';
	layer2.style.width = width + "px";
	layer2.style.height = height + "px";
	var widthLen = 0;
	var heightLen = 0;
	if (parent.document.body.offsetHeight) {
		widthLen = parent.document.body.offsetWidth;
		heightLen = parent.document.body.offsetHeight;
	}
	if (parent.document.body.scrollHeight) {
		widthLen = parent.document.body.scrollWidth;
		heightLen = parent.document.body.scrollHeight;
	}
	layer2.style.left = (widthLen - width) / 2 + "px";
	layer2.style.top = (heightLen - height) / 2 + "px";

	layer2Frame.style.width = (width - 10) + "px";
	layer2Frame.style.height = (height - 40) + "px";

	if (-1 == location.indexOf("?")) {
		layer2Frame.src = location + "?cache=" + Math.random();
	} else {
		layer2Frame.src = location + "&cache=" + Math.random();
	}

}

function layerClose() {
	parent.frames.document.getElementById("layer1").style.display = "none";
	parent.frames.document.getElementById("layer2").style.display = "none";
	parent.frames.document.getElementById("topWindow").src = "";
}

/**
 * 功能：窗口移动效果 李雄杰
 */
var drag_ = false;
var D = new Function('obj', 'return document.getElementById(obj);');
var oevent = new Function('e', 'if (!e) e = window.event;return e');
function Move_obj(obj) {
	var x, y;
	D(obj).onmousedown = function(e) {
		drag_ = true;
		with (this) {
			style.position = "absolute";
			var temp1 = offsetLeft;
			var temp2 = offsetTop;
			x = oevent(e).clientX;
			y = oevent(e).clientY;
			document.onmousemove = function(e) {
				if (!drag_)
					return false;
				with (this) {
					style.left = temp1 + oevent(e).clientX - x + "px";
					style.top = temp2 + oevent(e).clientY - y + "px";
				}
			};
		}
		document.onmouseup = new Function("drag_=false");
	};
}

var move = false;
function StartDrag(obj) {
	if (event.button == 1 && event.srcElement.tagName.toUpperCase() == "DIV") {
		obj.setCapture();
		move = true;
	}
}

function Drag(obj) {
	if (move) {
		var oldwin = obj.parentNode;
		oldwin.style.left = event.clientX - 100;
		oldwin.style.top = event.clientY - 10;
	}

}

function StopDrag(obj) {
	obj.releaseCapture();
	move = false;
}

// 加载菜单
function menu_show() {
	$(".menu_con ul li").hover(
			function() {
				$(this).addClass("on").siblings().removeClass("on");
				$(this).prev().addClass("li_prev");
				$(this).find(".show_dl").show().parent().siblings().find(
						".border_dl").hide();
				// $(".menu_con").height(300);
				// $(".arrow_bottom").removeClass("arrow_bottom").addClass("arrow_top")
				// $(".hidden").css("visibility","visible");
			}, function() {
				$(".menu_con ul li").removeClass("on");
				$(".menu_con ul li").removeClass("li_prev");
				$(".menu_con ul li").find(".show_dl").hide();
				// $(".menu_con").height(251);
				// $(".arrow_top").removeClass("arrow_top").addClass("arrow_bottom")
				// $(".hidden").css("visibility","hidden");
			});

}

// 设置cookie
function getCookie(name) {
	var str = document.cookie;
	if (!str || str.indexOf(name + "=") < 0) {
		return;
	}
	var cookies = str.split(";");
	for ( var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].trim();
		if (cookie.indexOf(name + "=") == 0) {
			var value = cookie.substring(name.length + 1);
			return decodeURI(value);

		}
	}
}

// 特殊字符
function strSpecial(s) {
	var pattern = new RegExp(
			"[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！%@#￥……&*（）——|{}【】‘；：”“'。，、？]");
	return pattern.test(s);
}

//特殊字符可以提包含？，等
function strSpecial2(s) {
	var pattern = new RegExp(
			"[`~@#$^&*()=|{}':;'\\[\\].<>/~！%@#￥……&*（）——|{}【】‘；：']");
	return pattern.test(s);
}

// email的判断。
function isMail(mail) {
	return (new RegExp(
			/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)
			.test(mail));
}
function ValidURL(str) {
	  var pattern = new RegExp("^((https?|ftp)://|(www|ftp)\.)[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$"); 
	  if(!pattern.test(str)) {
		return false;
	  } else {
	    return true;
	  }
	}
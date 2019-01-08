/*
 * Name:			open.js
 * Introduction:	苏宁开放平台内部管理系统
 * Author：		    张小龙(12091228)
 * Time:			2013-04-3
 */

//点击登录 报错位演示 实际开发时可以删掉
function login() {
	$(".denglu").click(function() {
		if ($(".srk-area dl").eq(0).find("input").val() == "") {
			$(".srk-area dl").eq(0).find(".msgerror").show();
		} else {
			$(".srk-area dl").eq(0).find(".msgerror").hide();
		}
		if ($(".srk-area dl").eq(1).find("input").val() == "") {
			$(".srk-area dl").eq(1).find(".msgerror").show();
		} else {
			$(".srk-area dl").eq(1).find(".msgerror").hide();
		}
	});
	//报错消失
	$(".srk-area dl input").blur(function() {
		if ($(this).val() != "") {
			$(this).parents("dl").find(".msgerror").hide();
		}
		;
	});
}
//首页新闻交互
function news() {
	$(".middle-top dl").mouseover(function() {
		$(".middle-top dl.current").removeClass("current");
		$(this).addClass("current");
	});
	$(".middle-top dl").mouseout(function() {
		$(".middle-top dl.current").removeClass("current");
	});
	//通知公告
	$(".tongzhigonggao-area dl").mouseover(function() {
		$(".tongzhigonggao-area dl.on").removeClass("on");
		$(this).addClass("on");
	});
	$(".tongzhigonggao-area dl").mouseout(function() {
		$(".tongzhigonggao-area dl.on").removeClass("on");
	});
	$(".tongzhigonggao-area dl").click(function() {
		$(".tongzhigonggao-area dl.on-click").removeClass("on-click");
		$(this).addClass("on-click");
		var v = $(this).text();
		$(".pr26").html(v);
	});

}

//左侧菜单的显示位置
function leftNavPosition() {
	var time = null;
	var time2 = null;
	var h = $(window).height();
	var w = $(".main").outerWidth();
	//我知道的位置
	$(".isee").css({
		"top" : $(window).height() / 2 + 60
	});

	//左侧菜单箭头 点击我知道以后的效果
	$(".isee a").click(function() {
		$(".left-arrow").height(h - 167).show();
		$(".bigbg").hide();
		$(".isee").hide();
		$("#left-arrow").hide();
		clearInterval(time);
		clearInterval(time2);
	});
	//一闪一闪箭头 一进去时
	$("#left-arrow").click(function() {
		var h = $(window).height();
		$(".left-arrow").height(h - 167).show();
		$(".bigbg").hide();
		$(".isee").hide();
		$("#left-arrow").hide();
	});
}
//换图像
function choicePhotoImg() {
	$(".person-account img").click(function() {
		$(".arrow-top").show();
		$(".my-photo-tck").show();
		$(".choice-data select.shijian-moo").hide();
		return false;
	});
	$(".my-photo-tck").click(function(e) {
		$(this).show();
		e.stopPropagation();
	});
	$(".my-photo-tck .baocun-btn").click(function() {
		$(".my-photo-tck").hide();
		$(".arrow-top").hide();
		$(".choice-data select.shijian-moo").show();
		return false;
	});
}
//首页点击菜单箭头效果
function indexArrow() {
	$(".left-arrow").toggle(function() {
		$(this).removeClass().addClass("left-arrow2")
		//让菜单消失
		$(".main").addClass("main1");
		//计算一下宽度
		var ww = $(document).width();
		$(".middle-top dl dt a").width(ww - 490);
	}, function() {
		$(this).removeClass().addClass("left-arrow");
		//计算一下宽度
		var ww = $(document).width();
		$(".middle-top dl dt a").width(ww - 665);
		//让菜单出来
		$(".main").removeClass("main1");
	});
}
//左侧菜单
function leftNav() {
	var timer1 = null;
	var timer2 = null;
	$(".sidenav .food").click(function() {
		$(this).siblings(".current").removeClass("current");
		$(this).addClass("current");
		return false;
	});
	//二级菜单
	$(".sidenav .food dd ul li").hover(function() {
		clearTimeout(timer2);
		var obj = $(this);
		timer1 = setTimeout(function() {
			$(".sidenav .food dd ul li").removeClass("on");
			$(".sidenav .food dd ul li.on1").removeClass("on1");
			obj.addClass("on");
			var c = obj.find("dl.child-food").length;
			if (c == 0) {
				obj.addClass("on1");
			}
		}, 100);
	}, function() {
		clearTimeout(timer1);
		timer2 = setTimeout(function() {
			$(".sidenav .food dd ul li.on").removeClass("on");
			$(".sidenav .food dd ul li.on1").removeClass("on1");
		}, 200);
	});
}
//表格隔行换色
function gehangColor() {
	$(".op-table002 tr:odd").css({
		"background" : "#f5f5f5"
	});
	$(".success-big-table:not('.hover-table') tr:even").css({
		"background" : "#f5f5f5"
	});
}
//计算字数
inputTxtTip = function(i, t) {
	i.keyup(function() {
		var _tL = $(this).val().length;
		if (_tL < 201) {
			t.find('i').text(_tL);
		} else {
			var _aT = $(this).val().substring(0, 200);
			$(this).val(_aT);
		}
	});
};
//全站通用的文本框中的默认文字效果展示与清空
function wbkWord(obj) {
	var i;
	obj.focus(function() {
		i = $(this).attr("rel");
		if ($(this).val() == i || $(this).val() == '') {
			$(this).val('');
			$(this).css({
				"color" : "#333"
			});
		}
		;
	});
	obj.blur(function() {
		if ($(this).val() == '') {
			$(this).val(i);
			$(this).css({
				"color" : "#999"
			});
		}
		;
	});
}
//点击首页展示
function indexZhanshi() {
	$(".index-zhanshi").click(function() {
		if ($("input", this).is(":checked")) {
			$(".upload-picture-area2").show();
		} else {
			$(".upload-picture-area2").hide();
		}
		;
	});
}
//编辑文本框
function edit() {
	$(
			".succ-case-scroll :input:not(.upload-picture-area2 :input):not(#che):not(.window-file :input):not(.success-xlh select)")
			.blur(
					function() {
						var v = $(this).val();
						var i = $(this).attr("rel");
						if (v != i && v != "") {
							$(this).prev("div[class]").show().find("div").find(
									"i").text(v);
							$(this).hide();
							inputVal();
						}
					});
	//编辑出现
	$("div[class^='div']").hover(function() {
		$(this).addClass("oncurrent");
	}, function() {
		$(this).removeClass("oncurrent");
	});
	$("div[class^='div'] em").click(function() {
		var v = $(this).parent("div").find("div").find("i").text();
		$(this).parent("div").next().val(v).show().select().focus();
		$(this).parent("div").mouseleave();
		$(this).parent("div").hide();
	});
	//用于检测input是不是都有内容
	function inputVal() {
		var flag = true;
		$(
				".case-scroll :input:not(.upload-picture-area2 :input):not(#che):not(.window-file :input):not(.success-xlh select)")
				.each(function() {
					var i = $(this).val();
					var vv = $(this).attr("rel");
					if (i == vv || i == "") {
						flag = false;
					}
				});
		if (flag == true) {
			$(".case-top-btn").hide();
			$("#four-btn").show();
		} else {
			$(".case-top-btn").show();
			$("#four-btn").hide();
		}
	}
}
//点击上传图片 这段js用于演示 实际开发时要删掉
function uploadPic() {
	$(".window-file").click(function() {
		$(".upload-left-picture").html("<img src='temp/photo.jpg' />");
	});
}
//打开关闭遮罩层
grayLayerAction = function(bool) {
	var grayLayer = $("#grayLayer");
	if (bool) {
		grayLayer.css({
			display : "block",
			width : $(window).width() + "px",
			height : $(document).height() + "px"
		});
		grayLayer.find("iframe").css({
			display : "block",
			width : $(window).width() + "px",
			height : $(document).height() + "px"
		});
	} else {
		grayLayer.hide();
	}
};
//打开弹窗
openWin = function(c) {
	var obj = $("." + c);
	grayLayerAction(true);
	obj.show();
	obj.css({
		top : ($(window).height() - obj.height()) / 2 + $(window).scrollTop()
				+ "px"
	});
	var l = ($(window).width() - obj.width()) / 2;
	obj.css("left", l);
	return false;
};
closeWin = function(c) {
	var obj = $("." + c);
	obj.hide();
	if (c != 'replyMessage') {
		grayLayerAction(false);
	}

}
//弹出框
//function detailYuLan(){
//    $(".qback").live("click",function(){
//        openWin('reply');
//        $("#reply1").find("em").css("margin-left","10px");
//        $("#reply1").find("em").css("display","block");
//    });
//}
//所有内页左侧菜单
function leftArrowNeiye() {
	var wh = $(window).height();
	var toph1 = $(".top").height();
	var toph2 = $(".logo-area").height();
	var toph3 = $(".bread").outerHeight();
	var h = wh - toph1 - toph2 - toph3;
	$("#left-arrow-boss").height(h - 10);
	$("#left-arrow").height(h - 10);
	$("#left-arrow-boss").click(
			function() {
				$(this).hasClass("left-arrow-neiye2") ? $(this).removeClass()
						.addClass("left-arrow-neiye") : $(this).removeClass()
						.addClass("left-arrow-neiye2");
				//让菜单出来
				$(".nei-nav").is(":visible") ? $(".nei-nav").fadeOut(300) : $(
						".nei-nav").fadeIn(200);
				//解决ie 根本遮不住的select问题
				if ($.browser.version == 6) {
					$(".zhanshiweizhi").hide();
					$(".success-xlh select").hide();
				}
				return false;
			});
	//点击每个类别让菜单消失
	$(".nei-nav .sidenav .food dd ul li").click(function() {
		$(".nei-nav").hide();
		$("#left-arrow-boss").removeClass().addClass("left-arrow-neiye2");
		$(".zhanshiweizhi").show();
		return false;
	});
}
//成功案例页面的滚动条高度
function successScroll() {
	var wh = $(window).height();
	var toph1 = $(".top").height();
	var toph2 = $(".logo-area").height();
	var toph3 = $(".bread").outerHeight();
	var toph4 = $(".case").outerHeight() + 16;
	var allHeight = toph1 + toph2 + toph3 + toph4;
	var h = wh - allHeight;
	$(".case-scroll").height(wh - toph1 - toph2 - toph3 - 10);
	$(".index-main-scroll").height(wh - toph1 - toph2 - toph3 - 11);
	$(".main2").height(wh - toph1 - toph2 - toph3 - 11);
}
//站点地图
function zhandianDiTu() {
	$(".shezhi").click(function() {
		$(this).hide();
		$(".ditu-table002 strong.del").show();
		$(".ditu-table002 strong.jia").show();
		$(".finish").show();
	});
	$(".finish").click(function() {
		$(this).hide();
		$(".ditu-table002 strong.del").hide();
		$(".ditu-table002 strong.jia").hide();
		$(".shezhi").show();
	});
	//加
	$(".meige-dyg strong.jia").click(function() {
		var o = $(this).parents(".meige-dyg").clone();
		o.find("strong").removeClass().addClass("del");
		o.appendTo($(".cd-list-place"));
		//问一问是否超过5条
		maxFive();
	});
	//删除
	$(".del").live("click", function() {
		$(this).parents(".meige-dyg").remove();
		//问一问是否超过5条
		maxFive();
	});
	//最多5条
	function maxFive() {
		var i = null;
		i = $(".cd-list-place .meige-dyg").length;
		if (i == 6) {
			openWin('Pop1');
			$(".meige-dyg strong.jia").hide();
			$(".cd-list-place .meige-dyg:last").remove();
		} else {
			$(".meige-dyg strong.jia").show();
		}
	}
}
//首页白色背景
function indexBg() {
	//半透明背景
	var wh = $(window).height();
	var ww = $(window).width();
	var toph1 = $(".top").height();
	var toph2 = $(".logo-area").height();
	var toph3 = $(".bread").outerHeight();
	var h = wh - toph1 - toph2 - toph3;
	$(".bigbg").css({
		"width" : ww - 17,
		"height" : h - 10,
		"top" : toph1 + toph2 + toph3
	});
}

//点击问题一个框框出来
function wenti() {
	$(".wenti").hover(function() {
		var v = $(this).attr("v");
		var tl = $(this).offset().left;
		var tt = $(this).offset().top;
		$(".wenti-tck").css({
			"top" : tt + 40,
			"left" : tl - 80
		}).show().find(".wenti-content").text(v);
	}, function() {
		$(".wenti-tck").hide();
	});
}

//全局点击空白地方关闭
function blankColse() {
	$(document).click(function() {
		//入住选择时间关闭
		$(".moli-select ul").hide();
		$(".arrow-top").hide();
		$(".my-photo-tck").hide();
		$(".choice-data select.shijian-moo").show();
		$(".nei-nav").hide();
		$("#left-arrow-boss").removeClass().addClass("left-arrow-neiye2");
		$(".zhanshiweizhi").show();
		$(".success-xlh select").show();
	});
}
//全局窗口缩放
function windowBigOrSmall() {
	$(window).resize(function() {
		var wh = $(window).height();
		var ww = $(window).width();
		var toph1 = $(".top").height();
		var toph2 = $(".logo-area").height();
		var toph3 = $(".bread").outerHeight();
		var h = wh - toph1 - toph2 - toph3;
		$("#left-arrow-boss").height(h - 10);
		$("#left-arrow").height(h - 10);
		$(".left-arrow").height(wh - 167);
		successScroll();
		$("#grayLayer").css({
			"width" : ww,
			"height" : wh
		});
		$(".main2").height(wh - toph1 - toph2 - toph3 - 11);
		indexBg();
		//我知道的位置
		$(".isee").css({
			"top" : $(window).height() / 2 + 60
		});
		indexNewsWith();
	});
}
//首页时间模式
function indexChoiceData() {
	$(".moli-select").hover(function() {
		$(this).addClass("moli-select-bg");
	}, function() {
		$(this).removeClass("moli-select-bg");
	});
	//时间模式与业务模式之间的切换
	$(".shijian-moo").change(function() {
		var i = $(".shijian-moo option:selected").index();
		if (i == 0) {
			$(".moli-select").show();
			$(".choice-data .ml10").hide();
		} else {
			$(".moli-select").hide();
			$(".choice-data .ml10").show();
		}
	});
}
//nav二级菜单 面包屑
function navTwoCaiDan() {
	var time1 = null;
	var time2 = null;
	$(".top-select").hover(function() {
		clearTimeout(time2);
		time1 = setTimeout(function() {
			$(".xiala-select").addClass("on");
			$(".xiala-select").next().show();
			if ($.browser.version == 6) {
				$(".zhanshiweizhi").hide();
				$(".success-xlh select").hide();
			}
		}, 100);
	}, function() {
		clearTimeout(time1);
		time2 = setTimeout(function() {
			$(".xiala-select").removeClass("on");
			$(".xiala-select").next().hide();
			if ($.browser.version == 6) {
				$(".zhanshiweizhi").show();
				$(".success-xlh select").show();
			}
		}, 200);
	});
}
//添加新题目标签切换
function addTab() {
	$(".three-input input").click(function() {
		var i = $(this).index();
		if (i == 0) {
			$(".jian-ask").show();
		} else if (i == 2) {
			$(".jian-ask").show();
		} else if (i == 4) {
			$(".jian-ask").hide();
		}
		;
	});
}
//问题报表点击查询
function startQuery() {
	$(".start-query").click(function() {
		$(".pealse-choice-x").hide();
		$(".query-jieguo").show();
	});
}
//首页新闻根据屏幕大小宽度变化
function indexNewsWith() {
	var ww = $(document).width();
	$(".middle-top dl dt a").width(ww - 665);
}
//tab
function tabTable(obj) {
	obj.click(function() {
		$(".tabBtn li.on").removeClass("on");
		$(this).addClass("on");
		$(".rcon").hide();
		$(".rcon").eq($(this).index()).show();
	});
	//flash图表切换
	$(".uiselect").change(function() {
		var v = $.trim($(this).find(":selected").text());
		if (v == "45s客服响应率") {
			$(".flash-data").hide();
			$(".flash-data2").show();
		} else {
			$(".flash-data").show();
			$(".flash-data2").hide();
		}
		;
	});
}
//活动时间设置
function installActivityTime(obj, delobj) {
	//添加
	obj.click(function() {
		clickObj = $(this);
		var c = $(this).parents(".activity-table").find("tr:hidden").clone();
		var cc = $(this).parent().parent();
		var cobj = c.insertBefore(cc).show();
		for (i = 1; i < 8; i++) {
			var inputObj = clickObj.parents(
					".activity-table1 .title td:eq(" + i + ")").find("input");
			var cinput = cobj.find("td:eq(" + i + ")");
			if (inputObj.is(':checked')) {
				cinput.addClass("pitch-on");
			} else {
				cinput.removeClass("pitch-on");
			}
		}
	});

}
//创建报名活动灰色表格隔行换色
function grayTable(obj) {
	obj.css({
		"background" : "#f5f5f5"
	});
}
//表格排序 只有一种排序
function tableSort(obj) {
	obj.toggle(function() {
		$(this).addClass("web-sort-on");
	}, function() {
		$(this).removeClass("web-sort-on");
	});
}
//二个箭头的排序
function tableSort2(obj) {
	obj.toggle(function() {
		$(this).removeClass("web-sort2-on2");
		$(this).addClass("web-sort2-on1");
	}, function() {
		$(this).removeClass("web-sort2-on1");
		$(this).addClass("web-sort2-on2");
	});
}
//选择活动时间设置
function choiceActivityData(obj) {
	//点击星期 input
	obj.click(function() {
		var i = $(this).parent("td").index();
		var o = $(".activity-table1 tr:visible:not(tr.title,tr:last)");
		if ($(this).is(":checked")) {
			o.each(function() {
				$(this).find("td:eq(" + i + ")").addClass("pitch-on");
			});
		} else {
			o.each(function() {
				$(this).find("td:eq(" + i + ")").removeClass("pitch-on");
			});
		}
	});
}
//表格隔行换色
function hoverTable(obj) {
	//鼠标经过
	obj.hover(function() {
		$(this).addClass("hover1");
	}, function() {
		$(this).removeClass("hover1");
	});
	//点击input
	obj.find("[type='checkbox']input").click(function() {
		if ($(this).is(':checked')) {
			$(this).parents(".hover-table tr").addClass("hover2");
		} else {
			$(this).parents(".hover-table tr").removeClass("hover2");
		}
	});
}
function down(obj) {
	obj.click(function() {
		var _this = $(".yijian");
		var t = _this.offset().top + 26;
		var l = _this.offset().left;
		$(".y-div").css('top', t);
		$(".y-div").css('left', l);
		$(".y-div").show();
	});
}

function opinion(obj) {
	obj.click(function() {
		var zhi = $(this).text();
		$(".yijian input").val(zhi);
		$(".y-div").hide();
	});
}
function question(obj) {
	obj.click(function() {
		var _this = $(".problem");
		var t = _this.offset().top + _this.height() + 1;
		var l = _this.offset().left;
		$(".question").css('top', t);
		$(".question").css('left', l);
		$(".question").show();
	});

}
function questionHide(obj) {
	obj.hover(function() {

	}, function() {
		$(obj).hide();
	});
}
function opinionHide(obj) {
	obj.hover(function() {
	}, function() {
		$(obj).hide();
	});
}

//var selArry = ['交易中心首页','数据宝','经营绩效','我的合同','售前管理','我的店铺','营销管理','物流管理','财务管理','客户服务','交易管理','商品管理','系统设置','我的收藏','其他'];
var selArry = [ 'SOP0000', 'SOPF109', 'SOPC101', 'SOPC103', 'SOPC104',
		'SOPC105', 'SOPC106', 'SOPC107', 'SOPC108', 'SOPC109', 'SOPC110',
		'SOPC111', 'SOPC102', 'SOPC113', 'SOPC112','SOPC114' ,'SOPC100'];
var selList = [];
function questionSelect(obj) {
	var val = $("#" + obj).parent().next().text();
	var length = $("#txtType ul li").length;
	var sum = obj.substr(1, 2);
	if ($("#" + obj).prop('checked') == true) {
		if (val == "全部") {
			$("#txtType ul li").text("全部");
			$(".question").find('table').find('input[type="checkbox"]').prop(
					'checked', true);
			$("#txtType").css('margin-top', '4px');
			var h = $(".problem").offset().top + $(".problem").height() + 1;
			//              selList = selArry;
			selList = [];
			$(".question").css('top', h);
		} else {
			if ($("#txtType ul li").text().indexOf('全部') != -1) {
				$("#txtType ul li").text("");
				$("#txtType").css("margin-top", '2px');

				var _html = "<div class='sel_li'><span id=" + val
						+ "  style='float: left;'>" + val + "</span><em id="
						+ sum
						+ " class='checkImg' width='8' height='7'></em></div>"
				$("#typeLi").html(_html);
				//                        selList.push(val);
				selList.push($("#" + obj).val());
				//问题类型子元素删除操作
				delLi($(".sel_li em"));
			} else {
				var w = $("#txtType").width();
				if (length == 1) {
					$(".f .problem").removeClass('prowidth');
				}
				if (length == 5) {
					$("#txtType").css("margin-top", '2px');
					$("#txtType").css("width", w);
					var _html = "<div class='sel_li'><span id="
							+ val
							+ "  style='float: left;'>"
							+ val
							+ "</span><em id="
							+ sum
							+ " class='checkImg' width='8' height='7'></em></div>"
					$("#typeLi").html($("#typeLi").html() + _html);
				} else {
					var _html = "<div class='sel_li'><span id="
							+ val
							+ "  style='float: left;'>"
							+ val
							+ "</span><em id="
							+ sum
							+ " class='checkImg' width='8' height='7'></em></div>"
					$("#typeLi").html($("#typeLi").html() + _html);
				}
				var h = $(".problem").offset().top + $(".problem").height() + 1;
				$(".question").css('top', h);
				//                          selList.push(val);
				selList.push($("#" + obj).val());
				//问题类型子元素删除操作
				delLi($(".sel_li em"));
			}

		}
	} else {

		if ($("#iAll1").prop('checked') == false) {
			if (val == "全部") {
				$(".question").find('table').find('input[type="checkbox"]')
						.prop('checked', false);
				selList = [];
			}
			if ($("#typeLi").find("div").length == 1) {
				$("#typeLi").text("全部");
				$("#txtType").css('margin-top', '4px');
			} else {
				if ($("#txtType").html().indexOf(val) != -1) {
					$("#" + val).parent().remove();
				}
			}
			var h = $(".problem").offset().top + $(".problem").height() + 1;
			$(".question").css('top', h);
			var index = $.inArray($("#"+obj).val(), selList);
			if(index != -1)
			{
				selList.splice(index, 1);
			}
			
		} else {
			alert("请去掉全部勾选才能选择！");
			$("#" + obj).prop('checked', true);
		}

	}
	$("#modules_Temp").val(selList);

}

function questionSelectTempStatus(obj) {
	var val = $("#" + obj).parent().next().text();
	var length = $("#txtType ul li").length;
	var sum = obj.substr(1, 2);
	var w = $("#txtType").width();
	
	if (length == 1) {
		$(".f .problem").removeClass('prowidth');
	}
	if (length == 5) {
		$("#txtType").css("margin-top", '2px');
		$("#txtType").css("width", w);
		var _html = "<div class='sel_li'><span id="
				+ val
				+ "  style='float: left;'>"
				+ val
				+ "</span><em id="
				+ sum
				+ " class='checkImg' width='8' height='7'></em></div>"
		$("#typeLi").html($("#typeLi").html() + _html);
	} else {
		var _html = "<div class='sel_li'><span id="
				+ val
				+ "  style='float: left;'>"
				+ val
				+ "</span><em id="
				+ sum
				+ " class='checkImg' width='8' height='7'></em></div>"
		$("#typeLi").html($("#typeLi").html() + _html);
	}
	var h = $(".problem").offset().top + $(".problem").height() + 1;
	$(".question").css('top', h);
	$("#" + obj).prop('checked',true);
	//                          selList.push(val);
	selList.push($("#" + obj).val());
	//问题类型子元素删除操作
	delLi($(".sel_li em"));
	
}

function checkModelStatus() {
	var modelV=$("#modules_Temp").val();
	if(null!=modelV&&""!=modelV){
		$("#txtType ul li").text("");
		var json = '{"SOP0000":"i2","SOPF109":"i3","SOPC101":"i4","SOPC103":"i5","SOPC104":"i6","SOPC105":"i7","SOPC106":"i8","SOPC107":"i9","SOPC108":"i10","SOPC109":"i11","SOPC110":"i12","SOPC113":"i13","SOPC102":"i14","SOPC112":"i16","SOPC113":"i15","SOPC114":"i16","SOPC100":"i17"}';
		var obj = JSON.parse(json);
		var models=modelV.split(",");
		for(var i=0;i<models.length;i++){
			var temp=models[i];
			questionSelectTempStatus(obj[temp]);
		}
		
	}
	

}

//小图标上下居中

function replySelect(obj) {
	obj.click(function() {
		var imglist = [ 'reply1', 'reply2', 'reply3', 'reply4' ];
		var id = $(this).attr("id");
		for ( var i = 0; i < imglist.length; i++) {
			if (imglist[i] == id) {
				$("#" + imglist[i]).find("em").css("display", "block");
				$("#" + imglist[i]).find("span").css("text-align", "");
				$("#" + imglist[i]).find("span").css("float", "left");
				$("#" + imglist[i]).find("span").css("font-weight", "bold");
				$("#" + imglist[i]).find("span").css("color", "#3377cb");
				$("#" + imglist[i]).css("border-bottom", "0px");
				//                    $("#" + imglist[i]).css("background","url()");
				if (imglist[i] == 'reply1') {
					ansTypeTemp = 1;
					$("#" + imglist[i]).find("em").css("margin-left", "10px");
					$(".replybut").find("span").text("发送");
					$(".reply .text_area").show();
					$(".reply .reply-email").hide();
				} else if (imglist[i] == 'reply2') {
					ansTypeTemp = 2;
					$(".replybut").find("span").text("保存");
					$("#" + imglist[i]).find("em").css("margin-left", "25px");
					$(".reply .text_area").show();
					$(".reply .reply-email").hide();
				} else if (imglist[i] == 'reply3') {
					ansTypeTemp = 3;
					$("#" + imglist[i]).find("em").css("margin-left", "32px");
					$(".replybut").find("span").text("保存");
					$(".reply .text_area").show();
					$(".reply .reply-email").hide();
				} else {
					ansTypeTemp = 4;
					$("#" + imglist[i]).find("em").css("margin-left", "28px");
					$(".replybut").find("span").text("发送");
					$(".reply .text_area").hide();
					$(".reply .reply-email").show();
				}
			} else {
				$("#" + imglist[i]).find("em").hide();
				$("#" + imglist[i]).find("span").css("float", "");
				$("#" + imglist[i]).find("span").css("font-weight", "");
				$("#" + imglist[i]).find("span").css("color", "#333");
				$("#" + imglist[i]).css("border-bottom", "1px solid #dbe3ec");
				$("#" + imglist[i]).css("background",
						"url('css/images/promotion.png')");
				$("#" + imglist[i]).css("background-position", "105px 45px");
			}
		}

	});
}

function replayStatus(id){
	var imglist = [ 'reply1', 'reply2', 'reply3', 'reply4' ];
	for ( var i = 0; i < imglist.length; i++) {
		if (imglist[i] == id) {
			$("#" + imglist[i]).find("em").css("display", "block");
			$("#" + imglist[i]).find("span").css("text-align", "");
			$("#" + imglist[i]).find("span").css("float", "left");
			$("#" + imglist[i]).find("span").css("font-weight", "bold");
			$("#" + imglist[i]).find("span").css("color", "#3377cb");
			$("#" + imglist[i]).css("border-bottom", "0px");
			//                    $("#" + imglist[i]).css("background","url()");
			if (imglist[i] == 'reply1') {
				ansTypeTemp = 1;
				$("#" + imglist[i]).find("em").css("margin-left", "10px");
				$(".replybut").find("span").text("发送");
				$(".reply .text_area").show();
				$(".reply .reply-email").hide();
			} else if (imglist[i] == 'reply2') {
				ansTypeTemp = 2;
				$(".replybut").find("span").text("保存");
				$("#" + imglist[i]).find("em").css("margin-left", "25px");
				$(".reply .text_area").show();
				$(".reply .reply-email").hide();
			} else if (imglist[i] == 'reply3') {
				ansTypeTemp = 3;
				$("#" + imglist[i]).find("em").css("margin-left", "32px");
				$(".replybut").find("span").text("保存");
				$(".reply .text_area").show();
				$(".reply .reply-email").hide();
			} else {
				ansTypeTemp = 4;
				$("#" + imglist[i]).find("em").css("margin-left", "28px");
				$(".replybut").find("span").text("发送");
				$(".reply .text_area").hide();
				$(".reply .reply-email").show();
			}
		} else {
			$("#" + imglist[i]).find("em").hide();
			$("#" + imglist[i]).find("span").css("float", "");
			$("#" + imglist[i]).find("span").css("font-weight", "");
			$("#" + imglist[i]).find("span").css("color", "#333");
			$("#" + imglist[i]).css("border-bottom", "1px solid #dbe3ec");
			$("#" + imglist[i]).css("background",
					"url('css/images/promotion.png')");
			$("#" + imglist[i]).css("background-position", "105px 45px");
		}
	}
	
}
function messageInfo(obj) {
	//    obj.click(function(){
	//        var v = $(this).find('span').text() + "成功！";
	//        $(".replyMessage").find('span').text(v);
	//        $(".replyMessage").show();
	//        setTimeout(function(){
	//            $(".replyMessage").hide();
	//        },1000);
	//
	//    });
}

function errshow(obj, v) {
	var t = ($(window).height() - obj.height()) / 2;
	var l = ($(window).width() - obj.width()) / 2;
	var s = "errWindow";
	obj.find('.errWindow_head').find('p').html(v);
	obj.css('top', t);
	obj.css('left', l);
	obj.show();
	grayLayerAction(true);

}

function delLi(obj) {
	obj.click(function() {
		var id = $(this).attr("id");
		if ($("#txtType ul li").find('div').length == 1) {
			$(this).parent().remove();
			$("#typeLi").html('全部');
			$(".question").find('table').find('input[type="checkbox"]').attr(
					'checked', true);
			var h = $(".problem").offset().top + $(".problem").height() + 1;
			$(".question").css('top', h);
			selList = [];
		} else {
			$(this).parent().remove();
			$("#i" + id).attr('checked', false);
			var h = $(".problem").offset().top + $(".problem").height() + 1;
			$(".question").css('top', h);
			//               selList.remove( $(this).parent().find('span').text());\
//			selList.splice($("#"+id).val(), 1);
			var index = $.inArray($("#i"+id).val(), selList);
			if(index != -1)
			{
				selList.splice(index, 1);
			}
//			selList.remove($("#"+id).val());
		}

	});
}

var qusetionList = [ '00', '01', '02' ];
var qList = [];
function selstu(obj) {
	var v = $("#" + obj).val();
	if (v == "09") {
		if (($("#inAll").prop('checked') == true)) {
			for ( var i = 1; i <= 3; i++) {
				$("#in" + i).attr('checked', true);
			}
			//                qList = qusetionList;
			//这边方便后台查询也定义为空
			$("#inAllTemp").val("01");
			$("#in1Temp").val("01");
			$("#in2Temp").val("01");
			$("#in3Temp").val("01");
			qList = [];
		} else {
			for ( var i = 1; i <= 3; i++) {
				$("#in" + i).attr('checked', false);
			}
			$("#inAllTemp").val("00");
			$("#in1Temp").val("00");
			$("#in2Temp").val("00");
			$("#in3Temp").val("00");
			qList = [];
		}
	} else {
		if ($("#inAll").prop('checked') == true) {
			alert("请去掉所有问题勾选才能选择！");
			$("#" + obj).prop('checked', true);
		}
		if ($("#" + obj).prop('checked') == true) {
			qList.push(v);
			$("#" + obj + "Temp").val("01");
		} else {
//			qList.splice(v, 1);
			var index = $.inArray(v, qList);
			if(index != -1)
			{
				qList.splice(index, 1);
			}
			$("#" + obj + "Temp").val("00");
		}
	}

}
function getAnswerStatus() {
	//已反馈
	if ($("#in1").prop('checked') == true) {
		qList.push("01");
	}

	//未反馈
	if ($("#in2").prop('checked') == true) {
		qList.push("00");
	}

	//关闭
	if ($("#in3").prop('checked') == true) {
		qList.push("02");
	}

}
$(function() {
		
	checkModelStatus();
	getAnswerStatus();
	login();
	news();
	leftNavPosition();
	blankColse();
	choicePhotoImg();
	indexArrow();
	leftNav();
	gehangColor();
	leftArrowNeiye();
	inputTxtTip($('#zxlarea'), $('#zxlcount'));
	inputTxtTip($('#zxlarea2'), $('#zxlcount2'));
	wbkWord($(":input"));
	indexZhanshi();
	edit();
	uploadPic();
	//	detailYuLan();
	successScroll();
	windowBigOrSmall();
	zhandianDiTu();
	indexBg();
	wenti();
	indexChoiceData();
	navTwoCaiDan();
	addTab();
	startQuery();
	indexNewsWith();
	tabTable($(".tabBtn li"));
	installActivityTime($(".add-activity-time"), $(".del-clone"));
	grayTable($(".activity-table1 tr:odd"));
	grayTable($(".activity-table-left tr:even"));
	tableSort($(".web-sort"));
	tableSort2($(".web-sort2"));
	choiceActivityData($(".activity-table1 .title td input"));
	hoverTable($(".hover-table tr:not(tr:first)"));

	//反馈意见点击显示
	down($(".f .yijian div"));
	//反馈意见选中显示在输入框
	opinion($(".y-div li"));
	opinionHide($(".y-div"));

	//问题类型层点击显示
	question($(".f .problem #downicon"));
	//问题类型层移动消失
	questionHide($(".question"));

	//对话框选择事件
	replySelect($(".reply-li"));

	//对话框操作提示
	messageInfo($("#alertBtn"));

	//初始化
	$(".yijian input").val("请选择");
	$("#reply1").css("color", "#3377CB");
	$("#reply1 span").css("font-weight", "bold");
	$("#reply2").addClass("li-two");
	$("#reply3").addClass("li-two");
	$("#reply4").addClass("li-two");

	$(".reply-li").css("text-align", "center");

	//    $(".import").click(function(){
	//        var v = $(this).find("span").text();
	//        if(v == "导出报表"){
	//            errshow($('.errWindow'),'提示');
	//            $('.errWindow').find('.errText_one').text("问题1、2、3、6 回复失败");
	//        }else{
	//            errshow($('.errWindow'),'邮箱');
	//            $('.errWindow').find('.errText_one').text("问题1、2、3、6 邮件回复失败");
	//        }
	//    });

	//     $(".sel").attr('checked',true);

});

/**
 * Created by zhoudexin.
 * ID: 12030466
 * Date: 12-9-29
 * Time: pm 3:31
**/

jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	}
});

var myOpen = myOpen || {};

myOpen.leftFirMenu = function(btn){
	var btn = $(btn);
	var len = btn.length;
	btn.eq(0).addClass("on").parent().siblings().show();
	btn.each(function(i){
		$(this).click(function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on").parent().siblings().hide();
			} else {
				$(this).addClass("on").parent().siblings().show();
			}
		});
	});
}
myOpen.leftSecMenu = function(btn){
	var btn = $(btn);
	btn.toggle(function(){
		$(this).addClass("more").siblings(".moreList").hide();
	},
	function(){
		$(this).removeClass("more").siblings(".moreList").show();
	});
}
myOpen.tab = function(){
	var _tab = $(".tab");
	var btn = _tab.find("dt");
	var con = _tab.find("dd>div");
	btn.click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings("dt").removeClass("on");
		con.eq(index).removeClass("hide").siblings().addClass("hide");
	});
}
myOpen.ULtab = function(b,c){
	var _b = $(b) , _c = $(c);
	_b.click(function(){	
		$(this).addClass('on').siblings().removeClass('on');
		_c.hide().eq($(this).index()).show();	
	});
		
};
//打开关闭遮罩层	
myOpen.grayLayerAction = function(bool){
	var grayLayer = $("#grayLayer");
	if(bool){
		grayLayer.css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
		grayLayer.find("iframe").css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	}else{
		grayLayer.hide();
	}
};
//打开弹窗
myOpen.openWin = function(c){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	return false;
};
myOpen.closeWin = function(c){
	var obj = $("."+c);
	obj.hide();
	myOpen.grayLayerAction(false);
};
//打开弹窗 不计算高度，按照div自己样式显示
myOpen.openWin2 = function(c){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	return false;
};
//打开弹窗
myOpen.openDiv = function(c,msg){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	$("#msgAlert").html(msg);
	return false;
};
var funcTimes = 0 ;
//打开确认提示框 12060945
myOpen.showWin = {confirm:function(c,msg,fn){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	$("#msgConfirm").html(msg);
	$("#ok").unbind();
	$("#cancel").unbind();
	$("#ok").click(function(){
		myOpen.closeWin(c);
		if(fn){
			fn(true);
			return false;
		}
	});
	$("#cancel").click(function(){
		myOpen.closeWin(c);
		if(fn){
			fn(false);
			return false;
		}
		return false;
	});
}
};
myOpen.showUpdWin = {confirm:function(c,msg,fn){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	$("#updataMsgConfirm").html(msg);
	$("#updateWin").click(function(){
		if(fn){
			fn(true);
			return false;
		}
	});
	$("#cancelWin").click(function(){
		myOpen.closeWin('uiPop');
		if(fn){
			fn(false);
			return false;
		}
		return false;
	});
}
};
//select切换
myOpen.change = function(value,c,tag){
	var divArray = $("."+c).find(tag+".sele");
 	for (var i=0;i<divArray.length;i++) {
  		if (divArray[i].id == value) {
		divArray[i].style.display="";
  		}else {
   		divArray[i].style.display="none";
  		}
 	}
};
//table行渐变
myOpen.tableTR = function(){
	$('table.tableMes tr').each(function(){
		if($(this).index()%2!=0){
		$(this).css('background','#f5f5f5');	
		}
	});
};
//清空输入框
myOpen.clearTxt =  function(input,classOn){
	var _input = $(input) , _txt = _input.val();	
	_input.focus(function(){
		if($(this).val() ==_txt){
			$(this).val('').addClass(classOn);	
		}
	});
	_input.blur(function(){
		if($(this).val() ==''){
			$(this).val(_txt).removeClass(classOn);
		}
	});
};
//弹框table切换
myOpen.popChange = function(o){
	var popC = $("."+o)
	var popB = popC.find("a.case7");
	popB.toggle(
		function(){
			$(".popTable1").hide();
			$(".popTable2").show();
			},
		function(){
			$(".popTable1").show();
			$(".popTable2").hide();
			})
}
//导航条下拉
function addhover(o){
	$(o).find(".menuHd").eq(0).addClass("hover");
	$(o).find("div").show();
	$(o).css("z-index",2);
};
function delhover(o){
	$(o).find(".menuHd").eq(0).removeClass("hover");
	$(o).find("div").hide();
	$(o).css("z-index",1);
};
//选择语言
function showLan(o){
	$(o).find("b").css("background-position","0 -50px");
	$(o).find("em").css("display","block");
}
function hideLan(o){
	$(o).siblings().find("b").css("background-position","0 -45px");
	$(o).css("display","none");
}
function selectLan(o){
	var lan = $(o).text();
	var _html = lan + "<b></b>";
	//$(".language").find("em").css("display","none");
	$(o).parent().hide().siblings().html(_html);
}
//激活时改变输入框边框色
function changeTextBorder(){
	var inputs1 = $("input[type='text']");
	var inputs2 = $("input[type='password']");
	var uiText = $(".uiText");
	uiText.bind("focus",function(){
		$(this).addClass("focus");
	});
	uiText.bind("blur",function(){
		$(this).removeClass("focus");
	});
	var uiTxt = $(".uiTxt");
	uiTxt.bind("focus",function(){
		$(this).addClass("focus");
	});
	uiTxt.bind("blur",function(){
		$(this).removeClass("focus");
	});
};
//设置快捷键
function setKeys(o){
	$(o).siblings(".setBox").removeClass("hide");
}
function closeKeys(o){
	$(o).parent().addClass("hide");
}
function setDisabled(o){
	$(o).attr("disabled","disabled");
}
function myshopSelect(){
	$(".openShopboxUp select").change(function(){
		if($(this).val()!="")
		{
			$(this).parent().find("a").show();
		}
		else
		{
			$(this).parent().find("a").hide();
		}
	});
}
function agreementChose(o){
	var $btn = $(o).parent().find(".uiBtn");
	$(o).change(function(){
		if($(o).attr("checked"))
		{
			$btn.removeClass("disable");
			$btn.one('click',function(){
				 myOpen.closeWin('shopOut');
			});
		}
		else
		{
			$btn.addClass("disable");
		}
	})
}
function shopTemplate(){
	var $img=$(".tempbox").find("img");
	$img.hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	});
}
$(function(){
	myOpen.leftFirMenu(".leftMenu dt>span");
	myOpen.leftSecMenu(".leftMenu dd>em");
	myOpen.tab();
	myOpen.ULtab('ul.tabBtn li','.edu_Con');
	myOpen.tableTR();
	myOpen.clearTxt('.clearVal','inputTxton');
	changeTextBorder();
	deledoc();
	setDisabled($(".myshopCateList .gray"));
	myshopSelect();
	agreementChose("#shopoutAgreecb");
	shopTemplate();
})

//用户体验计划之控制字符
function limitchar(area,numbox){
    var area = $(area);
    var dom = $(numbox);
    var stext = dom.text();
    var val = area.val();
    var len = val.length;
    dom.removeAttr("style").text(len);
};
//动态删除附件
function deledoc(){
	$('.dele a').click(function(){
		$(this).parent().parent().remove();
	});
}
/*****点击关闭 设置弹出框 *****/
function closeKey002(){
	
	$(".leftIcon002").toggle();
	$(".collection").toggle();
}

function setKeys002(){
	$(".leftIcon002").toggle();
	$(".collection").toggle();
}


/*******合同页面 左侧菜单效果************/
$(function(){
	$(".contractList > li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");	
	});
	
});



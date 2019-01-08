/*
 * Copyright (C), 2002-2014, 苏宁易购电子商务有限公司
 * FileName   : quickBar.js
 * Author     : 10072938
 * Date       : 2014-08-07
 * Description: 门户系统首页快速导航工具条相关脚本
 * Since      : [PORTAL_V2.5.0]
 * History    : //修改记录
 * <author>      <time>      <version>    <desc>
 * 10072938    2014-08-07       1.0        创建：从/webapp/WEB-INF/freemarker/index.ftl提取的javascript脚本。
 */

// 是否IE浏览器
// var isIE = (document.all && window.ActiveXObject && !window.opera) ? true : false;

// 页面加载完成后执行
$(function(){
	sideToolsAct();
});

// “回顶部”事件处理
var backToTop = function(){
    $("html,body").scrollTop(0);
};

// 右侧工具条
function sideToolsAct(){
	var obj = $("#sideTools");
	var wHeight = $(window).height();
	var oHeight = obj.height();
	var stMore = obj.find(".stMore");
	var miniNav = obj.find(".miniNav a");
	var closeHandle = obj.find(".stMoreClose");
	var flag = false;//默认快速导航为关闭
	var timer;//延迟收起
	var isIE = !!window.ActiveXObject;
	var isIE6 = isIE && !window.XMLHttpRequest;
	
	//初始化
	obj.css({top:(wHeight-oHeight)/2+"px"});
	obj.removeClass("hide");
	obj.hover(
		function(){
			clearTimeout(timer);
			obj.stop().animate({right:0});
		},
		function(){
			if(!flag){
				timer = setTimeout(function(){
					obj.stop(true, true).animate({right:"-110px"});
				}, 300);
			}	
		}
	);
	
	/*miniNav.click(function(){
		miniNavAct();
	});*/
	
	closeHandle.click(function(){
		miniNavAct();
	});
	
	function miniNavAct(){
		// var stHeight = stMore.height();
		if (!flag){
			//展开
			miniNav.addClass("on");
			stMore.show().height("auto");
			var tmp_h = stMore.height();
			stMore.height(0).hide();
			
			var _top = (wHeight-oHeight-tmp_h+14)/2;
			var _right = obj.css("right");
			if (_right < 0){
				obj.animate({right:0},1);
			}
			if (_top < 0){
				_top = 0;
			}
			
			stMore.show().animate({height:tmp_h+"px"},400);
		
			if(isIE6){
				obj.css({top : $(document).scrollTop() + 48 + "px"});
			}else{
				obj.stop().animate({top:_top + "px"}, 350);
			}
			
			closeHandle.show();
		
			flag = true;
		}else{
			//收起
			miniNav.removeClass("on");
			stMore.animate({height:0},180);
			
			if(isIE6){
				obj.css({top: $(document).scrollTop() + 48 + "px"});
			}else{
				obj.stop().animate({top:(wHeight-oHeight)/2 + "px"}, 350, function(){stMore.hide();});
			}
			
			closeHandle.hide();
			flag = false;
		}
	
	} // End: function miniNavAct
	
	function ie6Scroll(){
		if(isIE6){
			var _top = (wHeight-oHeight)/2;
			obj.css({position:"absolute", right:"-110px", top:_top+"px"});
			$(window).scroll(function(){
				var oHeight2 = obj.height();
				var _top2 = (wHeight-oHeight2)/2;
				var scrollTop = $(document).scrollTop();
				obj.stop().animate({"top": _top2+scrollTop+"px"}, 500);
			});
		}
	}
	
	ie6Scroll();

} // End: function sideToolsAct
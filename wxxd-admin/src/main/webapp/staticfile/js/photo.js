//zhangxiaolong 2012-11-29
//幻灯片效果


function r(){
	$(".pic").unbind("click");
	$(".pic").click(function(){
		imgToNext();
		imgWidth();
	});
}
function l(){
	$(".pic").unbind("click");
	$(".pic").click(function(){
		imgToPrev();
		imgWidth();
	});
}
//点下面一排小图看大图
function viewBigPhoto(){
	photoIndex = 0;
	$(".picLists li").click(function(){
		photoIndex = $(this).index();
		$(".current").removeClass("current");
		$(this).addClass("current");
		var n = $(this).find("img").attr("src");
		$(".pic").find("img").attr("src",n).hide().fadeIn();
		$(".currentPage").html($(".current").attr("in"));
	});
}
//点击next按钮
function nextImg(){
	$(".defl_next .next").click(function(){
		imgToNext();
		imgWidth();
	});
}
//点击prev按钮
function prevImg(){
	$(".play_prev .prev").click(function(){
		imgToPrev();
		imgWidth();
	});
}
//图片一张接一张向下即向右next走着
function imgToNext(){
	if(!($(".picLists ul").is(':animated'))){
		$(".picLists ul").animate({"marginLeft":"-78px"},300,function(){
			$(".picLists ul li:eq(0)").appendTo(".picLists ul").css({"left":$(".picLists ul").width()-78});
			$(".picLists ul").css({"marginLeft":"0px"});
			$(".picLists ul li:not(:last)").each(function(){
				$(this).css({"left":"-=78px"});
			});
			$(".picLists ul li:eq("+photoIndex+")").click();
			$(".currentPage").html($(".current").attr("in"));
		});
	}
}
//图片一张接一张向前即向右prev走着
function imgToPrev(){
	if(!($(".picLists ul").is(':animated'))){
		$(".picLists ul").css({"marginLeft":"-78px"});
		$(".picLists ul li:last").prependTo(".picLists ul").css({"left":"0px"});
		$(".picLists ul li:not(:first)").each(function(){
				$(this).css({"left":"+=78px"});
		});
		$(".picLists ul").animate({"marginLeft":"0px"},300,function(){
			$(".picLists ul li:eq("+photoIndex+")").click();
			$(".currentPage").html($(".current").attr("in"));
		});
	}
}
//关闭
function closeing(){
	$(".M_icon41").click(function(){
		$(".L_slide,.zhechao,.console").hide();
		$("html").css({"overflow":"auto"});
		$(document).unbind("mousemove");
	});
}
//下面一排小图出现与隐藏
function viewOrHidden(){
	$(document).mousemove(function(e){
		var event = window.event || e;
		var mouseh = event.clientY;
		var windowh = $(window).height()/2;
		if(mouseh < windowh){
			$(".console").fadeOut();
		}else{
			$(".console").fadeIn();
		}
	});
	//键盘翻页
	$(document).keydown(function(e){
		var event = window.event || e;
		var keyC = event.keyCode;
		if(keyC == "37"){
			$(".play_prev .prev").click();
		}else if(keyC == "39"){
			$(".defl_next .next").click();
		}else if(keyC == "27"){
			$(".M_icon41").click();
		}else if(keyC == "32"){
			return false;
		}
	});
	
	
}

//设置图片大小 最大值
function imgWidth(){
	var imgHeight = $(".pic img").height();
	if(imgHeight > 720){
		$(".pic img").width("900px");
		$(".pic img").height("720px");
	}
}

function smalltobig(){
	photoIndex = $("#pageNum").val();
	$(".picLists li").each(function(index,element){
		index_in = $(element).attr("in");
		if(index_in==photoIndex){
			$(element).click();
			$(".currentPage").html($(".current").attr("in"));
		}
	});
}

//图片自适应 垂直居中
function imgCenter(){
	var imgh = 0;
	var wh = $(window).height();
	if(wh > 720){
		 imgh = (wh - 720)/2;
	}
	$(".pic").css("margin-top",imgh);
}

//全屏观看
function viewAllScreen(){
	$(".quan").click(function(){
		smalltobig();
		$("html").css({"overflow":"hidden"});
		$(".zhechao").show();
		$(document).scrollTop("0px");
		arrowPosition();//箭头切换
		
		nextImg();//点击next按钮
		prevImg();//点击prev按钮
		closeing();//关闭
		$(".L_slide,.zhechao,.console").show();
		viewOrHidden();//下面一排小图出现与隐藏
		imgWidth();
		imgCenter();//图片自适应 垂直居中
	});
}

$(function(){
	viewBigPhoto();//点小图看大图
	viewAllScreen();//全屏观看
});
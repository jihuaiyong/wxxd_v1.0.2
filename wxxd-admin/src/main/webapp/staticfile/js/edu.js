/*
*author zhangxiaolong  2012-11-23  at suning
*/
function videoTab(){
	$("#videoTab input[type='radio']").click(function(){
		$("[child]").hide();
		$("[c*=00]").hide();
		$('tr[child='+$(this).attr("father")+']').show();
		if($(this).attr("father") == "3"){
			$("[c*=00]").hide();
			$("[c=001]").show();
			$("[name='upload']").eq(0).attr("checked",true);
		}else{
			$("[c=001]").hide();
		}
		$("[child=3] input").click(function(){
			$("[c*=00]").hide();
			$("[c*=00]").eq($(this).index()).show();
		});
	});
}

function picpreSlide(){
	$('.picpreBox ul li').click(function(){
		var index = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$('.picShow img').hide().eq(index).show();
		$('input#pageNum').val(index+1);	
	});
	var  c = 1 , w = $('.picpreBox ul li').width()+10 , len  = $('.picpreBox ul li').length;
	$('span.next').click(function(){
		if(!$('.picpreBox ul').is(":animated")){
			if(c<(len-4)){
				$('.picpreBox ul').animate({left: [-c*w,'easeOutCubic']}, 150);		
				c++;
			}
		}
	});
	$('span.prev').click(function(){
		if(!$('.picpreBox ul').is(":animated")){
			if(c!=1){
				$('.picpreBox ul').animate({left: ['+='+w,'easeOutCubic']}, 150);			
				c--;
			}	
		}	
	});
	$('#pageNum').blur(function(){
		var val = $(this).val();
		if(isNaN(val)||val>len){
			//alert('只能输入数字');	
		}else{
			$('.picShow img').hide().eq(val-1).show();	
			$('.picpreBox ul li').eq(val-1).addClass('on').siblings().removeClass('on');
		}
	});
	//回车看图片
	$($('#pageNum')).keyup(function(e){
		if(e.which == "13"){
			var val = $(this).val();
			if(isNaN(val)||val>len){
				//alert('只能输入数字');	
			}else{
				$('.picShow img').hide().eq(val-1).show();	
				$('.picpreBox ul li').eq(val-1).addClass('on').siblings().removeClass('on');
			}
		}
	});
	//左右键事件
	$(document).keydown(function(e){
		if(e.which == "39"){
			if(!$('.picpreBox ul').is(":animated")){
					var pageNum = $("#pageNum").val();
					pageNum = parseInt(pageNum)+1;
					len  = $('.picpreBox ul li').length;
					if(pageNum>len||pageNum<1){
					}else{
					$("#pageNum").val(pageNum);
						$('.picShow img').hide().eq(pageNum-1).show();	
						$('.picpreBox ul li').eq(pageNum-1).addClass('on').siblings().removeClass('on');
					}
					if(!$('.picpreBox ul').is(":animated")){
					if(c<(len-4)){
						$('.picpreBox ul').animate({left: [-c*w,'easeOutCubic']}, 150);		
						c++;
					}
				}
			}
		}
		
		if(e.which == "37"){
			if(!$('.picpreBox ul').is(":animated")){			
					var pageNum = $("#pageNum").val();
					pageNum = parseInt(pageNum)-1;
					len  = $('.picpreBox ul li').length;
					if(pageNum>len||pageNum<1){
					}else{
						$("#pageNum").val(pageNum);
						$('.picShow img').hide().eq(pageNum-1).show();	
						$('.picpreBox ul li').eq(pageNum-1).addClass('on').siblings().removeClass('on');
					}
					if(!$('.picpreBox ul').is(":animated")){
					if(c!=1){
						$('.picpreBox ul').animate({left: ['+='+w,'easeOutCubic']}, 150);			
						c--;	
					}
				}	
			}	
		}
	});
}
//清空所有文本框中的值
function cleatNull(){
	var v = $(".edu_h1 input.uiText").val();
	$(".edu_h1 input.uiText").focus(function(){
		$(this).val('');
	});
	$(".edu_h1 input.uiText").blur(function(){
		if($(this).val() == ''){
			$(this).val(v);
		}
	});
}

//排序
function aOrd(){
	$(".aOrd").toggle(function(){
		$(this).find(".ascDown").removeClass("hover2");
		$(this).find(".ascTop").addClass("hover1");
	},function(){
		$(this).find(".ascTop").removeClass("hover1");
		$(this).find(".ascDown").addClass("hover2");
	});

}
$(function(){
	videoTab();//选择视频tab
	picpreSlide();//图片预览
	cleatNull();//清空所有文本框中的值
	aOrd();//排序
});
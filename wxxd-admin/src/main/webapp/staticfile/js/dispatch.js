/**
 * Description : 账户中心 dispatch.js
 * Created by qiumingchen
 * ID: 12061238
 * Last : 12-10-16 pm 19:30
**/
(function($, myOpen){
	// t: current time, b: begInnIng value, c: change In value, d: duration
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	jQuery.extend( jQuery.easing,{def: 'easeOutQuad',swing: function (x, t, b, c, d) {return c*((t=t/d-1)*t*t + 1) + b;}});
	
	myOpen.uCenter = myOpen.uCenter || {};
	var $MUC = myOpen.uCenter;//快捷方式
	
	/*  基于 myOpen.openWin 方法 的弹出框, 添加了 遮罩等*/
	$MUC.popOpen = function(uiPop, callback){
		var _wW = $(window).width() + 20,
			_bH = $(document).height();
		$.browser.mozilla ? $('body').css({ 'overflow-x' : 'hidden'}) : $('html').css({ 'overflow-x'  : 'hidden'});
		$('#MUC_fullBg').css({width : _wW, height : _bH}).show();
		$('#MUC_ifm').css({width : _wW, height : _bH}).show();
		myOpen.closeWin('uiPop');
		myOpen.openWin(uiPop);
		(typeof callback == 'function') && callback();
		return false;
	}
	
	/*  基于 myOpen.openWin 方法 的弹出框, 添加了 遮罩等*/
	$MUC.popOpen1 = function(nthis,uiPop, callback,o_index){
		var _wW = $(window).width() + 20,
			_bH = $(document).height();
		$.browser.mozilla ? $('body').css({ 'overflow-x' : 'hidden'}) : $('html').css({ 'overflow-x'  : 'hidden'});
		$('#MUC_fullBg').css({width : _wW, height : _bH}).show();
		$('#MUC_ifm').css({width : _wW, height : _bH}).show();
		myOpen.closeWin('uiPop');
		myOpen.openWin1(uiPop,nthis,o_index);
		(typeof callback == 'function') && callback();
		return false;
	}
	
	/*基于 myOpen.closeWin 方法*/
	$MUC.popClose = function(){
		$('#MUC_fullBg, #MUC_ifm').hide();
		myOpen.closeWin('uiPop');
		$('html, body').removeAttr('style');
		return false;
	}
	
	/*从新窗口打开*/
	$MUC.popWind = function(file){
		window.open (file, 'newwindow', 'height=680, width=990, top='+ $(window).height()/6 + ',' + ' left= ' + ($(window).width()/2 - 481) + ', toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no') ;
	}
	
	/*我要发货*/
	$MUC.wyfh = function() {
		$('.xlfather').children('div').each(function(i){
			$(this).load('data/fh_grid/fh_grid_' + i + '.html' , function(){
				try {
					loadCallBacks(i);
				} catch(e) {}
			});
		});/* each end */

		/*load完数据后的回调函数的集合*/
		function loadCallBacks(i) {
			selectPos();
			checkBoth();
           /*2012-11-11 update*/
		/*	$('.fhEdit').click(function(){
				myOpen.uCenter.popOpen('MUC_pop07', myOpen.uCenter.pop07);
			});*/
			
			$('.sec03 .tab div').eq(i).find(':checkbox').click(function(){
				var cuInput = $(this);
				var tr = cuInput.parents('tr');
				cuInput.is(':checked') ? tr.addClass('bgyellow') :  tr.removeClass('bgyellow');
			});
		}
		
		/*select 的 提示框*/
		function selectPos(){
			var _domBuffer 
			$('.fhGrid select').unbind('change').change(function(e){
				 _domBuffer = $(e.target),
					_top = _domBuffer.offset().top >> 0,
					_left = _domBuffer.offset().left >> 0;
						
				$('#MUC_noticeWrap').hide().removeAttr('style').css({
					top : _top + $(e.originalTarget).height() +  ($.browser.msie ? 29 : 12),
					left : _left
				}).show();
				_domBuffer.v = _domBuffer.find(':selected').html();
			});
			
			$('.sec03 .tab dt').click(function(){
				$('#MUC_noticeWrap').hide().removeAttr('style');
			});
			
			$('#MUC_noticeWrap').mouseleave(function(){
				$(this).hide();
			}).mouseenter(function(){
				$(this).show();
			});
			
			
			var MUC_notice = $('#MUC_noticeWrap');
			var btns = MUC_notice.find('a');
			btns.mouseover(function(){
				MUC_notice.show();
			});
			
			var ok = btns.eq(0);
			var cannel = btns.eq(1);
			cannel.click(function(){
				MUC_notice.hide();
			});
			
			ok.click(function(){
				if(_domBuffer) {
					_domBuffer.parent().html(_domBuffer.v);
					MUC_notice.hide();
				} 
			});
			
		}/* func01 end */
	
		/*checkBoth*/
		function checkBoth(){
			$('.fhGrid .checkBoth').click(function(e){
				var _allCbox = $(this).parents('.fhGrid').find(':checkbox');
				$(this).is(':checked') ?  _allCbox.attr('checked' , 'checked' ).parents('tr').addClass('bgyellow')  :  _allCbox.removeAttr('checked').parents('tr').removeClass('bgyellow')  ;
			});
		}
	
		/*发货弹出框中内容*/
			/*合并发货 tab切*/
		$('#mergeTab:eq(0)').children('li').click(function(){
			var _index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.gridWrap2').eq(_index).show().siblings('.gridWrap2').hide();
		});

		var insertRow = '<tr>\n<th>&nbsp</th><td><input type="text" value="" class="uiText"> <a class="uiBtn case6" ac="del"><span>删除</span></a></td>\n</tr>';
		var  dispatch = $('.dispatch:eq(0)');
		var  gridWrap = $('.gridWrap2:eq(0)');
		var MUC_pop08 = $('.MUC_pop08');
		var MUC_pop11 = $('.MUC_pop11');
		
		function delRow(){
			$(this).parents('tr').remove();
			var _buffer = $('.uFromWrap');
			if(_buffer[0]) {
				if(_buffer.find('tr').length < 5) {
					_buffer.removeAttr('style');
				}
			} 
		
		}

		MUC_pop08.find('a[ac="del"]').live('click', delRow);
		MUC_pop11.find('a[ac="del"]').live('click', delRow);
		dispatch.find('.case6[ac="del"]').live('click', delRow);
		gridWrap.find('.case6[ac="del"]').live('click', delRow);
		
		dispatch.find('.case9').click(function(){
			$(this).parent().parent().after(insertRow);
		});

		gridWrap.find('.case9').click(function(){
			$(this).parent().parent().after(insertRow);
		});
		
		$('#pop08Add').click(function(){
			MUC_pop08.find('.uFrom').eq(1).find('tr:last-child').after(insertRow);
			var _this = $(this);
			(_this.parent().parent().siblings('tr').length > 3) && _this.parents('.uFromWrap').css({height :  192,'overflow' : 'auto'});
		})
		
		$('#pop11Add').click(function(){
			MUC_pop11.find('.uFrom').eq(1).find('tr:last-child').after(insertRow);
			var _this = $(this);
			(_this.parent().parent().siblings('tr').length > 3) && _this.parents('.uFromWrap').css({height :  192,'overflow' : 'auto'});
		})
		
		
		/*本次不发送*/
		$('.gridWrap a[ac="del"]').click(function(){
			$(this).parents('.fhGrid').remove();
			($('.gridWrap').find('.fhGrid').length <= 3) && $('.gridWrap').css({overflow : 'visible', 'padding-bottom' : '20px', 'height' : 'auto'});
			return false;
		});

		/*收起*/
		$('.gridWrap2 .uFrom .pack').click(function(){
			var _this =$(this);
			var _bufferDom = _this.parents('.uFrom').find('tr:gt(1)');
			if(!_bufferDom.length) {
				return false;
			} 
			
			if(_bufferDom.eq(0).is(':visible')) {
				_bufferDom.hide();
				_this.css({'background-position' : ' 0 -101px'})
			} else {
				_bufferDom.show();
				_this.removeAttr('style');
			}
		})
	}
	
	/*textArea普通交互效果*/
	$MUC.textArea = function(obj){
		var textArea = obj;
		var defaultvalue=textArea.attr("def");
		textArea.focus(function(){
			($(this).val() == defaultvalue) && $(this).val('');
			$(this).css({ color : '#333'});
		}).blur(function(){
			($.trim($(this).val())==='') && $(this).val(defaultvalue);
			$(this).removeAttr('style');
		});
	}
	
	/*textArea普通交互效果*/
	$MUC.textArea2 = function(obj){
		var textArea = obj;
		var defaultvalue=textArea.attr("def");
		textArea.focus(function(){
			($(this).val() == defaultvalue) && $(this).val('');
			$(this).css({ color : '#333'});
		}).blur(function(){
			($.trim($(this).val())==='') && $(this).val(defaultvalue);
			$(this).removeAttr('style');
		});
	}


	/*添加公司名称&运单编号*/
	$MUC.gsbh = function(){
		var _row = [];
		_row[0] =	'<tr rel="temp">';
		_row[1] =	'<th><input type="checkbox" name="" /></th>';
		_row[2] =	'	<th>';
		_row[3] =	'		<select>';
		_row[4] =	'			<option value="">申通快递</option>';
		_row[5] =	'			<option value="">韵达快递</option>';
		_row[6] =	'		</select>';
		_row[7] =	'	</th>';
		_row[8] =	'	<td><input type="text" class="uiText"></td>';
		_row[9] =	'	<td>至</td>';
		_row[10] =	'	<td><input type="text" class="uiText"></td>';
		_row[11] =	'</tr>';
		_sRow = _row.join('\n');
		
		$('.MUC_pop08 .addRow').click(function(){
			var _targetTr = $('.MUC_pop08 .ydGrid').find('tr:last');
			_targetTr.after(_sRow);
		})
		
		// 全选 || 全不选
		$('.allCheck :checkbox').change(function(){
			var _allCbox = $(this).parents('.ydGrid').find(':checkbox');
			$(this).is(':checked') ?  _allCbox.attr('checked' , 'checked' ) :  _allCbox.removeAttr('checked') ;
		})
		
		$('.pop08Del').eq(0).click(function(){
			var _it = $('.MUC_pop08 tbody :checkbox:checked');
			_it.parent().parent().remove();
			return false;
		})
	}
		
	/*弹出层 callback
    $MUC.pop07 = function(){
        var radio = $('.MUC_pop07 .radioWrap :radio');
        radio.change(function(){
            var radioWrap = $(this).parent();
           if($(this).next().html() == '延迟发货'){
             $(this).parent().after('<div class="textArea mb10 offPage">下次发货时间：\t<input type="text" class="uiText" value="">\t</div>');
           } else {
             $(this).parent().siblings('.offPage').hide();
           }
        });
    }*/
		/*添加公司名称&运单编号 */
	$MUC.pop08 = function(){
		$('.MUC_pop08 .ydGrid').find('tr[rel="temp"]').remove() ;
		$('.uiPop :checkbox').removeAttr('checked');
		$('.uFromWrap').removeAttr('style').find('tr:gt(0)').remove();

	}
		/*权限分配*/
	$MUC.pop09 = function(){
		$('.uiPop .nextBox').html('');
		$('.uiPop :checkbox').removeAttr('checked');
	}

    /*2012-11-11 update*/
    $MUC.choice = function(){
        var choiceWrap =   $('.fhWrap .sec02 .first'),
            choiceBtn = choiceWrap.children('.choiceBtn'),
			sel = $('.sel'),
             _top;
        choiceBtn.toggle(function(){
            $(this).parent(choiceWrap).siblings().show();
			$(this).next(sel).hide();
			$(this).next().next(".tipTxtAfton2").hide();
            $(this).children('s').css({'border-color' : '#fff #fff #3377CC'});
            if($.browser.msie && ($.browser.version == "7.0") || ($.browser.version == "8.0")) {
                _top = '2px';
                $(this).children('s').css({ 'border-bottom' : '5px solid #3377cc'})
            }  else {
                _top = '3px';
            }
            $(this).children('s').css({ 'top' : _top});
        }, function(){
             $(this).parent(choiceWrap).siblings().hide();
			$(this).next(sel).show();
			$(this).next().next(".tipTxtAfton2").show();
            $(this).children('s').removeAttr('style');
        })
    }
//2012-11-22 zhangxiaolong
function xlTab(){
	$(".sec03 .tab dt").click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings("dt").removeClass("on");
		$("#fh_grids .xlfather").eq(index).removeClass("hide").siblings().addClass("hide"); 
	});
}

//鉴定
function verticalmiddle(){
	$(".verticalmiddle").click(function(){
		$(this).attr("checked","checked").siblings("input").attr("checked",false);
		$(".dispatch001").eq($(this).index()).show().siblings(".dispatch001").hide();
	})
}

//地址本 实现删除效果
function placeTable(){
	$(".placeTable").hover(function(){
		$(this).find("a").show();
	},function(){
		$(this).find("a").hide();
	});
	//删除功能
	$(".placeTable a.del").click(function(){
		$(this).parents(".placeTable").remove();
	});
}

/*选择苏宁物流配送
function suningCenterPass(){
	//判断浏览器
	if($.browser.msie){
		$(".suningCenterPass")[0].onpropertychange = function(){
			if($(this).find("option:selected").html() == "苏宁物流配送"){
				$(this).parents(".uFrom").next(".sports2").show();
			}else{
				$(this).parents(".uFrom").next(".sports2").hide();
			}
		}
	}else{
		$(".suningCenterPass").change(function(){
			if($(this).find("option:selected").html() == "苏宁物流配送"){
				$(this).parents(".uFrom").next(".sports2").show();
			}else{
				$(this).parents(".uFrom").next(".sports2").hide();
			}
		});
	}
}*/

//点击表格头部实现排序功能
function ascOrDec(){
	$(".dataTable .clickArea").toggle(function(){
		$(".ascTop",this).addClass("hover1");
		$(".ascDown",this).removeClass("hover2");
	},function(){
		$(".ascDown",this).addClass("hover2");
		$(".ascTop",this).removeClass("hover1");
	});
}

//选择其他日期弹出日期选择框
function dateTCK(){
	$(".fiveTab:visible .dateTCK").change(function(){
		var current = $(".fiveTab:visible .dateTCK option:selected").text();
		if(current == "其他"){
			myOpen.uCenter.popOpen('MUC_pop18', myOpen.uCenter.pop18);
		}
	});
}

//批量异常的checkbox切换
function radioWrap2(){
	$(".radioWrap2 input[type='radio']").click(function(){
		if($(this).index() == 1){
			$(this).parents(".radioWrap2").next().show();
		}else{
			$(this).parents(".radioWrap2").next().hide();
		};
	});
}

//六个tab切换
function sixTabArea(){
	$(".sixTabArea li").click(function(){
		$(".fiveTab").hide();
		$(".sixTabArea li").removeClass("on");
		$(".fiveTab").eq($(this).index()).show();
		$(this).addClass("on");
		dateTCK();//选择其他日期弹出日期选择框
		$(".redd").hide();
	});
}

//点击修改
function iEditing(){
	$("#MUC_pop21 .case7").click(function(){
		$("#MUC_pop21 .edting001").hide();
		$("#MUC_pop21 .edting002").show();
	});
	$("#MUC_pop21 .case3").click(function(){
		$("#MUC_pop21 .edting001").show();
		$("#MUC_pop21 .edting002").hide();
	});
}

//处理方式 checkbox 切换
function chuli(){
	$(".gobackPlane span input[name = sn]").click(function(){
		if($(this).parent().index() == 2){
			$(this).parents(".gobackPlane").next(".edting002").show();
		}else{
			$(this).parents(".gobackPlane").next(".edting002").hide();
		}
	});
	$(".sn1").click(function(){
		$(".MUC_pop25 .peploneTable").show();
	});
	$(".sn2").click(function(){
		$(".MUC_pop25 .peploneTable").hide();
	});
}
//延长收货时间
function bUp(){
	$(".b-up").toggle(function(){
		$(this).text("展开");
		$(this).parents("tr").next().hide();
	},function(){
		$(this).text("收起");
		$(this).parents("tr").next().show();
	});
}
//点击最后一个li
function liLast(){
	//点击li 切换表格
	$(".new-sixTabArea li").click(function(){
		$(".baby-001").hide();
		$(".baby-001").eq($(this).index()).show();		
	});
	//换标题
	$(".sixTabArea2 li").click(function(){
		if($(this).index() == 0){
			$(".word-title").text("等待发货的订单");
		}else{
			$(".word-title").text("已发货的订单");
		}
	});
}
//计算字数
inputTxtTip = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<501){
			t.find('i').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,500);
			$(this).val(_aT);
		}
	});
};
//全站通用的文本框中的默认文字效果展示与清空
function wbkWord(obj){
	var i;
	obj.focus(function(){
		 i = $(this).attr("rel");
		if($(this).val() == i || $(this).val() == ''){
			$(this).val('');
			$(this).css({"color":"#333"});
		};
	});
	obj.blur(function(){
		if($(this).val() == ''){
			$(this).val(i);
			$(this).css({"color":"#999"});
		};
	});
}
//展开所有快递
function otherexpress(){
	var flag = true;
	$(".otherexpress").click(function(){
		if(flag){
			$(".other-express").show();
			$(this).find("span").text("收起更多");
			setIsIframe();
			flag = false;
		}else{
			$(".other-express").hide();
			$('.other-express:lt(4)').show();
			$(this).find("span").text("查看更多物流公司");
			setIsIframe();
			flag = true;
		}
	});
}
// 高度自适应
function setIsIframe(){
	var pframs = parent.parent.frames.document.getElementById("content").contentWindow;
	pframs.setiFrameHeight(document.body.offsetHeight);
}
//选择物流
function choiceWuliu(){
	$(".choicing").click(function(){
		$(this).parent().parent().next().toggle();
	});
	//展开所有物流公司
	$(".otherexpress2").click(function(){
		$(".choicing").parent().parent().next().hide();
		$(".other-wuliu-company").toggle();
		if($(this).find("span").text() == "查看更多快递公司"){
			$(this).find("span").text("收起更多");
		}else{
			$(this).find("span").text("查看更多快递公司");
		}
	});
}
//物流编号
function wuliuCode(){
	$(".wuliu-code-area").click(function(){
		$(".wuliu-code-area.wuliu-code-area-on").removeClass("wuliu-code-area-on");
		$(this).addClass("wuliu-code-area-on");
	});
	//修改
	$(".ediing").click(function(){
		$(this).parents(".three-p").next().show();
		$(this).parents(".three-p").hide();
	});
	//返回
	$(".ediing-ok").click(function(){
		$(this).parents(".three-p").prev().show();
		$(this).parents(".three-p").hide();
	});
	//查看详情
	$(".gengzong-table tr").hover(function(){
		$(this).find(".viewing-down-details").css({"visibility":"visible"});
	},function(){
		$(this).find(".viewing-down-details").css({"visibility":"hidden"});
	});
	$(".viewing-down-details").click(function(){
		$(this).parent().parent().next().toggle();
	});
}
//收件人与寄件人
function sOrJ(){
	//使用新的地址
	$(".shiyong-new-place").click(function(){
		$(this).parent().next().toggle();
		setIsIframe();
	});
	//展开查看更多常用寄件地址
	$(".chakan-more-palce").click(function(){
		var v = $(this).text();
		if(v == "展开查看更多常用寄件地址"){
			$(this).text("收起更多");
		}else{
			$(this).text("展开查看更多常用寄件地址");
		}
		$(this).parent().next(".more-express-place").toggle();
		setIsIframe();
	});
	$(".chakan-more-palce2").click(function(){
		var v = $(this).text();
		if(v == "展开查看更多常用收件地址"){
			$(this).text("收起更多");
		}else{
			$(this).text("展开查看更多常用收件地址");
		}
		$(this).parent().next(".more-express-place").toggle();
		setIsIframe();
	});
}
//确认收货信息并填写运单号
function upOrDown(){
	$(".uping").toggle(function(){
		$(this).addClass("uping2");
		$(this).parents(".shouhuo-table").parent().parent().siblings().hide();
	},function(){
		$(this).removeClass("uping2");
		$(this).parents(".shouhuo-table").parent().parent().siblings().show();
	});
}
//全站统一的提示框
function webTips(){
	var time = null;
	$(".web-tips").hover(function(){
		clearTimeout(time);
		$(".web-tips-on").removeClass("web-tips-on");
		obj = $(this);
		obj.addClass("web-tips-on");
	},function(){
		time = setTimeout(function(){
			obj.removeClass("web-tips-on");
		},100);
	});
}
//点击更多收起
function clickMore(){
	$(".web-tips").click(function(){
		$(this).parent().siblings(".datap").toggle();
	});
}

//点击展开与收起
function clickTableImg(){
	$(".pro-jquery-result img").click(function(){
		$(this).attr("src") == "images/jian.png" ? $(this).attr("src","images/jia.png") : $(this).attr("src","images/jian.png");
		$(this).parents("tr").nextUntil(".parent-tr").toggle();
	}); 
}


	
/*readly*/
	$(function(){
		/*我要发货*/http://sale.suning.com/images/advertise/001/1133super0/index.html
		$MUC.wyfh();
		/*textArea普通交互效果*/
		$MUC.textArea($('.textArea textarea:not(.textAreaYuanyin textarea)'));
		$MUC.textArea2($('.textAreaYuanyin textarea'));
		/*添加公司名称&运单编号*/
		$MUC.gsbh();
        $MUC.choice();
		/*日期组件*/
		xlTab();//送货tab
		verticalmiddle();//鉴定
		placeTable();//地址本 实现删除效果
		//suningCenterPass();//选择苏宁物流配送
		dateTCK();
		radioWrap2();
		sixTabArea();
		iEditing();
		chuli();
		ascOrDec();//点击表格头部实现排序功能
		bUp();
		liLast();
		inputTxtTip($('#zxlarea'),$('#zxlcount'));
		wbkWord($(":input:not(select)"));
		otherexpress();
		choiceWuliu();
		wuliuCode();
		sOrJ();
		upOrDown();
		webTips();
		clickMore();
		clickTableImg();
	})
})(jQuery, myOpen);
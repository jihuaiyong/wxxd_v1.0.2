/**
 * Description : 账户中心 ucenter.js
 * Created by qiumingchen
 * ID: 12061238
 * Last : 12-10-16 pm 15:01
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
	
	/*基于 myOpen.closeWin 方法*/
	$MUC.popClose = function(){
		$('#MUC_fullBg, #MUC_ifm').hide();
		myOpen.closeWin('uiPop');
		$('html, body').removeAttr('style');
		return false;
	}
	
	/*修改用户*/
	$MUC.changeUser = function(){
		$('.MUC_pop03 .error').css({left : $.browser.mozilla ? 26 : 20}) 
		/*日期组件*/
		ECode.calendar({inputBox:"#date1",showbox:"#dateinput1",flag:false});
		ECode.calendar({inputBox:"#date2",showbox:"#dateinput2",flag:false});
		ECode.calendar({inputBox:"#date3",showbox:"#dateinput3",flag:false});
	}
	
	/*权限分配*/
	$MUC.jsfp = function(){
		/*树状菜单 初始化*/	
		$(".filetree li ul").hide();
	
		/*树状菜单 行为*/
		$(".filetree li s, .filetree li span").click(function(e){
			var _this = $(this);
			var _s = _this.is('s');
			var _bufferS = _s ? _this : _this.siblings('s');
			var _bufferUl = _this.siblings('ul');
			_bufferS.hasClass('c') ? _bufferS.removeClass('c') : _bufferS.addClass('c');
			_bufferUl.is(':visible') ? _bufferUl.hide() : _bufferUl.show();
			e.stopPropagation();
		})

		/* 全选*/
		$('.allCheck :checkbox').change(function(){
			var _allCbox = $(this).parent().siblings().find(':checkbox').filter(':not(:disabled)');
			$(this).is(':checked') ?  _allCbox.attr('checked' , 'checked' ) :  _allCbox.removeAttr('checked') ;
		})
		
		/*权限分配tab切*/
		$('.tabMenu a').click(function(){
			var _index = $(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$(this).parent().siblings('.tabWrap').eq(_index).show().siblings('.tabWrap').hide();
			$MUC.pop09();
		})
		
		var _pop09 = $('.MUC_pop09:eq(0)');
		var _pop10 = $('.MUC_pop10:eq(0)');
		
		/* 第一种 左右容器转移 */
		pushOrDel(_pop09);
		pushOrDel(_pop10);
		
		/* 第二种 左右容器转移 */
		pushOrDel2(_pop10);
		pushOrDel2(_pop09);
		
		/* 第一种 左右容器转移 */
		function pushOrDel(popbox) {
			var _nextMap;
			var _tempArr = [];
			var _push = popbox.find('td .case6').eq(0);
			var _delete = popbox.find('td .case6').eq(1);
			var _nexBox = popbox.find('td.next>.treeBox');
			
			//左边范围控制
			popbox.find('.treeBox :checkbox').change(function(){
				var _this = $(this);
				var _tempUl = _this.siblings('ul');
				var targetCb = _tempUl.find(':checkbox').filter(':not(:disabled)');
				targetCb.attr('checked') ? targetCb.removeAttr('checked') : targetCb.attr('checked', 'checked');

				if(_this.attr('level') == 'l3') {
					var l1 = _this.parents('li[level="l1"]');
					var l2 = _this.parents('li[level="l2"]');
					if(l2.find(':checkbox[level="l3"]').length == l2.find(':checked[level="l3"]').length) {
						l2.find(':checkbox[level="l2"]').attr('checked', 'checked');
						(l1.find(':checkbox[level="l2"]').length == l1.find(':checked[level="l2"]').length) ? l1.find(':checkbox[level="l1"]').attr('checked', 'checked') : l1.find(':checkbox[level="l1"]').removeAttr('checked');
					} else {
						l2.find(':checkbox[level="l2"]').removeAttr('checked');
						l1.find(':checkbox[level="l1"]').removeAttr('checked');
					}
				} /*end if */

				if(_this.attr('level') == 'l2'){
					var l1 = _this.parents('li[level="l1"]');
					 (l1.find(':checkbox[level="l2"]').length == l1.find(':checked[level="l2"]').length) ? l1.find(':checkbox[level="l1"]').attr('checked', 'checked') : l1.find(':checkbox[level="l1"]').removeAttr('checked');
				} /*end if */

			})
			
			
			
			//右边范围控制
			popbox.find('.nextBox :checkbox').live('click', function(){
				var _checkbox = $(this).parents('.nextBox').find(':checkbox');
				var _checked = $(this).parents('.nextBox').find(':checked');
				(_checkbox.length == _checked.length) ? popbox.find('.next :checkbox').attr('checked' , 'checked') : popbox.find('.next .allCheck :checkbox').attr('checked' , '');
			})
			
			_push.unbind('click').click(function(){
				_nextMap = [];
				_tempArr = [];
				popbox.find('.treeBox :checked').each(function(){
					var _this = $(this);
					var _span = _this.siblings('span');
					try {
						var _sUri = _this.parents('ul').find('.folder')[1].innerHTML+ ' — ' + _this.parents('ul').find('.folder')[0].innerHTML;/*构造DOM片段*/
						if(_span.hasClass('file')) {
							_this.data('index', _tempArr.length);/*在JQ对象中打标记*/
							_tempArr.push(_this);/*缓存jq对象*/
							_nextMap.push('<span><input type="checkbox" rel="' + _this.data('index') + '"\t>' + _sUri + ' — — ' + _span.html() + '</span>');
							/*console.log(_this, _this.data('index'));//debug*/
							_this.attr('disabled', 'disabled');
						}
					} catch(e){}
				})
				_nexBox.eq(0).html(_nextMap.join('\n'))
				return false;
			})
			
			_delete.click(function(){
				var _checkbox = $(this).parent().siblings('.next').find('.nextBox :checkbox');
				var _checked = $(this).parent().siblings('.next').find('.nextBox :checked');
				var _tempCbox = null;
				(_checkbox.length == _checked.length) && popbox.find('.next .allCheck :checkbox').attr('checked' , '');
				popbox.find('.nextBox :checked').each(function(){
					/*console.log(_tempArr, $(this).attr('rel'));//debug*/
					 _tempCbox = $(this);
					$.each(_tempArr, function(i, o){
						(o.data('index') == _tempCbox.attr('rel')) && o.removeAttr('disabled').removeAttr('checked').parents('ul').siblings(':checked').removeAttr('checked');
					})
					$(this).parent('span').remove();
				})
				return false;
			})
		}/*权限分配 end*/
		
		/* 第二种 左右容器转移 */
		function pushOrDel2(popbox){
			var  _nextMap;
			var _push = popbox.find('td .case6[ac="sy"]');
			var _delete = popbox.find('td .case6[ac="del"]');
			
			//左边范围控制
			popbox.find('.pre .tableBox  :checkbox').click(function(){
				var _checkbox = $(this).parents('.pre').find('.tableBox :checkbox');
				var _checked = $(this).parents('.pre').find('.tableBox :checked');
				(_checkbox.length == _checked.length) ? popbox.find('.pre .allCheck :checkbox').attr('checked' , 'checked') : popbox.find('.pre .allCheck :checkbox').attr('checked' , '');
			})
			//右边范围控制
			popbox.find('.next .tableBox :checkbox').click(function(){
				var _checkbox = $(this).parents('.next').find('.tableBox :checkbox');
				var _checked = $(this).parents('.next').find('.tableBox :checked');
				(_checkbox.length == _checked.length) ? popbox.find('.next .allCheck :checkbox').attr('checked' , 'checked') : popbox.find('.next .allCheck :checkbox').attr('checked' , '');
			})
			
			_push.click(function(){
				var next =  $(this).parent().siblings('.next');
				var pre =  $(this).parent().siblings('.pre');
				_nextMap = [];
				_tempArr = [];
				pre.find('.tableBox :checked').each(function(){
					var _this = $(this);
					_this.data('index', _tempArr.length);/*在JQ对象中打标记*/
					_tempArr.push(_this);/*缓存jq对象*/
					_this.attr('rel', _this.data('index')).removeAttr('disabled');/*在dom节点上打标记*/
					_nextMap.push('<tr>' + $(this).parent().parent().html() + '</tr>');
					console.log(_this, _this.data('index'));//debug
					_this.attr('disabled', 'disabled');
				})
				next.find('.nextBox').html(_nextMap.join('\n')).find(':checkbox').removeAttr('checked');
				
				return false;
			})
			
			_delete.click(function(){
				var _checkbox = $(this).parent().siblings('.next').find('.nextBox :checkbox');
				var _checked = $(this).parent().siblings('.next').find('.nextBox :checked');
				(_checkbox.length == _checked.length) && popbox.find('.next .allCheck :checkbox').attr('checked' , '');
			
				popbox.find('.nextBox :checked').each(function(){
					//console.log(_tempArr, $(this).attr('rel'));//debug
					 _tempCbox = $(this);
					$.each(_tempArr, function(i, o){
						(o.data('index') == _tempCbox.attr('rel')) && o.removeAttr('disabled').removeAttr('checked').parents('ul').siblings(':checked').removeAttr('checked');
					})
					
					$(this).parent().parent().remove();
				})
				return false;
			})
		}
		
	}
	

	/*弹出层 callback*/
		/*权限分配*/
	$MUC.pop09 = function(){
		$('.uiPop .nextBox').html('');
		$('.uiPop :checkbox').removeAttr('disabled').removeAttr('checked');
	}
	
/*readly*/
	$(function(){
		/*修改用户*/
		$MUC.changeUser();
		/*权限分配*/
		$MUC.jsfp();
	})
})(jQuery, myOpen);
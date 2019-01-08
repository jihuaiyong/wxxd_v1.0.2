$(function(){
	//condition dropdwon
	$('#condition .drop-pinlei .dropdown-menu').on('click', function(evt){
		evt.stopPropagation();
	})

	
	$('#condition .drop-pinlei .checkAll').on('change', function(){
		var is_checked = this.checked;
		$('#condition .drop-pinlei .itemH input').each(function(){
			$(this)[0].checked = is_checked;
		})
	})
	$('#condition .drop-pinlei .itemH input').on('change', function(){
		var is_all;
		var $aInput = $('#condition .drop-pinlei .itemH input');
		for(var i=0,len=$aInput.length; i<len; i++){
			if($aInput.eq(i).is(':checked')){
				is_all = true;
			}else{
				is_all = false;
				break;
			}
		}
		if(is_all){
			$('#condition .drop-pinlei .checkAll')[0].checked = true;
		}else{
			$('#condition .drop-pinlei .checkAll')[0].checked = false;
		}
	})

	$('#condition .drop-pinlei .btn-sure').on('click', function(){
		var $dropdown = $(this).parents('.dropdown');
		var aCheck = [];

		$dropdown.find('.itemH input').each(function(){
			if(this.checked){
				aCheck.push($(this).parent().text());
			}
		})
		console.log(aCheck)

		var is_all = $dropdown.find('.checkAll').is(':checked');
		var str_tips;
		if(is_all){
			str_tips = '全部品类';
		}else{
			str_tips = aCheck.join(',');
			str_tips.length > 10 ? (str_tips = str_tips.substr(0, 8) + '...') : void(0);
		}

		$dropdown.removeClass('open');
		$dropdown.find('.innerBtn>span').text(str_tips)
	})


	//20161018 daqu tr hover
	var $chartPop = $('.chart-pop');
	var timer_mouseleave;
	$('#tabH .daqu .dropDown .tr').on('mouseenter', function(){
		var oDate = $(this).data('chart');
		var _name = $(this).find('.subTd').eq(0).text();
		$('#chart-pop__name').html(_name);

		$chartPop.find('.child__item').eq(0).find('.bar').css('width', oDate.mendian.per);
		$chartPop.find('.child__item').eq(0).find('.per').html(oDate.mendian.per);
		$chartPop.find('.child__item').eq(0).find('.money').html(oDate.mendian.num);

		$chartPop.find('.child__item').eq(1).find('.bar').css('width', oDate.yigou.per);
		$chartPop.find('.child__item').eq(1).find('.per').html(oDate.yigou.per);
		$chartPop.find('.child__item').eq(1).find('.money').html(oDate.yigou.num);

		$chartPop.find('.child__item').eq(2).find('.bar').css('width', oDate.tianmao.per);
		$chartPop.find('.child__item').eq(2).find('.per').html(oDate.tianmao.per);
		$chartPop.find('.child__item').eq(2).find('.money').html(oDate.tianmao.num);

		$chartPop.find('.child__item').eq(3).find('.bar').css('width', oDate.dianxiao.per);
		$chartPop.find('.child__item').eq(3).find('.per').html(oDate.dianxiao.per);
		$chartPop.find('.child__item').eq(3).find('.money').html(oDate.dianxiao.num);

		clearTimeout(timer_mouseleave);
		var _top = $(this).offset().top + 50;
		$chartPop.show().css('top', _top + 'px');
	}).on('mouseleave', function(){
		timer_mouseleave = setTimeout(function(){
			$chartPop.hide();
		}, 300);				
	})
	$chartPop.on('mouseenter', function(){
		clearTimeout(timer_mouseleave);
	}).on('mouseleave', function(){
		timer_mouseleave = setTimeout(function(){
			$chartPop.hide();
		}, 300);				
	})

})
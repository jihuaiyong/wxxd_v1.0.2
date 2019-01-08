$(function(){

	//search
	var config_locale = {
		"format": 'YYYY/MM/DD',
		"applyLabel": "确定",
		"cancelLabel": "取消",
		"fromLabel": "起始时间",
		"toLabel": "结束时间'",
		"customRangeLabel": "自定义",
		"today": "今日",
		"daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
		"monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
	};
	$('#time-during').daterangepicker({
		locale: config_locale
	})

	$('.search .insertBox .preview').on('click', function(e){
		e.stopPropagation();

		var $self = $(this);
		var $dialog = $(this).next();

		$dialog.toggleClass('active');

		if($dialog.hasClass('active')){
			//show
			var $textarea = $dialog.find('.area-insert')
			$textarea.focus();

			var oVal = $self.html().split(';').join('\n');
			$textarea.val(oVal)
		}
	})
	$('.search .insertBox .dialog').on('click', function(e){
		e.stopPropagation();
	})

	$('.search .insertBox .dialog .btn-sure').on('click', function(){
		var $dialog = $(this).parents('.dialog');
		var $preview = $dialog.prev();

		$dialog.toggleClass('active');
		var _val = $dialog.find('.area-insert').val().trim();
		if(_val !== ''){
			var oVal = _val.split('\n').join(';').replace(/\s/g, '');
			$preview.html(oVal)
		}else{
			$preview.html('')
		}

	})
	$('.search .insertBox .dialog .btn-cancel').on('click', function(){
		var $dialog = $(this).parents('.dialog');

		$dialog.toggleClass('active');
	})
	$(document).on('click', function(){
		$('.search .insertBox .dialog').removeClass('active');
	})

	$('.search .btn-more').on('click', function(){
		$(this).parents('.search').toggleClass('more');
	})

	$('.search .btn-reset').on('click', function(){
		$('.search .insertBox .preview').html('');
	})

	$('.search .btn-search').on('click', function(){
		$('.pop, .pop .loading').show();

		setTimeout(function(){
			$('.pop, .pop .loading').hide();
		}, 1500);
	})

	$('.btnGroup .btnItem').on('click', function(){
		if($(this).hasClass('active')) return;

		$(this).addClass('active').siblings().removeClass('active');
		$(this).parent().attr('data-check', $(this).text())
	})

	//total
	$('.total .tableH .icon-down').on('click', function(){
		$(this).toggleClass('active').parents('tbody').find('.detail').toggleClass('hidden');
	})

	//help
	$('.search .help .icon-question-circle').on('click', function(){
		$(this).next().toggle();
	})
	$('.search .help .btn-iknowe').on('click', function(){
		$(this).parents('.con').hide();
	})
})
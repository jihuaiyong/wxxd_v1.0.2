function submit_pagedForm(obj) {
	var $form = $(obj).closest("form");
	var page = $form.find("input[name='page']").val();
	if (!isNumber(page)) {
		layer.tip("请填写数字");
		return false;
	}
	var totalPages = $form.find("input[name='totalPages']").val();
	
	if (parseInt(page) > parseInt(totalPages) || parseInt(page) <1) {
		layer.tip("填写的页数不能大于"+totalPages+"且不能小于1");
		return false;
	}
    $form.submit();
}

function search_pagedForm(page, obj) {
	var $form = $(obj).closest("form");
	$form.find("input[name='page']").val(page);
	$form.submit();
}

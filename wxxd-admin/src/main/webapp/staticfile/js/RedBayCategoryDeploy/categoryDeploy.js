
function checkAll(obj){
	$("input[type=checkbox][name=Id]").attr("checked",obj.checked);
}

function delCategory(){
	var selectedCheckBoxes = $("input[type=checkbox][name=Id]:checked");
	var id = selectedCheckBoxes[0].value;
	if(selectedCheckBoxes.length<=0){
		alert("请选择一条记录！");
		return;
	}
	if (!confirm("确认要删除？")) {
            return;
        }
	for (var i = 1;i<selectedCheckBoxes.length;i++) {
		id = id + "#" +selectedCheckBoxes[i].value;
	}
	$.ajax({
		type:"POST",
		url:"catgoryDeployBatchDel.action",
			data:{"id":id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					doSearch();
			}else{
					alert('删除失败!');
					doSearch();
			}
		}
	});
}

var reBool = false;
function valNewCategory(){
	reBool = false;
	var category = $("#newCategory").val();
	if(category.length > 5) {
		$("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类最长5个字符!</i>');
		return;
	}
	if (category == null || category == '') {
	    $("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类不能为空</i>');
		return;
	} else {
	    $("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipTxt"></em>');
	}

	$.ajax({
		type:"POST",
		url:"categoryCount.action",
		data:{'category':category},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#newCategorySpan").empty();
				$("#newCategorySpan").append('<em class="tipOK4"></em>');
				reBool = true;
			} else {
			    $("#newCategorySpan").empty();
				$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类已存在</i>');
				reBool = false;
			}
		}
	});
	return reBool;
}

function addCategory(){
	var category = $("#newCategory").val();
	if(category.length > 5) {
		$("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类最长5个字符!</i>');
		return;
	}
	if("" == $("newCategory").val()){
		$("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类不能为空</i>');
		return;
	}
	if(!reBool){
		$("#newCategorySpan").empty();
		$("#newCategorySpan").append('<em class="tipFalse4"></em><i class="hongse">品类已存在：请修改</i>');
		return;
	}

	$.ajax({
			type:"POST",
			url:"categoryAdd.action",
			data:{'category':category},
			success:function(flag){
				if(flag == '1'){
					alert('新增成功!');
					doSearch();
				}
			}
	});
}

function delOne(id){
	$.ajax({
			type:"POST",
			url:"categoryDel.action",
			data:{'id':id},
			success:function(flag){
				if(flag == '1'){
					alert('删除成功!');
					doSearch();
				}
			}
	});
}

function openWin(c){
	var obj = $("."+c);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
};

function openEditWin(obj,id){
	var categoryEdit = $("#categoryEdit");
	$("#closeCategoryEditBtn").click(function(){
		    categoryEdit.hide();
			$(obj).find("span").text("修改");
			$(obj).removeClass("tijiao");
			$(obj).addClass("goback");
		});
	$.ajax({
			type:"POST",
			url:"categoryUpdateForDate.action",
			data:{'id':id},
			success:function(flag){
                var zhi = eval("(" + flag + ")");
                $("#categoryHidden").val(zhi.category);
                $("#category2").val(zhi.category);
                $("#id2").val(zhi.id);
			}
	});

	categoryEdit.show();
	categoryEdit.css({top:($(window).height()-categoryEdit.height())/2+$(window).scrollTop()+"px"});
}

function closeEditWin(c)
{
	$("#"+c).hide();
}

var reBool2 = false;
function valCategory2(){
	var category = $("#category2").val();
	var categoryHidden = $("#categoryHidden").val();
	if(category.length > 5) {
		$("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">品类最长为5个字符！</i>');
		return false;
	}
	if (category == null || category == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">品类不能为空</i>');
		return false;
	} else {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipTxt"></em>');
	}
	$.ajax({
		type:"POST",
		url:"categoryCount.action",
		data:{'category':category},
		async:false,
		success:function(flag){
			if (flag <=0) {
			    $("#updateSpan").empty();
				$("#updateSpan").append('<em class="tipOK4"></em>');
				reBool2 = true;
			} else {
				$("#updateSpan").empty();
				if(categoryHidden == category) {
			    	$("#updateSpan").append('<em class="tipOK4"></em>');
			    	reBool2 = true;
			    } else {
			    	$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">key已存在：请修改</i>');
			    	reBool2 = false;
			    }
			}
		}
	});
	return reBool2;
}


function checkBeforeUpdate(){
	var category = $("#category2").val();
	var categoryHidden = $("#categoryHidden").val();
	$.ajax({
		type:"POST",
		url:"categoryCount.action",
		data:{'category':category},
		async:false,
		success:function(flag){
			if (flag <=0) {
				reBool2 = true;
			} else {
				$("#updateSpan").empty();
				if(categoryHidden == category) {
			    	reBool2 = true;
			    } else {
			    	reBool2 = false;
			    }
			}
		}
	});
	return reBool2;
}

function updateCategory(){
	$("#updateSpan").empty();
    var id = $("#id2").val();
	var category = $("#category2").val();
	if(category.length > 5) {
		$("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">品类最长为5个字符！</i>');
		return false;
	}
	if (category == null || category == '') {
	    $("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">品类不能为空</i>');
		return false;
	} 

	checkBeforeUpdate();
	if(!reBool2){
		$("#updateSpan").empty();
		$("#updateSpan").append('<em class="tipFalse4"></em><i class="hongse">品类已存在：请修改</i>');
		return;
	}
	
	
	$.ajax({
			type:"POST",
			url:"categoryUpdate.action",
			data:{'id':id,'category':category},
			success:function(flag){
				if(flag == '1'){
					alert('修改成功!');
					doSearch();
				}else{
					alert('主键冲突修改失败!');
					doSearch();
				}
			}
	});
}


function doRefresh(){
	var formPage = document.form1;
	if( formPage.page.value<1 ){
			formPage.page.value=1;
		}
	formPage.submit();
}

function doSearch(){
	var formPage = document.form1;
	formPage.page.value=1;
	formPage.submit();
}



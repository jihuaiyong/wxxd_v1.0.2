// 打开弹出窗口
function openIframeWindow(title, height, width, url) {
	// 设置遮蔽罩的高度和宽度、并展示
	var grayLayer = $("#grayLayer");
	grayLayer.css({
		display : "block",
		width : $(window).width() + "px",
		height : $(document).height() + "px"
	});
	grayLayer.find("iframe").css({
		display : "block",
		width : $(window).width() + "px",
		height : $(document).height() + "px"
	});

	// 设置标题
	$("#popWindowTitle").text(title);

	// 设置iframe的高度和宽度、url、并展示
	var _iframe = $("#popWindowIframe");
	if (-1 == url.indexOf("?")) {
		url = url + "?cache=" + Math.random();
	} else {
		url = url + "&cache=" + Math.random();
	}
	_iframe.attr("src", url);
	_iframe.css("width", width - 10).css("height", height - 40);

	// 设置div的高度和宽度、url、相对位置并展示
	var _div = $("#popWindowDiv");
	_div.css("width", width).css("height", height).css(
			{
				top : ($(window).height() - _div.height()) / 2
						+ $(window).scrollTop() + "px",
				left : ($(window).width() - _div.width()) / 2
						+ $(window).scrollTop() + "px"
			}).show();
}

// 关闭弹出窗口
function closeIframeWin() {
	$("#popWindowIframe").attr("src", "");
	$("#popWindowDiv").hide();
	$("#grayLayer").hide();
}

// 验证email格式
function isEmail(email) {
	var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
	return reg.test(email);
}

// 验证商品编码格式：9位数字
function isProductCode(productCode) {
	var reg = /^\d{9}$/;
	return reg.test(productCode);
}

// 验证价格格式：在0.01~9999999999999.99范围内的整数或小数，小数位数可以是1位，也可以是2位
function isPrice(price) {
	var reg = /^(([1-9]\d{0,12}(\.\d{1,2})?)|(0\.0[1-9])|(0\.[1-9]\d?))$/;
	return reg.test(price);
}

// 验证电话号码格式
function isTel(tel) {
	var reg = /^(0\d{2,3}-)?(\d{7,8})(-\d{1,10})?$/;
	return reg.test(tel);
}

function buildTree(obj) {
	var pathArr = []; // 类目路径
	var catn = $(obj).find('a').html();
	var catc = $(obj).attr('id');
	var catg = $(obj).attr('grade');
	if ($(obj).siblings("ul").length == 0) {
		var url = ctxPath + '/cm/limit/getCategoryList.action';
		$
				.ajax({
					url : url,
					async : false,
					data : {
						'parentCategoryCode' : catc
					},
					type : 'POST',
					dataType : 'json',
					success : function(data) {
						var node = '';
						$
								.each(
										data,
										function(i, item) {
											node += '<li><div class="treenodeitem" id="'
													+ item.categoryCode
													+ '" grade="'
													+ item.categoryGrade
													+ '" onclick="buildTree(this);"><a href="javascript:;">'
													+ item.catn
													+ '</a></div></li>';
										});
						if (node.length > 0) {
							node = '<ul>' + node + '</ul>';
						}
						$(node).insertAfter('#' + catc);
					},
					error : function() {
						alert('抱歉，系统出错!');
					}
				});
	}

	$(obj).siblings("ul").children("li").each(function() {
		if ($(this).find("div").attr("grade") == "4") {
			$(this).find("div").addClass("lasttreenode");
		}
	});
	$(obj).toggleClass("open");
	$(obj).siblings("ul").toggle();
	$('.bu-mo-tree').find(".on").removeClass("on");
	$(obj).children("a").addClass("on");

	var path = {
		"catn" : catn,
		"catc" : catc,
		"catg" : catg
	};
	pathArr = [ path ];
	var node = $(obj).parent().parent();
	while (!node.hasClass("bu-mo-tree")) {
		// 从当前节点向上方找，到含有tree的calss名结束
		catn = node.parent().find(".treenodeitem").find("a").html();
		catc = node.parent().find(".treenodeitem").attr("id");
		catg = node.parent().find(".treenodeitem").attr("grade");
		node = node.parent().parent();
		var path = {
			"catn" : catn,
			"catc" : catc,
			"catg" : catg
		};
		pathArr.unshift(path);
	}
	var html = "";
	for ( var i = 0; i < pathArr.length; i++) {
		catn = pathArr[i].catn;
		catc = pathArr[i].catc;
		catg = pathArr[i].catg;
		if (catn.length > 8) {
			catn = catn.slice(0, 8) + "...";
		}
		html += '<li relCode="' + catc + '" relGrade="' + catg + '"><span>'
				+ catn + '</span><a href="javascript:;"></a></li>';
	}

	$(".categorybox").html(html).undelegate('a', 'click').delegate('a',
			'click', function() {
				$(".bu-mo-tree").find(".on").removeClass("on");
				catc = $(this).parent().prev().attr("relCode");
				catg = $(this).parent().prev().attr("relGrade");
				$("#categoryCode").val((null == catc) ? "" : catc);
				$("#categoryGrade").val((null == catg) ? "" : catg);
				$(this).parent().nextAll().remove();
				$(this).parent().remove();
			});
	// 隐藏域赋值
	$("#categoryCode").val($.trim($(obj).attr("id")));
	$("#categoryGrade").val($.trim($(obj).attr("grade")));
}

// 搜索品牌
function searchBrand() {
	// 清空品牌列表和隐藏域
	$(".brand-result").find("ul").html("");
	$("#brandCode").val("");

	var brandName = $.trim($("#brandName").val());
	if (brandName.length > 0) {
		var url = ctxPath + '/cm/limit/getBrandList.action';
		$.ajax({
			url : url,
			data : {'brandName' : brandName},
			type : 'POST',
			dataType : 'json',
			success : function(data) {
				var html = '';
				$.each(data, function(i, item) {
					html += '<li><label><input type="radio" name="brandName" id="' + item.brandCode + '" value="' 
							+ item.brandName + '" onclick="chooseBrand(this);"/>' + item.brandName + '</label></li>';
				});
				if (html.length == 0) {
					html += '<li><label>搜索无结果！</label></li>';
				}
				$(".brand-result").find("ul").html(html);
			},
			error : function() {
				alert('抱歉，系统出错!');
			}
		});
	}
}

// 选择品牌
function chooseBrand(obj) {
	var brandCode = $(obj).attr("id");
	var brandName = $(obj).val();
	var html = '<li relCode="' + brandCode + '"><span>' + brandName + '</span><a href="javascript:;"></a></li>';
	$(".brandbox").html(html).undelegate('a', 'click').delegate('a', 'click', function() {
		$(".bu-mo-tree").find(".on").removeClass("on");
		brandCode = $(this).parent().attr("relCode");
		$(".brand-result").find("#" + brandCode).prop(
				"checked", false);
		$("#brandCode").val("");
		$(this).parent().remove();
	});
	$("#brandCode").val(brandCode);
}

// 展示文本框错误提示信息
function showTips(obj, flag) {
	flag ? $(obj).show() : $(obj).hide();
}

// 比较时间，其实时间小于等于结束时间
function compareTime(startTime, endTime) {
	var flag = true;
	if (startTime.length > 0 && endTime.length > 0) {
		var t1 = getTime(startTime);
		var t2 = getTime(endTime);
		flag = t1.getTime() <= t2.getTime();
	}
	return flag;
}

// 字符串转时间格式
function getTime(strDate) {
	var st = strDate;
	var a = st.split(" ");
	var b = a[0].split("-");
	var c = a[1].split(":");
	var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
	return date;
}

// 验证售价浮动值
function isPriceFloat(priceFloat) {
	var reg = /^[1-9]\d*$/;
	return reg.test(priceFloat);
}

// 在iframe外设置弹出框+遮罩层
function openPopupLayer(titleName, width, height, location) {
	var layer1 = parent.document.getElementById("layer1");
	var layer2 = parent.document.getElementById("layer2");
	var layer2Frame = parent.document.getElementById("topWindow");

	// 设置窗口标题
	parent.document.getElementById("layerTitleName").innerHTML = titleName;
	layer1.style.display = "block";
	layer1.style.width = parent.document.body.clientWidth + "px";
	layer1.style.height = parent.document.body.clientHeight + "px";

	// 设置窗口大小
	layer2.style.display = 'block';
	var scrollTop = $(parent.document).scrollTop();
	var scrollLeft = $(parent.document).scrollLeft();

	var widthLen = $(parent.window).width();
	var heightLen = $(parent.window).height();
	layer2.style.left = (widthLen - width) / 2 + scrollLeft + "px";
	layer2.style.top = (heightLen - height) / 2 + scrollTop + "px";

	layer2Frame.width = (width - 10) + "px";
	layer2Frame.height = (height - 40) + "px";

	if (-1 == location.indexOf("?")) {
		layer2Frame.src = location + "?cache=" + Math.random();
	} else {
		layer2Frame.src = location + "&cache=" + Math.random();
	}
}

// 关闭弹出层
function closePopupLayer() {
	parent.document.getElementById('layer1').style.display = 'none';
	parent.document.getElementById('layer2').style.display = 'none';
	parent.document.getElementById('topWindow').src = '';
}
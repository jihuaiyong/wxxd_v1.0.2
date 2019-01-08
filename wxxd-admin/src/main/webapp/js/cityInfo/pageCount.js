/**
 * 集合分页展示
 */
function buildTable(page){
	var str = '';
	//页面信息
	var pageSize = $("#pageSize").html();
	var pageNumber = $("#pageNumber").html();
	//总页数
	var authTotalPage = Math.ceil(authTotalCount/pageSize);
	$("#authTotalCount").html(authTotalCount);
	$("#authTotalPage").html(authTotalPage);
	var tbody = $("#tbody");
	if(page == "c" && authTotalCount != null){
		var jumpPage = $("#jumpPage").val();
		if(jumpPage == ""){
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
			message : '请输入跳转页数'
			});	
			return;
		}
		jumpPage = ~~jumpPage;
		if(jumpPage > authTotalPage){
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
			message : '请输入正确跳转页数'
			});	
			return;
		}
		tbody.empty();
		str = createTable((jumpPage-1)*pageSize,jumpPage*pageSize);
		tbody.append(str);
		$("#jumpPage").val(jumpPage);
		$("#pageNumber").html(jumpPage);
	}
	if(page == "b" && authTotalCount != null){
		var pages = pageNumber*1+1 ;
		if(pages <= authTotalPage){
			tbody.empty();
			str = createTable((pages-1)*pageSize,pages*pageSize);
			tbody.append(str);
			$("#pageNumber").html(pages);
		} 
	}
	if(page == "a" && authTotalCount != null){
		var pages = pageNumber*1-1 ;
		if(pages > 0){
			tbody.empty();
			str = createTable((pages-1)*pageSize,pages*pageSize);
			tbody.append(str);
			$("#pageNumber").html(pages);
		} 
	}
}
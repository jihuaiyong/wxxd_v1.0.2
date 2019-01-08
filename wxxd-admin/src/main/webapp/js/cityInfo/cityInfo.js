$(function() {
	$('#wrap .item-search .zg-inpMany.code-city').inpMany({
		placeholder : '请输入编码\n不同编码换行输入',
		tips:'选填(最多支持20条)'
	});  
})
	var respList=[];//缓存数据
 //表单提交
	function queryCityInfoData(){
		if(!checkParam()){
			return ;
		}
		var queryType ='0';//查询方式枚举:'0'--城市编码,'1'--查询描述
		var cityName = $("#cityName").val();
		if(cityName !=''){
			queryType = '1';
		}
		var cityCodes = $("#wrap .item-search .code-city > .zg-inpMany > .zg-form-control").val();
		var cityCodeList = cityCodes.split(',');
		$.ajax({
			type : "post",
			url : "/npms-admin/cityInfo/queryCityInfoDate.action",
			dataType : "JSON",
			data : {
				"cityCodeListJson" : JSON.stringify(cityCodeList),
				"cityNameJson" : JSON.stringify(cityName),
				"queryTypeJson" : JSON.stringify(queryType)
			},
			async : false,
			success : function(resp) {
				var str="";
				var tbody = $("#tbody");
				tbody.empty();
				if(resp.length < 1){
					str += "<tr><td colspan='10'>没有符合的记录, 请尝试其他搜索条件</td></tr>";
				}else{
					respList = resp;
					str = createTable(0,10);
					authTotalCount = resp.length;
					$("#authTotalCount").html(authTotalCount);
					$("#pageNumber").html("1");
					var pageSize = $("#pageSize").html();
					var authTotalPage = Math.ceil(authTotalCount/pageSize);
					$("#authTotalPage").html(authTotalPage);
				}
				tbody.append(str);
			}
		});

	}
	function createTable(i,L){
		if(respList.length < L){
			L = respList.length;
		}
		var str="";
		for(i;i<L;i++){
			str +="<tr><td>"+(i+1)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].cityCode)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].cityRemarks)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].dqCode)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].csCode)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].csRemarks)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].versionNo)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].createTime)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].upDateTime)+"</td>";
			str +="<td>"+nullToEmpty(respList[i].deleteFlag)+"</td></tr>";
		}
		return str;
	}
	//入参校验
	function checkParam(){	
		var flag = false;
		var regex = /^[0-9]*$/;
		var cityCode = [];
		var cityCodes = $("#wrap .item-search .code-city > .zg-inpMany > .zg-form-control").val();
		var cityName = $("#cityName").val();
		if(cityCodes == "" && cityName ==""){
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
			message : '城市编码与城市描述不能同时为空!'
			});	
			return flag;
		}
		if(cityCodes != "" && cityName !=""){
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '请选择其中一个条件进行查询!'
			});	
			return flag;
		}
		if(cityName !="" && cityName.length > 50){
			bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
				message : '城市描述不能超出50位!'
			});	
			return flag;
		}
		
		if(cityCodes != ""){
			cityCode = cityCodes.split(',');
			var length = cityCode.length;
			if(length > 20){
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '查询条目大于20! 当前为'+length+'条'
				});	
				return flag;
			}
			for(i=0;i<length;i++){
				if(!regex.test(cityCode[i])){
					bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : cityCode[i]+':城市编码不能为非数字!'
					});	
					return flag;
				}
				if(cityCode[i].length > 12){
						bootbox.alert({
						buttons : {
							ok : {
								label : '确定',
								className : 'btn-sm btn-primary'
							}
						},
						message : cityCode[i]+':城市编码不能大于12位!'
					});	
					return flag;
				}
			}
		}
		return flag = true;
	}
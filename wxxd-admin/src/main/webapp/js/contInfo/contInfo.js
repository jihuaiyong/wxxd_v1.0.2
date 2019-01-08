	var respList=[];//缓存数据  
 //表单提交
	function queryContInfoData(){
		if(!checkParam()){
			return ;
		}
		var cmmdtyCode = $("#cmmdtyCode").val();
		var brandCode = $("#brandCode").val();
		var categCode = $("#categCode").val();
		var supplier = $("#supplier").val();
		var orgCode = $("#orgCode").val();
		var plantCode = $("#plantCode").val();
		var contInfoDto ={
				"cmmdtyCode" :cmmdtyCode,
				"brandCode" : brandCode,
				"categCode" : categCode,
				"supplier" : supplier,
				"orgCode" : orgCode,
				"plantCode" : plantCode
			}
		$.ajax({
			type : "post",
			url : "/npms-admin/contInfo/queryContInfoDate.action",
			dataType : "JSON",
			data : {
				"contInfoDtoJson" : JSON.stringify(contInfoDto)
			},
			async : false,
			success : function(resp) {
				var str="";
				var tbody = $("#tbody");
				tbody.empty();
				if(resp.length < 1){
					str += "<tr><td colspan='18'>没有符合的记录, 请尝试其他搜索条件</td></tr>";
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
		for(i;  i<L; i++){
			var id = i+1;
			var resp = respList[i];
			str +="<tr><td>"+id+"</td>";
			str +="<td>"+nullToEmpty(resp.cmmdtyCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.brandCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.categCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.contCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.oaCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.contRange)+"</td>";
			str +="<td>"+nullToEmpty(resp.supplier)+"</td>";
			str +="<td>"+nullToEmpty(resp.supplierModel)+"</td>";
			str +="<td>"+nullToEmpty(resp.orgCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.discountValue)+"</td>";
			str +="<td>"+nullToEmpty(resp.discountTpye)+"</td>";
			str +="<td>"+nullToEmpty(resp.orderType)+"</td>";
			str +="<td>"+nullToEmpty(resp.plantCode)+"</td>";
			str +="<td>"+nullToEmpty(resp.startTime)+"</td>";
			str +="<td>"+nullToEmpty(resp.endTime)+"</td>";
			str +="<td>"+nullToEmpty(resp.createTime)+"</td>";
			str +="<td>"+nullToEmpty(resp.updateTime)+"</td></tr>";
		}
		return str;
	}
	
	//补全商品编码
	function changeCmmdtyCode(){
	    var cmmdtyCode = $("#cmmdtyCode").val();
	    if ( cmmdtyCode.length < 18 && cmmdtyCode.length != 0){
				for(var i = cmmdtyCode.length; i < 18; i++){
				    cmmdtyCode = "0" + cmmdtyCode;
				}
	 	        $("#cmmdtyCode").val(cmmdtyCode);
	        }
	}
	//入参校验
	function checkParam(){	
		var flag = false;
		var regex = /^[0-9]*$/;
		var cmmdtyCode = $("#cmmdtyCode").val();
		var brandCode = $("#brandCode").val();
		var categCode = $("#categCode").val();
		var supplier = $("#supplier").val();
		var orgCode = $("#orgCode").val();
		var plantCode = $("#plantCode").val();
		var message ='';
		if(cmmdtyCode == "" && brandCode ==""){
			message = '商品编码与产品层次不能同时为空!';
			toAlert(message);
			return flag;
		}
		if(cmmdtyCode != "" && !regex.test(cmmdtyCode)){
			message = '商品编码不能为非数字!';
			toAlert(message);
			return flag;
		}
		if(cmmdtyCode && cmmdtyCode.length > 18){
			message = '商品编码不能大于18位!';
			toAlert(message);
			return flag;
		}
		if(brandCode && brandCode.length > 10){
			message = '产品层次不能大于10位!';
			toAlert(message);
			return flag;
		}
		if(categCode && categCode.length > 10){
			message = '商品类目不能大于10位!';
			toAlert(message);
			return flag;
		}
		if(supplier && supplier.length > 10){
			message = '供应商编码不能大于10位!';
			toAlert(message);
			return flag;
		}
		if(orgCode && orgCode.length > 4){
			message = '采购组织不能大于4位!';
			toAlert(message);
			return flag;
		}
		if(plantCode && plantCode.length > 4){
			message = '地点编码不能大于4位!';
			toAlert(message);
			return flag;
		}
		return flag = true;
	}
	
	function toAlert(msg){
		bootbox.alert({
				buttons : {
					ok : {
						label : '确定',
						className : 'btn-sm btn-primary'
					}
				},
			message : msg
		});	
	}

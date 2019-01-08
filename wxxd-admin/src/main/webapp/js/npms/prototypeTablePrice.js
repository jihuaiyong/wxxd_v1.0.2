//点击弹出框确定按钮
function closedR(){
	 $("#addDialog").hide();
	 //刷新当前页面
	 location.reload();
}

//点击提交的校验方法
	/*----提交----*/
	function submit_table(){		
	         var errorInfoCss = $("#errorInfo").css("display");
	         if(errorInfoCss!='none'){
	            npmsAlert('导入内容有错误信息，请调整后重新导入');
	            return false;
	         }
	         var statusFlag = checkStatus();
	         var jsonStr = "";
	         if(statusFlag){
	             var tableinfo = gettableinfo();
	             if(tableinfo=='[]'){
	                 npmsAlert('行项目为空，或者行项目信息有错误，不能提交，请重新填写行项目信息');
	                 return false;
	             }
	             var priceFile=$('#priceFile').val();
	             var map = new Map();
	             map.fileNum=$('#priceFile').val();
	             map.brandLevel=$('#bus_code>.zg-inpMany>.zg-form-control').html();
	             map.supplier=$('#supplier').val();
	             map.purcOrg=$('#purc_org>.zg-inpMany>.zg-form-control').html();
	             map.plantCode=$('#plant_left>.zg-inpMany>.zg-form-control').html();
	             map.orderType=$('#orderType').val();
	             map.startTime=$('#startTime').val();
	             map.endTime=$('#endTime').val();
	             map.currency=$('#currency').val();
	             map.remarks=$('#remarksB').val();
	             
	             map.dataList=tableinfo;
	             
	             jsonStr = JSON.stringify(map);
//	             jsonStr ="{";
//	             jsonStr += '"fileNum":'+'"'+priceFile+'"';
//	             jsonStr += ',"brandLevel":'+'"'+busCode+'"';
//	             jsonStr += ',"supplier":'+'"'+supplier+'"';
//	             jsonStr += ',"purcOrg":'+'"'+purcOrg+'"';
//	             jsonStr += ',"plantCode":'+'"'+plantCode+'"';
//	             jsonStr += ',"orderType":'+'"'+orderType+'"';
//	             jsonStr += ',"startTime":'+'"'+startTime+'"';
//	             jsonStr += ',"endTime":'+'"'+endTime+'"';
//	             jsonStr += ',"currency":'+'"'+currency+'"';
//	             jsonStr += ',"remarks":'+'"'+remarks+'"';
//	             jsonStr += ',"dataList":'+tableinfo;
//	             jsonStr += "}";
	             $.ajax({
	                 url: 'submitF.action',
	                 type: "post",
	                 async: false,
	                 data: {"jsonStr":jsonStr},
	                 success: function (dataF) {
	                	//报错信息
	                  if(dataF!=''&&dataF.exceptionMsg!=''&&dataF.exceptionMsg!=null){
	                		 npmsAlert(dataF.exceptionMsg);
	                	 }
	                	//不需要走审批的商品
	                  if(dataF!=''&&dataF.nextApprover==null&&dataF.exceptionMsg==null){
	                		 $("#addDialog1").show();
	                		  //赋值
		                	   $("#priceFileS1").text(priceFile);
		                	   //流程ID展示---SP+价格文件号
		                	   $("#processID1").text('SP'+priceFile);	 
	                	 }
	                   //需要走审批流程的商品
	                   if(dataF!=''&&dataF.exceptionMsg==null&&dataF.nextApprover!=null&&dataF.approvalNum!=null){
	                	   $("#addDialog").show();
	                	   //赋值
	                	   $("#priceFileS").text(priceFile);
	                	   $("#processID").text(dataF.approvalNum);	                	   
	                		   var tabHTML = "";
	                		   for (var i = 0; i < dataF.nextApprover.split(";").length; i++) {	  	               
	  								tabHTML += '<tr>';
	  								tabHTML += '<td>' + dataF.nextApprover.split(";")[i] + '</td>';
	  								tabHTML += '<td>' + dataF.nextUserId.split(";")[i] + '</td>';
	  								tabHTML += '</tr>';	
	  	                	   }
	  	                	   $("#authList1").html("");
	  						   $("#authList1").html(tabHTML);								  	                	     	                	  
	                	    //分页方法
	                	    goPage(1,5,dataF.nextApprover.split(";").length);	                	   	
	                	 }
	                   else{
	                	   //$("#addDialog").show();
	                	   
	                   }
	                 },
	                //超时处理
	 				complete:function(XMLHttpRequest, status){
	 					if(status=='UNKNOWN'){
	 						//ajaxTimeoutTest.abort();
	 					 npmsAlert('页面超时，请刷新页面或者重新登录！');	 									
	 					}
	 				},
	                 error: function(XMLHttpRequest) {
		  			   npmsAlert('提交供价相关信息失败!');
		  			}
	             });	      
	         }
		}
			     
	 //get table infomation
	 //获取行项目表格信息
	function gettableinfo(){
		  var tableRow = new Map();
		  var tablelist = new Array();
		  var table = $("#para_table");
		  var tbody = table.children();
		  var trs = tbody.children();
		  for(var i=1;i<trs.length;i++){
			var tds = trs.eq(i).children();
			if(tds.eq(0).find("input").val()=='true'){
		        tableRow.status= tds.eq(0).find("input").val();
		        tableRow.itNo=tds.eq(1).text();
		        tableRow.cmmdtyCode=tds.eq(2).text();
		        tableRow.price=tds.eq(3).text();
		        tableRow.curprice=tds.eq(5).text();
		        tableRow.priceDifference=tds.eq(6).text();
		        tableRow.ruleDiscount=tds.eq(7).text();
		        tableRow.lrregularDiscount=tds.eq(8).text();
		        tableRow.fixedRate=tds.eq(9).text();
		        tableRow.baseprice=tds.eq(10).text();
		        tableRow.meterUnit=tds.eq(11).find('input').val();
		        tablelist.push(tableRow);
		        tableRow.clear();
		    }
		  }
		  return tablelist;
		}
//	 function gettableinfo(){
//	     var tdStr = "";
//	     var tabledata = "";
//	     var table = $("#para_table");
//	     var tbody = table.children();
//	     var trs = tbody.children();
//	     for(var i=1;i<trs.length;i++){
//	    	var tds = trs.eq(i).children();
//	    	if(tds.eq(0).find("input").val()=='true'){
//	   	    if(tabledata==""){
//	               tdStr = "{";
//	           }else {
//	               tdStr = ",{";
//	           }
//	           tdStr += '"status":'+'"'+tds.eq(0).find("input").val()+'"';
//	           tdStr += ',"itNo":'+'"'+tds.eq(1).text()+'"';
//	           tdStr += ',"cmmdtyCode":'+'"'+tds.eq(2).text()+'"';
//	           tdStr += ',"price":'+'"'+tds.eq(3).text()+'"';
//	           //tdStr += ',"cmmdtyDesc":'+'"'+tds.eq(4).text()+'"';
//	           tdStr += ',"curprice":'+'"'+tds.eq(5).text()+'"';
//	           tdStr += ',"priceDifference":'+'"'+tds.eq(6).text()+'"';
//	           tdStr += ',"ruleDiscount":'+'"'+tds.eq(7).text()+'"';
//	           tdStr += ',"lrregularDiscount":'+'"'+tds.eq(8).text()+'"';
//	           tdStr += ',"fixedRate":'+'"'+tds.eq(9).text()+'"';
//	           tdStr += ',"baseprice":'+'"'+tds.eq(10).text()+'"';	        
//	           tdStr += ',"meterUnit":'+'"'+tds.eq(11).find("input").val()+'"';
//	           tdStr += "}";
//	           tabledata += tdStr;
//	       }
//	     }
//	     tabledata = "["+tabledata+"]";
//	     return tabledata;
//	   }
	   
   //校验状态
   function checkStatus() {
	    var trlength = $("#para_table").find("tr").length;
	    var trs= $("#para_table").find("tr");
        for(var i =1;i<trlength;i++){
           if(trs.eq(i).find("td").eq(0).find("input").val()!='true'&&trs.eq(i).find("td").eq(0).find("input").val()!=''&&trs.eq(i).find("td").eq(0).find("input").val()!=undefined){
               npmsAlert('行项目第'+i+'行未校验通过，请检查');
               return false;
           }
        }
	    return true;
	}
   
 //商品编码补全18位
   function allCmmdty(code) {     
       if (code!=null && code.length != 0 && code.length < 18) {
           for (var i = code.length; i < 18; i++) {
               code = "0" + code;
           }  
       }
       return code;
   }
   
   //带有2位小数的正实数的校验
   function testNowPrice(price){
	  var checkD=true;
	  var reg=/^[0-9]+(.[0-9]{1,2})?$/;
	   	if(price!=null&&price!=''){
	   		if(!reg.test(price.trim()) || parseFloat(price.trim())<=0 || parseFloat(price.trim())>=999999999.99){
	   			npmsAlert("本次维护价格必须为数字且大于0，不容许输入过大数字，最多保留两位小数！");
				checkD=false;	
	   		}			  
		  }
	   	return checkD;
   }
   
   /**
    * 校验行项目商品编码
    * 并赋值
    */  
   //行项目商品的校验
   function cmmdtyCheck(t,obj){	
	   //状态变量，用于控制校验的流程
	    var next=0;
	    var tr = $(obj).parent();
		var tds = tr.find("td");
	   //------------------开始进行校验--------------------------	 
      //非空校验  
	  if(t==''||t==null){
		 if(tds.eq(3).text()!=''){
		  npmsAlert("行项目商品编码未输入数据！");
		  tds.eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
      	  return false;
		  }else{
			  //当本次维护供价也为空时，相当于本行未输入值，清除状态栏状态
			   tds.eq(0).removeAttr("style").html("");	
		  }
       }
	  //18位校验
	  else if(t.length>18){
		  npmsAlert('商品编码长度非法!');
		  $(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
		  return false;
	  }
	  else{
		  next=1;
		  //补全18位商品编码
		  t=allCmmdty(t);
		  tds[2].innerHTML=t;
	  }
	 //校验是否有相同的商品输入
	  var trs= $("#para_table").find("tr");
	  var trlength = trs.length;	
	  for(var i =1;i<trlength;i++){
	        if(trs.eq(i).find("td").eq(2).text()!=''&&tds.eq(1).text()!=i && trs.eq(i).find("td").eq(2).text()==t){
	            npmsAlert('商品编码'+t+'已存在,请勿重复添加!');
	            $(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
	            return false;
	        }
	    }
	  /**
	     * 校验商品信息、商品类型、商品层次的方法
	     */
      if(next==1){
          $.ajax({
  			url : 'cmmdtyInfoCheck.action',
  			type : "post",
  			async: false,
  			data : {
  					 'cmmdty': t,
  					  'busCode': $('#bus_code>.zg-inpMany>.zg-form-control').html()
  			         },
  			success : function(dataF) {
  				if(dataF.successFlag=='S'){
  					 next=4;
  				}
  				else if(dataF.successFlag=='E'){
  					$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value ='false' />");
  					npmsAlert(dataF.errorMsg);
  					return false;
  				}  				
  			},
  			error: function(XMLHttpRequest) {
  				npmsAlert('获取商品信息失败!');		
  			}
      	});   
       }
      //根据商品编码校验操作模式   
      if(next==4){
          $.ajax({
  			url : 'operateTypeCheck.action',
  			type : "post",
  			async: false,
  			data : {'cmmdty':t,
  					'purcOrg': $('#purc_org>.zg-inpMany>.zg-form-control').html(),
  					'supplier': $('#supplier').val(),
  					'plantCode': $('#plant_left>.zg-inpMany>.zg-form-control').html(),
  					'orderType':$("#orderType").val(),
  					'orderDate':$("#startTime").val()
			         },
  			success : function(dataF) {
  				if(dataF.successFlag=='S'){
  					if(dataF.operateType=='0'){
  						tds[12].innerHTML='经销';
  					}else if(dataF.operateType=='2'){
  						tds[12].innerHTML='代销';
  					}				
  					next=4.5;
  				}
  				else if(dataF.successFlag=='E'){
  					npmsAlert(dataF.errorMsg);
  					$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
  					return false;
  				}  				
  			},
  			error: function(XMLHttpRequest) {
  					npmsAlert('获取商品操作模式失败!');
  			}
      	});   
        }
      var operateTypeValue;
      if(tds[12].innerHTML=='经销'){
    	    operateTypeValue='0';
		} 
      else if(tds[12].innerHTML=='代销'){
			operateTypeValue='2';
		}
      else{
    	  operateTypeValue='';
      }
      var dataT={'cmmdty':t,
				 'purcOrg': $('#purc_org>.zg-inpMany>.zg-form-control').html(),
				 'supplier': $('#supplier').val(),
				 'plantCode': $('#plant_left>.zg-inpMany>.zg-form-control').html(),
				 'orderType':$("#orderType").val(),
				 'operateType':operateTypeValue
		         };
     // 根据商品编码校验常规供价    
    if(next==4.5 && $('#endTime').val()!='9999-12-31'&&t!=''){
    	var busThry=[];
    	var routinePriceL=[];
    	//取事业部业态 
    	$.ajax({
 			url : 'busQueryThry.action',
 			type : "post",
 			async: false,
 			data : {'bus':busCode=$('#bus_code>.zg-inpMany>.zg-form-control').html()},
 			success : function(dataF) { 
 				if(dataF){
 					busThry=dataF;
 				}
 			},
 			error: function(XMLHttpRequest) {
 					npmsAlert('获取事业部业态失败!');
 			}
     	}); 
    	//取商品的常规供价
    	$.ajax({
					url : 'getRoutinePrice.action',
					type : "post",
					async: false,
					data : dataT,
					success : function(dataR) { 				
						if(dataR){
							routinePriceL=dataR;
						}																
					},
					error: function(XMLHttpRequest) {
							npmsAlert('获取商品常规供价失败!');
					}
		    	});
    	 // 根据界面所输事业部在品类对应业态配置表中查找业态，业态为3或15、16时（3:红孩子，15:线上超市，16:精品超市）
        // 且订单类型为NB、操作模式为2代销时，且存在常规供价时，才允许维护截止日期非9999.12.31的供价
    	if(($.inArray('3', busThry) == 0 || $.inArray('15', busThry)== 0 || $.inArray('16', busThry)== 0) 
    			&& $('#orderType').val()=='NB' && operateTypeValue =='2' 
    		    && $.inArray('', routinePriceL) != 0){
    		next=5;
    	}
    	else{  			
    		npmsAlert('该场景有效截止日期必须是9999-12-31!');
    		$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
    		return false;
    	}    	
      }
    if(next==4.5 && $('#endTime').val()=='9999-12-31'){
    	next=5;
    }
      /**
       * 校验商品类型、采购组织是否存在供价
       */
      if(next==5){
          $.ajax({
  			url : 'cmmdtyTypeSupplyPriceCheck.action',
  			type : "post",
  			async: false,
  			data : dataT,
  			success : function(dataF) {
  				if(dataF.successFlag=='S'){
  					next=6;
  				}
  				else if(dataF.successFlag=='E'){
  					npmsAlert(dataF.errorMsg);
  					$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
  					return false;
  				}  				
  			},
  			error: function(XMLHttpRequest) {
  					npmsAlert('校验商品类型、采购组织是否存在供价失败!');
  			}
      	});   
        }
      //根据商品编码校验规则折扣
      if(next==6){
          $.ajax({
  			url : 'regularDiscountCheck.action',
  			type : "post",
  			async: false,
  			data : dataT,
  			success : function(dataF) {
  				//校验成功后给规则折扣赋值
  				if(dataF.successFlag=='S'){
  					next=7;
  					tds[7].innerHTML=dataF.discountValue;
  				}
  				else if(dataF.successFlag=='E'){
  					npmsAlert(dataF.errorMsg);
  					$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
  					return false;
  				}else if(dataF.discountValue==''){
  					npmsAlert('根据商品编码校验规则折扣失败！');
  					$(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
  					return false;
  				}  				
  			},
  			error: function(XMLHttpRequest) {
  					npmsAlert('校验商品编码校验规则折扣失败!');
  			}
      	});   
        }
      //-----------------开始进行赋值--------------------
      //获取商品的描述和货比值
      if(next==7){
          $.ajax({
  			url : 'cmmdtyDsc.action',
  			type : "post",
  			async: false,
  			data : {
  					 'cmmdty':t
  			         },
  			success : function(dataF) { 				
  			    //给商品描述赋值
  			    tds[4].innerHTML=dataF.remarks;
  				$.ajax({
  		  			url : 'cmmdtyUnit.action',
  		  			type : "post",
  		  		    async: false,
  		  			data : {
  		  					 'unit':dataF.unit
  		  			         },
  		  			success : function(unitRemarks) {
  		  			 //给单位赋值 		  			 
  		  			 $(obj).parent().find("td").eq(11).html(unitRemarks+"<input type='hidden' value = '"+dataF.unit+"'/>");	
  		  			 next=8;  		  				           
  		  			 },
  		  			error: function(XMLHttpRequest) {  		  				
  		  				npmsAlert('获取商品单位信息失败!');
  		  			}
  				})
  			},
  			error: function(XMLHttpRequest) {
  				npmsAlert('获取商品详细信息失败!');
  			}
      	});     
        }
      //获取商品不规则折扣
      if(next==8){
          $.ajax({
  			url : 'getUnregularDiscount.action',
  			type : "post",
  			async: false,
  			data : dataT,
  			success : function(dataF) {
  				if(dataF.discountValue==""){
  					next=9;
  				    //给不规则折扣赋值
  					tds[8].innerHTML=dataF.discountValue;	
  				}
  				else if(dataF.discountValue!=""){
  					next=9;
  					//给不规则折扣赋值
  					tds[8].innerHTML=dataF.discountValue;
  				}
  			},
  			error: function(XMLHttpRequest) {
  				npmsAlert('获取不规则折扣信息失败!');
  			}
      	});   
        }
      //获取固定费率
      if(next==9){
          $.ajax({
  			url : 'getFixedDiscount.action',
  			type : "post",
  			async: false,
  			data : dataT,
  			success : function(dataF) {
  				if(dataF.discountValue==""){
  					next=10;
  				    //给固定费率赋值
  					tds[9].innerHTML=dataF.discountValue;	
  				}
  				else if(dataF.discountValue!=""){
  					next=10;
  				    //给固定费率赋值
  					tds[9].innerHTML=dataF.discountValue;
  				}
  			},
  			error: function(XMLHttpRequest) {
  				npmsAlert('获取不规则折扣信息失败!');
  			}
      	});   
        }
    //获取当前生效供价
      if(next==10){
          $.ajax({
  			url : 'getSupplyPrice.action',
  			type : "post",
  			async: false,
  			data : dataT,
  			success : function(dataF) { 				  			
  				    //给当前生效供价赋值
  					tds[5].innerHTML=dataF.price;
  					//给商品加上状态
  					$(obj).parent().find("td").eq(2).html(t+"<input type='hidden' value ='true'/>");	
				 	next=100;
				 	//当维护当前供价有值时
				 	//校验当前维护供价
					if(tds[3].innerHTML!=''&&testNowPrice(tds[3].innerHTML) && next==100){
				    //计算生效后底价 当前供价*（1-|规则折扣|（正数）-|不规则折扣|（正数）-|固定费率|（正数））
					var regularDiscount,UnregularDiscount,FixedDiscount
					if(tds[7].innerHTML==''){
						regularDiscount=0;
					}else{
						regularDiscount=tds.eq(7).text();
					}
					if(tds[8].innerHTML==''){
						UnregularDiscount=0;
					}else{
						UnregularDiscount=tds.eq(8).text();
					}	
					if(tds[9].innerHTML==''){
						FixedDiscount=0;
					}else{
						FixedDiscount=tds.eq(9).text();
					}
				     var sprice='';			    
				     $.ajax({
				  			url : 'calculatePrice.action',
				  			type : "post",
				  			async: false,
				  			data : {
				  				'nowPrice':tds.eq(3).text(),
				  				'regularDiscount':regularDiscount,
				  				'UnregularDiscount':UnregularDiscount,
				  				'FixedDiscount':FixedDiscount
				  				 },
				  			success : function(dataC) { 
				  				sprice=dataC;
				  				}
				        });
				     //给生效后低价赋值
			        tds[10].innerHTML=sprice;
			        //价差计算逻辑---价差=|维护的供价-当前生效供价|/当前生效供价
		           //当前供价不存在时，价差默认为0
			        var diffPrice='0';
			        $.ajax({
			  			url : 'calculateDiffPrice.action',
			  			type : "post",
			  			async: false,
			  			data : {
			  				'nowPrice':tds.eq(3).text(),
			  				'nowSupplyPrice':tds.eq(5).text()
			  			},
			  			success : function(dataC) { 
			  				diffPrice=dataC;
			  			}
			        });
			        tds[6].innerHTML=diffPrice;
			        //给校验通过赋值
			        if(tds.eq(0).find("input").val()!=null&&tds.eq(0).find("input").val()!=undefined&&tds.eq(0).find("input").val()!=''){
			        	tds.eq(0).css("background","#28ec5f").find("input").val('true');
			        }else{	            
				        tds.eq(0).css("background","#28ec5f").html("<input type='hidden' value='true'/>")
			        }	  
			  }else if(next==100&&tds.eq(2).find("input").val()=='true'&&tds.eq(0).find("input").val()=='false'){
				  tds.eq(0).find("input").val('true');
				  //清除状态栏状态
				   tds.eq(0).removeAttr("style").html("");	
			  }
  			},
  			error: function(XMLHttpRequest) {
  				npmsAlert('获取当前生效供价失败!');
  			}
      	});   
        }
      //-----------------商品信息赋值完成--------------------
   }
   
   //当前维护供价的校验
   function priceCheck(p,obj){
	    var tr = $(obj).parent();
		var tds = tr.find("td");
	   //非空校验  
	   if(p==''||p==null){
		   if(tds.eq(2).text()!=''){
		     npmsAlert("行项目中维护当前供价未输入数据！");
		     tds.eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
	      	 return false;
		   }else{
			   //当商品编码也为空时，相当于本行未输入值，清除状态栏状态
			   tds.eq(0).removeAttr("style").html("");			   
		   }
	       }
	  //非法输入校验
	   if(!testNowPrice(p)){
		   $(obj).parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
		   return false;
	   }else if(testNowPrice(p) && tr.find("td").eq(2).text()=='' && tds.eq(0).find("input").val()=='false'){
		   //清除状态栏状态
		   tds.eq(0).removeAttr("style").html("");	
	   }	  
		//价差较大预警提醒
	   	//获取商品编码
	   	var cmmdty=allCmmdty(tds.eq(2).text());
	    var operateTypeValue;
	      if(tds[12].innerHTML=='经销'){
	    	    operateTypeValue='0';
			} 
	      else if(tds[12].innerHTML=='代销'){
				operateTypeValue='2';
			}
	      else{
	    	  operateTypeValue='';
	      }
	   	if (operateTypeValue != '' && tds.eq(2).find("input").val() != undefined
			&& tr.find("td").eq(2).find("input").val() == 'true'
			&& tds.eq(0).find("input").val() != 'false') {
	          $.ajax({
	  			url : 'priceBiggerDiffWarnCheck.action',
	  			type : "post",
	  			async: false,
	  			data : {
	  					 'cmmdty':cmmdty,
	  					 'purcOrg': $('#purc_org>.zg-inpMany>.zg-form-control').html(),
	  					 'supplier': $('#supplier').val(),
	  					 'plantCode': $('#plant_left>.zg-inpMany>.zg-form-control').html(),
	  					 'orderType':$("#orderType").val(),
	  					 'nowPrice':p,
	  					 'bus':$('#bus_code>.zg-inpMany>.zg-form-control').html(),
	  					 'operateType': operateTypeValue
	  			         },
	  			success : function(dataF) {
	  				if(dataF.successFlag=='S'){
	  				}
	  				else if(dataF.successFlag=='E'){
	  					//仅提示，不报错，可正常提交
	  					npmsAlert(dataF.errorMsg);
	  					//return false;
	  				}  				
	  			},
	  			error: function(XMLHttpRequest) {
	  					npmsAlert('校验商品价差失败!');
	  			}
	      	}); 
	   	}
	   		//计算工作
		if(testNowPrice(p) && tds.eq(2).find("input").val()!=undefined && tr.find("td").eq(2).find("input").val()=='true'){
		    //生效后底价计算逻辑---行项目所输入本次生效供价*（1-规则折扣-不规则折扣-固定费率）
			//去表里的值为整数，要转化，变成负数在除以100
			var regularDiscount,UnregularDiscount,FixedDiscount
			if(tds[7].innerHTML==''){
				regularDiscount=0;
			}else{
				regularDiscount=tds.eq(7).text();
			}
			if(tds[8].innerHTML==''){
				UnregularDiscount=0;
			}else{
				UnregularDiscount=tds.eq(8).text();
			}	
			if(tds[9].innerHTML==''){
				FixedDiscount=0;
			}else{
				FixedDiscount=tds.eq(9).text();
			}	
	        var sprice='';			    
		     $.ajax({
		  			url : 'calculatePrice.action',
		  			type : "post",
		  			async: false,
		  			data : {
		  				'nowPrice':p,
		  				'regularDiscount':regularDiscount,
		  				'UnregularDiscount':UnregularDiscount,
		  				'FixedDiscount':FixedDiscount
		  				},
		  			success : function(dataC) { 
		  				sprice=dataC;
		  				}
		        });
		     //给生效后低价赋值
	        tds[10].innerHTML=sprice;
	        //价差计算逻辑---价差=|维护的供价-当前生效供价|/当前生效供价
           //当前供价不存在时，价差默认为0
	        var diffPrice='0';
	        if(tds.eq(5).text()!='' && tds.eq(5).text()!='0'){
	        	$.ajax({
	        		url : 'calculateDiffPrice.action',
	        		type : "post",
	        		async: false,
	        		data : {
	  				'nowPrice':p,
	  				'nowSupplyPrice':tds.eq(5).text()
	        		},
	        		success : function(dataC) { 
	  				diffPrice=dataC;
	        		}
	        	});
	        }
	        tds[6].innerHTML=diffPrice;
	        if(tds.eq(0).find("input").val()!=null&&tds.eq(0).find("input").val()!=undefined&&tds.eq(0).find("input").val()!=''){
	        	tds.eq(0).css("background","#28ec5f").find("input").val('true');
	        }else{	            
		        tds.eq(0).css("background","#28ec5f").html("<input type='hidden' value='true'/>")
	        }	  
	 }else if(testNowPrice(p) && tr.find("td").eq(2).find("input").val()=='true' && tds.eq(0).find("input").val()=='false'){
		   tds.eq(0).find("input").val('true');
		   //清除状态栏状态
		   tds.eq(0).removeAttr("style").html("");	
	   }	 
   }
      
   //模版下载
   function downloadModel() {
	    window.open(ctx+'/modelFile/PrototypePrice.zip','下载上传模板',"");
	 }

	//批量导入方法
	function fileUpload(){	            
	   var filePath=$("#file").val();                                            
	   var index=filePath.lastIndexOf(".");
	   var str=filePath.substring(index+1,filePath.length).toLowerCase();
	   if(str!='xls'&&str!='xlsx'){	
		   npmsAlert('请上传xls,xlsx格式的文件！');      									
		   return false;
	     }
	    var size = $("#file")[0].files[0].size;
	    var limitSize = 1;
	    if (size > limitSize * 1024 * 1024) {
	        npmsAlert('请上传大小小于' + limitSize + 'M的文件!');
	        return false;
	    }
		var index = layer.load(1, {shade: [0.1, '#393D49']});
		var file = document.fileUploadForm.file.files[0];
		var StartTime = $("#startTime").val();
		var EndTime = $("#endTime").val();
		var fm = new FormData();
		fm.append('file', file);
		fm.append('bus',$('#bus_code>.zg-inpMany>.zg-form-control').html());
		fm.append('supplier',$('#supplier').val());
		fm.append('org',$('#purc_org>.zg-inpMany>.zg-form-control').html());
		fm.append('plant',$('#plant_left>.zg-inpMany>.zg-form-control').html());
		fm.append('StartTime',StartTime);
		fm.append('EndTime',EndTime);
		fm.append('order',$("#orderType").val());
		$.ajax({
			url : 'fileView.action',
			type: 'POST',
			data: fm,
	        contentType: false, //禁止设置请求类型
	        processData: false, //禁止jquery对DAta数据的处理,默认会处理
	        //禁止的原因是,FormData已经帮我们做了处理
			success : function(lineData, status) {	
				// 返回数据存在				
				if (lineData && lineData.total>0 && lineData.total <= 100) {							
					if(lineData.succRows && lineData.succRows.length>0){
						var succLen = lineData.succRows.length;	
						var tabHTML = "";
					  //展示正确校验通过的数据信息
						for (var i = 0; i < succLen; i++) {							
							var tempData = lineData.succRows[i];							
							tabHTML += '<tr>';	
							tabHTML += '<td style="background: #28ec5f;"><input type="hidden" value="true" />';	
							tabHTML += '<td>' + (i+1) + '</td>';
							tabHTML += '<td>' + tempData.cmmdty + '</td>';
							tabHTML += '<td>' + tempData.nowPrice + '</td>';
							tabHTML += '<td>' + tempData.remarks + '</td>';
							tabHTML += '<td>' + tempData.nowSupplyPrice + '</td>';
							tabHTML += '<td>' + tempData.diffPrice + '</td>';
							if(tempData.regularDiscount==''){
								tabHTML += '<td>' + '' + '</td>';
								}else{
							tabHTML += '<td>' +tempData.regularDiscount + '</td>';
								}
							if(tempData.UnregularDiscount==''){
								tabHTML += '<td>' + '' + '</td>';
							}else{
								tabHTML += '<td>' +tempData.UnregularDiscount + '</td>';
							}
							if(tempData.FixedDiscount==''){
								tabHTML += '<td>' + '' + '</td>';
							}else{
								tabHTML += '<td>' +tempData.FixedDiscount + '</td>';
							}							
							tabHTML += '<td>' + tempData.effectSupplyPrice + '</td>';
							//隐藏字段，用于提交单位值
							tabHTML += '<td>' + tempData.unit + '<input type="hidden" value="' + tempData.cmmdtyUnitValue + '"/></td>';
							tabHTML += '<td>' + tempData.operateType + '</td>';								
							tabHTML += '<td style="text-align:center; " onclick="deletetr(this)"><button type="button" class="btn btn-xs btn-link">'+'删除'+'</button></td>';
							tabHTML += '</tr>';	
						}						
						$("#authList").html("");
						$("#authList").html(tabHTML);																
						} 					
				 	//展示校验未通过的数据信息
				    if(lineData.errRows && lineData.errRows.length > 0){
				    	if(!lineData.succRows){
				    		$("#authList").html("");
				    	}else if(lineData.succRows && lineData.succRows.length==0){
				    		$("#authList").html("");
				    	}
				    	var errLen = lineData.errRows.length;	
				    	var tabHTMLE = "";
				    	//如果有错误信息，则直接提示错误信息
				    	$("#errorInfo").css("display","");
				    	for (var i = 0; i < errLen; i++) {						
				    		var tempData = lineData.errRows[i];
				    		tabHTMLE += '<tr>';
				    		tabHTMLE += '<td>' + tempData.itNo + '</td>';
				    		tabHTMLE += '<td>' + tempData.error + '</td>';																																	
				    		tabHTMLE += '</tr>';	
				    	}				
				    	$("#errorAuthList").html("");
				    	$("#errorAuthList").html(tabHTMLE);					
				    }
				    }
				    if(lineData && lineData.errRows && lineData.errRows.length == 0&&lineData.total <= 100&&lineData.total > 0){
						$("#errorAuthList").html("");
						$("#errorInfo").css("display","none");
					}	
				    if(lineData && lineData.total==0){
				    	var tabHTMLK = "";
				    	$("#errorInfo").css("display","");
				    	tabHTMLK += '<tr><td COLSPAN="14">上传的文件没有数据或者数据格式错误！</td></tr>';
				    	$("#authList").html("");			
						$("#errorAuthList").html("");
						$("#errorAuthList").html(tabHTMLK);
					}	
					if(lineData && lineData.total > 100){
						var tabHTMLD = "";
						$("#errorInfo").css("display","");
						tabHTMLD += '<tr><td COLSPAN="14" style="padding-left:115px;">一次最多可维护100条，请重新维护！</td></tr>';									
						$("#authList").html("");
						$("#errorAuthList").html("");
						$("#errorAuthList").html(tabHTMLD);
					}			
				//取消遮罩层
				layer.close(index);	
			
			},
			error: function(XMLHttpRequest) {
		         npmsAlert('批导失败，请检查文件格式或者内容是否满足导入要求！'); 
		         layer.close(index);
		         }
		         });	 	 
	   }   

	function checkFileType(){
	    var filePath=$("#file").val();           
	    var arr=filePath.split('\\');
	    var fileName=arr[arr.length-1];       
	    $("#fupload").html(fileName);  
	    if(fileName==0){
	    	$("#fupload").html("");
	    	$("#fupload").html("请点击这里上传文件");
	    	return;
	    }
	    var index=filePath.lastIndexOf(".");
	    var str=filePath.substring(index+1,filePath.length).toLowerCase();
	      if(str!='xls'&&str!='xlsx'){
	    	  npmsAlert('请上传xls,xlsx格式文件！');      									   
		      return;
	        }
	    }	
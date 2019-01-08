"use strict";
!function(t) {
    t.fn.inpMany = function(n) {
        this.each(function() {
            var e = this
              , i = n || {}
              , a = {
                placeholder: "请输入编码(不同编码换行输入)"
            }
              , o = t.extend({}, a, i);
              t(e).html('\n <div class="zg-inpMany">\n '                  
              		+'<p class="zg-form-control"></p>\n '                   
              		+'<i class="icon-development-tool"></i>\n  '                  
              		+'<div class="inpArea">\n  '                      
              		+'<textarea name="" rows="10" placeholder="' + o.placeholder + '" id="inp-area-Bus" class="inp-area"></textarea>\n '                     
              		+'<div class="btnBox">\n'                            
              		+'<a href="javascript:;" class="button button-primary btn-sure">确定</a>\n '                          
              		+'<a href="javascript:;" class="button button-default btn-cancel">取消</a>\n '                      
              		+'</div>\n'                    
              		+'</div>\n '               
              		+'</div>\n' );
            var r = t(e).find(".zg-form-control")
              , s = t(e).find(".inpArea")
              , c = t(e).find(".btn-sure")
              , l = t(e).find(".btn-cancel")
              , p = t(e).find("textarea");
            r.on("click", function() {
                if (s.hasClass("active"))
                    s.removeClass("active");
                else {
                    t(".inpArea").removeClass("active"),
                    s.addClass("active");
                    var n = t(this).text().trim().split(",").join("\n");
                    p.val(n).focus()
                }
            }),
            c.on("click", function() {
                var t = p.val().trim();
                r.html(t.split("\n").join(","));
                s.removeClass("active");
                busExistCheck();
            }),
            l.on("click", function() {
                s.removeClass("active")
            }),
            s.on("mousedown", function(t) {
                t.stopPropagation()
            }),
            t(document).on("mousedown", function(n) {
                t(n.target).closest(r).length || "focusin" == n.type || s.removeClass("active")
            })
        })
    }
}(jQuery),
!function(t) {
    t.fn.inpManyOrg = function(n) {
        this.each(function() {
            var e = this
              , i = n || {}
              , a = {
                placeholder: ""
            }
              , o = t.extend({}, a, i);
              t(e).html('\n <div class="zg-inpMany">\n '                  
              		+'<p class="zg-form-control"></p>\n '                   
              		+'<i class="icon-development-tool"></i>\n  '                  
              		+'<div class="inpArea">\n  '                      
              		+'<textarea name="" rows="10" placeholder="' + o.placeholder + '" class="inp-area"></textarea>\n '                     
              		+'<div class="btnBox">\n'                            
              		+'<a href="javascript:;" class="button button-primary btn-sure">确定</a>\n '                          
              		+'<a href="javascript:;" class="button button-default btn-cancel">取消</a>\n '                      
              		+'</div>\n'                    
              		+'</div>\n '               
              		+'</div>\n' );
            var r = t(e).find(".zg-form-control")
              , s = t(e).find(".inpArea")
              , c = t(e).find(".btn-sure")
              , l = t(e).find(".btn-cancel")
              , p = t(e).find("textarea");
            r.on("click", function() {
                if (s.hasClass("active"))
                    s.removeClass("active");
                else {
                    t(".inpArea").removeClass("active"),
                    s.addClass("active");
                    var n = t(this).text().trim().split(",").join("\n");
                    p.val(n).focus()
                }
            }),
            c.on("click", function() {
                var t = p.val().trim();
                r.html(t.split("\n").join(","));
                s.removeClass("active");
                purcOrgExistCheck();
            }),
            l.on("click", function() {
                s.removeClass("active")
            }),
            s.on("mousedown", function(t) {
                t.stopPropagation()
            }),
            t(document).on("mousedown", function(n) {
                t(n.target).closest(r).length || "focusin" == n.type || s.removeClass("active")
            })
        })
    }
}(jQuery),
!function(t) {
    t.fn.inpManyPlant = function(n) {
        this.each(function() {
            var e = this
              , i = n || {}
              , a = {
                placeholder: ""
            }
              , o = t.extend({}, a, i);
              t(e).html('\n <div class="zg-inpMany">\n '                  
              		+'<p class="zg-form-control"></p>\n '                   
              		+'<i class="icon-development-tool"></i>\n  '                  
              		+'<div class="inpArea">\n  '                      
              		+'<textarea name="" rows="10" placeholder="' + o.placeholder + '" id="inp-area-plant" class="inp-area"></textarea>\n '                     
              		+'<div class="btnBox">\n'                            
              		+'<a href="javascript:;" class="button button-primary btn-sure">确定</a>\n '                          
              		+'<a href="javascript:;" class="button button-default btn-cancel">取消</a>\n '                      
              		+'</div>\n'                    
              		+'</div>\n '               
              		+'</div>\n' );
            var r = t(e).find(".zg-form-control")
              , s = t(e).find(".inpArea")
              , c = t(e).find(".btn-sure")
              , l = t(e).find(".btn-cancel")
              , p = t(e).find("textarea");
            r.on("click", function() {
                if (s.hasClass("active"))
                    s.removeClass("active");
                else {
                    t(".inpArea").removeClass("active"),
                    s.addClass("active");
                    var n = t(this).text().trim().split(",").join("\n");
                    p.val(n).focus()
                }
            }),
            c.on("click", function() {
                var t = p.val().trim();
                r.html(t.split("\n").join(","));
                s.removeClass("active");
                plantCheck();
            }),
            l.on("click", function() {
                s.removeClass("active")
            }),
            s.on("mousedown", function(t) {
                t.stopPropagation()
            }),
            t(document).on("mousedown", function(n) {
                t(n.target).closest(r).length || "focusin" == n.type || s.removeClass("active")
            })
        })
    }
}(jQuery),
//初始化页面
$(document).ready(function(){  
	 initDate();
            eventFun.setStep(1);
               addtr();
               addtr();
               addtr();
               addtr();                    
        });
//点击下一步的校验方法
   function editNext1(){
	    var  nextT=0;
        //-------------校验事业部开始-----------
	    //非空校验
	    var busCode=$('#bus_code>.zg-inpMany>.zg-form-control').html();		
             if(busCode==''||busCode==null){
            	 npmsAlert('事业部为必输字段！');	
            	 return false;
             }//校验事业部是否存在
             //权限和事业部在品类对应业态配置表的校验
             if(busCode!=''&&busCode!=null){
            	 $.ajax({
            		url : 'busCheck.action',
     				type : "post",
     				async: false,
     				data : {
     						'bus': busCode	
     				         },
     				success : function(dataC) { 
     					if(dataC.successFlag=='S'){
     						 $.ajax({
     		    				url : 'NCgetPersonInfo.action',
     		    				type : "post",
     		    				async: false,
     		    				data : {
     		    						'bus': busCode	
     		    				         },
     		    				success : function(dataF) {    					
     		    					if(dataF.successFlag=='S'){						
     		    						 $.ajax({
     		    								url : 'bus_orderTypeCheck.action',
     		    								type : "post",
     		    								async: false,
     		    								data : {
     		    										'bus': busCode,
     		    										'order': $("#orderType").val()
     		    								         },
     		    								success : function(dataV) {
     		    									if(dataV.successFlag=='S'){
     		    										//当业态为2或3，且订单类型为NB
     		    										//才允许维护截止日期非9999.12.31的供价
     		    										if($("#orderType").val()=='NB'){
     		    											nextT=1;
     		    										}//其余场景当截止日期非9999.12.31时，报错：该场景截止日期必须是9999.12.31
     		    										else{
     		    											if($('#endTime').val()!='9999-12-31'){
     		    												npmsAlert('该场景有效截止日期必须是9999-12-31!');
     		    												return false;
     		    											}else{
     		    												nextT=1;
     		    											}									
     		    										}  										 
     		    									}
     		    									else if(dataV.successFlag=='E'){
     		    										npmsAlert(dataV.errorMsg);
     		    										 return false;
     		    									}
     		    								},
     		    								error: function(XMLHttpRequest) {
     		    									npmsAlert('获取事业部在品类对应业态配置信息失败!');
     		    						        }
     		    							});
     		    					}
     		    					else if(dataF.successFlag=='E'){     						 
     		    						 npmsAlert(dataF.errorMsg);
     		    						 return false;
     		    					}					
     		    				},
     		    				error: function(XMLHttpRequest) {
     		    					 npmsAlert('获取北冥系统RSF权限查询接口信息失败!');
     		    		        }
     		    			});
     					}
     					else if(dataC.successFlag=='E'){
     						 npmsAlert('请检查事业部或者订单类型是否输入正确!');
     						 return false;
     					}
     				},
     				error: function(XMLHttpRequest) {
     					npmsAlert('发送事业部存在校验请求失败!');
    					return false;
    		        }
            	 })
            
    		  }
             else {            	 
            	 npmsAlert('请检查事业部或者订单类型是否输入正确!');
            	 return false;
             }
             //------------事业部校验结束 -----------
             //------------采购组织校验开始 -----------
             //采购组织的校验
            if(nextT==1&&$('#purc_org>.zg-inpMany>.zg-form-control').html()==''||$('#purc_org>.zg-inpMany>.zg-form-control').html()==null){           	            	
            		npmsAlert('采购组织为必输字段！');
            		return false;
            	}
            //根据输入的采购组织，在公司主数据表中查找是否有满足的记录
            if(nextT==1){
            	var purcOrg = $('#purc_org>.zg-inpMany>.zg-form-control').html();
        		if(purcOrg!=''&&purcOrg!=null){				
        			$.ajax({
        				url : 'purcOrgsExistCheck.action',
        				type : "post",
        				async: false,
        				data : {
        						'purcOrg': purcOrg
        				         },
        				success : function(dataF) {
        					if(dataF.successFlag=='S'){
        						//输入多个
        						if(purcOrg.indexOf(",")!=-1){							
        							//校验在表统购采购组织表中匹配满足的记录
        							$.ajax({
        								url : 'purcOrgsCheck.action',
        								type : "post",
        								async: false,
        								data : {
        									'purcOrg': purcOrg
        								         },
        								success : function(dataT) {
        									if(dataT.successFlag=='S'){       					
        										//当抬头输入的采购组织均不在表统购采购组织配置表中时，控制地点必须为空
        										$('#plant_left>.zg-inpMany>.zg-form-control').empty();
        										$('#inp-area-plant').prop("disabled", "disabled");										
        									}
        									else if(dataT.successFlag=='E'){
        										$('#currency').val('');
        										$('#inp-area-plant').removeAttr("disabled");
        										npmsAlert("这些采购组织<font color='#ff0000' size='3'>"+purcOrg+"</font>不能同时创建供价!");
        										return false;
        									}
        									else{
        										$('#inp-area-plant').removeAttr("disabled");						
        									}
        								},
        								error: function(XMLHttpRequest) {
        									$('#currency').val('');
        									npmsAlert('获取采购组织信息失败!');						
        						        }
        							});
        						}//输入一个，校验在表统购采购组织表中匹配满足的记录，不满足控制地点禁止输入
        						else{ $.ajax({
        								url : 'purcT_OrgCheck.action',
        								type : "post",
        								async: false,
        								data : {
        									'purcOrg': purcOrg
        								         },
        								success : function(dataU) {
        									if(dataU.successFlag=='E'){        								
        										//当抬头输入的采购组织不在表统购采购组织配置表中时，控制地点必须为空
        										$('#plant_left>.zg-inpMany>.zg-form-control').empty();
        										$('#inp-area-plant').prop("disabled", "disabled");										
        									}
        									else if(dataU.successFlag=='S'){       										  
        										$('#inp-area-plant').removeAttr("disabled");
        											}
        										},
        								error: function(XMLHttpRequest) {
        								         npmsAlert('发送采购组织是否通采组织请求失败！'); 
        								         }
        								         });				
        						}
        						nextT=2;
        					}
        					else if(dataF.successFlag=='E'){
        						$('#inp-area-plant').removeAttr("disabled");
        						$('#currency').val('');
        						var messageInfo=[];
        						for(var i=0;i<dataF.errorMsgList.length;i++){
        							messageInfo.push(dataF.errorMsgList[i]);
        						}
        						npmsAlert("您输入的采购组织<font color='#ff0000' size='3'>"+messageInfo+"</font>不存在!"); 	
        						return false;
        					}
        				},
        				error: function(XMLHttpRequest) {
        					$('#inp-area-plant').removeAttr("disabled");
        					npmsAlert('获取采购组织信息失败!');
        					$('#currency').val('');		
        		        }
        			});
        		}		          
            }
            //校验和采购组织的关联，输入多个事业部才校验
            if($('#bus_code>.zg-inpMany>.zg-form-control').html().indexOf(",")!=-1&&nextT==2){
            	$.ajax({
        			url : 'bus_orgCheck.action',
    				type : "post",
    				async: false,
    				data : {
    						 'bus':$('#bus_code>.zg-inpMany>.zg-form-control').html(),
    						 'org':$('#purc_org>.zg-inpMany>.zg-form-control').html()
    				         },
    				success : function(dataF) {
    					if(dataF.successFlag=='S'){
    						nextT=2.5;
    					}
    					else if(dataF.successFlag=='E'){
    						npmsAlert(dataF.errorMsg);
    						return false;
    					}   					
    				},
    				error: function(XMLHttpRequest) {
    				 npmsAlert('获取事业部和采购组织校验信息失败!');		
    				}
            	});
            }else if($('#bus_code>.zg-inpMany>.zg-form-control').html().indexOf(",")==-1&&nextT==2){
            	nextT=2.5;
            }
			//------------采购组织校验结束-----------
			//-------------地点的校验开始--------------------
			//当采购组织为统采时，地点不能为空；当是其它采购组织时（非统采），地点必须为空
            //输入一个采购组织是通采组织
            var pleft=$('#plant_left>.zg-inpMany>.zg-form-control').html();	
			if(nextT==2.5&&org_TCheck()){							
				if(pleft!=''&& nextT==2.5){							
					//如果要输入区间值，就不能再输入多个值
					if(pleft.indexOf(',')!=-1&&pleft.indexOf("-")!=-1){	
						npmsAlert('输入的地点的格式不对，请重新输入!');	
						return false;
					} 
					if(pleft.indexOf("-")!=-1&&pleft.length!=9){
						npmsAlert('输入的地点的格式不对，请重新输入!');	
						return false;
					}
					if(pleft!=""){
						 $.ajax({
								url : 'plantCheck.action',
								type : "post",
								async: false,
								data : {
										'pl': pleft,
										'org':purcOrg
								         },
								success : function(dataF) {
									if(dataF.successFlag=='S'){
										 nextT=3;	
									}
									else if(dataF.successFlag=='E'){
										npmsAlert(dataF.errorMsg);	
										return false;
									}					
								},
								error: function(XMLHttpRequest) {
									npmsAlert('获取地点信息失败!');	
									return false;
						        }				
							});
					     }										
				}else if(nextT==2.5&&pleft==''){
					npmsAlert('地点不能为空!');
					return false;
				}
			}//当输入其它采购组织时（非统采），地点必须为空
			else if(nextT==2.5 &&!org_TCheck() && pleft!=''){
				    npmsAlert('地点必须为空!');
				    return false;
			}else if(nextT==2.5 && !org_TCheck() && pleft==''){
					nextT=3;
			}
			//----------------地点的校验结束--------------------
			//供应商的校验
			if(nextT==3 && $('#supplier').val()==''||$('#supplier').val()==null){
				npmsAlert('供应商不能为空!');
				return false;
			} 
			if(nextT==3){
				var supply=$('#supplier').val();		
				if(supply!=''&&supply!=null){
					//补全10位
					supply = appendSupplierCodeUtil(supply);
					$.ajax({
						url : 'supplierInfo.action',
						type : "post",
						async : false,
						data : {
								'supplier': supply
						         },
						success : function(dataF) {
							if(dataF.successFlag=='S'){
								nextT=4;
							}				
							else if(dataF.successFlag=='E'){
								npmsAlert(dataF.errorMsg);	
								return false;
							}
						},
						error: function(XMLHttpRequest) {
							npmsAlert( '获取供应商信息失败!');		
				        }
					});
				}else{
					$('#remarks').val('');
					$('#currency').val('');
				}
			}		
			//时间的校验
			if(nextT==4&&$('#startTime').val()==''||$('#endTime').val()==''){
				npmsAlert('开始时间或截止时间不能为空！');	
				return false;
			}else{
				if(nextT==4){
					nextT=5;
				}
			}
			//货币的校验
			if(nextT==5&&$('#currency').val()==''||$('#currency').val()==null){
				npmsAlert('货币不能为空，请重新输入供应商！');
				return false;
			}else{
				if(nextT==5){
					nextT=6;
				}
			}			
             if(nextT==6){
            	  $(".step1").css("display","none");
                  $(".step2").css("display",""); 
                  eventFun.setStep(2); 
             }           
        }             
   //上一步       
   function editBack1(){
       npmsConfirm("返回上一步所有行项目信息将会被清空，请是否继续？", function (flag) {
           if(flag){
        	   $("#file").val("");
               $("#fupload").html("请点击这里上传文件");
               $(".step1").css("display","");
               $(".step2").css("display","none");
               $("#errorInfo").css("display","none");
               $("#authList").html("");
               $("#errorAuthList").html("");                       
               addT();
               eventFun.setStep(1);
           }
       });
   }
        //事件操作
        var eventFun={
            setStep:function(index){                
                for(var i=2;i<=index;i++){
                    $("#step"+i+"Li").addClass("blue").removeClass("gray");
                    $("#step"+i+"Img").attr("src","../images/blue_blue.png");
                }
                for(var i=index+1;i<=3;i++){
                    $("#step"+i+"Li").addClass("gray").removeClass("blue");
                    $("#step"+i+"Img").attr("src","../images/gray_gray.png");
                }
                $("#step"+(index+1)+"Img").attr("src","../images/blue_gray.png");
            }
        };
   
    //手动输入表格的方法
	function tdclick(tdobject){ 
	  var td=$(tdobject);
	  var name = td.attr("name");
	  td.css("background-color","burlywood");
	  //1,取出当前td中的文本内容保存起来 
	  var text=td.text(); 
	  //2,清空td里面的内容 
	  td.html(""); //也可以用td.empty(); 
	  //3，建立一个文本框，也就是input的元素节点 
	  var input=$("<input>"); 
	  //4，设置文本框的值是保存起来的文本内容 
	  input.attr("value",text); 
	  input.bind("blur",function(){ 
	    var inputnode=$(this); 
	    var inputtext=inputnode.val();
	    if(name=='serialno'){
	    	cmmdtyCheck(inputtext,tdobject);
	    }if(name=='nowprice'){
	    	priceCheck(inputtext,tdobject);
	    }	    
	    var tdNode=inputnode.parent(); 
	    tdNode.html(inputtext); 
	    tdNode.click(tdclick); 
	    td.attr("onclick", "tdclick(this)"); 
	  }); 
	  input.keyup(function(event,tdobject){
		  if(name=='serialno'){
				$(this).val($(this).val().replace(/[^\d]/g, ""));
		    }
		  if(name=='nowprice'){
		    	//$(this).val($(this).val().replace(/[^\d.]/g, ""));
		    	//修复第一个字符是小数点 的情况.  
		        if($(this).val() !=''&& $(this).val().substr(0,1) == '.'){  
		        	$(this).val("");  
		        }  
		        $(this).val($(this).val().replace(/^0*(0\.|[1-9])/, '$1'));//解决 粘贴不生效  
		        $(this).val($(this).val().replace(/[^\d.]/g,""))  ;  //清除“数字”和“.”以外的字符  
		        $(this).val($(this).val().replace(/\.{2,}/g,"."))  ; //只保留第一个. 清除多余的       
		        $(this).val($(this).val().replace(".","$#$").replace(/\./g,"").replace("$#$",".")) ;      
		        $(this).val($(this).val().replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'))  ;//只能输入两个小数       
		        if($(this).val().indexOf(".")< 0 && $(this).val() !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
		            if($(this).val().substr(0,1) == '0' && $(this).val().length == 2){  
		            	$(this).val($(this).val().substr(1,$(this).val().length));      
		            }  
		        }      
		    }	
	    var myEvent =event||window.event; 
	    var kcode=myEvent.keyCode; 
	    if(kcode==13){ 
	      var inputnode=$(this); 
	      var inputtext=inputnode.val(); 
	      var tdNode=inputnode.parent(); 
	      tdNode.html(inputtext); 
	      tdNode.click(tdclick); 
	    }  
	  }); 
	 
	  //5，将文本框加入到td中 
	  td.append(input); 
	  var t =input.val(); 
	  input.val("").focus().val(t); 
	  //input.focus(); 	  
	  
	  //6,清除点击事件 
	  td.unbind("click"); 
	  td.mouseleave(function(){
	  td.css("background-color","");
	   });
	  
	}
	
	//给table序号赋值
	function reSerialtd() {
	    var trlength = $("#para_table").find("tr").length;
	    var trs= $("#para_table").find("tr");
	    for(var i =1;i<trlength;i++){
	        trs.eq(i).find("td").eq(1).text(i);
	    }
	}
	
	function addtr(){ 	  
	  var table = $("#para_table");
		var tr= $("<tr>" + 
		"<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
		"<td name ='serialno' style='text-align: center;' onclick='tdclick(this)'>"+"</td>" + 
	    "<td name ='nowprice' style='text-align: center;' onclick='tdclick(this)'>"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td style='text-align: center;' >"+"</td>" + 
	    "<td align='center' onclick='deletetr(this)'><button type='button' class='btn btn-xs btn-link' >"+"删除"+"</button></td></tr>"); 
	  table.append(tr); 
	  reSerialtd();
	};
	
	function addT(){
		 var trlength = $("#para_table").find("tr").length;
		  if(trlength<16){
		      for(var i =0;i<5;i++) {
		    	  addtr();
		      }
		  } else if(trlength<21){
		      var line = 21-trlength;
		      for(var i =0;i<line;i++){
		    	  addtr();
		      }
		  }
		else{
			npmsAlert('明细行数已超过20条不允许新增！');	  
		}
		return false;
	}
	
	function deletetr(tdobject){
	  var td=$(tdobject); 
	  td.parents("tr").remove(); 
	  reSerialtd();
		} 
			
	//初始化时间方法
	function initDate(){
		//设置开始日期为当前日期
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
			    }
		var now = date.getFullYear() + seperator1 + month + seperator1 + strDate 
		//+" " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
			    	
		 //设置开始日期为当前日期的前一个月
//		date.setMonth(date.getMonth()-1);
//		var begin = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()+
//	    " " + date.getHours() + seperator2 + date.getMinutes() +seperator2 + date.getSeconds();		
		$("#startTime").val(now);
		$("#endTime").val("9999-12-31");
	}
	
	/**
	  * 校验供应商和货比信息的方法
	  */  
	function supplierInfo(){
		var supplierCheck=false;
		var supply=$('#supplier').val();		
		if(supply!=''&&supply!=null){
			//补全10位
			supply = appendSupplierCodeUtil(supply);
		    $('#supplier').val(supply);
			$.ajax({
				url : 'supplierInfo.action',
				type : "post",
				async : false,
				//timeout : 5000,//设置超时时间，单位为毫秒
				data : {
						'supplier': supply
				         },
				success : function(dataF) {
					if(dataF.successFlag=='S'){
						//给供应商描述赋值
						$('#remarks').val(dataF.remarks);						
						/**
						  * 校验货比信息的方法
						  */  					
						var purcOrg = $('#purc_org>.zg-inpMany>.zg-form-control').html();
						if(purcOrg!=''&&purcOrg!=null){
								$.ajax({
									url : 'supplier_orgCheck.action',
									type : "post",
									async: false,
									data : {
											'supplier': supply,
											 'org': purcOrg
									         },
									success : function(dataF) {
										if(dataF.successFlag=='S'){
											$('#currency').val(dataF.currency);	
											supplierCheck=true;
										}
										else if(dataF.successFlag=='E'){
											$('#supplier').val('');
											$('#currency').val('');
											$('#remarks').val('');
											npmsAlert(dataF.errorMsg);		
											return false;
										}
									},
									error: function(XMLHttpRequest) {
										$('#currency').val('');
										npmsAlert('获取货比信息失败!');		
							        }
								});
							}
							}				
					else if(dataF.successFlag=='E'){
						$('#remarks').val('');
						$('#currency').val('');
						npmsAlert(dataF.errorMsg);	
						return false;
					}
				},
				error: function(XMLHttpRequest) {
					$('#remarks').val('');
					$('#currency').val('');
					npmsAlert( '获取供应商信息失败!');		
		        }
			});
		}else{
			$('#remarks').val('');
			$('#currency').val('');
		}
		return supplierCheck;
		}
	
	/**
	  * 校验采购组织信息的方法
	  */  
	function purcOrgExistCheck(){
		var purcOrg = $('#purc_org>.zg-inpMany>.zg-form-control').html();
		if(purcOrg!=''&&purcOrg!=null){				
			$.ajax({
				url : 'purcOrgsExistCheck.action',
				type : "post",
				async: false,
				data : {
						'purcOrg': purcOrg
				         },
				success : function(dataF) {
					$('#currency').val('');
					if(dataF.successFlag=='S'){					
						//输入多个
						if(purcOrg.indexOf(",")!=-1){							
							//校验在表统购采购组织表中匹配满足的记录
							$.ajax({
								url : 'purcOrgsCheck.action',
								type : "post",
								async: false,
								data : {
									'purcOrg': purcOrg
								         },
								success : function(dataT) {
									if(dataT.successFlag=='S'){
										//当抬头输入的采购组织均不在表统购采购组织配置表中时，控制地点必须为空
										$('#plant_left>.zg-inpMany>.zg-form-control').empty();
										$('#inp-area-plant').prop("disabled", "disabled");
										//事业部和采购组织组合校验
										 if($('#bus_code>.zg-inpMany>.zg-form-control').html().indexOf(",")!=-1){
								            	$.ajax({
								        			url : 'bus_orgCheck.action',
								    				type : "post",
								    				async: false,
								    				data : {
								    						 'bus':$('#bus_code>.zg-inpMany>.zg-form-control').html(),
								    						 'org':purcOrg
								    				         },
								    				success : function(dataP) {								    			
								    					if(dataP.successFlag=='S'){
								    						
								    					}
								    					else if(dataP.successFlag=='E'){
								    						npmsAlert(dataP.errorMsg);
								    						return false;
								    					}   					
								    				},
								    				error: function(XMLHttpRequest) {
								    				 npmsAlert('获取事业部和采购组织校验信息失败!');		
								    				}
								            	});
								            }
									}
									else if(dataT.successFlag=='E'){										
										$('#inp-area-plant').removeAttr("disabled");
										npmsAlert("这些采购组织<font color='#ff0000' size='3'>"+purcOrg+"</font>不能同时创建供价!");
										return false;
									}
									else{
										$('#inp-area-plant').removeAttr("disabled");						
									}
								},
								error: function(XMLHttpRequest) {
									$('#currency').val('');
									npmsAlert('获取采购组织信息失败!');						
						        }
							});
						}//输入一个，校验在表统购采购组织表中匹配满足的记录，不满足控制地点禁止输入
						else{
							$.ajax({
								url : 'purcT_OrgCheck.action',
								type : "post",
								async: false,
								data : {
									'purcOrg': purcOrg
								         },
								success : function(dataU) {
									if(dataU.successFlag=='E'){
										 //npmsAlert('该采购组织供价地点必须为空!');
										//当抬头输入的采购组织不在表统购采购组织配置表中时，控制地点必须为空
										$('#plant_left>.zg-inpMany>.zg-form-control').empty();
										$('#inp-area-plant').prop("disabled", "disabled");										
										//事业部和采购组织组合校验
										 if($('#bus_code>.zg-inpMany>.zg-form-control').html().indexOf(",")!=-1){
								            	$.ajax({
								        			url : 'bus_orgCheck.action',
								    				type : "post",
								    				async: false,
								    				data : {
								    						 'bus':$('#bus_code>.zg-inpMany>.zg-form-control').html(),
								    						 'org':purcOrg
								    				         },
								    				success : function(dataP) {
								    					if(dataP.successFlag=='S'){
								    						
								    					}
								    					else if(dataP.successFlag=='E'){
								    						npmsAlert(dataP.errorMsg);
								    						return false;
								    					}   					
								    				},
								    				error: function(XMLHttpRequest) {
								    				 npmsAlert('获取事业部和采购组织校验信息失败!');		
								    				}
								            	});
								            }
									}
									else if(dataU.successFlag=='S'){										
										$('#inp-area-plant').removeAttr("disabled");									
										//事业部和采购组织组合校验
										 if($('#bus_code>.zg-inpMany>.zg-form-control').html().indexOf(",")!=-1){
								            	$.ajax({
								        			url : 'bus_orgCheck.action',
								    				type : "post",
								    				async: false,
								    				data : {
								    						 'bus':$('#bus_code>.zg-inpMany>.zg-form-control').html(),
								    						 'org':purcOrg
								    				         },
								    				success : function(dataP) {
								    					if(dataP.successFlag=='S'){
								    						
								    					}
								    					else if(dataP.successFlag=='E'){
								    						npmsAlert(dataP.errorMsg);
								    						return false;
								    					}   					
								    				},
								    				error: function(XMLHttpRequest) {
								    				 npmsAlert('获取事业部和采购组织校验信息失败!');		
								    				}
								            	});
								            }
										  }
										},
								error: function(XMLHttpRequest) {
								         npmsAlert('发送采购组织是否通采组织请求失败！'); 
								         }
								         });				
						}
					}
					else if(dataF.successFlag=='E'){
						$('#inp-area-plant').removeAttr("disabled");
						var messageInfo=[];
						for(var i=0;i<dataF.errorMsgList.length;i++){
							messageInfo.push(dataF.errorMsgList[i]);
						}
						npmsAlert("您输入的采购组织<font color='#ff0000' size='3'>"+messageInfo+"</font>不存在!"); 	
						return false;
					}
				},
				error: function(XMLHttpRequest) {
					$('#inp-area-plant').removeAttr("disabled");
					npmsAlert('获取采购组织信息失败!');
					$('#currency').val('');		
		        }
			});
		}		
	}
	
	/**
	  * 校验事业部的方法
	  */  
	function busExistCheck(){
		var bus=$('#bus_code>.zg-inpMany>.zg-form-control').html();		
		if(bus!=''&&bus!=null){				
			$.ajax({
				url : 'busCheck.action',
				type : "post",
				async: false,
				data : {
						'bus': bus
				         },
				success : function(dataF) {
					if(dataF.successFlag=='S'){	
						bus_AuthCheck();
					}
					else if(dataF.successFlag=='E'){
						var messageInfo=[];
						for(var i=0;i<dataF.errorMsgList.length;i++){
							messageInfo.push(dataF.errorMsgList[i]);
						}
						npmsAlert("您输入的事业部<font color='#ff0000' size='3'>"+messageInfo+"</font>不存在!");	
						return false;
					}
				},
				error: function(XMLHttpRequest) {
					npmsAlert('发送事业部存在校验请求失败!');
					return false;
		        }
			});
		}
		}
	
	
	/**
	 * 校验事业部是否为数字
	 */
	function clearNoNum() {
		var obj=$("#inp-area-Bus");
	    obj.val(obj.val().replace(/[^\d\r\n]/g, "")); //清除“数字”以外的字符	 
	}
	
	/**
	  * 控制地点的输入
	  */ 
	function plantContrl(){
		var obj=$("#inp-area-plant");
	    obj.val(obj.val().replace(/[^\w\r\n-]/g, "")); //清除“数字和字母、-”以外的字符	
	}
	
	/**
	  * 校验地点的方法
	  */  
	function plantCheck(){		
		var purcOrg = $('#purc_org>.zg-inpMany>.zg-form-control').html();
		if(purcOrg==null||purcOrg==''){
			npmsAlert('输入地点之前必须输入采购组织!');
			$('#plant_left>.zg-inpMany>.zg-form-control').empty();
			return false;
		}
		var pleft=$('#plant_left>.zg-inpMany>.zg-form-control').html();
		var pCheck=true;		
		//如果要输入区间值，就不能再输入多个值
		if(pleft.indexOf(',')!=-1&&pleft.indexOf("-")!=-1){	
			npmsAlert('输入的地点的格式不对，请重新输入!');	
			return false;
		} 
		if(pleft.indexOf("-")!=-1&&pleft.length!=9){
			npmsAlert('输入的地点的格式不对，请重新输入!');	
			return false;
		}
		if(pleft!=""){
			 $.ajax({
					url : 'plantCheck.action',
					type : "post",
					async: false,
					data : {
							'pl': pleft,
							'org':purcOrg
					         },
					success : function(dataF) {
						if(dataF.successFlag=='S'){
							//pCheck=true;
						}
						else if(dataF.successFlag=='E'){
							npmsAlert(dataF.errorMsg);	
							return false;
						}					
					},
					error: function(XMLHttpRequest) {
						npmsAlert('获取地点信息失败!');	
						return false;
			        }				
				});
		     }
		return pCheck;
	}
	
	/**
	  * 校验事业部在品类对应业态配置校验订单类型的方法
	  */  
	function bus_OrderCheck(){
		var bus=$('#bus_code>.zg-inpMany>.zg-form-control').html();
		if(bus!=''&&bus!=null){
			 $.ajax({
				url : 'bus_orderTypeCheck.action',
				type : "post",
				async: false,
				data : {
						'bus': bus,
						'order': $("#orderType").val(),
				         },
				success : function(dataO) {
					if(dataO.successFlag=='S'){
					
					}
					else if(dataO.successFlag=='E'){
						npmsAlert(dataO.errorMsg);
					}
				},
				error: function(XMLHttpRequest) {
					npmsAlert('获取事业部在品类对应业态配置信息失败!');	
		        }
			});
		  }
	}
	
	/**
	  * 校验权限
	  */  
	function bus_AuthCheck(){
		var bus=$('#bus_code>.zg-inpMany>.zg-form-control').html();
		if(bus!=''&&bus!=null){
			 $.ajax({
				url : 'NCgetPersonInfo.action',
				type : "post",
				async: false,
				data : {
						'bus': bus	
				         },
				success : function(dataA) {
					if(dataA.successFlag=='S'){						
						bus_OrderCheck();
					}
					else if(dataA.successFlag=='E'){
						npmsAlert(dataA.errorMsg);			
					}					
				},
				error: function(XMLHttpRequest) {
					npmsAlert('获取北冥系统RSF权限查询接口信息失败!');
		        }
			});
		  }
	}
	
	/**
	  * 校验采购组织是否是通采组织
	  */  
	function org_TCheck(){
		var purcOrg = $('#purc_org>.zg-inpMany>.zg-form-control').html();
		var org_TCheck=false;
		if(purcOrg!=''&&purcOrg!=null){
			 $.ajax({
				url : 'purcT_OrgCheck.action',
				type : "post",
				async: false,
				data : {
						'purcOrg': purcOrg	
				         },
				success : function(dataF) {
					if(dataF.successFlag=='S'){							
						 org_TCheck=true;
					}
					else if(dataF.successFlag=='E'){
						org_TCheck=false;				
					}					
				},
				error: function(XMLHttpRequest) {
					npmsAlert('发送采购组织是否通采组织请求失败');
					return false;
		        }
			});
		  }
		return org_TCheck;
	}
	
	function closed(){
		 $("#addDialog1").hide();
		 //刷新当前页面
		 location.reload();
		};   
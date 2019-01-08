/**
 * Created by zhoudexin.
 * ID: 12030466
 * Date: 12-9-29
 * Time: pm 3:31
**/


var myOpen = myOpen || {};

myOpen.leftFirMenu = function(btn){
	var btn = $(btn);
	var len = btn.length;
	btn.eq(0).addClass("on").siblings().show();
	btn.each(function(i){
		$(this).click(function(){
			if($(this).hasClass("on")){
				$(this).removeClass("on").siblings().hide();
			} else {
				$(this).addClass("on").siblings().show();
			}
		});
	});
}
myOpen.leftSecMenu = function(btn){
	var btn = $(btn);
	btn.toggle(function(){
		$(this).addClass("more").siblings(".moreList").hide();
	},
	function(){
		$(this).removeClass("more").siblings(".moreList").show();
	});
}
myOpen.tab = function(){
	var _tab = $(".tab");
	var btn = _tab.find("dt");
	var con = _tab.find("dd>div");
	btn.click(function(){
		var index = $(this).index();
		$(this).addClass("on").siblings("dt").removeClass("on");
		con.eq(index).removeClass("hide").siblings().addClass("hide");
	});
}
myOpen.ULtab = function(b,c){
	var _b = $(b) , _c = $(c);
	_b.click(function(){	
		$(this).addClass('on').siblings().removeClass('on');
		_c.hide().eq($(this).index()).show();	
	});
		
};
//打开关闭遮罩层	
myOpen.grayLayerAction = function(bool){
	var grayLayer = $("#grayLayer");
	if(bool){
		grayLayer.css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
		grayLayer.find("iframe").css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	}else{
		grayLayer.hide();
	}
};
//2014-02-25 yuwenxiu 不打开遮罩层
myOpen.openWin1 = function(c){
	var obj = $("."+c);
	myOpen.grayLayerAction(false);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	//obj.css({top:ctop+"px"});
	return false;
};

//打开弹窗
myOpen.openWin = function(c){
	var obj = $("."+c);
	myOpen.grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	//obj.css({top:ctop+"px"});
	return false;
};
myOpen.closeWin = function(c){
	var obj = $("."+c);
	obj.hide();
	myOpen.grayLayerAction(false);
	}
//select切换
myOpen.change = function(value,c,tag){
	var divArray = $("."+c).find(tag+".sele");
 	for (var i=0;i<divArray.length;i++) {
  		if (divArray[i].id == value) {
		divArray[i].style.display="";
  		}else {
   		divArray[i].style.display="none";
  		}
 	}
};
//table行渐变
myOpen.tableTR = function(){
	$('table.tableMes tr').each(function(){
		if($(this).index()%2!=0){
		$(this).css('background','#f5f5f5');	
		}
	});
};
//清空输入框
myOpen.clearTxt =  function(input,classOn){
	var _input = $(input) , _txt = _input.val();	
	_input.focus(function(){
		if($(this).val() ==_txt){
			$(this).val('').addClass(classOn);	
		}
	});
	_input.blur(function(){
		if($(this).val() ==''){
			$(this).val(_txt).removeClass(classOn);
		}
	});
};
//弹框table切换
myOpen.popChange = function(o){
	var popC = $("."+o)
	var popB = popC.find("a.case7");
	popB.toggle(
		function(){
			$(".popTable1").hide();
			$(".popTable2").show();
			},
		function(){
			$(".popTable1").show();
			$(".popTable2").hide();
			})
}
//导航条下拉
function addhover(o){
	$(o).find(".menuHd").eq(0).addClass("hover");
	$(o).find("div").show();
	$(o).css("z-index",2);
};
function delhover(o){
	$(o).find(".menuHd").eq(0).removeClass("hover");
	$(o).find("div").hide();
	$(o).css("z-index",1);
};
 
//选择语言
function showLan(o){
	$(o).find("b").css("background-position","0 -50px");
	$(o).find("em").css("display","block");
}
function hideLan(o){
	$(o).siblings().find("b").css("background-position","0 -45px");
	$(o).css("display","none");
}
function selectLan(o){
	var lan = $(o).text();
	var _html = lan + "<b></b>";
	//$(".language").find("em").css("display","none");
	$(o).parent().hide().siblings().html(_html);
}
//激活时改变输入框边框色
function changeTextBorder(){
	var inputs1 = $("input[type='text']");
	var inputs2 = $("input[type='password']");
	var uiText = $(".uiText");
	uiText.bind("focus",function(){
		$(this).addClass("focus");
	});
	uiText.bind("blur",function(){
		$(this).removeClass("focus");
	});
	var uiTxt = $(".uiTxt");
	uiTxt.bind("focus",function(){
		$(this).addClass("focus");
	});
	uiTxt.bind("blur",function(){
		$(this).removeClass("focus");
	});
};
//设置快捷键
function setKeys(o){
	$(o).siblings(".setBox").removeClass("hide");
}
function closeKeys(o){
	$(o).parent().addClass("hide");
}
function setDisabled(o){
	$(o).attr("disabled","disabled");
}
function myshopSelect(){
	$(".openShopboxUp select").change(function(){
		if($(this).val()!="")
		{
			$(this).parent().find("a").show();
		}
		else
		{
			$(this).parent().find("a").hide();
		}
	});
}
function agreementChose(o){
	var $btn = $(o).parent().find(".uiBtn");
	$(o).change(function(){
		if($(o).attr("checked"))
		{
			$btn.removeClass("disable");
			$btn.one('click',function(){
				 myOpen.closeWin('shopOut');
			});
		}
		else
		{
			$btn.addClass("disable");
		}
	})
}
function shopTemplate(){
	var $img=$(".tempbox").find("img");
	$img.hover(function(){
		$(this).addClass("on");
	},function(){
		$(this).removeClass("on");
	});
}
//用户体验计划之控制字符
function limitchar(area,numbox){
    var area = $(area);
    var dom = $(numbox);
    var stext = dom.text();
    var val = area.val();
    var len = val.length;
    dom.removeAttr("style").text(len);
};
//动态删除附件
function deledoc(){
	$('.dele a').click(function(){
		$(this).parent().parent().remove();
	});
}
/*****点击关闭 设置弹出框 *****/
function closeKey002(){
	
	$(".leftIcon002").toggle();
	$(".collection").toggle();
}

function setKeys002(){
	$(".leftIcon002").toggle();
	$(".collection").toggle();
}

//售价气泡
function qibao(){
        $(".web-boll").hover(function(){
            $(this).addClass("web-boll-hover");
        },function(){
            $(this).removeClass("web-boll-hover");
        });
       }
//查看订单详情 2013-7-17 xiaolong 
function viewOrderDetails(obj){
	obj.toggle(function(){
		$(this).text("收起订单详情");
		var o = $(this).parents(".view-order-tr").nextUntil(".view-order-tr").show();
		var i = o.length;
		$(this).parents(".view-order-tr").next("tr").find(".status-current").attr("rowspan",i-1);
	},function(){
		$(this).text("查看订单详情");
		var o = $(this).parents(".view-order-tr").nextUntil(".view-order-tr").hide();
		$(this).parents(".view-order-tr").next("tr").show();
		$(this).parents(".view-order-tr").next("tr").find(".status-current").attr("rowspan",1);
	});
}
// 2013-12-17 yuwenxiu 
 // 申请信息查看   tab切
function confirmTab(){
	$(".tabBtn li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var i = $(this).index();
		$(".hetong-confirm").hide().eq(i).show();
	});
}
//申请新类目----已选择的类目 
function hasSelected(){
	$(".kinds-table li").hover(function(){
		$(this).addClass("selected");
	},function(){
		$(this).removeClass("selected");
	});

}
// 上传资质----品牌授权证明
function upziZhi(){
	$(".add-license li").hover(function(){
		$(this).addClass("on");
		$(".add-license li .delet").click(function(){
			$(this).prev("img").attr("src","../images/add-newKind_04.png");
			$(this).next().removeClass("hasup");
			$(this).remove();
		});
	},function(){
		$(this).removeClass("on");
	});
}
//类目查询
 function kindsOption(){
 	// 一级类目 鼠标悬浮效果
 	$(".run-kinds .run-kinds-option").hover(function(){
 		$(this).addClass("has-selected");
 	},function(){
 		$(this).removeClass("has-selected");
 	});
 	// 一级类目鼠标点击效果
 	$(".run-kinds .run-kinds-option").click(function(){
 		$(this).addClass("on").siblings().removeClass("on");
 	});

 	// 当前的选择:鼠标悬浮效果
 	$(".kind-has-select li em").hover(function(){
 		$(this).addClass("remove-hover");
 	},function(){
 		$(this).removeClass("remove-hover");
 	});
	
	// table里面二级类目删除
	$(".kinds-seconds li").live("mouseover",function(){
 		$(this).addClass("selected");
 	});
	$(".kinds-seconds li").live("mouseout",function(){
 		$(this).removeClass("selected");
 	});
 	//table里面三级类目删除
 	$(".kinds-three li").live("mouseover",function(){
 		$(this).addClass("selected");
 	});
	$(".kinds-three li").live("mouseout",function(){
 		$(this).removeClass("selected");
 	});
	
 	// 类目申请进度
 	$(".hetong-zizhi-jindu em").click(function(){
 		$(this).parents(".hetong-zizhi-jindu").hide();
 		$(".hetong-zizhi-jindu2").show();
 	});
 	$(".hetong-zizhi-jindu2 em").click(function(){
 		$(this).parents(".hetong-zizhi-jindu2").hide();
 		$(".hetong-zizhi-jindu").show();
 	});
 }
function checkAll(){
		// table的全选
		$(".confirm-table .brand-input").click(function(){
			$('.confirm-table .brand-input1:checkbox').attr("checked",this.checked);
		});  
		$('.confirm-table .brand-input1:checkbox').click(function(){
		var $temp = $('.confirm-table .brand-input1:checkbox');
		$('.confirm-table .brand-input').attr('checked',$temp.length==$temp.filter(':checked').length);
		});
	}
//一级类目选择
// function newchoiceSelect(){
// 	$(".selected-items0").click(function(){
		
// 	});
// }
//二级类目选择
function newchoiceSelect2(){
	//全选
	$(".select-all input").click(function(){
		var aIndex = $(this).parent("li").nextAll();		//计算总共有多少行数据
		if($(this).is(":checked")){
			aIndex.each(function(){
				var objj = $(this);
				objj.find("input").attr("checked",true);
				//先把相同的删除
				$(".kinds-seconds li span").each(function(){
					if($.trim($(this).text()) == $.trim(objj.find("span").text())){
							$(this).parent(".kinds-seconds li").remove();
					}
				});
				//然后在添加
				$('<li class="clearfix"><span>'+$.trim(objj.find("span").text())+'</span><em class="kinds-remove"></em></li>').appendTo($(".kinds-seconds"));
			});
		}else{
			aIndex.each(function(){
				var obj = $(this);
				obj.find("input").attr("checked",false);
				$(".kinds-seconds li span").each(function(){
					if($.trim($(this).text()) == $.trim(obj.find("span").text())){
						$(this).parent(".kinds-seconds li").remove();
					}
				});
			});
		}
		//把内容丢到下面框框中去
	});
	//选择单个
	$(".select-items input").click(function(){
		var obj = $(this);
		var flag = true;
		$(this).parents(".run-kinds").find("input:not(li.select-all input)").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			};
		});
		$(this).parent("li").siblings("li.select-all").find("input").attr("checked",flag);

		if($(this).is(":checked")){
			var t = $.trim($(this).next().text());
			$('<li class="clearfix"><span>'+t+'</span><em class="kinds-remove"></em></li>').appendTo($(".kinds-seconds"));
		}else{
			$(".kinds-seconds li span").each(function(){
				if($.trim($(this).text()) == $.trim(obj.next("span").text())){
					$(this).parent(".kinds-seconds li").remove();
				}
			});
		};
	});
	//删除功能
	$(".kinds-seconds li em").live("click",function(){
		var tte = $.trim($(this).parents("li").text());
		var htm = $(".select-items");
		htm.each(function(){
			if($.trim($(this).find("span").text()) == tte){
				$(this).find("input").attr("checked",false);		//勾掉
				$(this).siblings("li.select-all").find("input").attr("checked",false);		//全选也勾掉
			}
		});
		$(this).parent(".kinds-seconds li").remove();
	});
}
// 三级类目选择
function newchoiceSelect3(){
	//全选
	$(".select-all3 input").click(function(){
		var aIndex = $(this).parent("li").nextAll();		//计算总共有多少行数据
		if($(this).is(":checked")){
			aIndex.each(function(){
				var objj = $(this);
				objj.find("input").attr("checked",true);
				//先把相同的删除
				$(".kinds-three li span").each(function(){
					if($.trim($(this).text()) == $.trim(objj.find("span").text())){
							$(this).parent(".kinds-three li").remove();
					}
				});
				//然后在添加
				$('<li class="clearfix"><span>'+$.trim(objj.find("span").text())+'</span><em class="kinds-remove"></em></li>').appendTo($(".kinds-three"));
			});
		}else{
			aIndex.each(function(){
				var obj = $(this);
				obj.find("input").attr("checked",false);
				$(".kinds-three li span").each(function(){
					if($.trim($(this).text()) == $.trim(obj.find("span").text())){
						$(this).parent(".kinds-three li").remove();
					}
				});
			});
		}
		//把内容丢到下面框框中去
	});
	//选择单个
	$(".select-items3 input").click(function(){
		var obj = $(this);
		var flag = true;
		$(this).parents(".run-kinds").find("input:not(li.select-all3 input)").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			};
		});
		$(this).parent("li").siblings("li.select-all3").find("input").attr("checked",flag);

		if($(this).is(":checked")){
			var t = $.trim($(this).next().text());
			$('<li class="clearfix"><span>'+t+'</span><em class="kinds-remove"></em></li>').appendTo($(".kinds-three"));
		}else{
			$(".kinds-three li span").each(function(){
				if($.trim($(this).text()) == $.trim(obj.next("span").text())){
					$(this).parent(".kinds-three li").remove();
				}
			});
		};
	});
	//删除功能
	$(".kinds-three li em").live("click",function(){
		var tte = $.trim($(this).parents("li").text());
		var htm = $(".select-items3");
		htm.each(function(){
			if($.trim($(this).find("span").text()) == tte){
				$(this).find("input").attr("checked",false);		//勾掉
				$(this).siblings("li.select-all3").find("input").attr("checked",false);		//全选也勾掉
			}
		});
		$(this).parent(".kinds-three li").remove();
	});
}


//主数据 2013-12-20
//table行渐变
function dataTableColor(){
	$('table.data-table tr').each(function(){
		if($(this).index()%2!=0){
		$(this).css('background','#f5f5f5');	
		}
	});
	$('table.jindu-query-table tr').each(function(){
		if($(this).index()%2!=0){
			$(this).css('background','#f5f5f5');
		}
	});
}
// 编辑
function editTable(){
	$(".data-title .edit-btn").click(function(){
		$(".data-table td .old-data").hide();
		$(".data-table td .new-data").show();
	});
}
//商家信息修改 编辑 2013-12-23
function businessEidt(){
	// 编辑
	$(".l-align .data-edit-btn").click(function(){
		$(".l-align").hide();
		$(".data-input").show();
		$(".data-caozuo").hide();
		$(".data-caozuo2").show();
		$(".data-up").show();
		$(".md-caozuo").hide();
		$(".md-caozuo2").show();
		$(".md-list li").hover(function(){
		$(this).addClass("on");
		$(this).find(".delet").click(function(){
			$(this).parent("li").find("img").attr("src","../images/md_up2.png");
			$(this).parent("li").find(".data-hasup").removeClass("data-hasup");
			$(this).remove();
		});
	},function(){
		$(this).removeClass("on");
	});
	});
	//输入框提示框
	$(".data-input input").focus(function(){
		$(".data-web-boll").hide();
		$(this).parents("td").find(".data-web-boll").show();
		$(this).parents("td").find(".data-web-boll .msg-wrong .close").click(function(){
			$(this).parents(".data-web-boll").hide();
		});
	});
	// 查看进度
	$(".look-jindu-btn").toggle(function(){
	 	$(".jindu-box").show();
		$(this).parents("tr").css('background','#b6d6f6');
	},function(){
		$(".jindu-box").hide();
	});
}
// 附件
function affixUp(){
	$(".affix-list .affix-pic").hover(function(){
		$(this).addClass("on");
		$(".affix-list .affix-pic .delet").click(function(){
			$(this).prev("img").attr("src","../images/add-newKind_04.png");
			$(this).parents("li").find(".data-hasup").removeClass("data-hasup");
			$(this).remove();
		});
	},function(){
		$(this).removeClass("on");
	});
}
//2014-02-20 yuwenxiu 合同续签 查看
function htScan(){
	$(".ht-basic-zizhi .ht-img ,.ht-basic-zizhi .ht-scan").click(function(){
		var i = $(this).parents("tr").index();
		$(this).parents(".ht-pre").find(".ht-pic").show();
		var _htli = $(this).parents(".ht-pre").find(".ht-pic li");
		_htli.eq(i).addClass("on").siblings().removeClass("on");
		$(this).parents(".ht-pre").find(".ht-pic li em").click(function(){
			$(this).parents(".ht-pic").hide();
		});
	});
	// $(".ht-reason").hover(function(){
	// 	$(".ht-qipao").show();
	// },function(){
	// 	$(".ht-qipao").hide();
	// });
	// 续签进度查询
	$(".jindu-ht-cff span").hover(function(){
		$(this).next(".ht-qipao").show();
	},function(){
		$(this).next(".ht-qipao").hide();
	});
	$(".ht-table .pre span").hover(function(){
		$(this).next(".ht-chg-qipao").show();
	},function(){
		$(this).next(".ht-chg-qipao").hide();
	});
	$(".tabBtn li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var i = $(this).index();
		$(".ht-change").hide().eq(i).show();
	});
}
//合同续签 全选
function htallChe(){
	$("#all_Che").click(function(){
		$('[name=ht_items]:checkbox').attr("checked",this.checked);
	});
	$('[name=ht_items]:checkbox').click(function(){
		var $temp = $('[name=ht_items]:checkbox');
		$('#all_Che').attr('checked',$temp.length==$temp.filter(':checked').length);
	});
}
//多仓寻源 tab切换 yuwenxiu 20140305
function cankuTab(){
	$(".canku-tab li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
		var i = $(this).index();
		$(".canku-list").hide().eq(i).show();
	});
}
function cankuTips(){
	$(".canku-pre").hover(function(){
		$(this).parent("td").find(".canku-qipao").show();
	},function(){
		$(this).parent("td").find(".canku-qipao").hide();
	});
}
//仓库滚动
function cankuScroll($wrap,n,step){
	var btnl = $(".canku-control").find(".ck-l");
	var btnr = $(".canku-control").find(".ck-r");
	var box = $(".canku-manny");
	var move = box.find(".canku-manny-num");
	var oli = move.find("ul");
	var len = box.find("ul").length;
	var i = 0;
	var w =696;
	 btnl.click(function(){
        if(len == 1 || move.is(":animated"))return false;
        if(i==0){
        	return false;
	    }
        i--;      
         	btnr.addClass("canku-next").removeClass("canku-next-disable");
         	 move.stop().animate({marginLeft:-i*w},300,function(){
	            if(i==0){
	            	btnl.removeClass("canku-prev").addClass("canku-prev-disable");
				}
	        })
    });
	btnr.click(function(){
	 	 if(len == 1 || move.is(":animated"))return false;
        if(i == len-1){
			return false;
		}
        i++;
        btnl.addClass("canku-prev").removeClass("canku-prev-disable");
        	move.stop().animate({marginLeft:-i*w},300,function(){
	            if(i==len-1){
        			btnr.removeClass("canku-next").addClass("canku-next-disable");
				}
        	});		
	 	});
	}
function cankuRange(){
	$(".canku-chechbox i").click(function(){
		if($(this).is('.canku-add')){
			$(this).removeClass();
			$(this).removeClass("canku-add");
			$(this).siblings("ul.canku-child").hide();
		}else{
			$(this).removeClass();
			$(this).addClass("canku-add");
			$(this).siblings("ul.canku-child").show();
		}
	});
	//点击文字收起与展开
	$(".canku-chechbox span").click(function(){
		$(this).prev().prev().click();
	});
	// 打勾
	$(".canku-chechbox em").click(function(){
		if($(this).hasClass("canku-disable")){

		}else{
			if($(this).is(".good")){
				$(this).removeClass();
				$(this).removeClass("good");
				$(this).siblings("ul.canku-child").find("em").removeClass();
				$(this).siblings("ul.canku-child").find("em").removeClass("good");
			}else{
				$(this).removeClass();
				$(this).addClass("good");
				$(this).siblings("ul.canku-child").find("em").removeClass();
				$(this).siblings("ul.canku-child").find("em").addClass("good");
			}
	 	}	
	});
	//点击子类实现父类选中和半选中
	$(".canku-child li em").click(function(){
		if($(this).hasClass("canku-disable")){

		}else{
			oliem = $(this);
			var nn = $(this).parents(".canku-child").length;//父类
			for(var i = 0; i < nn;i++){
				var oem = $(this).parents(".canku-child").eq(i).siblings("em");//父类
				var num = $(this).parents(".canku-child").eq(i).find("em").length;//总共几个子类
				var n = $(this).parents(".canku-child").eq(i).find("em.good").length;//当前有几个被选中
				if(num == n){
					oem.removeClass();
					oem.addClass("good");//都选中了
				}else if(num > n && n > 0){
					oem.removeClass();//一部分子类被选中
					oem.addClass("dot");
				}else{
					oem.removeClass();//一个都没有选中
				}
			}
		}
	});
	
	// 一打开页面时，隐藏所有子类
	$(".canku-chechbox .canku-child").hide();
	//最后一层没有子类时，前面加减号消失
	// $(".canku-child li:not(:has('.canku-child'))").find("i").remove();
	// $(".canku-child li:not(:has('.canku-child'))").css({"paddingLeft":"18px"});

	// 点击子类实现父类选中和半选
}
// 20140324 ywx 商品级联参数
function jiucuopic(){
	$(".jiucuo-pre img").hover(function(){
		$(this).next(".del").show();
	});
	$(".jiucuo-pre .del").click(function(){
			$(this).prev("img").attr("src","./images/jiucuo1.png")
			$(this).remove();
		});
}
function alldelet(){
	$(".all-delete").click(function(){
		$(this).parent(".delet-pre").find(".qp-areaBox").show();
	});
	$(".qp_sure").click(function(){
		$(this).parents(".qp-areaBox").hide();
		$(this).parents(".car-notice").find(".pop-tips").fadeIn(800);
		$(this).parents(".car-notice").find(".pop-tips").fadeOut(800);
	});
	$(".qp_close").click(function(){
		$(this).parents(".qp-areaBox").hide();
	});
}
// 20140403 商品删除 ywx
function delGoods(){
	$(".re-allcheck").click(function(){
		$('[name=pr_items]:checkbox').attr("checked",this.checked);
	});
	$('[name=pr_items]:checkbox').click(function(){
		var $temp = $('[name=pr_items]:checkbox');
		$('.re-allcheck').attr('checked',$temp.length==$temp.filter(':checked').length);
	});
}

$(function(){
	viewOrderDetails($(".view-order-details"));
	myOpen.leftFirMenu(".leftMenu dt");
	myOpen.leftSecMenu(".leftMenu dd>em");
	myOpen.tab();
	myOpen.ULtab('ul.tabBtn li','.edu_Con');
	myOpen.tableTR();
	myOpen.clearTxt('.clearVal','inputTxton');
	changeTextBorder();
	deledoc();
	setDisabled($(".myshopCateList .gray"));
	myshopSelect();
	agreementChose("#shopoutAgreecb");
	shopTemplate();
	qibao();
	confirmTab();
	hasSelected();
	upziZhi();
	kindsOption();
	checkAll();
	dataTableColor();
	editTable();
	$(".contractList > li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");	
	});
	// newchoiceSelect();
	newchoiceSelect2();
	newchoiceSelect3();
	businessEidt();
	affixUp();
	htScan();
	htallChe();
	cankuTab();
	cankuTips();
	cankuScroll($(".canku-manny"),3,140);
	cankuRange();
	jiucuopic();
	alldelet();
	delGoods();
});


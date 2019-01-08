/*
*author zhangxiaolong  2012-10-7  at suning
*/

$(function(){
//下面代码实现表格的一个功能：点击展开\隐藏
$(".t1100 td ul li").css({"display":"none"});
$(".t1100 td ul li:first-child").css({"display":"block"});
$(".t1100 td img:not(.xiugai)").click(function(){
	$(this).attr("src") == "images/jian.png" ? $(this).attr("src","images/jia.png") : $(this).attr("src","images/jian.png");
	$(this).parents("tr").find("li:not(:first)").toggle();
	$(".ofTableBox").css({"overFlow":"auto"});
	$(this).parents("tr").nextUntil(".pat").toggle();
});

////下面代码实现表格的一个功能：点击展开\隐藏
$(".changeColor002 td ul li").css({"display":"none"});
$(".changeColor002 td ul li:first-child").css({"display":"block"});
$(".changeColor002 td img:not(.xiugai)").click(function(){
	$(this).attr("src") == "images/jian.png" ? $(this).attr("src","images/jia.png") : $(this).attr("src","images/jian.png");
	$(this).parents("tr").find("li:not(:first)").toggle();
	$(".ofTableBox").css({"overFlow":"auto"});
	$(this).parents("tr").nextUntil(".pat").toggle();
});

//重新获取iframe的高度
function iframeheight(){
	$("#grayLayer").find("iframe").height($(document).height());
}

//以下代码实现点击增加发货波次
function addCell(){
	$(".case677").click(function(){
		$("#copy").clone().insertBefore(".addtime001").show().removeAttr("id");
		$(".case666").click(function(){
			$(this).parents(".timecell001").remove();
			addline();
		});
		addline();
	});

	//排序
	function addline(){
		var n = 1;
		$(".addtime001").siblings(".timecell001:visible").each(function(){
			$(this).find("span.num1").html(n);
			n++;
		});	
	}

	//修改页面 实现点击增加发货波次
	$(".case688").click(function(){
		$("#copy002").clone().insertBefore(".addtime002").show().removeAttr("id");
		$(".case777").click(function(){
			$(this).parents(".timecell002").remove();
			addline2();
		});
		addline2();
	});

	//排序
	function addline2(){
		var i = 1;
		$(".addtime002").siblings(".timecell002:visible").each(function(){
			$(this).find("span.num2").html(i);
			i++;
		});	
	}

}
addCell();

//数据立方表格的各行换色

function chartList(){
	$(".chartList table tr:even").css({"background":"#efefef"});	
}
chartList();
})

//2012-11-14 新增js代码 为数据立方服务
function sRingTab(){
	$(".case7").click(function(){
		var n = $(".daily input[type='radio']:checked").attr("father");
		$(".statisticalRanking").eq(n).show().siblings(".statisticalRanking").hide();
		$(this).blur();//解决ie8下面一个诡异的问题
	})
}

//查看下面Flash的Tab页切换
function  tabBtn2(){
	$(".tabBtn2 li").click(function(){
		var n = $(this).index();
		$(".bigFlashContent").eq(n).show().siblings(".bigFlashContent").hide();
	});
}

//放到问号上去的解释说明
function zxltips(){
	$(".sRankTable em").hover(function(ev){
		var i = null;
		var n = null;
		var event = ev || window.event;
		var x = event.clientX+$(document).scrollLeft();
		var y = event.clientY+$(document).scrollTop();
		i = $(this).parent("td").prev().prev().html();
		n = $(this).attr("value");
		$(".answerTitle").html(i);
		$(".answerContent").html(n);
		$(".zxltips").css({"top":y+20,"left":x-60}).show();
	},function(){
		$(".zxltips").hide().css({"top":"0px","left":"0px"});
	});
}

//判断表格行数超过10行数加滚动条
function addScroll(){
	var n = $(".statisticalRankingContent:visible .changeColor1115 tr").length;
	if(n > 12){
		$(".statisticalRankingContent:visible .proBoxY2").height(300);
	}
}

//为"前一天商品销量分析"页面第一个表格单独写的js
function addScroll2(){
	var n = $(".statisticalRankingContent:visible .changeColor1114 tr").length;
	if(n > 12){
		$(".statisticalRankingContent:visible .changeColor1114").parent(".proBoxY2").height(300);
	}
}

//自定义列项目弹出框的显示与隐藏
function dowing2(){
	var time = null;
	$(".dowing2").hover(function(){
		clearTimeout(time);
		$(".customItem").show();
	},function(){
		time = setTimeout(function(){
			$(".customItem").hide();
		},100);
	});
	
	$(".customItem").hover(function(){
		clearTimeout(time);
	},function(){
		time = setTimeout(function(){
			$(".customItem").hide();
		},100);
	});
}
function huibtn(){
	$(".huibtn").unbind("hover");
}



//移动商品列表
function moveGoods(){
	$("#delete").click(function(){
		for(var i = 1;i <= zxlmm; i++){	
			var ochild;
			var ofather;
			var n;
			var htm;
			var flag = true;//一开始当作没有元素
			var ohtml;
			if($('.leftChoiceGoods [name=s'+i+']').is(":selected")){
				$(".rightChoiceGoods option").each(function(){
					if($(this).attr("name") == 's'+i){
						$('.rightChoiceGoods [name=s'+i+']').remove();
					}
				});
				if($('.rightChoiceGoods [name^=s'+i+'-]').length == 0){
					$('.leftChoiceGoods [name=s'+i+']:selected').siblings('.leftChoiceGoods [name^=s'+i+'-]').appendTo($('.rightChoiceGoods'));
				}else{
					$('.leftChoiceGoods [name=s'+i+']:selected').siblings('.leftChoiceGoods [name^=s'+i+'-]').insertAfter($('.rightChoiceGoods [name^=s'+i+'-]').eq(0));
				}
				$('.leftChoiceGoods [name=s'+i+']:selected').insertBefore($('.rightChoiceGoods [name^=s'+i+'-]').eq(0));
			}
			ohtml = $('.leftChoiceGoods [name^=s'+i+'-]:selected').siblings('.leftChoiceGoods [name=s'+i+']');
			htm = ohtml.html();
			$(".rightChoiceGoods option").each(function(){
				if($(this).html() == htm){
					flag = false;
				}
			});
			if(flag == true){
				ohtml.clone().appendTo(".rightChoiceGoods");
			}
			$('.leftChoiceGoods [name^=s'+i+'-]:selected').insertAfter('.rightChoiceGoods [name=s'+i+']');
			if($('.leftChoiceGoods [name=s'+i+']').siblings('.leftChoiceGoods [name^=s'+i+'-]').length == 0){
				$('.leftChoiceGoods [name=s'+i+']').remove();
			}
		}
	});
	$("#add").click(function(){
		for(var i = 1;i <= zxlmm; i++){	
			var ochild;
			var ofather;
			var n;
			var htm;
			var flag = true;//一开始当作没有元素
			var ohtml;
			if($('.rightChoiceGoods [name=s'+i+']').is(":selected")){
				$(".leftChoiceGoods option").each(function(){
					if($(this).attr("name") == 's'+i){
						$('.leftChoiceGoods [name=s'+i+']').remove();
					}
				});
				if($('.leftChoiceGoods [name^=s'+i+'-]').length == 0){
					$('.rightChoiceGoods [name=s'+i+']:selected').siblings('.rightChoiceGoods [name^=s'+i+'-]').appendTo($('.leftChoiceGoods'));
				}else{
					$('.rightChoiceGoods [name=s'+i+']:selected').siblings('.rightChoiceGoods [name^=s'+i+'-]').insertAfter($('.leftChoiceGoods [name^=s'+i+'-]').eq(0));
				}
				$('.rightChoiceGoods [name=s'+i+']:selected').insertBefore($('.leftChoiceGoods [name^=s'+i+'-]').eq(0));
			}
			ohtml = $('.rightChoiceGoods [name^=s'+i+'-]:selected').siblings('.rightChoiceGoods [name=s'+i+']');
			htm = ohtml.html();
			$(".leftChoiceGoods option").each(function(){
				if($(this).html() == htm){
					flag = false;
				}
			});
			if(flag == true){
				ohtml.clone().appendTo(".leftChoiceGoods");
			}
			$('.rightChoiceGoods [name^=s'+i+'-]:selected').insertAfter('.leftChoiceGoods [name=s'+i+']');
			if($('.rightChoiceGoods [name=s'+i+']').siblings('.rightChoiceGoods [name^=s'+i+'-]').length == 0){
				$('.rightChoiceGoods [name=s'+i+']').remove();
			}
		}
	});
}

//点击表格头部实现排序功能
function ascOrDec2(){
	$(".dataTable .changeColor th").click(function(){
		var v = $(".ascTop",this).hasClass("hover1");
		if(v == false){
			$(".ascDown",this).removeClass("hover2");
			$(".ascTop",this).addClass("hover1");
		}else{
			$(".ascTop",this).removeClass("hover1");
			$(".ascDown",this).addClass("hover2");
		}
		
	});
}

//计算商品数量
function countGoods(){
	var i = 0;
	var n = $(".leftChoiceGoods option").length;
	$(".leftChoiceGoods option").each(function(){
		var m = $(this).attr("name").split("-");
		if($(this).attr("name") == m){
			i = i+1;
		}
	});
	$("#choiceGods").html("您已经选择了"+"<font color='red'><b>"+(n-i)+"</b></font>"+"件商品").show().next(".chioceGoods").html("修改");
}

//我的仓库弹出框添加功能
function myfactory(){
	var n;
	//添加
	$(".ckbtn").click(function(){
		$(".suning:hidden").clone().appendTo(".suningCenter").show();
		suningLenght();//数一数条数
	});
	//删除
	$(".ckDeleBtn").live("click",function(){
		$(this).parents(".suning").remove();
		suningLenght();//数一数条数
	});
	//我的仓库点击添加以后的个数然后加高出现滚动条
	function suningLenght(){
		n = $(".suning:visible").length;
		if(n > 5){
			$(".suningCenter").height(190);
		}else{
			$(".suningCenter").height("auto");
		}
	}
}
//我的仓库点击提交按钮
function viewTab(){
	$(".rightCon:eq(0)").hide();
	$(".rightCon:eq(1)").show();
}

//只能看
function viewing(){
	$(".bu").show().css({"z-index":"200"}).height("100%");
	$(".cktck").addClass("ckblank");
	$(".cktck table :input").attr("disabled",true).css({"color":"#adadad"});
	$(".cktck .ckbtn span").css({"color":"#adadad"});
	$(".cktck .ckbtn").unbind("click");
	$(".cktck .ckDeleBtn").css({"color":"#adadad"});
	$(".ckDeleBtn").remove();
	$(".ckbtn").remove();
	$(".cktck h2").html("查看仓库信息");
}

//客服管理
function shoopArea(){
	$(".shoopArea .shop:not(.shopHui)").toggle(function(){
		$(this).addClass("shopClick");
	},function(){
		$(this).removeClass("shopClick");
	});
	function shopNum(){
		var n = $(".shopClick").length;
		if(n == 0){
			myOpen.openWin('Pop1');
		}
	}
	$(".aggrenBtn .case1").click(function(){
		shopNum();
	});
	$(".aggrenWith input").click(function(){
		if($(this).is(":checked")){
			$(".aggrenBtn i").hide();
			$(".aggrenBtn a").show();
		}else{
			$(".aggrenBtn i").show();
			$(".aggrenBtn a").hide();
		}
	});
}
//客服管理tab页面
function moretab(){
	$(".moretab ul li:not(.noPass)").click(function(){
		$(".moretab ul li.on").removeClass("on");
		$(this).addClass("on");
		$(".kefuTabPage").eq($(this).index()).show().siblings(".kefuTabPage").hide();
	});
	$(".leftArrow").click(function(){
		var l = $(".moretab ul").position().left;
		if(l != "0"){
			$(".moretab ul").css({"left":l+137+"px"});
		}
	});
	$(".rightArrow").click(function(){
		var l = $(".moretab ul").position().left;
		if(!($(".moretab ul").is(':animated'))){
			$(".moretab ul").css({"left":l-137+"px"});
		}
		
	});
}

//客服管理的上传图片
function uploadPicture(){
	//火狐
	$(".uploadPicButton1 input").change(function(){
		if(this.value != ""){
			$(".pictureLink").show();
			$(".uploadPicButton2").addClass("hover");
			$(".postBtn a .huise").parent("a").removeAttr("style").attr("href","#");
			$(".postBtn a .huise").removeClass("huise");
		}
	});
	//ie
	$(".uploadPicButton1 input").get().onpropertychange = function(){
		if(this.value != ""){
			$(".pictureLink").show();
			$(".uploadPicButton2").addClass("hover");
			$(".postBtn a .huise").parent("a").removeAttr("style").attr("href","#");
			$(".postBtn a .huise").removeClass("huise");
		}
	}
	
	//网址校验
	$("#site").blur(function(){
		var re = /^(http:\/\/)?(www)\.(suning)\.(com)\/(.*)/;
		if(re.test($(this).val())){
				$("#errormsgbox").hide();
			}else{
				$("#errormsgbox").show();
		}
	});
	//点击使用默认头像按钮时 设置网址那块消失
	$(".uploadPicButton2.hover").live("click",function(){
		$(".pictureLink").hide();
		$(this).removeClass("hover");
		$(".frm")[0].reset();
	});
}

//原因提示框框的展示于隐藏
function reasonShow(){
	$(".reason").hover(function(){
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$(".reason2").css({"top":top-80,"left":left-230}).show();
	},function(){
		$(".reason2").hide();
	});
}

//点击修改 数据变成文本框可编辑状态
function ediToInput(){
	//点击修改
	$(".editing").click(function(){
		$(this).parents(".companyTable").find("span").each(function(){
			var t = $(this).text();				
			$(this).next("input[type='text']").val(t).show();	
			$(this).hide();
		});
		$(this).parents(".companyTable").find("td").css({"paddingBottom":"6px"});
		//让checked 可以点击
		$(this).parents(".companyTable").find(".dianpiao,.dianpiao2").removeAttr("disabled");
		
		//各种select特殊对待
		$(this).parents(".companyTable").find(".i1").next("select").find("option.fir").html($(".i1").html());
		$(this).parents(".companyTable").find(".i1").hide();
		$(this).parents(".companyTable").find(".i1").next("select").show();
		$(this).parents(".companyTable").find(".i1").nextAll(".tipFalse4").show();
		
		$(this).parents(".companyTable").find(".i2").next("input[type='text']").val($(".i2").text()).show();
		$(this).parents(".companyTable").find(".i2").hide();
		$(this).parents(".companyTable").find(".i2").nextAll(".em1").show();
		
		$(this).parents(".companyTable").find(".i3").hide();
		$(this).parents(".companyTable").find(".i3").next("select").show();
		$(this).parents(".companyTable").find(".i3").next(".xplace").show();
		
		$(this).parents(".companyTable").find(".i4").hide();
		$(this).parents(".companyTable").find(".i4").next("select").show();
		$(this).parents(".companyTable").find(".i4").nextAll(".em2").show();
		
		$(this).hide();//让数据消失
		$(this).next(".quxiao").show();//让编辑出来
	});
	//点击取消
	$(".quxiao").click(function(){
		$(this).parents(".companyTable").find("input[type='text']").each(function(){
			var t = $(this).val();				
			$(this).prev("span").html(t).show();	
			$(this).hide();
		});
		$(this).parents(".companyTable").find("td").css({"paddingBottom":"0px"});
		//让checked 可以点击
		$(this).parents(".companyTable").find(".dianpiao,.dianpiao2").attr("disabled",true);
		//各种select特殊对待
		$(this).parents(".companyTable").find(".i1").html($(".i1").next("select").find("option:selected").html()).show();
		$(this).parents(".companyTable").find(".i1").next("select").hide();
		$(this).parents(".companyTable").find(".i1").nextAll(".tipFalse4").hide();
		
		$(this).parents(".companyTable").find(".i2").text($(".i2").next("input[type='text']").val()).show();
		$(this).parents(".companyTable").find(".i2").nextAll(".em1").hide();
		
		$(this).parents(".companyTable").find(".i3").show();
		$(this).parents(".companyTable").find(".i3").next("select").hide();
		$(this).parents(".companyTable").find(".i3").next(".xplace").hide();
		
		$(this).parents(".companyTable").find(".i4").show();
		$(this).parents(".companyTable").find(".i4").next("select").hide();
		$(this).parents(".companyTable").find(".i4").nextAll(".em2").hide();
		
		$(this).hide();//让编辑消失
		$(this).prev(".editing").show();//让数据出来
	});
	
	//点击展示与隐藏
	$(".dianpiao").click(function(){
		if($(this).is(":checked")){
			$(".kaifu").show();
		}else{
			$(".kaifu").hide();
		}
	});
	$(".dianpiao2").click(function(){
		if($(this).is(":checked")){
			$(".kaifu2").show();
		}else{
			$(".kaifu2").hide();
		}
	});
	
	//表格背景换色
	$(".companyTable:not(.companyTable22)").hover(function(){
		$(this).css({"background":"#f1f1f1"});
	},function(){
		$(this).css({"background":"#ffffff"});
	});
	
	//点击底部取消按钮
	$(".qxxg").click(function(){
		$(".quxiao:visible").click();
	});
}

//选项卡
$PRM.ULtab = function(b,c){
	var _b = $(b) , _c = $(c);
	_b.click(function(){
	$(this).addClass('on').siblings().removeClass('on');
	_c.hide().eq($(this).index()).show();
	});
}; 

//选择品类
function weixue(){
	$(".weixue").change(function(){
		var i = $(".weixue option:selected").index();
		switch (i){
			case 0 : $(".huazp").hide();break;
			case 1 : $(".huazp").hide();$(".huazp").eq(0).show();break;
			case 2 : $(".huazp").hide();$(".huazp").eq(1).show();break;
		}
	});
}
//默认地址的出现
function morenPlace(){
	$(".moren-palce").parent("td").hover(function(){
		$(this).find(".moren-palce").show();
	},function(){
		$(this).find(".moren-palce").hide();
	});
}

//新运费模板城市选择
function choiceCitys(){
	//点击大区 全选
	$(".daqu").click(function(){
		if($(this).is(":checked")){
			$(this).parents("tr").find("input").attr("checked",true);
			$(this).parents("td").siblings().each(function(){
				var n = $(this).find("input").length-1;
				$(this).find(".nums").show().text("(" + n + ")");
			});
		}else{
			$(this).parents("tr").find("input").attr("checked",false);
			$(this).parents("tr").find(".nums").hide();
		}
	});
	//选择省份让大区全选与不选
	$(".citys > label").prev(":not('.daqu')").click(function(){
		var num = 0;
		var flag = true;
		var o = $(this).parents("tr").find(".citys > input:not('.daqu')");
		o.each(function(){
			if(!$(this).is(":checked") || !$(this).is(":enabled")){	
				flag = false;
			}
		});
		$(this).parents("tr").find(".daqu").attr("checked",flag);
		//让自己的城市全选与不选
		if($(this).is(":checked")){
			$(this).parent(".citys").find(".choice-provice-table input").attr("checked",true);
			//计算城市个数
			num = $(this).parent(".citys").find(".choice-provice-table input:checked").length;
			$(this).parents(".citys").find("s").show().text("(" + num + ")");
		}else{
			$(this).parent(".citys").find(".choice-provice-table input").attr("checked",false);
			$(this).parents(".citys").find("s").hide();
		}
		//让自己的城市如果一开始时可见的 那就一直可见
		if($(this).parent().find("table").is(":visible")){
			$(".citys").find("table").hide();
			$(this).parent().find("table").show();
		}else{
			$(".citys").find("table").hide();
		}
	});


	//选择城市让省份全选与不选
	$(".choice-provice-table input").click(function(e){
		var num = 0;
		var flag2 = true;
		var flag = true;
		var o = $(this).parents(".choice-provice-table").find("input");
		o.each(function(){
			if(!$(this).is(":checked") || !$(this).is(":enabled")){
				flag2 = false;
			}else{
				num++;
			}
		});
		$(this).parents(".citys").find("img").prev().prev().prev().attr("checked",flag2);
		//计算城市个数
		$(this).parents(".citys").find("s").show().text("(" + num + ")");
		if(num == 0){
			$(this).parents(".citys").find("s").hide();
		}
		//城市的选择关系到大区的全选与不选
		var o = $(this).parents(".choice-provice-table").parents("tr").find(".citys > input:not('.daqu')");
		o.each(function(){
			if(!$(this).is(":checked")){
				flag = false;
			}
		});
		$(this).parents(".choice-provice-table").parents("tr").find(".daqu").attr("checked",flag);
		$(this).parents(".choice-provice-table").show();
	});
	//兼容ie浏览器
	$(".choice-provice-table label").click(function(e){
		e.stopPropagation();
	});
	$(".citys label").click(function(e){
		e.stopPropagation();
	});
	//展开城市
	$(".citys img").click(function(){
		$(".choice-provice-table").hide();
		$(this).next(".choice-provice-table").show();
		return false;
	});
	//关闭城市
	$(".choice-provice-table .case6").click(function(){
		$(this).parents(".choice-provice-table").hide();
	});
	//点击空白地方关闭城市
	$(document).click(function(){
		$(".choice-provice-table").hide();
	});
}
//选择快递
function chioceExpress(){
	//为指定地区城市设置运费(新增情况下)
	$(".peizhi-money").click(function(){
		$(this).parents(".post-details-table").find(".changeColor-table-top").show();
		$(this).parents(".post-details-table").find(".changeColor-table-bottom").show();
		var obj = $(this).parents(".post-details-table").find(".changeColor-table-middle").eq(0).clone();
		$(this).parents(".changeColor-table").find(".changeColor-table-bottom").before(obj);
		obj.show();
		var flag = true;
		$(this).parents(".changeColor-table").find("[type=checkbox]:not('.checkbox-all input'):visible").each(function(index){
			if(!$(this).is(":checked")){
				var hiddenName = $(this).parents(".changeColor-table-middle").find("input[type=hidden]").attr("flag");
				$(this).parents(".changeColor-table-middle").find("input[type=hidden]").attr("name", hiddenName+index);
				var inputname1 = $(this).parents(".changeColor-table-middle").find(".first").attr("flag");
				$(this).parents(".changeColor-table-middle").find(".first").attr("name", inputname1+index);
				var inputname2 = $(this).parents(".changeColor-table-middle").find(".second").attr("flag");
				$(this).parents(".changeColor-table-middle").find(".second").attr("name", inputname2+index);
				var inputname3 = $(this).parents(".changeColor-table-middle").find(".third").attr("flag");
				$(this).parents(".changeColor-table-middle").find(".third").attr("name", inputname3+index);
				var inputname4 = $(this).parents(".changeColor-table-middle").find(".fourth").attr("flag");
				$(this).parents(".changeColor-table-middle").find(".fourth").attr("name", inputname4+index);
				$(this).val(index);
				flag = false;
			}
		});
		setIsIframe();
		$(this).parents(".changeColor-table").find(".checkbox-all input").attr("checked",flag);
	});
	
	// 为指定地区城市设置运费(修改情况下)
	$(".peizhi-money-modify").click(function(){
		$(this).parents(".post-details-table").find(".changeColor-table-top").show();
		$(this).parents(".post-details-table").find(".changeColor-table-bottom").show();
		var obj = $(this).parents(".post-details-table").find(".changeColor-table-middle").eq(0).clone();
		$(this).parents(".changeColor-table").find(".changeColor-table-bottom").before(obj);
		obj.show();
		var flag = true;
		var valObj = $(this).parents("table").find("input:checkbox[name='batchcb']:visible");
		var valArr ;
		if(valObj.length > 1){
			valArr = new Array(valObj.length);
			valObj.each(function(index){
				if(this.value != ''){
					valArr[index] = this.value;
				}
			});
			valArr.sort(function compare(a, b){return b-a;});
		}else{
			valArr = new Array([0]);
		}
		$(this).parents(".changeColor-table").find("[type=checkbox]:not('.checkbox-all input'):visible").each(function(index){
			if(!$(this).is(":checked")){
				if($(this).parents("tr").find(".allcitys-palce:visible").html() == "未添加地区"){
					var hiddenName = $(this).parents(".changeColor-table-middle").find("input[type=hidden]").attr("flag");
					$(this).parents(".changeColor-table-middle").find("input[type=hidden]").attr("name", hiddenName+(index+eval(valArr[0])));
					var inputname1 = $(this).parents(".changeColor-table-middle").find(".first").attr("flag");
					$(this).parents(".changeColor-table-middle").find(".first").attr("name", inputname1+(index+eval(valArr[0])));
					var inputname2 = $(this).parents(".changeColor-table-middle").find(".second").attr("flag");
					$(this).parents(".changeColor-table-middle").find(".second").attr("name", inputname2+(index+eval(valArr[0])));
					var inputname3 = $(this).parents(".changeColor-table-middle").find(".third").attr("flag");
					$(this).parents(".changeColor-table-middle").find(".third").attr("name", inputname3+(index+eval(valArr[0])));
					var inputname4 = $(this).parents(".changeColor-table-middle").find(".fourth").attr("flag");
					$(this).parents(".changeColor-table-middle").find(".fourth").attr("name", inputname4+(index+eval(valArr[0])));
					$(this).val((index+eval(valArr[0])));
					flag = false;
				}
			}
		});
		setIsIframe();
		$(this).parents(".changeColor-table").find(".checkbox-all input").attr("checked",flag);
	});

	var shiptype = "0";
	var index = $('input:radio[name=valuationtype]:checked').val();
	//三个checkbox
	$("[name = shiptype]").click(function(){
		var i = $(this).index();
		shiptype = i;
		if(i == "0"){
			$(".three-checkbox1").show();
			var r = confirm("选择“买家承担运费”后，需要您设置运费信息，请进行设置");
			if(r == true){
				$(".post-details-table").eq(index).show();
			}
			if(r == false){
				$("#shiptype1").attr("checked","checked");
				$(".post-details-table").hide();
			}
		}
		if(i == "1"){
			$(".three-checkbox1").show();
			var r = confirm("选择“卖家承担运费”后，当前设置的运费信息将被清除，是否确定？ ");
			if(r == true){
				selectedArea = "";
				$(".errorstyle").hide();
				$(".post-details-table").hide();
				$(".changeColor-table-middle").nextAll(".changeColor-table-middle").remove();
				$(".post-details-table").hide();
				$(".changeColor-table-top").hide();
				$(".changeColor-table-bottom").hide();
				clearInputValue();
			}
			if(r == false){
				$("#shiptype0").attr("checked","checked");
				$(".post-details-table").eq(index).show();
			}
		}
		setIsIframe();
	});
	var radioVal = $("[type=radio][name='valuationtype']:checked").val();
	$(".three-checkbox1 input").click(function(){
		index = $(this).index();
		var r = confirm("切换计价方式后，当前设置的运费信息将被清空，是否确定？");
		if(shiptype == "0"){
			if(r == true){
				selectedArea = "";
				$(".errorstyle").hide();
				$(".changeColor-table-middle").nextAll(".changeColor-table-middle").remove();
				$(".post-details-table").hide();
				$(".changeColor-table-top").hide();
				$(".changeColor-table-bottom").hide();
				$(".post-details-table").eq(index).show();
				clearInputValue();
			}else{
				$("[type=radio][name='valuationtype'][value="+radioVal+"]").attr("checked","checked");
			}
		}else{
			if(r==false){
				$("[type=radio][name='valuationtype'][value="+radioVal+"]").attr("checked","checked");
			}
		}
	});
}

// 清空输入的数据
function clearInputValue(){
	$(".post-details-table").find(":input").each(
			function(){
				if(this.type == "text"){
					$(this).val('');
				}
			}
	);
}

//全选与反选
function checkAll(){
	$(".checkbox-all input").click(function(){
		if($(this).is(":checked")){
			$(this).parents(".changeColor-table").find("[type]=checkbox:visible").attr("checked",true);
		}else{
			$(this).parents(".changeColor-table").find("[type]=checkbox:visible").attr("checked",false);
		}
	});
}
function c(obj){
	var flag = true;
	$(obj).parents(".changeColor-table").find("[type=checkbox]:not('.checkbox-all input'):visible").each(function(){
		if(!($(this).is(":checked"))){
			flag = false;
		}
	});
	$(obj).parents(".changeColor-table").find(".checkbox-all input").attr("checked",flag);
};


//回到顶合入部分开始

//切换店铺
function choiceShop(obj){
	obj.click(function(){
		$(this).addClass("choice-shop-area-click");
		return false;
	});
	//选择店铺
	obj.find("ul").click(function(){
		$(this).parent().removeClass("choice-shop-area-click");
		return false;
	});
	//点击页面空白地方也可以关闭此框
	$(document).click(function(){
		$(".choice-shop-area-click").removeClass("choice-shop-area-click");
	});
}

//右侧工具条
function sideToolsAct(){
	var obj = $("#sideTools");
	var wHeight = $(window).height();
	var oHeight = obj.height();
	var stMore = obj.find(".stMore");
	var miniNav = obj.find(".miniNav a");
	var closeHandle = obj.find(".stMoreClose");
	var flag = false;//默认快速导航为关闭
	var timer;//延迟收起
	var isIE = !!window.ActiveXObject;   
    var isIE6 = isIE && !window.XMLHttpRequest;
	//初始化
	obj.css({top:(wHeight-oHeight)/2+"px"});
	obj.removeClass("hide");
	obj.hover(function(){
		clearTimeout(timer);
		obj.stop().animate({right:0});
	},function(){
		if(!flag){
			timer = setTimeout(function(){
				obj.stop(true,true).animate({right:"-52px"});
			},300);
		}
	});
	miniNav.click(function(){
		miniNavAct();
	});
	closeHandle.click(function(){
		miniNavAct();
	});
	function miniNavAct(){
		var stHeight = stMore.height();
		if(!flag){
			//展开
			miniNav.addClass("on");
			stMore.show().height("auto");
			var tmp_h = stMore.height();
			stMore.height(0).hide();
			var _top = (wHeight-oHeight-tmp_h+14)/2;
			var _right = obj.css("right");
			if(_right<0){
				obj.animate({right:0},1);	
			}
			if(_top<0){
				_top = 0;	
			}
			stMore.show().animate({height:tmp_h+"px"},400);
			if(isIE6){
				obj.css({top : $(document).scrollTop()+42+"px"})
			}else{
				obj.stop().animate({top:_top+"px"},350);
			}
			closeHandle.show();
			flag = true;
		}else{
			//收起
			miniNav.removeClass("on");
			stMore.animate({height:0},180);
			if(isIE6){
				obj.css({top :$(document).scrollTop()+42+"px"})
			}else{
				obj.stop().animate({top:(wHeight-oHeight)/2+"px"},350,function(){
					stMore.hide();
				});
			}
			closeHandle.hide();
			flag = false;
		}
	}
	function ie6Scroll(){
		if(isIE6){
			var _top = (wHeight-oHeight)/2;
			obj.css({position:"absolute",right:"-54px",top:_top+"px"});
			$(window).scroll(function(){
				var oHeight2 = obj.height();
				var _top2 = (wHeight-oHeight2)/2;
				var scrollTop = $(document).scrollTop();
				obj.stop().animate({"top": _top2+scrollTop+"px"}, 500);
			});
		}
	}
	ie6Scroll();
}
//回到顶部
function backToTop(){$("body,html").animate({scrollTop:0});}


$(function(){
	morenPlace();
	sRingTab();//周报月报tab页切换
	tabBtn2();//查看下面Flash的Tab页切换
	zxltips();//放到问号上去的解释说明
	addScroll();//判断表格行数超过10行数加滚动条
	addScroll2();//为"前一天商品销量分析"页面第一个表格单独写的js
	dowing2();//自定义列项目弹出框的显示与隐藏
	zxlmm = $(".rightChoiceGoods option").length;//移动商品列表
	moveGoods();//移动商品列表
	ascOrDec2();//点击表格头部实现排序功能
	huibtn();
	myfactory();//我的仓库弹出框添加功能
	shoopArea();//客服管理
	moretab();//客服管理tab页面
	uploadPicture();//客服管理的上传图片
	reasonShow();//原因提示框框的展示于隐藏
	ediToInput();
	$PRM.ULtab('ul.tabBtn li','.rCon2');
	weixue();//选择品类
	choiceCitys();
	chioceExpress();
	checkAll();
	choiceShop($(".choice-shop-area"));
	sideToolsAct();
});








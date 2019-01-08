/**
 * 咨询管理、促销管理
 * Created by gujun.
 * Date: 12-9-30
**/
var $PRM = {};

//禁止时间选择框键盘输入
function noPermitInput(e){     
       var evt = window.event || e ;   
        if(isIE()){   
            evt.returnValue=false; //ie 禁止键盘输入   
        }else{   
            evt.preventDefault(); //fire fox 禁止键盘输入   
        }      
}   
function isIE() {   
    if (window.navigator.userAgent.toLowerCase().indexOf("msie") >= 1)   
        return true;   
    else   
        return false;   
}
//表格渐变
$PRM.tableTR = function(){
	$('table.changeColor tr').each(function(){
		if($(this).index()%2!=0){
		$(this).css('background','#f5f5f5');	
		}
	});
};
//清空输入框
$PRM.clearTxt =  function(input,classOn){
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
//选项卡
$PRM.ULtab = function(b,c){
	var _b = $(b) , _c = $(c);
	_b.click(function(){	
		$(this).addClass('on').siblings().removeClass('on');
		_c.hide().eq($(this).index()).show();	
	});
		
};
//全选按钮
$PRM.selectAll = function(){
	$('.selectAll').click(function(){
		//var _checkBox = $(this).parents('table').find('input:checkbox');
		var _checkBox = $(this).parents('table').find('.sa');
		if($(this).attr("checked") == true){
			_checkBox.each(function(){
				$(this).attr("checked",true);	
			});
		}else{
			_checkBox.each(function(){
				$(this).removeAttr('checked');	
			});
		}	
	});	
};
$PRM.picShow = function(){
	var _ub = $('.preBox ul li'),
		_showImg = $('.picShowBox .imgBox a');
	_ub.click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		_showImg.hide().eq($(this).index()).show();	
	});
	var l = _ub .length;
	var width = 103;
	var c = 1;
	$('.preBox b.next').click(function(){
		var _left = $('.pBox ul').position().left;
		var c = Math.ceil(-_left/103)+1;
		//alert(c)
		if(!$('.pBox ul').is(":animated") ){
			if(c==(l-4)){
				//$('.pBox ul').animate({left: 0}, 150);	
				//c = 1;
			}else{
				$('.pBox ul').animate({left: [-c*width,'easeOutCubic']}, 150);		
				c++;
			}
		}
	});
	$('.preBox b.prev').click(function(){
	if( !$('.pBox ul').is(":animated") ){
		var _left = $('.pBox ul').position().left;
		var c = Math.ceil(-_left/103)+1;
			if(c!=1){
				$('.pBox ul').animate({left: ['+='+width,'easeOutCubic']}, 150);			
				c--;
			}
		}
	});
		
};
/*判断促销查询页面表格高度控制滚动条*/
$PRM.trLength = function(){
	$('dd.proBoxY').each(function(){
		if($(this).find('table tr').length > 10){
			$(this).css('height','310px');
		}
	});
		
};
/*商品管理*/
	/*弹出公用*/
function popTip(fB,tB,tT,tI,cB,tree){
	var sH = document.documentElement.scrollHeight,
		cH = document.documentElement.clientHeight,
		wW = $(window).width(),
		wH = $(window).height(),
		sT = $(window).scrollTop(),
		tH = Math.max(sH,cH),
		popW = $(tB).width(),
		popH = $(tB).height(),
		txtL = tI.length;
	if(txtL<16){
		$(tB).find('dl').css('padding-left','132px');
	}else{
		$(tB).find('dl').css('padding-left','0px');	
	}
	if(tree){
		$(tB).find('dl').css('padding-left','0px');		
	}
	$(tB).css('left',wW/2-popW/2).css('top',(sT+wH/2-popH/2)).show();
	$(fB).css({width:wW,height:tH});
	$(fB).css('display','block');
	$(tB).find('.title').find('span').html(tT);
	if($(tB).find('dl').find('p')){
		$(tB).find('dl').find('p').html(tI);
	}
	$(cB).click(function(){
		$(fB).css('display','none');
		$(tB).css('display','none');
	});
}
	/*商品添加参数*/
$PRM.proCreate = function(c,bC){
	c.find(bC).click(function(){
		c.find('ul').hide();
		var _cN = $(this).attr('class');
		if(_cN=='fold'){
			c.find(bC).removeClass('foldUp');
			$(this).addClass('foldUp');
			$(this).next().show();
		}else{
			$(this).removeClass('foldUp');
			$(this).next().hide();
		}
	});
}
	/*商品信息*/
$PRM.proList = function(b,c,pM,sM,fB){
	b.find('b').click(function(){
		var _index = $(this).index();
		$(this).addClass('foc').siblings().removeClass('foc');
		c.find('.proListCon').eq(_index).show().siblings().hide();
	});
	pM.click(function(){
		var _pN = $(this).siblings('em').html(),
			_cN = $(this).attr('class');
		if(_cN=='priceModi'){
			$(this).addClass('priceModiU').siblings('input').val(_pN).show().siblings('em').hide();		
		}else{
			var _mPN = $(this).siblings('input').val();			
			$(this).removeClass('priceModiU').siblings('em').html(_mPN).attr('title',_mPN).show().siblings('input').hide();
		}
	});
	sM.click(function(){
		popTip('#fullBg','#popW','维护库存数量','请下载最新模板！','.closePop');
	});
	fB.click(function(){
		var _cN = $(this).parent().parent().attr('class');
		$(this).toggleClass('unFold');
		$(this).parent().parent().siblings('.'+_cN).toggleClass('hide');
	});
}
	/*输入字数提示*/
$PRM.inputTxtTip = function(i,t){
	i.focus(function(){
		var _v = $(this).attr('rel'),
			_tV = $(this).val();
		if(_v == _tV){
			$(this).val('').css('color','#333');
		}
	});
	i.blur(function(){
		var _v = $(this).attr('rel'),
			_tV = $(this).val();
		if(_tV == '' || _v == _tV){
			$(this).css('color','#999').val(_v);
		}else{
			$(this).css('color','#333')	
		}
	});
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<255){
			t.find('i').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,254);
			$(this).val(_aT);
		}
	});
};
$PRM.inputTxtTip2 = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<1001){
			t.find('i').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,1000);
			$(this).val(_aT);
		}
	});
};
$PRM.inputTxtTip3 = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<255){
			t.find('s').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,254);
			$(this).val(_aT);
		}
	});
};
$PRM.inputTxtTip4 = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<200){
			t.find('s').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,199);
			$(this).val(_aT);
		}
	});
};
$PRM.inputTxtTip5 = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<501){
			t.find('b').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,500);
			$(this).val(_aT);
		}
	});
};

$PRM.imgShow = function(){
	$('.picBox').find('img').click(function(){
		$('.picBox').hide();
		$('.picShow').show();	
	});
	$('.picShow').find('b.close').click(function(){
		$('.picShow').hide();
		$('.picBox').show();
		$(this).siblings('.picShowBox').find('.pBox').find('li').removeClass('on');	
	});
};

$PRM.selPicFN = function(b,iC,sI){
	b.click(function(){
		$(this).siblings().toggleClass('up').parent().next().toggleClass('hide');				 
	});
	iC.find('img').click(function(){
		iC.find('img').removeClass('foc');
		$(this).addClass('foc');
	});
	sI.find('img').click(function(){
		sI.find('img').removeClass('foc');
		$(this).addClass('foc');
	});	
}

$PRM.strucTree = function(id,v,sB){
	var _sV;
	id.find('dt').find('div').click(function(){
		$(this).parent().toggleClass('all');
		$(this).parent().siblings().toggleClass('show');							 
	});
	id.find('dd').find('i').click(function(){
		id.find('i').removeClass('foc');
		$(this).addClass('foc');
		_sV = $(this).html();
	});
	$('#strucTree .case4').click(function(){
		v.val(_sV);					   
	});
}
$PRM.picEdit = function(){
	$('.picShowLay,.picShowList').find('p.name').click(function(){
		var _txt = $(this).html();
		//$(this).html("<input type='text' class='nameInput' />");
		$(this).hide().next('.name2').show().find('input').focus().val(_txt);
	});
	$('.nameInput').blur(function(){
		$(this).parent('p.name2').hide();
		var _val = $(this).val();
		$(this).parent('p.name2').prev('.name').show().html(_val);	
	});
};
$PRM.copyUrl = function(){
	$('.copyBtn').click(function(){
		$('.copyTip').hide();
		$(this).find('.copyTip').show();
		setTimeout(function(){
		$('.copyTip').hide();	
		},2000);	
	});	
	$('.moveBtn').click(function(){$('.moveBox').show();});
	$('.closrMoveBox').click(function(){$('.moveBox').hide();});
	
};

$PRM.imgOpe = function(opt){
	var _o = {
		wrap:null,
		listT:'li',
		prevB:'i',
		nextB:'em',
		closeB:'b'
	};
	var _arg = $.extend(_o,opt);
	var _wrap = $(_arg.wrap),
		_listT = $(_arg.wrap).find(_arg.listT),
		_prevB = $(_arg.wrap).find(_arg.prevB),
		_nextB = $(_arg.wrap).find(_arg.nextB),
		_closeB = $(_arg.wrap).find(_arg.closeB);
	_prevB.click(function(){
		var _cN = $(this).attr('class');
		if(_cN=='no'){return false};
		$(this).parents("li").insertBefore($(this).parents("li").prev());//把当前对象插到他的前一个对象前
		btnInit();
	});
	_nextB.click(function(){
		var _cN = $(this).attr('class');
		if(_cN=='no'){return false};
		$(this).parents("li").insertAfter($(this).parents("li").next());//把当前对象插到他的后一个对象后
		btnInit();
	});
	function btnInit(){
		_prevB.removeClass();
		_nextB.removeClass();
		_wrap.find(_arg.listT+':first').find(_arg.prevB).addClass('no');
		_wrap.find(_arg.listT+':last').find(_arg.nextB).addClass('no');	
	};
	_closeB.click(function(){
		var _sIS = $(this).parent().siblings('img').attr('rel');
		$(this).parent().siblings('img').attr('src',_sIS);
		$(this).parent().hide();
	});
};

/*单选按钮*/
$PRM.dlRadioSl = function(){
	$('.Slc1').click(function(){
		$('.Input1').show();
		$('.Input2').hide();	
	});
	$('.Slc2').click(function(){
		$('.Input2').show();
		$('.Input1').hide();	
	});
};

/*textArea清除文字交互*/
$PRM.textArea = function(obj){
		var textArea = obj;
		var defaultvalue=textArea.attr("def");
		textArea.focus(function(){
			($(this).val()==defaultvalue) && $(this).val('');
			$(this).css({ color : '#333'});
		}).blur(function(){
			($.trim($(this).val())==='') && $(this).val(defaultvalue);
			$(this).removeAttr('style');
		});
};


$(function(){
	$PRM.tableTR();
	$PRM.ULtab('ul.tabBtn li','.rCon');
	//$PRM.clearTxt('.inputTxt','inputTxton');
	$PRM.textArea($('.ycTXT'));
	$PRM.textArea($('.btyTXT'));
	$PRM.selectAll();
	$PRM.imgShow();/*点击图片展示大图*/
	$PRM.picShow();/*大图展示*/
	$PRM.picEdit();
	$PRM.copyUrl();
	$PRM.dlRadioSl();//物流管理单选框选择
	/*商品管理*/
	$('.surePop1').click(function(){
		popTip('#fullBg','#surePop','筛选','重新选择类目，以下信息需要重新填写，您确认么？','.closePop');						 
	});
	$('.surePop2').click(function(){
		popTip('#fullBg','#surePop','提示','请下载最新模板！','.closePop');						 
	});
	$('.surePop3').click(function(){
		popTip('#fullBg','#popW','请填写商品信息','请下载最新模板！','.closePop');						 
	});
	$PRM.proCreate($('#popW'),'.fold');
	$('.surePop4').click(function(){
		popTip('#fullBg','#surePop','提示','修改类目，以下信息 会重新填写 确认？','.closePop');						 
	});
	$('.surePop5').click(function(){
		popTip('#fullBg','#surePop','提示','确认下架？','.closePop');						 
	});
	$('.surePop6').click(function(){
		popTip('#fullBg','#surePop','提示','确认上架？','.closePop');						 
	});
	$('.surePop7').click(function(){
		popTip('#fullBg','#popW','从图库选择图片','确认上架？','.closePop');						 
	});
	$('.surePop8').click(function(){
		popTip('#fullBg','#popW','提交成功','','.closePop');						 
	});
	$('.surePop9').click(function(){
		popTip('#fullBg','#popW2','提交失败','','.closePop');						 
	});
	$('.surePop10').click(function(){
		popTip('#fullBg','#popW3','批量导入失败','','.closePop');						 
	});		
	$('.surePop11').click(function(){
		popTip('#fullBg','#popW','价格查询明细','','.closePop');						 
	});	
	
	$('#proNumT').click(function(){
		$(this).find('span').blur().toggleClass('show');
	});
	$('#strucTreeSB').click(function(){
		popTip('#fullBg','#strucTree','销售目录','','.closePop','tree');	
	});	
	
	
	$PRM.proList($('#proListTab'),$('#proListCon'),$('.priceModi'),$('.stockModi'),$('.fold'));
	$PRM.inputTxtTip($('#proTxt'),$('#proNum'));
	$PRM.inputTxtTip($('#Warea'),$('#Tover'));	
	$PRM.selPicFN($('#slePicFN'),$('.onLinePic'),$('.slePic'));
	$PRM.trLength();
	$PRM.strucTree($('#strucTreeC'),$('#strucTreeS'));
	$PRM.imgOpe({wrap:'#imgOpe'});
	$PRM.inputTxtTip2($('#zxlarea'),$('#zxlcount'));
	$PRM.inputTxtTip3($('#zxl-hh'),$('#zxl-num'));
	$PRM.inputTxtTip4($('#zxl-hh2'),$('#zxl-num2'));
});
//import from shopElectri.js
function PopTip(fullBg,tipInfor,tipTxt,closePop){
	var allH = document.documentElement.scrollHeight;
	var windowW = $(window).width();
	var windowH = $(window).height();
	var scrollT = $(window).scrollTop();
	$('#'+tipInfor).css('left',windowW/2 -$('#'+tipInfor).width()/2).css('top',(scrollT+windowH/2-$('#'+tipInfor).height()/2)).show();
	$('#'+fullBg).css('width',windowW);
	$('#'+fullBg).css('height',allH);
	$('#'+fullBg).css('display','block');
	//$('.'+tipInfor).find('p').html(tipTxt);
	$('.'+closePop).click(function(){
		$('#'+fullBg).css('display','none');
		$('#'+tipInfor).css('display','none');
	})	
}

//New Page Function Here
var zhuangxiu = {};

zhuangxiu.view = {
	editArea: function(){
		var tmpHtml = '<div class="tmpMask"></div>';
		$(".editArea").each(function(){
			$(this).append(tmpHtml);
			$(this).find(".tmpMask").css({
				width: $(this).width(),
				height: $(this).height(),
				opacity: 0.5,
				background: "#fff",
				position: "absolute",
				top : 0,
				left: 0,
				"z-index": 9000
			});
			$(this).find(".userPip").show();
			$(this).find(".userPip").css({
				"top": $(this).height()/2 - 20 +"px"
			});
			
		})
		
	},
	editSetup: function(){
		$(".editArea").hover(function(){
			$(this).find(".tmpMask").css({
				width: $(this).width() - 2,
				height: $(this).height() - 2,
				background: "#ddd",
				opacity: 1,
				border: "1px solid #666"
			});
			$(this).find(".edithide").show();
		},function(){
			$(this).find(".tmpMask").css({
				width: $(this).width(),
				height: $(this).height(),
				background: "#fff",
				opacity: 0.5,
				border: "0"
			});
			$(this).find(".edithide").hide();
		})
	},
	popData: function(){

	},
	ajaxData: function(){

	}
	//预留接口

}

zhuangxiu.view.init = function(){
	this.editArea();
	this.editSetup();
}

//分类功能,越写越乱
zhuangxiu.category = function(){
	//总外层id，必须存在
	var el = $("#zcateBox");
	var level0string = '<li class="levelBox0"> <ul class="zlevel1 zbg"> <li class="level1box"> <div class="liBox1"> <div class="cateName l"> <input class="text" type="text" value=""> </div> <div class="cateSub l tc"> <span class="blue">添加子分类</span> </div> <div class="cateMove l tc"> <div class="moveIcon"> <a class="up_on" href="javascript:;"></a> <a class="down_on" href="javascript:;"></a>  <span class="clear"></span> </div> </div> <div class="cateDel l tc"><a href="javascript:;"><img src="images/close.png" alt=""></a></div> <div class="clear"></div> </div> </li> </ul> </li>',
		level1string = '<li class="level2box zbg"> <div class="liBox2"> <div class="cateName l"> <input class="text2" type="text" value=""> </div> <div class="cateSub l tc"> <span class="blue"></span> </div> <div class="cateMove l tc"> <div class="moveIcon"> <a class="up_on" href="javascript:;"></a> <a class="down_on" href="javascript:;"></a><span class="clear"></span> </div> </div>  <div class="cateDel l tc"><a href="javascript:;"><img src="images/close.png" alt=""></a></div> <div class="clear"></div> </div> </li>',
		level1string1 = '<ul class="zlevel2 zbg"> <li class="level2box"> <div class="liBox2"> <div class="cateName l"> <input class="text2" type="text" value="" /> </div> <div class="cateSub l tc"> <span class="blue"></span> </div> <div class="cateMove l tc"> <div class="moveIcon"> <a class="up_on" href="javascript:;"></a> <a class="down_on" href="javascript:;"></a> <span class="clear"></span> </div> </div>  <div class="cateDel l tc"><a href="javascript:;"><img src="images/close.png" alt="" /></a></div> <div class="clear"></div> </div> </li> </ul>',
		 level2string = '<li class="level3box zbg"> <div class="liBox"> <div class="cateName l"> <input class="text" type="text" value=""> </div> <div class="cateSub l tc"> &nbsp; </div> <div class="cateMove l tc"> <div class="moveIcon"> <a class="upA" href="javascript:;"></a> <a class="up_on" href="javascript:;"></a> <a class="down_on" href="javascript:;"></a> <a class="downA" href="javascript:;"></a> <span class="clear"></span> </div> </div> <div class="cateDel l tc"><a href="javascript:;"><img src="images/close.png" alt=""></a></div> <div class="clear"></div> </div> </li>'; 
		 level2string1 = '<ul class="zlevel3 zbg"> <li class="level3box"> <div class="liBox"> <div class="cateName l"> <input class="text" type="text" value=""> </div> <div class="cateSub l tc"> &nbsp; </div> <div class="cateMove l tc"> <div class="moveIcon"> <a class="upA" href="javascript:;"></a> <a class="up_on" href="javascript:;"></a> <a class="down_on" href="javascript:;"></a> <a class="downA" href="javascript:;"></a> <span class="clear"></span> </div> </div> <div class="cateDel l tc"><a href="javascript:;"><img src="images/close.png" alt=""></a></div> <div class="clear"></div> </div> </li> </ul>';
function sortJT(){
	  $('a.up').attr('class','up_on');
	  $('a.down').attr('class','down_on');
	  $('.levelBox0').first().find('.liBox1').find('a.up_on').addClass('up');
	  $('.levelBox0').last().find('.liBox1').find('a.down_on').addClass('down');
	  $('.zlevel2').each(function() {
        	$(this).find('.level2box').first().find('.liBox2').find('a.up_on').addClass('up');
			$(this).find('.level2box').last().find('.liBox2').find('a.down_on').addClass('down');
    	});
};
return {
		init: function(){
			//移动方法
			this.Move();
			//关闭方法
			this.close();
			//新增分类
			this.add();
			//树级切换
			this.treeToggle();
			//添加二级分类
			this.addSub();
			//添加三级分类
			this.addSub2();
		},
		Move: function(){
			var self = this;

			//基于结构的move，功能简单的移动
			el.find(".upA_on").click(function(){
				self.reset();
				var tmpLi1 = $(this).parents(".levelBox0");
				el.prepend(tmpLi1);
				if(self.onlyone($(this),".zcateBox",".levelBox0")){return;}
				self.cur(tmpLi1);
			})
			//最外层下移
			el.find(".downA_on").click(function(){
				self.reset();
				var tmpLi1 = $(this).parents(".levelBox0");
				el.append(tmpLi1);
				if(self.onlyone($(this),".zcateBox",".levelBox0")){return;}
				self.cur(tmpLi1);
			})
			//三级内部移动
			el.find(".zlevel3").find(".up_on").click(function(){
				self.filterPrev($(this), ".zlevel3", ".level3box");
			})
			el.find(".zlevel3").find(".down_on").click(function(){
				self.filterNext($(this), ".zlevel3", ".level3box");
				
			})
			//二级内部移动
			el.find(".zlevel2 .liBox2").find(".up_on").click(function(){
				self.filterPrev($(this), ".zlevel2", ".level2box");
				sortJT();
			})
			el.find(".zlevel2 .liBox2").find(".down_on").click(function(){
				self.filterNext($(this), ".zlevel2", ".level2box");
				sortJT();
			})
			//一级内部移动
			el.find(".zlevel1 .liBox1").find(".up_on").click(function(){
				self.filterPrev($(this), ".zcateBox", ".levelBox0");
				sortJT();
			})
			el.find(".zlevel1 .liBox1").find(".down_on").click(function(){
				self.filterNext($(this), ".zcateBox", ".levelBox0");
				sortJT();
			})
		},
		close: function(){
			el.find(".zlevel1 .liBox1").find(".cateDel a").click(function(){
				$(this).parents(".levelBox0").remove();
				sortJT();
			})
			el.find(".zlevel2 .liBox2").find(".cateDel a").click(function(){
				$(this).parents(".level2box").remove();
				sortJT();
			})
			el.find(".zlevel3 .level3box").find(".cateDel a").click(function(){
				$(this).parents(".level3box").remove();
				sortJT();
			})
		},
		treeToggle: function(){
			var self = this;
			$("#upCate").click(function(){
				$("#zcateBox").find(".level2box,.level3box").hide();
				$("#zcateBox").find(".zmiusicon").addClass("zaddicon").removeClass("zmiusicon");
			})
			$("#downCate").click(function(){
				$("#zcateBox").find(".level2box,.level3box").show();
				$("#zcateBox").find(".zaddicon").addClass("zmiusicon").removeClass("zaddicon");
				;
			});
			el.find(".zlevel1 .liBox1 .cateName").find("a").click(function(){
				if($(this).parents(".level1box").find("li").length < 1){
					return;
				}
				if($(this).hasClass("zmiusicon")){
					$(this).parents(".level1box").find(".liBox2,.liBox,.level2box").hide();
					$(this).addClass("zaddicon").removeClass("zmiusicon");
				}else{
					$(this).parents(".level1box").find(".liBox2,.liBox,.level2box").show();
					$(this).addClass("zmiusicon").removeClass("zaddicon");
				}
			})	
			el.find(".zlevel2 .liBox2 .cateName").find("a").click(function(){
				if($(this).parents(".level2box").find("li").length < 1){
					return;
				}
				if($(this).hasClass("zmiusicon")){
					$(this).parents(".level2box").find("li").hide();
					$(this).addClass("zaddicon").removeClass("zmiusicon");
				}else{
					$(this).parents(".level2box").find("li").show();
					$(this).addClass("zmiusicon").removeClass("zaddicon");
				}	
			})
		},
		add: function(){
			var self = this;
			$("#addCate").click(function(){
				self.reset();
				
				$("#zcateBox").append(level0string);
				el.find(".moveIcon").find("a").unbind();
				self.Move();
				self.close();
				el.find(".zlevel1 .liBox1 .cateName").find("a").unbind();
				el.find(".zlevel2 .liBox2 .cateName").find("a").unbind();
				self.treeToggle();
				el.find(".zlevel1 .liBox1").find("span.blue").unbind();
				self.addSub();
				sortJT();
			});
		},
		addSub: function(is){

			var self = this;
			el.find(".zlevel1 .liBox1").find("span.blue").click(function(){
				self.reset();
				if($(this).parents(".level1box").find(".liBox1").find(".cateName").find("a").length < 1){
					$(this).parents(".level1box").find(".liBox1").find(".cateName").prepend('<a class="zmiusicon" href="javascript:;"></a>');
				}
				var l2 = $(this).parents(".level1box").find(".zlevel2");
				if(l2.length > 0){
					l2.append(level1string);
				}else{
					$(this).parents(".level1box").append(level1string1);
				}
				el.find(".moveIcon").find("a").unbind();
				self.Move();
				self.close();
				el.find(".zlevel1 .liBox1 .cateName").find("a").unbind();
				el.find(".zlevel2 .liBox2 .cateName").find("a").unbind();
				self.treeToggle();
				el.find(".zlevel1 .liBox2").find("span.blue").unbind();
				self.addSub2();
				sortJT();
			});	
		},
		addSub2: function(){
			var self = this;
			el.find(".zlevel1 .liBox2").find("span.blue").click(function(){
				self.reset();
				if($(this).parents(".level2box").find(".liBox2").find(".cateName").find("a").length < 1){
					$(this).parents(".level2box").find(".liBox2").find(".cateName").prepend('<a class="zmiusicon" href="javascript:;"></a>');
				}
				var l3 = $(this).parents(".level2box").find(".zlevel3");
				if(l3.length > 0){
					l3.append(level2string);
				}else{
					$(this).parents(".level2box").append(level2string1);
				}
				el.find(".moveIcon").find("a").unbind();
				self.Move();
				self.close();
				el.find(".zlevel1 .liBox1 .cateName").find("a").unbind();
				el.find(".zlevel2 .liBox2 .cateName").find("a").unbind();
				self.treeToggle();
			});
		},
		//当前移动效果
		cur: function(_el){
			_el.addClass("zbg");
		},
		//是否已存在子元素
		onlyone: function($this,pClass,subClass){
			if($this.parents(pClass).find(subClass).length < 2){
				return true;
			}else{
				return false;
			}
		},
		//上移条件筛选
		filterPrev: function($this, pClass, subClass){
			var self = this;
			self.reset();
			var tmpLi = $this.parents(subClass);
			var len = $this.parents(pClass).find(subClass).length;
			if(len < 3){
				$this.parents(pClass).prepend(tmpLi);
			}else{
				$this.parents(subClass).prev().before(tmpLi);
			}
			if(self.onlyone($this,pClass,subClass)){return;}

			self.cur(tmpLi);
		},
		//下移条件筛选
		filterNext: function($this, pClass, subClass){
			var self = this;
			self.reset();
			var tmpLi = $this.parents(subClass);
			var len = $this.parents(pClass).find(subClass).length;
			if(len < 3){
				$this.parents(pClass).append(tmpLi);
			}else{
				$this.parents(subClass).next().after(tmpLi);
			}
			if(self.onlyone($this,pClass,subClass)){return;}
			self.cur(tmpLi);
		},
		//初始化
		reset: function(){
			el.find("ul,li").removeClass("zbg");
		}
	}	
}

//库存报表 清空input里面的值
function clearInputVal(){
	$(".toplist .inputTxt").focus(function(){
		if($(this).val() == $(this).attr("rel")){
			$(this).val('');
		}
	});
	$(".toplist .inputTxt").blur(function(){
		if($(this).val() == ''){
			$(this).val($(this).attr("rel"));
		}
	});
}

//补差金额 不一致时报错
function eqal(){
	$(".blueTable input.w100").blur(function(){
		var htm = $(this).parent("td").prev().prev().text();
		if(htm != $(this).val()){
			$(this).parents(".blueTable tr").css({"background":"#ffe2e2"});
		}else{
			$(this).parents(".blueTable tr").removeAttr("style");
		}
	});
}

//更多筛选条件 
function choiceBtn(){
	$(".choiceBtn").click(function(){
		$(this).parents(".rConzixun").find(".toplist2").show();
		$(this).parents(".rConzixun").find(".first").hide();
	});
	$(".toplist2 .choiceBtn").click(function(){
		$(this).parents(".rConzixun").find(".toplist2").hide();
		$(this).parents(".rConzixun").find(".first").show();
	});
}

function quick(){
	$(".morebtn").click(function(){
		$(".morefunc").toggle();
	});
}

//原因提示框框的展示于隐藏
function reasonShow(){
	$(".reason").hover(function(){
		var top = $(this).offset().top;
		var left = $(this).offset().left;
		$(".reason2").css({"top":top-80,"left":left-120}).show();
	},function(){
		$(".reason2").hide();
	});
}

//查看进度详情展开与隐藏
function ldDetailsFirst(){
	$(".ld-details:first-child").click(function(){
		$(".jd-area").hide();
		$(".ld-details-first").removeClass("ld-details-first");
		$(this).parents(".changeColor").next().show();
		$(this).addClass("ld-details-first");
	});
}

//二级类目选择
function choiceSelect(){
	$(".leftSelectContent li").click(function(){
		var i = $(this).index();
		$(".rightSelectContent").hide();					//先让所有人消失(左右两个菜单)
		$(".rightSelectContent").eq(i).show();		//只让当前显示
	});
	//全选
	$(".allChecked input").click(function(){
		var aIndex = $(this).parent("li").nextAll().not("[class = 'huise']");		//计算总共有多少行数据
		if($(this).is(":checked")){
			aIndex.each(function(){
				var objj = $(this);
				objj.find("input").attr("checked",true);
				//先把相同的删除
				$(".cellSelect span s").each(function(){
					if($.trim($(this).text()) == $.trim(objj.find("em").text())){
							$(this).parent("span.hasChoice").remove();
					}
				});
				//然后在添加
				$('<span class="hasChoice"><s>'+$.trim(objj.find("em").text())+'</s><em></em></span>').appendTo($(".cellSelect"));
			});
		}else{
			aIndex.each(function(){
				var obj = $(this);
				obj.find("input").attr("checked",false);
				$(".cellSelect span s").each(function(){
					if($.trim($(this).text()) == $.trim(obj.text())){
						$(this).parent("span.hasChoice").remove();
					}
				});
			});
		}
		//把内容丢到下面框框中去
	});
	//选择单个
	$(".rightSelectContent ul li input:not(.allChecked input)").click(function(){
		var obj = $(this);
		var flag = true;
		$(this).parents(".rightSelectContent ul").find("input:not(li.allChecked input)").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			};
		});
		$(this).parent("li").siblings("li.allChecked").find("input").attr("checked",flag);
		if($(this).is(":checked")){
			var t = $.trim($(this).next().text());
			$('<span class="hasChoice"><s>'+t+'</s><em></em></span>').appendTo($(".cellSelect"));
		}else{
			$(".cellSelect span s").each(function(){
				if($.trim($(this).text()) == $.trim(obj.next("em").text())){
					$(this).parent("span.hasChoice").remove();
				}
			});
		};
	});
	//下面显示内容
	$(".rightSelectContent ul li.huise").each(function(){
		var t = $.trim($(this).text());
		$('<span class="hasChoice"><s>'+t+'</s></span>').appendTo($(".cellSelect"));
	});
	//删除功能
	$(".hasChoice em").live("click",function(){
		var tte = $.trim($(this).parents(".hasChoice").text());
		var htm = $(".rightSelectContent ul li:not(.allChecked):not(.huise)");
		htm.each(function(){
			if($.trim($(this).text()) == tte){
				$(this).find("input").attr("checked",false);		//勾掉
				$(this).siblings("li.allChecked").find("input").attr("checked",false);		//全选也勾掉
			}
		});
		$(this).parent(".hasChoice").remove();
	});
}

/* 配送区域 */
function psArea(){
	//点击左侧大区
	$(".choice-provice-left1 ul li").click(function(){
		var i = $(this).index();
		$(".choice-provice-left1 ul li.current").removeClass("current");
		$(this).addClass("current");
		$(".right-provice").hide();
		$(".right-provice").eq(i).show();
	});
	//点击大区中的每个省份
	$(".right-provice .choice-provice-left2 ul li").click(function(){
		//tab页的切换
		var flag = true;
		var i = $(this).index();
		$(this).parents(".choice-provice-left2").find(".current").removeClass("current");
		$(this).addClass("current");
		$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").hide();
		$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").eq(i).show();
	});
	//点击左侧大区
	$(".choice-provice-left1 ul li input").click(function(e){
		var i = $(this).parent("li").index();
		$(".choice-provice-left1 ul li.current").removeClass("current");
		$(this).parent("li").addClass("current");
		$(".right-provice").hide();
		$(".right-provice").eq(i).show();
		if($(this).is(":checked")){
			$(".right-provice").eq(i).find("input").attr("checked",true);
		}else{
			$(".right-provice").eq(i).find("input").attr("checked",false);
		};
		e.stopPropagation();
	});
	//点击大区中的每个省份
	$(".right-provice .choice-provice-left2 ul li input").click(function(e){
		//tab页的切换
		var flag = true;
		var i = $(this).parent("li").index();
		$(this).parent("li").parents(".choice-provice-left2").find(".current").removeClass("current");
		$(this).parent("li").addClass("current");
		$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").hide();
		$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").eq(i).show();
		if($(this).is(":checked")){
			$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").eq(i).find("input").attr("checked",true);
		}else{
			$(this).parents(".choice-provice-left2").next(".choice-provice-content").find("ul").eq(i).find("input").attr("checked",false);
		};
		//问问省份同级是不是都选中了 关系到大区的选中
		$(".right-provice:visible .choice-provice-left2 ul li input").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			}
		});
		$(".choice-provice-left1 li.current input").attr("checked",flag);
		e.stopPropagation();
	});
	//问问每个城市同级是不是都选中了
	$(".choice-provice-content ul li input").click(function(){
		var flag2 = true;
		var flag = true;
		//问问自己同类 关系到省份的选中
		$(".choice-provice-content ul:visible li input").each(function(){
			if(!($(this).is(":checked"))){
				flag2 = false;
			}
		});
		$(".right-provice:visible .choice-provice-left2 li.current input").attr("checked",flag2);
		//问问省份同级是不是都选中了 关系到大区的选中
		$(".right-provice:visible .choice-provice-left2 ul li input").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			}
		});
		$(".choice-provice-left1 li.current input").attr("checked",flag);
	});
}

//参考范例显示与隐藏
function ckflclick(){
	$(".ckfl").toggle(function(){
		$(this).addClass("ckfl-click");
		$(".moban-title-only").show();
		$(".muban-table").show();
	},function(){
		$(this).removeClass("ckfl-click");
		$(".moban-title-only").hide();
		$(".muban-table").hide();
	});
}

//添加特定地区模板
function addPlaceMoBan(){
	//点击按钮进行切换
	$(".yf-table:visible:first").find("input[rel]").click(function(){
		$(".yf-table:visible:first").nextAll(".yf-table").remove();
		var i = $(".no-peploe-btn:visible").length;
		if(i == 0){
			$(".yf-table:visible:last :hidden").show();
		};
		$(".yf-table:visible:first input").val('');
	});
	
	//添加特定地区模板
	$(".no-peploe-btn").live("click",function(){
		var i = $(this).parents(".yf-table").find("input:checked").attr("rel");
		var f = $(this).parents(".yf-table");
		$("table[rel = "+ i +"]:hidden").clone().insertAfter(f).show();
		$(this).parents("tr").next("tr").hide();
		$(this).hide();
		var n = $(".yf-table:visible").length;
		if( n == 2){
			$(".yf-table:visible:first tr:visible:last").hide();
		}
	});
	
	//删除
	$(".no-peploe-btn-jian").live("click",function(){
		$(this).parents(".yf-table").remove();
		var i = $(".no-peploe-btn:visible").length;
		if(i == 0){
			$(".yf-table:visible:last :hidden").show();
		};
	});
}

//仓库优化 点击添加
function addData(){
	//点击添加按钮
	$(".add-data").click(function(){
		$(".sn-cangku-area:hidden").clone().prependTo(".xl-scroll").show();
		var i = $(".xl-scroll .sn-cangku-area").length;
		if(i == 5){
			$(".xl-scroll").addClass("xl-scroll-height");
		}
	});
	//点击取消
	$(".xl-shenqing").live("click",function(){
		var i = $(this).text();
		if( i == "取消"){
			$(this).text("申请特殊时效");
			$(this).parents(".sn-cangku-top").next(".sn-cangku-date").hide();
		}else{
			$(this).text("取消");
			$(this).parents(".sn-cangku-top").next(".sn-cangku-date").show();
		};
	});
	//删除
	$(".deling").live("click",function(){
		$(this).parents(".sn-cangku-area").remove();
		var i = $(".xl-scroll .sn-cangku-area").length;
		if(i < 5){
			$(".xl-scroll").removeClass("xl-scroll-height");
		};
	});
}
//2013-4-1 全站通用的文本框中的默认文字效果展示与清空
function wbkWord(obj){
	var i = obj.attr("rel");
	obj.focus(function(){
		if(obj.val() == i){
			obj.val('');
			obj.css({"color":"#333"});
		};
	});
	obj.blur(function(){
		if(obj.val() == ''){
			obj.val(i);
			obj.css({"color":"#999"});
		};
	});
}
//点击表格头部实现排序功能
function ascOrDec(){
	$(".dataTable .clickArea").toggle(function(){
		$(".ascTop",this).addClass("hover1");
		$(".ascDown",this).removeClass("hover2");
	},function(){
		$(".ascDown",this).addClass("hover2");
		$(".ascTop",this).removeClass("hover1");
	});
}
//全站统一提示
function webTck(){
	$(".web-tck").hover(function(){
		$(this).find(".tck").show();
	},function(){
		$(this).find(".tck").hide();
	});
}
//选择颜色
function choiceColor(){
	$(".color-fl td input[class ^= c]").click(function(){
		//第一次出现尺码
		var c = $(this).attr("class");
		$(".choice-color-jieguo tr[class = "+c+"]").hide();
		if($(this).is(":checked")){
			$(".color-fl td input[class ^= s]:checked").each(function(){
				var s = $(this).attr("class");
				$(".choice-color-jieguo td."+s).parents("tr."+c).show();
			});
		}else{
			$(".choice-color-jieguo tr[class = "+c+"]").hide();
		}
	});
	//尺码
	$(".color-fl td input[class ^= s]").click(function(){
		var s = $(this).attr("class");
		//问问颜色大类有没有选中
		if($(this).is(':checked')){
			$(".color-fl td input[class ^= c]:checked").each(function(){
				var c = $(this).attr("class");
				$(".choice-color-jieguo td."+s).parents("tr."+c).show();
			});
		}else{
			$(".choice-color-jieguo td."+s).parents("tr").hide();
		}
		
		
	});
	//删除颜色
	$(".choice-color-jieguo a.delete-tr").click(function(){
		$(this).parents("tr").hide();
	});
	//取消新增
	$(".quxiao-gg").click(function(){
		$(".color-fl").hide();
		$(".delete-tr").click();
	});
}
//三个快递的选择
function threeExpress(){
	$(".three-express li").click(function(){
		var i = $(this).index();
		$(".three-express li.on").removeClass("on");
		$(this).addClass("on");
		$(".exp-area").hide();
		$(".exp-area").eq(i).show();
	});
}
//选择返回色块
function choiceColor2(){
	$(".go-to-back .lei").click(function(){
		$(".go-to-back .on").removeClass("on");
		$(this).addClass("on");
	});
}
//选择类目
function choiceProduct(){
	$(".scroll-x ul li").click(function(){
		$(this).siblings(".on").removeClass("on");
		$(this).addClass("on");
		$(this).parent().next().show();
	});
	//大于4（不含4）的ul的点击时候的场景
	$(".scroll-x ul:gt(2) li").click(function(){
		var w = $(".scroll-x ul").width();
		var zw = w*$(".scroll-x ul:visible").length;
		$(".scroll-x").width(zw+10);
		if(zw > 1000){
			$(".product-more").css({"overflow-x":"scroll"});
			//$(".product-more").scrollLeft(245);
			$(".product-more").animate({scrollLeft:245});
		};
	});
}
//点小图看大图
function smallToBig(){
	$(".small-img img").click(function(){
		var s = $(this).attr("rel");
		$(this).parents("ul").find(".small-img img.on").removeClass("on");
		$(this).addClass("on");
		$(this).parents("ul").find(".big-img img").attr("src",s);
	});
	//选中当前
	$(".tb-btn").click(function(){
		var i = $(this).index();
		$(this).siblings().removeClass("click-on");
		$(this).addClass("click-on");
	});
	$(".big-choice-color .tb-btn").click(function(){
		var i = $(this).index();
		//尺码的切换
		$(".choice-color-size [class ^= tr]").hide();
		$(".choice-color-size [class ^= tr"+i+"]").show();
		//点击颜色 大图的切换
		$(".left-pic ul[class ^=img]").hide();
		$(".left-pic ul[class ^=img"+i+"]").show();
	});
	
}
//文本框后面的按钮变亮
function liang(){
	$(".rightinput").keyup(function(){
		$(".ok").css({"display":"inline-block"});
		$(".disabled2").hide();
	});
	$(".rightinput").blur(function(){
		if($(this).val() == ""){
			$(".ok").hide();
			$(".disabled2").show();
		}
	});
}
//增加项目
function addProject(){
	$(".add-btn .uiBtn").click(function(){
		if($(".pack-list li:visible").length < 20){
			$(".pack-list li:hidden").clone().appendTo(".pack-list").show();
		}
	});
	//删除
	$(".pack-list li a").live("click",function(){
		$(this).parent("li").remove();
	});
}
//新增规格
function newG(){
	$(".new-gg").click(function(){
		$(".color-fl").show();
		$(".new-guige").show();
		$(".choice-color-jieguo").show();
		$(".mt40").show();
	});
	$(".quexiao-btn .case5").click(function(){
		$(".color-fl").hide();
		$(".new-guige").hide();
		$(".choice-color-jieguo").hide();
		$(".mt40").hide();
	});
	//收起
	$(".visible-product2").click(function(){
		$(this).prev().show();
		$(this).parent().find("h4").hide();
		$(this).hide();
	});
	//展开
	$(".visible-product1").click(function(){
		$(this).next().show();
		$(this).parent().find("h4").show();
		$(this).hide();
		$(this).parent(".product-gg-area").siblings().find(".visible-product2:visible").click();
	});
	//删除
	$(".hidden-product").click(function(){
		var i = $(this).parent().attr("id");
		$(this).parent().find(".visible-product2:visible").click();
		$(this).parent().hide();
		$("."+i).show();
		$("[idd = "+i+"]").show();
	});
	//点击选择
	$(".choice-product").click(function(){
		var i = $(this).parent().attr("idd");
		$("#"+i).show();
		$("#"+i).find(".visible-product1").click();
		$(this).parent().hide();
	});
}
//收起
function sOrH(){
	$(".show-hidden").toggle(function(){
		$(this).text("展开");
		$(".rightCon-fabu-new-bg .baby-view").css({"height":"270px"});
	},function(){
		$(this).text("收起");
		$(".rightCon-fabu-new-bg .baby-view").css({"height":"auto"});
	});
}
//全站通用的文本的聚焦与离开
wbkWord2 = function(obj){
	var i;
	$(obj).css({"color":"#999"});
	obj.focus(function(){
		i = $(this).attr("rel");
		if($(this).val() == i || $(this).val() == ''){
			$(this).val('');
			$(this).css({"color":"#333"});
		};
		$(this).parent("span").addClass("lanse");
	});
	obj.blur(function(){
		if($(this).val() == ''){
			$(this).val(i);
			$(this).css({"color":"#999"});
		};
		$(this).parent("span").removeClass("lanse");
	});
}
//解决ie最大高度问题 合适的时候出现滚动条
function maxHeight(){
	//判断ie6
	if($.browser.msie && $.browser.version == "6.0"){
		$(".t-scroll").each(function(){
			var h = $(this).height();
			if(h > 159){
				$(this).css({"height":"160px"});
			}else{
				$(this).css({"height":"auto"});
			};
		});
	}
}
//表格选中以后效果
function tableOn(){
	$(".pp-table tr").click(function(){
		$(".pp-table tr.on").removeClass();
		$(this).addClass("on");
	});
}
//选择图片空间
function choicePictureArea(){
	$(".slePicFN2").toggle(function(){
		$(this).find("i").addClass("up");
		$(".kongjian-area").show();
	},function(){
		$(this).find("i").removeClass("up");
		$(".kongjian-area").hide();
	});
}
//运单模版设置
function waybillPlate(_type,_sle,obj,newM){
	_type.change(function(){
		var _comArr = ["申通E物流","中通速递","圆通速递","汇通快运","韵达快运","海航天天快递","顺丰速运","宅急送","全峰快递","CCES","EMS"],
			_arrLen = _comArr.length,
			_val = $(this).val(),
			_i;
		for(_i=0;_i<_arrLen;_i++){
			if(_val==_comArr[_i]){
				_sle.find('.con').find('div').removeClass().addClass('type'+(_i+1));
			}	
		}
		//获得每个输入框的left top值 还有width height值 并把值转为mm
		obj.each(function(){
			var l = ($(this).position().left*0.3).toFixed(2);
			var t = ($(this).position().top*0.3).toFixed(2);
			var w = ($(this).width()*0.3).toFixed(2);
			var h = ($(this).height()*0.3).toFixed(2);
			$(this).attr("l",l);
			$(this).attr("t",t);
			$(this).attr("w",w);
			$(this).attr("h",h);
		});
	});
	//新增模版
	newM.click(function(){
		$(".newAddInput").toggle();
		$("#waybillPlateSle").toggle();
		//获得每个输入框的left top值 还有width height值 并把值转为mm
		obj.each(function(){
			var l = ($(this).position().left*0.3).toFixed(2);
			var t = ($(this).position().top*0.3).toFixed(2);
			var w = ($(this).width()*0.3).toFixed(2);
			var h = ($(this).height()*0.3).toFixed(2);
			$(this).attr("l",l);
			$(this).attr("t",t);
			$(this).attr("w",w);
			$(this).attr("h",h);
		});
	});
	
}

//计算字数
inputTxtTip = function(i,t){
	i.keyup(function(){
		var _tL = $(this).val().length;
		if(_tL<131){
			t.find('i').text(_tL);
		}else{
			var _aT = $(this).val().substring(0,130);
			$(this).val(_aT);
		}
	});
};

//我要纠错
function findEorror(obj){
	obj.click(function(){
		$(".rtips1").hide();
		$(".rtips2").show();
		$(".find-error").show();
	});
	$(".rtips2 .case6").click(function(){
		$(".rtips1").show();
		$(".rtips2").hide();
		$(".find-error").hide();
	});
}
//商品 选择其他颜色
function choiceOtherColor(obj){
	var v = $("option:selected",obj).text();
	if(v == "其他颜色"){
		$(obj).next().show();
	}else{
		$(obj).next().hide();
	};
}
//添加颜色和尺码
function addColorBtn(cobj,cloneobj,delobj){
	//点击添加颜色
	cobj.click(function(){
		cloneobj.clone().insertBefore($(this)).show();
	});
	//删除
	delobj.live("click",function(){
		$(this).parent().remove();
	});
}
//生成商品规格
function babyProductStandard(obj){
	obj.click(function(){
		$(".product-standard-table").show();
		$(".click-product-btn").hide();
	});
	//禁用
	$(".product-standard-table input[type='checkbox']").click(function(){
		if($(this).is(":checked")){
			$(this).parent().parent().addClass("color-disabled");
		}else{
			$(this).parent().parent().removeClass("color-disabled");
		}
	});
}
//各行换色
function tableColorOrColor(obj){
	obj.css({"background":"#f5f5f5"});
}

$(function(){
	choicePictureArea();
	zhuangxiu.category().init();
	zhuangxiu.view.init();
	clearInputVal();//库存报表 清空input里面的值
	eqal();//补差金额 不一致时报错
	choiceBtn();//更多筛选条件
	quick();
	reasonShow();
	ldDetailsFirst();//查看进度详情展开与隐藏
	choiceSelect();
	psArea();
	ckflclick();
	addPlaceMoBan();
	addData();
	wbkWord($('.shouhou-fuwu textarea'));
	ascOrDec();
	webTck();
	choiceColor();
	threeExpress();
	choiceColor2();
	choiceProduct();
	smallToBig();
	liang();
	addProject();
	newG();
	sOrH();
	wbkWord2($(":input:not('select'):not([id ^= d])"));
	maxHeight();
	tableOn();
	waybillPlate($('#waybillPlateType'),$('#waybillPlateSle'),$('.con table div[class ^=type ] :input'),$('.newAddTip'));
	inputTxtTip($("#num-content"),$("#number"));
	findEorror($(".rtips1 .uiBtn"));
	addColorBtn($(".add-color-btn"),$(".color-card-area:hidden"),$(".color-card-area .del"));
	addColorBtn($(".add-size-btn"),$(".size-card-area:hidden"),$(".size-card-area .del"));
	babyProductStandard($(".baby-product-standard"));
	$PRM.inputTxtTip5($("#Warea2"),$("#numbers"));
	tableColorOrColor($(".product-table002-border tr:even"));
})
























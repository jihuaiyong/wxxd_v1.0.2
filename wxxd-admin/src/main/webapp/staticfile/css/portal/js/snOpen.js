/**
 * Created by JetBrains WebStorm.
 * User: 12010080
 * Date: 12-9-28
 * Time: 下午4:27
 * To change this template use File | Settings | File Templates.
 */
 //文本得到焦点
//激活时改变输入框边框色
function changeTextBorder(){
	var inputs1 = $("input[type='text']");
	var inputs2 = $("input[type='password']");
	//var inputs1 = $("input[type='text']");
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
function headShwo() {//顶部弹出框展示
    $(".headerMenu .list").hover(function() {
        var _a = $(this).find(".menuHd");
        var _div = _a.siblings("div");
        var _dis = _div.css("display");
        if (_dis == "none") {
            _a.addClass("hover");
            _div.show();
            _div.css("z-index",2);
        }
        else {
            _a.removeClass("hover");
            _div.hide();
            _div.css("z-index",1);
        }
    });
}
//o为对象，v为默认值
function snTxtFocus(o,v){
	if($(o).val() == $(o)[0].defaultValue && $(o).val() == v){  
		$(o).val("");    
		$(o).css({"color":"#333"});
	};	
};
//文本失去焦点
//o为对象，v为默认值
function snTxtBlur(o,v){
	if ($(o).val() == ''){
	  	$(o).val(v);
		$(o).css({"color":"#999"});
	};
};
(function($) {//焦点图控件
    $.extend(jQuery.easing, {
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    $.fn.imgfocus = function(options) {
        var opts = $.extend({}, $.fn.imgfocus.defaults, options);
        return this.each(function() {
            var _this = $(this);
            var index = 0;
            var timer = null;
            var oNumList = _this.find(opts.numbox).children();
            var imgListBox = _this.find(opts.imgbox);
            var imgListBoxChid = imgListBox.children();
            if (opts.drection == "filter")imgListBoxChid.eq(0).css({"opacity":1,"display":"block"}).siblings().css({"opacity": 0,"display":"none"});
            if (opts.auto)auto();
            function auto() {
                timer = setInterval(function() {
                    index++;
                    if (opts.contine) {
                        if (index == opts.imgLen) {
                            if (opts.drection == "up") {
                                imgListBoxChid.eq(0).css({"position":"relative","top":opts.imgLen * opts.imgboxHeight});
                            }
                            else if (opts.drection == "left") {
                                imgListBoxChid.eq(0).css({"position":"relative","left":opts.imgLen * opts.imgboxWidth});
                            }
                            setTimeout(function() {
                                index = 0
                            }, 500)
                        }
                    }
                    else {
                        index == opts.imgLen ? index = 0 : index = index;
                    }
                    $.fn.imgfocus.action(opts, index, oNumList, imgListBox, imgListBoxChid, _this);
                }, opts.speed)
            }

            _this.hover(function() {
                clearInterval(timer);
            }, function() {
                if (opts.auto)auto();
            })
            oNumList[opts.usevent](function() {
                index = oNumList.index(this);
                setTimeout(function() {
                    $.fn.imgfocus.action(opts, index, oNumList, imgListBox, imgListBoxChid, _this)
                }, 300);
            })
        })
    }
    $.fn.imgfocus.action = function(opts, index, oNumList, imgListBox, imgListBoxChid, _this) {
        switch (opts.drection) {
            case "left":
                imgListBoxChid.css({float:"left"})
                imgListBox.width(opts.imgLen * opts.imgboxWidth);
                imgListBox.stop().animate({
                    left:[-index * opts.imgboxWidth,'easeOutCubic']
                }, 500, function() {
                    if (opts.contine && index == 0) {
                        imgListBoxChid.eq(0).css("position", "");
                        imgListBox.css("left", 0);
                    }
                })
                if (opts.contine && index == opts.imgLen)index = 0;
                break;
            case "up":
                _this.height(opts.imgboxHeight);
                imgListBox.stop().animate({
                    top:[-index * opts.imgboxHeight,'easeOutCubic']
                }, 500, function() {
                    if (opts.contine && index == 0) {
                        imgListBoxChid.eq(0).css("position", "");
                        imgListBox.css("top", 0);
                    }
                })
                if (opts.contine) {
                    if (index == opts.imgLen)index = 0;
                }
                break;
            case "filter":
                imgListBoxChid.eq(index).css({"position":"absolute","left":"0px","top":"0px","z-index":"3","display":"block"}).siblings().css({"z-index":"2"})
                imgListBoxChid.eq(index)
                    .stop(true, true).animate({opacity:1}, 800)
                    .siblings().stop(true, true).animate({opacity:0}, 800)
                break;
            default:
                break;
        }
        oNumList.eq(index).addClass(opts.addClass).siblings().removeClass(opts.addClass);
    }

    $.fn.imgfocus.defaults = {
        drection: "filter",
        numbox: "#num",
        imgbox: "#show_img",
        speed: 3000,
        addClass: "on",
        imgboxWidth:780,
        imgboxHeight:300,
        imgLen:3,//首页增加滚动图片修改 2013-1-15 李雄杰
        auto:true,
        contine:false,
        usevent:"mouseover"
    }
})(jQuery);


(function($) {//左右移动焦点图控件
    $.extend(jQuery.easing, {
        easeOutCubic: function (x, t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }
    });
    $.fn.snShowimg = function(options) {
        var opts = $.extend({}, $.fn.snShowimg.defaults, options);
        return this.each(function() {
            var index = 0;
            var _this = $(this);
            var btnl = _this.find(opts.btn).eq(0);
            var btnr = _this.find(opts.btn).eq(1);
            var move = _this.find(opts.imgbox).find(opts.moveDom);
            var len = move.find(opts.movelist).length;
            var l = Math.ceil(len / 4);
            if (opts.drection == "top") {
                var h = opts.showWidth;
                btnl.click(function() {
                    index --;
                    if (index == -1) {
                        index = l - 1;
                    }
                    move.stop().animate({"margin-top":-468 * index}, 500);
                });
                btnr.click(function() {
                    index++;
                    if (index >= l) {
                        index = 0;
                    }
                    move.stop().animate({"margin-top":-468 * index}, 500);
                });
            }
            else {
                btnl.click(function() {
                    if (move.is(":animated")) {
                        return false;
                    } else {
                        move.css("margin-left", -opts.showWidth);
                        move.find(opts.movelist).last().clone().prependTo(move);
                        move.animate({"margin-left":0}, 500, function() {
                            move.find(opts.movelist).last().remove();
                        });
                    }

                });
                btnr.click(function() {
                    if (move.is(":animated")) {
                        return false;
                    } else {
                        move.css("margin-left", 0);
                        move.find(opts.movelist).first().clone().appendTo(move);
                        move.stop().animate({"margin-left":-opts.showWidth}, 500, function() {
                            move.find(opts.movelist).first().remove();
                            move.css("margin-left", 0);
                        });
                    }

                })
            }
        })
    }
    $.fn.snShowimg.defaults = {
        imgbox:".showArea",
        btn:".btn",
        showWidth:74,
        moveDom:"ul",
        movelist:"li",
        drection:""
    }
})(jQuery);


(function($) {//选项卡控件
    $.fn.tab = function(options) {
        var opts = $.extend({}, $.fn.tab.defaults, options);
        return this.each(function() {
            var _this = $(this);
            var _list = null;
            var _con = null;
            opts.tablist == null ? _list = _this.find(opts.list) : _list = $(opts.tablist).find(opts.list)
            opts.tabcon == null ? _con = _this.find(opts.conClass) : _con = $(opts.tabcon + ">div");
            _list.each(function(a) {
                $(this)[opts.usevent](function() {
                    _con.hide();
                    _list.removeClass(opts.addClass)
                    _list.eq(a).addClass(opts.addClass)
                    _con.eq(a).show();
                })
            })
        })
    }
    $.fn.tab.defaults = {
        tablist:null,
        tabcon:null,
        list:"li",
        conClass:".conlist",
        addClass: "on",
        usevent:"mouseover"
    }
})(jQuery);

function scroll() {
    if (!$(".financeList")[0])return false;
    var settime = null;
    $(".financeList").scrollTop(0);
    var html = $(".financeList").html();
    var index = 0;
    var h = $(".financeList ul").height();
    $(".financeList").append(html);
    var ulT = $(".financeList ul").eq(1).position().top;
    auto();
    function auto() {
        settime = setInterval(function() {
            var sT = $(".financeList").scrollTop();
            if (ulT - sT <= 0)index = 0;
            $(".financeList").scrollTop(index++);
        }, 40);
    }

    $(".financeList").hover(function() {
        clearInterval(settime);
    }, function() {
        auto();
    })
}

function charTab() {
    $(".charImg").eq(0).show();
    $(".teamMode li").hover(function() {
        var _index = $(this).index();
        $(this).addClass("li_" + _index);
        $(this).siblings().removeClass();
        $(".charImg").eq(_index).show().siblings(".charImg").hide();
    });
}
function chartable() {
    $(".tabArea tbody").find("tr:odd").css("background", "#f1f1f1");
    $(".horCompare tbody").find("tr:even").css("background", "#f1f1f1");
    $(".detailMode tbody").find("tr:even").css("background", "#f1f1f1");
}
//基本信息选择经营品类
function basechosetype(btn, con) {
    var btn = $(btn);
    var con = $(con);
    var ch = con.height() / 2;
    con.find(".popCatePart").find("dl:last").css({"border-bottom":"1px solid #eee"});
    con.find(".popCatePart").each(function() {
        $(this).find("dl").each(function() {
            //alert($(this).attr("id"));
            var len = $(this).find("dd p").length;
            var h = len * 28;
            var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;
            if (isIE6) {
                if (len>1) {
                    $(this).find("dt").css({"padding-top":0.5 * h - 20 + "px"});
                }
                else {
                    $(this).find("dt").css({"line-height":"20px"});
                }
            }
            else {
                $(this).find("dt").css({"height":h + "px","line-height":h + "px"});
            }
        })
    });
    btn.click(function() {
        //con = $(this).parent().find(".popCategory");
        con.find("span.icon").css("top", ch - 8);
        con.css("top", -ch + 12).show().mouseleave(function() {
            con.hide();
        });
    });
}

function formatNum(num) {//补0
    return num.toString().replace(/^(\d)$/, "0$1");
}
function formatStrDate(vArg) {//格式化日期
    switch (typeof vArg) {
        case "string":
            vArg = vArg.split(/-|\//g);
            return vArg[0] + "-" + formatNum(vArg[1]) + "-" + formatNum(vArg[2]);
            break;
        case "object":
            return vArg.getFullYear() + "-" + formatNum(vArg.getMonth() + 1) + "-" + formatNum(vArg.getDate());
            break;
    }
}
;

function popCategory() {
    $(".popCatePart").find("dl:last").find("dd").css({"border-bottom":"none"});
    $(".popCatePart").each(function() {
        $(this).find("dl").each(function() {
            var h = $(this).find("dd").height() - 12;
            $(this).css({"height":h ,"lineHeight":h});
        })
    });
};
function optionSel(){//申请认证join2_1切换业务类型
    $(".business").find("option").eq(0).attr("selected","selected");
    $(".business").change(function(){
         var a = $(this).find("option:selected").index();
         var _parent = $(this).parents("tr");
         var _dis = _parent.siblings(".dis_1");
         var _yearTr = _parent.siblings(".yearTr");
         var _buss = _parent.siblings(".buss")
         _buss.hide();
         _buss.eq(a-1).show();
        if(a==1){
            _dis.removeClass("hide");
           _yearTr.hide();
        }
        else if(a==2){
            _dis.addClass("hide");
           _yearTr.show();
        }
        else{
            _dis.addClass("hide");
            _yearTr.hide();
        }
    });
    //申请入驻-合作意向确认 不同弹出框join4.html
    var _in = $(".whether").find("input:radio");
    _in.eq(0).click(function(){
        if($(this).attr("checked","checked")){
            $(".join4Btn").attr("onclick","newpopup('yesBox')")
        }
    });
    _in.eq(1).click(function(){
        if($(this).attr("checked","checked")){
            $(".join4Btn").attr("onclick","newpopup('noBox')")
        }
    });
}
function inClick(){
    var _in = $(".popCatePart .checked").find("input:checkbox");
    _in.attr("checked","checked");
    _in.attr("disabled","disabled");
    $(".general").find("input:checkbox").click(function(){
        var _check = $(this).attr("checked");
        if(_check){
            $(".health").removeClass("hide");
        }
        else{
            $(".health").addClass("hide");
        }
    });
}

function fixed() {//悬浮框效果
    var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
    var odiv = $("#fixed");
    if (!odiv[0])return false;
    var left = $(window).width() / 2 + 515;
    var top = $(window).height() / 2 - odiv.height() / 2;
    var ietop = $(window).height() / 2 - odiv.height() / 2 + 270;
    $(window).resize(function() {
        top = $(window).height() / 2 - odiv.height() / 2;
        ietop = $(window).height() / 2 - odiv.height() / 2 + 270;
        left = $(window).width() / 2 + 495;
        odiv.css({"position":"fixed",left:left,top:top});
        if (isIE6)odiv.css({"position":"absolute",top:ietop,left:left});
    })
    var timer = null;
    odiv.css({"position":"fixed",left:left,top:top})
    if (isIE6)odiv.css({"position":"absolute",top:ietop,left:left});
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            odiv.show();
            if (isIE6)startMove($(this).scrollTop() + $(window).height() / 2 - odiv.height() / 2);
        } else {
            clearInterval(timer);
            odiv.hide();
            isIE6 ? odiv.css({left:left,top:ietop}) : odiv.css({left:left,top:top});
        }
    })
    odiv.click(function() {
        if (document.body) {
            $(document.body).animate({scrollTop:0});
        }
        $("html").animate({scrollTop:0});
    })
    function startMove(iT) {
        clearInterval(timer);
        timer = setInterval(function() {
            doMove(iT)
        }, 30)
    }

    function doMove(iT) {
        var iS = parseInt((iT - odiv[0].offsetTop) / 6);
        iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
        odiv[0].offsetTop != iT ? odiv[0].style.top = odiv[0].offsetTop + iS + "px" : clearInterval(timer);
    }
}
//仓库选择
function storage(add,del){
	$(add).click(function(){
		$("#stoList_r").find("option:selected").each(function() {
			if(!$(this).parent().is("optgroup")){
				$(this).appendTo($("#stoList_l"));
			}else{
				var gv = $(this).parent("optgroup").attr("label");
				var i = false;
				$("#stoList_l").find("optgroup").each(function(index) {
                    if($(this).attr("label") == gv){
						i = index+1;
					}
                });
				if(i){
					$("#stoList_l").find("optgroup").eq(i-1).append($(this));	
				}else{
					var newg = $("<optgroup></optgroup>");
					newg.attr("label",gv);
					newg.appendTo($("#stoList_l"));
					$(this).appendTo(newg);	
				}			
			}
        });
		$("#stoList_r").find("optgroup").each(function(){
            if(!$(this).is(":has(option)")){
				$(this).remove();
			}
        });
	});
	$(del).click(function(){
		$("#stoList_l").find("option:selected").each(function() {
			if(!$(this).parent().is("optgroup")){
				$(this).appendTo($("#stoList_r"));
			}else{
				var gv = $(this).parent("optgroup").attr("label");
				var i = false;
				$("#stoList_r").find("optgroup").each(function(index) {
                    if($(this).attr("label") == gv){
						i = index+1;
					}
                });
				if(i){
					$("#stoList_r").find("optgroup").eq(i-1).append($(this));	
				}else{
					var newg = $("<optgroup></optgroup>");
					newg.attr("label",gv);
					newg.appendTo($("#stoList_r"));
					$(this).appendTo(newg);	
				}			
			}
        });
		$("#stoList_l").find("optgroup").each(function(){
            if(!$(this).is(":has(option)")){
				$(this).remove();
			}
        });
	});
}
//承兑付款信息
function fkxx(btn,con){
	$(btn).click(function(){
		if($(this).is(":checked")){
			$(this).parent().next(con).show();
		}else{
			$(this).parent().next(con).hide();	
		}	
	});
}
//合同文本
function conlist(btn){
	$(btn).click(function(){
		$(this).addClass("on").siblings().removeClass("on");	
	});
}
//表格隔行变色
function trBg(table,bg){
	$(table).find("tbody").find("tr:odd").find("td").css("background",bg);
	$(table).find("tbody").find("tr:even").find("td").css("background","#FFF");
}
//打开弹出框
function showPop(btn,box){
	$(btn).click(function(){
		var l = ($(window).width()-$(box).width())/2;
		var t = ($(window).height()-$(box).height())/2;
		
		if(t<=0){
			t = 0;
		}else if(t>200){
			t=200;
		}
		t = t+$(document).scrollTop();
		
		$(box).css({"top":t,"left":l});
		$(box).show();
		var h = $(document).height();
		$("<div id='mask'></div>").appendTo("body");
		$("#mask").css("height",h);
		$("#mask").html('<iframe id="if" name="if" style="position:absolute;top:-5px;left:0;border:none;width:100%;height:100%;background:#666666;filter:alpha(opacity=0);" ></iframe>');
		$("#mask").show();
		$(window.parent.document).find("#content").attr("height",h);
		var h1 = 0;
		for(var i = 0;i<$(window.parent.document).find(".menu").length;i++){
			var h2 = $(window.parent.document).find(".menu").eq(i).height();
			h1 = h1+h2+8;
		}
		var h3 = h;
		var height = Math.max(h1,h3);
		$(window.parent.document).find(".main").height(height+12);
		$(window.parent.document).find(".menulist").height(height);
		$(window.parent.document).find(".menushow").css("top",(height-51)/2);
		$(window.parent.document).find("#content").attr("height",height);
		
		/*add by caixiaoyao 2013.1.8*/
		if(btn==".goonBtn003"){
			$("#proBrandName :first-child").attr("selected","selected");
			$(".choicePL :first-child").attr("selected","selected");
			$(".pinlei li:hidden").each(function(){
				$(this).show();
			});
			
			$(".pinlei").find(".old").each(function(){
				$(this).hide();
			});
		}
		
		/*合同变更  弹出框显示品牌信息 预览    20130326 V20130410   蔡晓尧  start*/
			/*品牌信息预览*/
			if(btn==".view-popBox001fuben"){
				$("#popBox001fuben").find("tr").eq(0).find("td").text($(this).parents("td").find(".brandApplyNo").val());
				$("#popBox001fuben").find("tr").eq(1).find("td").text($(this).parents("td").find(".brandYear").val());
				$("#popBox001fuben").find("tr").eq(2).find("td").text($(this).parents("td").find(".brandName").val());
				$("#popBox001fuben").find("tr").eq(3).find("td").text($(this).parents("td").find(".brandEnName").val());
				$("#popBox001fuben").find("tr").eq(4).find("td").text($(this).parents("td").find(".shopSku").val());
				$("#popBox001fuben").find("tr").eq(5).find("td").text($(this).parents("td").find(".compeBrand").val());
				
				var previewPath=$("#previewPath").val();
				var logoImg=$("#popBox001fuben").find("tr").eq(6).find("img");
				logoImg.attr("src",previewPath+$(this).parents("td").find(".brandLogo").val());
				
				var certlinkImg=$("#popBox001fuben").find("tr").eq(7).find("img");
				certlinkImg.attr("src",previewPath+$(this).parents("td").find(".brandCertLink").val());
				
				$("#popBox001fuben").find("tr").eq(8).find("textarea").val($(this).parents("td").find(".brandIntroduce").val());
			}
			/*出版社信息预览*/
			if(btn==".view-popBox006fuben"){
				$("#popBox006fuben").find("tr").eq(0).find("td").text($(this).parents("td").find(".brandName").val());
				$("#popBox006fuben").find("tr").eq(1).find("td").text($(this).parents("td").find(".brandEnName").val());
				$("#popBox006fuben").find("tr").eq(2).find("td").text($(this).parents("td").find(".shopSku").val());
				
				var logoImg=$("#popBox006fuben").find("tr").eq(3).find("img");
				logoImg.attr("src",$("#previewPath").val()+$(this).parents("td").find(".brandLogo").val());
				
				$("#popBox006fuben").find("tr").eq(4).find("textarea").val($(this).parents("td").find(".brandIntroduce").val());
			}
			/*商品信息预览*/
			if(btn==".view-popBox003fuben"){
				$("#popBox003fuben").find("tr").eq(0).find("td").text($(this).parents("td").find(".proBrandName").val());
				$("#popBox003fuben").find("tr").eq(1).find("td").text($(this).parents("td").find(".category").val());
				$("#popBox003fuben").find("tr").eq(2).find("td").text($(this).parents("td").find(".prdName").val());
				$("#popBox003fuben").find("tr").eq(3).find("td").eq(0).text($(this).parents("td").find(".prdPrice").val());
			}
		/*合同变更  弹出框显示品牌信息 预览    20130326 V20130410   蔡晓尧  end*/
		
	});
}
//关闭弹出框
function hidePop(btn,box){
	$(btn).click(function(){
		$(box).hide();
		$("#mask").remove();
	});
}
//输入框字符数限定
function txtCount(txt,num,count){
	$(txt).keyup(function(){
		var l = $(this).val().length;
		if(l>=count){
			var str = $(this).val().substr(0,count);
			$(this).val(str);
			$(num).html(count);
		}else{
			$(num).html(l);		
		}
	});
}
//删除行
function delTr(btn){
	$(btn).click(function(){
		$(this).parent().parent().remove();
		trBg(".aiTable","#F5F5F5");	
	});
}
//add by xiaolong 20130427 start
//展示弹出框,开放平台页面用
function showT(box){
	var l = ($(window).width()-$(box).width())/2;
	var t = ($(window).height()-$(box).height())/2;
	
	if(t<=0){
		t = 0;
	}else if(t>200){
		t=200;
	}
	t = t+$(document).scrollTop();
	
	$(box).css({"top":t,"left":l});
	$(box).show();
	var h = $(document).height();
	$("<div id='mask'></div>").appendTo("body");
	$("#mask").css("height",h);
	$("#mask").html('<iframe id="if" name="if" style="position:absolute;top:-5px;left:0;border:none;width:100%;height:100%;background:#666666;filter:alpha(opacity=0);" ></iframe>');
	$("#mask").show();
	$(window.parent.document).find("#content").attr("height",h);
}
//add by xiaolong 20130427 end

//合作电商选择
//function webSel(){
//    var checkbox = $(".teamWeb").find(".webIn")
//    checkbox.click(function(){
//        var a = $(checkbox).index(this);
//        var _urlTr = $(this).parents(".formTable").find(".url");
//        if($(this).is(":checked")){
//            _urlTr.eq(a).show();
//        }
//        else{
//            _urlTr.eq(a).hide();
//        }
//    });
//}

function agreeReadKnow(){
    var href1 = $(".aiDetail .readKnow dd.radio").find("a:eq(0)").attr("href");
    var href2 = $(".aiDetail .readKnow dd.radio").find("a:eq(1)").attr("href");
    $(".aiDetail .readKnow dd.radio").find("a").attr("href","javascript:;");
    $(".aiDetail .readKnow dd.radio").find("input").click(function(){
        var a = $(this).parent().parent().find("a");
        a.removeClass("gray");
        $(this).parent().parent().find("a:eq(0)").attr("href",href1);
        $(this).parent().parent().find("a:eq(1)").attr("href",href2);
    });
};
//V20130615 20130619 崔言言  商家自营开店入驻须知
function agreeReadKnow1(){
    var href = $("inputdag dd.radio").find("a").attr("href");
    $(".inputdag dd.radio").find("a").attr("href","javascript:;");
    $(".inputdag dd.radio").find("input").click(function(){
        var a = $(this).parent().parent().find("a");
        a.removeClass("gray");
        $(this).parent().parent().find("a:eq(0)").attr("href",href);
    });
};

function applyProgress(){
    $(".myOpen_right .applyProgress table tr:even").addClass("even");
}

function allChe(btn){//复选框全选
	$(btn).click(function(){
		if($(this).is(":checked")){
			$(this).parents(".infotable").find("td").find("input").each(function(){
					$(this).attr("checked","checked");
			});
		}else{
			$(this).parents(".infotable").find("td").find("input").removeAttr("checked");
		}
	});
}

function showImg(box,btn,clo){	
	$(btn).click(function(){
		$(".shade").show();
		$(box).show();
		$(".shade").css({"height":$(document).height(),"width":$(document).width()});
		if($(window).width()-800>0){
			$(box).css({"top":$(document).scrollTop(),"left":($(window).width()-800)/2});
		}else{
			$(box).css({"top":$(document).scrollTop(),"left":0});	
		}
		$(window).resize(function(){
			$(".shade").css({"height":$(document).height(),"width":$(document).width()});
			if($(window).width()-800>0){
				$(box).css({"top":$(document).scrollTop(),"left":($(window).width()-800)/2});
			}else{
				$(box).css({"top":$(document).scrollTop(),"left":0});	
			}	
		});
		var src = $(this).attr("src2");
		$(box).find("img").attr("src",src);	
	});	
	$(clo).click(function(){
		$(".shade").hide();
		$(box).hide();	
	});
}

/*弹出框通用js*/
var newpopup = function(id){
	var popup = $("#"+id);
	var w = popup.outerWidth();
	var h = popup.outerHeight();
	var l = Math.round((document.documentElement.clientWidth - w)/2 + document.documentElement.scrollLeft);
	var t = Math.round((document.documentElement.clientHeight - h)/2 + document.documentElement.scrollTop);
	popup.css({"top":t,"left":l});
	var ch = document.documentElement.scrollHeight;
	var cover = document.createElement("div");
	cover.id = "cover";
	cover.style.position = "absolute";
	cover.style.top = "0px";
	cover.style.left = "0px";
	cover.style.width = "100%";
	cover.style.height = ch + "px";
	cover.style.zIndex = "100";
	cover.style.filter = "alpha(opacity=0)";
	cover.style.opacity = "0";
	cover.style.display = "block";
	cover.style.background = "#000";
	document.body.appendChild(cover);
	$("#cover").animate({opacity:0.4},300,function(){
		popup.fadeIn(300);
	});
};
/*关闭弹出框*/
var newclose = function(id){
		var popup = $("#"+id);
		$(this).removeAttr("style");
		$("#cover").remove();
		popup.fadeOut(300);
}
//合同缩略图滚动
function compactScroll(list,prevBtn,nextBtn,w,speed){
	var list = $(list);
	var prevBtn = $(prevBtn);
	var nextBtn = $(nextBtn);
	var len = list.find("li").length;
	if(len<=5){
		prevBtn.unbind("click").attr("class","cooPrevStop");
		nextBtn.unbind("click").attr("class","cooNextStop");
	}else{

		prevBtn.attr("class","cooPrevStop");
		nextBtn.attr("class","cooNext");
		prevBtn.click(function(){
			if(list.position().left >= 0){
				prevBtn.attr("class","cooPrevStop");
				nextBtn.attr("class","cooNext");
				return false;
			}else if(list.position().left ==w*(5-len)){
				prevBtn.attr("class","cooPrev");
				nextBtn.attr("class","cooNextStop");
				if(!list.is(":animated")){
					list.animate({"left":"+="+w+"px"},speed);
				}
			}else{
				prevBtn.attr("class","cooPrev");
				nextBtn.attr("class","cooNext");
				if(!list.is(":animated")){
					list.animate({"left":"+="+w+"px"},speed);
				}
			}
		});
		nextBtn.click(function(){
			if(list.position().left <=w*(6 - len)){
				prevBtn.attr("class","cooPrev");
				nextBtn.attr("class","cooNextStop");
				return false;
			}else if(list.position().left == 0){
				prevBtn.attr("class","cooPrevStop");
				nextBtn.attr("class","cooNext");
				if(!list.is(":animated")){
					list.animate({"left":"-="+w+"px"},speed);
				}
			}else{
				prevBtn.attr("class","cooPrev");
				nextBtn.attr("class","cooNext");
				if(!list.is(":animated")){
					list.animate({"left":"-="+w+"px"},speed);
				}
			}
		});
	}
}
//显示弹出层  -add wangjj
function showuiTip(){
		var objW = $(window);
		var doc =$(document);
		var objC = $("#tipBox");
		var close_btn = objC.find(".close");
		var docH = doc.height();
		var brsW = objW.width();
		var brsH = objW.height();
		var sclL = objW.scrollLeft();
		var sclT = objW.scrollTop();
		var curW = objC.width();
		var curH = objC.height();
		var left = sclL + (brsW - curW)/2;
		var top = sclT + (brsH -curH)/2;
		$(".mask").css("height",docH);
		objC.css({"left":left,"top":top});
		close_btn.click(function(){
		$(".mask").hide();
		$(objC).hide();
		return false;
		});
	$(window).resize(function(){
		if(!$(objC).is(":visible")){
			return true;
			}
		showuiTip();
		});
		}
//合同内容章节切换  -add wangjj
function sectionTab(section){
	var btn = $(section).find("a");
	btn.click(function(){
		$(this).parent().addClass("on").siblings().removeClass("on");
	});
}
//img切换   -add wangjj
function imgTabs(){
	var tab_btn =  $("#compact_list").find("a");
	tab_btn.click(function(){
	 $("#compact_list").find("a").removeClass("on");
		$(this).addClass("on");
	});
}
//取消合作 --add wangjj
function compactCancel(btn){

	var btn = $(btn);
	btn.click(function(){
		$(".mask").show();
		showuiTip();
		$("#tipBox").show();
		});		
	}
function opencss(o)
{
	$(".on").removeClass();
	$(o).parent().addClass("on");
}
function sideToolsAct(){
	var obj = $("#sideTools");

	var wHeight = $(window).height();
	var oHeight = obj.height();
	var flag = false;//默认快速导航为关闭
	var timer;//延迟收起
	var isIE = !!window.ActiveXObject;
    var isIE6 = isIE && !window.XMLHttpRequest;
	//初始化
	obj.css({top:(wHeight-oHeight)/2+"px"});
	obj.removeClass("hide");
	obj.hover(function(){
		//clearTimeout(timer);
		obj.stop().animate({right:0});
	},function(){
		if(!flag){
			timer = setTimeout(function(){
				obj.stop(true,true).animate({right:"-52px"});
			},300);
		}
	});
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

//选择城市
function choiceProince(){
	
	//点击+/-展开与隐藏
	$(".filetree s").toggle(function(){
		$(this).removeClass("c");
		$(this).siblings(".pl32").hide();
	},function(){
		$(this).addClass("c");
		$(this).siblings(".pl32").show();
	});
	//点击单个省份选择其子城市
	$(".fa").click(function(){
		if($("input",this).is(':checked')){
			allCitys($(this).next('.pl32').find("input:not(':checked')"));
			$(this).next(".pl32").find("input").attr("checked",true);
		}else{
			$(this).next("dl").find("input").attr("checked",false);
			var cityArea=$(".cityArea");
			$(this).next("dl").find("span").each(function(){
				cityArea.find("tr:contains("+$(this).html()+")").remove();
			});
		}
		
		//判断是否全部选中,然后右上角也选中
		$(".allCheck input").attr("checked",$(".treeBox").find("input:not(':checked'):visible").size()==0);
		
		checkIsChoose();
	});
	//点击子城市让省份选中
	$(".pl32 input").click(function(){
		var $obj = $(this).parents("dl");
	    var proCheckFlag=($obj.find("input").size()==$obj.find("input:checked").size());
		$obj.prev("div").find("input").attr("checked",proCheckFlag);
		
		//判断是否全部选中,然后右上角也选中
		$(".allCheck input").attr("checked",$(".treeBox").find("input:not(':checked'):visible").size()==0);
		
		//输出城市到下面框框
		if($(this).is(":checked")){
			allCitys($(this));
		}else{
			$(".cityArea").find("tr:contains("+$(this).next().html()+")").remove();//单个省份切换 有相同就删除
		}
		
		checkIsChoose();
	});
	//点击全选
	$(".allCheck").click(function(){
		var treeBoxShow = $(".treeBox:visible");
		if($("input",this).is(':checked')){
			allCitys(treeBoxShow.find(".pl32").find("input:not(':checked')"));
			treeBoxShow.find("input").attr("checked",true);
		}else{
			treeBoxShow.find("input").attr("checked",false);
			var cityAreaShow=$(".cityArea:visible");
			cityAreaShow.find("tr:gt(0)").remove();
		}
		checkIsChoose();
	});
	//输出所有子城市
	function allCitys(obj){
		var coopFlag=$("[name='ps']:checked").index();
		var cityAreaShow =$(".cityArea table").eq(coopFlag);
		var trHtml='';
		$(obj).each(function(){
			trHtml+='<tr child='+$(this).attr("child")+'><td>'+$(this).next().html()+'<input type="hidden" name="suningDcSelected" value="'+$(this).val()+'"/></td><td><div class="numWrap"><em class="jian">-</em><input class="hupan" type="text" name="day" value="1"/><em class="jia">+</em></div><span class="iptTip veralign hide"><em class="tipTip2"></em><a>提示语句</a></span></td><td><i>x</i></td></tr>';
		});
		cityAreaShow.append(trHtml);
	}
	
	function checkIsChoose(){
		var checkedSize = $(".pl32").find("input:checked:visible").size();
		if(checkedSize!=0){
			$(".cityArea").show();
		}else{
			$(".cityArea").hide();
		}
	}
}

//合同 点击清空前面的checkbox选中
function popTxt2(){
	$(".popTxt2").focus(function(){
		if($(this).val() == "请输入您希望修改的内容"){
			$(this).val('');
		}
		$(this).prev(".hetongTime").find("input").attr("checked",true);
	});
	$(".popTxt2").blur(function(){
		if($(this).val() == ''){
			$(this).val("请输入您希望修改的内容");
			//$(this).prev(".hetongTime").find("input").attr("checked",false);
		}
	});
	$(".hetongTime input").click(function(){		
		if($(this).is(":checked")){
			$(this).parent().next().focus();
		}else{
			$(this).parent().next().blur();
		}
	});
}

//输入框字符数限定
function txtCount(txt,num,count){
	$(txt).keyup(function(){
		var l = $(this).val().length;
		if(l>=count){
			var str = $(this).val().substr(0,count);
			$(this).val(str);
			$(num).html(count);
		}else{
			$(num).html(l);		
		}
	});
}

//添加商品信息的类目 点击效果
function choicePL(){
	//正向选择  从左往右
	$(".pinlei li").click(function(){
		$(".pinlei li.on").removeClass("on");
		$(this).addClass("on");
		var val = $.trim($(this).html());
		$(".choicePL option").each(function(){
			if($.trim($(this).html()) == val){
				$(this).attr("selected",true);
			}
		});
	});
	//反向选择 从右往左
	$(".choicePL").change(function(){
		var h = $(this).find(":selected").html();
		$(".pinlei li").each(function(){
			if($(this).html() == h){
				$(".pinlei li.on").removeClass("on");
				$(this).addClass("on");
			}
		});
	});
	
	//从右往左时  兼容 IE   实时变化
	/*$(".choicePL").get(0).onpropertychange = function(){
		var h = $.trim($(this).find(":selected").html());
		$(".pinlei li").each(function(){
			if($.trim($(this).html()) == h){
				$(".pinlei li.on").removeClass("on");
				$(this).addClass("on");
			}
		});
	};*/
}

/* 2013年2月5日 V20130204 蔡晓尧  start  我要发货 选择物流 radio 切换*/
function choiceWl(){
	$("[name = ps]").click(function(){
		if($(this).index()==0){
			$(".coopClass").eq(0).show();
			$(".coopClass").eq(1).hide();
			$(".opeDcCity").eq(0).show();
			$(".opeDcCity").eq(1).hide();
		}else{
			$(".coopClass").eq(1).show();
			$(".coopClass").eq(0).hide();
			$(".opeDcCity").eq(1).show();
			$(".opeDcCity").eq(0).hide();
		}
		
		$(".filetree input[type='checkbox']").each(function(){
			$(this).attr("checked",false);
		});
		$(".cityArea tr[class!='first']").remove();
		$(".cityArea").hide();
	});
}
/* 2013年2月5日 V20130204 蔡晓尧  end*/


/* 20130207 V20130204 李雄杰  start*/
//放到问号上去的解释说明
function zxltips(){
	$(".q").hover(function(ev){
		var n = null;
		var event = ev || window.event;
		var x = event.clientX+$(document).scrollLeft();
		var y = event.clientY+$(document).scrollTop();
		n = $(this).attr("value");
		$(".wenhaokuang3").html(n);
		$(".wenhaokuang").css({"top":y-16,"left":x+20}).show();
	},function(){
		$(".wenhaokuang").hide().css({"top":"0px","left":"0px"});
		$(".wenhaokuang3").html('');
	});
}
//文本框获得焦点是img换掉
function imgChang(){
	$(".zs").focus(function(){
		var v = $(this).attr("rel");
		switch (v){
			case "公司名称" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu01.jpg");break;
			case "营业执照注册日期" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu02.jpg");break;
			case "营业执照到期日期" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu02.jpg");break;
			case "营业执照注册号" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu03.jpg");break;
			case "注册资本" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu04.jpg");break;
			case "年检年度" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu06.jpg");break;
		}
	});
	$(".zs2").click(function(){
		var v = $(this).attr("rel");
		switch (v){
			case "住所" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu05.jpg");break;
			case "企业类型" : $(".zhengshu img").attr("src","${domain.url}/mer/portal/images/zhengshu07.jpg");break;
		}
	});
}
//选择相应的类型
function choiceLeiXing(){
	$("[name=businessType]").change(function(){
		var v = $("[name=businessType]").find(":selected").text();
		switch (v){
			case "请选择" : $(".leixing1,.leixing2,.leixing3,.leixing4").hide();break;
			case "代理商" : $(".leixing1,.leixing2,.leixing3,.leixing4").hide();$(".leixing1,.leixing1").show();break;
			case "工厂" : $(".leixing1,.leixing2,.leixing3,.leixing4").hide();$(".leixing2").show();break;
			case "图书中盘商" : $(".leixing1,.leixing2,.leixing3,.leixing4").hide();$(".leixing3").show();break;
			case "图书出版社" : $(".leixing1,.leixing2,.leixing3,.leixing4").hide();$(".leixing4").show();break;
		}
	});
}
/* 20130207 V20130204 李雄杰  end*/
//选择
function choiceSelect(){
	$(".leftSelectContent li").click(function(){
		var i = $(this).index();
		$(".rightSelectContent").hide();					//先让所有人消失(左右两个菜单)
		$(".rightSelectContent").eq(i).show();		//只让当前显示
	});
	//全选
	$(".allChecked input").click(function(){
		if($(this).is(":checked")){
			$(this).parent("li").nextAll().not("[class = 'huise']").find("input").each(function(){
				if(!$(this).is(":checked")){
					//添加
					var t = $.trim($(this).next().text());
					var cate = $(this).val().split(",");
					if(cate[1] == "1"){
						$("<tr class='buss' id='"+cate[0]+"Check'>"+"<td>" + t + "<b class='new-close' style='float:right'>×</b><input type='hidden' class='cateInfo' value="+$(this).val()+"></td><td><input type='radio' name='isMain' value="+cate[0]+">是</td>" +"<td><a class='uiFile' href='###'><input type='file'>上传扫描件</a></td>").appendTo($(".new-formTable"));
					}else{
						$("<tr class='buss' id='"+cate[0]+"Check'>"+"<td>" + t + "<b class='new-close' style='float:right'>×</b><input type='hidden' class='cateInfo' value="+$(this).val()+"></td><td><input type='radio' name='isMain' value="+cate[0]+">是</td>" +"<td></td>").appendTo($(".new-formTable"));
					}
				}
			});
		}else{
			$(".new-formTable").find(".buss").remove();
		}
		
		$(this).parent("li").nextAll().not("[class = 'huise']").find("input").attr("checked",$(this).is(":checked"));
	});
	//选择单个
	$(".rightSelectContent ul li input:not(.allChecked input)").click(function(){
		var flag = true;
		$(this).parents(".rightSelectContent ul").find("input:not(li.allChecked input)").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			};
		});
		$(this).parent("li").siblings("li.allChecked").find("input").attr("checked",flag);
		
		var cate = $(this).val().split(",");
		if($(this).is(":checked")){
			var t = $.trim($(this).next().text());
			if(cate[1] == "1"){
				$("<tr class='buss' id='"+cate[0]+"Check'>"+"<td>" + t + "<b class='new-close' style='float:right'>×</b><input type='hidden' class='cateInfo' value="+$(this).val()+"></td><td><input type='radio' name='isMain' value="+cate[0]+">是</td>" +"<td><a class='uiFile' href='###'><input type='file'>上传扫描件</a></td>").appendTo($(".new-formTable"));
			}else{
				$("<tr class='buss' id='"+cate[0]+"Check'>"+"<td>" + t + "<b class='new-close' style='float:right'>×</b><input type='hidden' class='cateInfo' value="+$(this).val()+"></td><td><input type='radio' name='isMain' value="+cate[0]+">是</td>" +"<td></td>").appendTo($(".new-formTable"));
			}
		}else{
			$("#"+cate[0]+"Check").remove();
		};
	});
	//下面显示内容
	/*$(".rightSelectContent ul li.huise").each(function(){
		var t = $.trim($(this).text());
		$('<span class="hasChoice"><s>'+t+'</s></span>').appendTo($(".cellSelect"));
	});*/
	//删除功能
	$(".new-close").live("click",function(){
		var htm = $(".rightSelectContent ul li:not(.allChecked):not(.huise) input");
		var cateName = $.trim($(this).parents("td").text());
		htm.each(function(){
			if($.trim($(this).next().text())+"×" == cateName){
				$(this).attr("checked",false);		//勾掉
				$(".rightSelectContent allChecked").find("input").attr("checked",false);		//全选也勾掉
			}
		});
		$(this).parents("tr").remove();
	});
}

function choiceSelectBook(){
	//全选
	$(".allCheckedBook input").click(function(){
		var aIndex = $(this).parent("li").nextAll().not("[class = 'huise']");		//计算总共有多少行数据
		if($(this).is(":checked")){
			aIndex.each(function(){
				var objj = $(this);
				objj.find("input").attr("checked",true);
				//先把相同的删除
				$(".cellSelectBook span s").each(function(){
					if($.trim($(this).text()) == $.trim(objj.find("em").text())){
							$(this).parent("span.hasChoice").remove();
					}
				});
				//然后在添加
				$('<span class="hasChoice"><s>'+$.trim(objj.find("em").text())+'</s><em></em></span>').appendTo($(".cellSelectBook"));
			});
		}else{
			aIndex.each(function(){
				var obj = $(this);
				obj.find("input").attr("checked",false);
				$(".cellSelectBook span s").each(function(){
					if($.trim($(this).text()) == $.trim(obj.text())){
						$(this).parent("span.hasChoice").remove();
					}
				});
			});
		}
		//把内容丢到下面框框中去
	});
	//选择单个
	$(".rightSelectContentBook ul li input:not(.allCheckedBook input)").click(function(){
		var obj = $(this);
		var flag = true;
		$(this).parents(".rightSelectContentBook ul").find("input:not(li.allCheckedBook input)").each(function(){
			if(!($(this).is(":checked"))){
				flag = false;
			};
		});
		$(this).parent("li").siblings("li.allCheckedBook").find("input").attr("checked",flag);
		if($(this).is(":checked")){
			var t = $.trim($(this).next().text());
			$('<span class="hasChoice"><s>'+t+'</s><em></em></span>').appendTo($(".cellSelectBook"));
		}else{
			$(".cellSelectBook span s").each(function(){
				if($.trim($(this).text()) == $.trim(obj.next("em").text())){
					$(this).parent("span.hasChoice").remove();
				}
			});
		};
	});
	//下面显示内容
	$(".rightSelectContentBook ul li.huise").each(function(){
		var t = $.trim($(this).text());
		$('<span class="hasChoice"><s>'+t+'</s></span>').appendTo($(".cellSelectBook"));
	});
	//删除功能
	$(".hasChoice em").live("click",function(){
		var tte = $.trim($(this).parents(".hasChoice").text());
		var htm = $(".rightSelectContentBook ul li:not(.allCheckedBook):not(.huise)");
		htm.each(function(){
			if($.trim($(this).text()) == tte){
				$(this).find("input").attr("checked",false);		//勾掉
				$(this).siblings("li.allCheckedBook").find("input").attr("checked",false);		//全选也勾掉
			}
		});
		$(this).parent(".hasChoice").remove();
	});
}
/* 2013-3-26 组织机构代码 输入   小龙 */
function zzjj(){
	$(".uiText166px").keyup(function(){
		var v = $(this).val();
		if(v.length == 8){
			$(".uiText36px").focus();
		};
	});
}

//是否有电商合作经验    V20130506   add by caixiaoyao 20130421
function dianshang(){
	$(".dshang select").change(function(){
		var v = $(".dshang select option:selected").index();
		if(v == 2){
			$(".ds").hide();
		}else{
			$(".ds").show();
		};
	});
	$(".dp").click(function(){
		if($(this).is(':checked')){
			$(".dianpiao").show();
		}else{
			$(".dianpiao").hide();
			//并移除值
			$("#payOpenBankName2").val("");
			$("#payOpenBankType2").val("");
			$("#payOpenBank2").val("");
			$("#payBankNO2").val("");
			$("#regionCode2").val("");
			$("#cityCode2").val("");
		}
	});
	
	$(".dp2").click(function(){
		if($(this).is(':checked')){
			$(".taxPay").show();
		}
	});
	
	$(".dp3").click(function(){
		if($(this).is(':checked')){
			$(".taxPay").hide();
			//并移除一般纳税人扫描件
			$("#taxPayerScanCopy").val("");
			$("#taxPayerScanCopyFile").val("");
			$("#taxPayerScanCopySpan").html("");
			$("#taxPayerScanCopyFileImg").html("");
		}
	});
	
	$(".caiwubig").click(function(){
		$(".caiwu").show();
	});
	
	$(".caiwudelete").click(function(){
		$(".caiwu").hide();
		$("#financialHead").val("");
		$("#financialHeadTel").val("");
		$("#financialHeadMobile").val("");
		$("#financialHeadEmail").val("");
	});
}

//顶部卷帘
function topRoll(obj){
	//手动关闭
	obj.click(function(){
		$(this).hide();
		$(".top-roll-img").animate({"height":"40px"},600,function(){
			$(".top-roll-img").find(".jl-img-500").hide();
			$(".top-roll-img").find(".jl-img-40").show();
		});
	});
	//自动关闭
	var timer = null;
	timer = setTimeout(function(){
		obj.click();
	},2000);
}

//商户登录-供应商登录tab
function doubleLogin(obj){
	obj.click(function(){
		var i = $(this).index();
		$(".regArea .tab div.on").removeClass("on");
		$(this).addClass("on");
		$(".regArea ul").hide().eq(i).show();
	});
}

//打开关闭遮罩层
grayLayerAction = function(bool){
	var grayLayer = $("#grayLayer");
	if(bool){
		grayLayer.css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
		grayLayer.find("iframe").css({display:"block",width:$(window).width()+"px",height:$(document).height()+"px"});
	}else{
		grayLayer.hide();
	}
}; 
//打开弹窗
openWin = function(c){
	var obj = $("."+c);
	grayLayerAction(true);
	obj.show();
	obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
	return false;
};
closeWin = function(c){
	var obj = $("."+c);
	obj.hide();
	grayLayerAction(false);
} 

$(function() {
	/* 20130207 V20130204 李雄杰  start*/
	zxltips();//放到问号上去的解释说明
	zzjj();	
	//choiceSelect();//选择品类
	choiceSelectBook();
	//choiceLeiXing();
	/* 20130207 V20130204 李雄杰  end*/
	sideToolsAct();
    $("#snOpenflash").imgfocus();
    $(".hotSer").snShowimg();
    $(".gallay_side").snShowimg({drection:"top",showWidth:112,imgbox:".showImg"});
    $(".gallay").imgfocus({numbox:"#num01",imgbox:"#show_img01",addClass:"selected",auto:false})
    $(".aiTabControl").tab({tablist:".aiTab",conClass:".aiMain"});
    $(".boxArea").tab({tablist:".logtab",conClass:".newsBox"});
    $(".aboutUs").tab({tablist:".abList",conClass:".tabContent",addClass:"selected"});
    $(".howTo").tab({tablist:".abList",conClass:".comQues",addClass:"selected"});
    $(".helpSys").tab({conClass:".tabpannel",addClass:"selected"})
    $(".change").tab({list:"b",conClass:"dl"});
    $(".openCategory dl").hover(function() {
        $(this).addClass("on");
        var _y = ($(this).height() - 5) * 0.5;
        $(this).find("em").css({"top":_y});
    }, function() {
        $(this).removeClass("on");
    });
    $("#record").find("tr").hover(function(){
        $(this).find("em").addClass("hover");
    },function(){
        $(this).find("em").removeClass("hover");
    })
    $(".infotable").find("a").toggle(function(){
        $(this).addClass("open").text("收起");
        $(this).siblings("div").find("p").show();
    },function(){
        $(this).removeClass("open").text("展开");
        $(this).siblings("div").find("p").hide();
    })
    scroll();
    headShwo();//顶部弹出框展示
    charTab();// 首页 > 物流服务 > 模式与收费标准 tab切换
    chartable();// 首页 > 物流服务 > 模式与收费标准 表格颜色
    basechosetype(".selectCategory", ".popCategory");//基本信息选择经营品类
    optionSel();
    inClick();
    fixed();
    agreeReadKnow();
    agreeReadKnow1();
	storage(".addSto",".delSto");//仓库选择
	fkxx(".fkxx_t input",".fkxx_c");//承兑付款信息
	conlist(".contractList li");//合同文本
	trBg(".aiTable","#F5F5F5");//表格隔行变色
	showPop(".brandInfo","#popBox");
	//hidePop("#popBox .close","#popBox");
	showPop(".contractCha","#popBox");
	//hidePop("#popBox .close","#popBox");
	showPop(".viewPicture001","#popBox003");
	hidePop("#popBox003 .close","#popBox003");
	showPop(".viewPicture002","#popBox004");
	hidePop("#popBox004 .close","#popBox004");
	showPop(".no-peploe-btn1","#popBox007");
	hidePop("#popBox007 .close","#popBox007");
	showPop(".viewing","#popBox");
	showPop(".selecToday","#popBox007");
	hidePop("#popBox007 .close","#popBox007");
	showPop(".selecTodayBook","#popBox008");
	hidePop("#popBox008 .close","#popBox008");
	hidePop("#popBox009 .close","#popBox009");
	showPop(".selecTodayBook","#popBox008");
	hidePop("#popBox .close","#popBox");
	//txtCount(".chaTxt .popTxt",".chaTxt .num",40);//输入框字符数限定
	txtCount(".chaTxt .popTxtnOne",".chaTxt .numOne",50);//输入框字符数限定1
	txtCount(".chaTxt .popTxtnTwo",".chaTxt .numTwo",50);//输入框字符数限定2
	//delTr(".delBtn");//删除行
	//webSel()//合作电商选择
    changeTextBorder();//输入框激活
    applyProgress();//申请进度查询-开店申请信息
    allChe(".cheAll");//复选框全选
    showImg(".imgBox",".showImgBtn",".close a");
    compactScroll("#compact_list","#cooPrev","#cooNext",188,200);//合同缩略图滚动
	choiceProince();//选择城市
	popTxt2();//合同 点击清空前面的checkbox选中
	showPop(".goonBtn001","#popBox001");
	hidePop("#popBox001 .close","#popBox001");
	showPop(".goonBtn002","#popBox002");
	hidePop("#popBox002 .close","#popBox002");
	showPop(".goonBtn003","#popBox003");
	hidePop("#popBox003 .close","#popBox003");
	/*V20130325 3月25号的版本号   蔡晓尧 start*/
	showPop(".goonBtn004","#popBox006");
	hidePop("#popBox006 .close","#popBox006");
	/*V20130325 3月25号的版本号   蔡晓尧 end*/
	choicePL();//添加商品信息的类目 点击效果
	/*2013年2月5日 V20130204 蔡晓尧  start*/
	choiceWl();//我要发货 选择物流 radio 切换
	/*2013年2月5日 V20130204 蔡晓尧  end*/
	/* 20130207 V20130204 李雄杰  start*/
	imgChang();
	/* 20130207 V20130204 李雄杰  end*/
	/*20130325  V20130410    合同变更  蔡晓尧  start*/
	showPop(".view-popBox001fuben","#popBox001fuben");
	hidePop("#popBox001fuben .close","#popBox001fuben");
	showPop(".view-popBox006fuben","#popBox006fuben");
	hidePop("#popBox006fuben .close","#popBox006fuben");
	showPop(".view-popBox003fuben","#popBox003fuben");
	hidePop("#popBox003fuben .close","#popBox003fuben");
	showPop(".goonBtn006","#popBox006");
	hidePop("#popBox006 .close","#popBox006");
	/*20130325  V20130410    合同变更  蔡晓尧  end*/
	/*是否有电商合作经验    V20130506   add by caixiaoyao 20130421 start*/
	dianshang();
	/*是否有电商合作经验    V20130506   add by caixiaoyao 20130421 end*/
	/*20130903  V20130904    增加首页卷帘  崔言言  */
	topRoll($(".close-jl"));
	
	doubleLogin($(".regArea .tab div"));
})
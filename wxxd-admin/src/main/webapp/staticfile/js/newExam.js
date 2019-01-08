/**
 * 苏宁云台考试前端JS
 * User: 12030539
 * Date: 14-01-10
 * Time: 11:17
 */
;var newExam = newExam || {};
newExam = (function(){
    //弹出框
    //打开弹出框
    var popupbox = function(popbox){
        var _this = $(popbox);
        var w = _this.outerWidth();
        var h = _this.outerHeight();
        var _dl = document.documentElement.scrollTop||document.body.scrollTop;
        var l = Math.round((document.documentElement.clientWidth - w) / 2 + document.documentElement.scrollLeft);
        var t = Math.round((document.documentElement.clientHeight - h) / 2 + _dl);
        _this.css({"top":t,"left":l});
        var ch = document.documentElement.scrollHeight;
        var cw = document.documentElement.scrollLeft+document.documentElement.clientWidth;
        var cover = document.createElement("div");
        cover.id = "cover";
        cover.style.position = "absolute";
        cover.style.top = "0px";
        cover.style.left = "0px";
        cover.style.width = cw+"px";
        cover.style.height = ch + "px";
        cover.style.zIndex = "999";
        cover.style.filter = "alpha(opacity=0)";
        cover.style.opacity = "0";
        cover.style.display = "block";
        cover.style.background = "#000";
        cover.innerHTML = '<iframe id="if" name="if" style="position:absolute;top:-5px;left:0;border:none;width:100%;height:100%;background:#666666;filter:alpha(opacity=0);" ></iframe>';
        document.body.appendChild(cover);
        $("#cover").animate({opacity:0.3}, 200, function() {
            _this.fadeIn(300);
        })
        $(window).resize(function(){
            var ncw = document.documentElement.scrollLeft+document.documentElement.clientWidth;
            $("#cover").width(ncw);
        })
    };
    //关闭弹出框
    var closebox = function(popup){
        $("#cover").remove();
        $(popup).fadeOut(100);
    };
    //侧边悬浮框
    var sideFixed = function(box,t){
        var isIE=!!window.ActiveXObject;
        var isIE6=isIE&&!window.XMLHttpRequest;
        var _l = document.documentElement.clientWidth/2+505;
        $(box).css("left",_l).show();
        $(window).resize(function(){
            _l = document.documentElement.clientWidth/2+505;
            $(box).css("left",_l).show();
        });
        $(window).scroll(function(){
            if(t){
                if($(document).scrollTop() > t){
                    if(isIE6){
                        $(box).css({"top":$(document).scrollTop() + 20});
                    }else{
                        $(box).css({"position":"fixed","top":20});
                    }
                }else{
                    $(box).css({"position":"absolute","top":t});
                }
            }else{
                if(isIE6){
                    var _t = $(box).css("top");
                    $(box).css({"top":$(document).scrollTop() + _t});
                }else{
                    $(box).css({"position":"fixed"});
                }
            }
        });
    };
    //考试时间倒计时
    var examTime = function(time,callFun){
        if($(".side-time").length == 0){
            return false;
        }
        //time以分钟为单位
        var time = parseInt(time);
        if(time == 0 || time == undefined){
            $(".side-time").html("00:00:00");
            return false;
        }
        function formatNum(num){//补0
            return num.toString().replace(/^(\d)$/, "0$1");
        };

        var h = Math.floor(time/60);
        var m = time%60;
        $(".side-time").html(formatNum(h) + ":" + formatNum(m) + ":00");
        var t = time*60;
        var timer = setInterval(function(){
            t --;
            h = Math.floor(t/3600);
            m = Math.floor((t%3600)/60);
            var n = t%60;
            $(".side-time").html(formatNum(h) + ":" + formatNum(m) + ":" + formatNum(n));
            if(t == 0){
                clearTimeout(timer);
                if(callFun != undefined){
                    callFun();
                }
            }
        },1000);
    };
    return {
        popupbox:popupbox,
        closebox:closebox,
        sideFixed:sideFixed,
        examTime:examTime
    }
 })(jQuery);
$(function(){
    newExam.sideFixed("#sideFixed",388);
});
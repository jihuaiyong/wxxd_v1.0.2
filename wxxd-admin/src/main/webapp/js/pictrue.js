var $GF = {};

/*滑动缓冲插件*/
jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1)
            return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
});

//icon左右切换
//$GF.iconSlide = function() {
//    var w = 210
//      , c = 1
//      , len = $('.iconList ul li').length;
//    var prevBtn = $('.iconBox').find('span.prev')
//      , nextBtn = $('.iconBox').find('span.next')
//      , oul = $('.iconList ul');
//    $('.iconList ul').css('width', len * 210 + 'px');
//    nextBtn.click(function() {
//        if (!oul.is(":animated")) {
//            oul.animate({
//                left: -210
//            }, 500, function() {
//                oul.find('li').eq(0).appendTo(oul);
//                oul.css('left', '0');
//            });
//        }
//    });
//    prevBtn.click(function() {
//        if (!$('.iconList ul').is(":animated")) {
//            oul.find('li:last').prependTo(oul);
//            oul.css('left', '-210px');
//            $('.iconList ul').animate({
//                left: '+=' + w
//            }, 500);
//        }
//    });
//}
//;

//背景视频播放控制器
$GF.videoContrl = function() {
    var timer;
    var videoKey = parseInt(Math.random() * 15);
    //默认播放背景
    videoPlay(videoKey);
    $('a.vContrl').click(function() {
        if (videoKey < 15) {
            videoKey++;
        } else {
            videoKey = 0;
        }
        window.clearTimeout(timer);
        videoPlay(videoKey);
        $('.imgBox').css('opacity', '1');
    });
    $('a.aContrl').toggle(function() {
        document.getElementById('vaudio').pause();
        $(this).addClass('muted');
    }, function() {
        document.getElementById('vaudio').play();
        $(this).removeClass('muted');
    });
    //切换视频函数
    function videoPlay(vKey) {
        var videoName = ["mountain_lake", 
                         "sandy_beach",
                         "loveanddevotion",
                         "loveissurrender",
                         "soothe",
                         "waterfalling",
                         "thesimpleblackness",
                         "wateronrocks",
                         "summer_field",
                         "icanhearthemoonrising",
                         "sunset_beach2",
                         "rapture",
                         "rain_leaves",
                         "cathedral",
                         "iamfree",
                         "1"];
        resizeV();
        //初始化视频大小
        $(window).resize(function() {
            resizeV();
            //实时改变视频大小
        });
        var _url = "staticfile/file/"+videoName[vKey]+".mp4",
           _imgurl = "staticfile/images/" + videoName[vKey] + ".jpg",
           _audiourl = "staticfile/file/" + videoName[vKey] + ".ogg";
    	$('.videoBox').find('video').attr('src',ctx+'/'+_url);
        $('.videoBox').find('img').attr('src', ctx+'/'+_imgurl);
        $('.imgBox').find('img').attr('src', ctx+'/'+_imgurl);
        $('#vaudio').attr('src', ctx+'/'+ _audiourl);
        timer = window.setTimeout(function() {
            $('.imgBox').animate({
                opacity: 0
            }, 2000);
        }, 10);
        function resizeV() {
        	var h = $('.bgBox').height() ,w = $('.bgBox').width();
			/*$('.indexCon').css('paddingTop',h/20);h/6.75*/
			h*1.8>w?w=h*1.8:h=w/1.8;
			$('.vd , .imgBox').css({
				'height':h,
				'width':w	
			});
        }
    };
};

//输入框获得焦点
//$GF.inputFocus = function() {
//    $('input.keyword').focus(function() {
//        $(this).siblings('label').css('color', '#aaa').parents('.searchCon').addClass('searchCF');
//        $(window).keydown(function() {
//            $('input.keyword').siblings('label').css('visibility', 'hidden');
//        });
//    });
//    $('input.keyword').blur(function() {
//        if ($(this).val() == '') {
//            $(this).siblings('label').css('color', '#666').parents('.searchCon').removeClass('searchCF');
//            $('input.keyword').siblings('label').css('visibility', 'visible');
//        }
//    });
//}
//;

//水滴滚动
$GF.verScroll = function() {
    var cbt = 0;
    var l = 0;
    var scrollBtn = $('span.btn');
    $('.verBox').scroll(function() {
        var bh = $('.verBox').height()
          , //外围容器高度
        ch = $('.verBoxCon').height();
        //内部容器高度
        var k = $(".verBox").scrollTop() / (ch - bh);
        var t = k - l;
        cbt = $('.scroll').height() * k;
        if (t > 0) {
            scrollBtn.removeClass().addClass('btn dowm').stop(true, false).animate({
                'top': [cbt, 'easeInOutQuad']
            }, 1000, function() {
                $(this).removeClass().addClass('btn normal');
            });
        } else if (t < 0) {
            scrollBtn.removeClass().addClass('btn up').stop(true, false).animate({
                'top': [cbt, 'easeOutCubic']
            }, 1000, function() {
                $(this).removeClass().addClass('btn normal');
            });
        }
        l = k;
    });
    dragDIV(scrollBtn);
    function dragDIV(div) {
        var div = div;
        var isMove = false;
        //记录鼠标点击状态
        var offsetY = 0;
        //鼠标点击时偏移
        var ct = 0;
        var bh = $('.verBox').height()
          , //外围容器高度
        ch = $('.verBoxCon').height();
        //内部容器高度
        div.mouseover(function() {
            $(this).css('cursor', 'default');
        });
        div.mousedown(function(e) {
            isMove = true;
            offsetY = e.pageY;
            //获取鼠在当前窗口的相对偏移位置的Top值并赋值给offsetY
            ct = div.position().top;
            //获取当前滑块css 初始 Top值
        });
        $(document).mouseup(function() {
            isMove = false;
        });
        $(document).mousemove(function(e) {
            if (!isMove)
                return;
            var y = e.pageY - offsetY;
            //获取鼠标垂直偏移量
            if (ct + y > 0 && ct + y < bh) {
                div.css('top', ct + y);
                //ct+y 初始值+偏移量
            }
            div.css('cursor', 'default');
            var st = (ch - bh) * ((ct + y) / bh);
            $(".verBox").scrollTop(st);
            return y;
        });
    }
}
;
//头部搜索
//$GF.headSearch = function() {
//    var input = $('input.headSearch');
//    var txt = input.attr('txt');
//    input.focus(function() {
//        $(this).parents('.searchBox').animate({
//            'width': '100%'
//        }, 500);
//        if ($(this).val() == txt) {
//            $(this).val('');
//        }
//    }).blur(function() {
//        if ($(this).val() == '') {
//            $(this).val(txt);
//            $(this).parents('.searchBox').animate({
//                'width': 100
//            }, 200);
//        }
//    });
//    $('.searchIcon').toggle(function() {
//        input.unbind("blur");
//        $('.search').slideDown();
//        input.focus(function() {
//            if ($(this).val() == txt) {
//                $(this).val('');
//            }
//        }).blur(function() {
//            if ($(this).val() == '') {
//                $(this).val(txt);
//            }
//        });
//    }, function() {
//        $('.search').slideUp();
//    });
//    $(window).resize(function() {
//        //$('span.width').text($(window).width()).find('.searchBox').css('width','100%');
//        if ($(window).width() > 540) {
//            $('.search').css('display', 'block');
//        } else if ($(window).width() < 540) {
//            $('.search').css('display', 'none');
//        }
//    });
//}
//;
/*WEB规范聚合页ICON hover*/
//$GF.gListHover = function() {
//    $('ul.gList').find('li').hover(function() {
//        $(this).addClass('hover');
//    }, function() {
//        $(this).removeClass('hover');
//    });
//}
//;

/*首页公告*/
//$GF.indexNotice = function() {
//    var noticeTxt = $('.popCon').html()
//      , noticeShortTxt = $('.noticeBox').find('p').html();
//    $('#noticeMore').live('click', function() {
//        $('.noticeBox').find('p').html(noticeTxt);
//        $('.noticeBox').css('height', 'auto');
//        var h = $('.noticeBox').height();
//        $('.noticeBox').css('height', '74px');
//        $('.noticeBox').animate({
//            height: h
//        }, 200);
//        $('b.closePop').css('display', 'block');
//    });
//    $('b.closePop').click(function() {
//        $('.noticeBox').find('p').html(noticeShortTxt);
//        $('.noticeBox').animate({
//            height: '74px'
//        }, 200);
//        $('b.closePop').css('display', 'none');
//    });
//}
//;
/*底部位置*/
//$GF.footPS = function() {
//    var ch = $('.content').height()
//      , h = $(window).height();
//    if (ch > h - 80) {
//        $('.footer').css('position', 'relative');
//        $('.content').css('paddingBottom', '0px')
//    }
//
//}

function htmlSlide(t) {
    $("html, body").animate({
        scrollTop: t
    }, 120);
}
$(function() {
    //$GF.videoContrl();
    /*$GF.iconSlide();*/
   // $GF.inputFocus();
    $GF.verScroll();
   // $GF.gListHover();
   // $GF.headSearch();
   // $GF.indexNotice();
   // $GF.footPS();
});

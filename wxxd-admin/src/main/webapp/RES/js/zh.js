/**
 * Created by ZLY on 2016/3/9.
 */
(function($,win,doc){
    var dt ={};
    dt.layout = function (){
        function outwrap(){
            var left = $('.left-bar') ;
            var right = $('.main-content')  ;
            var l_h= left.height();
            var r_h= right.height() ;
            var win_h = $(window).height();
            if(win_h > l_h && win_h > r_h){

                right.height(win_h);
                left.height(win_h);
            }else{
                if(l_h > r_h){
                    right.height(l_h)
                } else{
                    left.height(r_h);
                }
            }
        }
        outwrap();
        /*pj-dt-info的宽度计算*/
        //用于计算滚动条的宽度
        function getScrollbarWidth() {
            $("<p style='width:100px;height:100px;overflow-y:scroll;' id='testP'></p>").appendTo("body");
            var oP = document.getElementById("testP");
            var scrollbarWidth = oP.offsetWidth - oP.clientWidth;
            $("#testP").remove();
            return scrollbarWidth;
        }
        function pj(){
            $(".pj-dt-info").width(0);
            $(".pj-dt-info").css('width',function(){
                return $(document).width()- getScrollbarWidth() - $(".pj-dt-info")[0].offsetLeft -6;
            }) ;
            //$(".pj-dt-info").height(auto);
        }
        pj() ;

        function innerh(){
            var left  = $('.right-content-inner-menu');
            var right = $('.pj-dt-info');
            if( left.height() > right.height() ) {
                right.height(left.height())
            } else{
                left.height(right.height())
            }
        }
        innerh();

        $('.top-btn a').click(function(){
            setTimeout(pj,0);
        }) ;



        $('.right-content-inner-menu li').hover(function (e){
            e.stopPropagation();
            $(this).addClass('active');
            $(this).siblings('li').removeClass('active');
            innerh();
        },function(e){
            var self =$(this);
            e.stopPropagation();
            self.removeClass('active') ;
            innerh();
        }) ;

        $(window).resize(function(){
            pj() ;
            outwrap();
            innerh();

        });
        $(window).scroll(function(){
            pj() ;
            outwrap();
            innerh();

        });
    } ;
    dt.leftbar = function(){
    	
        var show = $(".top-btn .show-a"),
            hide = $(".top-btn .hide-a");
        show.on('click',function(){
            $(this).addClass('hide');
            hide.removeClass('hide');
        });
        hide.on('click',function(){
            $(this).addClass('hide');
            show.removeClass('hide');
        })  ;
        /*左侧宽度切换*/
        $('.top-btn a').click(function(){
            if( $.trim( $(".left-bar")[0].className) == 'left-bar' ) {
                if( $(".pj-dt-info").length>0 ){
                    /*帮助切换不同宽度时的正常布局，临时让其宽度变小*/
                    $(".pj-dt-info")[0].style.width = 0;
                }
                $(".left-bar")[0].className = "left-bar slideUp";
                $('.main-content').addClass('ml100');
            } else{
                if( $(".pj-dt-info").length>0 ){
                    $(".pj-dt-info")[0].style.width = 0;
                }
                $(".left-bar")[0].className = "left-bar";
                $('.main-content').removeClass('ml100');
            }
        }) ;
        /*二级和三级菜单的切换*/
        $('.site-nav li').hover(function (e){
            e.stopPropagation();
            $(this).addClass('on');
            $(this).siblings('li').removeClass('on');
        },function(e){
            var self =$(this);
            e.stopPropagation();
            self.removeClass('on') ;
        });
        $('.site-nav li li').hover(function (e) {
            e.stopPropagation();

            //+-号
            $(this).find('.jia').addClass('hide');
            $(this).find('.jian').removeClass('hide');

            $(this).siblings('li') .find('.jian').addClass('hide')
                .find('.jia').removeClass('hide');
        },function(e){
            e.stopPropagation();

            $(this).find('.jian').addClass('hide');
            $(this).find('.jia').removeClass('hide');
        });

    };
    dt.laftbarhide = function(){
    	var show = $(".top-btn .show-a"),
	        hide = $(".top-btn .hide-a");
    	hide.addClass('hide');
    	show.removeClass('hide');
    	if( $.trim( $(".left-bar")[0].className) == 'left-bar' ) {
            if( $(".pj-dt-info").length>0 ){
                /*帮助切换不同宽度时的正常布局，临时让其宽度变小*/
                $(".pj-dt-info")[0].style.width = 0;
            }
            $(".left-bar")[0].className = "left-bar slideUp";
            $('.main-content').addClass('ml100');
        } else{
            if( $(".pj-dt-info").length>0 ){
                $(".pj-dt-info")[0].style.width = 0;
            }
            $(".left-bar")[0].className = "left-bar";
            $('.main-content').removeClass('ml100');
        }
    	
    	/*二级和三级菜单的切换*/
        $('.site-nav .menu').hover(function (e){
            e.stopPropagation();
            $(this).addClass('on');
            $(this).siblings('li').removeClass('on');
        },function(e){
            var self =$(this);
            e.stopPropagation();
            self.removeClass('on');
        });
    };
    dt.table = function (){
        $('.dev-table .sh').click(function(){
            $(this).toggleClass('sh-on');
            $(this).parent().parent().nextUntil('.tit-tr').toggleClass('sub-table-on');
        }) ;

        /*履约管理*/
        $('.ly-manage').find('.tree-tr .sh').on('click',function(){
            var self = $(this);
            var twop = self.parent().parent();
            var tree = self.parent().parent().parent();
            if( self.hasClass('sh-on') ){
                self.removeClass('sh-on');
                self.parent().nextAll('.tree-lv2').addClass('hide') ;
                tree.nextAll('.tree-sub').addClass('hide');
                twop.removeAttr('rowspan');
                twop.prev().removeAttr('rowspan');
            }else{
                self.addClass('sh-on');
                self.parent().nextAll('.tree-lv2').removeClass('hide') ;
                tree.nextAll('.tree-sub').removeClass('hide');
                twop.attr('rowspan',self.parent().nextAll('.tree-lv2').length+1) ;
                twop.prev().attr('rowspan',self.parent().nextAll('.tree-lv2').length+1) ;
            }
        })

    } ;
//全选
    dt.allChose=function(tb) {
        var _all_chk = $(tb).find("tr th input:checkbox");
        //var _other_chks = $(tb).find("tr td input:checkbox");
        _all_chk.click(function () {
            var _other_chks = $(this).parent().parent().siblings().find("input:checkbox:first");
            if($(this).prop("checked")){
                _other_chks.prop("checked",true);
            }else{
                _other_chks.prop("checked",false);
            }
        });

    };
    /*显示上传文件名*/
    dt.file=function(file,text){
        $(file).change(function(){
            var path = $(this).val();
            var pos1 = path.lastIndexOf('/');
            var pos2 = path.lastIndexOf('\\');
            var pos = Math.max(pos1, pos2);
            var filename = pos < 0 ? path : path.substring(pos + 1);
            $(this).siblings(text).val(filename);
        });
    };
    dt.tabs= function(wrap,btn,content){
        var wrap = $(wrap),
            content = $(btn).parent().next().children(content);

        wrap.on('click',btn,function(){
            var index  = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            content.eq(index).show().siblings().hide();
        })
    };
    dt.initIframe = function(){
    	var iframeHeight = $(window).height() - 160;
    	$(".contentIframe").height(iframeHeight);
    }
    
    var tb = {};
    //表格tab切换
    tb.tabs = function () {
        $(".tab-wrap ul li").click(function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            $(".tab-content").eq($(this).index()).show().siblings(".tab-content").hide();
        })
    };
    tb.all = function () {
        $("table .all").click(function () {
            var chk = $(this).parents("thead").next().find("td input:checkbox");
            if($(this).prop("checked")){
                chk.prop("checked",true);
            }else{
                chk.prop("checked",false);
            }
        })
    };
    tb.addDelTb = function () {
        var ctlAdd = ".controlTb-btns .add,.p-btns .add";
        var ctlDel = ".controlTb-btns .del,.p-btns .del";
        $(document).on("click",ctlAdd,function () {
            var tbody = $(this).parent().next("table").find("tbody");
            var clone = tbody.find("tr:first").clone();
            clone.find("td input").val("");
            tbody.append(clone);
        }) ;

        $(document).on("click",ctlDel,function () {
            var tbody = $(this).parent().next("table").find("tbody");
            tbody.find("input:checked").each(function () {
                if(tbody.find("input:checkbox").size() > 1){
                    $(this).parents("tr").remove();
                }
            })
        })
    };
    $(function(){
        dt.layout();
        dt.laftbarhide();
        dt.table();
 		dt.tabs('.tab-wrap','.tab-btns a','.tab-content');
        dt.tabs('.tab-wrap','.tab-btns-lv2 a','.tab-content');
        dt.file('.upload-wrap .file','.text');
        dt.allChose('.has-allpick');
        dt.initIframe();

        tb.tabs();
        tb.all();
        tb.addDelTb();
    })
})(jQuery,window,document);

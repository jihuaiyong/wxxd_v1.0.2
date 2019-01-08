/**
 * Created by h.jiali2 on 2015/5/22.
 */

;var split = split||{};
    //常用效果
split.com_effect = function () {
    tb_bg_color();
    r_align();
    //表格间隔色显示
    function tb_bg_color(){
        var _tb = $(".normal-tb");
        _tb.find("tbody tr:odd").addClass("bg");
    };
    //右侧对齐
    function r_align(){
        var _r_wrap = $(".contain");
        var _parent_wrap = _r_wrap.parents(".wrap");
        _r_wrap.css("min-height",_parent_wrap.height());
    }
}

    //登录框切换
split.switch_onOrOff = function () {
    var _sw_btn = $(".sw-btn");
    _sw_btn.click(function () {
        $(this).toggleClass("on");
    })
};
    //tab切换
split.tabSW = function () {
    var _tabs_head = $(".tabs-wrap");
    _tabs_head.find("ul li a").click(function () {
        var index = $(this).parent().index();
        $(this).addClass("on").parent().siblings().find("a").removeClass("on");
        var tabs_content = $(this).parents(".tabs-wrap").next();
        tabs_content.children().eq(index).show().siblings().hide();
    })
};
//弹窗
split.popup = function (btn,pop,isCover){
    //打开弹窗
    $(btn).click(function () {
        var l = $(window).width()/2-$(pop).width()/2;
        var t = $(window).height()/2-$(pop).height()/2;
        if(isCover){
            $(".cover").removeClass("hide");
            $(pop).addClass("isCover");
        }
        $(pop).css({left:l,top:t});
        $(pop).fadeIn(500);
        //$("body").css("overflow","hidden");
        $(".blur").addClass("on");
    });
    //关闭弹窗
    $(".close").click(function(){
        if($(this).parents(pop).hasClass("isCover")){
            $(".cover").addClass("hide");
        }
        $(this).parents(pop).fadeOut(500);
        //$("body").css("overflow","auto");
        $(".blur").removeClass("on");
    });

    //按确定键返回true
    $(".confirm").click(function () {
        return true;
    })
};
$(function(){
    split.com_effect();
    split.switch_onOrOff();
    split.tabSW();
});
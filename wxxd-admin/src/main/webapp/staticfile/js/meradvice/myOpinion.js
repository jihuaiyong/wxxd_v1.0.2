/**
 * Created by 13121528 on 14-6-22.
 */
var myOpinion = myOpinion || {};

myOpinion.prototype={
    init:function(obj,i){
        var v = obj.text();
        if(v >= 10){
            obj.css("background","url('css/images/myOpinion.png') -25px -54px");
            obj.css("width","24px");
            obj.css("height","19px");
        }else{
            obj.css("background","url('css/images/myOpinion.png') -28px -1px");
            obj.css("width","19px");
            obj.css("height","19px");
        }
        var v = "手机\\QQ\\邮箱";
        i.val(v);

    },
    closeWindow:function(obj,d){
        obj.click(function(){
            d.hide();
        });
   },
    showWindow:function(a,b,c){
        a.click(function(event){
            if(c == 1){
                b.show();
                $(".op_u1").show();
                $(".op_u2").hide();
                $(".op_u3").hide();
                event.stopPropagation();
            }else{
                b.show();
                $(".op_u2").show();
                $(".op_u1").hide();
                $(".op_u3").hide();
                event.stopPropagation();
            }
            $(".op_div").css('height',$(".op_div").height());
        });
    },
    hover:function(obj){
        var val = obj.text();
        obj.hover(function(){
           if(val >= 10){
                $(this).css("background","url('css/images/myOpinion.png') -26px -79px");
                $(this).css("color","#E70000");
           }else{
               $(this).css("background","url('css/images/myOpinion.png') -28px -25px");
               $(this).css("color","#E70000");
           }
        },function(){
            if(val >= 10){
                $(this).css("background","url('css/images/myOpinion.png') -25px -54px");
                $(this).css("color","#FFF");
            }else{
                $(this).css("background","url('css/images/myOpinion.png') -28px -1px");
                $(this).css("color","#FFF");
            }
        });
    },
    showClose:function(obj){
        obj.hover(function(){
           $(this).find('.mess_head').find('em').show();
        },function(){
            $(this).find('.mess_head').find('em').hide();
        });
    },
    closeli:function(obj){
        obj.click(function(){
              var id = $(this).attr("id");
              $(".li"+ id).fadeOut('slow',function(){
                  $(".li"+ id).hide();
              });
        });
    },
    textBg:function(obj){
        obj.hover(function(){
            $(this).css('background','#F6A81C');
            $(this).css('border','1px solid #FDA407');

            if(obj.attr('class').indexOf('olserver') != -1){
                $(this).find('a').text("在线客服");
            }else{
                $(this).find('a').text("问题反馈");
            }
        },function(){
            if(obj.attr('class').indexOf('olserver') != -1){
                $(this).css('background',"#fff url(css/images/am.gif) no-repeat center center");
                $(this).find('a').text("");
                $(this).css('border','1px solid #d3d3d3');
            }else{
                $(this).css('background',"#fff url(css/images/question.png) no-repeat center center");
                $(this).find('a').text("");
                $(this).css('border','1px solid #d3d3d3');
            }
        });
    },
    ulevent:function(obj,h1,h2,s){
        obj.click(function(){
            h1.hide();
            h2.hide();
            s.show();
        });
    },
    oneshow:function(obj,d){
         obj.click(function(){
             d.show();
         });
    },
    thisClose:function(obj){
        obj.hide();
    },
    inputhover:function(obj){
        obj.focus(function(){
            var v = obj.val();
            if(v == "手机\\QQ\\邮箱"){
                obj.val("");
            }
        });

        obj.blur(function(){
            var v = obj.val();
            if(v == ""){
                obj.val("手机\\QQ\\邮箱");
            }
        })
    }
}
$(function(){
    var my = myOpinion.prototype;
   //初始化
    my.init($(".z-sidebar li em"),$("#contact"));
    //添加事件
    $(".op_div .op_head em").add(my.closeWindow($(".op_div .op_head em"),$('.op_div')));
    $("#clo").add(my.closeWindow($("#clo"),$('.op_div')));
    $("#u3_Close").add(my.closeWindow($("#u3_Close"),$('.op_div')));

    $(".z-sidebar li em").add(my.hover($(".z-sidebar li em")));
    //右上角关闭按钮显示
    $(".mess_context").add(my.showClose($(".mess_context")));
    //右上角关闭按钮操作
    $(".mess_head .m_img").add(my.closeli($(".mess_head .m_img")));

    //提示图层切换
    $(".z-sidebar .olserver").add(my.textBg($(".z-sidebar .olserver")));
    $(".z-sidebar .sidebar1").add(my.textBg($(".z-sidebar .sidebar1")));
    $(".z-sidebar .sidebar1").add(my.showWindow($(".z-sidebar .sidebar1"),$(".op_div"),1));
    $(".z-sidebar .sidebar1 em").add(my.showWindow($(".z-sidebar .sidebar1 em"),$(".op_div"),2));
    $(".p0").add(my.ulevent($(".op_div .op_info .message .p0"),$(".op_u1"),$(".op_u3"),$(".op_u2")));
    $(".op_div .upload .upload_close").add(my.closeWindow( $(".op_div .upload .upload_close"),$(".upload")));
    $("#uploadId").add(my.oneshow($("#uploadId"),$(".upload")));

    $("#sub").add(my.ulevent($("#sub"),$(".op_u1"),$(".op_u2"),$(".op_u3")));



    $("#contact").add(my.inputhover($("#contact")));
    $("#jianyi").add(my.ulevent($("#jianyi"),$(".op_u3"),$(".op_u2"),$(".op_u1")))
});


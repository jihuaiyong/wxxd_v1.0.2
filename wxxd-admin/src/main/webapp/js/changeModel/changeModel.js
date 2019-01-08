  
  //修改输入数据，不足补0
  function changeDataModel(obj,n){
        var data = $(obj).val();
        if ( data.length < n && data.length != 0){
				for(var i = data.length; i < n; i++){
					data = "0" + data;
				}
     	        $(obj).val(data);
            }
   }
  
  //按钮显示修改,隐藏弹框
  function btnOpen(obj,win){
        $(win).hide();
 	   $(obj).find("span").text("修改");
 	   $(obj).removeClass("tijiao");
 	   $(obj).addClass("goback");
  
  }
  //按钮显示关闭
  function btnClose(obj){
     $(obj).find("span").text("关闭");
 	 $(obj).removeClass("goback");
 	 $(obj).addClass("tijiao");
  }
  //打开窗口
  function openWin(win){
	  $(win).show();
	  $(win).css({top:($(window).height()-$(win).height())/2+$(window).scrollTop()+"px"});
  }
  //塞值
  function setValueJson(obj,data){
	  $(obj).find('[name]').each(function() {
          var type = $(this)[0].nodeName.toLowerCase();
          var name = $(this).attr('name');
          $(obj).find(type+"[name='"+name+"']").val(data[''+name+'']);
     });
  }
  //取值
  function getValueJson(obj) {
	var param = {};
	$(obj).find('[name]').each(function() {
		param[$(this).attr('name')] = $(this).val();
	});
	return param;
 }
  
  
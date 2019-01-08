
//pop右下角弹窗函数
function Pop(){
	this.apearTime=1000;
	this.hideTime=500;
	this.delay=10000;
	//显示
	this.showDiv();
	//关闭
    this.closeDiv();
}
Pop.prototype={
  showDiv:function(time){
	if (!($.browser.msie && ($.browser.version == "6.0") && !$.support.style)) {
      $('#pop').slideDown(this.apearTime).delay(this.delay).fadeOut(400);;
    } else{//调用jquery.fixed.js,解决ie6不能用fixed
      $('#pop').show();
			jQuery(function($j){
			    $j('#pop').positionFixed();
			});
    }
  },
  closeDiv:function(){
  	$("#popClose").click(function(){
  		  $('#pop').hide();
  		}
    );
  }
};

<div class="uiPop Pop7" style="top: 100px;display:none;z-index:999999">
    <h2><em onclick="closeWin('Pop7')"></em></h2>
    <div class="uiPopcon">
        <em class="tipHelp3"></em><span id="msgConfirm"></span><br><br>
        <a class="uiBtn case6" id="ok"><span>确  定</span></a>
        <a class="uiBtn case6" id= "cancel"><span>取  消</span></a>
    </div>
</div>

<div class="uiPop alertDiv" style="top: 100px;display:none;z-index:999999">
    <h2><em id="alertOkEm"></em></h2>
    <div class="uiPopcon">
        <em id="alertMsgEm" class="tipWarn3"></em><span id="alertDivMsgSpan"></span><br><br>
        <a class="uiBtn case6" id="alertOk"><span>确  定</span></a>
    </div>
</div>

<div class="bottomDiv" style="border:5px solid #7c7c7c;-moz-box-shadow:3px 3px 4px #AAA5A1;-webkit-box-shadow:3px 3px 4px #AAA5A1;box-shadow:3px 3px 4px #AAA5A1;background:#FFF;z-index:99999;overflow:hidden;text-align:center;right:5px;position:fixed;_position:absolute; bottom:5px;display:none;width:200px;height:100px;_top: expression(documentElement.scrollTop + documentElement.clientHeight-this.offsetHeight)">
    <h2><em onclick="closeWinNew('bottomDiv')"></em></h2>
    <div class="uiPopcon">
        <em id="bottomMsgem" class="tipWarn3"></em><span id="bottomMsgSpan"></span><br><br>
    </div>
</div>


 <script type="text/javascript">
          //打开弹出框，与alert相同效果
          function showMsg(type,msg,fn){
          	if(type=="success"){
          		$("#alertMsgEm").attr("class","tipOK3");
          	}
          	if(type=="failure"){
          		$("#alertMsgEm").attr("class","tipFalse3");
          	}
          	if(type=="warn"){
          		$("#alertMsgEm").attr("class","tipWarn3");
          	}
          	if(type=="help"){
          		$("#alertMsgEm").attr("class","tipHelp3");
          	}
          	if(type=="info"){
          		$("#alertMsgEm").attr("class","tipInfo3");
          	}
          	
          	$("#alertDivMsgSpan").empty();
			$("#alertDivMsgSpan").append(msg) ;
			grayLayerAction(true);
			var obj = $(".alertDiv") ;
			obj.show();
			obj.css({top:($(window).height()-obj.height())/2+$(window).scrollTop()+"px"});
			
			$("#alertOk").unbind();
			$("#alertOkEm").unbind();
			if(arguments.length==2){
			   $("#alertOk").click(function(){
			       closeWin("alertDiv");
		        });
		         $("#alertOkEm").click(function(){
			       closeWin("alertDiv");
		        });
			}
			if(arguments.length==3){
			   $("#alertOk").click(function(){
			       closeWin("alertDiv");
			       if(fn){
			       	fn();
			       }
		        });
		        $("#alertOkEm").click(function(){
			       closeWin("alertDiv");
			       if(fn){
			       	fn();
			       }
		        });
			}
          }
          
          //右下角消息显示
          function showMsgBottom(type,msg,sec,fn){
          	if(type=="success"){
          		$("#bottomMsgem").attr("class","tipOK3");
          	}
          	if(type=="failure"){
          		$("#bottomMsgem").attr("class","tipFalse3");
          	}
          	if(type=="warn"){
          		$("#bottomMsgem").attr("class","tipWarn3");
          	}
          	
          	var wintopfir=$(".bottomDiv").height(); 
			var wintopsec=wintopfir-100;
			$(".bottomDiv").show();
			$(".bottomDiv").css({bottom:"-100px"}); 
			$("#bottomMsgSpan").empty();
			$("#bottomMsgSpan").append(msg) ;
			$(".bottomDiv").animate({bottom:"0px" }, 100);
			if(arguments.length==2){
				setTimeout(function(){$(".bottomDiv").hide();},2000);
			}
			if(arguments.length==3){
				setTimeout(function(){$(".bottomDiv").hide();},sec);
			}
			if(arguments.length==4){
				setTimeout(fn,sec);
			}
          }
          

 </script>
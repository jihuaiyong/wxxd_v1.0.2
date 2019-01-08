var _move=false;//移动标记  
var _x,_y;//鼠标离控件左上角的相对位置 
function draggable(obj){
	obj.click(function(){  
	    //alert("click");//点击（松开后触发）  
    }).mousedown(function(e){
    	//取消选中的内容
    	if (document.selection) { 
    		document.selection.empty(); 
		} else if (window.getSelection) { 
			window.getSelection().removeAllRanges(); 
		} 
    	_move=true;  
	    _x=e.pageX-parseInt(obj.parent().css("left"));  
	    _y=e.pageY-parseInt(obj.parent().css("top")); 
	    obj.css("cursor","move") ;
	});  
	$(document).mousemove(function(e){  
	    if(_move){  
	        var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置  
	        var y=e.pageY-_y;  
	        if(y+parseInt(obj.parent().css("height"))>$(window).height()){
	        	y = $(window).height()-parseInt(obj.parent().css("height"));
	        }
	        if(x+parseInt(obj.parent().css("width"))>$(window).width()){
	        	x = $(window).width()-parseInt(obj.parent().css("width"));
	        }
	        if(x < -277){
	        	x = -277;
	        }
	        if(y < -29){
	        	y = -29;
	        }
	        if(x > 277){
	        	x = 277;
	        }
	        if(y > 120){
	        	y = 120;
	        }
	        obj.parent().css({top:y,left:x});//控件新位置
	        //取消鼠标以后选中的内容
	        if (document.selection) { 
	    		document.selection.empty(); 
			} else if (window.getSelection) { 
				window.getSelection().removeAllRanges(); 
			} 
	    }  
	}).mouseup(function(){  
		_move=false;
		obj.css("cursor","default") ;
	});  
}

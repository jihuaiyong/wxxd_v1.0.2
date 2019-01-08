		
		var xwin = {
			showwin : function(w,h,title,content){
				var exwin = document.getElementById("wxcs_xwin_div");
				if(exwin != null){
					
				}else{
					xwin.newwin(w,h,title,content);
				}
				$('#wxcs_xwin_div_bg').show();
				$('#wxcs_xwin_div').show();
			},

			newwin : function(w,h,title,content){
				var pos_x = ($(window).width()-w)/2;
				var pos_y = ($(window).height()-h)/2;

				var css = new Array();
				css.push('<style id="wxcs_xwin_css">');
				css.push('#wxcs_xwin_div{border:solid 10px #aaa;position:fixed;_position:absolute;z-index:99999;}');
				css.push('#wxcs_xwin_div tbody tr th{background:#eee;padding:5px;}');
				css.push('#wxcs_xwin_div tbody tr td{background:#fff}');
				css.push('#wxcs_xwin_div tbody tr td div{overflow-y:auto;margin:5px;background:#fff;white-space:break-all;width:'+(w-10)+'px}');
				css.push('#wxcs_xwin_div_bg{width:100%; background:#000;top:0;left:0;position:absolute;z-index:99999;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;}');
				css.push('.aclose{text-decoration:none;font-size:14pt;}');
				css.push('</style>');
				$("head").append(css.join(""));

				var html = new Array();
				var top_i=eval(document.body.scrollTop + 50);
				html.push('<div id="wxcs_xwin_div_bg" style="height:'+$(document).height()+'px"></div>');
				html.push('<div id="wxcs_xwin_div" style="width:'+w+'px;top:'+pos_y+'px;_top:'+top_i+'px;left:'+pos_x+'px;">');
				html.push('<table border="0" width="100%" cellpadding="0" cellspacing="0">');
				html.push('<tbody>');
				html.push('<tr>');
				html.push('<th width="90%" align="left">'+title+'</th>');
				html.push('<th width="20" align="right"><a href="#" class="aclose" onclick="javascript:xwin.closewin();return false;">×</a></th>');
				html.push('</tr>');
				html.push('<tr>');
				html.push('<td colspan="2">');
				html.push('<div style="height:'+h+'px">');
				html.push(content);
				html.push('</div>');
				html.push('</td>');
				html.push('</tr>');
				html.push('</tbody>');
				html.push('</table>');
				html.push('</div>');
				html.push('');
				html.push('');

				$("body").append(html.join(""));
			},

			closewin : function(){
				$('#wxcs_xwin_div').remove();
				$('#wxcs_xwin_div_bg').remove();
				$("#wxcs_xwin_css").remove();
			}

		};
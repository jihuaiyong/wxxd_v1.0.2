 <script>
	function a(url, title){
		$mainFrame = $('#mainFrame');
		if (title == 'draft'){
			window.open(url);
		} else if (title == 'processDraftList'){
			$mainFrame.attr("src", url);
		} else if (title == 'workitemAllList'){
			$mainFrame.attr("src", url);
		} else if (title == 'completedAllList'){
			$mainFrame.attr("src", url);
		} else if (title == 'readerAllList'){
			$mainFrame.attr("src", url);
		} else if (title == 'readerOutAllList'){
			$mainFrame.attr("src", url);
		}
	};
</script>
 <div class="left-bar">
    <!--<div class="top-btn">
        <a href="javascript:;" class="show-a hide"> > </a>
        <a href="javascript:;" class="hide-a"> < </a>
    </div>-->
    <div class="site-nav">
        <ul>
        	<!--${base}/home.htm-->
            <li class="menu index-page" onclick="a('${base}/workitemAllList.do', 'workitemAllList');">
                <h3>
                    <span class="tip-icon"></span>
                    <a class="this-tit" href="${base}/index.htm" target="mainFrame">首页</a>
                </h3>
            </li>
            <li class="menu cj-mange">
                <h3>
                    <span class="tip-icon"></span>
                    <a class="this-tit" href="javascript:;">流程管理</a>
                    <em></em>
                </h3>
                <ul class="">
                	<li><a href="#" onclick="a('${base}/processRoleFilter.do?businessTemplateId=NSOA9760', 'draft');">流程起草</a></li>
                    <li><a href="#" onclick="a('${base}/processDraftList.do', 'processDraftList');">我的草稿</a></li>
                    <li><a href="#" onclick="a('${base}/workitemAllList.do', 'workitemAllList');">我的待办</a></li>
                    <li><a href="#" onclick="a('${base}/completedAllList.do', 'completedAllList');">我的已办</a></li>
                    <li><a href="#" onclick="a('${base}/readerAllList.do', 'readerAllList');">我的待阅</a></li>
                    <li><a href="#" onclick="a('${base}/readerOutAllList.do', 'readerOutAllList');">我的已阅</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>

<#-- 分页（Pager对象、链接URL、最大页码显示数） -->
<#macro pager pager baseUrl parameterMap={} maxShowPageCount = 9 parentid="grid" isChangePgSize = 'N' isShowJump = 'Y' isFloatBottom='N'>
	<#local pageNumber = pager.pageNumber />
	<#local pageSize = pager.pageSize />
	<#local pageCount = pager.pageCount />
	<#local totalDataCount = pager.totalDataCount />
	
	<#--由于对账平台分页显示部位长度不是很宽，故做一个显示页面数量判断-->
	<#if pager.pageCount < 100>
		<#local maxShowPageCount = 7>
	<#else>
		<#local maxShowPageCount = 5>
	</#if>
	
	<#if isChangePgSize == 'Y'>
		<#local maxShowPageCount = 5>
	</#if>
	
	<#--
		这两个这里没用，也不知道以前是做什么用的，只是放这儿	
		<#local property = pager.property />
		<#local keyword = pager.keyword />
	-->
	<#--
		这两个这里没用，以前是为查询数据排序用的，放这儿以防万一
		<#local orderBy = pager.orderBy />
		<#local orderType = pager.orderType />
	-->
	<#--
		构造查询参数 start
	-->
		<#local parameter = "{" />
		<#if pageSize??>
			<#local parameter = parameter + "\'pageSize\':" + pageSize />
		</#if>
		
		<#--
		查询排序
		<#if (orderBy != "")!>
			<#local parameter = parameter + "&pager.orderBy=" + orderBy />
		</#if>
		<#if (orderType != "")!>
			<#local parameter = parameter + "&pager.orderType=" + orderType />
		</#if>
		-->
		<#list parameterMap?keys as key>
			<#if parameterMap[key] != null && parameterMap[key] != "">
				<#local parameter = parameter + ","/>
				<#local parameter = parameter + "\'" + key + "\':\'" + parameterMap[key]+"\'" />
			</#if>
		</#list>
		<#local parameter =parameter + "}"/>
	<#--
		构造查询参数 end
	-->
	<div class="snPages" <#if isFloatBottom == 'Y'>style="position:absolute;left;0;bottom:0;"</#if>>
		<#if (isChangePgSize == 'Y')>
		<select id="showPageSize" onChange="$.page.loadData('${baseUrl}',1,${parameter},'${parentid}',this.value);" style="float:left;border:1px #ccc solid;margin-right:20px;height:25px">
			<option value="10" <#if pageSize=10>selected</#if>>10</option>
			<option value="30" <#if pageSize=30>selected</#if>>30</option>
			<option value="50" <#if pageSize=50>selected</#if>>50</option>
			<option value="100" <#if pageSize=100>selected</#if>>100</option>
		</select>
		</#if>
		<input id="pageparameter" type="hidden" value="${parameter}"/>
		<input id="pageNumber" type="hidden" value="${pageNumber}" />
	<#if (pageCount >0)>
		<#if maxShowPageCount <= 0>
			<#local maxShowPageCount = 9>
		</#if>
	<#--
		设置数字的开始和结束 start
	-->
		<#local segment = (maxShowPageCount/2)?int />
		<#local startPageNumber = pageNumber-segment/>
		<#local endPageNumber = pageNumber+segment />
		
	
		<#local startPageNumber = pageNumber-segment/>
		<#local endPageNumber = pageNumber+segment />
		<#if (startPageNumber < 1)>
			<#local startPageNumber = 1 />
			<#local endPageNumber = maxShowPageCount />
		</#if>
		<#if (endPageNumber > pageCount)>
			<#local endPageNumber = pageCount />
			
			<#local startPageNumber = pageCount-maxShowPageCount+1 />
			<#if (startPageNumber < 1)>
				<#local startPageNumber = 1 />
			</#if>
		</#if>
	<#--
		设置数字的开始和结束 end
	-->
	<#--
		放置html元素 start
	-->
	
		<span style="display:none" href="javascript:void(0);" id="${parentid}_nowpage" onclick="$.page.loadData('${baseUrl}',${pageNumber},${parameter},'${parentid}');"><b></b>当前页刷新</span>
		<#if (pageNumber > 1)>
			<a class="prev" href="javascript:void(0);" onclick="$.page.loadData('${baseUrl}',${pageNumber-1},${parameter},'${parentid}');"><b></b>上一页</a>
		<#else>
			<span class="prev" style="color:#b1b1b1;" href="javascript:void(0);"><b></b>上一页</span> 
		</#if> 
		<#list  startPageNumber .. endPageNumber  as index>
			<#if pageNumber != index>
				<a href="javascript:void(0);" onclick="$.page.loadData('${baseUrl}',${index},${parameter},'${parentid}');">${index}</a> 
			<#else>
				<a href="javascript:void(0);" class="current">${index}</a> 
			</#if>
		</#list>
		<#if pageNumber < pageCount>
			<a class="next" href="javascript:void(0);" onclick="$.page.loadData('${baseUrl}',${pageNumber+1},${parameter},'${parentid}');"><b></b>下一页</a>
		<#else>
			<span class="next" style="color:#b1b1b1;" href="javascript:void(0);`"><b></b>下一页</span> 
		</#if>
		<#if isShowJump == 'Y'>
			<div> 
				总数:${totalDataCount}&nbsp;&nbsp;共${pageCount}页  &nbsp;&nbsp;跳转至<input type="text" onkeydown="if(event.keyCode==13){$.page.clickSubmit(this,'${baseUrl}',${parameter},'${parentid}',${pageCount},${pageNumber},${pageSize});}"/>页<input type="button" value="确定" onclick="$.page.okClick(this,'${baseUrl}',${parameter},'${parentid}',${pageCount},${pageNumber},${pageSize});" class="pagesubmit">
			</div>
		</#if>
	</#if>
</div>
</#macro>
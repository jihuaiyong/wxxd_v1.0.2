<#assign snf=JspTaglibs["http://it.cnsuning.com/snf"]>
<div class="sidenav">
<!--		<dl class="food current">
			<dt>
				<em></em>
				<span title="常用菜单">常用菜单</span>
				<i></i>
			</dt>
			<dd>
				<ul>
					<li><a href="##" onclick="aClickFun('${request.contextPath}/sitemap/getSiteMap4Fav.action','','');" title="快捷菜单设置" style="font-weight:700">设置</a></li>
					<#if favorite ??>
						<#list favorite as favoriteMenu>
							<#if favoriteMenu.action ?? && favoriteMenu.action != ''>
								<li><a href="##" onclick="aClickFun('${request.contextPath}/${favoriteMenu.action!}','${favoriteMenu.menuId!}','${favoriteMenu.menuName!}');" title="${favoriteMenu.menuName!}">${favoriteMenu.menuName!}</a></li>
							<#else>
								<li><a href="##" title="${favoriteMenu.menuName!}">${favoriteMenu.menuName!}</a></li>
							</#if>
						</#list>
					</#if>
				</ul>
				<div class="clear"></div>
			</dd>
		</dl>-->
		<#assign first=firstJson?eval />
		<#if first ??>
			<#list first as firstMenu>
				<#if menuId4css ?? && firstMenu.menuId?string == menuId4css>
					<dl class="food current">
				<#else>
					<dl class="food">
				</#if>
						<dt onclick="setMenuId(${firstMenu.menuId!});"><em class="${firstMenu.menuCss!}"></em><span title="${firstMenu.menuName!}">${firstMenu.menuName!}</span><i></i></dt>
						<#assign second=secondJson?eval />
						<#if second ??>
						<dd>
							<ul>
						<#list second as secondMenu>
							<#if secondMenu.isParent == "false" && secondMenu.parentId ?? && secondMenu.parentId == firstMenu.menuId >
								<#if (secondMenu.action) ?? && secondMenu.action != ''>
									<li><a href="##" onclick="aClickFun('${request.contextPath}/${secondMenu.action!}','${secondMenu.menuId!}','${secondMenu.menuName!}');" title="${secondMenu.menuName!}">${secondMenu.menuName!}</a></li>
								<#else>
									<li><a href="##" title="${secondMenu.menuName!}">${secondMenu.menuName!}</a></li>
								</#if>
							</#if>
							<#if secondMenu.isParent == "true" && secondMenu.parentId ?? && secondMenu.parentId == firstMenu.menuId >
								<li>
								<#if secondMenu.action ?? && secondMenu.action != ''>
									<a href="##" onclick="aClickFun('${request.contextPath}/${secondMenu.action!}','${secondMenu.menuId!}','${secondMenu.menuName!}');" title="${secondMenu.menuName!}">${secondMenu.menuName!}</a>
								<#else>
									<a href="##" title="${secondMenu.menuName!}">${secondMenu.menuName!}</a>
								</#if>
								<#assign third=thirdJson?eval />
								<#if third ??>
								<dl class="child-food">
								<#list third as thirdMenu>
									<#if thirdMenu.parentId ?? && thirdMenu.parentId == secondMenu.menuId >
										<#if thirdMenu.action ?? && thirdMenu.action != ''>
										<dt><a href="##" onclick="aClickFun('${request.contextPath}/${thirdMenu.action!}','${thirdMenu.menuId!}','${thirdMenu.menuName!}');" title="${thirdMenu.menuName!}">${thirdMenu.menuName!}</a></dt>
										<#else>
										<dt><a href="##" title="${thirdMenu.menuName!}">${thirdMenu.menuName!}</a></dt>
										</#if>
									</#if>
								</#list>
								</dl>
								</#if>
								</li>
							</#if>
						</#list>
						</ul>
						<div class="clear"></div>
						</dd>
						</#if>
					</dl>
				</#list>
				</#if>
		
		
		
		<!--<dl class="food last-no-border">
			<dt>
				<em class="top136"></em>
				<span title="后台监控">后台监控</span>
				<i></i>
			</dt>
			<dd>
				<ul>
					<li>
					<a href="javascript:;" title="成功案例2">成功案例2</a></li>
					<li><a href="javascript:;" title="成功案例2">成功案例2</a></li>
					<li><a href="javascript:;" title="成功案例2">成功案例2</a></li>
					<li>
						<a href="javascript:;" title="成功案例2">成功案例2</a>
						<dl class="child-food">
							<dt><a href="#" target="_blank" title="成功案例2">成功案例2</a></dt>
							<dt><a href="#" target="_blank" title="成功案例2">成功案例2</a></dt>
							<dt><a href="#"  target="_blank" title="成功案例2">成功案例2</a></dt>
						</dl>
					</li>
					<li><a href="javascript:;" title="成功案例2">成功案例2</a></li>
					<li><a href="javascript:;" title="成功案例2">成功案例2</a></li>
					<li><a href="javascript:;" title="成功案例2">成功案例2</a></li>
				</ul>
				<div class="clear"></div>
			</dd>
		</dl>-->
	</div>
	<form name="aTurnForm" id ="aTurnForm" action="" method="get" >
		<@snf.noRepeatSubmit formName="aTurnForm"/>
		<input type="hidden" name="menuId4css" id="menuId4css" value="${menuId4css!}"/>
		<input type="hidden" name="optFuntionId" id="optFuntionId" value=""/>
		<input type="hidden" name="optFuntionName" id="optFuntionName" value=""/>
	</form>
 <script type="text/javascript">
 	
 
 	function setMenuId(menuId) {
 		$("#menuId4css").val(menuId);
 	}
 
 	function aClickFun(url,optFuntionId,optFuntionName) {
 		if (url != null && url != '') {
			$("#optFuntionId").val(optFuntionId);
			$("#optFuntionName").val(optFuntionName); 	
	 		document.aTurnForm.action = url;
	 		document.aTurnForm.submit();
 		}
 	}
 </script>
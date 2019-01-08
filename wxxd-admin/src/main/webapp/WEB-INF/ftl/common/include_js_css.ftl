<#-- 李雄杰： 自定义引入需要的js及css宏 
<#import "common/includ_js_css.ftl" as mer>
<#assign jsurl = ["staticfile/js/common", "staticfile/js/jquery-1.7.2.min", "staticfile/mer/js/busPlatform"]/>  
<@mer.jsurl url=jsurl/>
 -->

<#macro jsurl  url=[] >
<#assign ctxPath=request.contextPath>
<#if url??>
	<#list url as js>
		<script type="text/javascript" src="${ctxPath}/${js}.js" ></script>
	</#list>
</#if>
</#macro>

<#macro cssurl  url=[] >
<#assign ctxPath=request.contextPath>
<#if url??>
	<#list url as css>
		<link rel="stylesheet" type="text/css"  href="${ctxPath}/${css}.css" ></link>
	</#list>
</#if>
</#macro>
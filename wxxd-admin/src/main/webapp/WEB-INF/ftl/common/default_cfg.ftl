<#-- 
  action 前缀
  ${ctxPath}/xx/xx.action
 -->
<#assign ctxPath=request.contextPath>
<#setting number_format="#">

<#--
 静态文件 js css img html 前缀
-->
<#assign staticPath="${ctxPath}/staticfile">
<#--
上载图片预览地址
-->
<#assign previewPath="${scs.url}/ihsdata">

<#assign tePath="${domain.url}/te">

<#-- 使用页面引入宏 -->
<#import "./include_js_css.ftl" as sop>
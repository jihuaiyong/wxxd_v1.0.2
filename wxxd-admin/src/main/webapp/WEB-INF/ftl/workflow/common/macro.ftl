<#--默认引入的js和css等资源-->
<#macro headResource>
	<!--引入公共js和css资源-->
	<link type="image/x-icon" href="https://ssores.cnsuning.com/res/passport/favicon.ico" rel="shortcut icon" />
	
	<link type="text/css" href="${request.contextPath}/RES/css/main.css" rel="stylesheet" />
	<link type="text/css" href="${request.contextPath}/RES/css/zh.css" rel="stylesheet"/>
	<link type="text/css" href="${request.contextPath}/RES/css/lj.css" rel="stylesheet"/>
	
	<script type="text/javascript" src="${request.contextPath}/RES/js/jquery.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/jquery.form.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/Map.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/json2.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/utils/CommonUtil.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/utils/LayerUtil.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/utils/ValidateUtil.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/tools.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/jquery-ext.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/plugin/layer/layer.js"></script>
</#macro>

<#macro formResource>
	<link rel="stylesheet" href="${request.contextPath}/RES/flow/css/zh_main.css"/>
    <link rel="stylesheet" href="${request.contextPath}/RES/flow/css/main.css"/>
</#macro>

<#macro page>
	<link type="text/css" href="${request.contextPath}/RES/css/page.css" rel="stylesheet"/>
	<script type="text/javascript" src="${request.contextPath}/RES/js/core/page.js"></script>
</#macro>

<#macro flexigridResource>
	<!--引入flexigrid js和css资源-->
	<link type="text/css" href="${request.contextPath}/RES/js/plugin/flexigrid/css/flexigrid.css" rel="stylesheet"/>
	<script type="text/javascript" src="${request.contextPath}/RES/js/plugin/flexigrid/flexigrid.js"></script>
</#macro>

<#macro workflowResource>
	<script type="text/javascript" src="${request.contextPath}/RES/js/process/process_action.js"></script>
</#macro>

<#macro layuiResource>
	<link rel="stylesheet" href="${request.contextPath}/RES/plugin/layui/css/layui.css">
	<script src="${request.contextPath}/RES/plugin/layui/layui.js"></script>
</#macro>

<#macro validateResource>
	<script type="text/javascript" src="${request.contextPath}/RES/plugin/validate/jquery.validate.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/plugin/validate/messages_zh.js"></script>
	<script type="text/javascript" src="${request.contextPath}/RES/plugin/validate/input.js"></script>
	<link rel="stylesheet" href="${request.contextPath}/RES/plugin/validate/css/error.css">
</#macro>

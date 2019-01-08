<!DOCTYPE html>
<html lang="en">
<resRoot>
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <title>起草示例</title>
    <#import "../workflow/common/macro.ftl" as demo />
	<@demo.headResource />
    <@demo.formResource />
    <@demo.workflowResource />
    <@demo.validateResource />
</head>
<body style="min-width:800px;">
<p class="leave-title">系统提示信息：</p>
<div class="success-01">
    <img src="/RES/flow/images/right.png">
    <span>您的操作已经成功</span>
    <img src="/RES/flow/images/lion.jpg" class="lion">
</div>
</body>
</html>
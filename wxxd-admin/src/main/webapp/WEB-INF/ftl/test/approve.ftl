<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <title>审批示例</title>
    <#import "../workflow/common/macro.ftl" as demo />
	<@demo.headResource />
    <@demo.formResource />
    <@demo.workflowResource />
</head>
<body style="min-width:800px;">
<div class="form-wrap pb20 pt40">
    <h2 class="h2-title">流程审批示例</h2>
    <#include "../workflow/process/btn_approve.ftl" />
    <form method="post" action="${request.contextPath}/SupplyPriceApprove.do">
    <input type="hidden" id='varDivisionCodes' name='varDivisionCodes' value="${varDivisionCodes}"/>
    <#if forwardPath == "read">
		<input type="hidden" name="biz_processId" value="${processId}" />
	<#else>
		<#include "../workflow/process/hidden_approve.ftl" />
	</#if>
    <div class="table-wrap">
        <div class="component-wrap">
            <div class="component-title">
                <div class="component-title-wrap">
                    <div class="title-content">
                        <p>基本信息</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-content pt20">
            <table class="layout-table" id="layout-table1">
                <tr>
                    <th><em class="red-star">*</em>标题:</th>
                    <td colspan="3">
                        <span class="input-wrap">${businessInfo.businessTitle}
                            <input type="hidden" id="apply_title" name="apply_title"  value="${businessInfo.businessTitle}" class="normal-input"/>
                        </span>
                    </td>
                    <td>公文号：</td>
                    <td style="padding=left:5px;">${processId}</td>
                </tr>
            </table>
        </div>
    </div>
    </form>
<script>
    function dataVerify(){
    	return true;
    }
</script>
</body>
</html>
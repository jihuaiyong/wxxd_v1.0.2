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
<div class="form-wrap pb20 pt40">
    <h2 class="h2-title">流程申请示例</h2>
    <#include "../workflow/process/btn_apply.ftl" />
    <form id="apply_form" method="post" action="${request.contextPath}/SupplyPriceApply.do">
    <#include "../workflow/process/hidden_apply.ftl" />
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
                    <th><#if forwardPath == 'apply'><em class="red-star">*&nbsp;</em></#if>标题:</th>
                    <td colspan="3">
                        <span class="input-wrap">
                            <input type="text" id="apply_title" name="apply_title"  value="<#if businessInfo??>${businessInfo.businessTitle}</#if>" class="normal-input" style="width:50%" required="required"/>
                        </span>
                    </td>
                    <td>公文号：</td>
                    <td style="padding=left:5px;">
                		<#if businessInfo??>
                    		${businessInfo.businessCode}
                		<#elseif businessCode??>
                    		${businessCode}
                		</#if>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </form>
<script>
    function dataVerify(){
    	return $("#apply_form").valid();
    }
</script>
</body>
</html>
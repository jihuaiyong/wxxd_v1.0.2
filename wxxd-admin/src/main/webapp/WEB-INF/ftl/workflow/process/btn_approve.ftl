<!---
   参数cancelflag是开发者自己在控制类里面的一个必须参数，用来判断什么情况下需要取消申请按钮的出现。
   如：流程结束时不能取消申请，则此时需要给参数cancelflag赋值为true
   controller里代码示例 
	if (CommonUtil.PROCESS_READ.equals(forwardPath)) {
        if (CommonUtil.STATUS_APPROVED.equals(misApply.getStatus())
                ||CommonUtil.STATUS_UNAPPROVED.equals(misApply.getStatus())) {
            request.setAttribute("cancelflag", "false");
        } else {
            request.setAttribute("cancelflag", "true");
        }
    }
-->
<div class="fixed-btns wpc-fixed-bts clearfix">
        <a href="javascript:;" onclick="window.close();" class="close-page">
            <em></em>
            <p>退出</p>
        </a>
        <a href="javascript:;" onclick="javascript:trace_form();return false;" class="flow-btn">
            <em></em>
            <p>流程跟踪</p>
        </a>
        <#if forwardPath != 'read'>
        <a href="javascript:;" onclick="javascript:submit_approve();return false;" class="agree-btn">
            <em></em>
            <p>提交</p>
        </a>
        </#if>
    </div>
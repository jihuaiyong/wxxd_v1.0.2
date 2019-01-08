<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content=""/>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>NPMS</title>
    <link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="${request.contextPath}/libs/font-uxcool/font-uxcool.css">
    <link rel="stylesheet" href="${request.contextPath}/css/portal.css">
    <link rel="stylesheet" href="${request.contextPath}/css/index.css">
    <link rel="stylesheet" href="${request.contextPath}/css/date/daterangepicker.css">
    <link rel="stylesheet" href="${request.contextPath}/libs/bootstrap-select/bootstrap-select.css">
    <link rel="stylesheet" href="${request.contextPath}/libs/bootstrapvalidator/dist/css/bootstrapValidator.css">
    <link rel="stylesheet" href="${request.contextPath}/css/common.css">
    <link rel="stylesheet" href="${request.contextPath}/layer/skin/layer.css"/>
</head>
<style type="text/css">
    #myTab li {
        width: 50%;
        float: left;
        height: 40px;
        list-style: none;
        margin: 0;
        padding: 0;
    }

    #myTab li img {
        float: left;
        height: 40px;
    }

    #myTab li p {
        color: white;
        text-align: center;
        position: relative;
        display: block;
        padding: 10px 15px;
        font-size: 14px;
    }

    .blue {
        background: #0f9af2;
    }

    .gray {
        background: #dfdfdf;
    }

    .tabPaneUl {
        width: 700px;
        margin: 0 auto;
        list-style: none;
    }

    .tabPaneUl li {
        height: 40px;
        line-height: 40px;
    }

    .tab-pane {
        margin-top: 50px;
    }

    .uptitle {
        font-size: 14px;
        font-weight: bold;
        /* margin-bottom: 15px; */
        background-color: #bef0fa;
        padding: 5px
    }

    .buttonaddN {
        padding: 6px 18px;
        margin-bottom: 30px;
        font-size: 14px;
        font-weight: 400;
        -ms-touch-action: manipulation;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 2px;
        color: #fff;
        background-color: #2D86E1;
        float: right;
        margin-right: 10px;
    }
</style>
<body id="condition">

<div id="wrap">
    <section class="config">
        <div class="row" style="margin-bottom:-17px">
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon"><font color="red">*</font>&nbsp;流&nbsp;&nbsp;程&nbsp;&nbsp;ID：</span>
                    <input id="approvalNum" type="text" class="form-control"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">商&nbsp;品&nbsp;编&nbsp;码：</span>
                    <input id="cmmdtyCode" type="text" class="form-control" onblur="appendCmmdtyCodeUtilByNoParams();"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>
            
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">&nbsp;&nbsp;价格文件号：</span>
                    <input id="fileNum" type="text" class="form-control"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>
        </div>
        <br>
        <div class="row" style="margin-bottom:-17px">
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">供应商编码：</span>
                    <input id="supplier" type="text" class="form-control" onblur="appendSupplierUtilByNoParams();"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>  
            
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">样机序列号：</span>
                    <input id="protoNum" type="text" class="form-control"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>        
        
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">&nbsp;地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>
                    <input id="plantCode" type="text" class="form-control"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>        
        </div>
        <br>
		<div class="row" style="margin-bottom:-10px">
            <div class="col-md-3">
                <div class="input-group" style="margin-bottom:10px;">
                    <span class="input-group-addon">采&nbsp;购&nbsp;组&nbsp;织：</span>
                    <input id="purcOrg" type="text" class="form-control"
                           style="width:170px;margin-right:10px;">
                </div>
            </div>
		
             	<div class="col-md-1"></div>
	            <button style="margin-left:7px;padding: 6px 13px;" class="buttonsearch11" id="query"
	                    onclick="getAuthByPage(0)"><span><img src="../images/search1.png"></span>&nbsp;查询</button>
	           <#if userRoleName?? && userRoleName =='超级管理员'>
	            <button style="margin-left:7px;padding: 6px 13px;" class="buttonsearch11" id="query"
	                    onclick="rePush(0)"><span><img src="../images/ok.png"></span>&nbsp;推送生效表</button> 
	            
	            <button style="margin-left:7px;padding: 6px 13px;" class="buttonsearch11" id="query"
	                    onclick="rePush(2)"><span><img src="../images/ok.png"></span>&nbsp;推送PMS</button>
	            
	        	<button style="margin-left:7px;padding: 6px 13px;" class="buttonsearch11" id="query"
	                    onclick="rePush(1)"><span><img src="../images/ok.png"></span>&nbsp;推送R3</button>
               </#if>  
		</div>
    </section>
    <section class="result">
        <div class="tableBox table-responsive">
            <table class="zg-table zg-table-striped">
                <thead>
                <tr class="text-nowrap">
					<th nowrap="nowrap" style="width:20px">&nbsp;&nbsp;<input type="checkbox" name="checkAll" onclick="checkAll(this);" />&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;序号&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;价格文件号&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;商品编码&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;采购组织&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;事业部&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;供应商&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;计量单位&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;订单类型&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;经代销&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;地点&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;开始日期 &nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;结束日期&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;价格&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;货币类型&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;公文号&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;审批状态&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;审批时间&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;创建人&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;备注&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;当前供价&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;规则折扣&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;不规则折扣&nbsp;&nbsp;</th> 
					<th nowrap="nowrap">&nbsp;&nbsp;固定费率&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;生效后底价&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;最近历史折扣&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;最近历史供价&nbsp;&nbsp;</th> 
					<th nowrap="nowrap">&nbsp;&nbsp;价差&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;样机序列号&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;写生效表状态&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;隔天生效&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;库补标志&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;系统名称&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;生效时间&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;创建时间&nbsp;&nbsp;</th>
					<th nowrap="nowrap">&nbsp;&nbsp;更新时间&nbsp;&nbsp;</th>
                </tr>
                </thead>
                <tbody id="authList">
                	<tr><td COLSPAN="37">没有符合的记录, 请尝试其他搜索条件!</td></tr>
                </tbody>
            </table>
        </div>
        <div class="info clearfix">
            <div class="page">
				<span>共<span id="authTotalCount">0</span>条，每页显示10条
				</span>
                <ul class="paginationH" id="authListPage">
                    <li><a href="javascript:void(0);" style="cursor:pointer;">上一页</a></li>
                    <li class="active"><a href="javascript:;">1</a></li>
                    <li><a href="javascript:void(0);" style="cursor:pointer;">下一页</a></li>
                </ul>
                <span>共<span id="authTotalPage">0</span>页，到第
			</span>
                <div class="inp-jump">
                    <input type="text" class="formH-control" id="jumpPage">
                </div>
                页
                <a href="javascript:jumpPageWithPageSize();" class="btnH btnH-default">确定</a>
            </div>
        </div>
    </section>
</div>

<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
<script src="${request.contextPath}/js/common/pagination.js"></script>
<script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
<script src="${request.contextPath}/js/common/common.js"></script>
<script src="${request.contextPath}/js/common/pageFenYe.js"></script>
<script type="text/javascript" src="${request.contextPath}/staticfile/js/draggable.js"></script>
<script type="text/javascript" src="${request.contextPath}/layer/layer.js"></script>
<script src="${request.contextPath}/staticfile/js/My97DatePicker/WdatePicker.js" type="text/javascript"></script>
<script src="${request.contextPath}/js/logQuery/supplyPriceLogQuery.js" type="text/javascript"></script>
<script type="text/javascript">
    var ctx = '${request.contextPath}';
    var user = ${Session.userInfoMapJson};
    var userview = user.userName;
    jQuery(function () {
        //getAuthByPage(pageNumber);
        draggable($(".modal-header"));
    });
</script>
</body>
</html>
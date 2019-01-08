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
    .WdateBackPic{
        background: #fff url(${request.contextPath}/staticfile/js/My97DatePicker/skin/datePicker.gif) no-repeat right;
    }
</style>
<body id="condition">

<div id="wrap">
    <section class="config">
        <div class="row">
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon"><font color="red">*</font>样机序列号：</span>
                    <input id="protoNum" type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">查询日期：</span>
                    <input type="text" class="form-control WdateBackPic"
                           onClick="WdatePicker({dateFmt:'yyyy-MM-dd'})" id="startTime"
                           name="startTime"/>
                </div>
            </div>
            <div class="col-md-6">
                <button style="float:left;" class="buttonsearch11" id="query"
                        onclick="getAuthByPage(0)">
                    <span><img src="../images/search1.png"></span>&nbsp;&nbsp;查询
                </button>
                <button style="float:left;margin-left: 20px" class="buttonsearch11" id="repush"
                        onclick="rePush()">
                    <span><img src="../images/ok.png"></span>&nbsp;&nbsp;推送
                </button>

            </div>
        </div>
        <br>
    </section>
    <section class="result">
        <div class="tableBox">
            <table class="zg-table zg-table-striped">
                <thead>
                <tr>
                    <th style="width:50px"><input type="checkbox" name="selectAll" onclick="selectAll(this);"/></th>
                    <th>序号</th>
                    <th>样机序列号</th>
                    <th>流程ID</th>
                    <th>价格文件号</th>
                    <th>供价</th>
                    <th>货币类型</th>
                    <th>开始日期</th>
                    <th>结束日期</th>
                    <th>生效时间</th>
                    <th>创建时间</th>
                    <th>更新时间</th>
                </tr>
                </thead>
                <tbody id="authList">
                </tbody>
            </table>
        </div>
        <div class="info clearfix">
            <div class="page">
					<span>共<span id="authTotalCount">0</span>条，每页显示10条
					</span>
                <ul class="paginationH" id="authListPage">
                    <li><a href="javascript:void(0);" style="cursor:pointer;">上一页</a></li>
                    <li class="active"><a href="javascript:;"></a></li>
                    <li><a href="javascript:void(0);" style="cursor:pointer;">下一页</a></li>
                </ul>
                <span>共<span id="authTotalPage">0</span>页，到第
					</span>
                <div class="inp-jump">
                    <input type="text" class="formH-control">
                </div>
                页
                <a href="javascript:jumpPage();" class="btnH btnH-default">确定</a>
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
<script src="${request.contextPath}/js/npms/cSupplyPrice.js" type="text/javascript"></script>
<script type="text/javascript">
    var ctx = '${request.contextPath}';
    var user = ${Session.userInfoMapJson};
    var userRoleName = user.userRoleName;
    if(userRoleName != "超级管理员"){
        $("#repush").hide();
    }
</script>
</body>
</html>
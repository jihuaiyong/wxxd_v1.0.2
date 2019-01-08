<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
</head>
<body id="condition">

<div id="wrap" style="height: 660px">

    <section class="config">
        <div class="row">
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">采购组织：</span>
                    <input id="orgCode" type="text"  class="form-control" style="width:180px;margin-right:10px;">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group" style="margin-left: 40px">
                    <span class="input-group-addon" style="border-right: 0">事业部：</span>
                    <input id="busCode" type="text"  class="form-control" style="width:180px;margin-right:10px;">
                </div>
            </div>
            <div class="col-md-3">
                <button href="javascript:;" style="margin-left: 40px" class="buttonsearch11"
                        onclick="getAuthByPage(0);"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>
            </div>
            <div class="col-md-3">
                <button style="float:right;margin-left:10px;" class="buttondelete11"
                        onclick="deleteBatch()"><span><img
                        src="../images/edit_remove.png"></span>&nbsp;&nbsp;删除
                </button>
                <button href="javascript:;" style="margin: 0px" class="buttonadd11" onclick="add()"><span><img
                        src="../images/edit_add.png">&nbsp;&nbsp;新增</button>
            </div>
        </div>
    </section>

    <section class="result">
        <div class="tableBox">
            <table class="zg-table zg-table-striped">
                <thead>
                <tr>
                    <th><input type="checkbox" name="checkAll" onclick="checkAll(this);" /></th>
                    <th>序号</th>
                    <th>采购组织</th>
                    <th>事业部</th>
                    <th>价差比率%</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>修改人</th>
                    <th>修改时间</th>
                    <th>状态</th>
                    <th>操作</th>
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
                    <li><a href="javascript:void(0);"  style="cursor:pointer;">上一页</a></li>
                    <li class="active"><a href="javascript:;"></a></li>
                    <li><a href="javascript:void(0);"  style="cursor:pointer;">下一页</a></li>
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
        <form id="fileUploadForm" name="fileUploadForm" enctype="multipart/form-data" action="${request.contextPath}/PriceDiffConfigC/fileUpload.action" method="post">
            <div class="case-top-btn l">

                <a href="javascript:;" class="file">
                    <input style="height:28px;"  value="${RequestParameters.filePath!}" type="file" name="file" id="file" onchange="checkFileType()"/><span id="fupload">请点击这里上传文件</span>
                </a>
                <font style='color:blue;'><span id="fupload"></span></font>
                <a class="a-upload on1 mlmr0" href="##" onclick="javascript:fileUpload();"><span>批量导入</span></a>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div class="wenjiuan-area" style="padding: 0px;"><i><a href="##" onclick = javascript:downloadModel();>上传模板下载</a></i></div>
                <#if result ??>
                    <div id="result" name="result" style="margin-bottom:60px;">导入的记录：<font style="color:red">${result!''}<br/></font></div>
                </#if>
        </form>
    </section>
</div>


<div class="modal fade in" style="z-index:9999;overflow:scroll;" id="addDialog">

    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img src="../images/delete.png"></span><span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="titleinit">新增差价比率配置</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="currentEditId" value="">
                <div style="margin: 20px 0;" class="zg-group">
                    <label>采购组织：</label>
                    <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                        <input  type="text" class="form-control" name="org_code" ime-mode:disabled"  id="org_code" onchange="restSpan()">
                    </div>
                    <font style='color:red;'><span id="orgCodeSpan" class="tipTxt"></span></nobr></font>
                </div>

                <div style="margin: 20px 0;" class="zg-group">
                    <label>&nbsp;事&nbsp;业&nbsp;部&nbsp;：</label>
                    <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                        <input  type="text" class="form-control" name="bus_code" ime-mode:disabled"  id="bus_code" onchange="restSpan()">
                    </div>
                    <font style='color:red;'><span id="busCodeSpan" class="tipTxt"></span></nobr></font>
                </div>

                <div style="margin: 20px 0;" class="zg-group">
                    <label>价差比率：</label>
                    <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                        <input  type="text" class="form-control" name="diff_ratio" ime-mode:disabled"  id="diff_ratio" onkeyup="clearNoNum(this)" onchange="restSpan()">
                    </div>
                    <div id="percent" style="display:inline-block">%</div>
                    <font style='color:red;'><span id="diffRatioSpan" class="tipTxt"></span></nobr></font>
                </div>

                <div style="margin: 20px 0;" class="zg-group">
                    <label>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label>
                    <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                        <select name="deleteFlag" id="deleteFlag" class="form-control" style="width:360px;">
                            <option value="N">有效</option>
                            <option value="Y">无效</option>
                        </select>
                    </div>
                </div>
                <div class="text-center">
                    <font style='color:red;'><span id="tipSpan" class="tipTxt"></span></nobr></font>
                </div>
                <div class="modal-footer">
                    <div class="text-right">
                        <button class="btn btn-primary" onclick="commit()" id="submit"> 确 定</button>
                        <button class="btn btn-primary reverse" id="close" onclick="closed()"> 取 消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
<script src="${request.contextPath}/js/common/pagination.js"></script>
<script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
<script src="${request.contextPath}/js/common/common.js"></script>
<script src="${request.contextPath}/js/npms/priceDiffConfigC.js"></script>


</body>
</html>
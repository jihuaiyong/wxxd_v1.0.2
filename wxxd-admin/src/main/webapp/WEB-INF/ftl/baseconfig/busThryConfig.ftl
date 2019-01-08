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
</head>
<body id="condition">
<div id="wrap" style="height:660px">
    <section class="config">
        <div class="row">
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">事业部/采购组织：</span>
                    <input id="busCode" name="busCode" type="text" onblur="" class="form-control"
                           value="${RequestParameters.busCode!''}" style="width:120px;">
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group"  style="margin-left: 40px">
                    <span class="input-group-addon" id="basic-addon1">业态：</span>
                    <select name="thry" id="thry" class="form-control"
                            style="width:120px;">
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="input-group">
                    <span class="input-group-addon">业态类型：</span>
                        <select name="thryType" id="thryType" class="form-control"
                                style="width:120px;">
                            <option value="">--请选择--</option>
                            <option value="1">品类</option>
                            <option value="2">公司</option>
                        </select>
                </div>
            </div>

            <div class="col-md-3">
                <div class="input-group">
                    <button href="javascript:;" style="float:left;margin-left:-60px;" class="buttonsearch11"
                            onclick="getAuthByPage(0);"><span><img src="../images/search1.png">&nbsp;&nbsp;查询</button>
                    <button  class="buttondelete11"
                            onclick="deleteBatch()"><span><img
                            src="../images/edit_remove.png"></span>&nbsp;&nbsp;删除
                    </button>
                    <button href="javascript:;" style="margin-left: 36px"  class="buttonadd11" onclick="add()"><span><img
                            src="../images/edit_add.png">&nbsp;&nbsp;新增</button>
                </div>
            </div>

        </div>
    </section>
    <section class="result">
        <div class="tableBox">
            <table class="zg-table zg-table-striped">
                <thead>
                <tr>
                    <th style="width:30px;"><input type="checkbox" name="checkAll" onclick="checkAll(this);"/></th>
                    <th>序号</th>
                    <th>事业部/采购组织</th>
                    <th>业态</th>
                    <th>业态类型</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>修改人</th>
                    <th>修改时间</th>
                    <th>状态</th>
                    <th style="width:70px;" name="operate">操作</th>
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
        <div class="modal fade in" style="z-index:9999;overflow:scroll;" id="addDialog">
            <div class="modal-dialog">
                <div class="modal-content" style="width: 630px">
                    <div class="modal-header">
                        <button type="button" id="closeBatchDialogBtn" class="close" onclick="closed()"><span><img
                                src="../images/delete.png"></span><span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title" id="titleinit">新增品类业态配置</h4>
                    </div>
                    <div class="modal-body">
                        <div style="margin: 20px 0;" class="zg-group">
                            <label>事业部/采购组织：</label>
                            <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                                <input type="text" class="form-control" name="busCodeNEW" ime-mode:disabled"
                                id="busCodeNEW" onchange="restSpan()">
                                <input type="hidden" class="form-control" name="currentEditId" ime-mode:disabled"
                                id="currentEditId">
                            </div>
                            <font style='color:red;'><span id="busCodeSpan" class="tipTxt"></span></nobr></font>
                        </div>

                        <div style="margin: 20px 0;" class="zg-group">
                            <label>业&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label>
                            <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                                <select type="input" name="thryNEW" id="thryNEW" class="form-control"
                                        style="width:360px;">
                                </select>
                            </div>
                            <font style='color:red;'><span id="thrySpan" class="tipTxt"></span></nobr></font>
                        </div>

                        <div style="margin: 20px 0;" class="zg-group">
                            <label>业&nbsp;&nbsp;&nbsp;&nbsp;态&nbsp;&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;型：</label>
                            <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                                <select name="thryTypeNEW" id="thryTypeNEW" class="form-control" style="width:360px;" type="input">
                                    <option value="">--请选择--</option>
                                    <option value="1">品类</option>
                                    <option value="2">公司</option>
                                </select>
                            </div>
                            <font style='color:red;'><span id="thryTypeSpan" class="tipTxt"></span></nobr></font>
                        </div>

                        <div style="margin: 20px 0;" class="zg-group">
                            <label>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label>
                            <div style="display:inline-block;margin-left: 15px;" class="inpBox">
                                <select name="deleteFlagNEW" id="deleteFlagNEW" class="form-control" style="width:360px;">
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
    </section>
</div>
<script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
<script src="${request.contextPath}/js/common/pagination.js"></script>
<script src="${request.contextPath}/libs/bootstrap-select/bootstrap-select.min.js"></script>
<script src="${request.contextPath}/js/qryauthority/boot.js"></script>
<script src="${request.contextPath}/js/common/common.js"></script>
<script src="${request.contextPath}/js/npms/busThryConfig.js"></script>
</body>
</html>
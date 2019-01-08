$(document).ready(function () {
    initDate();
    initTabWithBlankUtil(18);
});

var distSellMap = {
    "0": "经销",
    "2": "代销"
}
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;


/**
 * tab初始化空白
 *
 * */
function initTabWithBlankUtil(colspan) {
    var tabHTML = "";
    tabHTML += '<tr> <td COLSPAN="' + colspan + '">请输入搜索条件进行查询!</td></tr>';
    $("#authList").html("");
    $("#authList").html(tabHTML);
    // 先清空
    $("#authListPage").empty();
    // 记录总数
    $('#authTotalCount').html(0);
    // 页数信息
    $('#authTotalPage').html(Math.ceil(0 / pageSize));
    totalPage = Math.ceil(0 / pageSize);
    $("#authListPage").pagination(0, {
        callback: getAuthByPageCallBack,
        prev_text: ' 上一页',
        next_text: '下一页 ',
        items_per_page: pageSize,
        num_display_entries: 5,
        num_edge_entries: 3,
        current_page: pageNumber
    });
}

function getAuthByPage(pageNumber) {
    var queryParams = {};
    queryParams.page = pageNumber + 1;
    queryParams.pageSize = pageSize;
    if (checkQueryParam(queryParams)) {
        $.ajax({
            url: 'queryList.action',
            type: "post",
            data: queryParams,
            success: function (lineData) {
                // 返回数据存在
                var tabHTML = "";
                if (lineData && lineData.total) {
                    var len = lineData.rows.length;
                    for (var i = 0; i < len; i++) {
                        var tempData = lineData.rows[i];
                        tabHTML += '<tr>';
                        tabHTML += '<input type="hidden" name="cmmdtyCodeHidden"  value="' + nullToEmpty(tempData.cmmdtyCode) + '"/>';
                        tabHTML += '<td>' + '<input type="checkbox" name="ID" id="' + tempData.id + '"  value="' + tempData.id + '" autocomplete="off"/>' + '</td>';
                        tabHTML += '<td>' + (i + 1) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.supplier) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.approvalNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.fileNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.orderType) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(distSellMap[tempData.distSell]) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.plantCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.price) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.currency) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.ruleDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.startTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.endTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.effectTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.createTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.updateTime) + '</td>';
                        tabHTML += '</tr>';
                    }
                    $("#authList").html("");
                    $("#authList").html(tabHTML);
                    $("#authListPage").show();
                } else {
                    tabHTML += '<tr> <td COLSPAN="18">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
                    $("#authList").html("");
                    $("#authList").html(tabHTML);
                }
                // 先清空
                $("#authListPage").empty();
                // 记录总数
                $('#authTotalCount').html(lineData.total);
                // 页数信息
                $('#authTotalPage').html(Math.ceil(lineData.total / pageSize));
                totalPage = Math.ceil(lineData.total / pageSize);
                $("#authListPage").pagination(lineData.total, {
                    callback: getAuthByPageCallBack,
                    prev_text: ' 上一页',
                    next_text: '下一页 ',
                    items_per_page: pageSize,
                    num_display_entries: 5,
                    num_edge_entries: 3,
                    current_page: pageNumber
                });
            },
            error: function () {
                npmsAlert("系统异常!");
            }
        });
    }
}

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index, pageSize);
};

/**
 * 页数跳转
 * @returns
 */
function jumpPageWithPageSize() {
    // 获取
    var page = $('#jumpPage').val();

    if (page == '' || page == null) {
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请输入跳转页数'
        });
        return undefined;
    } else if (isNaN(page) || ((page + '').indexOf('.') > -1)) {
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请输入有效页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    } else if (page <= 0) {
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请输入大于0的页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    } else {
        // 判断
        if (page > totalPage) {
            bootbox.alert({
                buttons: {
                    ok: {
                        label: '确定',
                        className: 'btn-sm btn-primary'
                    }
                },
                message: '输入的页数已经超出当前查询总页数！'
            });
            return undefined;
        }
        var pageNum = page - 1;
        getAuthByPage(pageNum, pageSize);
    }
};

//批量删除
function rePush() {
    var selectedCheckBoxes = $("input[type=checkbox][name=ID]:checked");
    if (selectedCheckBoxes.length <= 0) {
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请选择要推送的数据!'
        });
        return;
    }

    bootbox
        .confirm({
            buttons: {
                confirm: {
                    label: '确认',
                    className: 'btn-sm btn-primary'
                },
                cancel: {
                    label: '取消',
                    className: 'btn-default'
                }
            },

            message: "您确定要推送选择的数据？",
            callback: function (result) {
                if (result) {
                    var ids = '';
                    var cmmdtyCodeHiddens = $("input[name='cmmdtyCodeHidden']");
                    var cmmdtyCode = '';
                    if (cmmdtyCodeHiddens.length > 0) {
                        cmmdtyCode = cmmdtyCodeHiddens[0].value;
                    }

                    for (var i = 0; i < selectedCheckBoxes.length; i++) {
                        if (ids == '') {
                            ids = selectedCheckBoxes[i].value;
                        } else {
                            ids += ',' + selectedCheckBoxes[i].value;
                        }
                    }
                    var params = {
                        'ids': ids,
                        'cmmdtyCode': cmmdtyCode
                    };

                    $.ajax({
                        type: "POST",
                        url: ctx + "/supplyPrice/rePushByBatch.action",
                        data: params
                    });
                    npmsAlert('推送成功！');
                }

            }
        });
}

function checkQueryParam(queryParams) {
    var cmmdtyCode = $("#cmmdtyCode").val();
    if (cmmdtyCode == "") {
        npmsAlert('商品编码不能为空!');
        return false;
    }
    var numRegx = /^\d*$/;
    if (!numRegx.test(cmmdtyCode)) {
        npmsAlert('商品编码只能是数字!');
        return false;
    }
    if (cmmdtyCode.length > 18) {
        npmsAlert('商品编码不能超过18位!');
        return false;
    }
    //自动补齐商品编码
    $("#cmmdtyCode").val(appendCmmdtyCodeUtil(cmmdtyCode));

    var startTime = $("#startTime").val();
    var supplier = $("#supplier").val();
    if (supplier.length > 0) {
        if (!numRegx.test(supplier)) {
            npmsAlert('供应商只能是数字!');
            return false;
        }
        if (supplier.length > 10) {
            npmsAlert('供应商不能超过10位!');
            return false;
        }
    }
    //自动补齐供应商
    $("#supplier").val(appendSupplierCodeUtil(supplier));

    queryParams.cmmdtyCode = $("#cmmdtyCode").val();
    queryParams.startTime = startTime;
    queryParams.supplier = $("#supplier").val();
    queryParams.purcOrg = $("#purcOrg").val();
    queryParams.plantCode = $("#plantCode").val();
    queryParams.orderType = $("#orderType").val();
    queryParams.distSell = $("#distSell").val();
    return true;
}

function compareDate(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))) >= (new Date(d2.replace(/-/g, "\/"))));
}

//获取两个日期之间的差值
function DateDifference(d1, d2) {
    return ((new Date(d1.replace(/-/g, "\/"))).getTime() - (new Date(d2.replace(/-/g, "\/"))).getTime());
}

//全选
function selectAll(obj) {
    $("input[type=checkbox][name=ID]").prop("checked", obj.checked);
}

function initDate() {
    var currentTime = new Date();
    $("#startTime").val(formatTimeWithPattern(currentTime, "yyyy-MM-dd"));
}
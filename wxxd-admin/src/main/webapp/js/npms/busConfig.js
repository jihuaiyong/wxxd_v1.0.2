/**
 * 页面加载后初始化数据调用的js
 */
$(document).ready(function () {
    getAuthByPage(pageNumber);
});

var initData;

function initDiv() {
    $("#bus_code").val("");
    $("#bus_remarks").val("");
};

//页面信息
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;

// 查询参数设置
function getQueryParams(pageNumber) {
    var busCodeId = $("#busCode").val();
    var queryParams = {
        'busCode': busCodeId,
        'pageSize': pageSize,
        'page': pageNumber + 1
    };
    return queryParams;
};

function checkAll(obj) {
    $("input[type=checkbox][name=id]").prop("checked", obj.checked);
}

function getAuthByPage(pageNumber) {
    var queryParams = getQueryParams(pageNumber);
    $.ajax({
        url: 'showBusConfigData.action',
        type: "post",
        data: eval(queryParams),
        success: function (lineData, status) {
            // 返回数据存在
            var tabHTML = "";
            if (lineData && lineData.total) {
                var len = lineData.rows.length;
                for (var i = 0; i < len; i++) {
                    var tempData = lineData.rows[i];
                    tabHTML += '<tr>';
                    tabHTML += '<td><input type="checkbox" name="id" id="id"  value="' + tempData.id + '"/>';
                    tabHTML += '<td>' + (i + 1) + '</td>';
                    tabHTML += '<td>' + tempData.busCode + '</td>';
                    tabHTML += '<td>' + tempData.busRemarks + '</td>';
                    tabHTML += '<td>' + tempData.createUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.createTime) + '</td>';
                    tabHTML += '<td>' + tempData.updateUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.updateTime) + '</td>';
                    if (tempData.deleteFlag == 'N') {
                        tabHTML += '<td>' + '有效' + '</td>';
                    }
                    else {
                        tabHTML += '<td>' + '无效' + '</td>';
                    }
                    tabHTML += '<td>' + "<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
                        + '</td>';
                    tabHTML += '</tr>';
                }
                $("#authList").html("");
                $("#authList").html(tabHTML);
                $("#authListPage").show();
            } else {
                tabHTML += '<tr> <td COLSPAN="14">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
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
            })
        }
    });
}

//新增
function add() {
    $("#titleinit").html("新增事业部");
    initDiv();
    initData = 0;
    restSpan();
    $("#bus_code").removeAttr("disabled");
    $("#addDialog").show();
};

//清空提示语
function restSpan() {
    $("#busCodeSpan").empty();
    $("#busRemarksSpan").empty();
    $("#tipSpan").empty();
};

//判空
function checkParams() {
    var checkFlag = false;
    var busCodeFlag = false;
    var busRemarksFlag = false;
    var repeatCheckFlag = true;
    var busCode = $("#bus_code").val().trim();
    restSpan();
    if (busCode == null || busCode == '') {
        $("#busCodeSpan").append('<i class="hongse">不能为空!</i>');
    } else if (busCode.length > 5) {
        $("#busCodeSpan").append('<i class="hongse">长度不能超过4!</i>');
    } else {
        $("#busCodeSpan").append('<em class="tipOK4"></em>');
        busCodeFlag = true;
    }

    var busRemarks = $("#bus_remarks").val().trim();
    $("bus_remarks").val(busRemarks);
    if (busRemarks == null || busRemarks == '') {
        $("#busRemarksSpan").append('<i class="hongse">不能为空!</i>');
    } else if (busRemarks.length > 20) {
        $("#busRemarksSpan").append('<i class="hongse">长度不能超过20!</i>');
    } else {
        $("#busRemarksSpan").append('<em class="tipOK4"></em>');
        busRemarksFlag = true;
    }
    if (initData == 0) {
        repeatCheckFlag = checkRepeat(busCode, busRemarks);
    }
    checkFlag = busCodeFlag && busRemarksFlag && repeatCheckFlag;
    return checkFlag;
}

function checkRepeat(busCode, busRemarks) {
    var repeatCheckFlag = true;
    $.ajax({
        type: "POST",
        url: "querybusIsequals.action",
        data: {'busCode': busCode, 'busRemarks': busRemarks},
        async: false,
        success: function (flag) {
            if (flag > 0) {
                repeatCheckFlag = false;
                $("#tipSpan").append('<i class="hongse">已存在的记录!</i>');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            repeatCheckFlag = false;
            npmsAlert(errorThrown);
        }
    });
    return repeatCheckFlag;
}

function closed() {
    $("#addDialog").hide();
};

function commit() {
    restSpan();
    var intcode = $("#bus_code").val().trim();
    var bus_remarks = $("#bus_remarks").val().trim();
    var delete_flag = $("#deleteFlag").val();
    if (initData == 0) {
        if (checkParams()) {
            $.ajax({
                type: "POST",
                url: "addBusConfig.action",
                data: {'busCode': intcode, 'busRemarks': bus_remarks, 'deleteFlag': delete_flag},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (flag) {
                    if (flag == '1') {
                        $("#addDialog").hide();
                        bootbox.alert({
                            buttons: {
                                ok: {
                                    label: '确定',
                                    className: 'btn-sm btn-primary'
                                }
                            },
                            message: '新增成功!'
                        });
                    }
                    getAuthByPage(0);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    npmsAlert('新增失败!');
                    $("#addDialog").hide();
                }
            });
        }
    }
    else if (initData == 1) {
        var currentEditId = $("#currentEditId").val();
        if (checkParams()) {
            $.ajax({
                type: "POST",
                url: "updateBusConfig.action",
                data: {
                    'busCode': intcode,
                    'busRemarks': bus_remarks,
                    'deleteFlag': delete_flag,
                    'id': currentEditId,
                    'oldbus_code': intcode,
                    'oldbusRemarks': bus_remarks,
                    'olddeleteFlag': delete_flag
                },
                success: function (flag) {
                    if (flag == '1') {
                        $("#addDialog").hide();
                        bootbox.alert({
                            buttons: {
                                ok: {
                                    label: '确定',
                                    className: 'btn-sm btn-primary'
                                }
                            },
                            message: '修改成功!'
                        });
                    }
                    getAuthByPage(0);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    npmsAlert('修改失败!');
                    $("#addDialog").hide();
                }
            });
        }
    }
};

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index);
};


//修改
function editDetail(obj) {
    $("#titleinit").html("修改事业部配置");
    initDiv();
    restSpan();
    var tr = $(obj).parent().parent();
    var tds = tr.find("td");
    $("#bus_code").val(tds[2].innerHTML).attr("disabled", "disabled");
    $("#bus_remarks").val(tds[3].innerHTML);
    initData = 1;
    $("#addDialog").show();
};

//删除
function deleteBatch() {
    var selectedCheckBoxes = $("input[type=checkbox][name=id]:checked");
    if (selectedCheckBoxes.length <= 0) {
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请选择要删除的数据!'
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

            message: "您确定要删除选择的数据？",
            callback: function (result) {
                if (result) {
                    var ids = '';
                    for (var i = 0; i < selectedCheckBoxes.length; i++) {
                        var tr = $(selectedCheckBoxes[i]).parent().parent();
                        var tds = tr.find("td");
                        if (ids == '') {
                            ids = selectedCheckBoxes[i].value;
                        } else {
                            ids += ',' + selectedCheckBoxes[i].value;
                        }
                    }
                    var params = {
                        'ids': ids
                    };
                    $.ajax({
                        url: 'deleteBusConfig.action',
                        type: "POST",
                        data: params,
                        success: function (result) {
                            if (result == '1') {
                                npmsAlert('删除成功!');
                            } else {
                                npmsAlert('删除失败!');
                            }
                            getAuthByPage(0, pageSize);
                        }
                    });

                }
            }
        });
}
$(document).ready(function () {
    initTabWithBlankUtil(23);
});


var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;

var statusMap = {
    "0":"推送中",
    "1":"成功",
    "2":"失败"
}
var distSellMap = {
    "0": "经销",
    "2": "代销"
}
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
                        tabHTML += '<td>' + (i + 1) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.systemName) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(statusMap[tempData.status]) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.cmmdtyCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.protoNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.supplier) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.purcOrg) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.orderType) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(distSellMap[tempData.distSell]) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.plantCode) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.curPrice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.currency) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.libraCompen) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.meterUnit) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.ruleDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.historyDiscount) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.historyPrice) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.fileNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.flowNum) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.startTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.endTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.effectTime) + '</td>';
                        tabHTML += '<td>' + nullToEmpty(tempData.updateTime) + '</td>';
                        tabHTML += '</tr>';
                    }
                    $("#authList").html("");
                    $("#authList").html(tabHTML);
                    $("#authListPage").show();
                } else {
                    tabHTML += '<tr> <td COLSPAN="23">没有符合的记录, 请尝试其他搜索条件!</td></tr>';
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
            error:function () {
                npmsAlert("系统异常!");
            }
        });
    }
}

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index,pageSize);
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
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入跳转页数'
        });
        return undefined;
    } else if (isNaN(page) || ((page + '').indexOf('.') > -1)) {
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入有效页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    }  else if (page<=0) {
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请输入大于0的页数'
        });
        $(parent).scrollTop(0);
        return undefined;
    }else {
        // 判断
        if (page > totalPage) {
            bootbox.alert({
                buttons : {
                    ok : {
                        label : '确定',
                        className : 'btn-sm btn-primary'
                    }
                },
                message : '输入的页数已经超出当前查询总页数！'
            });
            return undefined;
        }
        var pageNum = page - 1;
        getAuthByPage(pageNum,pageSize);
    }
};

function checkQueryParam(queryParams) {
    var fileNum = $("#fileNum").val();
    $("#tips").empty();
    if (fileNum == "") {
        npmsAlert("价格文件号不能为空!");
        return false;
    }
    if (fileNum.length > 20) {
        npmsAlert("价格文件号不能超过20位!");
        return false;
    }

    var status = $("#status").val();
    queryParams.fileNum = fileNum;
    queryParams.status = status;
    return true;
}

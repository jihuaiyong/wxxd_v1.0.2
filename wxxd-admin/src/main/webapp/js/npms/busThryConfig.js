/**
 * 页面加载后初始化数据调用的js
 */

jQuery(function () {
    initSelect();
    getAuthByPage(pageNumber);
});

var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;
var initData;

function checkAll(obj) {
    $("input[type=checkbox][name=id]").prop("checked", obj.checked);
}

// 查询参数设置
function getQueryParams(pageNumber) {
    var busCode = $("#busCode").val().trim();
    var thry = $("#thry").val();
    var thryType = $("#thryType").val();
    var queryParams = {
        'busCode': busCode,
        'thry': thry,
        'thryType': thryType,
        'pageSize': pageSize,
        'page': pageNumber+1
    };
    return queryParams;
};

var thryList;

/**
 * 新增时加载业态类型和业态
 */
function initSelect() {
    $("#thry").empty();
    $("#thryNEW").empty();
    $.ajax({
        type: "POST",
        url: "showThry.action",
        data: {},
        success: function (data) {
            thryList = data;
            $("#thry").append('<option value="">--请选择--</option>');
            $("#thryNEW").append('<option value="">--请选择--</option>');
            for (var i = 0; i < data.length; i++) {
                var optionStr = "<option value='"+data[i].thry+"'>"+data[i].thryVal+"</option>" ;
                $("#thry").append(optionStr);
                $("#thryNEW").append(optionStr);
            }
        }
    });
}

function getAuthByPageCallBack(pageNumber) {
    getAuthByPage(pageNumber);
};

function getAuthByPage(pageNumber) {
    $("input[type=checkbox][name=checkAll]").removeAttr("checked");
    var queryParams = getQueryParams(pageNumber);
    $.ajax({
        url: "busThryConfigQueryData.action",
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
                    tabHTML += '<td><input type="checkbox" name="id" id="' + tempData.id + '"  value="' + tempData.id + '"/></td>';
                    tabHTML += '<td>' + (i + 1) + '</td>';
                    tabHTML += '<td>' + tempData.busCode + '</td>';

                    var thry = '';
                    for(var j = 0;j < thryList.length;j++){
                        if(tempData.thry==thryList[j].thry){
                            thry = thryList[j].thryVal ;
                            break;
                        }
                    }
                    tabHTML += '<td>' + thry + '<input type="hidden" value="'+tempData.thry+'"></td>';

                    if (tempData.thryType == '1') {
                        tabHTML += '<td>' + '品类' + '<input name="thryType" type="hidden" value="'+tempData.thryType+'"></td>';
                    } else {
                        tabHTML += '<td>' + '公司' + '<input name="thryType" type="hidden" value="'+tempData.thryType+'"></td>';
                    }

                    tabHTML += '<td>' + tempData.createUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.createTime) + '</td>';
                    tabHTML += '<td>' + tempData.updateUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.updateTime) + '</td>';
                    if (tempData.deleteFlag == 'N') {
                        tabHTML += '<td><input type="hidden" name="deleteFlag" id="deleteFlag"  value="' + tempData.deleteFlag + '"/>' + '有效' + '</td>';
                    }
                    else {
                        tabHTML += '<td><input type="hidden" name="deleteFlag" id="deleteFlag"  value="' + tempData.deleteFlag + '"/>' + '无效' + '</td>';
                    }
                    tabHTML += '<td>' + "<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>";
                    $("[name='operate']")[0].hidden = false;
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
            });
        }
    });
}

//删除
function deleteBatch() {
    var selectedCheckBoxes = $("input[type=checkbox][name=id]:checked");
    if (selectedCheckBoxes.length <= 0) {
        npmsAlert('请选择要删除的数据!');
        return;
    }
    npmsConfirm("您确定要删除选择的数据？", function (result) {
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
                type: "POST",
                url: "deleteBusThryConfig.action",
                data: params,
                success: function (result) {
                    if (result == '1') {
                        npmsAlert('删除成功!');
                    } else {
                        npmsAlert('删除失败!');
                    }
                    getAuthByPage(0);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    npmsAlert(errorThrown);
                }
            });
        }
    });
}

//新增
function add() {
    restSpan();
    $("#titleinit").html("新增品类业态配置");
    initDiv();
    initData = 0;
    $("#addDialog").show();
};

//修改
function editDetail(obj) {
    $("#titleinit").html("修改品类业态配置");
    initDiv();
    var tr = $(obj).parent().parent();
    var tds = tr.find("td");
    $("#currentEditId").val(tr.find("input[type=checkbox][name=id]").val());
    $("#busCodeNEW").val(tds[2].innerHTML).attr("disabled", "disabled");
    // alert(tds.eq(3).find('input').val());
    $("#thryNEW").val(tds.eq(3).find('input').val()).attr("disabled", "disabled");
    $("#thryTypeNEW").val(tds.eq(4).find('input').val()).attr("disabled", "disabled");
    initData = 1;
    restSpan();
    $("#addDialog").show();
};

function commit() {
    var busCode = $("#busCodeNEW").val().trim();
    $("#busCodeNEW").val(busCode);
    var thry = $("#thryNEW").val();
    var thryType = $("#thryTypeNEW").val();
    var deleteFlag = $("#deleteFlagNEW").val();
    if (initData == 0) {
        if (checkParams()) {
            $.ajax({
                type: "POST",
                url: "addBusThryConfig.action",
                data: {'busCode': busCode, 'deleteFlag': deleteFlag, 'thry': thry, 'thryType': thryType},
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success: function (flag) {
                    if (flag == '1') {
                        $("#addDialog").hide();
                        npmsAlert('新增成功!');
                    } else {
                        $("#addDialog").hide();
                        npmsAlert('新增失败!');
                    }
                    getAuthByPage(0);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    npmsAlert(errorThrown);
                }
            });
        }
    }
    else if (initData == 1) {
        var currentEditId = $("#currentEditId").val();
        if (checkParams()) {
            $.ajax({
                type: "POST",
                url: "updateBusThryConfig.action",
                data: {'deleteFlag': deleteFlag, 'id': currentEditId},
                success: function (flag) {
                    if (flag == '1') {
                        $("#addDialog").hide();
                        npmsAlert('修改成功!');
                    } else {
                        $("#addDialog").hide();
                        npmsAlert('修改失败!');
                    }
                    getAuthByPage(0);
                }
            });
        }
    }
};

function closed() {
    $("#addDialog").hide();
};

//判空
function checkParams() {
    var checkFlag = false;
    var busCodeFlag = false;
    var thryFlag = false;
    var thryTypeFlag = false;
    var repeatCheckFlag = true;
    var busCode = $("#busCodeNEW").val().trim();
    $("#busCodeNEW").val(busCode);
    restSpan();
    if (busCode == null || busCode == '') {
        $("#busCodeSpan").append('<i class="hongse">不能为空!</i>');
    } else if (busCode.length > 5) {
        $("#busCodeSpan").append('<i class="hongse">长度不能超过5!</i>');
    } else {
        $("#busCodeSpan").append('<em class="tipOK4"></em>');
        busCodeFlag = true;
    }
    var thry = $("#thryNEW").val();
    if (thry == null || thry == '') {
        $("#thrySpan").append('<i class="hongse">不能为空!</i>');
    } else if (thry.length > 2) {
        $("#thrySpan").append('<i class="hongse">长度不能超过2!</i>');
    } else {
        $("#thrySpan").append('<em class="tipOK4"></em>');
        thryFlag = true;
    }
    var thryType = $("#thryTypeNEW").val();
    if (thryType == null || thryType == '') {
        $("#thryTypeSpan").append('<i class="hongse">不能为空!</i>');
    } else if (thryType.length > 4) {
        $("#thryTypeSpan").append('<i class="hongse">长度不能超过4!</i>');
    } else {
        $("#thryTypeSpan").append('<em class="tipOK4"></em>');
        thryTypeFlag = true;
    }
    if (initData == 0) {
        repeatCheckFlag = checkRepeat(busCode, thry, thryType);
    }
    checkFlag = busCodeFlag && thryFlag && thryTypeFlag && repeatCheckFlag;
    return checkFlag;
}

function checkRepeat(busCode, thry, thryType) {
    var repeatCheckFlag = true;
    $.ajax({
        type: "POST",
        url: "checkRepeat.action",
        data: {'busCode': busCode, 'thry': thry, 'thryType': thryType},
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

function initDiv() {
    $("#busCodeNEW").val("").removeAttr("disabled");
    $("#thryNEW").val("").removeAttr("disabled");
    $("#thryTypeNEW").val("").removeAttr("disabled");
};

//清空提示语
function restSpan() {
    $("#busCodeSpan").empty();
    $("#thrySpan").empty();
    $("#thryTypeSpan").empty();
    $("#tipSpan").empty();
};
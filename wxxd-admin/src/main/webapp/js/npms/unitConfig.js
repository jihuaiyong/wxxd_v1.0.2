/**
 * 页面加载后初始化数据调用的js
 */
$(document).ready(function() {
    getAuthByPage(pageNumber);
});

var initData;
function initDiv(){
    $("#lang_code").val("");
    $("#unit_code").val("");
    $("#unitRemarks").val("");
    $("#tipSpan").val("");
};

//页面信息
var pageSize = 10;
var pageNumber = 0;
//总页数
var totalPage;
var ctx = '${request.contextPath}';

// 查询参数设置
function getQueryParams(pageNumber) {
    var langCodeId = $("#langCode").val().trim();
    var unitCodeId = $("#unitCode").val().trim();
    var queryParams = {
        'langCode' : langCodeId,
        'unitCode' : unitCodeId,
        'pageSize' : pageSize,
        'page' : pageNumber+1
    };
    return queryParams;
};

function getAuthByPage(pageNumber) {
    $("input[type=checkbox][name=checkAll]").removeAttr("checked");
    var queryParams = getQueryParams(pageNumber);
    $.ajax({
        url : "unitConfigQueryData.action",
        type : "post",
        data : eval(queryParams),
        success : function(lineData, status) {
            // 返回数据存在
            var tabHTML = "";
            if (lineData && lineData.total) {
                var len = lineData.rows.length;
                for (var i = 0; i < len; i++) {
                    var tempData = lineData.rows[i];
                    tabHTML += '<tr>';
                    tabHTML += '<td><input type="checkbox" name="id" id="id"  value="' + tempData.id + '"/>';
                    tabHTML += '<td>' + (i + 1) + '</td>';
                    tabHTML += '<td>' + tempData.langCode + '</td>';
                    tabHTML += '<td>' + tempData.unitCode + '</td>';
                    tabHTML += '<td>' + tempData.unitRemarks + '</td>';
                    tabHTML += '<td>' + tempData.createUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.createTime)	+ '</td>';
                    tabHTML += '<td>' + tempData.updateUser + '</td>';
                    tabHTML += '<td>' + formatTime(tempData.updateTime)	+ '</td>';
                    if(tempData.deleteFlag=='N'){
                        tabHTML += '<td>' + '有效' + '</td>';
                    }
                    else{
                        tabHTML += '<td>' + '无效' + '</td>';
                    }
                    tabHTML += '<td>'+"<a class='edit11'  href='javascript:void(0);' onclick=\"editDetail(this)\"></a>"
                        +'</td>';
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
                callback : getAuthByPageCallBack,
                prev_text : ' 上一页',
                next_text : '下一页 ',
                items_per_page : pageSize,
                num_display_entries : 5,
                num_edge_entries : 3,
                current_page : pageNumber
            });
        }
    });
}

function checkAll(obj) {
    $("input[type=checkbox][name=id]").prop("checked", obj.checked);
}

//新增
function add(){
    $("#titleinit").html("新增单位描述");
    initDiv();
    initData=0;
    restSpan();
    $("#lang_code").removeAttr("disabled") ;
    $("#unit_code").removeAttr("disabled") ;
    $("#addDialog").show();
};


//删除
function deleteBatch(){
    var selectedCheckBoxes = $("input[type=checkbox][name=id]:checked");
    if(selectedCheckBoxes.length<=0){
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请选择要删除的数据!'
        });
        return;
    }
    bootbox
        .confirm({
            buttons : {
                confirm : {
                    label : '确认',
                    className : 'btn-sm btn-primary'
                },
                cancel : {
                    label : '取消',
                    className : 'btn-default'
                }
            },

            message : "您确定要删除选择的数据？",
            callback : function(result) {
                if (result) {
                    var ids = '' ;
                    for(var i = 0 ; i < selectedCheckBoxes.length;i++) {
                        var tr = $(selectedCheckBoxes[i]).parent().parent();
                        var tds = tr.find("td");
                        if(ids==''){
                            ids = selectedCheckBoxes[i].value ;
                        }else {
                            ids += ',' + selectedCheckBoxes[i].value ;
                        }
                    }
                    var params = {
                        'ids': ids
                    };
                    $.ajax({
                        url : 'deleteUnitConfig.action',
                        type : "POST",
                        data : params,
                        success : function(result) {
                            if (result == '1') {
                                npmsAlert('删除成功!');
                            } else  {
                                npmsAlert('删除失败!');
                            }
                            getAuthByPage(0,pageSize);
                        }
                    });

                }
            }
        });
}

//清空提示语
function restSpan(){
    $("#langCodeSpan").empty();
    $("#unitCodeSpan").empty();
    $("#unitRemarksSpan").empty();
    $("#tipSpan").empty();
};

//判空
function checkParams() {
    var checkFlag = false;
    var langCodeFlag = false;
    var unitCodeFlag = false;
    var unitRemarksFlag = false;
    var repeatCheckFlag = true;
    restSpan();
    var langCode = $("#lang_code").val().trim();
    if (langCode == null || langCode == '') {
        $("#langCodeSpan").append('<i class="hongse">不能为空!</i>');
    } else if (langCode.length > 3) {
        $("#langCodeSpan").append('<i class="hongse">长度不能超过3!</i>');
    } else {
        $("#langCodeSpan").append('<em class="tipOK4"></em>');
        langCodeFlag = true;
    }
    var unitCode = $("#unit_code").val().trim();
    if (unitCode == null || unitCode == '') {
        $("#unitCodeSpan").append('<i class="hongse">不能为空!</i>');
    } else if (unitCode.length > 3) {
        $("#unitCodeSpan").append('<i class="hongse">长度不能超过3!</i>');
    } else {
        $("#unitCodeSpan").append('<em class="tipOK4"></em>');
        unitCodeFlag = true;
    }
    var unitRemarks = $("#unitRemarks").val().trim();
    if (unitRemarks == null || unitRemarks == '') {
        $("#unitRemarksSpan").append('<i class="hongse">不能为空!</i>');
    } else if (unitRemarks.length > 30) {
        $("#unitRemarksSpan").append('<i class="hongse">长度不能超过30!</i>');
    } else {
        $("#unitRemarksSpan").append('<em class="tipOK4"></em>');
        unitRemarksFlag = true;
    }
    if (initData == 0) {
        repeatCheckFlag = checkRepeat(langCode, unitCode);
    }
    checkFlag = langCodeFlag && unitCodeFlag && unitRemarksFlag && repeatCheckFlag;
    return checkFlag;
}

function checkRepeat(langCode, unitCode) {
    var repeatCheckFlag = true;
    $.ajax({
        type:"POST",
        url:"checkUnitRepeat.action",
        data:{'langCode':langCode,'unitCode':unitCode},
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

function closed(){
    $("#addDialog").hide();
};

function commit(){
    restSpan();
    var bcode = $("#lang_code").val().trim();
    var ccode = $("#unit_code").val().trim();
    var unitRemarks = $("#unitRemarks").val().trim();
    var delete_flag = $("#deleteFlag").val();
    if(initData==0){
        if (checkParams()) {
            $.ajax({
                type:"POST",
                url:"addUnitConfig.action",
                data:{'langCode':bcode,'unitCode':ccode,'unitRemarks':unitRemarks,'deleteFlag':delete_flag},
                contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                success:function(flag){
                    if(flag == '1'){
                        $("#addDialog").hide();
                        bootbox.alert({
                            buttons : {
                                ok : {
                                    label : '确定',
                                    className : 'btn-sm btn-primary'
                                }
                            },
                            message : '新增成功!'
                        });
                    }
                    getAuthByPage(0);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    npmsAlert('新增失败!');
                    $("#addDialog").hide();
                }
            });
        }
    }
    else if(initData==1){
        var currentEditId = $("#currentEditId").val();
        if (checkParams()) {
        $.ajax({
            type:"POST",
            url:"updateUnitConfig.action",
            data:{'langCode':bcode,
                'unitCode':ccode,
                'unitRemarks':unitRemarks,
                'deleteFlag':delete_flag,
                'id':currentEditId,
                'oldbrandCode':bcode,
                'oldcategCode':ccode,
                'oldunitRemarks':unitRemarks,
                'olddeleteFlag':delete_flag
            },
            success:function(flag){
                if(flag == '1'){
                    $("#addDialog").hide();
                    bootbox.alert({
                        buttons : {
                            ok : {
                                label : '确定',
                                className : 'btn-sm btn-primary'
                            }
                        },
                        message : '修改成功!'
                    });
                }
                getAuthByPage(0);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                npmsAlert('修改失败!');
                $("#addDialog").hide();
            }
        });
    }}
};

// 回调
function getAuthByPageCallBack(index, jq) {
    getAuthByPage(index);
};


//修改
function editDetail(obj){
    $("#titleinit").html("修改单位描述配置");
    initDiv();
    var tr = $(obj).parent().parent();
    var tds = tr.find("td");
    $("#lang_code").val(tds[2].innerHTML).attr("disabled", "disabled");
    $("#unit_code").val(tds[3].innerHTML).attr("disabled", "disabled");
    $("#unitRemarks").val(tds[4].innerHTML);
    initData=1;
    restSpan();
    $("#addDialog").show();
};


function checkFileType(){
    var filePath=$("#file").val();
    var arr=filePath.split('\\');
    var fileName=arr[arr.length-1];
    $("#fupload").html(fileName);
    if(fileName==0){
        $("#fupload").html("");
        $("#fupload").html("请点击这里上传文件");
        return;
    }
    var index=filePath.lastIndexOf(".");
    var str=filePath.substring(index+1,filePath.length).toLowerCase();
    if(str!='xls'&&str!='xlsx'){
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请上传xls,xlsx格式文件！'
        });
        return;
    }
}

function downloadModel() {
    window.open('/npms-admin/modelFile/unitConfig.zip','下载上传模板',"");
}

//导入
function fileUpload(){
    var filePath=$("#file").val();
    var index=filePath.lastIndexOf(".");
    var str=filePath.substring(index+1,filePath.length).toLowerCase();
    if(str!='xls'&&str!='xlsx'){
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '请上传xls,xlsx格式文件！'
        });
        return;
    }
    var size = $("#file")[0].files[0].size;
    var limitSize = 1;
    if(size>limitSize*1024*1024){
        bootbox.alert({
            buttons: {
                ok: {
                    label: '确定',
                    className: 'btn-sm btn-primary'
                }
            },
            message: '请上传大小小于'+limitSize+'M的文件!'
        });
        return;
    }
    $("#fileUploadForm").submit();
    //清空表单
    jQuery("#fileUploadForm").get(0).reset();
}
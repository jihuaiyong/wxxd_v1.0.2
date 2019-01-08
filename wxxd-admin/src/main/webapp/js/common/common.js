/**
 * 页面加载后初始化数据调用的js
 */
jQuery(function () {
    $('.nav-list li').eq(1).addClass('active open').siblings().removeClass('active');
    $('.nav-list li').eq(1).children('.submenu').children().eq(0).addClass('active').siblings().removeClass('active');
});

npmsAlert = function (msg) {
    var html = '<div id="alertDialog" class="bootbox modal fade in" tabindex="-1" role="dialog" style="display: block;">'
        + '<div class="modal-dialog">'
        + '<div class="modal-content" style="top:110px">'
        + '<div class="modal-body">'
        + '<button type="button" class="bootbox-close-button close" onclick="closeAlert()" style="margin-top: -10px;">×</button>'
        + '<div class="bootbox-body">' + msg + '</div>'
        + '</div>'
        + '<div class="modal-footer">'
        + '<button onclick="closeAlert()" data-bb-handler="ok" type="button" class="btn btn-sm btn-primary">确定</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $("body").append(html);
}

function closeAlert() {
    $("#alertDialog").remove();
}

npmsConfirm = function (msg, callback) {
    bootbox.confirm({
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

        message: msg,
        callback: callback
    });
}

//格式化日期
function formatTime(value) {
    var dt = parseToDate(value);
    if (typeof(dt) == "undefined") {
        return "";
    }
    //alert(dt);
    return formatDate(dt, "yyyy-MM-dd hh:mm:ss");
};

function formatTimeWithPattern(value,pattern){
    var dt = parseToDate(value);
    if (typeof(dt) == "undefined") {
        return "";
    }
    //alert(dt);
    return formatDate(dt, pattern);
}

function parseToDate(value) {
    if (value == null || value == '' || typeof(value) == "undefined") {
        return undefined;
    }

    var dt;
    if (value instanceof Date) {
        dt = value;
    }
    else {
        if (!isNaN(value)) {
            dt = new Date(value);
        }
        else if (value.indexOf('/Date') > -1) {
            value = value.replace(/\/Date(−?\d+)\//, '$1');
            dt = new Date();
            dt.setTime(value);
        } else if (value.indexOf('/') > -1) {
            dt = new Date(Date.parse(value.replace(/-/g, '/')));
        } else {
            dt = new Date(value);
        }
    }
    return dt;
};

function formatDate(date, format) {
    var paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    }
    //指定格式字符
    var cfg = {
        yyyy: date.getFullYear() //年 : 4位
        , yy: date.getFullYear().toString().substring(2)//年 : 2位
        , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
        , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
        , d: date.getDate()   //日 : 如果1位的时候不补0
        , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
        , hh: paddNum(date.getHours())  //时 如果1位的时候补0
        , mm: paddNum(date.getMinutes()) //分:  如果1位的时候补0
        , ss: paddNum(date.getSeconds()) //秒: 如果1位的时候补0
        , i:  date.getMilliseconds() //毫秒
        , ii: paddNum(date.getMilliseconds()).substring(0,2) //保留毫秒前两位
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) {
        return cfg[m];
    });
};

/**
 * 页数跳转
 * @returns
 */
function jumpPage() {
    // 获取
    var page = $('.inp-jump .formH-control').val();
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
        getAuthByPage(pageNum);
    }
};

// 回调
//  function getAuthByPageCallBack(index, jq) {
//	  getAuthByPage(index);
//  };

//商品编码补全18位
function changeCmmdtyModel(cmmdtyCode) {
    var code = $("#" + cmmdtyCode).val();
    if (code.length < 18 && code.length != 0) {
        for (var i = code.length; i < 18; i++) {
            code = "0" + code;
        }
        $("#" + cmmdtyCode).val(code);
    }
}

//表格td内容过多时，td显示省略号，鼠标移入显示全部内容
function overShow(obj, e) {
    var showDiv = document.getElementById('showDiv');
    var theEvent = window.event || e;
    showDiv.style.left = theEvent.clientX + "px";
    showDiv.style.top = theEvent.clientY + "px";
    showDiv.style.display = 'block';
    //alert(obj.innerHTML);
    showDiv.innerHTML = obj.innerHTML;
}

function outHide() {
    var showDiv = document.getElementById('showDiv');
    showDiv.style.display = 'none';
    showDiv.innerHTML = '';
}

//内容过长时用省略号代替,不改变原来样式
function showlongLink(content) {
    if (content != '' && content != null && content != 'null') {
        var showData;
        if (content.length >= 30) {
            showData = content.substring(0, 30) + '...';
        } else {
            showData = content;
        }
        return "<span  title='" + content + "'>" + showData + "</span>";
    } else {
        return "-";
    }
}

//商品编码补全18位  无入参
function appendCmmdtyCodeUtilByNoParams() {
    var code = $("#cmmdtyCode").val();
    if (code.length < 18 && code.length != 0) {
        for (var i = code.length; i < 18; i++) {
            code = "0" + code;
        }
        $("#cmmdtyCode").val(code);
    }
}

//供应商编码补全10位  无入参
function appendSupplierUtilByNoParams() {
    var code = $("#supplier").val();
    if (code.length < 10 && code.length != 0) {
        for (var i = code.length; i < 10; i++) {
            code = "0" + code;
        }
        $("#supplier").val(code);
    }
}
//商品编码补全18位
function checkCmmdtyCodeUtil(cmmdtyCode) {
    var code = $("#" + cmmdtyCode).val();
    if (code.length < 18 && code.length != 0) {
        for (var i = code.length; i < 18; i++) {
            code = "0" + code;
        }
        $("#" + cmmdtyCode).val(code);
    }
}

function checkSupplierCodeUtil(supplier) {
    var code = $("#" + supplier).val();
    if (code.length < 18 && code.length != 0) {
        for (var i = code.length; i < 10; i++) {
            code = "0" + code;
        }
        $("#" + supplier).val(code);
    }
}

//商品编码补全18位，传参
function appendCmmdtyCodeUtil(cmmdtyCode) {
    return appendCharBeforeStringUtil(cmmdtyCode, "0", 18);
}

//供应商编码不全10位
function appendSupplierCodeUtil(supplierCode) {
    return appendCharBeforeStringUtil(supplierCode, "0", 10);
}

/**
 * 自动向前补齐字符串
 * @param originalStr 原始字符串
 * @param appendChar 补齐的字符
 * @param targetLength 目标补齐长度
 * */
function appendCharBeforeStringUtil(originalStr, appendChar, targetLength) {
    if (originalStr.length > 0 && originalStr.length < targetLength) {
        for (var i = originalStr.length; i < targetLength; i++) {
            originalStr = appendChar + originalStr;
        }
    }
    return originalStr;
}

/**
 * 自动向后补齐字符串
 * @param originalStr 原始字符串
 * @param appendChar 补齐的字符
 * @param targetLength 目标补齐长度
 * */
function appendCharAfterStringUtil(originalStr, appendChar, targetLength) {
    if (originalStr.length > 0 && originalStr.length < targetLength) {
        for (var i = originalStr.length; i < targetLength; i++) {
            originalStr = originalStr + appendChar;
        }
    }
    return originalStr;
}

/**
 * 校验数值是否为数字
 */
function clearNoNumUtil(obj) {
    //obj.value = obj.value.replace(/^0*(0\|[1-9])/, '$1');//解决 粘贴不生效
    obj.value = obj.value.replace(/[^\d]/g, "");  //清除“数字”以外的字符
    //obj.value = obj.value.replace(/^[0-9]{5}$/,'$');//只能输入5位数字
}

//商品编码查询条件字符串分割并补全18位并丢弃空元素
function changeCmmdtyModelWithSplit(SPLIT) {
    var cmmdtyCodes = $(
        '#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
        .val();
    var cmmdtyCodeArray = new Array();
    var regex = /^[A-Za-z0-9]+$/;
    if (cmmdtyCodes) {
        cmmdtyCodeArray = cmmdtyCodes.split(SPLIT);
    }
    var cmmdtyCode = "";
    var arrayObj = new Array();
    for (var i = 0; i < cmmdtyCodeArray.length; i++) {
        cmmdtyCode = cmmdtyCodeArray[i].trim();

        if (cmmdtyCodeArray[i].length > 18) {
            bootbox.alert({
                buttons : {
                    ok : {
                        label : '确定',
                        className : 'btn-sm btn-primary'
                    }
                },
                message : '商品编码不能大于18位!&nbsp;&nbsp当前商品编码:' + cmmdtyCodeArray[i]
                + '为' + cmmdtyCodeArray[i].length + '位'
            });
            return false;
        }
        //校验不能为非特殊字符
        if ( !regex.test(cmmdtyCodeArray[i]) ){
            bootbox.alert({
                buttons : {
                    ok : {
                        label : '确定',
                        className : 'btn-sm btn-primary'
                    }
                },
                message : '商品编码:'+cmmdtyCodeArray[i]+'包含特殊字符!'
            });
            return false;
        }
        if (cmmdtyCode.length <= 18 && cmmdtyCode.length != 0) {
            for (var j = cmmdtyCode.length; j < 18; j++) {
                cmmdtyCode = "0" + cmmdtyCode;
            }
            arrayObj.push(cmmdtyCode);
        }
    }


    if (arrayObj.length > 10) {
        $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control')
            .html("");
        bootbox.alert({
            buttons : {
                ok : {
                    label : '确定',
                    className : 'btn-sm btn-primary'
                }
            },
            message : '商品编码最多支持10个'
        });
        return false;
    }
    $('#wrap .item-search .code-goods > .zg-inpMany > .zg-form-control').val(
        arrayObj.toString());
}

function nullToEmpty(obj){
    if( typeof(obj) == "undefined" || obj == null || obj.trim().toUpperCase()=="NULL"){
        return "";
    }
    return obj;
}
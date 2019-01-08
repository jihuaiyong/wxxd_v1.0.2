"use strict";
$(document).ready(function(){
    //价格文件号
    $("#priceFile").val(formatDate(new Date(),'yyMMddhhmmssii'));
    //初始显示10行
    eventFun.setStep(1);
    addtr();
});

/*下一步*/
function editNext1(){
    if(busCodeCheck() && supplierInfoCheck() && purcOrgCheck() && supplier_purcOrgCheck() && currencyCheck()){
        $(".step1").css("display","none");
        $(".step2").css("display","");
        eventFun.setStep(2);
    }
}
/*上一步*/
function editBack1(){
     npmsConfirm("返回上一步行项目信息将会被清空，是否继续？", function (flag) {
         if(flag){
             $("#file").val("");
             $("#fupload").html("请点击这里上传文件");
             $(".step1").css("display","");
             $(".step2").css("display","none");
             $("#errorInfo").css("display","none");
             $("#authList").html("");
             $("#errorAuthList").html("");
             addtr();
             eventFun.setStep(1);
         }
     });
}

// 事件操作
var eventFun={
    setStep:function(index){
        for(var i=2;i<=index;i++){
            $("#step"+i+"Li").addClass("blue").removeClass("gray");
            $("#step"+i+"Img").attr("src","../images/blue_blue.png");
        }
        for(var i=index+1;i<=3;i++){
            $("#step"+i+"Li").addClass("gray").removeClass("blue");
            $("#step"+i+"Img").attr("src","../images/gray_gray.png");
        }
        $("#step"+(index+1)+"Img").attr("src","../images/blue_gray.png");
    }
};
/*提交*/
function save_para_table(){
      var errorInfoCss = $("#errorInfo").css("display");
      if(errorInfoCss!='none'){
         npmsAlert('导入内容有错误信息，请调整后重新导入');
         return false;
      }
      var statusFlag = checkStatus();
      var jsonStr = "";
      if(statusFlag){
          var tableinfo = gettableinfo();
          if(tableinfo.length===0){
              npmsAlert('行项目为空，不能提交，请填写行项目信息');
              return false;
          }
          var priceFile=$('#priceFile').val();
          var map = new Map();
          map.fileNum=$('#priceFile').val();
          map.brandLevel=$('#busCode').val();
          map.supplier=$('#supplier').val();
          map.purcOrg=$('#purcOrg').val();
          map.distSell=$('#distSell').val();
          map.orderType=$('#orderType').val();
          map.startTime=$('#startTime').val();
          map.endTime=$('#endTime').val();
          map.currency=$('#currency').val();
          map.remarks=$('#remarks').val();
          map.dataList=tableinfo;
          
          jsonStr = JSON.stringify(map);
          
          $.ajax({
              url: ctx+'/supplyPriceLogQuery/saveCprototype.action',
              type: "post",
              async: false,
              data: {"jsonStr":jsonStr},
              success: function (dataF) {
                if(dataF.successFlag=='S' && (dataF.dto.exceptionMsg==""||dataF.dto.exceptionMsg==null)){
                    $("#priceFileS").text(priceFile);
                    var nextApprover = dataF.dto.nextApprover;
                    var nextApproverStr = "";
                    if(nextApprover!="" && nextApprover!=null){
                        $("#nextApprovers").show();
                        var nextApprovers = dataF.dto.nextApprover.split(";");
                        var nextUserIds = dataF.dto.nextUserId.split(";");
                        for (var i = 0; i < nextApprovers.length; i++) {
                            nextApproverStr += '<tr>';
                            nextApproverStr += '<td>' + nextApprovers[i] + '</td>';
                            nextApproverStr += '<td>' + nextUserIds[i] + '</td>';
                            nextApproverStr += '</tr>';
                        }
                        $("#authList1").html("");
                        $("#authList1").html(nextApproverStr);
                        goPage(1,5,nextApprovers.length);
                        $("#nextApprover").html(nextApproverStr);
                    }else{
                        $("#nextApprovers").hide();
                    }
                    $("#approvalNum").text(dataF.dto.approvalNum);
                    $("#addDialog").show();
                }else if(dataF.successFlag=='S' && dataF.dto.exceptionMsg!="" && dataF.dto.exceptionMsg!=null){
                    npmsAlert(dataF.dto.exceptionMsg);
                }else if(dataF.successFlag=='E'){
                    npmsAlert('提交供价相关信息失败!');
                }
              },
              error: function(XMLHttpRequest) {
                  npmsAlert('提交供价相关信息失败!');
              }
          });
      }
}
function closedAndReload(){
    $("#addDialog").hide();
    location.reload();
};
function checkStatus() {
    var trlength = $("#para_table").find("tr").length;
    var trs= $("#para_table").find("tr");
    for(var i =1;i<trlength;i++){      
        if(trs.eq(i).find("td").eq(0).find("input").val()!='true'&&trs.eq(i).find("td").eq(0).find("input").val()!=''&&trs.eq(i).find("td").eq(0).find("input").val()!=undefined){
            npmsAlert('行项目第'+i+'行未校验通过，请检查');
            return false;
        }
    }
    return true;
}
//get table infomation
function gettableinfo(){
  var tableRow = new Map();
  var tablelist = new Array();
  var table = $("#para_table");
  var tbody = table.children();
  var trs = tbody.children();
  for(var i=1;i<trs.length;i++){
	var tds = trs.eq(i).children();
	if(tds.eq(0).find("input").val()=='true'){
        tableRow.status= tds.eq(0).find("input").val();
        tableRow.serialNo=tds.eq(1).text();
        tableRow.protoNum=tds.eq(2).text();
        tableRow.price=tds.eq(3).text();
        tableRow.cmmdtyCode=tds.eq(4).text();
        tableRow.meterUnit=tds.eq(6).find('input').val();
        tablelist.push(tableRow);
        tableRow.clear();
    }
  }
  return tablelist;
}
/*R3样机信息校验*/
function protoNumCheck(obj){
    var protoNum = obj.val().trim();
    obj.val(protoNum);
    var checkFlag = false;
    if(protoNum==""){
        $(obj).parent().parent().find("td").eq(4).text('')
        $(obj).parent().parent().find("td").eq(5).text('');
        $(obj).parent().parent().find("td").eq(6).text('');
        var price = $(obj).parent().parent().find("td").eq(3).text();
        if(price==""){ //当价格也为空时，相当于本行未输入值，清除状态栏状态
            $(obj).parent().parent().find("td").eq(0).removeAttr("style").html("");
        }else{ //当价格不为空时，则本行信息不全，设置状态栏为未通过
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
        }
        return checkFlag;
    }
    var purcOrg=$('#purcOrg').val();
    var supplier=$('#supplier').val();
    var busCode=$('#busCode').val();

    var trlength = $("#para_table").find("tr").length;
    var trs= $("#para_table").find("tr");
    //第0行是标题
    for(var i =1;i<trlength;i++){
        if(trs.eq(i).find("td").eq(2).text()==protoNum){
            npmsAlert('已存在样机序列号'+protoNum+'请勿重复添加');
            $(obj).parent().parent().find("td").eq(4).text('')
            $(obj).parent().parent().find("td").eq(5).text('');
            $(obj).parent().parent().find("td").eq(6).text('');
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
            return checkFlag;
        }
    }

    var priceCheckFlag = $(obj).parent().parent().find("td").eq(3).find("input").val();
    if(protoNum.substr(0,1)!='C'){
        npmsAlert("非C类样机序列号不允许维护供价");
        $(obj).parent().parent().find("td").eq(4).text('')
        $(obj).parent().parent().find("td").eq(5).text('');
        $(obj).parent().parent().find("td").eq(6).text('');
        $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
        return checkFlag;
    }
    if(protoNum.length>10){
        npmsAlert("样机序列号不允许大于10位");
        $(obj).parent().parent().find("td").eq(4).text('')
        $(obj).parent().parent().find("td").eq(5).text('');
        $(obj).parent().parent().find("td").eq(6).text('');
        $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
        return checkFlag;
    }
    if(protoNum!=''&&protoNum!=null){
        $.ajax({
            url : 'prototypeNoCheck.action',
            type : "post",
            async : false,
            data : {
                'protoNum': protoNum,'purcOrgStr':purcOrg,'supplier':supplier,'busCode':busCode
            },
            success : function(dataF) {
                if(dataF.successFlag=='S'){
                    checkFlag = true;
                    $(obj).parent().parent().find("td").eq(4).text(dataF.cmmdtyCode);
                    $(obj).parent().parent().find("td").eq(5).html(dataF.remarks);
                    if(priceCheckFlag!=null && priceCheckFlag){
                        $(obj).parent().parent().find("td").eq(0).css("background-color","#28ec5f").html("<input type='hidden' value = 'true' />");
                    }else{
                        $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
                    }
                    $(obj).parent().parent().find("td").eq(6).html(dataF.unitRemarks+"<input type='hidden' value = '"+dataF.unit+"'/>");
                    $(obj).parent().parent().find("td").eq(2).html(protoNum+"<input type='hidden' value = 'true' />");
                } else if(dataF.successFlag=='E'){
                    obj.val('');
                    $(obj).parent().parent().find("td").eq(4).text('')
                    $(obj).parent().parent().find("td").eq(5).text('');
                    $(obj).parent().parent().find("td").eq(6).text('');
                    $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
                    $(obj).parent().parent().find("td").eq(2).html(protoNum);
                    npmsAlert(dataF.errorMsg);
                    checkFlag = false;
                }
            },
            error: function(XMLHttpRequest) {
                obj.val('');
                $(obj).parent().parent().find("td").eq(4).text('');
                $(obj).parent().parent().find("td").eq(5).text('');
                $(obj).parent().parent().find("td").eq(6).text('');
                $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
                $(obj).parent().parent().find("td").eq(2).html(protoNum);
                npmsAlert("获取R3样机信息失败!");
                checkFlag = false;
            }
        });
    } else {
        npmsAlert("样机序列号不能为空!");
        checkFlag = false;
    }
    return checkFlag;
}

/*行项目td点击事件*/
function tdclick(tdobject){
  var td=$(tdobject);
  var tdName = td.attr("name");
  td.attr("onclick", "");
  td.css("background-color","burlywood");
  //1,取出当前td中的文本内容保存起来
  var text=td.text();
  //2,清空td里面的内容
  td.html(""); //也可以用td.empty();
  //3，建立一个文本框，也就是input的元素节点
  var input=$("<input>");
  //4，设置文本框的值是保存起来的文本内容
  input.attr("value",text);
  input.bind("blur",function(){
	var inputnode=$(this);
	if(tdName == 'protoNum'){
        protoNumCheck(inputnode);
    }
    if(tdName == 'price'){
        priceCheck(inputnode);
    }
    var inputtext=inputnode.val();
	var tdNode=inputnode.parent();
	tdNode.html(inputtext);
	tdNode.click(tdclick);
	td.attr("onclick", "tdclick(this)");
  });

  //5，将文本框加入到td中
  td.append(input);
  var t =input.val();
  input.val("").focus().val(t);
  //input.focus();

  //6,清除点击事件
  td.unbind("click");
  td.mouseleave(function(){
  	td.css("background-color","");
  });
}

//添加行
function addtr(){
  var trlength = $("#para_table").find("tr").length;
  if(trlength<=15){
      for(var i =0;i<5;i++) {
          var table = $("#para_table");
          var tr = $("<tr>" +
              "<td name='status' style='text-align: center;' >" + "</td>" +
              "<td name='serialNo' style='text-align: center;' >" + "</td>" +
              "<td name='protoNum' style='text-align: center;' onclick='tdclick(this);'>" + "</td>" +
              "<td name='price' style='text-align: center;' onclick='tdclick(this)'>" + "</td>" +
              "<td name='cmmdtyCode' style='text-align: center;' >" + "</td>" +
              "<td name='cmmdtyDesc' style='text-align: center;' >" + "</td>" +
              "<td style='text-align: center;' >" + "</td>" +
              "<td align='center' onclick='deletetr(this)'><button type='button' class='btn btn-xs btn-link' >" + "删除" + "</button></td></tr>");
          table.append(tr);
      }
  } else if(trlength<21){
      var line = 21-trlength;
      for(var i =0;i<line;i++){
          var table = $("#para_table");
          var tr= $("<tr>" +
              "<td name='status' style='text-align: center;' >"+"</td>" +
              "<td name='serialNo' style='text-align: center;' >"+"</td>" +
              "<td name='protoNum' style='text-align: center;' onclick='tdclick(this);'>" + "</td>" +
              "<td name='price' style='text-align: center;' onclick='tdclick(this)'>" + "</td>" +
              "<td name='cmmdtyCode' style='text-align: center;' >"+"</td>" +
              "<td name='cmmdtyDesc' style='text-align: center;' >"+"</td>" +
              "<td style='text-align: center;' >"+"</td>" +
              "<td align='center' onclick='deletetr(this)'><button type='button' class='btn btn-xs btn-link' >"+"删除"+"</button></td></tr>");
          table.append(tr);
      }
  } else {
      alert("明细行数已超过20条不允许新增");
  }
  reSerialtd();
}
//删除行
function deletetr(tdobject){
  var td=$(tdobject);
  td.parents("tr").remove();
  reSerialtd();
}

//td序号显示
function reSerialtd() {
    var trlength = $("#para_table").find("tr").length;
    var trs= $("#para_table").find("tr");
    for(var i =1;i<trlength;i++){
        trs.eq(i).find("td").eq(1).text(i);
    }
}
//下载模板
function downloadModel() {
	window.open(ctx+'/modelFile/CPrototypePrice.zip','下载上传模板',"");
 }

//导入
function fileUpload(){
   var filePath=$("#file").val();
   var index=filePath.lastIndexOf(".");
   var str=filePath.substring(index+1,filePath.length).toLowerCase();
   if(str!='xls'&&str!='xlsx'){
	   npmsAlert("请上传xls,xlsx格式文件！")
	    return;
    }
    var size = $("#file")[0].files[0].size;
    var limitSize = 1;
    if (size > limitSize * 1024 * 1024) {
        npmsAlert('请上传大小小于' + limitSize + 'M的文件!');
        return;
    }
    var index = layer.load(1, {shade: [0.1, '#393D49']});
    var file = document.fileUploadForm.file.files[0];
    var StartTime = $("#startTime").val();
    var EndTime = $("#endTime").val();
    var fm = new FormData();
    fm.append('file', file);
    fm.append('busCode',$("#busCode").val());
    fm.append('supplier',$('#supplier').val());
    fm.append('purcOrgStr',$('#purcOrg').val());
    fm.append('StartTime',StartTime);
    fm.append('EndTime',EndTime);
    $.ajax({
        url : 'fileUpload.action',
        type: 'POST',
        data: fm,
        contentType: false, //禁止设置请求类型
        processData: false, //禁止jquery对DAta数据的处理,默认会处理
        //禁止的原因是,FormData已经帮我们做了处理
        success : function(lineData, status) {
            // 返回数据存在
            var suctabHTML = "";
            var errtabHTML = "";
            if (lineData && lineData.total>=0 ) {
                //先清空
                $("#authList").html("");
                $("#errorAuthList").html("");
                $("#errorInfo").css("display","none");
                var succLen = lineData.succRows.length;
                var errLen = lineData.errRows.length;
                if(lineData.total>100){
                    errtabHTML += '<tr><td COLSPAN="14">一次最多可维护100条，请重新维护！</td></tr>';
                    $("#errorAuthList").html("");
                    $("#errorAuthList").html(errtabHTML);
                    $("#errorInfo").css("display","");
                }
                if(lineData.total<=1&&succLen==0&&errLen==0){
                    errtabHTML += '<tr><td COLSPAN="14">上传的文件没有数据或者数据格式错误！</td></tr>';
                    $("#errorAuthList").html("");
                    $("#errorAuthList").html(errtabHTML);
                    $("#errorInfo").css("display","");
                }
                if(succLen>0){
                    //展示数据信息
                    for (var i = 0; i < succLen; i++) {
                        var tempData = lineData.succRows[i];
                        suctabHTML += '<tr>';
                        suctabHTML += '<td style="background: #28ec5f"><input type="hidden" value = "true" /></td>';
                        suctabHTML += '<td>' + (i+1) + '</td>';
                        suctabHTML += '<td name="protoNum" style="text-align: center;" onclick="tdclick(this);">' + tempData.protoNum + "<input type='hidden' value = 'true' />"+'</td>';
                        suctabHTML += '<td name="price" style="text-align: center;" onclick="tdclick(this)">' + tempData.price + "<input type='hidden' value = 'true' />"+'</td>';
                        suctabHTML += '<td>' + tempData.cmmdtyCode + '</td>';
                        suctabHTML += '<td>' + tempData.remarks + '</td>';
                        suctabHTML += '<td>' + tempData.unitRemarks + "<input type='hidden' value = '"+tempData.unit+"'/>"+'</td>';
                        suctabHTML += '<td style="text-align:center; " onclick="deletetr(this)"><button type="button" class="btn btn-xs btn-link">'+'删除'+'</button></td>';
                        suctabHTML += '</tr>';
                    }
                    $("#authList").html("");
                    $("#authList").html(suctabHTML);
                }

                if(errLen > 0){
                    //如果有错误信息，则直接提示错误信息
                    $("#errorInfo").css("display","");
                    errtabHTML = "";
                    for (var i = 0; i < errLen; i++) {
                        var tempData = lineData.errRows[i];
                        errtabHTML += '<tr>';
                        errtabHTML += '<td>' + tempData.itNo + '</td>';
                        errtabHTML += '<td>' + tempData.errorMsg + '</td>';
                        errtabHTML += '</tr>';
                    }
                    $("#errorAuthList").html("");
                    $("#errorAuthList").html(errtabHTML);
                }
            }
            //取消遮罩层
            layer.close(index);
        }
    });
}
//校验文件类型
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
			message : '请上传txt,csv,xls,xlsx格式文件！'
		  });
		  return;
	  }
}

/**
 * 校验事业部是否为数字
 */
function clearNoNum(obj) {
	obj.value=obj.value.replace(/[^\d]/g, ""); //清除“数字”以外的字符
}
function currencyCheck() {
    var currency=$('#currency').val();
    var checkFlag = false;
    if(currency!='' && currency!=null){
        checkFlag = true;
    } else {
        npmsAlert("货币不能为空!");
        checkFlag = false;
    }
    return checkFlag;
}
//采购组织校验
function purcOrgCheck(){
	var purcOrg=$('#purcOrg').val().trim();
    $('#purcOrg').val(purcOrg);
    var checkFlag = false;
	if(purcOrg!=''&&purcOrg!=null){
		$.ajax({
			url : 'purcOrgsExistCheck.action',
			type : "post",
            async : false,
			data : {
				'purcOrgStr': purcOrg
			},
			success : function(dataF) {
				if(dataF.successFlag=='E'){
					var messageInfo=[];
					for(var i=0;i<dataF.errorMsgList.length;i++){
						messageInfo.push(dataF.errorMsgList[i]);
					}
					npmsAlert("您输入的采购组织<font color='#ff0000' size='3'>"+messageInfo+"</font>不存在!");
                    $('#currency').val('');
                    checkFlag = false;
				} else if(dataF.successFlag=='S'){
                    checkFlag = true;
                }
			},
			error: function(XMLHttpRequest) {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '获取采购组织信息失败!'
				});
                checkFlag = false;
			}
		});
	} else {
        npmsAlert("采购组织不能为空!");
        checkFlag = false;
	}
	if(checkFlag){
        checkFlag = supplier_purcOrgCheck();
    }
	return checkFlag;
}

/**
 * 校验供应商信息
 */
function supplierInfoCheck(){
    var supplier=$('#supplier').val().trim();
    $('#supplier').val(supplier);
    var checkFlag = false;
    if(supplier!=''&&supplier!=null){
        supplier = appendSupplierCodeUtil(supplier);
        $('#supplier').val(supplier);
        $.ajax({
            url : 'supplierInfoCheck.action',
            type : "post",
            async : false,
            data : {
                'supplier': supplier
            },
            success : function(dataF) {
                if(dataF.successFlag=='S'){
                    //给供应商描述赋值
                    $('#supplierDesc').val(dataF.remarks);
                    checkFlag = true;
                } else if(dataF.successFlag=='E'){
                    $('#supplierDesc').val('');
                    $('#currency').val('');
                    npmsAlert(dataF.errorMsg);
                    checkFlag = false;
                }
            },
            error: function(XMLHttpRequest) {
                $('#supplierDesc').val('');
                $('#currency').val('');
                npmsAlert("获取供应商信息失败!");
                checkFlag = false;
            }
        });
    } else {
        npmsAlert("供应商不能为空!");
        checkFlag = false;
    }
    if(checkFlag){
        checkFlag = supplier_purcOrgCheck();
    }
    return checkFlag;
}
/**
 * 供应商+采购组织获取货币信息
 */
function supplier_purcOrgCheck() {
	var supplier = $('#supplier').val();
    var purcOrg=$('#purcOrg').val();
    var checkFlag = false;
    if(supplier!=''&&supplier!=null&&purcOrg!=''&&purcOrg!=null){
        $.ajax({
            url : 'supplier_purcOrgCheck.action',
            type : "post",
            async : false,
            data : {
                'supplier': supplier,
                'purcOrgStr': purcOrg
            },
            success : function(dataF) {
                if(dataF.successFlag=='S'){
                    $('#currency').val(dataF.currency);
                    checkFlag = true;
                }
                else if(dataF.successFlag=='E'){
                    $('#currency').val('');
                    npmsAlert(dataF.errorMsg);
                    checkFlag = false;
                }
            },
            error: function(XMLHttpRequest) {
                $('#currency').val('');
                npmsAlert("获取货币信息失败!");
                checkFlag = false;
            }
        });
	}
	return checkFlag;
}

//当前生效供价的校验
function priceCheck(obj){
    var priceCheck = false ;
    var price = obj.val().trim();
    obj.val(price);
    var rex = /^[0-9]+(.[0-9]{1,2})?$/;//校验是否是数字
    var protoNumCheckFlag = $(obj).parent().parent().find("td").eq(2).find("input").val();
    //非空校验
    if(price!=''&&price!=null){
        if(!rex.test(price)||parseFloat(price)==0){
            npmsAlert("本次维护价格必须为数字且大于0,最多保留两位小数!");
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
            $(obj).parent().parent().find("td").eq(3).html(price);
            return priceCheck;
        }else if(price.length>12){
            npmsAlert("本次维护的供价异常!");
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
            $(obj).parent().parent().find("td").eq(3).html(price);
            return priceCheck;
        }
        priceCheck = true;
        if(protoNumCheckFlag!=null && protoNumCheckFlag){
            $(obj).parent().parent().find("td").eq(0).css("background-color","#28ec5f").html("<input type='hidden' value = 'true' />");
        }else{
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
        }
        $(obj).parent().parent().find("td").eq(3).html(price+"<input type='hidden' value = 'true' />");
    }else{
        var protoNum = $(obj).parent().parent().find("td").eq(2).text();
        if(protoNum==""){ //当序列号也为空时，相当于本行未输入值，清除状态栏状态
            $(obj).parent().parent().find("td").eq(0).removeAttr("style").html("");
        }else{ //当序列号不为空时，则本行信息不全，设置状态栏为未通过
            $(obj).parent().parent().find("td").eq(0).css("background-color","red").html("<input type='hidden' value = 'false' />");
        }
    }

    return priceCheck;
}

/**
 * 事业部校验
 */
function busCodeCheck(){
    var checkFlag = false;
    //先检验事业部是否存在
    checkFlag = busCodeExistsCheck();
    if(checkFlag){
        //再查北冥接口校验是否有权限
        checkFlag = userBusAuthorityCheck();
    }
    return checkFlag;
}

/**
 * 用户是否有事业部权限校验
 */
function userBusAuthorityCheck(){
    var checkFlag = false;
    var busCode=$('#busCode').val();
    if(busCode!=''&&busCode!=null){
        $.ajax({
            url : 'NCgetPersonInfo.action',
            type : "post",
            async:false,
            data : {
                'busCode': busCode
            },
            success : function(dataF) {
                if(dataF.successFlag=='S'){
                    checkFlag = true;
                }else if(dataF.successFlag=='E'){
                    checkFlag = false;
                    npmsAlert(dataF.errorMsg);
                }
            },
            error: function(XMLHttpRequest) {
                npmsAlert('获取北冥系统RSF权限查询接口信息失败!');
                checkFlag = false;
            }
        });
    } else {
        npmsAlert('事业部不能为空！');
        checkFlag = false;
    }
    return checkFlag ;
}

/**
 * 事业部存在校验
 */
function busCodeExistsCheck(){
    var checkFlag = false;
    var busCode=$('#busCode').val();
    if(busCode!=''&&busCode!=null){
        $.ajax({
            url : 'busCodeExistsCheck.action',
            type : "post",
            async:false,
            data : {
                'busCode': busCode
            },
            success : function(dataF) {
                if(dataF.successFlag=='E'){
                    var messageInfo=[];
                    for(var i=0;i<dataF.errorMsgList.length;i++){
                        messageInfo.push(dataF.errorMsgList[i]);
                    }
                    npmsAlert("您输入的事业部<font color='#ff0000' size='3'>"+messageInfo+"</font>不存在!");
                    $('#currency').val('');
                    checkFlag = false;
                } else if(dataF.successFlag=='S'){
                    checkFlag = true;
                }
            },
            error: function(XMLHttpRequest) {
                npmsAlert('事业部信息查询失败!');
                checkFlag = false;
            }
        });
    }else {
        npmsAlert('事业部不能为空！');
        checkFlag = false;
    }
    return checkFlag;
}
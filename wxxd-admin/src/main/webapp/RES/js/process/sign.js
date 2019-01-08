/**
 * Created by 16080956 on 2016/11/21.
 */
$(function () {
    // 查询工号或者名称
    $('.sign-select-a').on('click',function () {
    	$(".select-result table tr:not(:first)").remove();
        //如果都没有输入给一个弹出提示
        if($('#sign-people-number').val()=='' && $('#sign-people-name').val()==''){
        	layer.msg("至少要输入一个参数方可进行查询");
        }else {
        	var signdata='';
        	var aptr='';
        	var applyNo = $('#sign-people-number').val();
        	var applyName = $('#sign-people-name').val();
        	$.ajax({
                type: 'post',
                url: 'adviseQuery.do',
                data : {
                	'applyNo' : applyNo,
                	'name' : applyName
                },
                dataType: 'json',
                async: false,
                success: function (result) {
                	if(result.flag == 'success'){
                    	signdata = $.parseJSON(result.data);
                	}
                },
                error:function () {
                	layer.msg("查询失败");
                }
            });
            //如果输入了工号
            if(signdata!=''){
                for (var i = 0; i < signdata.length; i++) {
                		 aptr+='<tr><td><input class="td-checkbox" type="checkbox" /> </td><td>'
                			 +signdata[i].userId+'</td><td>'
                			 +signdata[i].userName+'</td><td colspan="2">'
                			 +signdata[i].departmentName+'</td><td>'
                			 +signdata[i].positionName+'</td>'+
                         '<input type="hidden" name="userId" id="userId" value="'+signdata[i].userId+'"/>'+
                         '<input type="hidden" name="deptId" id="deptId" value="'+signdata[i].departmentId+'" />'+
                         '<input type="hidden" name="positionId" id="positionId" value="'+signdata[i].position+'" />'+
                         '</tr>';
                }
                $('.select-result table tbody').append(aptr);
            }
        }
    });
    
    //点击添加
    $(document).on('click','.sign-add-a',function(){
        if($('.select-result .td-checkbox').length==0) {
            layer.open({
                area:['auto','auto'],
                skin: 'layui-layer-rim',
                title: '添加提示信息',
                btn:'关闭',
                content:'<div >请在上方输入工号或姓名进行查询后添加相应的人员</div>'
            });
        }else{
        	var $chks = $('.select-result .td-checkbox:checked');
        	if($chks.length>0){
        		var flag = true;
        		$('#submitTable').find('input[name="userId"]');
        		$.each($chks,function(i,chk){
        			var $tr = $(chk).parents('tr');
        			var userIdVal = $tr.find('#userId').val();
        			var submitUserId = $('#submitTable').find('input[name="userId"][value="'+userIdVal+'"]').val();
        			if($.trim(submitUserId) != ''){
        				flag = false;
        			}
        		});
        		
        		if(flag) {
        			$.each($chks,function(i,chk){
        				var $tr = $(chk).parents('tr');
                    	$('.results').children('.results-infor').children().children().append($tr);
                    	$('#submitTable').append($tr.clone());
        			});
                }else{
                    layer.open({
                        area:['auto','auto'],
                        skin: 'layui-layer-rim',
                        title: '添加提示信息',
                        btn:'关闭',
                        content:'<div >该人员已在列表</div>'
                    });
                }
        		
            }else{
                layer.open({
                    area:['auto','auto'],
                    skin: 'layui-layer-rim',
                    title: '添加提示信息',
                    btn:'关闭',
                    content:'<div >请选择要添加的人员</div>'
                });
            }
        }
    });
    //点击删除
    $('#sign_del').on('click', function(){
        if($('.results .td-checkbox').length==0) {
            layer.open({
                area:['auto','auto'],
                skin: 'layui-layer-rim',
                title: '添加提示信息',
                btn:'关闭',
                content:'<div >没有找到需要删除的人员</div>'
            });
        }else{
        	var $delChks = $('.results .td-checkbox:checked');
        	$.each($delChks,function(i,delChk){
				var deldom=  $(delChk).parent().parent();
				var userId = deldom.find('#userId').val();
				var $userIdInput = $('#submitTable').find('input[name="userId"][value="'+userId+'"]');
				var deltr = $userIdInput.parent();
				deltr.remove();
				deldom.remove();
        	});
        	
        	
        }
    });
    
    $(document).on('blur','#sign-description',function(){
    	$('#adviseQuestion').val($('#sign-description').val());
    });
    
});

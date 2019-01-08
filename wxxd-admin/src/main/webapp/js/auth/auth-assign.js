//权限分配初始化
function authAssign(){
	if (isChecked()) {
		//初始化树
		initTree();
		//初始化弹出框
		$('#modal_authAssign').modal({
			backdrop: 'static',
			keyboard: false,
			show: false
		});		
	}
	else{
		$('#modal_authAssign').modal('toggle');			
	}		
}


function initTree(){
	var data = null;
	var roleId = $("input[name='radio_role']:checked").val();
	var params = {
		'roleId' : roleId,
	};
	var jsonObj = eval(params);
	jQuery.ajax({
		type : 'post',
		url : "getRoleMenuTree.action",
		data : jsonObj,
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		success : function(obj) {
			if (null != obj) {
				data = eval(obj);			
			} 
			getTree(data);
		}
	}); 
	
}

function getTree(data){
	//初始化菜单树
	var nodeCheckedSilent = false;
	var nodeUncheckedSilent = false; 
	
	$('#treeview').treeview({
		data:data,
		showCheckbox : true,
        levels:3,//设置继承树默认展开的级别(后续设置选中展开)
        onNodeChecked: function(event, node) { //选中节点            
            if(nodeCheckedSilent){  
                return;  
            }  
            if(node.type!='1'){
            nodeCheckedSilent = true;  
            //获取当前节点所有父节点
            checkAllParent(node);
            
            //获取当前节点下所有子节点
            var selectNodes = getNodeIdArr(node);
            if(selectNodes){
                $('#treeview').treeview('checkNode', [ selectNodes,{ silent: true }]);
            }            
            
            nodeCheckedSilent = false;
            }
        },
        onNodeUnchecked: function (event, node) { //取消选中节点
            if(nodeUncheckedSilent)  
                return;  
            if(node.type!='1'){
            nodeUncheckedSilent = true;   	      	
            //取消当前节点所有父节点
            uncheckAllParent(node);
            
        	//取消当前选中下所有子节点
            var selectNodes = getNodeIdArr(node);
            if(selectNodes){
                $('#treeview').treeview('uncheckNode', [ selectNodes,{ silent: true }]);
            }
            nodeUncheckedSilent = false; 
            }
        }
	}); 
}

//递归获取所有的结点id
function getNodeIdArr(node){
        var ts = [];
        if(node.nodes){
            for(x in node.nodes){
                ts.push(node.nodes[x].nodeId);
                if(node.nodes[x].nodes){
                var getNodeDieDai = getNodeIdArr(node.nodes[x]);
                    for(j in getNodeDieDai){
                        ts.push(getNodeDieDai[j]);
                    }
                }
            }
        }else{
            ts.push(node.nodeId);
       }
   return ts;
}
  
//选中全部父节点  
function checkAllParent(node){  
    $('#treeview').treeview('checkNode',node.nodeId,{silent:true});  
    var parentNode = $('#treeview').treeview('getParent',node.nodeId);  
    if(!("id" in parentNode)){  
        return;  
    }else{  
        checkAllParent(parentNode);  
    }  
}  

//取消全部父节点  
function uncheckAllParent(node){  
    $('#treeview').treeview('uncheckNode',node.nodeId,{silent:true});  
    var siblings = $('#treeview').treeview('getSiblings', node.nodeId);  
    var parentNode = $('#treeview').treeview('getParent',node.nodeId);  
    if(!("id" in parentNode)) {  
        return;  
    }  
    var isAllUnchecked = true;  //是否全部没选中  
    for(var i in siblings){  
        if(siblings[i].state.checked){  
            isAllUnchecked=false;  
            break;  
        }  
    }  
    if(isAllUnchecked){  
        uncheckAllParent(parentNode);  
    }   
}  
  
//级联选中所有子节点  
/*function checkAllSon(node){  
    $('#treeview').treeview('checkNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            checkAllSon(node.nodes[i]);  
        }  
    }  
}  */
//级联取消所有子节点  
/*function uncheckAllSon(node){  
    $('#treeview').treeview('uncheckNode',node.nodeId,{silent:true});  
    if(node.nodes!=null&&node.nodes.length>0){  
        for(var i in node.nodes){  
            uncheckAllSon(node.nodes[i]);  
        }  
    }  
} */ 


//保存权限
function saveAuthAssign(){

	
	
	var checkedArr = $('#treeview').treeview('getChecked','');
	var ids = '';
	var parentids = '';
	var functionids = '';
	for(var i=0;i<checkedArr.length;i++){
		if(checkedArr[i].type=='1'){
			functionids += checkedArr[i].id + ',';
			parentids += checkedArr[i].parentid + ',';
		}else{
			ids += checkedArr[i].id + ',';
		}
	
	}
	ids = ids.substring(0, ids.length-1);


	// 角色编码
	var roleId = $("input[name='radio_role']:checked").val();
	// 登录用户
	var loginUser = $("#employeeId").val();  
	if(functionids){
		functionids = functionids.substring(0, functionids.length-1);
		parentids   = parentids.substring(0, parentids.length-1);
		
	}
	var params = {
		'roleId' : roleId,
		'ids' : ids,
		'functionids':functionids,
		'loginUser' : loginUser,
		'parentids':parentids
	};

	

	var jsonObj = eval(params);
	jQuery.ajax({
		type : 'post',
		url : "saveRoleMenuTree.action",
		data : jsonObj,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		success : function(result) {
			if (result == 'success') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '分配成功!'
				});
				$('#modal_authAssign').modal('toggle');
				
			} else if (result == 'fail') {
				bootbox.alert({
					buttons : {
						ok : {
							label : '确定',
							className : 'btn-sm btn-primary'
						}
					},
					message : '分配失败!'
				});
			}
		}
	});	
		
	
}

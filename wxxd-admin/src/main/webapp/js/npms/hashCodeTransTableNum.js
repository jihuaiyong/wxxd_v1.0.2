var flag = 0;
function check(){
	flag = 0;
	var hashCode = $("#hashCode").val();
	var tableSize = $("#tableSize").val();
	if(hashCode == ""){
		npmsAlert("编码不能为空！");
        return false;
	}
	
	if(tableSize == ""){
		npmsAlert("分表数量不能为空！");
        return false;
	}
	flag = 1;
}

function getHash(){
	check();
	var dbSize = $("#dbSize").val();
	var hashCode = $("#hashCode").val();
	var tableSize = $("#tableSize").val();
	
	if(flag == 1){
		$.ajax({
		    type:"POST",
		    url:"getHashTableNum.action",
		    data:{'dbSize':dbSize,
		        'hashCode':hashCode,
		        'tableSize':tableSize
		    },
		    success:function(resultMap){	
	    		$("#result").val("编码所属数据库为:"+resultMap.hashDb+"库,"+"所在数据库表为:"+resultMap.hashTable+"表。");
		    }
		});
	}
}
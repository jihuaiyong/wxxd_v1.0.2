
function isNumber(s){

	 var i,j,strTemp;
	 tempStr="0123456789";

	 if ( s.length == 0) return false;

	 for (i=0; i<s.length; i++){
		  j = tempStr.indexOf(s.charAt(i));
		  if (j==-1) return false;
	 }
	 return true;
}

function isFloat(s){

	 var i,j,strTemp;
	 tempStr="0123456789.";

	 if ( s.length == 0) return false;

	 for (i=0; i<s.length; i++){
		  j = tempStr.indexOf(s.charAt(i));
		  if (j==-1) return false;
	 }
	 return true;
}

function chk(){
	if(document.forms[0].chk==null){
 		return;
    }
    var chkId = '';
    var len = document.forms[0].chk.length;
	if(len>1){
	    var tag = 0;
		for(var i=0;i<len;i++){
			if(document.forms[0].chk[i].checked){   
			    if (tag==0) {
			    	chkId = chkId + document.forms[0].chk[i].value;
			    	tag = 1;
			    } else {
			    	chkId = chkId + ","+document.forms[0].chk[i].value;
			    }           
									
			}
		}
	} else {
		if(document.forms[0].chk.checked){
			chkId = document.forms[0].chk.value;
	 	}
	}
	if (chkId=='') {
	    return;
	}
	return chkId;
}

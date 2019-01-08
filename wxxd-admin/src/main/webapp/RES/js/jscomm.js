// JavaScript Document
//弹出新窗口(URL连接,w=宽,h=高,x=左,y=上)
function OpenWin(url,w,h,x,y){
  window.open(url,"","status=yes,scroll=yes,resizable=yes,dependent = yes,height = "+h+",width = "+w+",left="+x+",top="+y);
}

//自窗口（针对可打开小点的窗口，为方便原先打开了Pwindow然后再打开个窗口）
function OpenZWin(url,w,h,x,y){
    window.open(url,"","status=no,scroll=yes,resizable=yes,dependent = yes,height = "+h+",width = "+w+",left="+x+",top="+y);}

//折叠展开左边菜单
function switchleftBar(){
	imgurl=document.images['switchgif'].src;
	imgurl=imgurl.substring(imgurl.indexOf("img/"))
	if (imgurl=="img/i_arrow_3b.gif"){
		document.images['switchgif'].src="img/i_arrow_3a.gif"
		parent.document.all("tdfrmLeft").style.display="none"
	}else{
		document.images['switchgif'].src="img/i_arrow_3b.gif"
		parent.document.all("tdfrmLeft").style.display=""
	}
}


  //屏蔽鼠标右键、Ctrl+n、shift+F10、F5刷新、退格键
function KeyDown(){	
  if ((event.keyCode == 8) && 
			(event.srcElement.type != "text" && 
			event.srcElement.type != "textarea" && 
			event.srcElement.type != "password") || //屏蔽退格删除键 
			(event.keyCode ==116)|| //屏蔽 F5 刷新键
			(event.ctrlKey && event.keyCode==82)){ //Ctrl + R
				event.keyCode=0;
				event.returnvalue=false;
			}
  


  if ((window.event.altKey)&&
      ((window.event.keyCode==37)||   //屏蔽 Alt+ 方向键 ←
       (window.event.keyCode==39))){  //屏蔽 Alt+ 方向键 →
     alert("不准你使用ALT+方向键前进或后退网页！");
     event.returnValue=false;
     }

     /* 注：这还不是真正地屏蔽 Alt+ 方向键，
     因为 Alt+ 方向键弹出警告框时，按住 Alt 键不放，
     用鼠标点掉警告框，这种屏蔽方法就失效了。以后若
     有哪位高手有真正屏蔽 Alt 键的方法，请告知。*/

  if ((event.keyCode==116)||                 //屏蔽 F5 刷新键
      (event.ctrlKey && event.keyCode==82)){ //Ctrl + R
     event.keyCode=0;
     event.returnValue=false;
     }
  if ((event.ctrlKey)&&(event.keyCode==78))   //屏蔽 Ctrl+n
     event.returnValue=false;
  if ((event.shiftKey)&&(event.keyCode==121)) //屏蔽 shift+F10
     event.returnValue=false;
  if (window.event.srcElement.tagName == "A" && window.event.shiftKey) 
      window.event.returnValue = false;  //屏蔽 shift 加鼠标左键新开一网页
  if ((window.event.altKey)&&(window.event.keyCode==115)){ //屏蔽Alt+F4
      window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");
      return false;}
  }
  
  
//只能输入数字 文本框
function KeyIsNumber(KeyCode)
{
    if(((KeyCode>47)&&(KeyCode<58))|| ((KeyCode>95)&&(KeyCode<106)) ||  ((KeyCode>36)&&(KeyCode<41)) || (KeyCode==8)||(KeyCode==46)||(KeyCode==190))
    {
          return true;
    }
    else
    {
          return false;
     }
}

//显示隐藏表格
function showhiddenTb(ctrlbut,tablename){
	if (ctrlbut.className=="but_exp"){
	ctrlbut.className="but_col";
	document.all(tablename).style.display='none';
	}else{
	ctrlbut.className="but_exp";
	document.all(tablename).style.display='';
	}
}
//计算天数差的函数，通用  
function   DateDiff(sDate1,sDate2){     //sDate1和sDate2是2002-12-18格式  
  var   aDate,   oDate1,   oDate2,   iDays  
  aDate   =   sDate1.split("-")  
  oDate1   =   new   Date(aDate[1]   +   '-'   +   aDate[2]   +   '-'   +   aDate[0])     //转换为12-18-2002格式  
  aDate   =   sDate2.split("-")  
  oDate2   =   new   Date(aDate[1]   +   '-'   +   aDate[2]   +   '-'   +   aDate[0])  
  iDays   =   parseInt(Math.abs(oDate1   -   oDate2)   /   1000   /   60   /   60   /24)     //把相差的毫秒数转换为天数  
  return   iDays
} 



//计算两个日期间的天数,填充到第三个输入框中.
function calcTS(Fdayname1,Fdaynam2,FtarDayname){
	var tmp;
	var day1;
	var day2;
	day1=document.all(Fdayname1).value
	day2=document.all(Fdaynam2).value
	if ((day1!="")&&(day2!="")){
		tmp=DateDiff(day1,day2)
		document.all(FtarDayname).value=tmp;
	}else{
	    document.all(FtarDayname).value = "";
	}	
}

//数组填充到select控件里去
//getTxt 字符串	//CtrlName 控件名	//DefVal 默认值
//规则 =  '显示内容1|1值,显示内容2|2值,显示内容3|3值;2值'
//值于内容用| (管道号分割)
//值于值之间用 , 逗号分割
//一定要有; 分号,分号后代表的是默认值, 默认值为空,则不要写
function fillArytoCtrlSel(getTxt,CtrlName){
var ary1;
var ifenhao;
var ary2;
var tmpS;
var i_DefVal;
if ((getTxt!="")&&(document.all(CtrlName)!=null)){
    //清空列表项
    var length = document.all(CtrlName).length;
    for(j=0;j<length;j++){
    	document.all(CtrlName).options[0]=null;
    }
    
    
	i_DefVal=0;
	tmpS=""
	ifenhao=getTxt.indexOf(";");
	if (ifenhao!=-1)tmpS=getTxt.substr(ifenhao+1,(getTxt.length-ifenhao))
	getTxt=getTxt.substr(0,ifenhao);
	ary1=getTxt.split(",");
	if (tmpS=="")document.all(CtrlName).options[document.all(CtrlName).length]=new Option("","")
	for (i=0;i<ary1.length;i++){
		ary2=ary1[i].split("|");
		if (tmpS==ary2[1])i_DefVal=i;
		document.all(CtrlName).options[document.all(CtrlName).length]=new Option(ary2[0],ary2[1]);
	}
	document.all(CtrlName).selectedIndex=i_DefVal;
 }
}


//选中某一名字叫 checkboxname 的所有 CHECK框
function selectall(formname,chkallname,checkboxname){
//选中或不选所有表单name=formname且复选框name=checkboxname的复选框
//参照的复选框name="checkall"
    var cz=eval("document"+"."+formname+"."+chkallname);
	var of=eval("document"+"."+formname+"."+checkboxname);
	
    if (of==null){
	  alert("没有记录啊！");
	  return;
	}	
	if (of.length==null){
	    if ( of.disabled != true && cz.checked==true) {    
			  of.checked=true;
			}
			else{
			  of.checked=false;
			}
	}else{
		for(var i=0;i<of.length;i++){
		    if (of[i].disabled != true){
				if (cz.checked==true) {
				  of[i].checked=true;
				}
				else{
				  of[i].checked=false;
				}
		    }
		}
	}
}


//删除动态增加的行数据
function DelRow(Ftbname,FchkidName,FindexName,FtdshowName,leftmin){
var delcount;
var tblObj;
var tmp;
var tmpX;
var tmpY;
var delcount;
var a;

	if (document.all(FindexName).value=='')return false;
	tblObj=document.all(Ftbname);
	tblObj.style.display="";
	var e=document.all(FchkidName)
	delcount=0
	if (e.length>1){
		for (i=e.length-1;i>=0;i--){
			if (e[i].checked==true){
				tmp=FtdshowName+e[i].value;
				tmpX=e[i].value;
				tmpY=document.all(tmp).innerText
				tmp=tmpY-1;
				if (tblObj.rows.length==1){
					if (leftmin=='1'){return false;}
					tblObj.rows(0).cells(0).innerHTML="&nbsp;";
				}else{
					tblObj.deleteRow(tmp);
				}
				delcount=delcount+1;
				tmpV=(tmpX)+","
				tmp=document.all(FindexName).value;
				tmp=tmp.replace(tmpV,"");
				document.all(FindexName).value=tmp;
			}
		}
		if (delcount==0){
			alert("请选择要删除的记录!")
		}else{
			//处理提示信息
			tmp=document.all(FindexName).value
			a=tmp.split(",")
			for (j=0;j<a.length-1;j++){
				tmpV=FtdshowName+a[j];
				document.all(tmpV).innerText=(j+1);
			}
		}
	}else{
		if (e.length==null){		
			if (e.checked==true){
				if (leftmin=='1'){
				alert('不能删除唯一记录！')
				return false}					
				tblObj.rows(0).cells(0).innerHTML="&nbsp;";
				document.all(FindexName).value="";
			}else{
				alert("请选择要删除的记录!")
			}
		}else{
			if (e[0].checked==true){
				if (leftmin=='1'){
				alert('不能删除唯一记录！')
				return false}					
				tblObj.rows(0).cells(0).innerHTML="&nbsp;";
				document.all(FindexName).value="";
			}else{
				alert("请选择要删除的记录!")
			};
		}
	}
}

//金钱数字转人民币大写 num 就是数字,tarfield 指填充到那里显示中文
function chineseNumber(num,tarfield)
{
if(""==num){
	document.all(tarfield).value="";
	return;
}
if(parseFloat(num) == 0){
	document.all(tarfield).value="零圆整";
	return;
}
if (""==num || isNaN(num) || num > Math.pow(10, 12)) return ""
var cn = "零壹贰叁肆伍陆柒捌玖"
var unit = new Array("拾佰仟", "分角")
var unit1= new Array("万亿", "")
var numArray = num.toString().split(".")
var start = new Array(numArray[0].length-1, 2)

function toChinese(num, index)
{
	var num = num.replace(/\d/g, function ($1)
	{
	return cn.charAt($1)+unit[index].charAt(start--%4 ? start%4 : -1)
	})
	return num
}

for (var i=0; i<numArray.length; i++)
{
	var tmpD = ""
	for (var j=0; j*4<numArray[i].length; j++)
	{
		var strIndex = numArray[i].length-(j+1)*4
		var str = numArray[i].substring(strIndex, strIndex+4)
		var start = i ? 2 : str.length-1
		var tmp1 = toChinese(str, i)
		tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "")
		tmp1 = tmp1.replace(/^壹拾/, "拾")
		tmpD = (tmp1+unit1[i].charAt(j-1)) + tmpD
	}
	numArray[i] = tmpD 
}

	numArray[1] = numArray[1] ? numArray[1] : ""
	numArray[0] = numArray[0] ? numArray[0]+"圆" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "")
	numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1]+"整"
//return numArray[0]+numArray[1]
if (document.all(tarfield)!=null)document.all(tarfield).value=numArray[0]+numArray[1];
}

//费用预算控制
//前提所有的CHKECKBOX 都命名规则：chk1,chk2...或者 abc1,abc2如此连续编号
function jschkV(Fchkctrlname,Fctrlname,returnInfo){
	var tmp;
	if (Fchkctrlname.checked==true){
		if (returnInfo=="总经理额度"){
				tmp=Fchkctrlname.name.substr(Fchkctrlname.name.length-1,1)
				tmp=parseInt(tmp)-1
				tmp=Fchkctrlname.name.substr(0,Fchkctrlname.name.length-1)+tmp;
				if (document.all(tmp).checked==false){
					Fchkctrlname.checked=false;
					alert("必须先使用大区预算，总经理额度！ 请先勾选大区预算！")						
					return false;
				}
		}		
		if (document.all(Fctrlname).value==""){
			Fchkctrlname.checked=false;
			alert("' "+returnInfo+"' 不能为空,请输入！")
			document.all(Fctrlname).focus();
		}
	}else{
		if (returnInfo=="大区预算"){
				tmp=Fchkctrlname.name.substr(Fchkctrlname.name.length-1,1)
				tmp=parseInt(tmp)+1
				tmp=Fchkctrlname.name.substr(0,Fchkctrlname.name.length-1)+tmp;
				document.all(tmp).checked=false
		}
	}
}


//添加附件
function addAttach(Tmax){
var tmpHTML;
var tblObj;
var rownum;
var colnum;
var mi;
var ni;
var tmp;
var e;
var e1
var i;
var tmpV;
var currentIndex;

tblObj=document.all("attachTable");
rownum=tblObj.rows.length;
Tmax=Tmax+1;
if (Tmax<(rownum+1)){
	alert("本表单最多允许添加"+Tmax+"条记录！")
	return false;
}
Findex = Findex+1;
var currentIndex = Findex;
colnum=tblObj.rows(0).cells.length;
tblObj.insertRow();
tblObj.rows(rownum).insertCell();
tblObj.rows(rownum).cells(0).innerText="";
tblObj.rows(rownum).cells(0).id="attachTD"+currentIndex;
tmpHTML = "<table><tr><td width='88%' >";
tmpHTML = tmpHTML +" <input type='file' name='attachmentBean["+currentIndex+"].uploadFile' size='50' /> ";
tmpHTML = tmpHTML +" </td>";
tmpHTML = tmpHTML +" <td width='2%'></td>";
tmpHTML = tmpHTML +"<td width='10%'>";
tmpHTML = tmpHTML +"<input type='button' name='Submit52' value='删除' class='button_2' onclick='deleteAttach("+currentIndex+")'  >";
tmpHTML = tmpHTML +"</td></tr></table>";   
tblObj.rows(rownum).cells(0).innerHTML = tmpHTML;
}


//删除附件
function deleteAttach(selval){
	var delcount;
	var tblObj;
	var tmp;
	
	tblObj=document.all("attachTable");
	tmp="attachTD"+selval
		
	for (i=0;i<tblObj.rows.length;i++){
			if (tblObj.rows(i).cells(0).id==tmp){
				tblObj.deleteRow(i);
			}
	}		
	
}

//更新预算控制信息
//amout:总额
//varBudget取值:
//false:没有超预算
//true:已勾选且超预算
//-1:未勾选但超预算
function updateCredit(amount){
  var credit = 0;
  var balance = credit - parseFloat(amount);
   
   //默认为不超预算
   $("varBudget1").value="false";
	   if(parseFloat(balance) < 0 ){
		   if($F("creditControl.flag1") == "1"){
		     //勾选
		     credit = parseFloat(credit) + parseFloat($("creditControl.credit1").value);
		     balance = credit - parseFloat(amount);
		     if( parseFloat(balance) < 0 ){
		        $("varBudget1").value="true";
		     }
		   }else{
		     //未勾选
		     $("varBudget1").value="-1";
		   	
		   }
  	   }
  
   $("varBudget2").value="false";
   
   
   if(parseFloat(balance) < 0 ){
		   if($F("creditControl.flag3") == "1"){
		     //勾选
		     credit = parseFloat(credit) + parseFloat($("creditControl.credit3").value);
		     balance = parseFloat(credit) - parseFloat(amount);
		     if( parseFloat(balance) < 0 ){
		        $("varBudget2").value="true";
		     }
		   }else{
		     //未勾选
		     $("varBudget2").value="-1";
		   	
		   }
  	}
   
   
   
   $("varBudget3").value="false";
   
   
  if(parseFloat(balance) < 0 ){
		   if($F("creditControl.flag4") == "1"){
		     //勾选
		     credit = parseFloat(credit) + parseFloat($("creditControl.credit4").value);
		     balance = parseFloat(credit) - parseFloat(amount);
		     if( parseFloat(balance) < 0 ){
		        $("varBudget3").value="true";
		     }
		   }else{
		     //未勾选
		     $("varBudget3").value="-1";
		   	
		   }
  	}
  	
  	if(parseFloat(balance) < 0 ){
		   if($F("creditControl.flag5") == "1"){
		     //勾选
		     credit = parseFloat(credit) + parseFloat($("creditControl.credit5").value);
		     balance = parseFloat(credit) - parseFloat(amount);
		   }
  	}
   
   $("creditControl.balance").value = balance;
   
}

//检查预算勾选
function checkFlag(flagField,creditField,info,flagValueField){
  
  
  if(creditField.value=="" && flagField.checked){
     flagField.checked = false;
     alert("请先输入"+info);
     creditField.focus();
     return;
  }
  
  if(creditField.value!="" && parseFloat(creditField.value)<0 && flagField.checked){
     flagField.checked = false;
     alert(info+"必须大于0!");
     creditField.focus();
     return;
  }
  
  
  //将值赋到hidden变量中
  if(flagField.checked){
     flagValueField.value='1';
  }else{
  	 flagValueField.value='0';
  }
  
  
}

function ajaxsplit(s,code){
var ssa = s.split(";");

var tmps;
var tmpa;

for (var i=0;i<ssa.length;i++){

	tmps = ssa[i];
	tmpa = tmps.split("=");
	
	if (tmpa[0]==code){
	if (tmpa[1]=="null") return "";
	else return tmpa[1];
	
	}

}
}

// 检查一个字符串中是否含有空格
// 若有，则返回true；否则返回false
function checkSpace(string)
{
	var length=string.length;
	for(i=0;i<length;i++){
		if(string.charAt(i) == ' '){
			return true;
		}
	}
	return false;
}

//自适应窗口
window.onscroll = function () {
    var div = document.getElementById("divSuspended");
    if(div!=undefined)
    	div.style.top = document.body.scrollTop;       
}
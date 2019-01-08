//--------------------------------------------------------------------------
//Created BY JEFF_CHEN / 2003-02-10  MAIL:noncio@163.com  noncio@hotmail.com
//--------------------------------------------------------------------------

function trim(aStr) {
	return aStr.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
}

function validateRequiredFields( f ){
	for (var i=0; i < f.elements.length; i++)
	{
		try{
			e = f.elements[i];
		/*	将提交信息分割，放置在两个数组中,分割符#取最后的（true|false）*/
			//alert(e.title)
			 if (e.alt!=null){
			 if(e.style.display == "none")continue;
			 a = e.alt.split("#");
			//判断输入内容的类型："text", "select-one", "select-multiple", "textarea", ["checkbox", "radio"]
				if ( a[1] == "true" ) {
					switch (e.type) {
						case "text":
						if (trim(e.value) == "" ){
							alert("' " +a[0] + " ' 不能为空， 请重新输入！");
							e.focus();
							return false;}
							break;
						case "textarea":
						if ( trim(e.value) == "" ){
							alert("' " +a[0] + " ' 不能为空， 请重新输入！");
							e.focus();
							return false;}
							break;
						case "select-one":
						if (((e.length == 0)||(e.options[e.selectedIndex].text==""))||(trim(e.value)=="")){
							alert("' " +a[0] + " ' 不能为空， 请重新输入！");
							e.focus();
							return false;}
							break;
	                    case "select-multiple":
	                    if (e.length == 0){
							alert("' " +a[0] + " ' 不能为空， 请重新输入！");
							e.focus();
							return false;}
							break;
						case "checkbox":
							hasChecked = false;
							p = eval("e.form." + e.name);
							for (var r=0; r < p.length; r++){
								if ( p[r].checked ){hasChecked = true;};
							}
							if (!hasChecked) {
	 						  alert("' " +a[0] + " ' 不能为空， 请重新输入！");
								e.focus();
								return hasChecked;
							}
							break;
					case "radio":
							hasChecked = false;
							p = eval("e.form." + e.name);
							for (var r=0; r < p.length; r++){
								if ( p[r].checked ){hasChecked = true;};
							}
	
							if (!hasChecked) {
							  alert("' " +a[0] + " ' 不能为空， 请重新输入！");
								e.focus();
								return hasChecked;
							}
							break;
	                case "password":
						if ( trim(e.value) == "" ){
							alert("' " +a[0] + " ' 不能为空， 请重新输入！");
							e.focus();
							return false;
						}
							break;
					default:
							break;
					}
			} 
			switch (a[2]) {
	//		case "Date":
	//		  if (trim(e.value) != "" )
	//			if(!dateFormatOk(e.value, "-")){ 
	//	    		alert('请输入正确的日期格式（YYYY-MM-DD / 1999-12-01）');
	//	    		e.focus();
	//	    		return false;	
	//       			}	
	//		break;
			case "Date":
			  if (trim(e.value) != "" )
				if(!dateFormatOk(e.value, "-")){ 
		    		alert('请输入正确的日期格式（YYYY-MM-DD / 1999-12-01）');
		    		e.focus();
		    		return false;	
	       			}	
			break;
			case "Time":
			  if (trim(e.value) != "" )
				if(!timeFormatOK(e.value, ":")){ 
					alert('请输入正确的时间格式（HH:SS / 18:01）');
		    		e.focus();
		    		return false;
	       			}
				break;
			case "Datetime":
				if (trim(e.value) != "" )
				act=true;
				if (e.value.length!=16){
					act=false;
				}
				if ((e.value.indexOf("-")==-1)||(e.value.indexOf(":")==-1)||(e.value.indexOf(" ")==-1))act=false;
				tmp1=e.value.substr(0,e.value.indexOf(":")-3);
				tmp2=e.value.substr(e.value.indexOf(" ")+1,(e.value.length-e.value.indexOf(" ")));
				if(!dateFormatOk(tmp1, "-"))act=false;
				if(!timeFormatOK(tmp2, ":"))act=false;
				if (act==false){
					alert('请输入正确的时间格式（YYYY-MM-DD HH:SS / 1999-12-01 18:01）');
		    		e.focus();
		    		return false;
				}
				break;
			case "Number":
			  if (trim(e.value) != "" )
				if(isNaN(e.value)){
					alert(a[0]+"字段必须为数值型！");
					e.focus();
					return false;
				}
				break;
			case "Same":
			    var v2=eval("f."+a[3]+".value");
				if(!isSame(e.value,v2)){
					alert("两次输入的密码不一致！");
					e.focus();
					return false;
				}
				break;
			case "Max":
				if ( e.length > a[3]){
					alert("' " +a[0] + " ' 不能多与"+a[3]+"位， 请重新选择！");
					e.focus();
					return false;
				}
				break;
			case "Overline":
			  if (trim(e.value).length> a[3]){
				alert("' " +a[0] + " ' 不能多于"+a[3]+"个字， 请重新输入！");
	        	e.focus();
				return false;	    
			  }
			  break;
			case "email":
			  if(!(trim(e.value).indexOf("@")>0) && (trim(e.value).indexOf("@")<trim(e.value).length-1)){
			    alert("请输入正确的邮件地址！");
				e.focus();
				return false;
			  }
			  break;
			case "maxlength":
			  if(e.length>a[3]){
				alert("' " +a[0] + " ' 不能多于"+a[3]+"个， 请重新输入！");
	        	e.focus();
				return false;
			  }
			  //add 08070433  2012-12-28
			case "length":
			  if(e.value.length!=a[3]){
				alert("' " +a[0] + " ' 必须为"+a[3]+"位， 请重新输入！");
	        	e.focus();
				return false;
			  }
			  break;
			case "Similar"://相似
	          if((!trim(document.all(a[3]).value)=="")&&(trim(e.value)==trim(document.all(a[3]).value))){
			    alert("' "+a[0]+" ' 不能重复!");
				e.focus();
				return false;
			  }
	          break;
			case "CompDate"://比较日期
			  if (trim(document.all(a[3]).value)!="" && trim(document.all(a[4]).value)!=""  ){
				  srq = trim(document.all(a[3]).value);
				  erq = trim(document.all(a[4]).value);
				  if (srq > erq){
					   alert(a[5]);
					   document.all.enddate.focus();
					   return false;
				  }
			  }
			  break;
			case "outnum":
			  if(e.length>a[3]){
	            alert("超链接只能选择"+a[3]+"个!");
	            return false;
			  }
			  break;
			case "Money"://是金额 1个小数点，然后小数点后只能是2位
			  if (trim(e.value) != "")
				if(isNaN(e.value)){
					alert("请输入正确的货币内容！");
					e.focus();
					return false;
				}
				tmp=trim(e.value);
				tmp=tmp+"|";
				tmpV=tmp.indexOf(".");
				if ((tmpV!=0)&&(tmpV!=-1)){
					a=tmp.indexOf("|");
					if ((a-tmpV)>3){
						alert("请输入正确的货币内容！");
						return false;
					}
				}
			  break;		  
	 		default:
	          break;
			}
		  }
		}catch(err){return false;}
	}
	return true;
}

//判断时间组合起来是否正确
function istime(pHour, pSecond){
	var int_hour=parseInt(pHour,10);
	var int_second=parseInt(pSecond,10);
	
	hour_size = pHour.length;
	second_size = pSecond.length;
	
	if((hour_size!=2) || (second_size!=2)){return false;}
//判断时间组合
  	if ((int_hour<0) || (int_hour>24) || (int_second<0) || (int_second>59)){return false;
		 }else{
			if(int_hour==24 && int_second!=0){return false;}
			else{return true;}			
		}
}

//判断日，月，年组合起来后的正确性
function isdate(pDay, pMonth, pYear){
	var int_day=parseInt(pDay,10);
	var int_month=parseInt(pMonth,10);
	var int_year=parseInt(pYear,10);
	year_size=pYear.length;
	month_size=pMonth.length;
	day_size=pDay.length;

	if((year_size!=4) || (month_size!=2) || (day_size!=2)){return false;}

	//判断整个日期
	if(int_day>0 && int_day<32 && int_month>0 && int_month<13){		
	   if(int_month==2){
			if(int_year%4==0 && (int_year%100!=0 || int_year%400==0)){return (int_day<=29)?true:false;}
			else{return (int_day<=28)?true:false;}
		   }
	   else{
			if((int_month<8 && int_month%2!=0) || (int_month>7 && int_month%2==0)){return (int_day<=31)?true:false;}
			else{return (int_day<=30)?true:false;}
		   }
	}
	else {return false;}
}

//将日期分割成三个部分，赋值于: day, month, year
function explodeArray(item,delimiter) {
  tempArray=new Array(1);
  var Count=0;
  var tempString=new String(item);

  while (tempString.indexOf(delimiter)>0) {
    tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
    tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1); 
    Count=Count+1;
  }

  tempArray[Count]=tempString;
  return tempArray;
};


//判断三个值的正确性
function dateFormatOk(pCompoundDate, pDelimiter){
	dateArray = explodeArray(pCompoundDate, pDelimiter);
	
	date_year = dateArray[0];	
	date_month = dateArray[1];
	date_day = dateArray[2];
	
	if(!(isNaN(date_day) || isNaN(date_month) || isNaN(date_year))){
		return(isdate(date_day, date_month, date_year));
	}
	{
		return(false);		
	};
};

//判断时间是否正确
function timeFormatOK(pCompoundDate, pDelimiter){
	timeArray = explodeArray(pCompoundDate, pDelimiter);	

	time_hour = timeArray[0];
	time_second = timeArray[1];
	
	if(!(isNaN(time_hour) || isNaN(time_second))){
		return(istime(time_hour, time_second));	
	}
	{
		return(false);		
	}; 
};

//判断是否一样
function isSame(v1, v2){
   if (trim(v1)==trim(v2)){
      return (true);
   }else{
      return(false);
   }
}
//-----------------------------------------------------------------表单提交
function doSubmit(f, v){
	if (v){
		if ( validateRequiredFields( f ) ){ 			
			f.submit();			
		}else{
		   return(false);
		}
	} else {
		f.submit();
	}
}
//-----------------------------------------------------------------表单重置
//-----------------------------------------------------------------表单提交
function doSubmit1(f,v,ln){
	if (v){
		if ( validateRequiredFields( f ) ){
		    if ((ln.startdate!=null)&&(ln.startdate.value > ln.enddate.value)){
			    alert("'出发日期'大于'到达日期'");
			    return(false);
			}else if((ln.stardate!=null)&&(ln.startdate.value == ln.enddate.value)&&(ln.starttime.value >= ln.endtime.value)){
			    alert("'出发时间'大于等于'到达时间'");
			    return(false);
			}else if(ln.content!=null){
	  		    if(parseInt(ln.content.value) < parseInt(ln.capacity.value)){
			        alert("容量不够");
				    return(false);
				}else{
				  f.submit();
				}
			}else if((ln.cgrq!=null)&&(ln.cgrq.value>=ln.hgrq.value)){
			    alert("'出国日期'大于等于'回国日期'");
				return(false);
			}else if((ln.date!=null)&&(ln.date.value>ln.enddate.value)){
			    alert("'开始时间'大于'结束时间'");
				return(false);
			}else if((ln.date!=null)&&(ln.date.value==ln.enddate.value)&&(ln.time.value>=ln.endtime.value)){
			    alert("'开始时间'大于等于'结束时间'");
				return(false);
			}else if((ln.sdate!=null)&&(ln.sdate.value>ln.edate.value)){
			    alert("'开始时间'大于'结束时间'");
				return(false);
			}else{
			  f.submit();			
			}
		}else{
		   return(false);
		}
	} else {
		f.submit();
	}
}
//------------------------------------------------------------------表单重置
function doReset(f){
		f.reset();
}


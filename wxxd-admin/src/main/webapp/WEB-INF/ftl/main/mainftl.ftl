<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="keywords" content="" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>NPMS</title>

<link rel="stylesheet" href="${request.contextPath}/libs/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="${request.contextPath}/css/main.css">
<link rel="stylesheet" href="${request.contextPath}/libs/font-uxcool/font-uxcool.css">
<link rel="stylesheet" href="${request.contextPath}/libs/font-zg/style.css">
<link rel="stylesheet" href="${request.contextPath}/css/b.tabs.css">

<script type="text/javascript">
var ctx = '${request.contextPath}';

var user = ${Session.userInfoMapJson};
var username = user.userName;
</script>
<style type="text/css">
#pop{
	background:#fff;
	width:400px; 
	height:275px;
	font-size:12px;
	position:fixed;
	right:0;
	bottom:0;
}
.pro_bg {
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    padding-left: 10px;
    border-bottom: 2px solid #0091ff;
    background-color: #fff;
}
.dialog-body label {
    font-size: 16px;
    margin-bottom: 0;
    color:#000;
}
.dialog .close {
    font-size: 30px;
    width: 30px;
    height: 30px;
    color: #000;
    opacity: 0.6;
    font-weight: normal;
	text-decoration:none;    
}
.close {
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: .2;
}

.indexBg{position:fixed;height:100%;width:100%;z-index:0;}
.indexBg img{display:none;height:100%;height:100%;}
@media screen and (min-width: 1210px){
.indexBg{position:fixed;height:100%;width:100%;z-index:0;}
.indexBg img{display:block;}
  
 .logoutview{
    background: url(${request.contextPath}/css/images/ui-1.png) -305px -242px no-repeat;
    display: inline-block;
    height: 24px;
    margin: 0 5px;
    width: 23px;
    float: none;
    background-position: -314px -257px;
    text-indent: 0;
    }     
}

 .shensuo{
    background: url(${request.contextPath}/css/images/ui-1.png);
    display: inline-block;
    height: 24px;
    margin: -36px 12px -28px -1105px;
    width: 23px;
    float: none;
    background-position: -224px -197px;
    text-indent: 0;
    text-decoration: none;
    }  
    
.header {
  background: url("${request.contextPath}/css/images/1.jpg") no-repeat;
  background-size: cover;
  /*height: 100rem;*/
  /*height: 100%;*/
  overflow: hidden;
  /*margin-bottom: 70px;*/
  align-items: center;
}

.header__heading {
  text-align: center;
  text-shadow: 2px 1px 6px #000;
  font-size: 3.5em;
  font-weight: 400;
  margin: 20px 0 10px 28px;
}

.full-center {
  margin-left: 300px;
  position: absolute;
  padding: 7px 32px 10px 5px; 
  color: #fff;
  background: rgba(84,76,76,.4);
}

.subscribe {
  letter-spacing: 3px;
  font-weight: 300;
  text-align: center;
}

/*.ggg { 
  letter-spacing: 3px;
  font-weight: 300;
  text-align: center;
  margin-top:200px;
  }*/
  
</style>
</head>
<body>
	<header>      
		<div class="contentH">
			<span class="portal-logo l" style="font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;">
			 <b>NPMS</b><b id="pmcpbiaodian" style="font-size:15px">&nbsp;▪</b>
			 <small id="pmcpdesc">新一代价格管理系统</small> 			 
			</span>	
			<a href="javascript:switchTree()"><img class="switchTree" src="${request.contextPath}/css/images/other.png" style="float:left;margin-left:23px;margin-top:13px;width:27px;height:30px;"></a>
			<div class="admin-name" style="margin-top:12px;">
				<a style="color:white"><img style="margin-right:-10px;vertical-align: middle;margin-top: -7px;" src="${request.contextPath}/css/images/pc.png"></a>&nbsp;&nbsp;&nbsp;&nbsp;
				<span id="zg-username">
				<#assign userInfoMap=Session.userInfoMapJson?eval />
				${userInfoMap.userNickname!}(${userInfoMap.userName!})
				</span>&nbsp;&nbsp;&nbsp;&nbsp;
				<span>角色：${userInfoMap.userRoleName!}</span>&nbsp;&nbsp;&nbsp;&nbsp;
				<a href="${logoutUrl}" id="zg-logout" class="logoutview" title="注销"></a>
			</div>					
		</div>
	</header>   
	
	<!--
	<div class="indexBg">
    	       <img src="${request.contextPath}/images/suning.jpg" height="100%" width="100%" />
          </div>-->
   
   <div id="wrap">	 		 		
		<nav id="treeFlag">		
		<div class="sidebar" id="tree"></div>
		</nav>	
	 <div class="iframeBox">
	
      <div class="col-md-10" id="mainFrameTabs" style="padding : 0px;"> 
      
      <!-- Nav tabs -->
       <ul class="nav nav-tabs" role="tablist">      
        <li role="presentation" class="active noclose"><a href="#bTabs_navTabsMainPage"  data-toggle="tab">首页</a></li>     
       </ul>
      
      <!-- Tab panes -->
       <div class="tab-content">
              	    
	    <div class="tab-pane active" id="bTabs_navTabsMainPage">
	     <div class="header">
		        <div class="full-center">
		            <h2 class="header__heading">欢迎使用NPMS系统</h2>
		            <h3 class="subscribe">Welcome to NPMS!</h3>
		        </div>
	      </div>     
         </div>  
	    
       </div>   
       </div>
       </div>				   
	</div>
		           
    <script src="${request.contextPath}/libs/jquery/dist/jquery.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/dist/js/bootstrap.min.js"></script>
	<script src="${request.contextPath}/libs/bootstrap/js/bootbox.min.js"></script>
	<script src="${request.contextPath}/js/main/promotionpage.js"></script>
  	<script src="${request.contextPath}/js/easyBackground-min.js"></script>
	<script src="${request.contextPath}/js/main/b.tabs.js"></script>
  	<script src="${request.contextPath}/js/main/BootstrapMenu.min.js"></script>
  	<script src="${request.contextPath}/js/main/circleMagic.js"></script>
  	
	<script type="text/javascript">
 
		$(function(){
							
			//头部气泡效果
			$('.contentH').easyBackground({
		            wrapNeighbours: true
	          });
	           	     
	        //初始化标签页模块
	        $('#mainFrameTabs').bTabs();
	       	     
	         //首页效果
	        $('.header').circleMagic({
	            elem: '.header',
	            radius: 60,
	            densety: 0.03,
	            color: 'rgba(255,255,255, .4)',
	            color: 'random',
	            clearOffset: .3
	           });   	         	          	      
		   });
		   		          			  
	</script>
       
</body>
</html>
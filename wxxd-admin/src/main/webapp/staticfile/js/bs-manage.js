/*
 * Name:			bs-manage.js
 * Introduction:	苏宁开放平台内部管理系统——限价管理
 * Author：		    11112186
 * Time:			2013-11-26
 */
var bsManageSys = bsManageSys || {};
bsManageSys = {
	//输入框
	inputFocus:function(){
		$("body").delegate(".newinput,.newtextarea","focus",function(){	
			if($(this).hasClass("gray9")){
				$(this).attr("defaultValue",$(this).val());
				$(this).val('').removeClass("gray9")
			}
		})
		$("body").delegate(".newinput,newtextarea","blur",function(){
			if($(this).attr("defaultValue")){
				if($(this).val()=="" || $(this).val() == $(this).attr("defaultValue")){
					$(this).val($(this).attr("defaultValue")).addClass("gray9");
				}
			}			
		})		
	},
	//字数统计
	totalChar:function(i,t,l){
		i.keyup(function(){
			var _tL = $(this).val().length;
			if(_tL<=l){
				t.find('i').text(_tL+"/"+l);
			}else{
				var _aT = $(this).val().substring(0,l);
				$(this).val(_aT);
			}
		});
	},
	init:function(){
		this.inputFocus();
		this.totalChar($(".modifyprice").find("textarea"),$(".modifyprice").find(".limitchar"),50);
	}
}
$(function(){
	bsManageSys.init();
	bsTreeAction({
		tree:"bu-mo-tree",
		filterBox:$(".fbuchoosed"),
		dataBox:$(".bu-brandbox").find(".brand-result").children("ul"),
		searchBox:$(".bu-brandbox").find(".brand-search")
	});
	bsTreeAction({
		tree:"bu-tree-param"
	});
	//弹窗里tree
	bsTreeAction({
		tree:"pop-tree",
		filterBox:$(".popchoosed"),
		dataBox:$(".pop-brandbox").find(".brand-result").children("ul"),
		searchBox:$(".add-popwin").find(".brand-search")
	});
	choosePro({
		firstLevel:".catesearch1",
		secondLevel:".catesearch2",
		chooseLabelBox:".catchoosed"
	});
	choosePro({
		firstLevel:".pop-catesearch1",
		secondLevel:".pop-catesearch2",
		chooseLabelBox:".pop-catchoosed",
		isFilter:false
	});
})
/**
* 树结构功能
* tree:树class名
* filterBox:点击树时下方已选条件是否会有标签
* databBox:点击树末节点时加载品牌的容器
*/
function bsTreeAction(opt){
	var def = {
		tree:"",
		filterBox:'',
		dataBox:"",
		searchBox:''
	}
	$.extend(def,opt);
	var obj = $("."+def.tree);
	if(obj.length==0){return false;}
	var pathArr = [];//保存所选择树节点名称
	var pool = [];//品牌列表
	var box = def.filterBox;
	var len;
	function getSinglePro(_url){
		$.ajax({
			url:_url,
			dataType:"html",
			success:function(data){
				def.dataBox.html(data);
				for(var i=0;i<def.dataBox.children().length;i++){
					def.dataBox.children().eq(i).attr("relIndex",i);
					pool.push(def.dataBox.children().eq(i));
				}
			}
		})
	}
	//已选品牌	
	function filterEvent(arr){
		//点功能模块列时插入标签		
		var html = ""
		for(var i = 0;i<arr.length;i++){
			var lb = arr[i];
			if(lb.length>8){
				lb = lb.slice(0,8)+"...";
			}
			html += '<li><span>'+lb+'</span><a href="javascript:;"></a></li>';
		}
		box.find("ul").html(html);
		len = arr.length;
		//点品牌列时插入标签
		def.dataBox.undelegate('input','click').delegate("input","click",function(){
			var text = $(this).parent().text();
			$(this).attr("lastselected",true).parent().parent().siblings("li").find("input").removeAttr("lastselected");
			if(box.find("ul").children().length == len){
				box.find("ul").append($('<li relIndex="' + $(this).parent().parent().attr("relIndex") + '"><span>'+text.slice(0,8)+'</span><a href="javascript:;"></a></li>'));
			}else{
				box.find("ul").children().eq(len).html('<span>'+text.slice(0,8)+'</span><a href="javascript:;"></a>');
			}			
		});	
	}	
	//模糊搜索
	if(def.searchBox!=""){
		search();
	}
	function search(){
		def.searchBox.find(":text").keyup(function(){
			var len = pool.length;
			var filterArr=[]
			for(var i=0;i<len;i++){
				var index = pool[i].text().toLowerCase().indexOf($(this).val().toLowerCase());
				if(index!=-1){
					filterArr.push(pool[i])
				}
			}
			var html="";
			for(var i=0;i<filterArr.length;i++){
				html+="<li>"+filterArr[i].html()+"</li>";
			}
			def.dataBox.html(html);
		})
	}
}
/**
* 新增联系人页面选择商品
* 仅做示例，如需改动请自便。。
*/
function choosePro(opt){
	var def={
		firstLevel:'',
		secondLevel:'',
		chooseLabelBox:'',
		searchBox:'',
		isFilter:true
	}
	$.extend(def,opt);
	var fL = $(def.firstLevel);
	var sL = $(def.secondLevel);
	var sLul = sL.find(".brand-result").find("ul");
	var cLB = $(def.chooseLabelBox).find("ul");
	var shB = fL.find(".brand-search");
	var pool =[];
	var index;
	fL.find(".brand-result").undelegate("input","click").delegate("input","click",function(){
		if(def.isFilter){
			cLB.html("").hide();
			var text = $(this).parent().text().slice(0,8);
			cLB.show().append($('<li relIndex="'+index+'"><span>'+text+'</span><a href="javascript:;"></a></li>'));
		}
		var _url = $(this).attr("reldata");	
		var index = $(this).attr("relIndex");
		$.ajax({
			url:_url,
			dataType:"html",
			success:function(data){
				sLul.html(data);
				pool = [];
				for(var i=0;i<sLul.children("li").length;i++){
					sLul.children("li").eq(i).attr("relIndex",index+"-"+i);
					pool.push(sLul.children("li").eq(i));
				}
				//二级品类筛选
				search(sL,pool);
			}
		})
	})
	pool=[];
	for(var i=0;i<fL.find(".brand-result").find("ul").children("li").length;i++){
		pool.push(fL.find(".brand-result").find("ul").children("li").eq(i));
	}
	//右侧是复选框（弹窗里面）
	sLul.undelegate(":checkbox","click").delegate(":checkbox","click",function(){
		var text = $(this).parent().text().slice(0,8);	
		if($(this).attr("checked")){
			index = $(this).parent().parent().attr("relIndex");
			if(cLB.find('li[relIndex="' + index + '"]').length==0){
				cLB.append($('<li relIndex="'+index+'"><span>'+text+'</span><a href="javascript:;"></a></li>'));
				if(cLB.parent().height()>=120){
					cLB.height(120);
				}
				cLB.show();
			}
		}else{
			cLB.find('li[relIndex="' + $(this).parent().parent().attr("relIndex") + '"]').remove();
		}
	});
	//右侧是单选
	sLul.undelegate(":radio","click").delegate(":radio","click",function(){
		var text = $(this).parent().text().slice(0,8);	
		index = $(this).parent().parent().attr("relIndex");
		if(cLB.find("li").length==2){
			cLB.find("li").eq(1).html('<span>'+text+'</span><a href="javascript:;"></a>').attr("relIndex",index);
		}else{
			cLB.append('<li relIndex="'+index+'"><span>'+text+'</span><a href="javascript:;"></a></li>');
		}
		if(cLB.parent().height()>=120){
			cLB.height(120);
		}
		cLB.show();
	})
	
	cLB.undelegate("a","click").delegate("a","click",function(){
		var m = $(this).parent().attr("relIndex");
		if(def.isFilter){
			$(this).parent().next().remove().end().remove();
		}else{
			$(this).parent().remove();
		}		
		sLul.children('li[relIndex="'+m+'"]').find("input").attr("checked",false);
		if(cLB.find("li").length==0){
			cLB.hide();
		}
	})	
	//一级品类筛选
	search(fL,pool);
	function search(f,d){		
		if(f.length==0){return false;}
		f.undelegate("input","keyup").delegate("input","keyup",function(){
			var len = d.length;
			var filterArr=[];
			for(var i=0;i<len;i++){
				index = d[i].find("label").text().toLowerCase().indexOf($(this).val().toLowerCase());
				if(index!=-1){
					filterArr.push([d[i],d[i].attr("relIndex")]);
				}
			}
			var html="";
			for(var i=0;i<filterArr.length;i++){
				html += '<li relIndex="' + filterArr[i][1] + '">'+filterArr[i][0].html() + '</li>';
			}
			f.find(".brand-result").find("ul").html(html).find("input");
		})
	}
}

/**
 * SRMP Project UI tools.
 * 
 * <pre>
 * 封装一些常用的界面UI效果，入alert、confirm、弹出层等;
 * 主要基于layer.js的一些功能进行简化，方便项目中使用;
 * 引用此js之前需要引用jquery.js与layer.js
 * </pre>
 * 
 * @author 12110775
 * @time 2015-07-30 17:50
 * @version 1.0
 */
LayerUtil = function(){
	
	var thisObj = this;
	
	// alert msg等图标标识  用法：LayerUtil.ICON.WARNING
	this.ICON = {
		WARNING : 0, // 警告图标
		SUCCESS : 1, // 成功图标
		ERROR : 2, // 失败图标
		QUESTION : 3, // 询问图标
		LOCK : 4, // 锁图标
		CRY : 5, // 沮丧图标
		SMILE : 6 // 笑脸图标
	};
	
	/**
	 * alert效果
	 * 
	 * @param msg
	 * 		需要alert的信息
	 * @param 
	 * 		iconIndex 参照UITools.ICON
	 */ 
	this.alert = function(msg,iconIndex, afterFunction){
		//layer.alert(msg,{skin: 'layui-layer-lan'});
		if(commonUtil.isEmpty(iconIndex)){
			layer.alert(msg,function(index){
				layer.close(index);
				if(afterFunction && (afterFunction instanceof Function)){
					afterFunction();//回调
		        };
			});
		} else {
			layer.alert(msg, {icon: iconIndex},function(index){
				layer.close(index);
				if(afterFunction && (afterFunction instanceof Function)){
					afterFunction();//回调
		        };
			});
		}
	};
	
	/**
	 * 询问确认框效果
	 * 
	 * @param text 
	 * 		询问框显示信息
	 * @param trueFunction
	 * 		点击“是”进入的方法
	 * @param falseFunction
	 * 		点击“否”进入的方法
	 */
	this.confirm = function(text,trueFunction,falseFunction){
		layer.confirm(text, {
		    btn: ['是','否'],
		    icon: thisObj.ICON.QUESTION
		}, function(){
			if(trueFunction && (trueFunction instanceof Function)){
	            trueFunction();//true回调
	        };
		}, function(){
			if(falseFunction && (falseFunction instanceof Function)){
				falseFunction();//false回调
	        };
		});
	};
	
	
	/**
	 * layer弹出层open后只有内置的按钮、图表等能直接操作弹出层，自定义按钮等操作需使用
	 * layer的index标记，这样做起来代码中就稍微有点麻烦，一个页面弹出层多的话不易于管理；
	 * 故做一下简单封装
	 * 保存弹出层对应的元素标识，取消开发过程中在业务代码中标注弹出层index.
	 * 
	 * 供下面openDialog 和 closeDialog方法
	 * 
	 * key = generate key
	 * value = Pop layer index
	 */ 
	var layerIndexMap = new Map();
	
	/**
	 * 打开弹出层
	 * 
	 * tips: 常用弹出层功能，如需复杂功能，请使用layer.js中原生api
	 * 
	 * @param element 
	 * 		jquery识别的元素标识  如 #id .class 等
	 * @param params 
	 * 		{title:'标题',width:'100px',height:'100px'} ，
	 * 		title:false 则不显示标题
	 */
	var openDialog = function(element,params){
		if(!commonUtil.isEmpty(element)){
			
			// 如果这个层之前已经弹出，则覆盖原先记录
			var radomKey = $(element).attr("layer-index-code");
			if(commonUtil.isEmpty(radomKey)){
				radomKey = commonUtil.randomKey(20);
			}
			
			// 如未传入title参数，则取element的title属性值，传入title参数的话则覆盖默认element的title属性值
			var title = !commonUtil.isEmpty(params['title']) ? params['title'] : $(element).attr('title');
			var layerIndex = layer.open({
			    type: 1,
			    title: title, //不显示标题
			    closeBtn: 0,
			    content: $(element), //捕获的元素
			    area: [params['width'], params['height']], //宽高
			    cancel: function(index){
			        layer.close(index);
			        layerIndexMap.remove(radomKey);
			    }
			});
			$(element).attr("layer-index-code", radomKey);
			layerIndexMap.put(radomKey,layerIndex);
		}
	};
	
	/**
	 * 关闭弹出层
	 * 
	 * @param element 
	 * 		jquery识别的元素标识  如 #id .class等
	 */
	var closeDialog = function(element){
		if(!commonUtil.isEmpty(element)){
			var layerIndexCode = $(element).attr("layer-index-code");
			var layerIndex = layerIndexMap.get(layerIndexCode);
			if(!commonUtil.isEmpty(layerIndex)){
				layer.close(layerIndex);
				layerIndexMap.remove(layerIndex);
			}
		}
	};
	
	/**
	 * 打开/关闭弹出层
	 * 
	 * tips: 常用弹出层功能，如需复杂功能，请使用layer.js中原生api
	 * 
	 * @param dictate
	 * 		'open' or 'close'指令，打开或者弹出层
	 * @param element 
	 * 		jquery识别的元素标识  如 #id .class 等
	 * @param params 
	 * 		{title:'标题',width:'100px',height:'100px'} ，
	 * 		title:false 则不显示标题
	 */
	this.dialog = function(dictate,element,params){
		if(dictate == "open"){
			openDialog(element,params);
		} else if(dictate == "close"){
			closeDialog(element);
		} else {
			layer.msg('代码配置有误，请检查');
			//console.log("order invalid.");
		}
	};
	
	//提示层
	this.msg = function(content){
		layer.msg(content);
	};
};

var LayerUtil = new LayerUtil();
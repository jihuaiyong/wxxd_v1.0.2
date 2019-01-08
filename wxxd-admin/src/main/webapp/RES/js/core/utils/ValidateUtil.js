/**
 * SRMP Project validate component
 * 
 * <pre>
 * 
 *  简易封装校验组件适当减少一些js代码开发量，支持空值、长度、ajax校验以及一些正则方法校验，
 *  长度校验和ajax校验单独进行判断，其他校验方式在<code>functionMap</code>中进行配置:
 *    a) key值为校验类型
 * 	  b) value值中设置需要调用的校验方法和错误提示信息
 *  
 * 	示例： 
 *  1) 用户名不能为空
 *  <input type="text" id="userName" validateType="REQUIRED" label="用户名"/>
 *  
 *  2) 用户名不能为空且长度在5-10之间
 *  <input type="text" id="userName" validateType="REQUIRED#LENGTH" minLen="5" maxLen="10" label="用户名"/>
 *  
 *  3) 用户名不能为空且需校验是否存在(ajax同步请求后台)
 *  <input type="text" id="userName" validateType="REQUIRED#AJAX" ajaxFunction="user.isExistUser" label="用户名"/>
 *  user.isExistUser 为自定义ajax方法，
 *  参数为文本框值，返回值为文本，返回为空则视为校验通过，返回不为空则为校验失败提示信息
 *  
 *  等等...
 * </pre>
 * 
 * @time 2015-08-04
 * @author 12110775
 * @version 1.0
 */
ValidateUtil = function(){
	
	// 可自己扩展
	var functionMap = new Map();
	functionMap.put("REQUIRED",{'function':'commonUtil.isNotEmpty','msg':"不能为空"});
	functionMap.put("EMAIL",{'function':'commonUtil.isEmail','msg':"格式不正确"});
	functionMap.put("USER_NAME",{'function':'commonUtil.isUserName','msg':"格式不正确"});
	functionMap.put("NUMERIC",{'function':'commonUtil.isNumeric','msg':"格式不正确"});
	functionMap.put("AMOUNT",{'function':'commonUtil.isAmount','msg':"格式不正确"});
	functionMap.put("INTEGER",{'function':'commonUtil.isInteger','msg':"格式不正确"});
	functionMap.put("LOGIC_CODE",{'function':'commonUtil.isLogicCode','msg':"格式不正确，可由字母数字下划线任意组合"});
	
	
	/**
	 * Validate form field
	 * 
	 * @param validateType
	 * 			REQUIRED | LENGTH | AJAX | EMAIL | NUMBRIC | FLOAT | USER_NAME等
	 * @param fieldValue 
	 * 			Form field value
	 * @param label
	 * 			Form field label
	 */
	var validateField = function(entry){
	
		$(entry).css("border-color","");	
		
		var validateType = $(entry).attr("validateType");
		var fieldValue = $(entry).val();
		fieldValue = null == fieldValue ? "" : fieldValue;
		var label = $(entry).attr("label");
	
		var types = validateType.split("#");
		var falseFlag = 0;
		for (var i = 0; i < types.length; i++) {
			
			// 长度验证，属性值为 validateType='LENGTH', minLen, maxLen, label
			if(types[i] == "LENGTH"){
				
				var minLength = $(entry).attr("minLen"); // 获取最小长度
				var maxLength = $(entry).attr("maxLen"); // 获取最大长度
				var fieldValLength = commonUtil.getLength(fieldValue); // 获取控件值的长度
				
				// 最小和最大宽度都为空，忽略长度校验
				if(commonUtil.isEmpty(minLength) && commonUtil.isEmpty(maxLength)){
					return;
				}
				
				var tipMsg = "";
				// 长度校验
				if (!commonUtil.isEmpty(minLength) && commonUtil.isEmpty(maxLength) 
						&& fieldValLength < Number(minLength)) {
					tipMsg = label + "长度不能小于" + minLength + "个字符.";
				} else if (commonUtil.isEmpty(minLength)
						&& !commonUtil.isEmpty(maxLength)
						&& fieldValLength > Number(maxLength)) {
					tipMsg = label + "长度不能大于" + maxLength + "个字符.";
				} else if (!commonUtil.isEmpty(minLength)
						&& !commonUtil.isEmpty(maxLength)
						&& (fieldValLength > Number(maxLength) || fieldValLength < Number(minLength))) {
					tipMsg = label + "长度需在" + minLength + "-" + maxLength + "个字符之间.";
				} 
				
				if (tipMsg != ""){
					falseFlag ++;
					$(entry).css("border-color","red");
					layer.tips(tipMsg, $(entry),{tipsMore : true});
					return;
				}
			} 
			// validate type为 AJAX的时候，需是同步ajax方法，且参数为控件值，返回值为msg text，text为空则校验成功
			// 不为空则视为错误信息，显示在tips中; 属性值为 validateType='AJAX', ajaxFunction
			else if (types[i] == "AJAX") {
				var ajaxFunction = $(entry).attr("ajaxFunction");
				var oldValue = $(entry).attr("oldValue");
				// 原值不为空的情况下为编辑时校验是否重复，修改的值如果与原值一样则不校验
				if ((commonUtil.isEmpty(oldValue) || $.trim(fieldValue) != $.trim(oldValue))
						&& !commonUtil.isEmpty(ajaxFunction)) {
					var msg = eval(ajaxFunction + "('" + fieldValue + "')");
					if (!commonUtil.isEmpty(msg)) {
						falseFlag++;
						$(entry).css("border-color", "red");
						layer.tips(msg, $(entry), {
							tipsMore : true
						});
						return;
					}
				}
			} else {
				var mapValue = functionMap.get(types[i]);
				if (!commonUtil.isEmpty(mapValue) && !commonUtil.isEmpty(mapValue['function'])) {
					var flag = eval(mapValue['function'] + "('" + fieldValue + "')");
					if (!flag) {
						falseFlag++;
						$(entry).css("border-color", "red");
						layer.tips(label + mapValue['msg'], $(entry), {tipsMore : true});
						return;
					}
				}
			}
		}
		
		return falseFlag;
	};
	
	/**
	 * Execute validate form field
	 */
	this.validate = function(element){
		
		var falseFlag = 0;
		
		var inputs = $(element).find("input[validateType]");

		if(!commonUtil.isEmpty(inputs) && inputs.length > 0){
			$.each(inputs, function(i, entry){
				falseFlag += validateField(entry);
			});
		}
		
		var selects = $(element).find("select[validateType]");
		if(!commonUtil.isEmpty(selects) && selects.length > 0){
			$.each(selects, function(i, entry){
				falseFlag += validateField(entry);
			});
		}
		
		var textareas = $(element).find("textarea[validateType]");
		if(!commonUtil.isEmpty(textareas) && textareas.length > 0){
			$.each(textareas, function(i, entry){
				falseFlag += validateField(entry);
			});
		}
		
		return falseFlag == 0;
	};
};
var ValidateUtil = new ValidateUtil();
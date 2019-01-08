$().ready( function() {
		$.validator.setDefaults({
			errorClass: "fieldError",
			ignore: ".ignore",
			ignoreTitle: true,
			onkeyup: false,
			focusInvalid:false,
			focusCleanup:true,
			errorPlacement: function(error, element) {
				var fieldSet = element.closest("div.field").next("div[class*='msg']");
				if (fieldSet.size() > 0) {
					error.appendTo(fieldSet);
				} else {
					error.insertAfter(element);
				}
			},
			submitHandler: function(form) {
				$(form).find(":submit").prop("disabled", true);
				form.submit();
			}
		});
		
		$.validator.addMethod("ignoreStr", function(value, element, params){  
			if(value == params){
				return false;
			}
			return true;
        }, "必填");
		
		$.validator.addMethod("radioSex", function(value, element, params){
			if(value == ""){
				return false;
			}
			return true;
        }, "请选择性别");
		
		$.validator.addMethod("remoteRsa", function(value, element, params){
			var status = true;
			$.ajax({
				url: params.rsaUrl,
				type: "GET",
				async: false,
				dataType: "json",
				cache: false,
				success: function(data) {
					var rsaKey = new RSAKey();
					rsaKey.setPublic(b64tohex(data.modulus), b64tohex(data.exponent));
					var enPassword = hex2b64(rsaKey.encrypt($.trim(value)));
					var datas = {};
					datas[params.data] = enPassword;
					$.ajax({
						url: params.url,
						type: params.type,
						dataType: "json",
						async: false,
						cache: params.cache,
						data: datas,
						success: function(data) {
							if(data){
								status = true;
							}else{
								status = false;
							}
						},
						error:function(){
							status = false;
						}
					});
				},
				error:function(){
					status = false;
				}
			});
			return status;
        }, "您输入的密码错误");
		
		$.validator.addMethod("equals", function(value, element, params){
			if($.trim(value) == params){
				return false;
			}
			return true;
        }, "");
});
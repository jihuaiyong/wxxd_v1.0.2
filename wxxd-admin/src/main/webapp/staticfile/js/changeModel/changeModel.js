        function changeCmmdtyModel(){
            var cmmdtyCode = $("#cmmdtyCode").val();
            if ( cmmdtyCode.length < 18 && cmmdtyCode.length != 0){
					for(var i = cmmdtyCode.length; i < 18; i++){
					    cmmdtyCode = "0" + cmmdtyCode;
					}
         	        $("#cmmdtyCode").val(cmmdtyCode);
                }
        }
        
        function changeCityToModel(){
            var cityTo = $("#cityTo").val();
            if ( cityTo.length < 12 && cityTo.length != 0){
					for(var i = cityTo.length; i < 12; i++){
					    cityTo = "0" + cityTo;
					}
         	        $("#cityTo").val(cityTo);
                }
        }
    
        function changeSupplierNoModel(){
            var supplierNo = $("#supplierNo").val();
            if ( supplierNo.length < 10 && supplierNo.length != 0){
					for(var i = supplierNo.length; i < 10; i++){
					    supplierNo = "0" + supplierNo;
					}
         	        $("#supplierNo").val(supplierNo);
                }
        }
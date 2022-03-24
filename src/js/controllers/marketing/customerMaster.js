erpConfig.moduleFiles.customerMaster = function(context) {
	 var mappingField = null;
    return {
		callBackAdd: function () {
            // mappingField = angular.copy(context.controller.form.mapping.fields);
            // context.controller.form.mapping.fields = [];
			// context.controller.methods.updateFieldMapping(mappingField);
        },
		callbackList(){
			//context.controller.form.mapping.fields = mappingField;
		},
        updateFieldMapping: function (mappingField) {
           for (var i in context.controller.data.mapping) {
                context.controller.form.mapping.fields[i] = mappingField;
                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields[i]['operationFrom'], {
                    partNo: context.controller.data.mapping[i].id
                });
            }
        }
    };
};
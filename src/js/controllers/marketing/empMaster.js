erpConfig.moduleFiles.empMaster = function(context) {
    return {
        callBackChangeMapping: function(mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
			var operationTo = context.controller.form.mapping.fields['operationTo'];
            context.commonFact.getOperationFromFlow(operationTo, restriction);
        },
        callBackEdit: function() {
            context.controller.data.mapping = !context.controller.data.mapping && context.controller.masterData.mapping || context.controller.data.mapping;
        }
    };
};
erpConfig.moduleFiles.empMaster = function(context) {
    return {
        updateStage: function(mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
            field.options = {};
            context.commonFact.getOperationFromFlow(field, restriction);
        },
        callBackEdit: function() {
            context.controller.data.mapping = !context.controller.data.mapping && context.controller.masterData.mapping || context.controller.data.mapping;
        }
    };
};
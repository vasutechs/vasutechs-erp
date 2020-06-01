erpConfig.moduleFiles.empMaster = function() {
    return {
        callBackChangeMapping: function(context, mappingData, key, field, fieldMapKey) {

        },
        updateStage: function(context, mappingData, key, field, _this) {
            var restriction = {
                partNo: mappingData.id
            };
            field.options = {};
            context.methods.getOperationFromFlow(context, field, restriction);
        },
        callBackEdit: function(context) {
            context.data.mapping = !context.data.mapping && context.masterData.mapping || context.data.mapping;
        }
    };
};
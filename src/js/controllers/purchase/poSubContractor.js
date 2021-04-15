erpConfig.moduleFiles.poSubContractor = function (context) {
    var mappingField = null;
    return {
        callBackAdd: function () {
            mappingField = angular.copy(context.controller.form.mapping.fields);
            context.controller.form.mapping.fields = [];
        },
        callBackChangeMapping: function () {
            context.controller.methods.updateMappingPart();
        },
        updateMappingPart: function () {
            for (var i in context.controller.data.mapping) {
                context.controller.form.mapping.fields[i] = angular.copy(mappingField);
                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields[i]['operationFrom'], {
                    partNo: context.controller.data.mapping[i].id
                });

                context.controller.data.mapping[i].uomCode = context.controller.form.mapping.fields[i].id.options[context.controller.data.mapping[i].id] && context.controller.form.mapping.fields[i].id.options[context.controller.data.mapping[i].id].uomCode;
            }
        },
        checkOperation: function (data, keyData, field, fieldKey) {
            if (data.id) {
                var restriction = {
                    partNo: data.id,
                    startWith: data.operationFrom
                };
                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields[fieldKey]['operationTo'], restriction);
            }
        }
    };
};

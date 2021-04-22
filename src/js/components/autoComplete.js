erpConfig.moduleFiles.autoComplete = function () {
    return {
        link: function (scope, element, attrs) {
            if (attrs.field) {
                scope.$watch(attrs.field, function (value) {
                    scope.field = value;
                    scope.context.commonFact.startAutoComplete(element, attrs, scope.field);
                });
            } else {
                scope.context.commonFact.startAutoComplete(element, attrs, scope.field, scope.map, scope.key);
            }
            if (attrs.value) {
                scope.$watch(attrs.value, function (value) {
                    if (scope.map !== undefined && scope.key !== undefined) {
                        scope.field.autoCompleteModel[scope.key] = scope.context.commonFact.replaceFieldVal(scope.map[scope.field.id], scope.field);
                    } else {
                        scope.field.autoCompleteModel = scope.context.commonFact.replaceFieldVal(scope.context.controller.data[scope.field.id], scope.field);
                    }
                });
            }
        }
    };
};

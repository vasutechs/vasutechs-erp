erpConfig.moduleFiles.autoComplete = function() {
    return {
        link: function(scope, element, attrs) {
            if (attrs.field) {
                scope.$watch(attrs.field, function(value) {
                    scope.field = value;
                });
            }
            scope.context.commonFact.startAutoComplete(element, attrs);
        }
    };
};
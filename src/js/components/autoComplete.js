erpConfig.moduleFiles.autoComplete = function () {
    return {
        link: function (scope, element, attrs) {
            element.ready(function () {

                if (attrs.field) {
                    scope.$watch(attrs.field, function (value) {
                        scope.field = value;
                        scope.context.commonFact.startAutoComplete(element, attrs, scope.field);

                    });

                } else {
                    scope.context.commonFact.startAutoComplete(element, attrs, scope.field, scope.map, scope.key);

                }

            });
        }
    };
};

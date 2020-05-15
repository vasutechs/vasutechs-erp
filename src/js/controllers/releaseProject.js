erpApp.controller('releaseProjectCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var moduleField = context.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.actions.makeModuleOptions(context, context.appConfig.modules, moduleField);
        },
        makeModuleOptions: function(context, modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '/' + module.id || module.id;
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (module.defaultRelease === undefined) {
                    field.allOptions[optionIdVal] = module;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!module.page) {
                        context.actions.makeModuleOptions(context, context.actions.showSubModule(modules[i]), field, modules[i]);
                    }
                }
            }
        },
        callBackSubmit: function(context, data) {
            var id = data.id;
            window.open('/releaseProject/' + id);
        }
    }
    commonFact.initCtrl($scope, 'releaseProject', actions);

}]);
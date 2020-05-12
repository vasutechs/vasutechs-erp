erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var moduleField = context.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.actions.makeModuleOptions(context, context.appConfig.modules, moduleField);
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.form.mapping.fields['restrictUser'].options['ADMIN'] = adminOption;
        },
        makeModuleOptions: function(context, modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + module.id || module.id;
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                field.allOptions[optionIdVal] = module;
                field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                field.options[optionIdVal] = field.allOptions[optionIdVal];

                if (!module.page) {
                    context.actions.makeModuleOptions(context, context.actions.showSubModule(modules[i]), field, modules[i]);
                }
            }
        }
    }
    commonFact.initCtrl($scope, 'admin.settings', actions).then(function() {
        if ($scope.context.lastData === undefined) {
            $scope.context.actions.add($scope.context);
        } else {
            $scope.context.actions.edit($scope.context, $scope.context.lastData.id);
        }
    });

}]);
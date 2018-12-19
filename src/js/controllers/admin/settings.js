erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var moduleField = context.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.actions.makeModuleOptions(context, context.appConfig.modules, moduleField);
        },
        makeModuleOptions: function(context, modules, field, parentModule) {
            for (var i in modules) {
                var optionVal = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + optionVal.id || optionVal.id;
                var optionNameVal = parentModule && '-- ' + optionVal.title || optionVal.title;
                //if (optionVal.page) {
                field.allOptions[optionIdVal] = optionVal;
                field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                field.options[optionIdVal] = field.allOptions[optionIdVal];
                //}
                if (!optionVal.page) {
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
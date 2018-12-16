erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var pageIdField = context.form.mapping.fields['pageId'];
            pageIdField.options = {};
            pageIdField.allOptions = {};
            context.actions.makeModuleOptions(context, context.appConfig.modules, pageIdField);
        },
        makeModuleOptions: function(context, module, field) {
            for (var i in module) {
                var optionVal = angular.copy(module[i]);
                var optionIdVal = i;
                var optionNameVal = optionVal.title;
                //if (optionVal.page) {
                    field.allOptions[optionIdVal] = optionVal;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];
                //}
                if(!optionVal.page){
                    context.actions.makeModuleOptions(context, context.actions.showSubModule(module[i]), field);
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
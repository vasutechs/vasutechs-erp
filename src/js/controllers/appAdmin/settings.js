erpApp.controller('settingsCtrl', ['$scope', 'commonFact', function($scope, commonFact) {
    var actions = {
        callBackList: function(context) {
            var moduleField = context.form.mapping.fields['module'];
            moduleField.options = {};
            moduleField.allOptions = {};
            context.actions.makeModuleOptions(context, context.erpAppConfig.modules, moduleField);
            var adminOption = {
                userType: 'ADMIN',
                desc: 'ADMIN',
                optionName: 'ADMIN',
                optionId: 'ADMIN'
            };
            context.form.mapping.fields['restrictUser'].options['ADMIN'] = adminOption;
            if (context.lastData === undefined) {
                context.actions.add(context);
            } else {
                context.actions.edit(context, context.lastData.id);
            }
        },
        makeModuleOptions: function(context, modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + module.id || module.id;
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (i !== 'disable') {
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
    }
    commonFact.initCtrl($scope, 'appAdmin.settings', actions);

}]);
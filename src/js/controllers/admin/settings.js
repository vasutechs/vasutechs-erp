erpConfig.moduleFiles.settings = function(context) {
    return {
        callBackList: function() {
            if(context.controller.form.mapping){
                var moduleField = context.controller.form.mapping.fields['module'];
                moduleField.options = {};
                moduleField.allOptions = {};
                context.controller.methods.makeModuleOptions(context.erpAppConfig.modules.controllers, moduleField);
            }
            if (context.controller.lastData === undefined) {
                context.commonFact.add();
            } else {
                context.commonFact.edit(context.controller.lastData.id);
            }
        },
        callBackEdit: function(){
            var custumOption = {
                userType: 'all',
                optionName: 'All',
                optionId: 'all'
            };
            if(context.controller.form.mapping) { 
                context.controller.form.mapping.fields['restrictUser'].options['all'] = custumOption;
            }
        },
        makeModuleOptions: function(modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '.' + module.id || module.id;
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (!module.disable) {
                    field.allOptions[optionIdVal] = module;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!module.page) {
                        context.controller.methods.makeModuleOptions(context.commonFact.showSubModule(modules[i]), field, modules[i]);
                    }
                }
            }
        }
    };
};
erpConfig.moduleFiles.appCustomers = function(context) {
    var editKey = null;
    var editAppCustomer = null;
    var defaultReleaseModules = [];
    return {
        callBackEdit: function() {
            editKey = context.controller.page.editKey;
            var appSettings = {
                id: 'settings',
                params: {
                    appCustomer: editKey
                }
            };
            context.commonFact.getData(appSettings, editKey).then(function(res) {
                editAppCustomer = res.data;
            });
        },
        callBackAdd: function() {
            editKey = null;
            editAppCustomer = null;
            if(!context.controller.data.appModules){
                context.controller.data.appModules = [];
            }
            context.controller.data.appModules = context.controller.data.appModules.concat(defaultReleaseModules);
        },
        callBackList: function() {
            var moduleField = context.controller.form.fields['appModules'];
            moduleField.options = {
                all: {
                    'optionName': 'All',
                    'optionId': 'all'
                }
            };
            moduleField.allOptions = {
                all: {
                    'optionName': 'All',
                    'optionId': 'all'
                }
            };
            defaultReleaseModules = [];
            context.controller.methods.makeModuleOptions(erpConfig.modules.controllers, moduleField);
        },
        makeModuleOptions: function(modules, field, parentModule) {
            for (var i in modules) {
                var module = angular.copy(modules[i]);
                var optionIdVal = parentModule && parentModule.id + '/' + module.id || module.id + '/**';
                var optionNameVal = parentModule && '-- ' + module.title || module.title;
                if (module.defaultRelease === true) {
                    defaultReleaseModules.push(optionIdVal); 
                }
                // else{
                    field.allOptions[optionIdVal] = module;
                    field.allOptions[optionIdVal]['optionName'] = optionNameVal;
                    field.allOptions[optionIdVal]['optionId'] = optionIdVal;
                    field.options[optionIdVal] = field.allOptions[optionIdVal];

                    if (!module.page) {
                        context.controller.methods.makeModuleOptions(context.commonFact.showSubModule(modules[i]), field, modules[i]);
                    }
               // }
            }
        },
        callBackSubmit: function(data) {
            var appCustomer = data.id;
            var userData = {
                userName: data.companyName.replace(' ', '').toLowerCase(),
                password: data.companyName.replace(' ', '').toLowerCase(),
                userType: 'ADMIN'
            };
            var appSettings = {
                id: 'settings',
                params: {
                    appCustomer: appCustomer
                }
            };

            var appUsers = {
                id: 'users',
                params: {
                    appCustomer: appCustomer
                }
            };
            editAppCustomer = angular.extend(editAppCustomer || {}, { id: appCustomer, appModules: data.appModules, isSale: true, companyName: btoa(data.companyName + '-' + context.erpAppConfig.appName) });
            context.commonFact.updateData(appSettings, editAppCustomer).then(function() {
                !editKey && context.commonFact.updateData(appUsers, userData);
            });
        },
        callBackDelete: function(id) {
            var removeAppCustomer = {
                dataUri: 'removeAppCustomer',
                params: {
                    appCustomer: id
                }
            };
            context.commonFact.getData(removeAppCustomer);
        },
        downloadAppCustomer: function(id) {
            window.open('/api/auth/downloadAppCustomers/?id=' + id);
        },
        appCustomerlogin: function(id) {
            var appCustomerlogin = {
                dataUri: 'appCustomerlogin',
                params: {
                    appCustomer: id
                }
            };
            context.commonFact.getData(appCustomerlogin).then(function(res) {
                var userDetail = res.data;
                if (userDetail && userDetail.userType) {
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link, true);
                }
            });
        }
    };
};
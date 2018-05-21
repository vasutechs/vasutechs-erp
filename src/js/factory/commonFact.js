erpApp.factory('commonFact', ['serviceApi', '$location', function(serviceApi, $location) {
    var defaultActions = {
        add: function(context) {
            context.page.name = 'add';
            for (var key in context.data) {
                if (context.data[key] !== null && typeof(context.data[key]) === 'object') {

                } else if (key === 'date') {
                    context.data[key] = new Date();
                } else {
                    context.data[key] = null;
                }
            }
            if (context.form.autoGenKey) {
                context.actions.setAutoGenKey(context);
            }
            context.page.editKey = undefined;
            context.actions.callBackAdd && context.actions.callBackAdd(context);
        },
        edit: function(context, key) {
            var serviceconf = {
                url: context.services.list.url + "/" + key,
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
                if (context.data['date']) {
                    context.data['date'] = new Date(context.data['date']);
                }
                context.actions.callBackEdit && context.actions.callBackEdit(context, key);
            });
            context.page.name = 'edit';
            context.page.editKey = key;
        },
        delete: function(context, key) {
            var serviceconf = {
                url: context.services.list.url,
                method: 'POST'
            };
            serviceApi.callServiceApi(serviceconf, { key: key, delete: 'yes' });
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, key);
        },
        list: function(context) {
            context.page.name = 'list';
            serviceApi.callServiceApi(context.services.list).then(function(res) {
                context.listViewData = res.data;
                context.lastData = context.listViewData[context.listViewData.length - 1];
                context.actions.callBackList && context.actions.callBackList(context);
            });
        },
        submit: function(context) {
            var serviceconf = {
                url: context.page.editKey >= 0 ? context.services.list.url + '/' + context.page.editKey : context.services.list.url,
                method: 'POST'
            };
            serviceApi.callServiceApi(serviceconf, context.data);
            context.page.name = 'list';
            context.actions.list(context);
            context.actions.callBackSubmit && context.actions.callBackSubmit(context);
        },
        cancel: function(context) {
            context.page.name = 'list';
        },
        makeOptionsFields: function(serviceConf, options, optionName, optionId) {
            var list;
            //Get Part master data
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                for (var i in list) {
                    options[list[i].id] = list[i];
                    options[list[i].id]['optionName'] = list[i][optionName];
                    options[list[i].id]['optionId'] = optionId && list[i][optionId] || list[i]['id'];
                }
            });
        },
        addMapping: function(mapping) {
            var newMapping = angular.extend({}, mapping[0]);
            for (var mapKey in newMapping) {
                newMapping[mapKey] = null;
            }
            mapping.push(newMapping);
        },
        removeMapping: function(mapping, key) {
            delete mapping.splice(key, 1);
        },
        changeMapping: function(mapping, key, field) {
            for (var mapKey in mapping) {
                if (key === null) {
                    mapping[mapKey] = null;
                } else if (field.options[key][mapKey] && typeof(field.options[key][mapKey]) !== 'object' && (field.updateData && field.updateData.indexOf(mapKey) >= 0 || field.updateData === undefined)) {
                    mapping[mapKey] = field.options[key][mapKey];
                }
            }
        },
        setAutoGenKey: function(context) {
            var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
            lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : 1;
            context.data[context.form.autoGenKey] = lastDataKey;
            context.actions.callBackSetAutoGenKey && context.actions.callBackSetAutoGenKey(context);
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
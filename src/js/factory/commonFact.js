erpApp.factory('commonFact', ['serviceApi', '$location', function(serviceApi, $location) {
    var defaultActions = {
        add: function(context) {
            context.page.name = 'add';
            for (var key in context.data) {
                if (typeof(context.data[key]) === 'object') {

                } else {
                    context.data[key] = '';
                }
            }
            if(context.form.autoGenKey){
                context.actions.setAutoGenKey(context);
            }
            context.page.editKey = undefined;
        },
        edit: function(context, key) {
            var serviceconf = {
                url: context.services.list.url + "/" + key,
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
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
        },
        list: function(context) {
            context.page.name = 'list';
            serviceApi.callServiceApi(context.services.list).then(function(res) {
                context.listViewData = res.data;
                context.lastData = context.listViewData[context.listViewData.length - 1];
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
        },
        cancel: function(context) {
            context.page.name = 'list';
        },
        makeOptionsFields: function(serviceConf, options, optionName) {
            var list;
            //Get Part master data
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                for (var i in list) {
                    options[list[i].id] = list[i];
                    options[list[i].id]['name'] = list[i][optionName];
                }
            });
        },
        addMapping: function(mapping) {
            var newMapping = angular.extend({}, mapping[0]);
            for (var mapKey in newMapping) {
                newMapping[mapKey] = '';
            }
            mapping.push(newMapping);
        },
        removeMapping: function(mapping, key) {
            delete mapping.splice(key, 1);
        },
        changeMapping: function(mapping, key, options) {
            for (var mapKey in mapping) {
                if(options[key][mapKey]){
                 mapping[mapKey] = options[key][mapKey];
                }
            }
        },
        setAutoGenKey: function(context){
            var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
             lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : 1;
            context.data[context.form.autoGenKey] = lastDataKey;
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
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
            context.page.printView = undefined;
            context.actions.callBackAdd && context.actions.callBackAdd(context);
        },
        edit: function(context, key, printView) {
            var serviceconf = {
                url: context.services.list.url + "/" + key,
                method: 'GET'
            };
            context.page.name = 'edit';
            context.page.printView = printView;
            context.page.editKey = key;

            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
                if (context.data['date']) {
                    context.data['date'] = context.actions.dateFormatChange(context.data['date']);
                }
                context.actions.callBackEdit && context.actions.callBackEdit(context, key);
            });

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
                context.lastData = context.listViewData[Object.keys(context.listViewData)[Object.keys(context.listViewData).length - 1]];
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
        displayViewDataVal: function(serviceConf, data, dataKey, replaceDataKey, isMapping) {
            var list;
            //Get Part master data
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                if (isMapping) {
                    for (var i in data) {
                        data[i][dataKey] = list[data[i][dataKey]][replaceDataKey];
                    }
                } else {
                    data[dataKey] = list[data[dataKey]][replaceDataKey];
                }
            });
        },
        makeOptionsFields: function(serviceConf, options, optionName, optionId, filter) {
            var list;
            //Get Part master data
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                for (var i in list) {
                    if (filter === undefined || filter[Object.keys(filter)[0]] === list[i][Object.keys(filter)[0]]) {
                        options[list[i].id] = list[i];
                        options[list[i].id]['optionName'] = list[i][optionName];
                        options[list[i].id]['optionId'] = optionId && list[i][optionId] || list[i]['id'];
                    }
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
        changeMapping: function(context, data, key, field) {
            for (var mapKey in data) {
                if ( (field.updateData && field.updateData.indexOf(mapKey) >= 0) || field.updateData === undefined) {
                    if (key === null) {
                        data[mapKey] = null;
                    } else if(field.options[key][mapKey]){
                        if (typeof(field.options[key][mapKey]) !== 'object') {
                            data[mapKey] = field.options[key][mapKey];
                        } else if (field.updateMapping) {
                            for (var mapKey1 in field.options[key][mapKey]) {
                                var copyDataMapKey = angular.copy(data[mapKey][0]);
                                if (field.options[key][mapKey][mapKey1] !== null || field.options[key][mapKey][mapKey1] !== '') {
                                    data[mapKey][mapKey1] = angular.extend(copyDataMapKey, field.options[key][mapKey][mapKey1]);
                                }
                            }
                        }
                    }
                }
            }
            context.actions.callBackChangeMapping && context.actions.callBackChangeMapping(data, key, field);
        },
        setAutoGenKey: function(context) {
            var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
            lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : 1;
            context.data[context.form.autoGenKey] = lastDataKey;
            context.actions.callBackSetAutoGenKey && context.actions.callBackSetAutoGenKey(context);
        },
        dateFormatChange: function(dateValue) {
            dateValue = new Date(dateValue);
            return dateValue.getDate() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getFullYear();
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
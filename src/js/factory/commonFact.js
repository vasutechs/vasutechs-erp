erpApp.factory('commonFact', ['erpAppConfig', 'serviceApi', '$location', function(erpAppConfig, serviceApi, $location) {
    var defaultActions = {
        add: function(context) {
            context.page.name = 'add';
            context.data = angular.copy(context.masterData);
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
                    context.data['date'] = context.page.printView ? context.actions.dateFormatChange(context.data['date']) : new Date(context.data['date']);
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
                for (var i in context.listView) {
                    if (context.listView[i].dataFrom) {
                        context.actions.replaceViewDataVal(context.listViewData, context.listView[i]);
                    }
                }
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
        getData: function(module, id) {
            var list,
                serviceConf = angular.copy(eval('erpAppConfig.modules.' + module + '.services.list'));
            serviceConf.url = id ? serviceConf.url + '/' + id : serviceConf.url
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf);
        },
        updateData: function(module, data, id) {
            var list,
                serviceConf = angular.copy(eval('erpAppConfig.modules.' + module + '.services.list'));
            if (id != undefined) {
                serviceConf.url = serviceConf.url + '/' + id;
            }
            serviceConf.method = 'POST';
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf, data);
        },
        replaceViewDataVal: function(viewData, field) {
            var list,
                serviceConf = angular.copy(eval('erpAppConfig.modules.' + field.dataFrom + '.services.list'));
            //Get Part master data
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                if (field.isSingle) {
                    viewData[field.value] = viewData[field.value] ? list[viewData[field.value]][field.replaceValue] : '';
                } else {
                    for (var i in viewData) {
                        viewData[i][field.value] = viewData[i][field.value] ? list[viewData[i][field.value]][field.replaceValue] : '';
                    }
                }

            });
        },
        makeOptionsFields: function(field) {
            var list,
                serviceConf = eval('erpAppConfig.modules.' + field.dataFrom + '.services.list');
            var matchFilter = function(field, list) {
                var returnFlag = false;
                for (var i in field.filter) {
                    if (field.filter[i] != list[i]) {
                        return false;
                    } else {
                        returnFlag = true;
                    }
                }
                return returnFlag;
            };
            if (field.filter) {
                field.options = {};
            }
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                for (var i in list) {
                    if (field.filter === undefined || matchFilter(field, list[i]) === true) {
                        field.options[list[i].id] = list[i];
                        field.options[list[i].id]['optionName'] = field.optionFieldNamePrefix && field.optionFieldNamePrefix || '';
                        field.options[list[i].id]['optionName'] += field.optionFieldNamePrefixData && list[i][field.optionFieldNamePrefixData] + '-' || '';
                        field.options[list[i].id]['optionName'] += list[i][field.optionFieldName];
                        field.options[list[i].id]['optionId'] = field.optionId && list[i][field.optionFieldId] || list[i]['id'];
                    }
                }
            });
            return true;
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
                if ((field.updateData && field.updateData.indexOf(mapKey) >= 0) || field.updateData === undefined) {
                    if (key === null) {
                        data[mapKey] = context.masterData[mapKey];
                    } else if (field.options[key][mapKey]) {
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
        },
        timeFormatChange: function(value) {
            value = new Date(value);
            return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
        },
        getOperationFromFlow: function(context, field) {
            if (context.data.partNo) {
                context.actions.makeOptionsFields(field);
                var localOptions = field.options;
                serviceApi.callServiceApi({
                    url: 'api/flowMaster/data',
                    method: 'GET'
                }).then(function(res) {
                    var flowMasterData = res.data;
                    field.options = {};
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === context.data.partNo) {
                            for (var j in flowMasterData[i].mapping) {
                                if(! field.startWith || field.startWith < flowMasterData[i].mapping[j].id){
                                    field.options[flowMasterData[i].mapping[j].id] = localOptions[flowMasterData[i].mapping[j].id];
                                }
                            }
                        }
                    }
                });
            }
        },
        updatePartStock: function(context) {
            var serviceconf = {
                url: 'api/partStock/data',
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationFrom + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                var existingStock = partStock[context.data.partNo + '-' + context.data.operationFrom + '-' + context.data.operationTo];
                var partStockQty = existingStock && parseInt(existingStock.partStockQty) + parseInt(context.data.acceptedQty) || parseInt(context.data.acceptedQty);
                var data = {
                    id: existingStock && existingStock.id || undefined,
                    partNo: context.data.partNo,
                    partStockQty: partStockQty,
                    operationFrom: context.data.operationFrom,
                    operationTo: context.data.operationTo
                }
                serviceconf = {
                    url: existingStock ? 'api/partStock/data/' + existingStock.id : 'api/partStock/data',
                    method: 'POST'
                }
                serviceApi.callServiceApi(serviceconf, data);

                var existingPrevStock = partStock[context.data.partNo + '-' + context.data.operationFrom];
                if (existingPrevStock) {
                    partStockQty = parseInt(existingPrevStock.partStockQty) - parseInt(context.data.acceptedQty);
                    data = {
                        id: existingPrevStock.id,
                        partNo: context.data.partNo,
                        partStockQty: partStockQty,
                        operationFrom: existingPrevStock.operationFrom,
                        operationTo: existingPrevStock.operationTo
                    }
                    serviceconf = {
                        url: 'api/partStock/data/' + existingPrevStock.id,
                        method: 'POST'
                    }
                    serviceApi.callServiceApi(serviceconf, data);
                }
            });
        },
        updateMaterialIssue: function(context, replaceData, key) {
            context.actions.getData('production.materialIssueNote', key).then(function(res) {
                var updateData = res.data;
                updateData = angular.extend(updateData, replaceData);
                context.actions.updateData('production.materialIssueNote', updateData, key);
            });
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
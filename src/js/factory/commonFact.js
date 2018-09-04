erpApp.factory('commonFact', ['erpAppConfig', 'serviceApi', '$location', function(erpAppConfig, serviceApi, $location) {
    var defaultActions = {
        add: function(context) {
            context.page.name = 'add';
            context.data = angular.copy(context.masterData);
            if (context.form.autoGenKey) {
                context.actions.setAutoGenKey(context);
            }
            if (context.data.date === null) {
                context.data.date = new Date();
            }
            context.page.editKey = undefined;
            context.page.printView = undefined;
            context.actions.callBackAdd && context.actions.callBackAdd(context);
        },
        edit: function(context, key, printView) {
            var serviceconf = this.getServiceConfig(context.services.list, 'GET', key);
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
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            serviceApi.callServiceApi(serviceconf, { key: key, delete: 'yes' });
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, key);
        },
        list: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            context.page.name = 'list';
            context.listViewData = [];
            context.orderByProperty = 'updated';
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var listViewData = res.data;
                context.lastData = listViewData[Object.keys(listViewData)[Object.keys(listViewData).length - 1]];
                for (var i in context.listView) {
                    if (context.listView[i].dataFrom) {
                        context.actions.replaceViewDataVal(listViewData, context.listView[i]);
                    } else if (context.listView[i].type) {
                        context.actions.replaceViewDataVal(listViewData, context.listView[i]);
                    }
                }
                for (var x in listViewData) {
                    listViewData.hasOwnProperty(x) && context.listViewData.push(listViewData[x])
                }
                context.actions.callBackList && context.actions.callBackList(context);
            });
        },
        submit: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST', context.page.editKey);

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
                serviceConf = this.getServiceConfig(module, 'GET', id);
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf);
        },
        updateData: function(module, data, id) {
            var list,
                serviceConf = this.getServiceConfig(module, 'POST', id);
            //Get Part master data
            return serviceApi.callServiceApi(serviceConf, data);
        },
        replaceViewDataVal: function(viewData, field) {
            var list,
                serviceConf,
                self = this,
                listReplace = function(field) {
                    for (var i in viewData) {
                        if (field.type === 'date') {
                            viewData[i][field.id] = self.dateFormatChange(viewData[i][field.id]);
                        } else {
                            viewData[i][field.id] = viewData[i][field.id] ? list[viewData[i][field.id]][field.replaceName] : '';
                            viewData[i][field.id] = field.replaceNamePrefix ? field.replaceNamePrefix + viewData[i][field.id] : viewData[i][field.id];
                        }
                    }
                };
            //Get Part master data
            if (field.dataFrom) {
                serviceConf = self.getServiceConfig(field.dataFrom);
                serviceApi.callServiceApi(serviceConf).then(function(res) {
                    list = res.data;
                    if (field.isSingle) {
                        viewData[field.id] = viewData[field.id] ? list[viewData[field.id]][field.replaceName] : '';
                        viewData[field.id] = field.replaceNamePrefix ? field.replaceNamePrefix + viewData[field.id] : viewData[field.id];
                    } else {
                        listReplace(field);
                    }

                });
            } else {
                listReplace(field);
            }

        },
        makeOptionsFields: function(field) {
            var list,
                serviceConf = this.getServiceConfig(field.dataFrom),
                matchFilter = function(field, list) {
                    var returnFlag = false;
                    for (var i in field.filter) {
                        if (typeof(field.filter[i]) === 'object' && field.filter[i].indexOf(list[i]) < 0) {
                            return false;
                        } else if (typeof(field.filter[i]) !== 'object' && field.filter[i] != list[i]) {
                            return false;
                        } else {
                            returnFlag = true;
                        }
                    }
                    return returnFlag;
                },
                optionsPromiseResolve, optionsPromise = new Promise(function(resolve, reject) {
                    optionsPromiseResolve = resolve;
                });
            if (field.filter) {
                field.options = {};
            }
            serviceApi.callServiceApi(serviceConf).then(function(res) {
                list = res.data;
                for (var i in list) {
                    if (field.filter === undefined || matchFilter(field, list[i]) === true) {
                        field.options[list[i].id] = list[i];
                        field.options[list[i].id]['optionName'] = field.replaceNamePrefix && field.replaceNamePrefix || '';
                        field.options[list[i].id]['optionName'] += field.replaceNamePrefixData && list[i][field.replaceNamePrefixData] + ' - ' || '';
                        field.options[list[i].id]['optionName'] += list[i][field.replaceName];
                        field.options[list[i].id]['optionId'] = field.optionId && list[i][field.optionFieldId] || list[i]['id'];
                    }
                }
                optionsPromiseResolve();
            });
            return optionsPromise;
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
            for (var dataKey in data) {
                if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                    if (key === null) {
                        data[dataKey] = context.masterData[dataKey];
                    } else if (field.options[key][dataKey]) {
                        if (typeof(field.options[key][dataKey]) !== 'object') {
                            data[dataKey] = field.options[key][dataKey];
                        } else if (field.updateMapping) {
                            data[dataKey] = angular.copy(context.masterData[dataKey]);
                            for (var mapKey in field.options[key][dataKey]) {
                                var copyDataMapKey = angular.copy(context.masterData[dataKey][0]);
                                if (field.options[key][dataKey][mapKey] !== null || field.options[key][dataKey][mapKey] !== '') {
                                    data[dataKey][mapKey] = angular.extend(copyDataMapKey, field.options[key][dataKey][mapKey]);
                                    for (var mapFieldKey in context.form.mapping.fields) {
                                        var mapfield = context.form.mapping.fields[mapFieldKey];
                                        if (mapfield.action && context.actions[mapfield.action]) {
                                            if (mapfield.type === 'select') {
                                                context.actions[mapfield.action](context, data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            field.callBack !== false && context.actions.callBackChangeMapping && context.actions.callBackChangeMapping(context, data, key, field);
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
        getOperationFromFlow: function(context, field, partNo, source) {
            partNo = partNo || context.data.partNo;
            if (partNo) {
                context.actions.makeOptionsFields(field);
                var localOptions = field.options;
                var serviceconf = this.getServiceConfig('production.flowMaster');
                serviceApi.callServiceApi(serviceconf).then(function(res) {
                    var flowMasterData = res.data;
                    field.options = {};
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === partNo) {
                            for (var j in flowMasterData[i].mapping) {
                                if ((!field.startWith || (field.startWith < flowMasterData[i].mapping[j].id)) && (!field.endWith || (field.endWith > flowMasterData[i].mapping[j].id)) && flowMasterData[i].mapping[j].source === source) {
                                    field.options[flowMasterData[i].mapping[j].id] = localOptions[flowMasterData[i].mapping[j].id];
                                }
                            }
                        }
                    }
                });
            }
        },
        updatePartStock: function(context) {
            var self = this;
            var serviceconf = self.getServiceConfig('report.partStock');
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
                serviceconf = serviceconf = existingStock && self.getServiceConfig('report.partStock', 'POST', existingStock.id) || self.getServiceConfig('report.partStock', 'POST');
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
                    serviceconf = self.getServiceConfig('report.partStock', 'POST', existingPrevStock.id);
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
        },
        updatePartTotal: function(context, data, newValue, mapKey) {
            var total = 0,
                totalBeforTax = 0,
                qty = data.receivedQty || data.acceptedQty;
            totalBeforTax = qty * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100));
            data.total = parseFloat(total).toFixed(2);
            context.actions.callBackUpdatePartTotal && context.actions.callBackUpdatePartTotal(context, data, newValue, mapKey);

        },
        getServiceConfig: function(module, replaceMethod, appendValue) {
            var serviceConfig = angular.copy(typeof(module) !== 'object' ? eval('erpAppConfig.modules.' + module + '.services.list') : module);
            serviceConfig.url = serviceConfig.url.replace('{{YEAR}}', new Date().getFullYear());
            serviceConfig.url = appendValue ? serviceConfig.url + '/' + appendValue : serviceConfig.url;
            serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
            return serviceConfig;
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
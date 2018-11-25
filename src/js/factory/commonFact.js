erpApp.factory('commonFact', ['erpAppConfig', 'serviceApi', '$filter', function(erpAppConfig, serviceApi, $filter) {
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
                context.printData = angular.copy(context.data);
                context.actions.callBackEdit && context.actions.callBackEdit(context, key);
            });

        },
        printView: function(context, key, printView) {
            this.edit(context, key, printView);
        },
        disable: function(context, key) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            context.listViewDataMaster[key]['disabled'] = true;
            serviceApi.callServiceApi(serviceconf, context.listViewData[key]);
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, key);
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
            context.currentPage = 0;
            context.pageSize = 10;
            context.filterBy = [];
            context.listViewData = [];
            context.orderByProperty = 'updated';
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var listViewData = res.data;
                for (var x in listViewData) {
                    listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.listViewData.push(listViewData[x])
                }
                context.listViewDataMaster = angular.copy(context.listViewData);
                context.lastData = context.listViewData[context.listViewData.length - 1];
                for (var i in context.listView) {
                    if (context.listView[i].dataFrom) {
                        context.actions.replaceViewDataVal(context.listViewData, context.listView[i]);
                    } else if (context.listView[i].type) {
                        context.actions.replaceViewDataVal(context.listViewData, context.listView[i]);
                    }
                }
                context.actions.callBackList && context.actions.callBackList(context);
            });
        },
        getPageData: function(context) {
            return $filter('filter')(context.listViewData, context.filterBy) || [];
        },
        numberOfPages: function(context) {
            return Math.ceil(context.actions.getPageData(context).length / context.pageSize);
        },
        submit: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');

            serviceApi.callServiceApi(serviceconf, context.data).then(function() {
                context.actions.callBackSubmit && context.actions.callBackSubmit(context);
                context.page.name = 'list';
                context.actions.list(context);
            });;

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
                        var orgViewDataFieldId = viewData[i][field.id];
                        if (field.type === 'date' || field.inputType === 'date') {
                            viewData[i][field.id] = self.dateFormatChange(viewData[i][field.id]);
                        } else {
                            viewData[i][field.id] = (viewData[i][field.id] && list[orgViewDataFieldId]) ? list[viewData[i][field.id]][field.replaceName] : '';
                            viewData[i][field.id] = field.replaceNamePrefix ? field.replaceNamePrefix + viewData[i][field.id] : viewData[i][field.id];
                            viewData[i][field.id] = field.replaceNamePrefixData ? list[orgViewDataFieldId][field.replaceNamePrefixData] + ' - ' + viewData[i][field.id] : viewData[i][field.id];
                        }
                    }
                };
            //Get Part master data
            if (field.dataFrom) {
                serviceConf = self.getServiceConfig(field.dataFrom);
                serviceApi.callServiceApi(serviceConf).then(function(res) {
                    var orgViewDataFieldId = viewData[field.id];
                    list = res.data;
                    if (field.isSingle) {
                        viewData[field.id] = (viewData[field.id] && list[viewData[field.id]]) ? list[orgViewDataFieldId][field.replaceName] : '';
                        viewData[field.id] = field.replaceNamePrefix ? field.replaceNamePrefix + viewData[field.id] : viewData[field.id];
                        viewData[field.id] = field.replaceNamePrefixData ? list[orgViewDataFieldId][field.replaceNamePrefixData] + ' - ' + viewData[field.id] : viewData[field.id];
                    } else {
                        listReplace(field);
                    }

                });
            } else {
                listReplace(field);
            }

        },
        matchFilter: function(field, list, context) {
            var returnFlag = false;
            if (context && context.page.name === 'edit') {
                return true;
            }
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
        makeOptionsFields: function(context, field) {
            var self = this,
                list;

            field.options = {};

            return context.actions.getData(field.dataFrom).then(function(res) {
                list = res.data;
                for (var i in list) {
                    var optionIdVal = field.optionId && list[i][field.optionFieldId] || list[i]['id'];
                    var isCheckExistVal = context.actions.findObjectByKey(context.listViewDataMaster, field.id, optionIdVal);
                    if ((field.filter === undefined || self.matchFilter(field, list[i], context) === true) &&
                        (field.existingCheck === undefined || !isCheckExistVal || optionIdVal === context.data[field.id])) {
                        field.options[list[i].id] = list[i];
                        field.options[list[i].id]['optionName'] = field.replaceNamePrefix && field.replaceNamePrefix || '';
                        field.options[list[i].id]['optionName'] += field.replaceNamePrefixData && list[i][field.replaceNamePrefixData] + ' - ' || '';
                        field.options[list[i].id]['optionName'] += list[i][field.replaceName];
                        field.options[list[i].id]['optionId'] = optionIdVal;
                    }
                }
                return field;
            });
        },
        addMapping: function(mapping) {
            var newMapping = angular.extend({}, mapping[0]);
            for (var mapKey in newMapping) {
                newMapping[mapKey] = null;
            }
            mapping.push(newMapping);
        },
        removeData: function(data, key) {
            delete data.splice(key, 1);
        },
        changeMapping: function(context, data, key, field, mapKey) {
            for (var dataKey in data) {
                if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                    if (key === null) {
                        data[dataKey] = context.masterData[dataKey];
                    } else if (key !== undefined && field.options[key][dataKey]) {
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
                                                context.actions[mapfield.action](context, data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield, mapKey);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            field.callBack !== false && context.actions.callBackChangeMapping && context.actions.callBackChangeMapping(context, data, key, field, mapKey);
        },
        setAutoGenKey: function(context) {
            var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
            lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : context.form.autoGenValStart ? context.form.autoGenValStart : 1;
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
        getOperationFromFlow: function(context, field, restriction) {
            var self = this,
                partNo = restriction.partNo || context.data.partNo,
                limit = 0;
            var returnPromise = [];
            var partStockPromise;
            if (partNo) {
                context.actions.makeOptionsFields(context, field);
                var localOptions = field.options;
                partStockPromise = context.actions.getData('production.flowMaster').then(function(res) {
                    var flowMasterData = res.data,
                        flowMasterVal;
                    field.options = {};
                    for (var i in flowMasterData) {
                        if (flowMasterData[i].partNo === partNo) {
                            var flowMapPromise = context.actions.mergeOprFlowMap(context, flowMasterData[i].mapping).then(function(flowMasterMap) {
                                var startWith = context.actions.findObjectByKey(flowMasterMap, 'id', restriction.startWith);
                                flowMasterMap = context.actions.objectSort(flowMasterMap, 'opCode');
                                for (var j in flowMasterMap) {
                                    flowMasterVal = flowMasterMap[j];
                                    if ((!restriction.limit || limit < restriction.limit) &&
                                        (!restriction.startWith || (startWith.opCode < flowMasterVal.opCode)) &&
                                        (restriction.filter === undefined || self.matchFilter(restriction, flowMasterVal) === true)) {
                                        limit++;
                                        field.options[' ' + flowMasterVal.id] = localOptions[flowMasterVal.id];
                                    }
                                }
                            });
                            returnPromise.push(flowMapPromise);
                        }
                    }
                });
            }
            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updatePartStock: function(context) {
            var self = this;
            var serviceconf = self.getServiceConfig('report.partStock');
            var returnPromise = [];
            var partStockPromise = serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationFrom + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                var existingStock = partStock[context.data.partNo + '-' + context.data.operationFrom + '-' + context.data.operationTo];
                var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(context.data.acceptedQty) : parseInt(context.data.acceptedQty);
                if (context.updateCurStock === undefined || context.updateCurStock) {
                    var data = {
                        id: existingStock && existingStock.id || undefined,
                        partNo: context.data.partNo,
                        partStockQty: partStockQty,
                        operationFrom: context.data.operationFrom,
                        operationTo: context.data.operationTo
                    }
                    serviceconf = serviceconf = existingStock && self.getServiceConfig('report.partStock', 'POST') || self.getServiceConfig('report.partStock', 'POST');
                    returnPromise.push(serviceApi.callServiceApi(serviceconf, data).then(function() {
                        context.actions.getPartStock(context);
                    }));
                }

                var existingPrevStock = partStock[context.data.partNo + '-' + context.data.operationFrom];
                if (existingPrevStock && (context.updatePrevStock === undefined || context.updatePrevStock)) {
                    var existPartStockQty = parseInt(context.data.acceptedQty);
                    existPartStockQty += parseInt(context.data.rejectionQty) || 0;
                    existPartStockQty += parseInt(context.data.rwQty) || 0;
                    existPartStockQty = parseInt(existingPrevStock.partStockQty) - parseInt(existPartStockQty);
                    data = {
                        id: existingPrevStock.id,
                        partNo: context.data.partNo,
                        partStockQty: existPartStockQty,
                        operationFrom: existingPrevStock.operationFrom,
                        operationTo: existingPrevStock.operationTo
                    }
                    serviceconf = self.getServiceConfig('report.partStock', 'POST');
                    returnPromise.push(serviceApi.callServiceApi(serviceconf, data).then(function() {
                        context.actions.getPartStock(context);
                    }));
                }
            });
            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updateSCStock: function(context) {
            var self = this;
            var serviceconf = self.getServiceConfig('report.subContractorStock');
            var returnPromise = [];
            var partStockPromise = serviceApi.callServiceApi(serviceconf).then(function(res) {
                var scStockData = res.data,
                    scStock = {};
                for (var i in scStockData) {
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                }
                var existingStock = scStock[context.data.partNo + '-' + context.data.operationFrom + '-' + context.data.operationTo];
                var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(context.data.acceptedQty) : parseInt(context.data.acceptedQty);
                var data = {
                    id: existingStock && existingStock.id || undefined,
                    partNo: context.data.partNo,
                    subContractorCode: context.data.subContractorCode,
                    partStockQty: partStockQty,
                    operationFrom: context.data.operationFrom,
                    operationTo: context.data.operationTo
                }
                serviceconf = self.getServiceConfig('report.subContractorStock', 'POST');
                returnPromise.push(serviceApi.callServiceApi(serviceconf, data));
            });

            returnPromise.push(partStockPromise);

            return Promise.all(returnPromise);
        },
        updatePartTotal: function(context, data, newValue, mapKey, field) {
            var total = 0,
                totalBeforTax = 0,
                qty = newValue,
                operation = data.operationFrom;
            if (data.id &&
                operation &&
                (context.partStock === undefined ||
                    context.partStock[data.id + '-' + operation] === undefined ||
                    context.partStock[data.id + '-' + operation].partStockQty < qty)) {
                data[field.id] = qty = null;
            }
            totalBeforTax = qty * data.rate;
            total = totalBeforTax + (totalBeforTax * (data.gst / 100));
            data.total = parseFloat(total).toFixed(2);
            context.actions.callBackUpdatePartTotal && context.actions.callBackUpdatePartTotal(context, data, newValue, mapKey, field);

        },
        getServiceConfig: function(module, replaceMethod, appendValue) {
            var serviceConfig = angular.copy(typeof(module) !== 'object' ? eval('erpAppConfig.modules.' + module + '.services.list') : module);
            serviceConfig.url = serviceConfig.url.replace('{{YEAR}}', erpAppConfig.calendarYear);
            serviceConfig.url = appendValue ? serviceConfig.url + '/' + appendValue : serviceConfig.url;
            serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
            serviceConfig.cache = true;
            return serviceConfig;
        },
        getPartStock: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.partStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var partStockData = res.data,
                    partStock = {};
                for (var i in partStockData) {
                    partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                }
                context.partStock = partStock;
            });
        },
        getSCStock: function(context) {
            var serviceconf = context.actions.getServiceConfig('report.subContractorStock');
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var scStockData = res.data,
                    scStock = {};
                for (var i in scStockData) {
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                }
                context.partStock = scStock;
            });
        },
        objectSort: function(obj, sortBy) {
            function compare(a, b) {
                if (a[sortBy] < b[sortBy])
                    return -1;
                if (a[sortBy] > b[sortBy])
                    return 1;
                return 0;
            }

            return obj.sort(compare);
        },
        viewFilterBy: function(context, list) {
            if (!list.selectedFilterBy) {
                delete context.filterBy[list.id];
            } else {
                context.filterBy[list.id] = list.selectedFilterBy;
            }
        },
        applyFieldValues: function(context, fields, data, printView) {
            fields = fields || context.form.fields;
            printView = printView || context.page.printView;

            for (var i in fields) {
                var field = fields[i];
                if (field.type === 'select') {
                    if (printView) {
                        data = data || context.printData;
                        context.actions.replaceViewDataVal(data, field);
                    } else if (field.makeFieldOptions === undefined) {
                        data = data || context.data;
                        context.actions.makeOptionsFields(context, field).then(function(returnField){
                            if(returnField.onLoadAction){
                                context.actions[returnField.action](context, data, data[returnField.id], returnField);
                            }
                        });
                    }
                }
            }
        },
        getFlowMaster: function(context) {
            var serviceconf = this.getServiceConfig('production.flowMaster');
            context.flowMasterData = {};
            context.flowMasterByPart = {};

            serviceApi.callServiceApi(serviceconf).then(function(res) {
                var flowMasterData = res.data,
                    prevOpp;

                context.flowMasterData = flowMasterData;
                for (var i in flowMasterData) {
                    for (var j in flowMasterData[i].mapping) {
                        context.flowMasterByPart[flowMasterData[i].partNo + '-' + flowMasterData[i].mapping[j].id] = flowMasterData[i].mapping[j];
                    }
                }
            });

        },
        mergeOprFlowMap: function(context, flowMap) {
            var optionsPromiseResolve, optionsPromise = new Promise(function(resolve, reject) {
                optionsPromiseResolve = resolve;
            });

            context.actions.getData('production.operationMaster').then(function(res) {
                for (var i in flowMap) {
                    flowMap[i] = res.data[flowMap[i].id];
                    flowMap[i].opCode = parseInt(res.data[flowMap[i].id].opCode);
                }
                optionsPromiseResolve(flowMap);
            });
            return optionsPromise;
        },
        getOperations: function(context) {
            var serviceconf = this.getServiceConfig('production.operationMaster');
            context.operationsData = {};

            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.operationsData = res.data;
            });

        },
        isCheckExistField: function(context, data, value, field) {
            if (context.actions.findObjectByKey(context.listViewData, field.id, value)) {
                data[field.id] = null;
            }
        },
        findObjectByKey: function(array, key, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return false;
        }
    };
    return {
        defaultActions: defaultActions
    };
}]);
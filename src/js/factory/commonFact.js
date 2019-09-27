erpApp.factory('commonFact', ['staticConfig', 'serviceApi', '$filter', '$location', 'authFact', '$injector', function(staticConfig, serviceApi, $filter, $location, authFact, $injector) {
    var erpAppConfig = staticConfig;
    var erpLoadPrsRes;
    var erpLoadPrs = new Promise(function(resolve, reject) {
        erpLoadPrsRes = resolve;
    });
    var loadErpAppConfig = (function() {
        var userType = authFact.isLogin();
        var settingsService = angular.copy(erpAppConfig.modules.admin.settings.services.list);
        settingsService.url = settingsService.url + '/1';
        return serviceApi.callServiceApi(settingsService).then(function(res) {
            erpAppConfig = angular.extend(erpAppConfig, res.data);
            defaultActions.moduleAccess(erpAppConfig);
            erpLoadPrsRes();
            return erpAppConfig;
        });
    })();

    var initCtrl = function(scope, module, actions) {
        return erpLoadPrs.then(function() {
            var appConfig = getErpAppConfig();
            var context = angular.copy(eval('appConfig.modules.' + module));
            var parentModule;
            var returnPage;
            var returnPromise = [];
            var userType = authFact.isLogin();
            var formPromise;
            var filterViewPromise;
            var mappingPromise;
            var listViewPromise;
            var formPromise;
            if (context.parentModule) {
                parentModule = angular.copy(eval('appConfig.modules.' + context.parentModule));
                context = angular.merge({}, angular.copy(parentModule), context);
            }
            if (!userType && appConfig.forceLoginSite) {
                window.location.hash = '#!/' + appConfig.modules.admin.login.page.link;
                return;
            }
            if (context.disable) {
                window.location.hash = '#!/' + appConfig.modules.dashboard.page.link;
            }
            context.appConfig = appConfig;
            context.actions = angular.extend(angular.copy(defaultActions), actions || {});
            formPromise = context.form && context.actions.updateFields(context, context.form.fields);
            if (formPromise) {
                formPromise && returnPromise.push(formPromise);
                formPromise.then(function() {
                    context.filterView && returnPromise.push(context.actions.updateFields(context, context.filterView.fields));
                    if (context.form && context.form.mapping) {
                        returnPromise.push(context.actions.updateFields(context, context.form.mapping.fields));
                    }
                    returnPromise.push(context.actions.updateFields(context, context.listView));
                });
            } else {
                returnPromise.push(context.actions.updateFields(context, context.listView));
                context.filterView && returnPromise.push(context.actions.updateFields(context, context.filterView.fields));
            }
            scope.$broadcast('showAlertRol');
            return Promise.all(returnPromise).then(function() {
                returnPage = context.actions[context.page.name] && context.actions[context.page.name](context) || true;
                scope.context = context;
                return returnPage;
            });
        });
    };
    var getErpAppConfig = function() {
        return erpAppConfig;
    };
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
            return true;
        },
        edit: function(context, key, printView) {
            var serviceconf = this.getServiceConfig(context.services.list, 'GET', key);
            context.page.name = 'edit';
            context.page.printView = printView;
            context.page.editKey = key;

            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
                context.printData = angular.copy(context.data);
                if (context.data['date']) {
                    context.data['date'] = new Date(context.data['date']);
                }
                if (context.data['frmDate']) {
                    context.data['frmDate'] = new Date(context.data['frmDate']);
                }
                if (context.data['toDate']) {
                    context.data['toDate'] = new Date(context.data['toDate']);
                }
                context.actions.callBackEdit && context.actions.callBackEdit(context, key);
                return context;
            });

        },
        printView: function(context, key, printView) {
            this.edit(context, key, printView);
        },
        disable: function(context, id, item) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            context.actions.callBeforeDelete && context.actions.callBeforeDelete(context, item);
            context.listViewDataMaster[id]['disabled'] = true;
            serviceApi.callServiceApi(serviceconf, context.listViewData[id]);
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, id, item);
        },
        delete: function(context, id, item) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            context.actions.callBeforeDelete && context.actions.callBeforeDelete(context, id, item);
            serviceApi.callServiceApi(serviceconf, { key: id, delete: 'yes' });
            context.actions.list(context);
            context.actions.callBackDelete && context.actions.callBackDelete(context, id, item);
        },
        list: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            context.page.name = 'list';
            context.currentPage = 0;
            context.pageSize = 10;
            context.filterBy = {};
            context.listViewData = [];
            context.orderByProperty = 'updated';
            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                var listViewData = res.data;
                for (var x in listViewData) {
                    listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.listViewData.push(listViewData[x])
                }
                context.listViewDataMaster = angular.copy(context.listViewData);
                context.lastData = angular.copy(context.listViewData[context.listViewData.length - 1]);
                context.actions.callBackList && context.actions.callBackList(context);
                return context;
            });
        },
        getPageData: function(context) {
            return $filter('filter')(context.listViewData, context.filterBy, true) || [];
        },
        numberOfPages: function(context) {
            return Math.ceil(context.actions.getPageData(context).length / context.pageSize);
        },
        submit: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');

            return serviceApi.callServiceApi(serviceconf, context.data).then(function() {
                context.actions.list(context);
                context.actions.callBackSubmit && context.actions.callBackSubmit(context);
                return context;
            });

        },
        cancel: function(context) {
            context.actions.list(context);
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
        replaceFieldVal: function(viewData, field) {
            var list,
                serviceConf,
                self = this,
                orgViewDataFieldId = viewData,
                updateField = function(field, fieldData, list) {
                    fieldData = (fieldData && list && list[orgViewDataFieldId] && field.replaceName) ? list[orgViewDataFieldId][field.replaceName] : fieldData;
                    fieldData = field.valuePrefix ? field.valuePrefix + fieldData : fieldData;
                    fieldData = field.valuePrefixData ? list[orgViewDataFieldId][field.valuePrefixData] + ' - ' + fieldData : fieldData;
                    if (self.isFloat(fieldData)) {
                        fieldData = parseFloat(fieldData).toFixed(2);
                    }
                    return fieldData;
                };
            //Get Part master data
            if (field.type === 'select' || field.dataFrom) {
                viewData = field.options && field.options[viewData] && field.options[viewData].optionName || (field.allOptions && field.allOptions[viewData]) && field.allOptions[viewData].optionName || viewData;
            } else if (field.type === 'date' || field.inputType === 'date') {
                viewData = viewData && self.dateFormatChange(viewData) || '';
            } else if (field.inputType === 'password') {
                viewData = 'XXX';
            } else {
                viewData = updateField(field, viewData);
            }
            return viewData;
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
            field.allOptions = {};

            return context.actions.getData(field.dataFrom).then(function(res) {
                list = res.data;
                for (var i in list) {
                    var optionVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                    var optionIdVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                    var optionNameVal = field.valuePrefix && field.valuePrefix || '';
                    optionNameVal += field.valuePrefixData && list[i][field.valuePrefixData] + ' - ' || '';
                    optionNameVal += list[i][field.replaceName] || '';
                    var isCheckExistVal = field.existingCheck && context.listViewDataMaster && context.actions.findObjectByKey(context.listViewDataMaster, field.id, optionIdVal) || false;
                    field.allOptions[optionVal] = list[i];
                    field.allOptions[optionVal]['optionName'] = optionNameVal;
                    field.allOptions[optionVal]['optionId'] = optionIdVal;
                    if ((field.filter === undefined || self.matchFilter(field, list[i], context) === true) &&
                        (!isCheckExistVal || optionIdVal === context.data[field.id])) {
                        field.options[optionVal] = field.allOptions[optionVal];
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
        removeMapping: function(context, data, key) {
            delete data.splice(key, 1);
            context.actions.callBackRemoveMapping && context.actions.callBackRemoveMapping(context, data, key);
        },
        changeMapping: function(context, data, key, field, fieldMapKey) {
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
            field.callBack !== false && context.actions.callBackChangeMapping && context.actions.callBackChangeMapping(context, data, key, field, fieldMapKey);
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
        updatePartTotal: function(context, data, newValue, field, fieldMapKey) {
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
            context.actions.callBackUpdatePartTotal && context.actions.callBackUpdatePartTotal(context, data, newValue, field, fieldMapKey);

        },
        getServiceConfig: function(module, replaceMethod, appendValue) {
            var appConfig = getErpAppConfig();
            var currentYear = new Date().getMonth() >= 3 ? new Date().getFullYear() : new Date().getFullYear() - 1;
            var serviceConfig = angular.copy(typeof(module) !== 'object' ? eval('appConfig.modules.' + module + '.services.list') : module);
            serviceConfig.url = serviceConfig.url.replace('{{YEAR}}', appConfig.calendarYear || currentYear);
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
            return serviceApi.callServiceApi(serviceconf).then(function(res) {
                var scStockData = res.data,
                    scStock = {};
                for (var i in scStockData) {
                    scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                }
                context.partStock = scStock;
                return scStock;
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
            var self = this;
            if (!list.selectedFilterBy) {
                delete context.filterBy[list.id];
            } else {
                if (list.type === 'date' || list.inputType === 'date') {
                    context.filterBy[list.id] = new Date(list.selectedFilterBy).toISOString();
                } else {
                    context.filterBy[list.id] = list.selectedFilterBy;
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
            if (context.listViewData && context.actions.findObjectByKey(context.listViewData, field.id, value)) {
                data[field.id] = null;
            }
        },
        findObjectByKey: function(array, key, value) {
            var isExist = false;
            for (var i = 0; i < array.length; i++) {
                if (typeof(key) === 'object') {
                    for (var j in key) {
                        if ((!isExist || typeof(isExist) === 'object') && array[i][j] === key[j]) {
                            isExist = array[i];
                        }
                    }
                } else if (array[i][key] === value) {
                    isExist = array[i];
                }
            }
            return isExist;
        },
        updateGstPart: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            var cgstField = context.form.mapping.fields['cgst'];
            var sgstField = context.form.mapping.fields['sgst'];
            if (cgstField && sgstField) {
                if (newValue > 0) {
                    data[cgstField.id] = parseInt(newValue) / 2;
                    data[sgstField.id] = parseInt(newValue) / 2;
                } else {
                    data[cgstField.id] = 0;
                    data[sgstField.id] = 0;
                }
            }
            context.actions.updatePartTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        },
        updateGstRM: function(context, data, newValue, field, fieldMapKey) {
            var acceptedQtyField = context.form.mapping.fields['acceptedQty'];
            var cgstField = context.form.mapping.fields['gst'];
            var sgstField = context.form.mapping.fields['sgst'];
            if (cgstField && sgstField) {
                if (newValue > 0) {
                    data[cgstField.id] = parseInt(newValue) / 2;
                    data[sgstField.id] = parseInt(newValue) / 2;
                } else {
                    data[cgstField.id] = 0;
                    data[sgstField.id] = 0;
                }
            }
            context.actions.updateRmTotal(context, data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
        },
        updateFields: function(context, fields) {
            var fields = fields;
            var returnPromise = [];
            for (var i in fields) {
                if (fields[i].dataFrom && (fields[i].makeFieldOptions === undefined || fields[i].makeFieldOptions)) {
                    returnPromise.push(context.actions.makeOptionsFields(context, fields[i]));
                }
            }
            return Promise.all(returnPromise);
        },
        showSubModule: function(module) {
            var subModules = {};

            for (var i in module) {
                if (i !== 'name' && i !== 'title' && i !== 'icon' && i !== 'page' && i !== 'id') {
                    subModules[i] = module[i];
                }
            }
            return subModules;
        },
        moduleAccess: function(erpAppConfig) {
            var userType = authFact.isLogin();
            if (userType !== 'ADMIN') {
                for (var i in erpAppConfig.mapping) {
                    var map = erpAppConfig.mapping[i];
                    var module = eval('erpAppConfig.modules.' + map.module) || {};
                    if (!userType || (userType && map.restrictUser !== userType)) {
                        module.disable = map.restrictUser && true;
                    }
                    if (module.page) {
                        module.page.actions = {
                            print: true
                        };
                        module.page.actions.add = map.restrictUser === userType && map['add'] || false;
                        module.page.actions.edit = map.restrictUser === userType && map['edit'] || false;
                        module.page.actions.delete = map.restrictUser === userType && map['delete'] || false;
                    }
                }
            }
        },
        isActionAccess: function(module, action) {
            var erpAppConfig = getErpAppConfig();
            var userType = authFact.isLogin();
            if (!userType !== 'ADMIN' && erpAppConfig.pageAccess && erpAppConfig.pageAccess[module]) {
                if (!userType || (userType && (erpAppConfig.pageAccess[module].restrictUser !== userType || !erpAppConfig.pageAccess[module][action]))) {
                    return false;
                }
            }
            return true;
        },
        isFloat: function(n) {
            return Number(n) === n && n % 1 !== 0;
        },
        downloadExcel: function(context, table) {
            context.filterBy = [];
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };
            if (!table.nodeType) table = document.getElementById(table);
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            var downloadLink = document.createElement("a");
            downloadLink.href = uri + base64(format(template, ctx));
            downloadLink.download = "downloadExcel.xls";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        },
        updatePORmTotal: function(context, data) {
            var total = 0;
            var qty = data['qty'] || 0;
            total = qty * data.rate;
            data.total = parseFloat(total).toFixed(2);
            context.actions.updatePOTotalAmount(context);

        },
        updatePOTotalAmount: function(context) {
            var gst = 0,
                gstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.data.mapping,
                extraAmount = context.data.extraAmount || 0;

            for (var i in mapping) {
                gst += parseFloat(mapping[i].gst / 100);
                gstTotal += (parseFloat(mapping[i].total) * parseFloat(mapping[i].gst / 100));
                subTotal += parseFloat(mapping[i].total);
            }
            gstTotal += (parseFloat(extraAmount * parseFloat(gst / mapping.length)));
            total = subTotal + gstTotal + extraAmount;
            context.data.gstTotal = parseFloat(gstTotal).toFixed(2);

            context.data.subTotal = parseFloat(subTotal).toFixed(2);
            context.data.total = parseInt(total);
        }
    };
    return {
        defaultActions: defaultActions,
        initCtrl: initCtrl,
        getErpAppConfig: getErpAppConfig
    };
}]);
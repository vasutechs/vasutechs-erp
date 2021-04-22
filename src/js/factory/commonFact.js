erpConfig.moduleFiles.commonFact = function ($filter, $location, $window, $http, $timeout) {
    return function (context) {
        return {
            add: function () {
                context.controller.page.name = 'add';
                context.controller.data = angular.copy(context.controller.masterData);
                if (context.controller.form.autoGenKey) {
                    context.commonFact.setAutoGenKey();
                }
                if (context.controller.data.date === null) {
                    context.controller.data.date = new Date();
                }
                return context.commonFact.formRender().then(function () {
                    context.controller.methods.callBackAdd && context.controller.methods.callBackAdd();
                    return true;
                });
            },
            edit: function (key, printView) {
                context.controller.page.name = 'edit';
                context.controller.page.printView = printView;
                context.controller.page.editKey = key;
                context.controller.existEditData = context.controller.page.editKey && context.commonFact.findObjectByKey(context.controller.listViewDataMaster, 'id', context.controller.page.editKey);

                return context.commonFact.formRender().then(function () {
                    return context.commonFact.getData(context.controller, key).then(function (res) {
                        context.controller.data = res.data;
                        context.controller.printData = angular.copy(context.controller.data);
                        context.controller.data['password'] = '';
                        if (context.controller.data['date']) {
                            context.controller.data['date'] = new Date(context.controller.data['date']);
                        }
                        if (context.controller.data['frmDate']) {
                            context.controller.data['frmDate'] = new Date(context.controller.data['frmDate']);
                        }
                        if (context.controller.data['toDate']) {
                            context.controller.data['toDate'] = new Date(context.controller.data['toDate']);
                        }
                        context.controller.data.mapping = !context.controller.data.mapping && context.controller.masterData.mapping || context.controller.data.mapping;
                        context.controller.methods.callBackEdit && context.controller.methods.callBackEdit(key);
                        return context;
                    });
                });

            },
            printView: function (key, printView) {
                context.commonFact.edit(key, printView);
            },
            disable: function (id, item) {
                context.controller.methods.callBeforeDelete && context.controller.methods.callBeforeDelete(item);
                context.controller.listViewDataMaster[id]['disabled'] = true;
                context.commonFact.updateData(context.controller, context.controller.listViewData[id]);
                context.commonFact.list();
                context.controller.methods.callBackDelete && context.controller.methods.callBackDelete(id, item);
            },
            delete : function (id, item) {
                var isConfirmed = confirm("Are you sure to delete this record ?");
                if (isConfirmed) {
                    context.controller.methods.callBeforeDelete && context.controller.methods.callBeforeDelete(id, item);
                    context.commonFact.updateData(context.controller, {
                        id: id,
                        delete : 'yes'
                    });
                    context.commonFact.list();
                    context.controller.methods.callBackDelete && context.controller.methods.callBackDelete(id, item);
                } else {
                    return false;
                }
            },
            list: function () {
                var pageProm = [];
                var promiseRes = context.commonFact.getPromiseRes();
                context.controller.existEditData = null;
                context.controller.page.editKey = undefined;
                context.controller.page.printView = undefined;
                context.controller.page.name = 'list';
                context.controller.currentPage = 0;
                context.controller.pageSize = 10;
                context.controller.filterBy = context.controller.page.filter || {};
                context.controller.listViewData = [];
                context.controller.orderByProperty = 'updated';
                context.commonFact.pageActionsAccess();
                pageProm.push(context.commonFact.updateFields(context.controller.listView));
                context.controller.filterView && pageProm.push(context.commonFact.updateFields(context.controller.filterView.fields));

                Promise.all(pageProm).then(function () {
                    context.commonFact.getData().then(function (res) {
                        var listViewData = res.data;
                        for (var x in listViewData) {
                            listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.controller.listViewData.push(listViewData[x])
                        }
                        context.controller.listViewDataMaster = angular.copy(context.controller.listViewData);
                        context.controller.lastData = angular.copy(context.controller.listViewData[context.controller.listViewData.length - 1]);
                        context.controller.methods.callBackList && context.controller.methods.callBackList();
                        promiseRes.resolve(context);
                    });
                });
                return promiseRes.promise;

            },
            formRender: function () {
                return context.commonFact.updateFields(context.controller.form.fields).then(function () {
                    if (context.controller.form.mapping) {
                        return context.commonFact.updateFields(context.controller.form.mapping.fields);
                    }
                    return context;
                });

            },
            getPageData: function () {
                return $filter('filter')(context.controller.listViewData, context.controller.filterBy, true) || [];
            },
            numberOfPages: function () {
                return Math.ceil(context.commonFact.getPageData().length / context.controller.pageSize);
            },
            submit: function () {
                return context.commonFact.updateData(context.controller, context.controller.data).then(function (res) {
                    context.commonFact.list();
                    context.controller.methods.callBackSubmit && context.controller.methods.callBackSubmit(res.data);
                    return context;
                });

            },
            cancel: function () {
                context.commonFact.list();
            },
            getData: function (module, data) {
                var ctrl = angular.copy(module || context.controller);
                var serviceConf = context.commonFact.getServiceConfig(ctrl, 'GET');
                var params = data && typeof(data) !== 'object' ? {
                    id: data
                }
                 : data;
                serviceConf.params = angular.extend(serviceConf.params || {}, params);
                //Get Part master data
                return context.serviceApi.callServiceApi(serviceConf);
            },
            updateData: function (module, data) {
                var ctrl = angular.copy(module || context.controller);
                var userDetails = context.authFact.getUserDetail();
                var serviceConf = context.commonFact.getServiceConfig(ctrl, 'POST');
                serviceConf.cache = false;
                data.updatedUserId = (userDetails && context.commonFact.isSuperAdmin()) ? context.commonFact.isSuperAdmin() + '-' + userDetails.id : userDetails ? userDetails.id : null;
                //Get Part master data
                return context.serviceApi.callServiceApi(serviceConf, data);
            },
            replaceFieldVal: function (viewData, field) {
                var list,
                serviceConf,
                self = this,
                orgViewDataFieldId = viewData,
                updateField = function (field, fieldData, list) {
                    fieldData = (fieldData && list && list[orgViewDataFieldId] && field.replaceName) ? list[orgViewDataFieldId][field.replaceName] : fieldData;
                    fieldData = field.valuePrefix ? field.valuePrefix + fieldData : fieldData;
                    fieldData = field.valuePrefixData ? list[orgViewDataFieldId][field.valuePrefixData] + ' - ' + fieldData : fieldData;
                    if (context.commonFact.isFloat(fieldData)) {
                        fieldData = parseFloat(fieldData).toFixed(2);
                    }
                    return fieldData;
                };
                //Get Part master data
                if (field.type === 'select' || field.dataFrom) {
                    viewData = field.options && field.options[viewData] && field.options[viewData].optionName || (field.allOptions && field.allOptions[viewData]) && field.allOptions[viewData].optionName || viewData;
                } else if (field.type === 'date' || field.inputType === 'date') {
                    viewData = viewData && context.commonFact.dateFormatChange(viewData) || '';
                } else if (field.inputType === 'password') {
                    viewData = 'XXX';
                } else {
                    viewData = updateField(field, viewData);
                }
                return viewData;
            },
            matchFilter: function (field, list) {
                var returnFlag = false;
                // if (context && context.controller.page.name === 'edit') {
                //     return true;
                // }
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
            makeOptionsFields: function (field, fields) {
                var self = this,
                list;
                if (!field) {
                    return false;
                }
                field.options = {};
                field.allOptions = {};
                if (field.dataFrom && (typeof(field.dataFrom) === 'object' || context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, field.dataFrom))) {
                    return context.commonFact.getData(field.dataFrom).then(function (res) {
                        list = res.data;
                        for (var i in list) {
                            var optionVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                            var optionIdVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                            var optionNameVal = field.valuePrefix && field.valuePrefix || '';
                            var editOption = context.controller.existEditData && optionIdVal === context.controller.existEditData[field.id] || false;
                            optionNameVal += field.valuePrefixData && list[i][field.valuePrefixData] + ' - ' || '';
                            optionNameVal += list[i][field.replaceName] || '';
                            var isCheckExistVal = field.existingCheck && (context.controller.listViewDataMaster || field.existingCheckList) && context.commonFact.findObjectByKey(field.existingCheckList || context.controller.listViewDataMaster, field.id, optionIdVal) || false;
                            field.allOptions[optionVal] = list[i];
                            if (optionVal && field.allOptions[optionVal]) {
                                field.allOptions[optionVal]['optionName'] = optionNameVal;
                                field.allOptions[optionVal]['optionId'] = optionIdVal;
                            }

                            if ((field.filter === undefined ||
                                    context.commonFact.matchFilter(field, list[i], context) === true) &&
                                (!isCheckExistVal || editOption)) {
                                field.options[optionVal] = field.allOptions[optionVal];
                            }
                        }
                        return field;
                    });
                } else if (fields && fields[field.id] && fields[field.id].dataFrom) {
                    delete fields[field.id];
                    return true;
                }
            },
            addMapping: function (mapping) {
                var newMapping = angular.extend({}, context.controller.masterData.mapping[0]);
                mapping = mapping || context.controller.masterData.mapping;
                for (var mapKey in newMapping) {
                    newMapping[mapKey] = null;
                }

                mapping.push(newMapping);
                context.controller.methods.callBackAddMapping && context.controller.methods.callBackAddMapping(newMapping, mapKey);
            },
            removeMapping: function (data, key) {

                delete data.splice(key, 1);
                context.controller.methods.callBackRemoveMapping && context.controller.methods.callBackRemoveMapping(data, key);

            },
            changeMapping: function (data, key, field, fieldMapKey) {
                for (var dataKey in data) {
                    if ((field.updateData && field.updateData.indexOf(dataKey) >= 0) || field.updateData === undefined) {
                        if (key === null || key === '') {
                            data[dataKey] = angular.copy(context.controller.masterData[dataKey]);
                        } else if (key !== undefined && field.options[key] && field.options[key][dataKey]) {
                            if (typeof(field.options[key][dataKey]) !== 'object') {
                                data[dataKey] = field.options[key][dataKey];
                            } else if (field.updateMapping) {
                                data[dataKey] = angular.copy(context.controller.masterData[dataKey]);
                                for (var mapKey in field.options[key][dataKey]) {
                                    var copyDataMapKey = angular.copy(context.controller.masterData[dataKey][0]);
                                    if (field.options[key][dataKey][mapKey] !== null || field.options[key][dataKey][mapKey] !== '') {
                                        data[dataKey][mapKey] = angular.extend(copyDataMapKey, field.options[key][dataKey][mapKey]);
                                        for (var mapFieldKey in context.controller.form.mapping.fields) {
                                            var mapfield = context.controller.form.mapping.fields[mapFieldKey];
                                            if (mapfield.action) {
                                                if (mapfield.type === 'select' && (mapfield.autoAction === undefined || mapfield.autoAction)) {
                                                    context.commonFact.callActions(mapfield.action, [data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield, mapKey]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                field.callBack !== false && context.controller.methods.callBackChangeMapping && context.controller.methods.callBackChangeMapping(data, key, field, fieldMapKey);
            },
            setAutoGenKey: function () {
                var lastDataKey = context.controller.lastData ? context.controller.lastData[context.controller.form.autoGenKey] : undefined;
                lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : context.controller.form.autoGenValStart ? context.controller.form.autoGenValStart : 1;
                context.controller.data[context.controller.form.autoGenKey] = lastDataKey;
                context.controller.methods.callBackSetAutoGenKey && context.controller.methods.callBackSetAutoGenKey();
            },
            dateFormatChange: function (dateValue) {
                dateValue = new Date(dateValue);
                return dateValue.getDate() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getFullYear();
            },
            timeFormatChange: function (value) {
                value = new Date(value);
                return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            },
            getOperationFromFlow: function (field, restriction) {
                var self = this,
                partNo = restriction.partNo || context.controller.data.partNo,
                limit = 0;
                var promiseRes = context.commonFact.getPromiseRes();

                if (partNo) {
                    context.commonFact.makeOptionsFields(field).then(function () {
                        var localOptions = field.options;
                        context.commonFact.getData('production.flowMaster').then(function (res) {
                            var flowMasterData = res.data,
                            flowMasterVal;
                            var isPartFlow = false;
                            field.options = {};
                            for (var i in flowMasterData) {
                                if (flowMasterData[i].partNo === partNo) {
                                    context.commonFact.mergeOprFlowMap(flowMasterData[i].mapping).then(function (flowMasterMap) {
                                        //var flowMasterMap = flowMasterData[i].mapping;
                                        var startWith = context.commonFact.findObjectByKey(flowMasterMap, 'id', restriction.startWith);
                                        flowMasterMap = context.commonFact.objectSort(flowMasterMap, 'opCode');
                                        for (var j in flowMasterMap) {
                                            flowMasterVal = flowMasterMap[j];
                                            if ((!restriction.limit || limit < restriction.limit) &&
                                                (!restriction.startWith || (startWith.index < j)) &&
                                                (restriction.filter === undefined || context.commonFact.matchFilter(restriction, flowMasterVal) === true)) {
                                                limit++;
                                                field.options[flowMasterVal.opCode] = localOptions[flowMasterVal.id];
                                            }
                                        }
                                        promiseRes.resolve(field);
                                    });
                                    isPartFlow = true;
                                }
                            }
                            if (!isPartFlow) {
                                promiseRes.resolve(field);
                            }
                        });
                    });
                } else {
                    promiseRes.resolve(field);
                }
                return promiseRes.promise;
            },
            updatePartStock: function (newContext) {
                var self = this;
                var localContext = newContext || context;
                var promiseRes = context.commonFact.getPromiseRes();
                var currentPartProm = context.commonFact.getPromiseRes();
                var currentData;
                var prevData;
                context.commonFact.getData('report.partStock').then(function (res) {
                    var partStockData = res.data,
                    partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationFrom + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    var existingStock = partStock[localContext.controller.data.partNo + '-' + localContext.controller.data.operationFrom + '-' + localContext.controller.data.operationTo];
                    var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(localContext.controller.data.acceptedQty) : parseInt(localContext.controller.data.acceptedQty);
                    if (localContext.controller.updateCurStock === undefined || localContext.controller.updateCurStock) {
                        currentData = {
                            id: existingStock && existingStock.id || undefined,
                            partNo: localContext.controller.data.partNo,
                            partStockQty: partStockQty,
                            operationFrom: localContext.controller.data.operationFrom,
                            operationTo: localContext.controller.data.operationTo
                        }
                        context.commonFact.updateData('report.partStock', currentData).then(function () {
                            context.commonFact.getPartStock();
                            currentPartProm.resolve();
                        });
                    } else {
                        currentPartProm.resolve();
                    }
                    currentPartProm.promise.then(function () {
                        var existingPrevStock = partStock[localContext.controller.data.partNo + '-' + localContext.controller.data.operationFrom];
                        if (existingPrevStock && (localContext.controller.updatePrevStock === undefined || localContext.controller.updatePrevStock)) {
                            var existPartStockQty = parseInt(localContext.controller.data.acceptedQty);
                            existPartStockQty += parseInt(localContext.controller.data.rejectionQty) || 0;
                            existPartStockQty += parseInt(localContext.controller.data.rwQty) || 0;
                            existPartStockQty = parseInt(existingPrevStock.partStockQty) - parseInt(existPartStockQty);
                            prevData = {
                                id: existingPrevStock.id,
                                partNo: localContext.controller.data.partNo,
                                partStockQty: existPartStockQty,
                                operationFrom: existingPrevStock.operationFrom,
                                operationTo: existingPrevStock.operationTo
                            }
                            context.commonFact.updateData('report.partStock', prevData).then(function () {
                                context.commonFact.getPartStock();
                                promiseRes.resolve();
                            });
                        } else {
                            promiseRes.resolve();
                        }
                    });

                });

                return promiseRes.promise;
            },
            updateSCStock: function (newContext) {
                var promiseRes = context.commonFact.getPromiseRes();
                var localContext = newContext || context;
                var returnPromise = [];
                context.commonFact.getData('report.subContractorStock').then(function (res) {
                    var scStockData = res.data,
                    scStock = {};
                    for (var i in scStockData) {
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationTo] = scStockData[i] && scStockData[i] || undefined;
                    }
                    var existingStock = scStock[localContext.controller.data.partNo + '-' + newContext.controller.data.operationFrom + '-' + newContext.controller.data.operationTo];
                    var partStockQty = existingStock ? parseInt(existingStock.partStockQty) + parseInt(newContext.controller.data.acceptedQty) : parseInt(newContext.controller.data.acceptedQty);
                    var data = {
                        id: existingStock && existingStock.id || undefined,
                        partNo: localContext.controller.data.partNo,
                        subContractorCode: localContext.controller.data.subContractorCode,
                        partStockQty: partStockQty,
                        operationFrom: localContext.controller.data.operationFrom,
                        operationTo: localContext.controller.data.operationTo
                    }
                    promiseRes.resolve(context.commonFact.updateData('report.subContractorStock', data));
                });

                return promiseRes.promise;
            },
            updatePartTotal: function (data, newValue, field, fieldMapKey) {
                var total = 0,
                totalBeforTax = 0,
                qty = newValue,
                operation = data.operationFrom;
                if (data.id &&
                    operation &&
                    (context.controller.partStock === undefined ||
                        context.controller.partStock[data.id + '-' + operation] === undefined ||
                        context.controller.partStock[data.id + '-' + operation].partStockQty < qty)) {
                    data[field.id] = qty = null;
                }
                totalBeforTax = qty * data.rate;
                data.total = parseFloat(totalBeforTax).toFixed(2);
                context.controller.methods.callBackUpdatePartTotal && context.controller.methods.callBackUpdatePartTotal(data, newValue, field, fieldMapKey);

            },
            getServiceConfig: function (ctrl, replaceMethod) {
                var currentYear = context.erpAppConfig.calendarYear;
                var serviceConfig = ctrl;
                var genUrl = function (serviceConfig) {
                    var url = context.erpAppConfig.serverApiUri;
                    url += context.erpAppConfig.serverAuth ? ('/' + context.erpAppConfig.serverAuth) : '';
                    url += !serviceConfig.notDataUri ? (serviceConfig.dataUri ? ('/' + serviceConfig.dataUri) : ('/' + context.erpAppConfig.serverDataUri)) : '';
                    url += serviceConfig.id ? ('/' + serviceConfig.id) : '';
                    return url;
                };

                if (typeof(ctrl) !== 'object') {
                    ctrl = angular.copy(context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, ctrl));
                }
                if (!ctrl) {
                    return {};
                }
                if (ctrl.id && ctrl.page) {
                    serviceConfig = ctrl.services && ctrl.services.list || {};
                    serviceConfig.id = serviceConfig.id || ctrl.id;
                }
                serviceConfig.params = angular.extend(serviceConfig.params || {}, {
                    appCustomer: serviceConfig.params && serviceConfig.params.appCustomer || context.commonFact.isAppCustomer() || ''
                })

                    if (serviceConfig.params.year && typeof(serviceConfig.params.year) !== 'string') {
                        serviceConfig.params.year = context.erpAppConfig.calendarYear || currentYear;
                    }
                    serviceConfig.url = genUrl(serviceConfig);
                serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
                serviceConfig.cache = serviceConfig.cache === undefined ? context.erpAppConfig.httpCache : serviceConfig.cache;
                return serviceConfig;
            },
            getPartStock: function () {
                context.commonFact.getData('report.partStock').then(function (res) {
                    var partStockData = res.data,
                    partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    context.controller.partStock = partStock;
                });
            },
            getSCStock: function () {
                return context.commonFact.getData('report.subContractorStock').then(function (res) {
                    var scStockData = res.data,
                    scStock = {};
                    for (var i in scStockData) {
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                    }
                    context.controller.partStock = scStock;
                    return scStock;
                });
            },
            getRMStock: function () {
                context.commonFact.getData('report.rmStock').then(function (res) {
                    var rmStockData = res.data,
                    rmStock = {};
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }
                    context.controller.rmStock = rmStock;
                });
            },
            objectSort: function (obj, sortBy) {
                function compare(a, b) {
                    if (a[sortBy] < b[sortBy])
                        return -1;
                    if (a[sortBy] > b[sortBy])
                        return 1;
                    return 0;
                }

                return obj.sort(compare);
            },
            viewFilterBy: function (list) {
                var self = this;
                if (!list.selectedFilterBy) {
                    delete context.controller.filterBy[list.id];
                } else {
                    if (list.type === 'date' || list.inputType === 'date') {
                        context.controller.filterBy[list.id] = new Date(list.selectedFilterBy).toISOString();
                    } else {
                        context.controller.filterBy[list.id] = list.selectedFilterBy;
                    }
                }
            },
            getFlowMaster: function () {
                context.controller.flowMasterData = {};
                context.controller.flowMasterByPart = {};
                context.controller.flowMasterByPartOpr = {};

                return context.commonFact.getData('production.flowMaster').then(function (res) {
                    var flowMasterData = res.data,
                    prevOpp;

                    context.controller.flowMasterData = flowMasterData;
                    for (var i in flowMasterData) {
                        context.controller.flowMasterByPart[flowMasterData[i].partNo] = flowMasterData[i];
                        for (var j in flowMasterData[i].mapping) {
                            context.controller.flowMasterByPartOpr[flowMasterData[i].partNo + '-' + flowMasterData[i].mapping[j].id] = flowMasterData[i].mapping[j];
                        }
                    }
                    return context;
                });

            },
            mergeOprFlowMap: function (flowMap) {
                var promiseRes = context.commonFact.getPromiseRes();
                context.commonFact.getData('production.operationMaster').then(function (res) {
                    for (var i in flowMap) {
                        flowMap[i] = res.data[flowMap[i].id];
                        flowMap[i].opCode = parseInt(res.data[flowMap[i].id].opCode);
                    }
                    promiseRes.resolve(flowMap);
                });
                return promiseRes.promise;
            },
            getOperations: function () {
                context.controller.operationsData = {};

                context.commonFact.getData('production.operationMaster').then(function (res) {
                    context.controller.operationsData = res.data;
                });

            },
            isCheckExistField: function (data, value, field) {
                if (context.controller.listViewData && context.commonFact.findObjectByKey(context.controller.listViewData, field.id, value)) {
                    data[field.id] = null;
                }
            },
            findObjectByKey: function (array, findKey, value) {
                var isExist = false;
                var data = array;
                var filter = findKey;
                if (typeof(filter) === 'object') {
                    isExist = data.filter(function (item) {
                        for (var key in filter) {
                            if (item[key] === undefined || item[key] != filter[key])
                                return false;
                        }
                        return true;
                    });
                    isExist = isExist && isExist[isExist.length - 1];
                } else {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][filter] === value) {
                            isExist = data[i];
                            isExist['index'] = i;
                        }
                    }
                }

                return isExist;
            },
            updateGstPart: function (data, newValue, field, fieldMapKey) {
                var acceptedQtyField = context.controller.form.mapping.fields['acceptedQty'];
                var cgstField = context.controller.form.mapping.fields['cgst'];
                var sgstField = context.controller.form.mapping.fields['sgst'];
                if (cgstField && sgstField) {
                    if (newValue > 0) {
                        data[cgstField.id] = parseInt(newValue) / 2;
                        data[sgstField.id] = parseInt(newValue) / 2;
                    } else {
                        data[cgstField.id] = 0;
                        data[sgstField.id] = 0;
                    }
                }
                context.commonFact.updatePartTotal(data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
            },
            updateFields: function (fields) {
                var returnPromise = [];
                for (var i in fields) {
                    if (fields[i].makeFieldOptions === undefined || fields[i].makeFieldOptions) {
                        returnPromise.push(context.commonFact.makeOptionsFields(fields[i], fields));
                    }
                }
                return Promise.all(returnPromise);
            },
            showSubModule: function (module) {
                var subModules = {};

                for (var i in module) {
                    if (typeof(module[i]) === 'object') {
                        subModules[i] = module[i];
                    }
                }
                return subModules;
            },
            pageActionsAccess: function () {
                var actions = {
                    add: false,
                    edit: false,
                    delete : false,
                    print: false
                };
                if (context.controller.page && (context.controller.page.actions === undefined || context.controller.page.actions)) {
                    actions.add = context.controller.page.actions === undefined ? true : context.controller.page.actions.add;
                    actions.edit = context.controller.page.actions === undefined ? true : context.controller.page.actions.edit;
                    actions.delete = context.controller.page.actions === undefined ? true : context.controller.page.actions.delete;
                    actions.print = context.controller.page.actions === undefined ? true : context.controller.page.actions.print;
                }
                context.controller.page.actions = actions;
            },
            isFloat: function (n) {
                return Number(n) === n && n % 1 !== 0;
            },
            downloadExcel: function (table) {
                var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    })
                };
                if (!table.nodeType)
                    table = document.getElementById(table);
                var ctx = {
                    worksheet: name || 'Worksheet',
                    table: table.innerHTML
                }
                var downloadLink = document.createElement("a");
                downloadLink.href = uri + base64(format(template, ctx));
                downloadLink.download = context.controller.id + "Report.xls";

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            },
            updatePORmTotal: function (data) {
                var total = 0;
                var qty = data['qty'] || data['acceptedQty'] || 0;
                total = qty * data.rate;
                data.total = parseFloat(total).toFixed(2);
                context.commonFact.updatePOTotalAmount();

            },
            updatePOTotalAmount: function () {
                var gst = context.controller.data.gst,
                igst = context.controller.data.igst,
                cgst = context.controller.data.cgst,
                sgst = context.controller.data.sgst,
                igstTotal = 0,
                cgstTotal = 0,
                sgstTotal = 0,
                gstTotal = 0,
                total = 0,
                subTotal = 0,
                mapping = context.controller.data.mapping,
                extraAmount = context.controller.data.extraAmount || 0;

                for (var i in mapping) {
                    subTotal += mapping[i].total && parseFloat(mapping[i].total) || 0;
                }
                cgstTotal = context.controller.data.cgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.cgst / 100)) || 0;
                sgstTotal = context.controller.data.sgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.sgst / 100)) || 0;
                igstTotal = context.controller.data.igst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.controller.data.igst / 100)) || 0;

                gstTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));
                total = subTotal + gstTotal + extraAmount;
                context.controller.data.cgstTotal = parseFloat(cgstTotal).toFixed(2);
                context.controller.data.sgstTotal = parseFloat(sgstTotal).toFixed(2);
                context.controller.data.gstTotal = parseFloat(gstTotal).toFixed(2);
                context.controller.data.subTotal = parseFloat(subTotal).toFixed(2);
                context.controller.data.total = parseInt(total);
            },
            goToPage: function (url, isReload) {
                window.location.hash = '#!/' + url;
                if (isReload) {
                    setTimeout(function () {
                        window.location.reload()
                    }, 200);
                }
            },
            setSessionStore: function (key, data) {
                $window.sessionStorage.setItem(key, data);
            },
            getSessionStore: function (key) {
                var data = $window.sessionStorage.getItem(key);

                return data;
            },
            selectListData: function (data) {
                if (!context.selectedTableData) {
                    context.selectedTableData = {};
                    context.selectedTableData[context.controller.id] = {};
                }
                context.selectedTableData[context.controller.id][data.id] = angular.copy(data);
                delete context.selectedTableData[context.controller.id][data.id].id;
                delete context.selectedTableData[context.controller.id][data.id].isExported;
            },
            downloadTableData: function () {
                context.commonFact.downloadFile(context.selectedTableData, context.controller.id + '.json');
            },
            downloadFile: function (data, name, type) {

                if (!type || type === 'json') {
                    data = JSON.stringify(data);
                }
                //Convert JSON string to BLOB.
                data = [data];

                var blob1 = new Blob(data, {
                    type: 'application/octet-stream'
                });

                //Check the Browser.
                var isIE = false || !!document.documentMode;
                if (isIE) {
                    window.navigator.msSaveBlob(blob1, name);
                } else {
                    var url = window.URL || window.webkitURL;
                    var hrefData = url.createObjectURL(blob1);

                    var downloadLink = document.createElement("a");

                    downloadLink.href = hrefData;
                    downloadLink.download = name;

                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                }
            },
            downloadDatabase: function (year) {
                var downloadDbName = 'database' + (year ? context.erpAppConfig.calendarYear + '-' + ('' + parseInt(context.erpAppConfig.calendarYear + 1)).substring(2) : '');

                context.commonFact.getData({
                    id: 'databaseDownload',
                    params: {
                        year: year
                    }
                }).then(function (res) {
                    context.commonFact.downloadFile(res.data, downloadDbName + '.json');
                });
            },
            showLoadingHttp: function (scope) {
                var showLoader = function (v) {
                    if (v) {
                        scope.context.showLoading = false;
                    } else {
                        scope.context.showLoading = true;
                    }
                };
                scope.isLoading = function () {
                    return $http.pendingRequests.length <= 0;
                };

                scope.$watch(scope.isLoading, showLoader);
            },
            getDeepProp: function (obj, desc) {
                var arr = desc.split(".");
                while (arr.length && (obj = obj[arr.shift()]));
                return obj;
            },
            location: $location,
            changeCalendarYear: function () {
                context.commonFact.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
            },
            downloadData: function () {
                angular.element('#downloadModal').modal('show');
            },
            showAlertRol: function () {
                var userDetail = context.authFact.getUserDetail();
                context.alertRolContext = {
                    partRolYellow: [],
                    partRolRed: []
                };
                if (userDetail && userDetail.userType) {
                    context.commonFact.getData('marketing.partMaster').then(function (res) {
                        var partMaster = res.data;
                        context.commonFact.getData('report.partStock').then(function (res1) {
                            var partStockData = res1.data,
                            partStock = {};
                            for (var i in partStockData) {
                                partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                            }
                            for (var j in partMaster) {
                                var yellowAlert = partMaster[j].rolQtyYellowRage;
                                var redAlert = partMaster[j].rolQtyRedRage;
                                var checkPartStock = partStock[partMaster[j].id + '-' + context.erpAppConfig.finalStageOpp];

                                if (checkPartStock) {
                                    checkPartStock.partName = partMaster[j].partName;
                                    checkPartStock.partNo = partMaster[j].partNo;
                                    if (redAlert >= checkPartStock.partStockQty) {
                                        context.alertRolContext.partRolRed.push(checkPartStock);
                                    } else if (yellowAlert >= checkPartStock.partStockQty) {
                                        context.alertRolContext.partRolYellow.push(checkPartStock);
                                    }
                                }

                            }
                            if ((context.alertRolContext.partRolRed.length > 0 || context.alertRolContext.partRolYellow.length > 0) && !context.alertRolHideROL) {
                                angular.element('#RolModal').modal('show');
                            }
                        });
                    });
                }
            },
            isAppUser: function () {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType !== 'SUPERADMIN' && userDetail.userType !== 'ADMIN';
            },
            isSuperAdmin: function () {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType === 'SUPERADMIN' && userDetail.userType || null;
            },
            isAppAdmin: function () {
                var userDetail = context.authFact.getUserDetail();
                return userDetail && userDetail.userType === 'ADMIN' && userDetail.userType || null;
            },
            isAppCustomer: function () {
                var userDetails = context.authFact.getUserDetail();
                return userDetails && userDetails.appCustomer || context.commonFact.isLocalAppCustomer();
            },
            isLocalAppCustomer: function () {
                return context.erpAppConfig.appCustomer;
            },
            isShowMenu: function (menu) {
                var disabled = menu.disableMenu || menu.disable || (context.commonFact.isAppCustomer() ? context.erpAppConfig.appModules ? (!context.erpAppConfig.appModules.includes('all') && !menu.show) : true : false);
                var superAdmin = context.commonFact.isSuperAdmin() && menu.superAdmin || false;
                var isAppCustomer = !menu.superAdmin && context.commonFact.isAppCustomer();
                return !disabled && (superAdmin || isAppCustomer || menu.allUser);
            },
            errorHandler: function (e) {
                if (!context.controller || context.controller.id !== 'login') {
                    context.authFact.logout();
                    context.commonFact.goToPage(context.erpAppConfig.modules.controllers.login.page.link);
                }

                return e;
            },
            callActions: function (actionNames, params) {
                var actionMethod;
				if(typeof(actionNames) !== 'object'){
					actionNames = [actionNames];
				}
				for(var i in actionNames){
					actionMethod = actionNames[i] && context.controller.methods[actionNames[i]] || context.authFact[actionNames[i]] || context.commonFact[actionNames[i]];
					actionMethod && actionMethod.apply(this, params);
				}
				
            },
            appModuleAccess: function () {
                var promiseRes = context.commonFact.getPromiseRes();
                var isAppCustomer = context.commonFact.isAppCustomer();
                var userDetail = context.authFact.getUserDetail();
                if (userDetail && isAppCustomer) {
                    context.commonFact.getData(context.erpAppConfig.modules.controllers.admin.settings, isAppCustomer).then(function (res) {
                        context.erpAppConfig = angular.extend(context.erpAppConfig, res.data);
                        if (context.erpAppConfig.appModules && !context.erpAppConfig.appModules.includes('all')) {
                            for (var i in context.erpAppConfig.modules.controllers) {
                                var module = context.erpAppConfig.modules.controllers[i];
                                var isSubModule = false;
                                if (!module.page) {
                                    for (var j in module) {
                                        if (typeof(module[j]) === 'object') {
                                            if (!module.defaultRelease && !context.erpAppConfig.appModules.includes(i + '/' + j) && !context.erpAppConfig.appModules.includes(i + '/**')) {
                                                delete context.erpAppConfig.modules.controllers[i][j];
                                            } else {
                                                isSubModule = true;
                                                context.erpAppConfig.modules.controllers[i][j].show = true;
                                            }
                                        }
                                    }
                                }
                                if (!context.erpAppConfig.appModules.includes(i) && !isSubModule && !module.defaultRelease) {
                                    delete context.erpAppConfig.modules.controllers[i];
                                } else {
                                    context.erpAppConfig.modules.controllers[i].show = true;
                                }
                            }

                        }
                        context.commonFact.appModuleActionsAccess();
                        promiseRes.resolve();
                    });
                } else {
                    promiseRes.resolve();
                }
                return promiseRes.promise;
            },
            appModuleActionsAccess: function (ctrl) {
                var userDetail = context.authFact.getUserDetail();
                if (context.commonFact.isAppUser()) {
                    for (var i in context.erpAppConfig.mapping) {
                        var map = context.erpAppConfig.mapping[i];
                        var module = context.commonFact.getDeepProp(context.erpAppConfig.modules.controllers, map.module) || {};
                        if (!userDetail.userType || (userDetail.userType && map.restrictUser !== userDetail.userType)) {
                            module.disable = map.restrictUser && true;
                        }
                        if (module.page && (module.page.actions || module.page.actions === undefined)) {
                            module.page.actions = {
                                print: true
                            };
                            module.page.actions.add = map.restrictUser === userDetail.userType && map['add'] || false;
                            module.page.actions.edit = map.restrictUser === userDetail.userType && map['edit'] || false;
                            module.page.actions.delete = map.restrictUser === userDetail.userType && map['delete'] || false;
                        }
                        if (ctrl && ctrl.id === module.id) {
                            return module;
                        }
                    }
                }
                return ctrl;
            },
            getPromiseRes: function () {
                var returnPromiseRes;
                var returnPromiseRej;
                var returnPromise = new Promise(function (res, rej) {
                    returnPromiseRes = res;
                    returnPromiseRej = rej;
                });
                return {
                    promise: returnPromise,
                    resolve: returnPromiseRes,
                    reject: returnPromiseRej
                };
            },
            getAllYearData: function () {
                var listOfDbsConfig = {
                    id: 'getYearDatabases'
                };
                var prodTabConfig = context.erpAppConfig.modules.controllers.report.productionEntryReport.services.list;

                return context.commonFact.getData(listOfDbsConfig).then(function (res) {
                    var listOfDbs = res.data;
                    var listOfDbsProm = [];
                    var dataList = [];
                    for (var i in listOfDbs) {
                        var serConf = angular.copy(prodTabConfig);
                        serConf.params.year = listOfDbs[i];
                        listOfDbsProm.push(context.commonFact.getData(serConf).then(function (prodRes) {
                                dataList.push(prodRes.data);
                            }));
                    }
                    return Promise.all(listOfDbsProm).then(function () {
                        return dataList;
                    });
                });
            },
            startAutoComplete: function (element, attrs, field, map, key) {
                var fieldData;
                var autoCompleteModel;
                if (map!==undefined && key!==undefined) {
					field.autoCompleteModel = field.autoCompleteModel || [];
					field.autoCompleteOptions = field.autoCompleteOptions || [];
					field.selectedOption = field.selectedOption || [];
					autoCompleteModel = field.autoCompleteModel[key] = '';
                } else {
                    autoCompleteModel = field.autoCompleteModel = '';
                }

                element.find('input').bind('blur', function () {
                    $timeout(
                        function () {
                        if (autoCompleteModel === '' || !autoCompleteModel) {
                            element.find('li') && element.find('li')[0] && element.find('li')[0].click();
                        }
						if (map!==undefined && key!==undefined) {
							field.autoCompleteOptions[key] = null;
							field.selectedOption[key] = null;
						}
						else{
							field.autoCompleteOptions = null;
							field.selectedOption = null;
						}

                    }, 200)
                });
                element.find('i').bind('click', function (e) {
                    element.find('input').focus();
                    $timeout(
                        function () {
                        context.commonFact.showAutoComplete(field, e, true, map, key);
                    }, 300);
                });
                /* $timeout(
                    function () {
                    fieldData = map && map || context.controller.data;
                    if (context.controller.page.name === 'edit' && fieldData && fieldData[field.id]) {
                        if (map!==undefined && key!==undefined) {
                            field.autoCompleteModel[key] = context.commonFact.replaceFieldVal(fieldData[field.id], field);
                        } else {
                            field.autoCompleteModel = context.commonFact.replaceFieldVal(fieldData[field.id], field);
                        }

                    }
                }, 500); */

            },
            showAutoComplete: function (field, event, icon, map, key) {
                var fieldData = map || context.controller.data;
                var output = [{
                        optionId: '',
                        optionName: field.name
                    }
                ] || [];
				var autoCompleteModel;
				var autoCompleteOptions;
				var selectedOption;
                if (map!==undefined && key!==undefined) {
					autoCompleteModel = field.autoCompleteModel[key];
					autoCompleteOptions = field.autoCompleteOptions[key];
					selectedOption = field.selectedOption[key] || 0;
                } else {
                    autoCompleteModel = field.autoCompleteModel;
					autoCompleteOptions = field.autoCompleteOptions;
					selectedOption = field.selectedOption || 0;
                }

                if (event.keyCode === 40 && autoCompleteOptions) { //down key, increment selectedIndex
                    event.preventDefault();
                    if (selectedOption + 1 === autoCompleteOptions.length) {
                        selectedOption = 0;
                    } else {
                        selectedOption++;
                    }
                    autoCompleteModel = field.name !== autoCompleteOptions[selectedOption].optionName ? autoCompleteOptions[selectedOption].optionName : '';
                } else if (event.keyCode === 38 && field.autoCompleteOptions) { //up key, decrement selectedIndex
                    event.preventDefault();

                    if (selectedOption === 0) {
                        selectedOption = autoCompleteOptions.length - 1;
                    } else {
                        selectedOption--;
                    }
                    autoCompleteModel = field.name !== autoCompleteOptions[selectedOption].optionName ? autoCompleteOptions[selectedOption].optionName : '';

                } else if ((event.keyCode === 13 || event.keyCode === 9) && autoCompleteOptions) { //enter pressed or tab

                    context.commonFact.fillAutoComplete(autoCompleteOptions[selectedOption], field, map, key);

                } else if (event.keyCode === 27) {
                    autoCompleteOptions = null;
                    selectedOption = null;
                } else {
                    selectedOption = null;
                    autoCompleteModel = autoCompleteModel || '';
                    for (var i in field.options) {
                        if (field.options[i].optionName.toLowerCase().indexOf(autoCompleteModel.toLowerCase()) >= 0 || autoCompleteModel === '' || icon) {
                            output.push(field.options[i]);
                        }
                    }
                    autoCompleteOptions = output;

                    if (autoCompleteOptions && autoCompleteOptions.length === 2) {
                        selectedOption = 1;
                    }
                    if ((autoCompleteModel === '' || !autoCompleteModel) && !field.isFilterBy && !field.isFilterView) {
                        fieldData[field.id] = '';
                        context.commonFact.callActions(field.action, [fieldData, fieldData[field.id], field, map, key]);
                    }
                }
				if (map!==undefined && key!==undefined) {
                    field.autoCompleteModel[key] = autoCompleteModel;
					field.autoCompleteOptions[key] = autoCompleteOptions;
					field.selectedOption[key] = selectedOption;
                } else {
                    field.autoCompleteModel = autoCompleteModel;
					field.autoCompleteOptions = autoCompleteOptions;
					field.selectedOption = selectedOption;
                }
                return true;
            },
            fillAutoComplete: function (option, field, map, key) {
                var fieldData = map || context.controller.data;
				var autoCompleteModel;
                if (map!==undefined && key!==undefined) {
					autoCompleteModel = field.autoCompleteModel[key];
                } else {
                    autoCompleteModel = field.autoCompleteModel;
                }
                autoCompleteModel = (option && field.name !== option.optionName) ? option.optionName : '';
                if (field.isFilterBy) {
                    field.selectedFilterBy = option && option.optionId || '';
                    context.commonFact.viewFilterBy(field);
                } else if (field.isFilterView) {
                    context.controller.filterView.data[field.id] = option && option.optionId || '';
                    context.commonFact['list']();
                } else {
                    fieldData[field.id] = option && option.optionId || '';
                    context.commonFact.callActions(field.action, [fieldData, fieldData[field.id], field, map, key]);
                }
                if (map!==undefined && key!==undefined) {
                    field.autoCompleteModel[key] = autoCompleteModel;
					field.autoCompleteOptions[key] = null;
					field.selectedOption[key] = null;
                } else {
                    field.autoCompleteModel = autoCompleteModel;
					field.autoCompleteOptions = null;
					field.selectedOption = null;
                }
                return true;
            },
            fieldDataFormat: function (field, data) {
                if (data) {

                    data = field.inputType === 'date' ? new Date(data) : data;
                }
                return data;
            },
            getRate: function (data, startDate, endDate, isMust, dateOnly) {
                var returnValue;
                var rateMapping = [];
                if (data) {
                    if (startDate || endDate) {
                        startDate = new Date(startDate);
                        endDate = endDate && new Date(endDate) || new Date();
                        for (var i in data.mapping) {
                            if (startDate <= new Date(data.mapping[i].date) && new Date(data.mapping[i].date) <= endDate) {
                                rateMapping.push(data.mapping[i]);
                            }
                        }

                    } else {
                        rateMapping = data.mapping;
                    }
                    if (!dateOnly) {
                        returnValue = rateMapping && rateMapping.length && rateMapping[rateMapping.length - 1].rate || !isMust && data.rate || '';
                    } else {
                        returnValue = rateMapping && rateMapping.length && context.commonFact.dateFormatChange(rateMapping[rateMapping.length - 1].date) || '';
                    }

                }
                return returnValue;
            },
			amendmentRateUpdate: function(data, key, field, fieldMapKey){
				data.rate = context.commonFact.getRate(field.options[key]);
			}
        };
    };
};

erpApp.factory('commonFact', ['$filter', '$location', '$window', '$http', '$timeout', erpConfig.moduleFiles.commonFact]);

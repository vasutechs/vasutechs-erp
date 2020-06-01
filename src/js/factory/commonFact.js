erpConfig.moduleFiles.commonFact = function(serviceApi, $filter, $location, $window, $http) {
    return function(context) {
        return {
            add: function() {
                context.page.name = 'add';
                context.data = angular.copy(context.masterData);
                if (context.form.autoGenKey) {
                    context.methods.setAutoGenKey();
                }
                if (context.data.date === null) {
                    context.data.date = new Date();
                }
                context.page.editKey = undefined;
                context.page.printView = undefined;
                return context.methods.formRender().then(function() {
                    context.methods.callBackAdd && context.methods.callBackAdd();
                    return true;
                });
            },
            edit: function(key, printView) {
                context.page.name = 'edit';
                context.page.printView = printView;
                context.page.editKey = key;
                context.existEditData = context.page.editKey && context.methods.findObjectByKey(context.listViewDataMaster, 'id', context.page.editKey);

                return context.methods.formRender().then(function() {
                    return context.methods.getData(context, key).then(function(res) {
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
                        context.methods.callBackEdit && context.methods.callBackEdit(key);
                        return context;
                    });
                });

            },
            printView: function(key, printView) {
                context.methods.edit(key, printView);
            },
            disable: function(id, item) {
                context.methods.callBeforeDelete && context.methods.callBeforeDelete(item);
                context.listViewDataMaster[id]['disabled'] = true;
                context.methods.updateData(context, context.listViewData[id]);
                context.methods.list();
                context.methods.callBackDelete && context.methods.callBackDelete(id, item);
            },
            delete: function(id, item) {
                context.methods.callBeforeDelete && context.methods.callBeforeDelete(id, item);
                context.methods.updateData(context, { key: id, delete: 'yes' });
                context.methods.list();
                context.methods.callBackDelete && context.methods.callBackDelete(id, item);
            },
            list: function() {
                context.page.name = 'list';
                context.currentPage = 0;
                context.pageSize = 10;
                context.filterBy = context.services.list.filter || {};
                context.listViewData = [];
                context.orderByProperty = 'updated';
                context.methods.pageActionsAccess();
                return context.methods.getData(context).then(function(res) {
                    var listViewData = res.data;
                    for (var x in listViewData) {
                        listViewData.hasOwnProperty(x) && !listViewData[x].disabled && context.listViewData.push(listViewData[x])
                    }
                    context.listViewDataMaster = angular.copy(context.listViewData);
                    context.lastData = angular.copy(context.listViewData[context.listViewData.length - 1]);
                    context.methods.callBackList && context.methods.callBackList();
                    return context;
                });
            },
            formRender: function() {
                return context.methods.updateFields(context.form.fields).then(function() {
                    if (context.form.mapping) {
                        return context.methods.updateFields(context.form.mapping.fields);
                    }
                    return context;
                });

            },
            getPageData: function() {
                return $filter('filter')(context.listViewData, context.filterBy, true) || [];
            },
            numberOfPages: function() {
                return Math.ceil(context.methods.getPageData(context).length / context.pageSize);
            },
            submit: function() {
                var userDetails = authFact.getUserDetail();
                context.data.updatedUserId = userDetails && userDetails.id || null;
                return context.methods.updateData(context, context.data).then(function(res) {
                    context.methods.list();
                    context.methods.callBackSubmit && context.methods.callBackSubmit(res.data);
                    return context;
                });

            },
            cancel: function() {
                context.methods.list();
            },
            getData: function(module, id) {
                var serviceConf = this.getServiceConfig(module, 'GET', id);
                //Get Part master data
                return serviceApi.callServiceApi(serviceConf);
            },
            updateData: function(module, data, id) {
                var serviceConf = context.methods.getServiceConfig(module, 'POST', id);
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
            matchFilter: function(field, list) {
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
            makeOptionsFields: function(field) {
                var self = this,
                    list;

                field.options = {};
                field.allOptions = {};

                return context.methods.getData(field.dataFrom).then(function(res) {
                    list = res.data;
                    for (var i in list) {
                        var optionVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                        var optionIdVal = field.optionId && list[i][field.optionId] || list[i]['id'];
                        var optionNameVal = field.valuePrefix && field.valuePrefix || '';
                        var editOption = context.existEditData && optionIdVal === context.existEditData[field.id] || false;
                        optionNameVal += field.valuePrefixData && list[i][field.valuePrefixData] + ' - ' || '';
                        optionNameVal += list[i][field.replaceName] || '';
                        var isCheckExistVal = field.existingCheck && context.listViewDataMaster && context.methods.findObjectByKey(context.listViewDataMaster, field.id, optionIdVal) || false;
                        field.allOptions[optionVal] = list[i];
                        field.allOptions[optionVal]['optionName'] = optionNameVal;
                        field.allOptions[optionVal]['optionId'] = optionIdVal;
                        if ((field.filter === undefined || self.matchFilter(field, list[i], context) === true) &&
                            (!isCheckExistVal || editOption)) {
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
            removeMapping: function(data, key) {
                delete data.splice(key, 1);
                context.methods.callBackRemoveMapping && context.methods.callBackRemoveMapping(data, key);
            },
            changeMapping: function(data, key, field, fieldMapKey) {
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
                                            if (mapfield.action && context.methods[mapfield.action]) {
                                                if (mapfield.type === 'select') {
                                                    context.methods[mapfield.action](data[dataKey][mapKey], data[dataKey][mapKey][mapfield.id], mapfield, mapKey);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                field.callBack !== false && context.methods.callBackChangeMapping && context.methods.callBackChangeMapping(data, key, field, fieldMapKey);
            },
            setAutoGenKey: function() {
                var lastDataKey = context.lastData ? context.lastData[context.form.autoGenKey] : undefined;
                lastDataKey = lastDataKey ? parseInt(lastDataKey) + 1 : context.form.autoGenValStart ? context.form.autoGenValStart : 1;
                context.data[context.form.autoGenKey] = lastDataKey;
                context.methods.callBackSetAutoGenKey && context.methods.callBackSetAutoGenKey();
            },
            dateFormatChange: function(dateValue) {
                dateValue = new Date(dateValue);
                return dateValue.getDate() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getFullYear();
            },
            timeFormatChange: function(value) {
                value = new Date(value);
                return value.getHours() + ':' + value.getMinutes() + ':' + value.getSeconds();
            },
            getOperationFromFlow: function(field, restriction) {
                var self = this,
                    partNo = restriction.partNo || context.data.partNo,
                    limit = 0;
                var returnPromise = [];
                var partStockPromise;
                if (partNo) {
                    context.methods.makeOptionsFields(field);
                    var localOptions = field.options;
                    partStockPromise = context.methods.getData('production.flowMaster').then(function(res) {
                        var flowMasterData = res.data,
                            flowMasterVal;
                        field.options = {};
                        for (var i in flowMasterData) {
                            if (flowMasterData[i].partNo === partNo) {
                                var flowMapPromise = context.methods.mergeOprFlowMap(flowMasterData[i].mapping).then(function(flowMasterMap) {
                                    var startWith = context.methods.findObjectByKey(flowMasterMap, 'id', restriction.startWith);
                                    flowMasterMap = context.methods.objectSort(flowMasterMap, 'opCode');
                                    for (var j in flowMasterMap) {
                                        flowMasterVal = flowMasterMap[j];
                                        if ((!restriction.limit || limit < restriction.limit) &&
                                            (!restriction.startWith || (startWith.opCode < flowMasterVal.opCode)) &&
                                            (restriction.filter === undefined || self.matchFilter(restriction, flowMasterVal) === true)) {
                                            limit++;
                                            field.options[' ' + flowMasterVal.id] = localOptions[flowMasterVal.id];
                                        }
                                    }
                                    return field;
                                });
                                returnPromise.push(flowMapPromise);
                            }
                        }
                        return field;
                    });
                }
                returnPromise.push(partStockPromise);

                return Promise.all(returnPromise);
            },
            updatePartStock: function() {
                var self = this;
                var returnPromise = [];
                var partStockPromise = context.methods.getData('report.partStock').then(function(res) {
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
                        returnPromise.push(context.methods.updateData('report.partStock', data).then(function() {
                            context.methods.getPartStock();
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

                        returnPromise.push(context.methods.updateData('report.partStock', data).then(function() {
                            context.methods.getPartStock();
                        }));
                    }
                });
                returnPromise.push(partStockPromise);

                return Promise.all(returnPromise);
            },
            updateSCStock: function() {
                var self = this;
                var returnPromise = [];
                var partStockPromise = context.methods.getData('report.subContractorStock').then(function(res) {
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
                    returnPromise.push(context.methods.updateData('report.subContractorStock', data));
                });

                returnPromise.push(partStockPromise);

                return Promise.all(returnPromise);
            },
            updatePartTotal: function(data, newValue, field, fieldMapKey) {
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
                data.total = parseFloat(totalBeforTax).toFixed(2);
                context.methods.callBackUpdatePartTotal && context.methods.callBackUpdatePartTotal(data, newValue, field, fieldMapKey);

            },
            getServiceConfig: function(module, replaceMethod, appendValue) {
                var currentYear = new Date().getMonth() >= context.erpAppConfig.yearChangeMonth ? new Date().getFullYear() : new Date().getFullYear() - 1;
                var serviceConfig = module;
                if (typeof(module) !== 'object') {
                    serviceConfig = context.methods.getDeepProp(context.erpAppConfig.modules.controllers, module + '.services.list')
                } else if (module.id) {
                    serviceConfig = module.services.list;
                }
                if (!serviceConfig) {
                    return false;
                }
                serviceConfig.url = serviceConfig.url.replace('{{YEAR}}', context.erpAppConfig.calendarYear || currentYear);
                serviceConfig.url = appendValue ? serviceConfig.url + '/' + appendValue : serviceConfig.url;
                serviceConfig.method = replaceMethod ? replaceMethod : serviceConfig.method;
                serviceConfig.cache = serviceConfig.cache === undefined ? context.erpAppConfig.httpCache : serviceConfig.cache;
                return serviceConfig;
            },
            getPartStock: function() {
                context.methods.getData('report.partStock').then(function(res) {
                    var partStockData = res.data,
                        partStock = {};
                    for (var i in partStockData) {
                        partStock[partStockData[i].partNo + '-' + partStockData[i].operationTo] = partStockData[i] && partStockData[i] || undefined;
                    }
                    context.partStock = partStock;
                });
            },
            getSCStock: function() {
                return context.methods.getData('report.subContractorStock').then(function(res) {
                    var scStockData = res.data,
                        scStock = {};
                    for (var i in scStockData) {
                        scStock[scStockData[i].partNo + '-' + scStockData[i].operationFrom] = scStockData[i] && scStockData[i] || undefined;
                    }
                    context.partStock = scStock;
                    return scStock;
                });
            },
            getRMStock: function() {
                context.methods.getData('report.rmStock').then(function(res) {
                    var rmStockData = res.data,
                        rmStock = {};
                    for (var i in rmStockData) {
                        rmStock[rmStockData[i].rmCode] = rmStockData[i] && rmStockData[i] || undefined;
                    }
                    context.rmStock = rmStock;
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
            viewFilterBy: function(list) {
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
            getFlowMaster: function() {
                context.flowMasterData = {};
                context.flowMasterByPart = {};
                context.flowMasterByPartOpr = {};

                return context.methods.getData('production.flowMaster').then(function(res) {
                    var flowMasterData = res.data,
                        prevOpp;

                    context.flowMasterData = flowMasterData;
                    for (var i in flowMasterData) {
                        context.flowMasterByPart[flowMasterData[i].partNo] = flowMasterData[i];
                        for (var j in flowMasterData[i].mapping) {
                            context.flowMasterByPartOpr[flowMasterData[i].partNo + '-' + flowMasterData[i].mapping[j].id] = flowMasterData[i].mapping[j];
                        }
                    }
                    return context;
                });

            },
            mergeOprFlowMap: function(flowMap) {
                var optionsPromiseResolve, optionsPromise = new Promise(function(resolve, reject) {
                    optionsPromiseResolve = resolve;
                });

                context.methods.getData('production.operationMaster').then(function(res) {
                    for (var i in flowMap) {
                        flowMap[i] = res.data[flowMap[i].id];
                        flowMap[i].opCode = parseInt(res.data[flowMap[i].id].opCode);
                    }
                    optionsPromiseResolve(flowMap);
                });
                return optionsPromise;
            },
            getOperations: function() {
                context.operationsData = {};

                context.methods.getData('production.operationMaster').then(function(res) {
                    context.operationsData = res.data;
                });

            },
            isCheckExistField: function(data, value, field) {
                if (context.listViewData && context.methods.findObjectByKey(context.listViewData, field.id, value)) {
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
            updateGstPart: function(data, newValue, field, fieldMapKey) {
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
                context.methods.updatePartTotal(data, data[acceptedQtyField.id], acceptedQtyField, fieldMapKey);
            },
            updateFields: function(fields) {
                var returnPromise = [];
                for (var i in fields) {
                    if (fields[i].dataFrom && context.methods.getDeepProp(context.erpAppConfig.modules.controllers, fields[i].dataFrom) && (fields[i].makeFieldOptions === undefined || fields[i].makeFieldOptions)) {
                        returnPromise.push(context.methods.makeOptionsFields(fields[i]));
                    }
                    if (fields[i].dataFrom && !context.methods.getDeepProp(context.erpAppConfig.modules.controllers, fields[i].dataFrom)) {
                        delete fields[i];
                    }
                }
                return Promise.all(returnPromise);
            },
            showSubModule: function(module) {
                var subModules = {};

                for (var i in module) {
                    if (typeof(module[i]) === 'object') {
                        subModules[i] = module[i];
                    }
                }
                return subModules;
            },
            pageActionsAccess: function() {
                var actions = {
                    add: false,
                    edit: false,
                    delete: false,
                    print: false
                };
                if (context.page && (context.page.actions === undefined || context.page.actions)) {
                    actions.add = context.page.actions === undefined ? true : context.page.actions.add;
                    actions.edit = context.page.actions === undefined ? true : context.page.actions.edit;
                    actions.delete = context.page.actions === undefined ? true : context.page.actions.delete;
                    actions.print = context.page.actions === undefined ? true : context.page.actions.print;
                }
                context.page.actions = actions;
            },
            isFloat: function(n) {
                return Number(n) === n && n % 1 !== 0;
            },
            downloadExcel: function(table) {
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
            updatePORmTotal: function(data) {
                var total = 0;
                var qty = data['qty'] || data['acceptedQty'] || 0;
                total = qty * data.rate;
                data.total = parseFloat(total).toFixed(2);
                context.methods.updatePOTotalAmount();

            },
            updatePOTotalAmount: function() {
                var gst = context.data.gst,
                    igst = context.data.igst,
                    cgst = context.data.cgst,
                    sgst = context.data.sgst,
                    igstTotal = 0,
                    cgstTotal = 0,
                    sgstTotal = 0,
                    gstTotal = 0,
                    total = 0,
                    subTotal = 0,
                    mapping = context.data.mapping,
                    extraAmount = context.data.extraAmount || 0;

                for (var i in mapping) {
                    subTotal += mapping[i].total && parseFloat(mapping[i].total) || 0;
                }
                cgstTotal = context.data.cgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.data.cgst / 100)) || 0;
                sgstTotal = context.data.sgst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.data.sgst / 100)) || 0;
                igstTotal = context.data.igst && ((parseFloat(extraAmount) + parseFloat(subTotal)) * parseFloat(context.data.igst / 100)) || 0;

                gstTotal = (parseFloat(cgstTotal) + parseFloat(sgstTotal) + parseFloat(igstTotal));
                total = subTotal + gstTotal + extraAmount;
                context.data.gstTotal = parseFloat(gstTotal).toFixed(2);
                context.data.subTotal = parseFloat(subTotal).toFixed(2);
                context.data.total = parseInt(total);
            },
            goToPage: function(url, isReload) {
                window.location.hash = '#!/' + url;
                if (isReload) {
                    setTimeout(function() { window.location.reload() }, 500);
                }
            },
            setSessionStore: function(key, data) {
                $window.sessionStorage.setItem(key, data);
            },
            getSessionStore: function(key) {
                var data = $window.sessionStorage.getItem(key);

                return data;
            },
            selectListData: function(data) {
                if (!context.selectedTableData) {
                    context.selectedTableData = {};
                    context.selectedTableData[context.id] = {};
                }
                context.selectedTableData[context.id][data.id] = angular.copy(data);
                delete context.selectedTableData[context.id][data.id].id;
                delete context.selectedTableData[context.id][data.id].isExported;
            },
            downloadTableData: function() {
                context.methods.downloadFile(context.selectedTableData, context.id + '.json');
            },
            downloadFile: function(data, name, type) {

                if (!type || type === 'json') {
                    data = JSON.stringify(data);
                }
                //Convert JSON string to BLOB.
                data = [data];

                var blob1 = new Blob(data, { type: 'application/octet-stream' });

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
            showLoadingHttp: function(scope) {
                var showLoader = function(v) {
                    if (v) {
                        scope.context.showLoading = false;
                    } else {
                        scope.context.showLoading = true;
                    }
                };
                scope.isLoading = function() {
                    return $http.pendingRequests.length <= 0;
                };

                scope.$watch(scope.isLoading, showLoader);
            },
            getDeepProp: function(obj, desc) {
                var arr = desc.split(".");
                while (arr.length && (obj = obj[arr.shift()]));
                return obj;
            },
            location: $location,
            changeCalendarYear: function() {
                context.methods.getData('calendarYear');
                context.methods.goToPage(context.erpAppConfig.modules.controllers.dashboard.page.link);
            },
            downloadData: function() {
                angular.element('#downloadModal').modal('show');
            },
            showAlertRol: function() {
                var showROL = true;
                var userType = context.methods.isLogin();
                var alertRolContext = {
                    partRolYellow: [],
                    partRolRed: [],
                    hideROL: function() {
                        showROL = false;
                    }
                };
                if (userType) {
                    context.methods.getData('marketing.partMaster').then(function(res) {
                        var partMaster = res.data;
                        context.methods.getData('report.partStock').then(function(res1) {
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
                                    if (redAlert >= checkPartStock.partStockQty) {
                                        alertRolContext.alertRolContext.partRolRed.push(checkPartStock);
                                    } else if (yellowAlert >= checkPartStock.partStockQty) {
                                        alertRolContext.alertRolContext.partRolYellow.push(checkPartStock);
                                    }
                                }

                            }
                            if ((alertRolContext.alertRolContext.partRolRed.length > 0 || alertRolContext.alertRolContext.partRolYellow.length > 0) && showROL) {
                                angular.element('#RolModal').modal('show');
                            }
                        });
                    });
                }
                return alertRolContext;
            },
            isAppUser: function() {
                var userType = context.methods.isLogin();
                return userType !== 'SUPERADMIN' && userType !== 'ADMIN';
            },
            isSuperAdmin: function() {
                var userType = context.methods.isLogin();
                return userType === 'SUPERADMIN';
            },
            isAppAdmin: function() {
                var userType = context.methods.isLogin();
                return userType === 'ADMIN';
            },
            isAppCustomer: function() {
                var userDetails = context.methods.getUserDetail()();
                return userDetails.appCustomer;
            },
            isShowMenu: function(menu) {
                var disabled = menu.disableMenu || menu.disable;
                var restricked = context.methods.isSuperAdmin() && menu.restricked || false;
                var isAppCustomer = !menu.restricked && context.methods.isAppCustomer();
                return !disabled && (restricked || isAppCustomer);
            }
        };
    };
};

erpApp.factory('commonFact', erpConfig.moduleFiles.commonFact);
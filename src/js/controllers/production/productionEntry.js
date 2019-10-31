erpApp.controller('productionEntryCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        callBackAdd: function(context) {
            context.page.printViewMapping = false;
            context.finalMapping = 0;
        },
        callBackEdit: function(context) {
            var jobCardField = context.form.fields['jobCardNo'];
            var jobCardData = angular.copy(context.data[jobCardField.id]);
            if (!context.page.printView) {
                context.page.printViewMapping = true;
                context.actions.addMapping(context.data.mapping);
                context.finalMapping = context.data.mapping.length - 1;
                jobCardField.filter = {};
                context.actions.makeOptionsFields(context, jobCardField).then(function() {
                    context.data[jobCardField.id] = jobCardData;
                    context.actions[jobCardField.action](context, context.data, context.data[jobCardField.id], jobCardField)
                });
            }
        },
        callBackList: function(context) {
            context.actions.getPartStock(context);
            context.actions.getPRQty(context);
            context.actions.getFlowMaster(context);
            context.actions.getOperations(context);
        },
        checkAcceptedQty: function(context, mappingData, value, field, fieldMapkey) {
            var qtyCanMake = 0,
                rejectionQty = mappingData.rejectionQty || 0,
                rwQty = mappingData.rwQty || 0,
                acceptedQty = mappingData.acceptedQty || 0,
                qty = acceptedQty + rejectionQty + rwQty;
            var fullQty;
            var prFrmQtyMap;
            var prFrmToQtyMap;
            var prToQtyMap;
            var stockQty;

            prFrmQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-frm';
            prToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationTo + '-to';
            prFrmToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-to';

            if (context.data.partNo && mappingData.operationFrom) {
                if (context.operationsData[mappingData.operationFrom].source === 'Supplier') {
                    qtyCanMake = context.form.fields['jobCardNo'].options[context.data.jobCardNo].qtyCanMake;
                } else if (context.operationsData[mappingData.operationFrom].source === 'Sub-Contractor') {
                    qtyCanMake = context.prQty[context.data.jobCardNo + '-' + context.data.partNo + '-' + context.partStock[context.data.partNo + '-' + mappingData.operationFrom].operationFrom + '-to'].prAcpQty || 0;
                } else {
                    qtyCanMake = context.prQty[prFrmToQtyMap] && context.prQty[prFrmToQtyMap].prAcpQty || 0;
                }
                stockQty = context.partStock[context.data.partNo + '-' + mappingData.operationFrom] && context.partStock[context.data.partNo + '-' + mappingData.operationFrom].partStockQty || 0;
                fullQty = context.prQty[prFrmQtyMap] && parseInt(context.prQty[prFrmQtyMap].prQty) + parseInt(qty) || qty;
            }

            if (qty > stockQty || fullQty > qtyCanMake || (context.prQty[prFrmToQtyMap] && context.prQty[prFrmToQtyMap].prAcpQty < qty)) {
                mappingData[field.id] = null
            }
        },
        callBackChangeMapping: function(context, data, key, field) {
            context.actions.updateOperationFrom(context, data, key, field);
            context.actions.updateOperationTo(context, data, key, field);
        },
        updateOperationFrom: function(context, data, key, field) {
            var prQtyFrmMap;
            var prQtyPrevMap;
            var prQtyToMap;
            var flwMap;
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;

            if (context.data.jobCardNo) {
                var restriction = {
                        partNo: context.data.partNo
                    },
                    operation = [];
                for (var i in context.partStock) {
                    if (context.partStock[i].partStockQty > 0 && context.data.partNo === context.partStock[i].partNo) {
                        prQtyPrevMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationFrom + '-frm';
                        prQtyFrmMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationTo + '-frm';
                        prQtyToMap = context.data.jobCardNo + '-' + context.partStock[i].partNo + '-' + context.partStock[i].operationFrom + '-to';
                        flwMap = context.partStock[i].partNo + '-' + context.partStock[i].operationTo;

                        if ((!context.prQty[prQtyFrmMap] &&
                                (!context.partStock[i].operationFrom ||
                                    (context.prQty[prQtyPrevMap] && context.prQty[prQtyPrevMap].prQty > 0))) ||
                            (context.prQty[prQtyFrmMap] && context.prQty[prQtyFrmMap].prQty < jobCardQty) ||
                            (context.flowMasterByPart[flwMap] && context.flowMasterByPart[flwMap].source === "Sub-Contractor" && context.prQty[prQtyToMap])) {
                            operation.push(context.partStock[i].operationTo);
                        }
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, mappingData, key, field) {
            if (context.data.jobCardNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    },
                    operation = [];
                var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
                var jobCardQty = jobCard && jobCard.qtyCanMake;

                if (mappingData.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: mappingData.operationFrom
                    });
                }

                context.actions.getOperationFromFlow(context, context.form.mapping.fields['operationTo'], restriction).then(function() {
                    var options = context.form.mapping.fields['operationTo'].options;
                    var firstOption = options[Object.keys(options)[0]];
                    if (firstOption && firstOption.source === 'Sub-Contractor') {
                        context.form.mapping.fields['operationTo'].options = {};
                    }
                });
            }
        },
        updateToolNo: function(context, mappingData) {
            mappingData.toolNo = context.data.partNo && mappingData.operationTo && context.flowMasterByPart[context.data.partNo + '-' + mappingData.operationTo].toolNo || null;
        },
        calculatePlanQty: function(context, mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            var palnQtyPerHr = context.data.partNo && mappingData.operationTo && context.flowMasterByPart[context.data.partNo + '-' + mappingData.operationTo].palnQtyPerHr || 1;
            mappingData.planQty = timeDiff * palnQtyPerHr;
        },
        updateMaterialIssue: function(context, replaceData, key) {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.actions.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function(context) {
            context.prQty = {};
            return context.actions.getData('production.productionEntry').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    for (var j in listViewData[i].mapping) {
                        var prFrmQty = 0;
                        var prToQty = 0;
                        var prQty = 0;
                        var prFrmAcpQty = 0;
                        var prToAcpQty = 0;
                        var prFrmQtyMap;
                        var prToQtyMap;
                        prFrmQtyMap = listViewData[i].jobCardNo + '-' + listViewData[i].partNo + '-' + listViewData[i].mapping[j].operationFrom + '-frm';
                        prToQtyMap = listViewData[i].jobCardNo + '-' + listViewData[i].partNo + '-' + listViewData[i].mapping[j].operationTo + '-to';
                        prQty = parseInt(listViewData[i].mapping[j].acceptedQty) + parseInt(listViewData[i].mapping[j].rejectionQty) + parseInt(listViewData[i].mapping[j].rwQty);
                        prFrmAcpQty = context.prQty[prFrmQtyMap] ? parseInt(context.prQty[prFrmQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);
                        prFrmQty = context.prQty[prFrmQtyMap] ? parseInt(context.prQty[prFrmQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToQty = context.prQty[prToQtyMap] ? parseInt(context.prQty[prToQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToAcpQty = context.prQty[prToQtyMap] ? parseInt(context.prQty[prToQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);

                        context.prQty[prFrmQtyMap] = listViewData[i].mapping[j];
                        context.prQty[prFrmQtyMap].prQty = prFrmQty;
                        context.prQty[prFrmQtyMap].prAcpQty = prFrmAcpQty;
                        context.prQty[prToQtyMap] = listViewData[i].mapping[j];
                        context.prQty[prToQtyMap].prQty = prToQty;
                        context.prQty[prToQtyMap].prAcpQty = prToAcpQty;
                    }
                };
                return context.prQty;
            });
        },
        callBackSubmit: function(context) {
            var newQty;
            var data = angular.copy(context.data.mapping[context.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.data.partNo;
            newContext.data = data;
            context.actions.updatePartStock(newContext);
            context.actions.updateMaterialIssue(context);
        }
    };

    commonFact.initCtrl($scope, 'production.productionEntry', actions);

}]);
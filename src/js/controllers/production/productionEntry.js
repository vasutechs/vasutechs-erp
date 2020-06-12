erpConfig.moduleFiles.productionEntry = function(context) {
    return {
        callBackAdd: function() {
            context.controller.page.printViewMapping = false;
            context.controller.finalMapping = 0;
        },
        callBackEdit: function() {
            if (!context.controller.page.printView) {
                context.controller.page.printViewMapping = true;
                context.commonFact.addMapping(context.controller.data.mapping);
                context.controller.finalMapping = context.controller.data.mapping.length - 1;
            }
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            context.controller.methods.getPRQty();
            context.commonFact.getFlowMaster();
            context.commonFact.getOperations();
        },
        checkAcceptedQty: function(mappingData, value, field, fieldMapkey) {
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

            prFrmQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationFrom + '-frm';
            prToQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationTo + '-to';
            prFrmToQtyMap = context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + mappingData.operationFrom + '-to';

            if (context.controller.data.partNo && mappingData.operationFrom) {
                if (context.controller.operationsData[mappingData.operationFrom].source === 'Supplier' || context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo].isAssemblePart === 1) {
                    qtyCanMake = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo].qtyCanMake;
                } else if (context.controller.operationsData[mappingData.operationFrom].source === 'Sub-Contractor') {
                    qtyCanMake = context.controller.prQty[context.controller.data.jobCardNo + '-' + context.controller.data.partNo + '-' + context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom].operationFrom + '-to'].prAcpQty || 0;
                } else {
                    qtyCanMake = context.controller.prQty[prFrmToQtyMap] && context.controller.prQty[prFrmToQtyMap].prAcpQty || 0;
                }
                stockQty = context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom] && context.controller.partStock[context.controller.data.partNo + '-' + mappingData.operationFrom].partStockQty || 0;
                fullQty = context.controller.prQty[prFrmQtyMap] && parseInt(context.controller.prQty[prFrmQtyMap].prQty) + parseInt(qty) || qty;
            }

            if (qty > stockQty || fullQty > qtyCanMake || (context.controller.prQty[prFrmToQtyMap] && context.controller.prQty[prFrmToQtyMap].prAcpQty < qty)) {
                mappingData[field.id] = null
            }
        },
        callBackChangeMapping: function(data, key, field) {
            context.controller.methods.updateOperationFrom(data, key, field);
            context.controller.methods.updateOperationTo(data, key, field);
        },
        updateOperationFrom: function(data, key, field) {
            var prQtyFrmMap;
            var prQtyPrevMap;
            var prQtyToMap;
            var flwMap;
            var jobCard = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;

            if (context.controller.data.jobCardNo) {
                var restriction = {
                        partNo: context.controller.data.partNo
                    },
                    operation = [];
                for (var i in context.controller.partStock) {
                    if (context.controller.partStock[i].partStockQty > 0 && context.controller.data.partNo === context.controller.partStock[i].partNo) {
                        prQtyPrevMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationFrom + '-frm';
                        prQtyFrmMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationTo + '-frm';
                        prQtyToMap = context.controller.data.jobCardNo + '-' + context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationFrom + '-to';
                        flwMap = context.controller.partStock[i].partNo + '-' + context.controller.partStock[i].operationTo;

                        if ((!context.controller.prQty[prQtyFrmMap] &&
                                (!context.controller.partStock[i].operationFrom ||
                                    (context.controller.prQty[prQtyPrevMap] && context.controller.prQty[prQtyPrevMap].prQty > 0))) ||
                            (context.controller.prQty[prQtyFrmMap] && context.controller.prQty[prQtyFrmMap].prQty < jobCardQty) ||
                            (context.controller.flowMasterByPartOpr[flwMap] && context.controller.flowMasterByPartOpr[flwMap].source === "Sub-Contractor" && context.controller.prQty[prQtyToMap])) {
                            operation.push(context.controller.partStock[i].operationTo);
                        }
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(mappingData, key, field) {
            if (context.controller.data.jobCardNo) {
                var partNo = context.controller.data.partNo,
                    restriction = {
                        partNo: partNo
                    },
                    operation = [];
                var jobCard = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo];
                var jobCardQty = jobCard && jobCard.qtyCanMake;

                if (mappingData.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: mappingData.operationFrom
                    });
                }

                context.commonFact.getOperationFromFlow(context.controller.form.mapping.fields['operationTo'], restriction).then(function() {
                    var options = context.controller.form.mapping.fields['operationTo'].options;
                    var firstOption = options[Object.keys(options)[0]];
                    if (firstOption && firstOption.source === 'Sub-Contractor') {
                        context.controller.form.mapping.fields['operationTo'].options = {};
                    }
                });
            }
        },
        updateToolNo: function(mappingData) {
            mappingData.toolNo = context.controller.data.partNo && mappingData.operationTo && context.controller.flowMasterByPartOpr[context.controller.data.partNo + '-' + mappingData.operationTo].toolNo || null;
        },
        calculatePlanQty: function(mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            var palnQtyPerHr = context.controller.data.partNo && mappingData.operationTo && context.controller.flowMasterByPartOpr[context.controller.data.partNo + '-' + mappingData.operationTo].palnQtyPerHr || 1;
            mappingData.planQty = timeDiff * palnQtyPerHr;
        },
        updateMaterialIssue: function() {
            var jobCard = context.controller.form.fields['jobCardNo'].options[context.controller.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.commonFact.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function() {
            context.controller.prQty = {};
            return context.commonFact.getData('production.productionEntry').then(function(res) {
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
                        prFrmAcpQty = context.controller.prQty[prFrmQtyMap] ? parseInt(context.controller.prQty[prFrmQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);
                        prFrmQty = context.controller.prQty[prFrmQtyMap] ? parseInt(context.controller.prQty[prFrmQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToQty = context.controller.prQty[prToQtyMap] ? parseInt(context.controller.prQty[prToQtyMap].prQty) + parseInt(prQty) : parseInt(prQty);
                        prToAcpQty = context.controller.prQty[prToQtyMap] ? parseInt(context.controller.prQty[prToQtyMap].prAcpQty) + parseInt(listViewData[i].mapping[j].acceptedQty) : parseInt(listViewData[i].mapping[j].acceptedQty);

                        context.controller.prQty[prFrmQtyMap] = listViewData[i].mapping[j];
                        context.controller.prQty[prFrmQtyMap].prQty = prFrmQty;
                        context.controller.prQty[prFrmQtyMap].prAcpQty = prFrmAcpQty;
                        context.controller.prQty[prToQtyMap] = listViewData[i].mapping[j];
                        context.controller.prQty[prToQtyMap].prQty = prToQty;
                        context.controller.prQty[prToQtyMap].prAcpQty = prToAcpQty;
                    }
                };
                return context.controller.prQty;
            });
        },
        callBackSubmit: function() {
            var newQty;
            var data = angular.copy(context.controller.data.mapping[context.controller.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.controller.data.partNo;
            newContext.controller.data = data;
            context.commonFact.updatePartStock(newContext);
            context.controller.methods.updateMaterialIssue();
        },
        prodEntryDownload: function() {
            if (!context.selectedTableData) {
                return;
            }
            var prodData = context.selectedTableData[context.controller.id];
            context.commonFact.getData('production.materialIssueNote').then(function(res) {
                var materData = res.data;
                var jobCardNo = 1;
                context.selectedTableData['materialIssueNote'] = {};
                for (var i in prodData) {
                    context.selectedTableData['materialIssueNote'][jobCardNo] = materData[prodData[i].jobCardNo];
                    context.selectedTableData['materialIssueNote'][jobCardNo].id = jobCardNo;
                    context.selectedTableData['materialIssueNote'][jobCardNo].jobCardNo = jobCardNo;
                    prodData[i].jobCardNo = jobCardNo;
                    jobCardNo++;
                }
                context.commonFact.downloadFile(context.selectedTableData, context.controller.id + '.json');
            });
        }
    };
};
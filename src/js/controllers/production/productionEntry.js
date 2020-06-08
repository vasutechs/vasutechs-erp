erpConfig.moduleFiles.productionEntry = function(context) {
    return {
        callBackAdd: function() {
            context.page.printViewMapping = false;
            context.finalMapping = 0;
        },
        callBackEdit: function() {
            if (!context.page.printView) {
                context.page.printViewMapping = true;
                context.commonFact.makeOptionsFields(context.data.mapping);
                context.finalMapping = context.data.mapping.length - 1;
            }
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            context.methods.getPRQty();
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

            prFrmQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-frm';
            prToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationTo + '-to';
            prFrmToQtyMap = context.data.jobCardNo + '-' + context.data.partNo + '-' + mappingData.operationFrom + '-to';

            if (context.data.partNo && mappingData.operationFrom) {
                if (context.operationsData[mappingData.operationFrom].source === 'Supplier' || context.form.fields['jobCardNo'].options[context.data.jobCardNo].isAssemblePart === 1) {
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
        callBackChangeMapping: function(data, key, field) {
            context.methods.updateOperationFrom(data, key, field);
            context.methods.updateOperationTo(data, key, field);
        },
        updateOperationFrom: function(data, key, field) {
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
                            (context.flowMasterByPartOpr[flwMap] && context.flowMasterByPartOpr[flwMap].source === "Sub-Contractor" && context.prQty[prQtyToMap])) {
                            operation.push(context.partStock[i].operationTo);
                        }
                    }
                }
                restriction.filter = {
                    id: operation
                }
                context.commonFact.getOperationFromFlow(context.form.mapping.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(mappingData, key, field) {
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

                context.commonFact.getOperationFromFlow(context.form.mapping.fields['operationTo'], restriction).then(function() {
                    var options = context.form.mapping.fields['operationTo'].options;
                    var firstOption = options[Object.keys(options)[0]];
                    if (firstOption && firstOption.source === 'Sub-Contractor') {
                        context.form.mapping.fields['operationTo'].options = {};
                    }
                });
            }
        },
        updateToolNo: function(mappingData) {
            mappingData.toolNo = context.data.partNo && mappingData.operationTo && context.flowMasterByPartOpr[context.data.partNo + '-' + mappingData.operationTo].toolNo || null;
        },
        calculatePlanQty: function(mappingData) {
            var startDate = mappingData.startTime;
            var endDate = mappingData.endTime;
            var timeDiff = endDate - startDate;
            var palnQtyPerHr = context.data.partNo && mappingData.operationTo && context.flowMasterByPartOpr[context.data.partNo + '-' + mappingData.operationTo].palnQtyPerHr || 1;
            mappingData.planQty = timeDiff * palnQtyPerHr;
        },
        updateMaterialIssue: function() {
            var jobCard = context.form.fields['jobCardNo'].options[context.data.jobCardNo];
            var jobCardQty = jobCard && jobCard.qtyCanMake;
            jobCard.status = 1;
            context.commonFact.updateData('production.materialIssueNote', jobCard);
        },
        getPRQty: function() {
            context.prQty = {};
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
        callBackSubmit: function() {
            var newQty;
            var data = angular.copy(context.data.mapping[context.finalMapping]);
            var newContext = angular.copy(context);
            data.partNo = context.data.partNo;
            newContext.data = data;
            context.commonFact.updatePartStock(newContext);
            context.methods.updateMaterialIssue();
        },
        prodEntryDownload: function() {
            if (!context.selectedTableData) {
                return;
            }
            var prodData = context.selectedTableData[context.id];
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
                context.commonFact.downloadFile(context.selectedTableData, context.id + '.json');
            });
        }
    };
};
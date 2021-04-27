erpConfig.moduleFiles.materialIssueNote = function (context) {
    var orgItemVal = null;
    return {
        callBackEdit: function () {
            orgItemVal = angular.copy(context.controller.data);
        },
        callBackAdd: function () {
            var rmStock = [];
            orgItemVal = null;

            for (var i in context.controller.rmStock) {
                if (context.controller.rmStock[i] && context.controller.rmStock[i].rmStockQty > 0) {
                    rmStock.push(context.controller.rmStock[i].rmCode);
                }

            }
            context.controller.form.fields['rmCode'] = angular.extend(context.controller.form.fields['rmCode'], {
                filter: {
                    id: rmStock
                }
            });
            context.commonFact.makeOptionsFields(context.controller.form.fields['rmCode']);

            
        },
        callBackList: function () {
            context.commonFact.getRMStock();
            context.controller.listView[1].filter = {
                isAssemblePart: undefined
            };
            context.commonFact.makeOptionsFields(context.controller.listView[1]);

            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === undefined) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.controller.listViewData = partDetailList;
        },
        getPartNo: function () {
            if (context.controller.data.rmCode) {
                context.controller.form.fields['partNo'].filter = {
                    rmCode: context.controller.data.rmCode
                };
                context.commonFact.makeOptionsFields(context.controller.form.fields['partNo']);
            }
        },
        getNorms: function () {
            if (context.controller.data.rmCode && context.controller.data.partNo) {
                context.controller.data.partNorms = null;
                context.controller.data.qtyCanMake = null;
                context.controller.data.issueQty = null;
                context.commonFact.getData('production.bom').then(function (res) {
                    var bomData = res.data;
                    for (var i in bomData) {
                        if (bomData[i].partNo === context.controller.data.partNo && bomData[i].rmCode === context.controller.data.rmCode) {
                            context.controller.data.partNorms = bomData[i].partNorms;
                        }
                    }
                });
				context.commonFact.getOperationFromFlow(context.controller.form.fields['operationToSC'], {
                partNo: context.controller.data.partNo
            });
            }
        },
        updateQtyMake: function () {
            if (context.controller.data.rmCode) {

                if (orgItemVal && orgItemVal.issueQty) {
                    context.controller.form.fields['issueQty'].max = parseInt(orgItemVal.issueQty) + parseInt(context.controller.rmStock[context.controller.data.rmCode].rmStockQty);
                } else {
                    context.controller.form.fields['issueQty'].max = context.controller.rmStock[context.controller.data.rmCode].rmStockQty;
                }

                if (context.controller.data.partNorms && context.controller.data.issueQty && context.controller.form.fields['issueQty'].max >= context.controller.data.issueQty) {
                    context.controller.data.qtyCanMake = context.controller.data.issueQty / context.controller.data.partNorms;
                } else {
                    context.controller.data.qtyCanMake = null;
                }

            }
        },
        removeRMStockQty: function (del) {
            var rmCode = context.controller.data.rmCode,
            existingStock = null,
            removeQty = context.controller.data.issueQty;

            existingStock = context.controller.rmStock[rmCode];
            if (existingStock) {
                var rmStockQty;
                if (!del && orgItemVal && orgItemVal.issueQty) {
                    removeQty = parseInt(orgItemVal.issueQty) - parseInt(removeQty);
                    rmStockQty = parseInt(existingStock.rmStockQty) + removeQty;
                } else if (del) {
                    rmStockQty = parseInt(existingStock.rmStockQty) + parseInt(removeQty);
                } else {
                    rmStockQty = parseInt(existingStock.rmStockQty) - parseInt(removeQty);
                }
                var data = {
                    id: existingStock.id,
                    rmCode: rmCode,
                    rmStockQty: rmStockQty,
                    uomCode: existingStock.uomCode
                };
                context.commonFact.updateData('report.rmStock', data);
            }
        },
        callBackSubmit: function () {
            var qtyCanMake;
            context.controller.methods.removeRMStockQty();

            if (orgItemVal && orgItemVal.issueQty) {
                qtyCanMake = parseInt(context.controller.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                context.controller.data.acceptedQty = qtyCanMake;
            } else {
                context.controller.data.acceptedQty = context.controller.data.qtyCanMake;
            }
            context.commonFact.updatePartStock();
        },
        callBeforeDelete: function (id, item) {
            var qtyCanMake;
            context.controller.data = item;
            context.controller.methods.removeRMStockQty(true);
            context.controller.data.acceptedQty = 0 - parseInt(context.controller.data.qtyCanMake);
            context.commonFact.updatePartStock();
        }
    };
};

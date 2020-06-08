erpConfig.moduleFiles.materialIssueNote = function(context) {
    var orgItemVal = null;
    return {
        callBackEdit: function() {
            context.methods.callBackAdd();
            orgItemVal = angular.copy(context.data);
        },
        callBackAdd: function() {
            var rmStock = [];
            orgItemVal = null;

            for (var i in context.rmStock) {
                if (context.rmStock[i] && context.rmStock[i].rmStockQty > 0) {
                    rmStock.push(context.rmStock[i].rmCode);
                }

            }
            context.form.fields['rmCode'] = angular.extend(context.form.fields['rmCode'], {
                filter: {
                    id: rmStock
                }
            });
            context.commonFact.makeOptionsFields(context.form.fields['rmCode']);


        },
        callBackList: function() {
            context.commonFact.getRMStock();
            context.listView[1].filter = {
                isAssemblePart: undefined
            };
            context.commonFact.makeOptionsFields(context.listView[1]);

            var listViewData = angular.copy(context.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === undefined) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.listViewData = partDetailList;
        },
        getPartNo: function() {
            if (context.data.rmCode) {
                context.form.fields['partNo'].filter = {
                    rmCode: context.data.rmCode
                };
                context.commonFact.makeOptionsFields(context.form.fields['partNo']);
            }
        },
        getNorms: function() {
            var restriction = {
                partNo: context.data.partNo,
                filter: {
                    source: ['Supplier']
                }
            };
            if (context.data.rmCode && context.data.partNo) {
                context.data.partNorms = null;
                context.data.qtyCanMake = null;
                context.data.issueQty = null;
                context.commonFact.getData('production.bom').then(function(res) {
                    var bomData = res.data;
                    for (var i in bomData) {
                        if (bomData[i].partNo === context.data.partNo && bomData[i].rmCode === context.data.rmCode) {
                            context.data.partNorms = bomData[i].partNorms;
                        }
                    }
                });
                context.commonFact.getOperationFromFlow(context.form.fields['operationTo'], restriction);
            }
        },
        updateQtyMake: function() {
            if (context.data.rmCode) {

                if (orgItemVal && orgItemVal.issueQty) {
                    context.form.fields['issueQty'].max = parseInt(orgItemVal.issueQty) + parseInt(context.rmStock[context.data.rmCode].rmStockQty);
                } else {
                    context.form.fields['issueQty'].max = context.rmStock[context.data.rmCode].rmStockQty;
                }

                if (context.data.partNorms && context.data.issueQty && context.form.fields['issueQty'].max >= context.data.issueQty) {
                    context.data.qtyCanMake = context.data.issueQty / context.data.partNorms;
                } else {
                    context.data.qtyCanMake = null;
                }

            }
        },
        removeRMStockQty: function(del) {
            var rmCode = context.data.rmCode,
                existingStock = null,
                removeQty = context.data.issueQty;

            existingStock = context.rmStock[rmCode];
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
        callBackSubmit: function() {
            var qtyCanMake;
            context.methods.removeRMStockQty();

            if (orgItemVal && orgItemVal.issueQty) {
                qtyCanMake = parseInt(context.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                context.data.acceptedQty = qtyCanMake;
            } else {
                context.data.acceptedQty = context.data.qtyCanMake;
            }
            context.commonFact.updatePartStock();
        },
        callBeforeDelete: function(id, item) {
            var qtyCanMake;
            context.data = item;
            context.methods.removeRMStockQty(true);
            context.data.acceptedQty = 0 - parseInt(context.data.qtyCanMake);
            context.commonFact.updatePartStock();
        }
    };
};
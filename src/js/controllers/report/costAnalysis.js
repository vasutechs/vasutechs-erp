erpConfig.moduleFiles.costAnalysis = function(context) {
    return {
        callBackList: function() {
            context.commonFact.getFlowMaster().then(function() {
                context.commonFact.getData('purchase.rmMaster').then(function(res) {
				var frmDate = context.controller.filterView.data['frmDate'];
                var toDate = context.controller.filterView.data['toDate'];
                    for (var i in context.controller.listViewData) {
                        var partDetails = context.controller.listViewData[i];
                        var rmCode = context.controller.listViewData[i].rmCode;
                        var rmDetails = rmCode && res.data[rmCode];
                        var flowMasterDetails = context.controller.flowMasterByPart[partDetails.id];
                        if (rmDetails) {
                            partDetails.rmRate = rmDetails.rate;
							partDetails.amendmentRMRate = context.commonFact.getRate(rmDetails, frmDate, toDate, true);
							partDetails.amendmentRMDate = context.commonFact.getRate(rmDetails, frmDate, toDate, true, true);
                            partDetails.scrapRate = rmDetails.scrapRate;
                            partDetails.materialCost = rmDetails && ((parseFloat(partDetails.inputWeight) * parseFloat(context.commonFact.getRate(rmDetails, frmDate, toDate))) - (((parseFloat(partDetails.inputWeight) - parseFloat(partDetails.finishedWeight)) * parseFloat(rmDetails.scrapRate))));
                            partDetails.conversionCost = flowMasterDetails && flowMasterDetails.totalCost || 0;
                            partDetails.subTotal = parseFloat(partDetails.materialCost) + parseFloat(partDetails.conversionCost);
                            partDetails.rejCost = partDetails.subTotal * (partDetails.rejection / 100);
                            partDetails.iccCost = partDetails.subTotal * (partDetails.icc / 100);
                            partDetails.toolMaintCost = partDetails.subTotal * (partDetails.toolMaintenance / 100);
                            partDetails.transCost = rmDetails && ((parseFloat(partDetails.finishedWeight) * parseFloat(partDetails.transportCostKg)) + (parseFloat(partDetails.inputWeight) * parseFloat(rmDetails.transportCostKg)));
                            partDetails.profitCost = partDetails.subTotal * (partDetails.profit / 100);
                            partDetails.total = partDetails.subTotal + partDetails.rejCost + partDetails.iccCost + partDetails.toolMaintCost + partDetails.transCost + partDetails.profitCost;
                            partDetails.salesRate = partDetails.rate;
                            partDetails.amendmentSalesRate = context.commonFact.getRate(partDetails, frmDate, toDate, true);
							partDetails.amendmentSalesDate = context.commonFact.getRate(partDetails, frmDate, toDate, true, true);
							partDetails.differenceInCost = context.commonFact.getRate(partDetails, frmDate, toDate) - partDetails.total;
                            partDetails.gainOrLoss = (partDetails.differenceInCost / context.commonFact.getRate(partDetails, frmDate, toDate)) * 100;
                        }
                    }

                });
            });
        }
    };
};
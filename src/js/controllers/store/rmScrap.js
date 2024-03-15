erpConfig.moduleFiles.partScrap = function(context) {
    var orgItemVal = null;
    return {
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            context.controller.orgItemVal = orgItemVal;
        },
        updateOperationFrom: function(data) {
            context.commonFact.getCommonOperationFromFlow(context.controller.form.fields['operationFrom'], data.partNo);
        },
        callBackSubmit: function() {
            var newContext = angular.copy(context);
            if (!context.controller.data.operationFrom) {
                newContext.controller.data.operationFrom = context.erpAppConfig.finalStageOpp;
            }
            var partStockData = newContext.controller.partStock[newContext.controller.data.partNo + '-' + newContext.controller.data.operationFrom];
            newContext.controller.updatePrevStock = false;
            if (partStockData) {
                newContext.controller.data.operationFrom = partStockData.operationFrom;
                newContext.controller.data.operationTo = partStockData.operationTo;
                newContext.controller.data.acceptedQty = 0 - parseInt(newContext.controller.data.partStockQty);
                context.commonFact.updatePartStock(newContext);
            }
        },
        callBeforeDelete: function(id, item) {
            var newContext = angular.copy(context);
            newContext.controller.updatePrevStock = false;
            newContext.controller.data = item;
            var partStockData = newContext.controller.partStock[item.partNo + '-' + item.operationFrom];
            newContext.controller.updatePrevStock = false;
            if (partStockData) {
                newContext.controller.data.operationFrom = partStockData.operationFrom;
                newContext.controller.data.operationTo = partStockData.operationTo;
                newContext.controller.data.acceptedQty = parseInt(item.partStockQty);
                context.commonFact.updatePartStock(newContext);
            }
        }
    };
};
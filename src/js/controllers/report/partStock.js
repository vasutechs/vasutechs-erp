erpConfig.moduleFiles.partStock = function(context) {
    return {
        callBackList: function() {
            if(context.erpAppConfig.isSale){
                context.controller.listView.length===7 && context.controller.listView.splice(2,2);
            }
            context.commonFact.getPartStock();
            var newList = angular.copy(context.controller.listViewData);
            if (context.commonFact.location.search() && context.commonFact.location.search()['showall'] === 'no') {
                newList = context.controller.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.controller.listViewData = newList
            }

            context.commonFact.getData('marketing.partMaster').then(function(res) {
                var listViewData = angular.copy(context.controller.listViewDataMaster);
                for (var i in listViewData) {
                    var stockData = context.controller.listViewData[i];
                    var partNo = stockData.partNo;
                    var partDetails = partNo && res.data[partNo];
                    stockData.rate = context.commonFact.getRate(partDetails);
                    stockData.totalAmount = stockData.rate && (stockData.rate * stockData.partStockQty);
                }
            });
        },
        callBackEdit: function() {
            context.controller.methods.updateOperationFrom(context.controller.data);
            context.controller.methods.updateOperationTo(context.controller.data);
            context.controller.methods.checkExistingPart(context.controller.data);
        },
        updateOperationFrom: function(data) {
            if (context.controller.data.partNo && context.controller.form.fields['operationFrom']) {
                context.commonFact.getCommonOperationFromFlow(context.controller.form.fields['operationFrom'], data.partNo);
            }
        },
        updateOperationTo: function(data) {
            if (context.controller.data.partNo && context.controller.form.fields['operationTo']) {
                context.commonFact.getCommonOperationFromFlow(context.controller.form.fields['operationTo'], data.partNo);
            }
            context.controller.methods.checkExistingPart(data);
        },
        checkExistingPart: function(data){
            if(data.partNo && data.operationFrom){
                data.existingPartStockQty = context.controller.partStock[data.partNo + '-' + data.operationFrom] && context.controller.partStock[data.partNo + '-' + data.operationFrom].partStockQty || 0;
            }
        },
        submit: function() {
            var submitService;
            if (!context.controller.data.operationFrom && !context.controller.data.operationTo) {
                context.controller.data.operationTo = context.erpAppConfig.finalStageOpp;
            }
            if(context.erpAppConfig.isSale){
                delete context.controller.data.operationFrom;
                delete context.controller.data.operationTo;
            }
            if (context.controller.data.id) {
                submitService = context.commonFact.updateData(context.controller, context.controller.data)
            } else {
                context.updatePrevStock = false;
                context.controller.data.acceptedQty = context.controller.data.partStockQty;
                submitService = context.commonFact.updatePartStock();
            }

            submitService.then(function() {
                context.controller.page.name = 'list';
                context.commonFact.list();
            });
        }
    };
};
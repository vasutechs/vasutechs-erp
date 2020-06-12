erpConfig.moduleFiles.assembleMaterialIssueNote = function(context) {
    var orgItemVal = null;
    return {
        callBackEdit: function() {
            orgItemVal = angular.copy(context.controller.data);
        },
        callBackAdd: function() {
            orgItemVal = angular.copy(context.controller.data);
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            var listViewData = angular.copy(context.controller.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === 1) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.controller.listViewData = partDetailList;
        },
        getSubParts: function() {
            context.commonFact.getData('production.bomAssemblePart').then(function(res) {
                var bomData = res.data;
                for (var i in bomData) {
                    if (bomData[i].partNo === context.controller.data.partNo) {
                        context.controller.data.mapping = angular.extend(context.controller.data.mapping, bomData[i].mapping);
                    }
                }
            });
        },
        updateQtyMake: function(mappingData, value, field, fieldMapkey) {
            if (mappingData.id) {
                var partStockVal = context.controller.partStock[mappingData.id + '-' + context.erpAppConfig.finalStageOpp];
                if (partStockVal) {
                    if (context.controller.page.name === 'edit' && orgItemVal && orgItemVal.mapping && orgItemVal.mapping[fieldMapkey].issueQty) {
                        field.max = parseInt(orgItemVal.mapping[fieldMapkey].issueQty) + parseInt(partStockVal.partStockQty);
                    } else {
                        field.max = partStockVal.partStockQty;
                    }

                    mappingData.operationFrom = partStockVal.operationFrom;
                    mappingData.operationTo = partStockVal.operationTo;
                }
                if (mappingData.partNorms && mappingData.issueQty && field.max && field.max >= mappingData.issueQty) {
                    mappingData.qtyCanMake = mappingData.issueQty / mappingData.partNorms;
                } else {
                    mappingData.qtyCanMake = null;
                }

            }
            context.controller.methods.updateTotalQtyMake();
        },
        updateTotalQtyMake: function() {
            var subPartsLength = context.controller.data.mapping.length;
            var totalQtyMake = 0;
            var qtyCanMake;
            var prevCanMake;
            var isValid = false;
            for (var i in context.controller.data.mapping) {
                if (context.controller.data.mapping[i].qtyCanMake) {
                    totalQtyMake += context.controller.data.mapping[i].qtyCanMake;
                }
                if (!prevCanMake || prevCanMake === context.controller.data.mapping[i].qtyCanMake) {
                    isValid = true;
                } else {
                    isValid = false;
                }
                prevCanMake = context.controller.data.mapping[i].qtyCanMake;
            }
            qtyCanMake = totalQtyMake / subPartsLength;
            if (Number.isInteger(qtyCanMake) && isValid) {
                context.controller.data.qtyCanMake = qtyCanMake;
            } else {
                context.controller.data.qtyCanMake = null;
            }

        },
        updateSubPartStock: function() {
            var mapStockUpdate = function(map, key, del) {
                var data = angular.copy(map);
                var newContext = angular.copy(context);
                data.partNo = data.id;
                if (!del && orgItemVal) {
                    if (orgItemVal.id && orgItemVal.mapping && orgItemVal.mapping[key]) {
                        data.acceptedQty = parseInt(orgItemVal.mapping[key].qtyCanMake) - parseInt(map.qtyCanMake);
                    } else {
                        data.acceptedQty = 0 - parseInt(map.qtyCanMake);
                    }
                } else {
                    data.acceptedQty = parseInt(map.qtyCanMake);
                }
                newContext.controller.data = data;
                newContext.controller.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.controller.data.mapping) {
                mapStockUpdate(context.controller.data.mapping[i], i, false);
            }
        },
        callBackSubmit: function() {
            var qtyCanMake;
            context.controller.methods.updateSubPartStock();
            if (orgItemVal && orgItemVal.qtyCanMake) {
                qtyCanMake = parseInt(context.controller.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                context.controller.data.acceptedQty = qtyCanMake;
            } else {
                context.controller.data.acceptedQty = context.controller.data.qtyCanMake;
            }
            context.commonFact.updatePartStock();
        },
        callBeforeDelete: function(id, item) {
            var qtyCanMake;
            context.controller.data = item;
            context.controller.methods.updateSubPartStock(true);
            context.controller.data.acceptedQty = 0 - parseInt(context.controller.data.qtyCanMake);
            context.commonFact.updatePartStock();
        }
    };
};
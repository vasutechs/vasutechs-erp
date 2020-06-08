erpConfig.moduleFiles.assembleMaterialIssueNote = function(context) {
    var orgItemVal = null;
    return {
        callBackEdit: function() {
            orgItemVal = angular.copy(context.data);
        },
        callBackAdd: function() {
            orgItemVal = angular.copy(context.data);
        },
        callBackList: function() {
            context.commonFact.getPartStock();
            orgItemVal = null;
            var listViewData = angular.copy(context.listViewDataMaster);
            var partDetailList = [];
            for (var i in listViewData) {
                if (listViewData[i].isAssemblePart === 1) {
                    partDetailList.push(listViewData[i]);
                }

            }
            context.listViewData = partDetailList;
        },
        getSubParts: function() {
            context.commonFact.getData('production.bomAssemblePart').then(function(res) {
                var bomData = res.data;
                for (var i in bomData) {
                    if (bomData[i].partNo === context.data.partNo) {
                        context.data.mapping = angular.extend(context.data.mapping, bomData[i].mapping);
                    }
                }
            });
        },
        updateQtyMake: function(mappingData, value, field, fieldMapkey) {
            if (mappingData.id) {
                var partStockVal = context.partStock[mappingData.id + '-' + context.erpAppConfig.finalStageOpp];
                if (partStockVal) {
                    if (context.page.name === 'edit' && orgItemVal && orgItemVal.mapping && orgItemVal.mapping[fieldMapkey].issueQty) {
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
            context.methods.updateTotalQtyMake();
        },
        updateTotalQtyMake: function() {
            var subPartsLength = context.data.mapping.length;
            var totalQtyMake = 0;
            var qtyCanMake;
            var prevCanMake;
            var isValid = false;
            for (var i in context.data.mapping) {
                if (context.data.mapping[i].qtyCanMake) {
                    totalQtyMake += context.data.mapping[i].qtyCanMake;
                }
                if (!prevCanMake || prevCanMake === context.data.mapping[i].qtyCanMake) {
                    isValid = true;
                } else {
                    isValid = false;
                }
                prevCanMake = context.data.mapping[i].qtyCanMake;
            }
            qtyCanMake = totalQtyMake / subPartsLength;
            if (Number.isInteger(qtyCanMake) && isValid) {
                context.data.qtyCanMake = qtyCanMake;
            } else {
                context.data.qtyCanMake = null;
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
                newContext.data = data;
                newContext.updatePrevStock = false;
                context.commonFact.updatePartStock(newContext);
            };
            for (var i in context.data.mapping) {
                mapStockUpdate(context.data.mapping[i], i, false);
            }
        },
        callBackSubmit: function() {
            var qtyCanMake;
            context.methods.updateSubPartStock();
            if (orgItemVal && orgItemVal.qtyCanMake) {
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
            context.methods.updateSubPartStock(true);
            context.data.acceptedQty = 0 - parseInt(context.data.qtyCanMake);
            context.commonFact.updatePartStock();
        }
    };
};
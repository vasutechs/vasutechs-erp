erpConfig.moduleFiles.assembleMaterialIssueNote = function() {
    var orgItemVal = null;
    return {
        callBackEdit: function(context) {
            orgItemVal = angular.copy(context.data);
        },
        callBackAdd: function(context) {
            orgItemVal = angular.copy(context.data);
        },
        callBackList: function(context) {
            context.methods.getPartStock(context);
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
        getSubParts: function(context) {
            context.methods.getData('production.bomAssemblePart').then(function(res) {
                var bomData = res.data;
                for (var i in bomData) {
                    if (bomData[i].partNo === context.data.partNo) {
                        context.data.mapping = angular.extend(context.data.mapping, bomData[i].mapping);
                    }
                }
            });
        },
        updateQtyMake: function(context, mappingData, value, field, fieldMapkey) {
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
            context.methods.updateTotalQtyMake(context);
        },
        updateTotalQtyMake: function(context) {
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
        updateSubPartStock: function(context) {
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
                context.methods.updatePartStock(newContext);
            };
            for (var i in context.data.mapping) {
                mapStockUpdate(context.data.mapping[i], i, false);
            }
        },
        callBackSubmit: function(context) {
            var qtyCanMake;
            context.methods.updateSubPartStock(context);
            if (orgItemVal && orgItemVal.qtyCanMake) {
                qtyCanMake = parseInt(context.data.qtyCanMake) - parseInt(orgItemVal.qtyCanMake);
                context.data.acceptedQty = qtyCanMake;
            } else {
                context.data.acceptedQty = context.data.qtyCanMake;
            }
            context.methods.updatePartStock(context);
        },
        callBeforeDelete: function(context, id, item) {
            var qtyCanMake;
            context.data = item;
            context.methods.updateSubPartStock(context, true);
            context.data.acceptedQty = 0 - parseInt(context.data.qtyCanMake);
            context.methods.updatePartStock(context);
        }
    };
};
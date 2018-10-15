erpApp.controller('dcSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            context.actions.getPartStock(context);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        callBackChangeMapping: function(context) {
            context.actions.callBackUpdatePartTotal(context);
        },
        callBackUpdatePartTotal: function(context) {
            var qty = 0,
                poQty = parseInt(context.actions.getPOQty(context));
            for (var i in context.data.mapping) {
                qty += parseInt(context.data.mapping[i].acceptedQty);
            }
            context.actions.getDCQty(context).then(function(DCStock) {
                qty += parseInt(DCStock);
                if (poQty < qty) {
                    context.data.mapping[i].acceptedQty = qty = null;
                }
            });
        },
        getPOQty: function(context) {
            var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
            var poQty = 0;
            var poNo = context.data.poNo;
            
            for (var i in poSubContractor.mapping) {
                poQty += poSubContractor.mapping[i].acceptedQty;
            }
            return poQty;
        },
        updatePoSubContractor: function(context) {
            var poSubContractor = context.form.fields['poNo'].options[context.data.poNo];
            var poQty = context.actions.getPOQty(context);
            poSubContractor.status = 1;
            context.actions.getDCQty(context).then(function(DCStock) {
                if (parseInt(poQty) <= parseInt(DCStock)) {
                    context.actions.updateData('purchase.poSubContractor', poSubContractor);
                }
            });
        },
        getDCQty: function(context) {
            var DCQty = 0;
            return context.actions.getData('store.dcSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.data.poNo === listViewData[i].poNo) {
                        for (var j in listViewData[i].mapping) {
                            DCQty += parseInt(listViewData[i].mapping[j].acceptedQty);
                        }
                    }
                }
                return DCQty;
            });
        },
        callBackSubmit: function(context) {
            for (var i in context.data.mapping) {
                var data = angular.copy(context.data.mapping[i]);
                data.partNo = data.id;
                data.subContractorCode = context.data.subContractorCode;
                context.actions.updateSCStock({
                    data: data
                });

                context.actions.updatePartStock({
                    updateCurStock: false,
                    data: data
                });
            }
            context.actions.updatePoSubContractor(context);
        }
    });

    $scope.context = erpAppConfig.modules.store.dcSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);
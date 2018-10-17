erpApp.controller('grnSubContractorCtrl', ['erpAppConfig', '$scope', 'commonFact', 'serviceApi', function(erpAppConfig, $scope, commonFact, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        getDCSubContractor: function(context, data, key, field) {
            context.form.fields['dcNo'] = angular.extend(context.form.fields['dcNo'], {
                filter: {
                    poNo: key,
                    status: 0
                }
            });
            context.actions.makeOptionsFields(context.form.fields['dcNo']);
        },
        getPOSubContractor: function(context, data, key, field) {
            context.form.fields['poNo'] = angular.extend(context.form.fields['poNo'], {
                filter: {
                    subContractorCode: key
                }
            });
            context.actions.makeOptionsFields(context.form.fields['poNo']);
        },
        updateDCSubContractor: function(context) {

            var dcSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
            var poQty = context.actions.getDCQty(context);
            dcSubContractor.status = 1;
            context.actions.getGRNQty(context).then(function(GRNStock) {
                if (parseInt(poQty) <= parseInt(GRNStock)) {
                    context.actions.updateData('store.dcSubContractor', dcSubContractor);
                }
            });
        },
        callBackChangeMapping: function(context) {
            context.actions.getSCStock(context);
        },
        callBackUpdatePartTotal: function(context) {
            var qty = 0,
                DCQty = parseInt(context.actions.getDCQty(context));
            for (var i in context.data.mapping) {
                qty += parseInt(context.data.mapping[i].receivedQty);
            }
            context.actions.getGRNQty(context).then(function(GRNStock) {
                qty += parseInt(GRNStock);
                if (DCQty < qty) {
                    context.data.mapping[i].receivedQty = qty = null;
                }
            });
        },
        getDCQty: function(context) {
            var DCSubContractor = context.form.fields['dcNo'].options[context.data.dcNo];
            var DCQty = 0;
            var poNo = context.data.poNo;

            for (var i in DCSubContractor.mapping) {
                DCQty += DCSubContractor.mapping[i].acceptedQty;
            }
            return DCQty;
        },
        getGRNQty: function(context) {
            var GRNQty = 0;
            return context.actions.getData('store.grnSubContractor').then(function(res) {
                var listViewData = res.data;
                for (var i in listViewData) {
                    if (context.data.poNo === listViewData[i].poNo) {
                        for (var j in listViewData[i].mapping) {
                            GRNQty += parseInt(listViewData[i].mapping[j].receivedQty);
                        }
                    }
                }
                return GRNQty;
            });
        },
        callBackSubmit: function(context) {
            var newQty;
            for (var i in context.data.mapping) {
                var data = angular.copy(context.data.mapping[i]);
                data.partNo = data.id;
                data.acceptedQty = context.data.mapping[i].receivedQty;
                context.actions.updatePartStock({
                    updatePrevStock: false,
                    data: data
                });
                var scData = angular.copy(data);
                scData.subContractorCode = context.data.subContractorCode;
                scData.acceptedQty = 0 - scData.receivedQty;
                context.actions.updateSCStock({
                    data: scData
                });
            }
            context.actions.updateDCSubContractor(context);
        }
    });;

    $scope.context = erpAppConfig.modules.store.grnSubContractor;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);
}]);
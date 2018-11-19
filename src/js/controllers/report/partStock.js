erpApp.controller('partStockCtrl', ['erpAppConfig', '$scope', 'commonFact', '$location', 'serviceApi', function(erpAppConfig, $scope, commonFact, $location, serviceApi) {
    var actions = angular.extend(angular.copy(commonFact.defaultActions), {
        callBackList: function(context) {
            var newList = angular.copy(context.listViewData);
            if ($location.search() && $location.search()['showall'] === 'no') {
                newList = context.listViewData.filter(function(data) {
                    return data.partStockQty > 0;
                });
                context.listViewData = newList
            }
        },
        updateOperationFrom: function(context, data, key, field) {
            if (context.data.partNo) {
                var restriction = {
                        partNo: context.data.partNo
                    };
                context.actions.getOperationFromFlow(context, context.form.fields['operationFrom'], restriction);
            }
        },
        updateOperationTo: function(context, data, key, field) {
            if (context.data.partNo) {
                var partNo = context.data.partNo,
                    restriction = {
                        partNo: partNo
                    };

                if (data.operationFrom) {
                    restriction = angular.extend(restriction, {
                        limit: 1,
                        startWith: data.operationFrom
                    });
                }

                context.actions.getOperationFromFlow(context, context.form.fields['operationTo'], restriction);
            }
        },
        submit: function(context) {
            var submitService;
            var serviceconf = this.getServiceConfig(context.services.list, 'POST');
            if (context.data.id) {
                submitService = serviceApi.callServiceApi(serviceconf, context.data)
            } else {
                context.updatePrevStock = false;
                context.data.acceptedQty = context.data.partStockQty;
                submitService = context.actions.updatePartStock(context);
            }

            submitService.then(function(){
                context.page.name = 'list';
                context.actions.list(context);
            });
        }
    });

    $scope.context = erpAppConfig.modules.report.partStock;
    $scope.context.actions = actions;
    $scope.context.actions.list($scope.context);

}]);
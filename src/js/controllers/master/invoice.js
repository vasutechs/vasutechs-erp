erpApp.controller('invoiceCtrl', ['erpAppConfig', '$scope', 'serviceApi', '$location', 'commonFact', function(erpAppConfig, $scope, serviceApi, $location, commonFact) {
    var actions = {
        list: function(context) {
            serviceApi.callServiceApi(context.services.list).then(function(res) {
                context.listData = res.data;
            });
        },
        edit: function(context) {
            var serviceconf = {
                url: context.services.list.url + "/" + $location.search()['id'],
                method: 'GET'
            };
            serviceApi.callServiceApi(serviceconf).then(function(res) {
                context.data = res.data;
            });
        },
        delete: function(context) {
            var serviceconf = {
                url: context.services.list.url,
                method: 'POST'
            };
            serviceApi.callServiceApi(serviceconf, { id: $location.search()['id'], delete: 'yes' });
            $location.path(context.pages.list.link).search({});
        },
        submit: function(context) {
            var serviceconf = {
                url: $scope.context.services.list.url,
                method: 'POST'
            };
            serviceApi.callServiceApi(serviceconf, $scope.context.data);
            $location.path(context.pages.list.link).search({});
        },
        cancel: function(context) {
            $location.path(context.pages.list.link).search({});
        },
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            serviceApi.callServiceApi(erpAppConfig.modules.master.customerMaster.services.list).then(function(res) {
                context.customerMasterList = res.data;
                for (var i in context.customerMasterList) {
                    context.invoiceForm.fields['customerCode'].options[i] = {
                        id: res.data[i].id,
                        name: res.data[i].customerName
                    };
                }
            });

            //Get Part master data
            serviceApi.callServiceApi(erpAppConfig.modules.master.partMaster.services.list).then(function(res) {
                context.partMasterList = res.data;
                for (var i in context.partMasterList) {
                    context.mappingForm.fields[1].options[i] = {
                        id: res.data[i].id,
                        name: res.data[i].partName
                    };
                }
            });
        },
        addMapping: function(context) {
            var newSNo = context.data.mapping[context.data.mapping.length-1].sNo + 1;
            context.data.mapping.push({
                sNo: newSNo,
                partNo: context.mappingForm.fields[0][1],
                unit: '',
                rate: '',
                amount: ''
            });
        },
        removeMapping: function(context, key) {
            delete context.data.mapping.splice(key, 1);
        },
        changeMapping: function(context, mapping) {
            
        }
    };
    $scope.context = erpAppConfig.modules.master.invoice;
    $scope.context.pagePath = commonFact.getPage($scope.context.pages, $location);
    $scope.actions = actions;
    actions.updateOptionFields($scope.context, erpAppConfig);
    $scope.actions[$scope.context.pagePath.name] && $scope.actions[$scope.context.pagePath.name]($scope.context);
}]).
directive('entryInvoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/components/entryInvoice.html'
    };
});
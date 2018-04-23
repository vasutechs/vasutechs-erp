erpApp.controller('customerMasterCtrl', ['erpAppConfig', '$scope', 'serviceApi', '$location', 'commonFact', function(erpAppConfig, $scope, serviceApi, $location, commonFact) {
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
        updateOptionFields: function(context, erpAppConfig) {
            //Get Part master data
            serviceApi.callServiceApi(erpAppConfig.modules.master.partMaster.services.list).then(function(res) {
                context.partMasterList = res.data;
                for (var i in context.partMasterList) {
                    context.mappingForm.fields[0].options[i] = {
                        id: res.data[i].id,
                        name: res.data[i].partName
                    };
                }
            });
        },
        addMapping: function(context) {
            context.data.mapping.push({
                partNo: context.mappingForm.fields[0][1],
                rate: '',
                gst: ''
            });
        },
        removeMapping: function(context, key) {
            delete context.data.mapping.splice(key, 1);
        },
        changeMapping: function(context, mapping) {
            mapping.rate = context.partMasterList[mapping.partNo].rate;
            mapping.gst = context.partMasterList[mapping.partNo].gst;
        },
        submit: function(context) {
            var serviceconf = {
                url: context.services.list.url,
                method: 'POST'
            };
            serviceApi.callServiceApi(serviceconf, $scope.context.data);
            $location.path(context.pages.list.link).search({});
        },
        cancel: function(context) {
            $location.path(context.pages.list.link).search({});
        }
    };

    $scope.context = erpAppConfig.modules.master.customerMaster;
    $scope.context.pagePath = commonFact.getPage($scope.context.pages, $location);
    $scope.actions = actions;

    $scope.actions.updateOptionFields($scope.context, erpAppConfig);

    $scope.actions[$scope.context.pagePath.name] && $scope.actions[$scope.context.pagePath.name]($scope.context);
}]);
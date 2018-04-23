erpApp.controller('uomMasterCtrl', ['erpAppConfig', '$scope', 'serviceApi', '$location', 'commonFact', function(erpAppConfig, $scope, serviceApi, $location, commonFact) {
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
        cancel: function(context){
             $location.path(context.pages.list.link).search({});
        }
    };
    $scope.context = erpAppConfig.modules.master.uomMaster;
    $scope.context.pagePath = commonFact.getPage($scope.context.pages, $location);
    $scope.actions = actions;
    $scope.actions[$scope.context.pagePath.name] && $scope.actions[$scope.context.pagePath.name]($scope.context);
}]);
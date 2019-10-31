erpApp.controller('databaseUploadCtrl', ['$scope', 'commonFact', 'serviceApi', function($scope, commonFact, serviceApi) {
    var actions = {
        uploadDatabase: function(context) {
            var serviceconf = this.getServiceConfig(context.services.list);
            if (context.data && context.data.databaseUpload && context.data.databaseUpload.tables) {
                serviceApi.callServiceApi(serviceconf, context.data.databaseUpload.tables).then(function() {
                    context.message = 'Successfully uploded...';
                    context.alertMessage = undefined;
                    context.actions.goToPage(context.appConfig.modules.dashboard.page.link, true);
                });
            } else {
                context.alertMessage = 'Failed uploded...';
                context.message = undefined;
            }

        }
    };
    commonFact.initCtrl($scope, 'databaseUpload', actions);
}]);